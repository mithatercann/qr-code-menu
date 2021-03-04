import React, { useState, useEffect, useLayoutEffect } from "react";

import Layout from "./Components/Layout";

function App() {
  const [data, setData] = useState([]);
  const [menuTitle, setMenuTitle] = useState([]);
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState("");
  const [menuList, setMenuList] = useState([]);
  const [cart, setCart] = useState([]);
  const API = "./db.json";

  const callMenuList = (titleProp) => {
    setTitle(titleProp);
    const filterMenuList = data.filter((title) => title.TYPE == titleProp);
    setMenuList(filterMenuList);
  };

  const addToCart = (data) => {
    setCart([...cart, data]);
  };

  const removeFromCart = (itemId) => {
    const cartItems = cart;

    cartItems.map((item) => {
      if (item.CODE == itemId) {
        const filtered = cartItems.filter(
          (cartItem) => cartItem.CODE != itemId
        );
        setCart(filtered);
      }
    });
  };

  useEffect(() => {
    const titles = [];
    const fetchData = async () => {
      const response = await fetch(API);
      const responseData = await response.json();
      setData(responseData);
      console.log(responseData);

      // Filtering menu types
      responseData.map((item) => titles.push(item.TYPE));
      const filtered = titles.filter(
        (item, index, self) => self.indexOf(item) == index
      );
      setMenuTitle(filtered);

      const initialMenuList = responseData.filter(
        (item) => item.TYPE == filtered[0]
      );

      setTitle(initialMenuList[0].TYPE);
      setCurrency(initialMenuList[0].CURRENCY);
      setMenuList(initialMenuList);
    };
    fetchData();
  }, []);

  return (
    <Layout
      menuTitles={menuTitle}
      menuList={menuList}
      data={data}
      callMenuList={(titleProp) => callMenuList(titleProp)}
      addToCart={(data) => addToCart(data)}
      removeFromCart={(itemId) => removeFromCart(itemId)}
      cartData={cart}
      title={title}
      currency={currency}
    />
  );
}

export default App;
