import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import getSymbolFromCurrency from "currency-symbol-map";
import Swipe from "react-easy-swipe";
import Sticky from "react-sticky-el";

function Cart({
  cartData,
  removeFromCart,
  isCartOpened,
  closeCart,
  location,
  restaurantName,
}) {
  const [selected, setSelected] = useState("");

  return (
    <div className={`cart ${isCartOpened}`}>
      <nav>
        <span>{restaurantName}</span>
        <IoCloseOutline
          className="close"
          size={30}
          onClick={() => {
            closeCart();
            setSelected();
          }}
        />
      </nav>

      {cartData.length === 0 ? (
        <div className="cart__info">
          <div>
            <img src="/app-image/empty-cart.jpg" alt="empty-cart" />
          </div>
        </div>
      ) : (
        <div className="cart__container">
          {cartData.map((item) => (
            <Swipe
              onSwipeLeft={(e) => {
                setSelected(item.CODE);
              }}
              onSwipeRight={() => {
                setSelected();
              }}
            >
              <div
                onClick={() => setSelected()}
                className={`cart__item ${selected == item.CODE && "selected"}`}
              >
                <div className="cart__item--inner">
                  <img
                    className="cart__item--img"
                    src={`/images${location}/${item.TYPE.split(" ").join(
                      "_"
                    )}.jpg`}
                    alt={"image"}
                  />
                  <div className="cart__item--details">
                    <span>{item.NAME}</span>
                    <p>
                      {item.DESCRIPTION.split("").splice(0, 60).join("")}...
                    </p>
                    <div className="cart__item--price">
                      {getSymbolFromCurrency(item.CURRENCY)} {item.PRICE}{" "}
                    </div>
                  </div>
                </div>
                <div className="cart__item--delete--filter"></div>
                <div
                  onClick={() => removeFromCart(item.CODE)}
                  className="cart__item--delete"
                >
                  <MdDelete size={22} />
                </div>
              </div>
            </Swipe>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
