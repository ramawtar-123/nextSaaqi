"use client";

import Login from "@/app/login/page";
import Register from "@/app/register/page";
import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as THREE from "three";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faGithub,
  faChrome,
} from "@fortawesome/free-brands-svg-icons";

interface Props {
  handleIsLoggedIn: () => void;
}

const NonLoggedInHomePage = () => {
  const pathname = usePathname();

  const mount = useRef(null);

  useEffect(() => {
    if (mount.current === null) return;
    const scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / (3 * window.innerHeight); // Adjusted aspect ratio for doubled height
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, 2 * window.innerHeight);
    mount.current.appendChild(renderer.domElement);

    const planeGeometry = new THREE.PlaneGeometry(
      window.innerWidth,
      2 * window.innerHeight,
      32,
      32
    );
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    }); // Ensure both sides of the plane are visible
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);

    const sphereGeometry = new THREE.SphereGeometry(1, 128, 128);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    const light1 = new THREE.PointLight(0xbf3d9f, 2);
    const light2 = new THREE.PointLight(0x0000ff, 1);
    const light3 = new THREE.PointLight(0xbf3d9f, 2);

    const lighty = 0;
    const lightz = -0.7;

    light1.position.set(-2, lighty, lightz);
    light2.position.set(0, lighty, lightz);
    light3.position.set(2, lighty, lightz);

    scene.add(light1);
    scene.add(light2);
    scene.add(light3);

    sphere.position.y = 0;
    sphere.scale.y = 3;
    sphere.scale.x = 2;
    sphere.scale.z = 3;

    plane.position.x = 0;
    plane.position.y = -2;
    plane.position.z = -2;

    camera.position.y = 2.5;
    camera.position.z = 4;

    const animate = function () {
      requestAnimationFrame(animate);

      sphere.rotation.x += 0.01;

      const scrollY = window.scrollY;
      light1.position.y = scrollY * 0.01;
      light2.position.y = scrollY * 0.01;
      light3.position.y = scrollY * 0.01;

      const time = performance.now() / 80000;
      const movement = Math.sin(time * Math.PI) * 15;
      const lightDistance = 4;

      light1.position.x = Math.cos(movement) * lightDistance;
      light2.position.x =
        Math.cos(movement + (Math.PI * 2) / 3) * lightDistance;
      light3.position.x =
        Math.cos(movement + (Math.PI * 4) / 3) * lightDistance;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // mount.current.removeChild(renderer.domElement);
    };
  }, []);

  const handleScroll = () => {
    // Update background scrolling speed
    const scrollY = window.scrollY;
    mount.current.style.transform = `translateY(-${scrollY * 0.5}px)`; // Adjust the factor to control the speed of background scrolling
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="main m-0 p-0 relative">
        <div ref={mount} className="absolute top-0 left-0 z-[-1]"></div>
        <div className="p-6 w-[60%] m-auto text-zinc-400">
          <ul className="flex justify-around">
            <li className={pathname == "/" ? "text-zinc-100" : "text-zinc-400"}>
              {" "}
              <Link href={"/"}>Home</Link>{" "}
            </li>
            <li
              className={
                pathname == "/features" ? "text-zinc-100" : "text-zinc-400"
              }
            >
              {" "}
              <Link href={"/features"}>Features</Link>{" "}
            </li>
            <li
              className={
                pathname == "/contact" ? "text-zinc-100" : "text-zinc-400"
              }
            >
              {" "}
              <Link href={"/contact"}>Contact Us</Link>{" "}
            </li>
            <li
              className={
                pathname == "/about" ? "text-zinc-100" : "text-zinc-400"
              }
            >
              {" "}
              <Link href={"/about"}>About</Link>{" "}
            </li>
          </ul>
        </div>
        <div className="title mt-28 text-center text-[6rem] tracking-[1rem] text-white">
          SAAQI
          <h1 className="mt-0 text-[1.1rem] tracking-widest text-zinc-400">
            Make your confession
          </h1>
          <h1 className="mt-32 text-[1rem] tracking-widest text-zinc-100">
            It's secure and adorable
          </h1>
        </div>
      </div>
      <div className="a mt-[50vh] h-[500vh] bg-black">
        <div className="a mt-[50vh] w-screen h-[500vh] bg-black">
          <div className="h11 flex gap-1 justify-center">
            <div className="box1  h-20">
              <button
                id="toggleButton"
                className="inline-flex   items-center px-12 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-[#111827] hover:bg-[#1e293b] focus:border-[#6b7280] active:bg-[#6b7280] transition ease-in-out duration-150"
              >
                <span>Bitcoin</span>
                <svg
                  id="arrowIcon"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>{" "}
                </svg>
              </button>
              <h6 className="text-gray-50 text-sm ml-10 mt-3">choose chain</h6>
            </div>

            <div className="box2 w-64  h-20">
              <button
                id="toggleButton"
                className="inline-flex items-center px-20 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-[#111827] hover:bg-[#1e293b] focus:border-[#6b7280] active:bg-[#6b7280] transition ease-in-out duration-150"
              >
                <span>Bitcoin</span>
                <svg
                  id="arrowIcon"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>{" "}
                </svg>
              </button>
              <h6 className="text-gray-50 mt-3 text-sm ml-20">Amount</h6>
            </div>

            <div className="box3">
              <button
                id="toggleButton"
                className="inline-flex items-center px-8 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-[#111827] hover:bg-[#1e293b] focus:border-[#6b7280] active:bg-[#6b7280] transition ease-in-out duration-150"
              >
                <span>Bitcoin</span>
                <svg
                  id="arrowIcon"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>{" "}
                </svg>
              </button>
              <h6 className="text-gray-50 mt-3 text-sm">Withdrawal date</h6>
            </div>
          </div>

          <div className=" w-96 mx-auto ">
            <div className="circle text-center bg-gradient-to-r from-teal-400 to-yellow-200 rounded-full w-20 h-20 mt-24 m-auto"></div>
            <h1 className="text-gray-50 text-6xl  mt-28 m-auto ">CONCLUSION</h1>
          </div>

          <div className="BadaBoxes flex m-20 justify-evenly">
            <div className="box1">
              <div className="box text-gray-50 tracking-wider w-[20vw] h-[20vw] bg-gradient-to-r from-slate-500 to-slate-800">
                BTS $31.67149 <sub>+429.42</sub>
              </div>
              <h2 className="text-gray-50 ml-20 mt-4 text-xl">
                Supposed Price
              </h2>
            </div>

            <div className="box2  ">
              <div className="box flex flex-col text-center mx-auto  justify-evenly item-center text-gray-50 bg-[#111827]  tracking-wider w-[20vw] h-[20vw] ">
                <div className="button1 ml-6 w-64 h-14 items-center px-14 py-4 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-gradient-to-r from-gray-700 to-black">
                  USD 10,50002
                </div>
                <div className="button2 mb-2 ml-6 w-64 h-14  items-center px-14 py-4 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-gradient-to-b from-gray-900 to-gray-600">
                  2.4394
                </div>
                <div className="button3 mt-4 ml-6 w-64 rounded-full h-14 items-center px-8 py-4 border border-transparent text-base leading-6 font-medium text-center  text-white bg-gradient-to-r from-rose-700 to-pink-600 hover:bg-gradient-to-r from-fuchsia-500 to-cyan-500 focus:border-[#6b7280] active:bg-[#6b7280] transition ease-in-out duration-150">
                  BUY CRYPTO
                </div>
              </div>
              <h2 className="text-gray-50 ml-20 mt-4 text-xl">
                Starting Investmented
              </h2>
            </div>

            <div className="box3">
              <div className="box text-gray-50 tracking-wider w-[20vw] h-[20vw] bg-gradient-to-r from-slate-900 to-slate-700">
                BTS $31.67149 <sub>+429.42</sub>
              </div>
              <h2 className="text-gray-50 ml-20 mt-4 text-xl">
                Supposed Profits
              </h2>
            </div>
          </div>
          {/* JAKARTA TYPOGRAPHY */}
          <div className="description pt-10 bg-black text-white justify-center text-center grid gap-20 ">
            <h1 className="text-4xl">TYPOGRAPHY</h1>
            <h1 className="text-6xl">PLUS JAKARTA SANS</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
              Ducimus possimus eius <br /> eligendi ipsa voluptatebr
              <br /> asperiores, aliquam fuga quam expedita alias <br />{" "}
              distinctio, totam cupiditate corporis?
            </p>
            <h3 className="text-3xl">COLOR PALETTE</h3>
            <div className="btns flex justify-center text-center gap-20">
              <button className="color bg-blue-800 rounded-full py-4 px-20 text-center bg-center ">
                blue
              </button>
              <button className="color bg-pink-800 rounded-full py-4 px-20 text-center bg-center">
                pink
              </button>
              <button className="color bg-purple-800 rounded-full py-4 px-20 text-center bg-center ">
                purple
              </button>
            </div>
          </div>

          {/* tricky and wizardry first */}
          <div className="flex mt-32 justify-around bg-black text-white">
            <div className="left-vala ml-20 flex flex-col gap-20">
              <h1 className="text-6xl mt-20 leading-20">
                {" "}
                WEBFLOW TRICKS <br /> and <br />
                WIZARDRY{" "}
              </h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur <br />
                adipisicing elit. Explicabo consequatur <br /> laboriosam
                voluptatibus voluptas ipsa officibr <br />a nam rerum quo,
                sapiente harum atque, architecto facere!
              </p>
              <button className="button3 mt-4 w-96 rounded-md h-14 items-center px-10 py-4 border border-transparent text-base leading-6 font-medium text-center  text-white bg-gradient-to-r from-rose-700 to-purple-600 hover:bg-gradient-to-r from-fuchsia-500">
                GLASSMORPHISM TUTORIAL
              </button>
            </div>

            <div className="w-96 h-96 mt-20">
              <img
                src="https://images.unsplash.com/photo-1712876718842-5b7d59ad453b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                alt=""
              />
            </div>
          </div>

          {/* tricky and wizardry second*/}
          <div className="flex mt-32 justify-around bg-black text-white">


          <div className="w-96 h-32 mt-20">
              <img
                src="https://images.unsplash.com/photo-1712371962703-3d53845ab565?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt=""
              />
            </div>

        







            <div className="left-vala ml-20 flex flex-col gap-20">
              <h1 className="text-6xl mt-20 leading-20">
                {" "}
                WEBFLOW TRICKS <br /> and <br />
                WIZARDRY{" "}
              </h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur <br />
                adipisicing elit. Explicabo consequatur <br /> laboriosam
                voluptatibus voluptas ipsa officibr <br />a nam rerum quo,
                sapiente harum atque, architecto facere!
              </p>
              <button className="button3 mt-4 w-96 rounded-md h-14 items-center px-10 py-4 border border-transparent text-base leading-6 font-medium text-center  text-white bg-gradient-to-r from-rose-700 to-purple-600 hover:bg-gradient-to-r from-fuchsia-500">
                GLASSMORPHISM TUTORIAL
              </button>
            </div>

          
          </div>




          {/* footer */}
          <footer className="bg-black text-white justify-center text-center mt-32">
            <div className="footer-row flex text-wrap justify-between gap-10 p-10">
              <div className="footer-col">
                <h1 className="text-white size-3 ml-24 font-semibold font-sans">
                  Info
                </h1>
                <ul className="links mt-20 ml-20 list-none">
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm"
                      href="#"
                    >
                      About us
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm"
                      href="#"
                    >
                      Customers
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm"
                      href="#"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm"
                      href="#"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm"
                      href="#"
                    >
                      Collections
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm"
                      href="#"
                    >
                      Collections
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h1 className="text-white size-3 font-semibold font-sans">
                  Explore
                </h1>
                <ul className="links mt-20 list-none">
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Latest Design
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Themes
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      New Upload
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Free Design
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Free Design
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Free Design
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h1 className="text-white size-3 font-semibold font-sans">
                  Explore
                </h1>
                <ul className="links mt-20 list-none">
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Latest Design
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Themes
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      New Upload
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Free Design
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Free Design
                    </a>
                  </li>
                  <li>
                    <a
                      className="no-underline text-slate-400 hover:text-white text-sm "
                      href="#"
                    >
                      Free Design
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h1 className="text-white size-3 font-semibold font-sans">
                  Newletter
                </h1>
                <p className="mt-20 mr-20 text-sm text-slate-200">
                  Lorem sfklsj kj slkj ipsum dolor sit ametbr consectetur <br />{" "}
                  slkfj sjfkl ksjfks adipisicing kjsfit. Ab ad perferendis in?
                </p>
                <form className="flex mt-4   gap-7" action="#">
                  <input
                    className="h-9 rounded-md bg-none bg-black w-140 caret-white text-white pl-4 outline-none border-solid border-2 border-[#7489C6]"
                    type="email"
                    placeholder="Your Email"
                    required
                  />
                  <button
                    className="glow-on-hover bg-black text-white hover:text-white hover:bg-transparent active:bg-black active:text-white relative z-10 rounded-lg"
                    type="submit"
                  >
                    SUBSCRIBE
                  </button>
                </form>
                <div className="icons flex mt-6 gap-10 cur rounded-smsor-pointer">
                  <FontAwesomeIcon
                    className="text-[#fff] text-2xl rounded-full cursor-pointer"
                    icon={faFacebook}
                    size="2x"
                  />
                  <FontAwesomeIcon
                    className="text-[#fff] text-2xl rounded-full cursor-pointer"
                    icon={faTwitter}
                    size="2x"
                  />
                  <FontAwesomeIcon
                    className="text-[#fff] text-2xl rounded-full cursor-pointer"
                    icon={faInstagram}
                    size="2x"
                  />
                  <FontAwesomeIcon
                    className="text-[#fff] text-2xl rounded-full cursor-pointer"
                    icon={faLinkedin}
                    size="2x"
                  />
                  <FontAwesomeIcon
                    className="text-[#fff] text-2xl rounded-full cursor-pointer"
                    icon={faGithub}
                    size="2x"
                  />
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default NonLoggedInHomePage;
