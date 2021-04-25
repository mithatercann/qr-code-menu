import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, useLocation, Route } from "react-router-dom";
import { css } from "@emotion/core";
import MoonLoader from "react-spinners/MoonLoader";

const Layout = React.lazy(() => import("./Components/Layout"));
const Intro = React.lazy(() => import("./Components/Intro"));

function App({ languages }) {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [menuTitle, setMenuTitle] = useState([]);
  const [imageTitle, setImageTitle] = useState([]);

  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState("");
  const [language, setLanguage] = useState("AZE");
  const [menuList, setMenuList] = useState([]);
  const [cart, setCart] = useState([]);
  const [info, setInfo] = useState([]);
  const [cartInfo, setCartInfo] = useState([]);
  const [isInfoOpened, setIsInfoOpened] = useState(false);
  const [isCartInfoOpened, setIsCartInfoOpened] = useState(false);
  const [translateData, setTranslateData] = useState([]);
  const [styleForLayout, setStyleForLayout] = useState({});
  const API = `./database${location.pathname}/db.json`;
  const TRANSLATE = `./translate/${language}.json`;

  const restaurantName = location.pathname
    .split("")
    .splice(1, location.pathname.length)
    .join("")
    .toUpperCase();

  const callMenuList = (titleProp) => {
    setTitle(titleProp);
    const filterMenuList = data.filter(
      (title) => title.TYPE[language] == titleProp
    );
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
    const titles = [];
    const imageTitles = [];

    const fetchData = async () => {
      const response = await fetch(API);
      const responseData = await response.json();
      setData(responseData);

      // Filtering menu types
      responseData.map((item) => titles.push(item.TYPE[language]));
      const filtered = titles.filter(
        (item, index, self) => self.indexOf(item) == index
      );

      responseData.map((item) => imageTitles.push(item.TYPE[item.DEFAULT]));
      const filteredImageTitles = imageTitles.filter(
        (item, index, self) => self.indexOf(item) == index
      );

      const initialMenuList = responseData.filter(
        (item) => item.TYPE[language] == filtered[0]
      );

      setTitle(initialMenuList[0].TYPE[language]);
      setImageTitle(filteredImageTitles);
      setMenuTitle(filtered);
      setCurrency(initialMenuList[0].CURRENCY);
      setMenuList(initialMenuList);
    };

    fetchData();

    // FETCHING TRANSLATE DATA
    const fetchTranslate = async () => {
      fetch(TRANSLATE)
        .then((resp) => resp.json())
        .then((respData) => {
          setTranslateData(respData[0]);
        });
    };

    fetchTranslate();
  }, [language]);

  // FOR GETTIN CART ITEMS FROM LOCAL STORAGE
  useEffect(() => {
    if (cart) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const override = css`
    display: block;
    margin: 0 auto;
  `;
  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "90vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MoonLoader loading={true} css={override} size={30} />
          </div>
        }
      >
        <Intro
          setLanguage={(language) => setLanguage(language)}
          languages={languages}
          setStyleForLayout={() =>
            setStyleForLayout({
              animation: "fadeInLayout 2s forwards",
            })
          }
        />
        <Layout
          styleForLayout={styleForLayout}
          translateData={translateData}
          menuTitles={menuTitle}
          imageTitle={imageTitle}
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
          language={language}
        />
      </Suspense>
    </>
  );
}

export default App;
