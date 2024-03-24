"use client"

import React, { useRef } from 'react';
import Link  from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface WatchStoriesProps {
  user: string;
  image: string;
}

function WatchStories({ user, image }: WatchStoriesProps): JSX.Element {
  // const divRef = useRef<HTMLDivElement>(null);

  // useGSAP(() => {
  //   gsap.from(divRef.current, { opacity: 0, duration: 1, delay: 0.5 });
  // });

  return (
    <Link href={`/watchstory/${user}`}>
      <div
        className="transition-all w-16 h-16 flex justify-center items-center gradient-bg rounded-full m-5 mr-3 min-w-16"
      >
        <img className="object-cover w-[90%] h-[90%] rounded-full" src={image} alt={user} />
      </div>
    </Link>
  );
}

export default WatchStories;
