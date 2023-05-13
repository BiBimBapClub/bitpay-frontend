import React, { useState } from "react";

export default function Nav() {
  return (
    <div class="bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
      <ul class="flex flex-wrap -mb-px">
        <li class="mr-2">
          <a
            href="#"
            class="inline-block p-4 text-mainOrange border-b-2 border-mainOrange rounded-t-lg active "
            aria-current="page"
          >
            세트메뉴
          </a>
        </li>
        <li class="mr-2">
          <a
            href="#"
            class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
          >
            단품메뉴
          </a>
        </li>

        <li class="mr-2">
          <a
            href="#"
            class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
          >
            배달대행
          </a>
        </li>
      </ul>
    </div>
  );
}
