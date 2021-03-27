import React, { useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { AiOutlineFieldTime } from "react-icons/ai";
import "react-slidedown/lib/slidedown.css";
function MoreInfo({ data, isInfoOpened, closeInfo, location, addToCart }) {
  const [scrolled, setScrolled] = useState();
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
      setTransition(1);
      setScrolled(500);
      closeInfo();
      setTimeout(() => {
        setScrolled(0);
        setTransition(0);
      }, 500);
    }
  };

  return (
    <div className={`info ${isInfoOpened ? "info__opened" : "info__closed"}`}>
      <div
        onClick={() => {
          closeInfo();
        }}
        className="info__filter"
      ></div>
      <div
        className={`info__container ${
          isInfoOpened ? "info__container--opened" : "info__container--closed"
        }`}
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
                    addToCart(item);

                    closeInfo();
                  }}
                  className="info__btn info__btn--add"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoreInfo;
