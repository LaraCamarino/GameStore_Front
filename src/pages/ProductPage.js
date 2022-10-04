import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { ThreeDots } from "react-loader-spinner";
import * as Alerts from "../components/Alerts";

export default function ProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();

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
    alert("Clicked.");
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
  margin-top: 90px;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 520px;
  h1 {
    font-size: 40px;
    font-weight: 700;
  }
  h2 {
    font-size: 30px;
    color: #787878;
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
    background-color: #2f2f2f;
    border-radius: 5px;
    border: 1px solid #888888;
    box-shadow: 0px 2px 2px #888888;
    font-size: 14px;
    font-weight: 700;
    color: #ffff;
    :active,
    :focus,
    :hover {
      outline: none;
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
