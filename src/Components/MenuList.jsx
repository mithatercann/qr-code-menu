import React, { useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import getSymbolFromCurrency from "currency-symbol-map";
import { v4 as uuid } from "uuid";
const MenuList = ({
  menuList,
  title,
  location,
  openInfo,
  fixed,
  fullData,
  searchValue,
  style,
  language,
}) => {
  const [searchData, setSearchData] = useState([]);
  const [searchDataLength, setSearchDataLength] = useState();
  const w = window.innerWidth;

  useEffect(() => {
    var dataForName = fullData.filter((item) =>
      item.NAME[language]
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(searchValue.toLowerCase().split(" ").join(""))
    );
    var dataForDescription = fullData.filter((item) =>
      item.DESCRIPTION[language]
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(searchValue.toLowerCase().split(" ").join(""))
    );
    setSearchData([...dataForName, ...dataForDescription]);
  }, [searchValue]);

  const handleTouchStart = () => {
    if (fixed) {
      document.querySelector(".menu__fixed--selected").scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
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
          {!searchDataLength === 1 ? (
            <p>hey</p>
          ) : (
            searchData.map((item) => (
              <div
                onClick={(e) => {
                  openInfo(item);
                }}
                className="menu__list--item"
              >
                <span className="menu__list--detail">
                  <div className="menu__list--top">
                    <img
                      className={"menu__list--img"}
                      src={`images${location}/${
                        item.PIC == "true" ? "pics" : "categories"
                      }/${
                        item.PIC == "true"
                          ? item.NAME[item.DEFAULT].split(" ").join("_")
                          : item.TYPE[item.DEFAULT].split(" ").join("_")
                      }.jpg`}
                      alt={"image"}
                    />
                    <div className="menu__list--top--left">
                      <span className="menu__list--name">
                        {item.NAME[language].split("").splice(0, 15).join("")}
                        {item.NAME[language].length < 17 ? "" : "..."}
                      </span>
                      <div className="menu__list--desc">
                        {w < 330 || item.NAME[language].length > 16 ? (
                          <p>
                            {item.DESCRIPTION[language]
                              .split("")
                              .splice(0, 35)
                              .join("")}
                            ...
                          </p>
                        ) : (
                          <p>
                            {item.DESCRIPTION[language]
                              .split("")
                              .splice(0, 50)
                              .join("")}
                            ...
                          </p>
                        )}
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
                    </div>
                    <IoIosArrowForward size={13} />
                  </div>
                </span>
              </div>
            ))
          )}
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
                <img
                  className={"menu__list--img"}
                  src={`images${location}/${
                    item.PIC == "true" ? "pics" : "categories"
                  }/${
                    item.PIC == "true"
                      ? item.NAME[item.DEFAULT].split(" ").join("_") + ".jpg" ||
                        ".png"
                      : item.TYPE[item.DEFAULT].split(" ").join("_") + ".jpg" ||
                        ".png"
                  }`}
                  alt={"image"}
                />
                <div className="menu__list--top--left">
                  <span className="menu__list--name">
                    {item.NAME[language].split("").splice(0, 15).join("")}
                    {item.NAME[language].length < 17 ? "" : "..."}
                  </span>
                  <div className="menu__list--desc">
                    {w < 330 || item.NAME[language].length > 16 ? (
                      <p>
                        {item.DESCRIPTION[language]
                          .split("")
                          .splice(0, 35)
                          .join("")}
                        ...
                      </p>
                    ) : (
                      <p>
                        {item.DESCRIPTION[language]
                          .split("")
                          .splice(0, 50)
                          .join("")}
                        ...
                      </p>
                    )}
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
                </div>
                <IoIosArrowForward size={13} />
              </div>
            </span>
          </div>
        ))
      )}
    </section>
  );
};

export default MenuList;
