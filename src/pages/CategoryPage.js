import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { ThreeDots } from "react-loader-spinner";

export default function CategoryPage() {
  const navigate = useNavigate();
  const { category } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  function getProductsByCategory() {
    const URL = `http://localhost:5000/products/categories/${category}`;

    const promise = axios.get(URL);
    setLoading(true);

    promise.then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
    promise.catch((err) => {
      setLoading(false);
      setError(err.response.data);
    });
  }

  useEffect(() => getProductsByCategory(), []);

  function assembleProducts() {
    if (error) {
      return (
        <>
          <Text>{error}</Text>
        </>
      );
    }

    if (products.length === 0) {
      return (
        <>
          <Title>{category}</Title>
          <Text>There are no products yet.</Text>
        </>
      );
    }

    return (
      <>
        <Title>{category}</Title>
        {products.map((product, index) => (
          <Product
            key={index}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <Image src={product.imageUrl}></Image>
            <h1>{product.name}</h1>
            <h2>${product.price}</h2>
          </Product>
        ))}
      </>
    );
  }

  return (
    <>
      <Page>
        {loading ? (
          <ThreeDots width={51} height={13} color="#FFFFFF" />
        ) : (
          <Container> {assembleProducts()} </Container>
        )}
      </Page>
    </>
  );
}

const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  margin-top: 90px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 50px;
`;

const Text = styled.h1`
  font-size: 25px;
  font-weight: 400;
  color: #c9c9c9;
  margin-top: 55px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

const Product = styled.div`
  width: 220px;
  padding: 10px;
  margin: 20px;
  border-radius: 15px;
  border: 1px solid #888888;
  transition: 0.2s;
  flex-wrap: wrap;
  :hover {
    outline: none;
    border: 3px solid lightgray;
    box-shadow: 0px 2px 2px red;
  }
  h1 {
    height: 75px;
    font-size: 25px;
    font-weight: 700;
    margin-top: 7px;
    margin-bottom: 15px;
  }
  h2 {
    font-size: 20px;
    text-align: end;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 275px;
  border-radius: 6px;
  object-fit: cover;
`;
