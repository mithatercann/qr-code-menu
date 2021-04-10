import React from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { CgDanger } from "react-icons/cg";
function Popup({ warning, setWarning, clearCart }) {
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
        <CgDanger size={70} />
        <p>Do you want to clear the cart?</p>
        <div className="cart__popup--btns">
          <button
            onClick={() => {
              setWarning(false);
              enablePageScroll();
            }}
          >
            No
          </button>
          <button
            onClick={() => {
              clearCart();
              setWarning(false);
              enablePageScroll();
            }}
            className="cart__popup--btns--clear"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
