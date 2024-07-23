//frontend\src\components\NavBar.js

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import { Avatar, Menu, MenuItem } from '@mui/material';

const NavBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const HomeButton = styled(Link)`
  color: black;
  display: flex;
  align-items: center;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.palette.primary.main};
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProfileDetails = styled.div`
  margin-left: 0.5rem;
  color: black;
  font-weight: bold;
`;

const NavBar = () => {
  const { user, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <NavBarWrapper>
      <HomeButton to="/">
        <HomeIcon />
      </HomeButton>
      <ProfileWrapper ref={menuRef}>
        <Avatar alt={user.name} src={user.picture} onClick={handleClick} />
        <ProfileDetails onClick={handleClick}>{user.name}</ProfileDetails>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
            Cerrar sesión
          </MenuItem>
        </Menu>
      </ProfileWrapper>
    </NavBarWrapper>
  );
};

export default NavBar;
