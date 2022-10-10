import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <MenuContainer>
      <Links to="/">Home</Links>
      <Links to="/categories/adventure">Adventure</Links>
      <Links to="/categories/rpg">RPG</Links>
      <Links to="/categories/shooter">Shooter</Links>
      <Links to="/categories/simulation">Simulation</Links>
      <Links to="/categories/sports">Sports</Links>
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Links = styled(Link)`
  font-size: 18px;
  font-weight: 700;
  color: #ffff;
  text-transform: uppercase;
  text-decoration: none;

  @media (max-width: 600px) {
    font-size: 15px;
  }
  @media (max-width: 525px) {
    font-size: 10px;
  }
  @media (max-width: 425px) {
    font-size: 8px;
  }
`;
