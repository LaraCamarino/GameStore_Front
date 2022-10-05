import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

import { ThreeDots } from "react-loader-spinner";
import * as Alerts from "../components/Alerts";

export default function SignInPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function assembleForm() {
    return (
      <form onSubmit={signIn}>
        <Input
          required
          type="email"
          placeholder="E-mail"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          disabled={loading}
        ></Input>
        <Input
          required
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          minLength={8}
          disabled={loading}
        ></Input>
        {!loading ? (
          <Button type="submit">Login</Button>
        ) : (
          <ThreeDots width={51} height={13} color="#FFFFFF" />
        )}
      </form>
    );
  }

  function signIn(event) {
    event.preventDefault();

    const URL = "http://localhost:5000/sign-in";

    setLoading(true);

    const promise = axios.post(URL, user);

    promise.then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/");
    });
    promise.catch((err) => {
      Alerts.smallAlert("error", err.response.data);
      setUser({
        email: "",
        password: "",
      });
      setLoading(false);
    });
  }

  return (
    <Page>
      <Title>SignIn</Title>
      {assembleForm()}
      <SignUpLink to="/sign-up">
        Don't have an account yet? Register here!
      </SignUpLink>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 45px;
  display: flex;
  justify-content: center;
  margin-bottom: 65px;
`;

const Input = styled.input`
  width: 30%;
  padding: 10px 10px 3px 24px;
  margin-bottom: 25px;
  transition: 0.2s;
  outline: none;
  border: none;
  border-bottom: 2px solid;
  border-image: linear-gradient(90deg, #743ad5, #d53a9d);
  border-image-slice: 1;
  background: none;
  color: #ffff;
  font-size: 15px;

  ::placeholder {
    outline: none;
    font-size: 15px;
    color: #a4a4a4;
    font-family: "Montserrat";
  }
  :valid {
    border-image: none;
    border-color: #03ac00;
  }
  @media (max-width: 768px) {
    width: 55%;
  }
`;

const Button = styled.button`
  width: 25%;
  border-radius: 6px;
  border: none;
  outline: none;
  background: linear-gradient(90deg, #743ad5, #d53a9d);
  background-size: 400%;
  margin-top: 10px;
  padding: 16px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  color: #ffff;
  text-transform: uppercase;

  :active,
  :focus,
  :hover {
    cursor: pointer;
    border-color: black;
  }
  @media (max-width: 768px) {
    width: 50%;
  }
`;

const SignUpLink = styled(Link)`
  margin-top: 30px;
  font-size: 15px;
  font-weight: 700;
  color: #ffff;
  text-decoration: none;
`;
