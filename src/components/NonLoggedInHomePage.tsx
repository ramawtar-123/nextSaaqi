"use client"

import Login from '@/app/login/page';
import Register from '@/app/register/page';
import React, { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import * as THREE from 'three'


interface Props{
  handleIsLoggedIn: () => void;
}

const NonLoggedInHomePage = () => {

  const pathname = usePathname()

  const mount = useRef(null);

  useEffect(() => {
    if (mount.current === null) return;
    const scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / (3 * window.innerHeight); // Adjusted aspect ratio for doubled height
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, 2 * window.innerHeight);
    mount.current.appendChild(renderer.domElement);

    const planeGeometry = new THREE.PlaneGeometry(window.innerWidth, 2 * window.innerHeight, 32, 32);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide }); // Ensure both sides of the plane are visible
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);

    const sphereGeometry = new THREE.SphereGeometry(1, 128, 128);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

        const light1 = new THREE.PointLight(0xbf3d9f, 2)
        const light2 = new THREE.PointLight(0xc9149c, 2)
        const light3 = new THREE.PointLight(0xbf3d9f, 2)

        const lighty = 0;
        const lightz = -3;


        light1.position.set(- 2, lighty, lightz);
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
    plane.position.z = -8;



    camera.position.y = 2.5;
    camera.position.z = 4;

    const animate = function () {
        requestAnimationFrame(animate);

        sphere.rotation.x += 0.01;

        const scrollY = window.scrollY;
        light1.position.y = scrollY * 0.01;
        light2.position.y = scrollY * 0.01;
        light3.position.y = scrollY * 0.01;

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
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);



  return (
    <>
      <div className="main m-0 p-0 relative">
        <div ref={mount} className='absolute top-0 left-0 z-[-1]'>
          
        </div> 
        <div className="p-6 w-[60%] m-auto text-zinc-400">
            <ul className='flex justify-around'>
              <li className={pathname == "/" ? "text-zinc-100" : "text-zinc-400"}> <Link href={"/"}>Home</Link> </li>
              <li className={pathname == "/features" ? "text-zinc-100" : "text-zinc-400"}> <Link href={"/features"}>Features</Link> </li>
              <li className={pathname == "/contact" ? "text-zinc-100" : "text-zinc-400"}> <Link href={"/contact"}>Contact Us</Link> </li>
              <li className={pathname == "/about" ? "text-zinc-100" : "text-zinc-400"}> <Link href={"/about"}>About</Link> </li>
            </ul>
          </div>
          <div className="title mt-28 text-center text-[6rem] tracking-[1rem] text-white">
              SAAQI
              <h1 className="mt-0 text-[1.1rem] tracking-widest text-zinc-400">Make your confession</h1>
              <h1 className="mt-32 text-[1rem] tracking-widest text-zinc-100">It's secure and adorable</h1>
          </div>
      </div>
          <div className="a mt-[50vh] h-[500vh] bg-black">

          </div>
    </>
  )
}

export default NonLoggedInHomePage