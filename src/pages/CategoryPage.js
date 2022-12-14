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
    const URL = `https://project-gamestore.herokuapp.com/products/categories/${category}`;

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

  useEffect(() => getProductsByCategory(), [category]);

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
          <Text>There are no products yet.</Text>
        </>
      );
    }

    return (
      <>
        {products.map((product, index) => (
          <ProductBox key={index}>
            <Product onClick={() => navigate(`/product/${product.id}`)}>
              <Image src={product.imageUrl}></Image>
              <h1>{product.name}</h1>
              <h2>${product.price / 100}</h2>
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
    let newCart = [...shoppingCart];
    let productAlreadyInCart = shoppingCart.find(
      (item) => item.id === product.id
    );
    if (productAlreadyInCart) {
      productAlreadyInCart.quantity++;
    } else {
      let newProduct = { ...product, quantity: 1 };
      newCart.push(newProduct);
    }

    setShoppingCart(newCart);
    Alerts.smallAlert("success", "Product added to cart successfully!");
  }

  return (
    <>
      <Page>
        {loading ? (
          <ThreeDots width={51} height={13} color="#FFFFFF" />
        ) : (
          <>
            <Title>{category}</Title>
            <Container>{assembleProducts()}</Container>
          </>
        )}
      </Page>
    </>
  );
}

const Page = styled.div`
  width: 100%;
  padding: 0px 50px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  font-size: 50px;
  text-transform: uppercase;

  @media (max-width: 440px) {
    font-size: 35px;
  }
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
  justify-content: center;
  align-items: center;
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
    background: linear-gradient(90deg, #772aff, #2196f3);
    background-size: 200%;
    position: absolute;
    right: 40px;
    bottom: 20px;
    cursor: pointer;
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
