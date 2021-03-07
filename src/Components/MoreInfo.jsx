import React from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { AiOutlineFieldTime } from "react-icons/ai";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
function MoreInfo({ data, isInfoOpened, closeInfo, location, addToCart }) {
  const handleMouseMove = (e) => {
    console.log(e.clientY + "container =" + e.target);
  };

  return (
    <div className={`info ${isInfoOpened ? "info__opened" : "info__closed"}`}>
      <div onClick={() => closeInfo()} className="info__filter"></div>
      <div className="info__container">
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
                  <div className="info--btns">
                    <button className="info--decrease">-</button>
                    <span>0</span>
                    <button className="info--increase">+</button>
                  </div>
                </div>
              </div>

              <footer className="info__footer">
                <button
                  onClick={() => addToCart(item)}
                  className="info__btn info__btn--add"
                >
                  Add to cart
                </button>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoreInfo;
