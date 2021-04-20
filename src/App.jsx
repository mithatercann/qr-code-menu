import React, { useState, useEffect } from "react";
import Layout from "./Components/Layout";
import Intro from "./Components/Intro";
import { BrowserRouter as Router, useLocation, Route } from "react-router-dom";

function App({ languages }) {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [menuTitle, setMenuTitle] = useState([]);
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState("");
  const [language, setLanguage] = useState(languages[0].language);
  const [menuList, setMenuList] = useState([]);
  const [cart, setCart] = useState([]);
  const [info, setInfo] = useState([]);
  const [cartInfo, setCartInfo] = useState([]);
  const [isInfoOpened, setIsInfoOpened] = useState(false);
  const [isCartInfoOpened, setIsCartInfoOpened] = useState(false);
  const API = `./database${location.pathname}/${language}/db.json`;

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

  const addToCart = (data) => {
    if (!cart.includes(data)) {
      setCart([...cart, data]);
    }
  };
  const clearCart = () => {
    setCart([]);
  };
  const closeInfo = () => {
    setIsInfoOpened(false);
  };

  const closeCartInfo = () => {
    setIsCartInfoOpened(false);
  };

  const openInfo = (item) => {
    setInfo([item]);
    setIsInfoOpened(true);
  };

  const openCartInfo = (item) => {
    setCartInfo([item]);
    setIsCartInfoOpened(true);
  };

  const removeFromCart = (itemCode) => {
    const cartItems = cart;
    cartItems.map((item) => {
      if (item.CODE == itemCode) {
        const filtered = cartItems.filter(
          (cartItem) => cartItem.CODE != itemCode
        );
        setCart(filtered);
      }
    });
  };

  useEffect(() => {
    var localData = JSON.parse(localStorage.getItem("cart"));
    if (localData) setCart(localData);
  }, []);

  useEffect(() => {
    console.log("adassdsad");
    const titles = [];
    const fetchData = async () => {
      const response = await fetch(API);
      const responseData = await response.json();
      setData(responseData);

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
  }, [language]);

  useEffect(() => {
    if (cart) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Intro
        setLanguage={(language) => setLanguage(language)}
        languages={languages}
      />
      <Layout
        menuTitles={menuTitle}
        menuList={menuList}
        data={data}
        callMenuList={(titleProp) => callMenuList(titleProp)}
        addToCart={(data, quantity) => addToCart(data, quantity)}
        removeFromCart={(itemCode) => removeFromCart(itemCode)}
        cartData={cart}
        title={title}
        currency={currency}
        location={location.pathname}
        restaurantName={restaurantName}
        info={info}
        cartInfo={cartInfo}
        isInfoOpened={isInfoOpened}
        isCartInfoOpened={isCartInfoOpened}
        closeInfo={() => closeInfo()}
        openInfo={(item) => openInfo(item)}
        openCartInfo={(item) => openCartInfo(item)}
        closeCartInfo={() => closeCartInfo()}
        fullData={data}
        clearCart={() => clearCart()}
      />
    </>
  );
}

export default App;
