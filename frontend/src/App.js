import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Basket from "./Components/Basket";
import axios from "axios";
const API_BASE_URL = "http://localhost:8080";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, updateCartOpen] = useState(false);
  const [selectedList, updatedSelectedList] = useState(2);

  const [foodItems, updatefoodItems] = useState([]);
  async function fetchFoodItems() {
    const foodData = await axios.get(`${API_BASE_URL}/products/foods`);
    const dataFormAPI = foodData.data.results.result;

    updatefoodItems(dataFormAPI);
  }


  async function fetchCartData() {
    const cartData = await axios.get(`${API_BASE_URL}/products/cartData`);
    const dataFormAPI = cartData.data.results;
    setCartItems(dataFormAPI);
  }

  useEffect(() => {
    fetchFoodItems();
    fetchCartData();
  }, []);

  return (
    <>
      <Header cartItems={cartItems} updateCartOpen={updateCartOpen} />
      <Home
        cartItems={cartItems}
        setCartItems={setCartItems}
        cartOpen={cartOpen}
        updateCartOpen={updateCartOpen}
        selectedList={selectedList}
        updatedSelectedList={updatedSelectedList}
        foodItems={foodItems}
      />
      {cartOpen && (
        <Basket
          setCartItems={setCartItems}
          cartItems={cartItems}
          updatedSelectedList={updatedSelectedList}
          updateCartOpen={updateCartOpen}
        />
      )}
    </>
  );
};

export default App;
