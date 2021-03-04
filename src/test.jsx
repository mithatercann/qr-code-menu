import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import "./main.css";
const App = () => {
  const callIt = () => {
    setMenuType(
      menuType.filter((item, index, self) => self.indexOf(item) == index)
    );
  };

  const checkCart = (itemName, itemPrice, itemCount) => {
    let arr = [...cart];

    setCart([
      ...cart,
      {
        name: itemName,
        price: itemPrice,
        count: parseInt(itemCount) + 1,
      },
    ]);

    console.log(arr.map((item) => item.name == itemName));
  };

  useEffect(() => {
    const fetchData = () => {
      const arr = [];
      fetch(API)
        .then((resp) => resp.json())
        .then((data) => {
          setData(data);
          data.forEach((item) => {
            arr.push(item.TYPE);
          });
          setMenuType(arr);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  return (
    <div>
      <button onClick={callIt}>CALL IT</button>
      <div>
        {menuType.map((item) => (
          <div>
            <p>{item}</p>
            <ul>
              {data.map((dataItem) =>
                dataItem.TYPE == item ? (
                  <li>
                    {dataItem.NAME} {dataItem.PRICE} {dataItem.CURRENCY}
                    <button
                      onClick={() => {
                        setTotal(total + parseInt(dataItem.PRICE));
                        checkCart(dataItem.NAME, dataItem.PRICE, dataItem.TAX);
                      }}
                    >
                      +
                    </button>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        ))}
      </div>

      <div>
        CART :
        <br />
        <ul>
          {cart.map((item) => (
            <li>
              {item.name} {item.price} count : {item.count}
            </li>
          ))}
        </ul>
      </div>
      <span>TOTAL : {total} AZN</span>
    </div>
  );
};

render(<App />, document.getElementById("root"));
