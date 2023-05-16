import React, { useEffect, useRef, useState } from "react";
import Menus from "../Menus.json";

import Menu from "./Menu";
import { getMenus } from "../Shared/apis/getMenus";

export default function Nav({ setSelectedMenu }) {
  const MenuLabel = {
   
    single: "단품메뉴",
    side: "사이드",
    service: "음료수",
  };

  const [tabsData, setTabsData] = useState([
   
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
  const [menus, setMenus] = useState([]);

  const tabsRef = useRef([]);

  const fetchData = async () => {
    const menus = await getMenus();
    setMenus(menus);
  };

  useEffect(() => {
    if (menus.length > 0) {
      menus.map((menu) => {
        const data = {
          ...menu,
          ...Menus.find((value) => value.id === menu.number),
        };
        setTabsData((prev) =>
          prev.map((tab) => {
            if (tab.label === MenuLabel[data.type]) {
              return { ...tab, content: [...tab.content, data] };
            } else {
              return tab;
            }
          })
        );
      });
    }
  }, [menus]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
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
        <div className="flex space-x-3 border-b pl-2">
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
          {tabsData[activeTabIndex].content.map((menu) => {
            return (
              <Menu
                key={menu.id}
                name={menu.name}
                price={menu.price}
                setSelectedMenu={setSelectedMenu}
                src={menu.image}
                count={menu.remain}
              ></Menu>
            );
          })}
        </div>
      </div>
    </div>
  );
}
