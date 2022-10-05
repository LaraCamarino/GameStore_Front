import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";

import { ThreeDots } from "react-loader-spinner";
import * as Alerts from "../components/Alerts";

export default function ProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { shoppingCart, setShoppingCart } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState([]);

  function getProductById() {
    const URL = `http://localhost:5000/products/${productId}`;

    const promise = axios.get(URL);
    setLoading(true);

    promise.then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
    promise.catch((err) => {
      setLoading(false);
      setError(err.response.data);
    });
  }

  useEffect(() => getProductById(), []);

  function assembleProduct() {
    if (error) {
      return (
        <>
          <Text>{error}</Text>
        </>
      );
    }

    if (product.length === 0) {
      return (
        <>
          <Text>The product is no longer available.</Text>
        </>
      );
    }

    return (
      <>
        <Container>
          <MainInfo>
            <Image src={product.imageUrl}></Image>
            <Text>
              <h1>{product.name}</h1>
              <AdicionalInfo></AdicionalInfo>
              <h2>${product.price}</h2>
              <Buttons>
                <button
                  onClick={() => {
                    buyProduct();
                    navigate("/cart");
                  }}
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    buyProduct();
                    Alerts.smallAlert(
                      "success",
                      "Product added to cart successfully!"
                    );
                  }}
                >
                  Add to Cart
                </button>
              </Buttons>
            </Text>
          </MainInfo>
        </Container>
      </>
    );
  }

  function buyProduct() {
    setShoppingCart([...shoppingCart, product]);
  }

  return (
    <Page>
      {loading ? (
        <ThreeDots width={51} height={13} color="#FFFFFF" />
      ) : (
        <>{assembleProduct()}</>
      )}
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainInfo = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Image = styled.img`
  width: 375px;
  height: 450px;
  object-fit: contain;
  margin-right: 30px;
  @media (max-width: 913px) {
    margin: 0px 0px 20px 0px;
  }
`;

const Text = styled.div`
  width: 520px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    font-size: 50px;
    font-weight: 700;
    color: white;
  }
  h2 {
    font-size: 30px;
    color: white;
  }
  @media (max-width: 913px) {
    padding: 15px;
    max-width: 375px;
    h2 {
      margin: 30px 0px;
    }
  }
`;

const Buttons = styled.div`
  button {
    width: 40%;
    padding: 12px 15px;
    margin-right: 25px;
    font-size: 14px;
    font-weight: 700;
    color: #ffff;
    outline: none;
    border-radius: 6px;
    border: none;
    background: linear-gradient(90deg, #743ad5, #d53a9d);
    background-size: 400%;
    text-transform: uppercase;

    :active,
    :focus,
    :hover {
      border-color: black;
      cursor: pointer;
    }
  }

  @media (max-width: 913px) {
    display: flex;
    justify-content: space-between;
    button {
      margin-right: 0px;
    }
  }
`;

const AdicionalInfo = styled.div`
  max-width: 375px;
  flex-wrap: wrap;
  padding: 20px 0px;
  text-align: justify;

  h1 {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 15px;
  }
  h2 {
    font-size: 15px;
    line-height: 15px;
  }
`;
