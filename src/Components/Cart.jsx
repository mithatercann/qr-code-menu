import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import getSymbolFromCurrency from "currency-symbol-map";

function Cart({
  currency,
  cartData,
  removeFromCart,
  isCartOpened,
  closeCart,
  location,
  restaurantName,
}) {
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
      <nav>
        <span>{restaurantName}</span>
        <IoCloseOutline
          className="close"
          size={30}
          onClick={() => closeCart()}
        />
      </nav>
      <div className="cart__container">
        {cart.length === 0 ? (
          <div className="cart__info">
            <div>
              <img
                src="https://cdn.dribbble.com/users/44167/screenshots/4199208/empty-cart-rappi.png?compress=1&resize=800x600"
                alt=""
              />
            </div>
          </div>
        ) : (
          cart.map((item) => (
            <div className="cart__item">
              <div className="cart__item--top">
                <div className="cart__item--details">
                  <span>{item.NAME}</span>
                  <p>
                    Here is for product's description that i will complete later
                    on...
                  </p>
                </div>
                <img
                  className="cart__item--img"
                  src={`/images${location}/${item.TYPE.split(" ").join(
                    "_"
                  )}.jpg`}
                  alt={"image"}
                />
              </div>
              <div className="cart__item--bottom">
                <div className="cart__item--price">
                  {getSymbolFromCurrency(item.CURRENCY)} {item.PRICE}
                </div>
                <div className="cart__item--btns">
                  <button className="cart__item--increase">+</button>
                  <span>0</span>
                  <button
                    className="cart__item--decrease"
                    onClick={() => removeFromCart(item.CODE)}
                  >
                    -
                  </button>
                </div>
              </div>
              {/* <MdDeleteForever
      size={22}
      
    /> */}
            </div>
          ))
        )}
      </div>

      <footer className="cart__footer">
        <div className="cart__footer--container">
          <div className="cart__footer--subtotal cart__footer--item">
            <span>Subtotal</span>
            {getSymbolFromCurrency(currency)} {total}
          </div>
          <div className="cart__footer--service cart__footer--item">
            <span>Service</span>
            {getSymbolFromCurrency(currency)} {total % 10}
          </div>

          <div className="cart__footer--total cart__footer--item">
            <span>Total</span> {getSymbolFromCurrency(currency)}{" "}
            {total + (total % 10)}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Cart;
