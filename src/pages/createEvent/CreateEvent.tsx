import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { ButtonAction, InputField, CheckField } from '../../components/shared/Common';
import { createEvent } from '../../redux/actions/events';
import { useAppThunkDispatch } from '../../redux/store';
import { toast, ToastContainer } from 'react-toastify';
import { handleFileUpload } from '../../redux/actions/events';
import { useAppSelector } from '../../redux/store';
import imgbg from '../../assets/img/imgbg.png';

type PayLoad = {
  status: boolean;
  message: string;
};
const CreateEvent = () => {
  const dispatch = useAppThunkDispatch();
  const [file, setFile] = useState({
    state: false,
    fileData: {} as File,
  });

  const { uploadedUrl } = useAppSelector((state) => state.events);
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
    await dispatch(createEvent(eventDetails))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <MainLayout>
      <ToastContainer />
      <div className="text-center py-4 bg-gray-50 ">
        <h2 className="font-bold font-rubik text-2xl">Create Event</h2>
      </div>
      <div className="w-full min-h-screen bg-gray-50 grid grid-cols-1 md:grid-cols-2 sm:justify-center  pt-6 sm:pt-0 homebg ">
        <div className="w-full sm:max-w-md px-5 m-auto mb-6">
          <form onSubmit={handleSubmit}>
            <InputField
              name="title"
              label="Event Title"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="description"
              label="Description"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="venue"
              label="Venue"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="start_date"
              label="Start Date"
              type="date"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="end_date"
              label="End Date"
              type="date"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="start_time"
              label="Start Time"
              type="time"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="end_time"
              label="End Time"
              type="time"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <CheckField
              name="is_security_requested"
              label="Is Security Requested"
              type="checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCheckBox(e, 'is_security_requested')
              }
            />
            <CheckField
              name="is_tag_requested"
              label="Is Tag Requested"
              type="checkbox"
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
              <ButtonAction type="submit" name="Register Event" disabled loading />
            ) : (
              <ButtonAction type="submit" name="Register Event" />
            )}
          </form>
        </div>
        <div className="w-full items-center p-10">
          <div className="border-2 border-gray-100 rounded-xl overflow-hidden">
            <img src={previewImage} className="w-full h-full object-cover " />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateEvent;
