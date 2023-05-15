import React, { useEffect, useRef, useState } from "react";
import Menus from "../Menus.json";

import Menu from "./Menu";
import { getMenus } from "../Shared/apis/getMenus";

export default function Nav({ setSelectedMenu }) {
  const [menulist, setMenuList] = useState([]);
  const [tabsData, setTabsData] = useState([
    {
      label: "세트메뉴",
      content: [],
    },
    {
      label: "단품메뉴",
      content: [],
    },
    {
      label: "사이드",
      content: [],
    },
    {
      label: "음료수",
      content: [],
    },
  ]);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);
  const fetchData = async () => {
    const menus = await getMenus();
    setMenuList(menus);
    console.log(menulist);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const setMenu = [];
    const singleMenu = [];
    const service = [];
    const sideMenu = [];

    Menus.forEach((menu) => {
      if (menu.type === "set") {
        setMenu.push(
          <Menu
            name={menu.name}
            price={menu.price}
            setSelectedMenu={setSelectedMenu}
            src={menu.image}
            count={menulist[menu.id - 1]?.remain}
          ></Menu>
        );
      } else if (menu.type === "single") {
        singleMenu.push(
          <Menu
            name={menu.name}
            price={menu.price}
            setSelectedMenu={setSelectedMenu}
            src={menu.image}
            count={menulist[menu.id - 1]?.remain}
          ></Menu>
        );
      } else if (menu.type === "side") {
        sideMenu.push(
          <Menu
            name={menu.name}
            price={menu.price}
            setSelectedMenu={setSelectedMenu}
            src={menu.image}
            count={menulist[menu.id - 1]?.remain}
          ></Menu>
        );
      } else if (menu.type === "service") {
        service.push(
          <Menu
            name={menu.name}
            price={menu.price}
            setSelectedMenu={setSelectedMenu}
            src={menu.image}
            count={menulist[menu.id - 1]?.remain}
          ></Menu>
        );
      }
    });

    setTabsData([
      {
        label: "세트메뉴",
        content: setMenu,
      },
      {
        label: "단품메뉴",
        content: singleMenu,
      },
      {
        label: "사이드",
        content: sideMenu,
      },
      {
        label: "음료수",
        content: service,
      },
    ]);
  }, []);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      console.log(currentTab?.offsetLeft, currentTab?.clientWidth);
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);
  return (
    <div>
      <div className="relative bg-white">
        <div className="flex space-x-3 border-b pl-5">
          {tabsData.map((tab, idx) => {
            return (
              <button
                key={idx}
                ref={(el) => (tabsRef.current[idx] = el)}
                className="p-3"
                onClick={() => setActiveTabIndex(idx)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <span
          className="absolute bottom-0 block h-0.5 bg-mainOrange transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>
      <div className="pb-16">
        <div className="grid grid-cols-2 w-full">
          {tabsData[activeTabIndex].content}
        </div>
      </div>
    </div>
  );
}
