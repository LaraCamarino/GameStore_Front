import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { BsCart3 } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";

import UserContext from "../contexts/UserContext";
import SearchBar from "./SearchBar";
import Menu from "./Menu";
import * as Alerts from "./Alerts";

export default function Header() {
  const navigate = useNavigate();

  const { shoppingCart } = useContext(UserContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function CartNumber() {
    let number = 0;
    shoppingCart.forEach((item) => {
      number += item.quantity;
    });
    if (shoppingCart.length > 0) {
      return (
        <LittleBall>
          <p>{number}</p>
        </LittleBall>
      );
    } else {
      return <></>;
    }
  }

  function assembleUserBox() {
    if (!token) {
      return <SignInLink to="/sign-in">Login/SignUp</SignInLink>;
    } else {
      return (
        <>
          <HiOutlineUser onClick={() => logoutUser()}></HiOutlineUser>
        </>
      );
    }
  }

  function logoutUser() {
    const token = localStorage.getItem("token");

    const URL = "http://localhost:5000/sign-out";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.delete(URL, config);

    promise.then((res) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      Alerts.smallAlert("success", "User logged out successfully.");
      navigate("/");
    });
    promise.catch((err) => {
      Alerts.errorAlert(err.response.data);
    });
  }

  return (
    <ContainerHeader>
      <TopContainer>
        <LeftSide>
          <BrandLogo
            onClick={() => {
              navigate("/");
            }}
          >
            LOGO
          </BrandLogo>
        </LeftSide>
        <SearchBar />
        <RightSide>
          <Icons>
            <UserBox>{assembleUserBox()}</UserBox>
            <div
              onClick={() => {
                navigate("/cart");
              }}
            >
              <BsCart3></BsCart3>
              <CartNumber />
            </div>
          </Icons>
        </RightSide>
      </TopContainer>

      <BottomContainer>
        <Menu />
      </BottomContainer>
    </ContainerHeader>
  );
}

const ContainerHeader = styled.div`
  background-color: #3b3b3c;
  margin-bottom: 50px;
  padding: 20px 30px;
`;
const TopContainer = styled.div`
  width: 100%;
  height: 125px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const BrandLogo = styled.h1`
  cursor: pointer;
  img {
    width: 250px;
    height: 60px;
  }
`;

const RightSide = styled.div``;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  svg {
    width: 25px;
    height: 25px;
    color: #ffffff;
    cursor: pointer;
  }
`;

const UserBox = styled.div`
  margin-right: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SignInLink = styled(Link)`
  font-size: 18px;
  font-weight: 500;
  color: #ffff;
  text-decoration: none;
`;

const LittleBall = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: linear-gradient(90deg, #743ad5, #d53a9d);
  background-size: 200%;
  position: absolute;
  right: -6px;
  bottom: -5px;
  z-index: 1;
  cursor: pointer;

  p {
    font-size: 12px;
    font-weight: 700;
    color: white;
  }
`;

const BottomContainer = styled.div``;
