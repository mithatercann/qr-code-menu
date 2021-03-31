import React, { useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { AiOutlineFieldTime } from "react-icons/ai";
import "react-slidedown/lib/slidedown.css";
function MoreInfo({ data, isInfoOpened, closeInfo, location, addToCart }) {
  const [scrolled, setScrolled] = useState(0);
  const [transition, setTransition] = useState(0);
  const [opacity, setOpacity] = useState(0);
  var style = {
    bottom: `-${scrolled}px`,
    transition: `${transition}s`,
  };
  var filterStyle = {
    opacity: opacity,
  };
  useEffect(() => {
    if (isInfoOpened) {
      setTimeout(() => setOpacity(1), 220);
    }
  }, [isInfoOpened]);

  const handleTouch = (e) => {
    setScrolled(e.touches[0].clientY / 1.7);
  };
  const handleTouchEnd = () => {
    if (scrolled < 140) {
      setScrolled(0);
      setTransition(0.1);
      setTimeout(() => {
        setTransition(0);
      }, 290);
    } else {
      setTransition(0.1);

      setScrolled(scrolled * 2);
      setOpacity(0);
      setTimeout(() => {
        closeInfo();
      }, 80);
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
          setOpacity(0);
          setTimeout(() => {
            closeInfo();
          }, 80);
        }}
        className="info__filter"
        style={filterStyle}
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
                  backgroundImage: `url('/images${location}/${
                    item.PIC == "true" ? "pics" : "categories"
                  }/${
                    item.PIC == "true"
                      ? item.NAME.split(" ").join("_")
                      : item.TYPE.split(" ").join("_")
                  }.jpg')`,
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
                    {item.DURATION} min
                  </div>
                </div>
                <button
                  onClick={() => {
                    addToCart(item);
                    setOpacity(0);
                    setTimeout(() => {
                      closeInfo();
                    }, 80);
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
