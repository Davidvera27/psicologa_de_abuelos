// Home.js
import React from "react";
import styled from "styled-components";
import fondo from "../assets/logo_psico_abuelos_full_hd.jpeg"; // Asegúrate de que la ruta sea correcta

const HomeWrapper = styled.div`
  height: 100vh;
  background-image: url(${fondo});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  font-size: 2rem;
`;

function Home() {
  return (
    <HomeWrapper>
      <div></div>
    </HomeWrapper>
  );
}

export default Home;
