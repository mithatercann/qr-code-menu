import React, { useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import getSymbolFromCurrency from "currency-symbol-map";
const MenuList = ({
  menuList,
  title,
  location,
  openInfo,
  fixed,
  fullData,
  searchValue,
  style,
}) => {
  const [searchData, setSearchData] = useState([]);
  const [searchDataLength, setSearchDataLength] = useState();

  // var userLang = navigator.language || navigator.userLanguage;
  // alert("The language is: " + userLang);

  useEffect(() => {
    var dataForName = fullData.filter((item) =>
      item.NAME.toLowerCase()
        .split(" ")
        .join("")
        .includes(searchValue.toLowerCase().split(" ").join(""))
    );
    var dataForDescription = fullData.filter((item) =>
      item.DESCRIPTION.toLowerCase()
        .split(" ")
        .join("")
        .includes(searchValue.toLowerCase().split(" ").join(""))
    );
    setSearchData([...dataForName, ...dataForDescription]);
  }, [searchValue]);

  const handleTouchStart = () => {
    if (fixed) {
      document.querySelector(".menu__title--selected").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  return (
    <section
      onTouchStart={() => handleTouchStart()}
      style={style}
      className={`menu__list`}
    >
      {fixed ? (
        <div>
          <div className="break"></div>
          <span className="menu__list--title">
            {searchValue ? "SEARCH" : title}
          </span>
        </div>
      ) : (
        <span className="menu__list--title">
          {searchValue ? "SEARCH" : title}
        </span>
      )}
      {searchValue ? (
        <div>
          {!searchDataLength === 0
            ? null
            : searchData.map((item) => (
                <div
                  onClick={(e) => {
                    openInfo(item);
                  }}
                  className="menu__list--item"
                >
                  <span className="menu__list--detail">
                    <div className="menu__list--top">
                      <div className="menu__list--top--left">
                        <span className="menu__list--name"> {item.NAME}</span>
                        <div className="menu__list--desc">
                          {item.DESCRIPTION.split("").splice(0, 60).join("")}...
                        </div>
                      </div>
                      <img
                        className={"menu__list--img"}
                        src={`/images${location}/${
                          item.PIC == "true" ? "pics" : "categories"
                        }/${
                          item.PIC == "true"
                            ? item.NAME.split(" ").join("_")
                            : item.TYPE.split(" ").join("_")
                        }.jpg`}
                        alt={"image"}
                      />
                    </div>
                    <div className="menu__list--bottom">
                      <div className="menu__list--price">
                        {getSymbolFromCurrency(item.CURRENCY)} {item.PRICE}
                      </div>
                      <div className="menu__list-duration">
                        <AiOutlineFieldTime size={20} />
                        {item.DURATION} min
                      </div>
                    </div>
                  </span>
                </div>
              ))}
        </div>
      ) : (
        menuList.map((item) => (
          <div
            onClick={(e) => {
              openInfo(item);
            }}
            className="menu__list--item"
          >
            <span className="menu__list--detail">
              <div className="menu__list--top">
                <div className="menu__list--top--left">
                  <span className="menu__list--name"> {item.NAME}</span>
                  <div className="menu__list--desc">
                    {item.DESCRIPTION.split("").splice(0, 60).join("")}...
                  </div>
                </div>
                <img
                  className={"menu__list--img"}
                  src={`/images${location}/${
                    item.PIC == "true" ? "pics" : "categories"
                  }/${
                    item.PIC == "true"
                      ? item.NAME.split(" ").join("_")
                      : item.TYPE.split(" ").join("_")
                  }.jpg`}
                  alt={"image"}
                />
              </div>
              <div className="menu__list--bottom">
                <div className="menu__list--price">
                  {getSymbolFromCurrency(item.CURRENCY)} {item.PRICE}
                </div>
                <div className="menu__list-duration">
                  <AiOutlineFieldTime size={20} />
                  {item.DURATION} min
                </div>
              </div>
            </span>
          </div>
        ))
      )}
    </section>
  );
};

export default MenuList;
