"use client"

import { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';

interface Post {
  username: string;
  image: string;
  post: string;
  date: string;
}

interface FeedProps {
  isDarkMode: boolean;
}



function Feed({ isDarkMode }: FeedProps) {
  let arr: Post[] = [
    {
      username: "Saul goodman",
      image: "https://images.unsplash.com/photo-1682686581498-5e85c7228119?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      post: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veniam alias vero possimus est voluptates! Eveniet sint est nulla? Ratione ipsum eaque dignissimos, tenetur aliquam quisquam? Tempora sit est nobis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, voluptas cumque impedit earum, eveniet voluptatibus soluta tenetur modi autem, mollitia repellat officia velit placeat. Vel culpa quos inventore magnam nam accusantium officia? Modi ex labore ut ducimus sequi rerum voluptas eos eligendi debitis nihil, nam sit a exercitationem? Sequi natus unde, officiis eligendi non libero aut, eum ipsa illum possimus ex pariatur! Delectus quibusdam reprehenderit quos consectetur aspernatur non molestias quisquam quo pariatur. Molestiae eos praesentium, nulla repudiandae exercitationem id? Dolorem cum libero quisquam architecto nesciunt commodi consequuntur est.",
      date: "date"
    },
    {
      username: "Walter white",
      image: "https://images.unsplash.com/photo-1679065949530-7bb1fba3ccb3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      post: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veniam alias vero possimus est voluptates! Eveniet sint est nulla? Ratione ipsum eaque dignissimos, tenetur aliquam quisquam? Tempora sit est nobis.",
      date: "date"
    },
    {
      username: "Jason patrick",
      image: "https://images.unsplash.com/photo-1682685797703-2bb22dbb885b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      post: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veniam alias vero possimus est voluptates! Eveniet sint est nulla? Ratione ipsum eaque dignissimos, tenetur aliquam quisquam? Tempora sit est nobis.",
      date: "date"
    },
    {
      username: "Walter white",
      image: "https://images.unsplash.com/photo-1679065949530-7bb1fba3ccb3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      post: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veniam alias vero possimus est voluptates! Eveniet sint est nulla? Ratione ipsum eaque dignissimos, tenetur aliquam quisquam? Tempora sit est nobis.",
      date: "date"
    },
    {
      username: "Jason patrick",
      image: "https://images.unsplash.com/photo-1682685797703-2bb22dbb885b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      post: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veniam alias vero possimus est voluptates! Eveniet sint est nulla? Ratione ipsum eaque dignissimos, tenetur aliquam quisquam? Tempora sit est nobis.",
      date: "date"
    },
    {
      username: "Walter white",
      image: "https://images.unsplash.com/photo-1679065949530-7bb1fba3ccb3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      post: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veniam alias vero possimus est voluptates! Eveniet sint est nulla? Ratione ipsum eaque dignissimos, tenetur aliquam quisquam? Tempora sit est nobis.",
      date: "date"
    },
    {
      username: "Jason patrick",
      image: "https://images.unsplash.com/photo-1682685797703-2bb22dbb885b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      post: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veniam alias vero possimus est voluptates! Eveniet sint est nulla? Ratione ipsum eaque dignissimos, tenetur aliquam quisquam? Tempora sit est nobis.",
      date: "date"
    },
  ];

  useGSAP(()=>{
    gsap.from(".feed-animation",{
        y:100,
        opacity:0,
        stagger:0.5, 
        delay:1
    })
})



  return (
    <>
      {arr.map((elem, index) => (
        <div key={index} className={`${isDarkMode ? "dark-mode-component-bg" : "light-mode-component-bg"} feed-animation w-[90%] flex-col h-auto mx-10 mt-10 rounded-xl overflow-y-auto`}>
          <div className="flex account-info justify-between">
            <div className="flex mt-3">
              <Link href={`/user/${elem.username}`}>
                <div className='w-12 h-12 flex justify-center items-center rounded-full m-5 ml-8 mr-3 min-w-12'>
                  <img className='object-cover w-full h-full rounded-full ' src={`${elem.image}`} alt={elem.username} />
                </div>
              </Link>
              <Link href={`/user/${elem.username}`}>
                <div className="name flex-col mt-6 ml-6">
                  <h1 className='text-md font-semibold'>{`${elem.username}`}</h1>
                  <h4 className='text-xs'>{`${elem.date}`}</h4>
                </div>
              </Link>
            </div>
            <Link href={`/dotmenu`}>
              <div className="threedots">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white m-10 ml-20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
              </div>
            </Link>
          </div>
          <div className='ml-[3rem] mb-10 pr-20 '>
            {elem.post}
          </div>
        </div>
      ))}
    </>
  );
}

export default Feed;
