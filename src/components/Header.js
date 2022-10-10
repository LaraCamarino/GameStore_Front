import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import { BsCart3 } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";

import UserContext from "../contexts/UserContext";
import SearchBar from "./SearchBar";
import Menu from "./Menu";
import * as Alerts from "./Alerts";

import Logo from "../assets/images/logo.png";

export default function Header() {
  const navigate = useNavigate();

  const { shoppingCart } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const userMenuRef = useRef();
  const [openUserMenu, setOpenUserMenu] = useState(false);

  useEffect(() => {
    function closeDropDown(event) {
      if (event.path[0] !== userMenuRef.current) {
        setOpenUserMenu(false);
      }
    }

    document.body.addEventListener("click", closeDropDown);

    return () => {
      document.body.removeEventListener("click", closeDropDown);
    };
  }, []);

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
          <UserIcon
            ref={userMenuRef}
            onClick={() => setOpenUserMenu(!openUserMenu)}
            open={openUserMenu}
          >
            <HiOutlineUser></HiOutlineUser>
          </UserIcon>
          <UserMenu open={openUserMenu}>
            <h1 onClick={() => logoutUser()}>Logout</h1>
          </UserMenu>
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
            <img src={Logo} alt=""></img>
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
  background-color: #1d1d1e;
  margin-bottom: 50px;
  padding: 20px 30px;

  @media (max-width: 768px) {
    padding: 20px 20px;
  }
  @media (max-width: 425px) {
    padding: 20px 10px;
  }
`;
const TopContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSide = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
`;

const BrandLogo = styled.h1`
  cursor: pointer;

  img {
    width: 120px;
    height: 115px;
    border: 3px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 4px #fff, 0 0 4px #fff, 0 0 40px #606afa, 0 0 16px #606afa,
      0 0 20px #606afa, inset 0 0 15px #606afa;
  }

  @media (max-width: 680px) {
    img {
      width: 100px;
      height: 90px;
    }
  }
`;

const RightSide = styled.div`
  width: 15%;
  display: flex;
  justify-content: end;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  svg {
    width: 25px;
    height: 25px;
    color: #ffffff;
    cursor: pointer;
  }

  @media (max-width: 680px) {
    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

const LittleBall = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: linear-gradient(90deg, #772aff, #2196f3);
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

  @media (max-width: 680px) {
    width: 12px;
    height: 12px;
    right: -4px;
    bottom: 1px;

    p {
      font-size: 10px;
    }
  }
`;

const UserBox = styled.div`
  height: 28px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
`;

const UserIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (!props.open ? "none" : "#545456")};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 3px 3px 0px;
  cursor: pointer;

  img,
  svg {
    pointer-events: none;
  }
`;

const UserMenu = styled.div`
  display: ${(props) => (!props.open ? "none" : "flex")};
  background-color: #545456;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  padding: 10px 25px 7px 7px;
  position: absolute;
  right: 0px;
  bottom: -32px;

  h1 {
    cursor: pointer;
    font-weight: 600;
  }

  @media (max-width: 680px) {
    font-size: 8px;
    bottom: -20px;
  }
`;

const SignInLink = styled(Link)`
  font-size: 18px;
  font-weight: 500;
  color: #ffff;
  text-decoration: none;
  padding-top: 5px;
  cursor: pointer;

  @media (max-width: 980px) {
    font-size: 12px;
  }
  @media (max-width: 650px) {
    font-size: 8px;
  }
`;

const BottomContainer = styled.div``;
