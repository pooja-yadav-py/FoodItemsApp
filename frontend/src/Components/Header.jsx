import React, { useState } from "react";
import "../index.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { PinDropSharp } from "@material-ui/icons";

const Header = (props) => {
  return (
    <>
      <nav className="navbar navbar-light pt-1 pb-1">
        <div className="text-center w-100 text-light d-flex">
          <div className="header w-100 mt-1 mb-1">
            <h5>Food Odering Portal</h5>
          </div>
          <div
            onClick={() => props.updateCartOpen(true)}
            className="shopping d-flex me-3 mt-1 align-item-center"
          >
            <ShoppingCartIcon />
            <i className="px-1">{props.cartItems.length}</i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
