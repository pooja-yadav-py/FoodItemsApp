import React from "react";
import axios from "axios";
const API_BASE_URL = "http://localhost:8080";

const Basket = (props) => {
  async function clearFoodItems() {
    const foodData = await axios.post(`${API_BASE_URL}/products/clear`, {});
    props.updatedSelectedList(2);
    props.updateCartOpen(false);
    props.setCartItems([]);
  }

  

  async function handleDeleteOperation(item) {
    const deleteResponse = await axios.delete(
      `${API_BASE_URL}/products/deleteFoodItem`,
      {
        data: {
          _id: item._id,
        },
      }
    );
  }

  const removeClickHandler = (cartItem) => {

    let cartItems = props.cartItems;
    const productIndex = props.cartItems.findIndex((item) => {
      return item && item.name === cartItem.name;
    });

    cartItems = props.cartItems.filter(function (value, index) {
      return productIndex != index;
    });

    props.setCartItems(cartItems);
    handleDeleteOperation(cartItem);
  };

  if (props.cartItems !== undefined) {
    return (
      <>
        <h5 className="ordered-item w-93 text-center my-2 me-5">
          You Have Ordered : {props.cartItems.length}
        </h5>
        {props.cartItems.map(function (productItem, index) {
          return (
            <div className="card2 mb-3 mt-1 mx-auto">
              <div className="row g-0">
                <div className="pizzalistleft col-md-8">
                  <div className="card-body2">
                    <h5 className="card-title mb-1">{productItem.name}</h5>
                    <p className="card-text mt-0">{productItem.description}</p>
                    <p className="card-text mb-1">
                      <b className="text-muted">₹{productItem.price}</b>
                    </p>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeClickHandler(productItem)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="pizzalistright col-md-4">
                  <img
                    src={productItem.image}
                    alt="tomato pizza"
                    className="pizzalistmg my-4"
                  />
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="text-center my-2 mx-auto">
          <button
            type="button"
            className="btn btn-danger text-center"
            onClick={() => {
              clearFoodItems();
            }}
          >
            Place Order
          </button>
        </div>
      </>
    );
  }
};

export default Basket;
