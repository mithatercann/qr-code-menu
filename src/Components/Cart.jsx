import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import getSymbolFromCurrency from "currency-symbol-map";
import Swipe from "react-easy-swipe";
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
    const total = cartData.reduce(
      (acc, item) => parseInt(item.PRICE * item.QUANTITY) + acc,
      0
    );
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
            <Swipe onSwipeLeft={() => removeFromCart(item.CODE)}>
              <div className="cart__item">
                <div className="cart__item--top">
                  <img
                    className="cart__item--img"
                    src={`/images${location}/${item.TYPE.split(" ").join(
                      "_"
                    )}.jpg`}
                    alt={"image"}
                  />
                  <div className="cart__item--details">
                    <span>{item.NAME}</span>
                    <p>
                      {item.DESCRIPTION.split("").splice(0, 60).join("")}...
                    </p>
                    <div className="cart__item--price">
                      {getSymbolFromCurrency(item.CURRENCY)} {item.PRICE}{" "}
                      <span>x {item.QUANTITY}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Swipe>
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
            {getSymbolFromCurrency(currency)} 0
          </div>

          <div className="cart__footer--total cart__footer--item">
            <span>Total</span> {getSymbolFromCurrency(currency)} {total}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Cart;
