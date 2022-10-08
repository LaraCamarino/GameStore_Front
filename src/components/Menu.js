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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Links = styled(Link)`
  margin-right: 15px;
  font-size: 18px;
  font-weight: 700;
  color: #ffff;
  text-transform: uppercase;
  text-decoration: none;
`;
