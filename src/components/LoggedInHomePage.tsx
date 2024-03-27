"use client";

import React from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Feed from "./sub_components/Feed";
import Post from "./sub_components/Post";
import Stories from "./sub_components/Stories";
import Search from "./sub_components/Search";
import UserAccount from "./sub_components/UserComponent";
import Navbar from "./sub_components/Navbar";

interface Props {
  isDarkMode: boolean;
  backColor: string;
}

function Homepage({ isDarkMode, backColor }: Props) {
  useGSAP(() => {
    gsap.from(".friends", {
      x: 100,
      opacity: 0,
      delay: 1,
    });
  });

  return (
    <>
    <Navbar isDarkMode={true} />
      <div className={`${backColor} flex w-screen min-h-screen`}>
        <div
          className={` w-[77%] flex flex-col no-scrollbar pl-32`}
        >
          <Stories />
          <Post isDarkMode={isDarkMode} />
          <Feed isDarkMode={isDarkMode} />
        </div>

        <div className="friends glass-blue">
          <div className="search">
            <Search isDarkMode={isDarkMode} />
          </div>

          <div
            className={`friends ${isDarkMode ? "text-white" : "text-black"}`}
          >
            <div className="header flex items-center justify-between">
              <h1 className="ml-5 text-xl font-semibold">Friends</h1>
              <Link href="/seemore">
                <div
                  className={`seemore flex items-center ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  <h4 className="text-sm pr-1">See more</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mr-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <UserAccount isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
