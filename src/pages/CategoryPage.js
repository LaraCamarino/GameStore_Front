import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";

import { ThreeDots } from "react-loader-spinner";
import * as Alerts from "../components/Alerts";

export default function CategoryPage() {
  const navigate = useNavigate();
  const { category } = useParams();

  const { shoppingCart, setShoppingCart } = useContext(UserContext);

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
          <ProductBox>
            <Product
              key={index}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <Image src={product.imageUrl}></Image>
              <h1>{product.name}</h1>
              <h2>${product.price}</h2>
            </Product>
            <button
              onClick={() => {
                addToCart(product);
              }}
            >
              Add
            </button>
          </ProductBox>
        ))}
      </>
    );
  }

  function addToCart(product) {
    setShoppingCart([...shoppingCart, product]);
    Alerts.smallAlert("success", "Product added to cart successfully!");
  }

  return (
    <>
      <Page>
        {loading ? (
          <ThreeDots width={51} height={13} color="#FFFFFF" />
        ) : (
          <Container>{assembleProducts()}</Container>
        )}
      </Page>
    </>
  );
}

const Page = styled.div`
  min-height: 100vh;
  width: 100%;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 40px;
  padding-left: 20px;
  font-size: 50px;
  text-transform: capitalize;
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
  padding: 0px 220px;
`;

const ProductBox = styled.div`
  position: relative;

  button {
    width: 60px;
    height: 40px;
    color: #ffff;
    border-radius: 20px;
    border: none;
    outline: none;
    background: linear-gradient(90deg, #743ad5, #d53a9d);
    background-size: 400%;
    position: absolute;
    right: 40px;
    bottom: 20px;
  }
`;

const Product = styled.div`
  width: 250px;
  padding: 10px;
  margin: 20px;
  transition: 0.2s;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  cursor: pointer;

  h1 {
    width: 220px;
    height: 50px;
    font-size: 25px;
    font-weight: 700;
    margin-top: 15px;
    margin-bottom: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  h2 {
    font-size: 20px;
    text-align: start;
  }
`;

const Image = styled.img`
  width: 220px;
  height: 295px;
`;