import React, { useState } from 'react';
import Auth from '../../middleware/storage';
const ProfileInfo = () => {
  const [user] = useState(Auth.getUser());

  return (
    <div className="bg-gray group relative rounded-lg border overflow-hidden shadow-lg hover:shadow-2xl transform duration-200">
      <div className="bg-white-100 py-10 px-10">
        <h2 className="font-bold">Profile Details</h2>
        <br />
        <h2>Full name: {user.fullname}</h2>
        <h2>Email: {user.email}</h2>
        <h2>Phone: {user.phone}</h2>
        <br />
        <h2 className="font-bold">Account Information</h2>
        <br />
      </div>
    </div>
  );
};

export default ProfileInfo;
