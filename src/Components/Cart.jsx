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
  const [selected, setSelected] = useState("");
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

  const handleSwipe = () => {
    console.log("swiped");
  };
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

      {cart.length === 0 ? (
        <div className="cart__info">
          <div>
            <img src="/app-image/empty-cart-rappi.webp" alt="empty-cart" />
          </div>
        </div>
      ) : (
        cart.map((item) => (
          <Swipe
            onSwipeLeft={(e) => {
              setSelected(item.CODE);
              handleSwipe();
            }}
          >
            <div
              onClick={() => setSelected()}
              className={`cart__item ${selected == item.CODE && "selected"}`}
            >
              <div className="cart__item--inner">
                <img
                  className="cart__item--img"
                  src={`/images${location}/${item.TYPE.split(" ").join(
                    "_"
                  )}.jpg`}
                  alt={"image"}
                />
                <div className="cart__item--details">
                  <span>{item.NAME}</span>
                  <p>{item.DESCRIPTION.split("").splice(0, 60).join("")}...</p>
                  <div className="cart__item--price">
                    {getSymbolFromCurrency(item.CURRENCY)} {item.PRICE}{" "}
                    <span>x {item.QUANTITY}</span>
                  </div>
                </div>
              </div>
              <div className="cart__item--delete--filter"></div>
              <div
                onClick={() => removeFromCart(item.CODE)}
                className="cart__item--delete"
              >
                X
              </div>
            </div>
          </Swipe>
        ))
      )}
      <footer className="cart__footer">
        <div className="cart__footer--item">
          <span>Subtotal</span>{" "}
          <span>
            {getSymbolFromCurrency("TRY")} {total}
          </span>
        </div>
        <div className="cart__footer--item">
          <span>Service</span> <span> {getSymbolFromCurrency("TRY")} 0</span>
        </div>
        <div className="cart__footer--item">
          <span>Total</span>{" "}
          <span>
            {getSymbolFromCurrency("TRY")} {total}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Cart;
