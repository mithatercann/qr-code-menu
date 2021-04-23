import React from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { BiTrash } from "react-icons/bi";
function Popup({ warning, setWarning, clearCart, translateData }) {
  console.log("popup " + translateData);

  return (
    <div>
      <div
        onClick={() => {
          setWarning(false);
          enablePageScroll();
        }}
        className={`cart__popup--filter ${
          warning && "cart__popup--filter--opened"
        }`}
      ></div>
      <div className={`cart__popup ${warning && "cart__popup--opened"}`}>
        <BiTrash size={70} />
        <h3>{translateData.popup}</h3>

        <div className="cart__popup--btns">
          <button
            onClick={() => {
              setWarning(false);
              enablePageScroll();
            }}
          >
            {translateData.cancel}
          </button>
          <button
            onClick={() => {
              clearCart();
              setWarning(false);
              enablePageScroll();
            }}
            className="cart__popup--btns--clear"
          >
            {translateData.clear}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
