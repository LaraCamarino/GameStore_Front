import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext";

import * as Alerts from "../components/Alerts";
import SadEmptyCart from "../assets/empty-cart.png";

export default function CartPage() {
  const navigate = useNavigate();

  const { shoppingCart, setShoppingCart } = useContext(UserContext);

  let itemsPrice = 0;
  const [promoCode, setPromoCode] = useState();
  const [discount, setDiscount] = useState(0);

  function EmptyCart() {
    return (
      <Cart>
        <img src={SadEmptyCart} alt=" "></img>
        <h1>Your cart is empty.</h1>
      </Cart>
    );
  }

  function ItemCart({ image, name, price, position }) {
    return (
      <Item>
        <div>
          <img src={image} alt=" "></img>
          <h1>{name}</h1>
        </div>
        <div>
          <button>-</button>
          <h2>NUM</h2>
          <button>+</button>
        </div>
        <div>
          <h3>${price}</h3>
          <h4 onClick={() => deleteItem(position)}>X</h4>
        </div>
      </Item>
    );
  }

  function PromoCode() {
    return (
      <PromoCodeBox>
        <h1>PROMO CODE</h1>
        <input
          type="number"
          placeholder="Enter promo code here."
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        ></input>
        <button onClick={() => setDiscount(promoCode)}>OK</button>
      </PromoCodeBox>
    );
  }

  function assembleCart() {
    return (
      <CartContainer>
        {shoppingCart.map((item, index) => (
          <ItemCart
            key={index}
            image={item.imageUrl}
            name={item.name}
            price={item.price}
            position={index}
          />
        ))}
      </CartContainer>
    );
  }

  function deleteItem(position) {
    setShoppingCart(shoppingCart.filter((item, index) => index !== position));
  }

  function calculatePrices() {
    let itemsSum = 0;
    shoppingCart.forEach((item) => {
      itemsSum = itemsSum + parseFloat(item.price);
    });
    itemsPrice = itemsSum;
    return (
      <SubTotal>
        <h1>SUBTOTAL</h1>
        <p>${itemsSum.toFixed(2)}</p>
      </SubTotal>
    );
  }

  function calculatePriceWithDiscount() {
    let totalPrice = itemsPrice - discount;

    return (
      <TotalPrice>
        <h1>TOTAL</h1>
        <p>${totalPrice.toFixed(2)}</p>
      </TotalPrice>
    );
  }

  return (
    <>
      <Page>
        <LeftSide>
          <Title>Shopping Cart</Title>
          {shoppingCart.length === 0 ? <EmptyCart /> : <>{assembleCart()}</>}
        </LeftSide>
        <RightSide>
          <h1>Order Summary</h1>
          {calculatePrices()}
          <PromoCode />
          {calculatePriceWithDiscount()}
          {shoppingCart.length === 0 ? (
            <Button
              onClick={() =>
                Alerts.warningAlert(
                  "Your cart is empty.",
                  "Please, add something to your cart before checking out."
                )
              }
            >
              CHECKOUT
            </Button>
          ) : (
            <Button onClick={() => navigate("/checkout")}>CHECKOUT</Button>
          )}
        </RightSide>
      </Page>
    </>
  );
}

const Page = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    align-items: center;
  }
`;

const Cart = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 325px;
    height: 175px;
  }
  h1 {
    color: #787878;
  }
`;

const LeftSide = styled.div`
  width: 60%;
  margin-right: 50px;

  @media (max-width: 768px) {
    width: 80%;
    margin-right: 0;
  }
`;

const Title = styled.h1`
  font-size: 50px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 40px;
`;

const CartContainer = styled.div``;

const Item = styled.div`
  margin-bottom: 10px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #787878;
  div {
    display: flex;
    align-items: center;
  }
  img {
    width: 60px;
    height: 85px;
    margin-right: 15px;
  }
  h1 {
    width: 300px;
    font-size: 15px;
    font-weight: 700;
    margin-right: 25px;
  }
  h3 {
    font-size: 17px;
    color: #787878;
    margin: 0px 15px 0px 25px;
    text-align: end;
  }
  h4 {
    font-size: 15px;
    font-weight: 700;
    text-align: end;
  }
`;

const RightSide = styled.div`
  width: 30%;
  height: 400px;
  background-color: #3b3b3c;
  padding: 30px;

  h1 {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const SubTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;

  h1 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }
  p {
    font-size: 18px;
    color: #ffff;
  }
`;

const PromoCodeBox = styled.div`
  margin-top: 20px;
  padding-top: 15px;
  border-top: 2px solid #2e2e2f;
  position: relative;

  h1 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  input {
    width: 75%;
    margin-right: 15px;
    transition: 0.2s;
    outline: none;
    border: none;
    border-bottom: 2px solid #743ad5;
    background: none;
    color: #ffff;
    font-size: 15px;

    ::placeholder {
      outline: none;
      font-size: 13px;
      color: #a4a4a4;
      font-family: "Montserrat";
    }
  }
  button {
    width: 20%;
    height: 40px;
    border-radius: 6px;
    border: none;
    outline: none;
    background: linear-gradient(90deg, #743ad5, #d53a9d);
    background-size: 400%;
    font-size: 15px;
    font-weight: 700;
    color: #ffff;
    text-transform: uppercase;
    position: absolute;
    right: 0;
    bottom: 0;

    :active,
    :focus,
    :hover {
      cursor: pointer;
      border-color: black;
    }
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 2px solid #2e2e2f;

  h1 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }
  p {
    font-size: 20px;
    color: #03ac00;
    font-weight: 700;
  }
`;

const Button = styled.button`
  width: 100%;
  border-radius: 6px;
  border: none;
  outline: none;
  background: linear-gradient(90deg, #743ad5, #d53a9d);
  background-size: 400%;
  margin-top: 30px;
  padding: 16px 20px;
  display: flex;
  justify-content: center;
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
`;