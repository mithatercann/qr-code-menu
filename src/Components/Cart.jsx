import React, { useEffect, useState } from "react";
import { MdDeleteForever, MdClose } from "react-icons/md";
import getSymbolFromCurrency from "currency-symbol-map";

import { v4 as uuid } from "uuid";

function Cart({ currency, cartData, removeFromCart, isCartOpened, closeCart }) {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const total = cartData.reduce((acc, item) => parseInt(item.PRICE) + acc, 0);
    setTotal(total);

    const filtered = cartData.filter(
      (item, index, self) => self.indexOf(item) == index
    );

    setCart(filtered);
  }, [cartData]);

  return (
    <div className={`cart ${isCartOpened}`}>
      <MdClose className="close" size={30} onClick={() => closeCart()} />
      <div className="cart__container">
        {cart.map((item) => (
          <div className="cart__item" key={uuid()}>
            {item.NAME} {item.PRICE} {item.CURRENCY}
            <MdDeleteForever
              size={22}
              onClick={() => removeFromCart(item.CODE)}
            />
          </div>
        ))}
      </div>

      <footer className="cart__footer">
        <div className="cart__footer--container">
          <span> ORDER TOTAL :</span>
          <span className="cart__footer--total">
            {total} {getSymbolFromCurrency(currency)}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Cart;
