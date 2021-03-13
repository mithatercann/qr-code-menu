import React, { useState, useEffect } from "react";
import Layout from "./Components/Layout";
import { BrowserRouter as Router, useLocation, Route } from "react-router-dom";

function App() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [menuTitle, setMenuTitle] = useState([]);
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState("");
  const [menuList, setMenuList] = useState([]);
  const [cart, setCart] = useState([]);
  const [info, setInfo] = useState([]);
  const [isInfoOpened, setIsInfoOpened] = useState(false);
  const API = `./database${location.pathname}/db.json`;

  const restaurantName = location.pathname
    .split("")
    .splice(1, location.pathname.length)
    .join("")
    .toUpperCase();

  const callMenuList = (titleProp) => {
    setTitle(titleProp);
    const filterMenuList = data.filter((title) => title.TYPE == titleProp);
    setMenuList(filterMenuList);
  };

  const addToCart = (data, quantity) => {
    data.QUANTITY = quantity;
    setCart([...cart, data]);
  };

  const closeInfo = () => {
    setIsInfoOpened(false);
    document.documentElement.style.overflowY = "scroll";
  };
  const openInfo = (item) => {
    setInfo([item]);
    setIsInfoOpened(true);
    document.documentElement.style.overflowY = "hidden";
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
      addToCart={(data, quantity) => addToCart(data, quantity)}
      removeFromCart={(itemId) => removeFromCart(itemId)}
      cartData={cart}
      title={title}
      currency={currency}
      location={location.pathname}
      restaurantName={restaurantName}
      info={info}
      isInfoOpened={isInfoOpened}
      closeInfo={() => closeInfo()}
      openInfo={(item) => openInfo(item)}
    />
  );
}

export default App;
