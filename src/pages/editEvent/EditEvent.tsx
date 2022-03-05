import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { ButtonAction, InputField, CheckField } from '../../components/shared/Common';
// import { paths } from '../../utils/constants';
import { editEvent, getEvent } from '../../redux/actions/events';
import { useAppThunkDispatch } from '../../redux/store';
import { toast, ToastContainer } from 'react-toastify';
import { handleFileUpload } from '../../redux/actions/events';
import { useAppSelector } from '../../redux/store';
import imgbg from '../../assets/img/imgbg.png';
import { useParams } from 'react-router-dom';

interface EventProps {
  title: string;
  description: string;
  venue: string;
  image: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  is_security_requested: boolean;
  is_tag_requested: boolean;
}

type PayLoad = {
  status: boolean;
  message: string;
};
const EditEvent = () => {
  const { id } = useParams();
  const dispatch = useAppThunkDispatch();
  const [file, setFile] = useState({
    state: false,
    fileData: {} as File,
  });

  const { event, uploadedUrl } = useAppSelector((state) => state.events);
  const { isLoading } = useAppSelector((state) => state.loader);
  const [previewImage, setPreviewImage] = useState(imgbg);

  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    venue: '',
    image: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    is_security_requested: false,
    is_tag_requested: false,
  });

  const handleCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    val: keyof typeof eventDetails,
  ) => {
    const { name } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: !eventDetails[val],
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return console.error('No file selected');
    const file = e.target.files[0];
    // check if file is an image
    if (!file) return toast.warn('No File Selected');

    if (!file.type.match('image/')) return toast.warn('File must be an image');
    // check if file is larger than 1mb
    if (file.size > 1000000) return toast.warn('File is larger than 1mb');
    const currentImage = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(currentImage);
    setFile({
      state: true,
      fileData: file,
    });
  };

  useEffect(() => {
    if (file.state) {
      console.log('file changed');
      const anony = async () => {
        return await dispatch(handleFileUpload(file.fileData));
      };
      anony()
        .then((res) => {
          console.log(res, 'upload res');
          const payload = res.payload as PayLoad;
          if (payload.status) {
            return toast.success(payload.message);
          } else {
            return toast.warn(payload.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [file]);

  useEffect(() => {
    setEventDetails({
      ...eventDetails,
      image: uploadedUrl,
    });
    // eslint-disable-next-line
  }, [uploadedUrl]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(eventDetails);
    await dispatch(editEvent({ showId: id as string, data: eventDetails }))
      .then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          console.log('success', payload);
          toast.success(payload.message);
        } else {
          console.log('error', payload);
          toast.error(payload.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const eventData = event as EventProps;
    setEventDetails({
      title: eventData.title,
      description: eventData.description,
      venue: eventData.venue,
      image: eventData.image,
      start_date: eventData.start_date,
      end_date: eventData.end_date,
      start_time: eventData.start_time,
      end_time: eventData.end_time,
      is_security_requested: eventData.is_security_requested,
      is_tag_requested: eventData.is_tag_requested,
    } as EventProps);
  }, [event]);

  useEffect(() => {
    const eventData = event as EventProps;
    setPreviewImage(eventData.image);
  }, [event]);

  useEffect(() => {
    const anony = async () => {
      return (await dispatch(getEvent(id as string))) as unknown;
    };
    anony()
      .then((ress) => {
        console.log(ress);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <MainLayout>
      <ToastContainer />
      <div className="text-center py-4 bg-gray-50 ">
        <h2 className="font-bold font-rubik text-2xl">Edit Event</h2>
      </div>
      <div className="w-full min-h-screen bg-gray-50 grid grid-cols-1 md:grid-cols-2 sm:justify-center  pt-6 sm:pt-0 homebg ">
        <div className="w-full sm:max-w-md px-5 m-auto mb-6">
          <form onSubmit={handleSubmit}>
            <InputField
              name="title"
              label="Event Title"
              type="text"
              value={eventDetails.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="description"
              label="Description"
              type="text"
              value={eventDetails.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="venue"
              label="Venue"
              type="text"
              value={eventDetails.venue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="start_date"
              label="Start Date"
              type="date"
              value={eventDetails.start_date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="end_date"
              label="End Date"
              type="date"
              value={eventDetails.end_date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="start_time"
              label="Start Time"
              type="time"
              value={eventDetails.start_time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="end_time"
              label="End Time"
              type="time"
              value={eventDetails.end_time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <CheckField
              name="is_security_requested"
              label="Is Security Requested"
              type="checkbox"
              checked={eventDetails.is_security_requested}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCheckBox(e, 'is_security_requested')
              }
            />
            <CheckField
              name="is_tag_requested"
              label="Is Tag Requested"
              type="checkbox"
              checked={eventDetails.is_tag_requested}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCheckBox(e, 'is_tag_requested')
              }
            />

            <InputField
              name="image"
              label="Event Art"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImage(e)}
            />

            {/* <input type="" /> */}
            <div className="mt-6 text-center"></div>
            {isLoading ? (
              <ButtonAction type="submit" name="Save Changes" disabled loading />
            ) : (
              <ButtonAction type="submit" name="Save Changes" />
            )}
          </form>
        </div>
        <div className="w-full items-center p-10">
          <div className="border-2 border-gray-100 max-h-full min-h-full rounded-xl overflow-hidden">
            <img src={previewImage} className="w-full max-h-full min-h-full h-full object-cover " />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditEvent;
