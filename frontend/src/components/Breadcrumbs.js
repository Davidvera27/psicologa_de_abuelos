// src/components/Breadcrumbs.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import styled from 'styled-components';

const BreadcrumbWrapper = styled.div`
  margin: 2rem 0;
`;

const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.palette.text.primary};
  &:hover {
    color: ${props => props.theme.palette.primary.main};
  }
`;

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <BreadcrumbWrapper>
      <MuiBreadcrumbs aria-label="breadcrumb">
        <BreadcrumbLink to="/">Inicio</BreadcrumbLink>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return index === pathnames.length - 1 ? (
            <Typography color="textPrimary" key={to}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
          ) : (
            <BreadcrumbLink to={to} key={to}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </BreadcrumbLink>
          );
        })}
      </MuiBreadcrumbs>
    </BreadcrumbWrapper>
  );
};

export default Breadcrumbs;
