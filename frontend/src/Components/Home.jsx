import React, { useState, useEffect } from "react";

import BurgerList from "./FoodItems";
// import ProductJSON from "./Product.json";
import "../index.css";

const Home = (props) => {
  const showPizzaItems = (selected) => {
    props.updatedSelectedList(selected);
  };

  if (!props.foodItems || (props.foodItems && props.foodItems.length == 0)) {
    return <span>loading data..</span>;
  }
  return (
    <>
      {props.selectedList == 2 && (
        <div className="container d-flex justify-content-center">
          <div
            className="card my-3 me-3"
            style={{ width: "11rem" }}
            onClick={() => showPizzaItems(0)}
          >
            <div className="outerDiv">
              <div className="innerdiv">
                <img
                  src={props.foodItems[0].image}
                  className="card-img-top"
                  alt="pizza"
                />
              </div>
              <div className="card-body ">
                <p className="card-text mt-1 ">{props.foodItems[0].name}</p>
              </div>
            </div>
          </div>

          <div
            className="card my-3"
            style={{ width: "11rem" }}
            onClick={() => showPizzaItems(1)}
          >
            <div className="outerDiv1">
              <div className="innerdiv1">
                <img
                  src={props.foodItems[1].image}
                  className="card-img-top"
                  alt="image"
                />
              </div>
              <div className="card-body">
                <p className="card-text mt-1">{props.foodItems[1].name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {!props.cartOpen && (
        <BurgerList
          selectedList={props.selectedList}
          cartItems={props.cartItems}
          setCartItems={props.setCartItems}
          foodItems={props.foodItems}
        />
      )}
    </>
  );
};

export default Home;
