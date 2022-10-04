import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

import { ThreeDots } from "react-loader-spinner";
import * as Alerts from "../components/Alerts";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function assembleForm() {
    return (
      <form onSubmit={signUp}>
        <Input
          required
          type="text"
          placeholder="Name"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          minLength={2}
          maxLength={15}
          disabled={loading}
        ></Input>
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
        <Input
          required
          type="password"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          minLength={8}
          disabled={loading}
        ></Input>
        {!loading ? (
          <Button type="submit">Create Account</Button>
        ) : (
          <ThreeDots width={51} height={13} color="#FFFFFF" />
        )}
      </form>
    );
  }

  function signUp(event) {
    event.preventDefault();

    const URL = "http://localhost:5000/sign-up";

    setLoading(true);

    const promise = axios.post(URL, user);

    promise.then(() => {
      Alerts.smallAlert("success", "User registered successfully.");
      navigate("/sign-in");
    });
    promise.catch((err) => {
      Alerts.errorAlert(err.response.data);
      setUser({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setLoading(false);
    });
  }

  return (
    <Page>
      <Title>SignUp</Title>
      {assembleForm()}
      <SignInLink to="/sign-in">Already have an account? Login now!</SignInLink>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  margin-top: 90px;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
`;

const Input = styled.input`
  width: 30%;
  padding: 10px 10px 3px 24px;
  margin-bottom: 20px;
  transition: 0.2s;
  ::placeholder {
    font-size: 15px;
  }
  :active,
  :focus,
  :hover {
    border: 2px solid black;
  }
  :valid {
    border-color: #03ac00;
  }
  @media (max-width: 768px) {
    width: 55%;
  }
`;

const Button = styled.button`
  width: 25%;
  background-color: #2f2f2f;
  padding: 16px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  color: #ffff;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.2s;
  :active,
  :focus,
  :hover {
    outline: none;
    border-color: black;
  }
  @media (max-width: 768px) {
    width: 50%;
  }
`;

const SignInLink = styled(Link)`
  margin-top: 30px;
  font-size: 15px;
  font-weight: 700;
  color: #2f2f2f;
  text-decoration: none;
`;
