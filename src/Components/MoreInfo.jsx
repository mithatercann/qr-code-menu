import React, { useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { AiOutlineFieldTime, AiOutlineHeart } from "react-icons/ai";
function MoreInfo({
  data,
  isInfoOpened,
  closeInfo,
  location,
  addToCart,
  translateData,
  language,
}) {
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
                      ? item.NAME[item.DEFAULT].split(" ").join("_")
                      : item.TYPE[item.DEFAULT].split(" ").join("_")
                  }.jpg')`,
                }}
                className="info__img"
              ></div>
              <div className="info__inner">
                <div className="info__top">
                  <div className="info__details">
                    <span>{item.NAME[language]}</span>
                    <p>{item.DESCRIPTION[language]}</p>
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
                  {translateData.moreInfo}
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
