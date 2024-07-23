// src/components/Profile.js

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@mui/material/Typography';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <Typography variant="h5">{user.name}</Typography>
      <Typography variant="body1">{user.email}</Typography>
    </div>
  );
};

export default Profile;
