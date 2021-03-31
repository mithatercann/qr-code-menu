import React, { useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { AiOutlineFieldTime } from "react-icons/ai";
import "react-slidedown/lib/slidedown.css";
function MoreInfoCart({
  data,
  isCartInfoOpened,

  location,

  removeFromCart,
  closeCartInfo,
}) {
  const [scrolled, setScrolled] = useState(0);
  const [transition, setTransition] = useState(0);
  var style = {
    bottom: `-${scrolled}px`,
    transition: `${transition}s`,
  };
  const handleTouch = (e) => {
    setScrolled(e.touches[0].clientY / 1.7);
  };
  const handleTouchEnd = () => {
    if (scrolled < 100) {
      setScrolled(0);
    } else {
      setTransition(0.3);
      setScrolled(scrolled * 2);
      closeCartInfo();
      setTimeout(() => {
        setScrolled(0);
        setTransition(0);
      }, 320);
    }
  };

  return (
    <div
      className={`info ${isCartInfoOpened ? "info__opened" : "info__closed"}`}
    >
      <div
        onClick={() => {
          closeCartInfo();
        }}
        className="info__filter"
      ></div>
      <div
        className="info__container"
        onTouchMove={(e) => handleTouch(e)}
        onTouchEnd={() => handleTouchEnd()}
        style={style}
      >
        <div className="info__wrapper">
          {data.map((item) => (
            <div>
              <div
                style={{
                  backgroundImage: `url('/images${location}/${item.TYPE.split(
                    " "
                  ).join("_")}.jpg')`,
                }}
                className="info__img"
              ></div>
              <div className="info__inner">
                <div className="info__top">
                  <div className="info__details">
                    <span>{item.NAME}</span>
                    <p>{item.DESCRIPTION}</p>
                  </div>
                </div>

                <div className="info__bottom">
                  <div className="info__price">
                    {getSymbolFromCurrency(item.CURRENCY)} {item.PRICE}
                  </div>
                  <div className="info__duration">
                    <AiOutlineFieldTime size={20} />
                    15-30 min
                  </div>
                </div>
                <button
                  onClick={() => {
                    removeFromCart(item.CODE);
                    closeCartInfo();
                  }}
                  className="info__btn info__btn--delete"
                >
                  Remove from cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoreInfoCart;
