"use client"

import React from 'react';
import AddStories from './AddStories';
import WatchStories from './WatchStories';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface Story {
  username: string;
  storyImage: string;
  date: string;
}

function Stories(): JSX.Element {
  let arr: Story[] = [
    {
      username: "user1",
      storyImage: "https://images.unsplash.com/photo-1682686581498-5e85c7228119?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "date"
    },
    {
        username: "user2",
        storyImage: "https://images.unsplash.com/photo-1707871935699-d6c1e23a90d1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "date"
      },
      {
        username: "user3",
        storyImage: "https://images.unsplash.com/photo-1679065949530-7bb1fba3ccb3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "date"
      },
      {
        username: "user4",
        storyImage: "https://images.unsplash.com/photo-1707343848610-16f9afe1ae23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "date"
      },
      {
        username: "user5",
        storyImage: "https://images.unsplash.com/photo-1682685797703-2bb22dbb885b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "date"
      },
      {
        username: "user6",
        storyImage: "https://images.unsplash.com/photo-1707931171471-a73f479a5a0b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "date"
      },
      {
        username: "user7",
        storyImage: "https://images.unsplash.com/photo-1695718948137-1f4d1d5ba889?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "date"
      },
      {
        username: "user8",
        storyImage: "https://plus.unsplash.com/premium_photo-1706552626018-9d3caaa206d5?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "date"
      },
      {
        username: "user9",
        storyImage: "https://images.unsplash.com/photo-1707937231806-7774e6bacdfb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "date"
      },
      {
        username: "user10",
        storyImage: "https://images.unsplash.com/photo-1707343848723-bd87dea7b118?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "date"
      },
      {
        username: "user11",
        storyImage: "https://images.unsplash.com/photo-1707924958712-fb211503ebb2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "date"
      },
      {
        username: "user12",
        storyImage: "https://images.unsplash.com/photo-1707871828788-622715046d22?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "date"
      },
      {
        username: "user13",
        storyImage: "https://images.unsplash.com/photo-1707343843598-39755549ac9a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "date"
      },
      {
        username: "user14",
        storyImage: "https://images.unsplash.com/photo-1706816997326-3d0f825f8f88?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "date"
      },
  ];

  useGSAP(() => {
    gsap.from(".story-class", { x: 100, opacity: 0, duration: 1, delay: 1 });
  });

  return (
    <>
      <div className="story-class gradient-border m-10 glass-blur flex w-[90%] overflow-x-auto no-scrollbar rounded-xl min-h-24">
        <AddStories />
        {arr.map((elem, index) => (
          <WatchStories key={index} user={elem.username} image={elem.storyImage} />
        ))}
      </div>
    </>
  );
}

export default Stories;
