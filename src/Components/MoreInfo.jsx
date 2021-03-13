import React, { useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { AiOutlineFieldTime } from "react-icons/ai";
import Swipe from "react-easy-swipe";

import "react-slidedown/lib/slidedown.css";
function MoreInfo({ data, isInfoOpened, closeInfo, location, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quantity <= 1) {
      setQuantity(1);
    }
  }, [quantity]);

  return (
    <Swipe onSwipeDown={() => closeInfo()}>
      <div className={`info ${isInfoOpened ? "info__opened" : "info__closed"}`}>
        <div
          onClick={() => {
            closeInfo();
            setQuantity(1);
          }}
          className="info__filter"
        ></div>
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
                      if (quantity !== 0) {
                        addToCart(item, quantity);
                      }
                      setQuantity(1);
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
    </Swipe>
  );
}

export default MoreInfo;
