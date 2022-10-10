import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BackSimulation from "../assets/images/simulation.jpg";
import BackAdventure from "../assets/images/adventure.jpg";
import BackShooter from "../assets/images/shooter.jpg";
import BackRPG from "../assets/images/rpg.jpg";
import BackSports from "../assets/images/sports.jpg";

import Carousel from "../components/Carousel/Carousel";

export default function HomePage() {
  const navigate = useNavigate();

  function assembleCarousel() {
    return (
      <>
        <Banner>
          <Carousel />
        </Banner>
      </>
    );
  }

  function assembleCategories() {
    return (
      <Categories>
        <FirstSquare onClick={() => navigate("/categories/rpg")}>
          <div className="overlay">RPG</div>
        </FirstSquare>
        <SecondSquare onClick={() => navigate("/categories/sports")}>
          <div className="overlay">Sports</div>
        </SecondSquare>
        <ThirdSquare onClick={() => navigate("/categories/adventure")}>
          <div className="overlay">Adventure</div>
        </ThirdSquare>
        <FourthSquare onClick={() => navigate("/categories/shooter")}>
          <div className="overlay">Shooter</div>
        </FourthSquare>
        <FifthSquare onClick={() => navigate("/categories/simulation")}>
          <div className="overlay">Simulation</div>
        </FifthSquare>
      </Categories>
    );
  }

  return (
    <Page>
      {assembleCarousel()}
      {assembleCategories()}
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Banner = styled.div`
  width: 80vw;
  height: 80vh;
  margin-bottom: 50px;
  border-radius: 25px;
  border: 4px solid #fff;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 4px #fff, 0 0 4px #fff, 0 0 0px #fff, 0 0 12px,
    inset linear-gradient(235deg, #772aff, #2196f3);
  background-color: #171718;

  ::before {
    content: "";
    border-radius: 25px;
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: #fff;
    z-index: -1;
    background: linear-gradient(235deg, #772aff, #2196f3);
  }

  ::after {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    z-index: -2;
    filter: blur(25px);
    background: linear-gradient(235deg, #772aff, #2196f3);
  }

  @media (max-width: 768px) {
    height: 50vh;
  }
  @media (max-width: 475px) {
    height: 40vh;
  }
  @media (max-width: 390px) {
    height: 25vh;
  }
`;

const Categories = styled.div`
  width: 80%;
  height: 350px;
  display: grid;
  grid-gap: 7px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1.25fr;
  grid-template-rows: 1fr 1fr;
  margin-bottom: 40px;

  div {
    border-radius: 15px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    height: 800px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1.25fr;
  }
`;

const FirstSquare = styled.div`
  background-color: #3b3b3c;
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
  background-image: url(${BackRPG});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;

  @media (max-width: 768px) {
    grid-column: 1 / span 2;
    grid-row: 1;
  }
`;

const SecondSquare = styled.div`
  background-color: #3b3b3c;
  grid-column: 3;
  grid-row: 1;
  background-image: url(${BackSports});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 2;
  }
`;

const ThirdSquare = styled.div`
  background-color: #3b3b3c;
  grid-column: 4;
  grid-row: 1;
  background-image: url(${BackAdventure});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;

  @media (max-width: 768px) {
    grid-column: 2;
    grid-row: 2;
  }
`;

const FourthSquare = styled.div`
  background-color: #3b3b3c;
  grid-column: 3 / span 2;
  grid-row: 2;
  background-image: url(${BackShooter});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  position: relative;

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 3 / span 2;
  }
`;

const FifthSquare = styled.div`
  background-color: #3b3b3c;
  grid-column: 5;
  grid-row: 1 / span 2;
  background-image: url(${BackSimulation});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;

  @media (max-width: 768px) {
    grid-column: 2;
    grid-row: 3 / span 2;
  }
`;
