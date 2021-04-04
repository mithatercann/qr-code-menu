import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";

import getSymbolFromCurrency from "currency-symbol-map";

function Cart({
  cartData,
  openCartInfo,
  isCartOpened,
  closeCart,
  location,
  restaurantName,
  clearCart,
}) {
  const [cartLength, setCartLength] = useState();

  useEffect(() => {
    if (cartData) {
      if (cartData.length === 0) {
        closeCart();
      }
    }
  }, [cartData]);

  return (
    <div className={`cart ${isCartOpened}`}>
      <nav>
        <IoIosArrowBack size={24} onClick={() => closeCart()} />

        <AiOutlineDelete
          className="close"
          onClick={() => {
            clearCart();
          }}
          size={24}
        />
      </nav>
      <div className="break"></div>
      {!cartData || cartData.length === 0 ? (
        <div className="cart__info">
          <div>
            <img src="/app-image/empty-cart.jpg" alt="empty-cart" />
          </div>
        </div>
      ) : (
        <div className="cart__container">
          {cartData.map((item) => (
            <div
              onClick={() => openCartInfo(item)}
              className={`cart__item
          `}
            >
              <div className="cart__item--inner">
                <img
                  className="cart__item--img"
                  src={`/images${location}/${
                    item.PIC == "true" ? "pics" : "categories"
                  }/${
                    item.PIC == "true"
                      ? item.NAME.split(" ").join("_")
                      : item.TYPE.split(" ").join("_")
                  }.jpg`}
                  alt={"image"}
                />
                <div className="cart__item--details">
                  <span>{item.NAME}</span>
                  <p>{item.DESCRIPTION.split("").splice(0, 60).join("")}...</p>
                  <div className="cart__item--price">
                    {getSymbolFromCurrency(item.CURRENCY)} {item.PRICE}{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
