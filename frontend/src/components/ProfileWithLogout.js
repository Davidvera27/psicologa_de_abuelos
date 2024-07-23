//frontend\src\components\ProfileWithLogout.js

import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { Avatar, Menu, MenuItem } from '@mui/material';

const ProfileWrapper = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProfileDetails = styled.div`
  margin-left: 0.5rem;
  color: black;
  font-weight: bold;
`;

const ProfileWithLogout = () => {
  const { user, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuRef = useRef(null);

  const handleClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleProfileClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <div ref={menuRef}>
      <ProfileWrapper onClick={handleProfileClick}>
        <Avatar alt={user.name} src={user.picture} />
        <ProfileDetails>{user.name}</ProfileDetails>
      </ProfileWrapper>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileWithLogout;
