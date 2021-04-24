import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineClear } from "react-icons/ai";
import { animateScroll as scroll } from "react-scroll";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import getSymbolFromCurrency from "currency-symbol-map";

function Cart({
  cartData,
  openCartInfo,
  isCartOpened,
  closeCart,
  location,
  restaurantName,
  clearCart,
  setWarning,
  translateData,
}) {
  const [cartLength, setCartLength] = useState();
  const w = window.innerWidth;
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
        <IoIosArrowBack size={26} onClick={() => closeCart()} />
        <p>{translateData.cart}</p>
        <AiOutlineClear
          onClick={() => {
            if (cartData.length !== 0) {
              disablePageScroll();
              setWarning(true);
            }
            scroll.scrollToTop();
          }}
          className="delete"
          size={26}
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
                  src={`http://5.189.162.97:1234/${location}/${
                    item.PIC == "true" ? "pics" : "categories"
                  }/${
                    item.PIC == "true"
                      ? item.NAME.split(" ").join("_")
                      : item.TYPE.split(" ").join("_")
                  }.jpg`}
                  alt={"image"}
                />
                <div className="cart__item--details">
                  <span>
                    {" "}
                    {item.NAME.split("").splice(0, 15).join("")}
                    {item.NAME.length < 17 ? "" : "..."}
                  </span>
                  {w < 331 ? (
                    <p>
                      {item.DESCRIPTION.split("").splice(0, 35).join("")}...
                    </p>
                  ) : (
                    <p>
                      {item.DESCRIPTION.split("").splice(0, 60).join("")}...
                    </p>
                  )}
                  <div className="cart__item--price">
                    {getSymbolFromCurrency(item.CURRENCY)} {item.PRICE}{" "}
                  </div>
                </div>
                <IoIosArrowForward size={22} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
