import React from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { AiOutlineFieldTime } from "react-icons/ai";
function MoreInfo({ data, isInfoOpened, closeInfo, location }) {
  console.log("info : " + isInfoOpened);
  return (
    <div className={`info ${isInfoOpened ? "info__opened" : "info__closed"}`}>
      <div onClick={() => closeInfo()} className="info__filter"></div>
      <div className="info__container">
        <div className="info__wrapper">
          {data.map((item) => (
            <div>
              <div className="info__top">
                <div className="info__details">
                  <span>{item.NAME}</span>
                  <p>
                    sHere is for product's description that i will complete
                    later on...
                  </p>
                </div>

                <img
                  className={"info__img"}
                  src={`/images${location}/${item.TYPE.split(" ").join(
                    "_"
                  )}.jpg`}
                  alt={"image"}
                />
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

              <footer className="info__footer">
                <button className="info__btn info__btn--add">
                  Add to cart
                </button>
                <a className="info__btn info__btn--call">Call restaurant</a>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoreInfo;
