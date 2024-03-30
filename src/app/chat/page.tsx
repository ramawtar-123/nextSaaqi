"use client"

import { usePathname } from 'next/navigation'
import Navbar from '@/components/sub_components/Navbar'
import React, { useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import Link from 'next/link'

let newMessages = [
  {
    name: "Alex",
    profile: "https://images.unsplash.com/photo-1682687979601-082a1295b78f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    message: "Hi"
  },
  {
    name: "Axel",
    profile: "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
    message: "How are you doin'"
  },
  
]

let OldMessages = [
  {
    name: "Walter white",
    profile: "https://images.unsplash.com/photo-1711669670318-689b1cbfae70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
    message: "Hi"
  },
  {
    name: "Maverick",
    profile: "https://images.unsplash.com/photo-1711654106922-f44ee5df26ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
    message: "How are you doin'"
  },
  {
    name: "John Wick",
    profile: "https://images.unsplash.com/photo-1711376330772-9117a7217694?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8",
    message: "How are you doin'"
  },
  {
    name: "Walter white",
    profile: "https://images.unsplash.com/photo-1711669670318-689b1cbfae70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
    message: "Hi"
  },
  {
    name: "Maverick",
    profile: "https://images.unsplash.com/photo-1711654106922-f44ee5df26ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
    message: "How are you doin'"
  },
  {
    name: "John Wick",
    profile: "https://images.unsplash.com/photo-1711376330772-9117a7217694?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8",
    message: "How are you doin'"
  },
  
]

const Chat = () => {

  const pathname = usePathname()
  const isActive = (href: String) => pathname === href;

  const [bgColor, setBgColor] = useState('bg-zinc-800');

  const handleClick = () => {
    setBgColor(bgColor === 'bg-zinc-800' ? 'bg-[#268bf0]' : 'bg-zinc-800');
  };

  return (
    <>
    <Navbar isDarkMode={true}/>
        <div className="main dark-mode-bg min-h-[100vh] flex w-[100vw]">
            <div className="left w-[30%] ml-[10rem] mt-12 flex-col">
                <h1 className='text-[1.5rem] font-semibold'>Chats</h1>
                
                <Collapsible>
                  <CollapsibleTrigger>
                  <div className="flex w-[20rem] justify-between mb-4 items-center mt-8">
                    <h1 className='text-zinc-400'>New messages</h1>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                      <ChevronDown className="h-4 w-4 " />
                      <span className="sr-only">Toggle</span>
                    </Button>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    {
                      newMessages.map((elem, index) => (
                        <Link href={`/chat/${elem.name}`} key={index} className={`${
                            isActive(`/chat/${elem.name}`) ? "bg-[#268bf0]" : "bg-zinc-800"
                          } message hover:drop-shadow-[0_35px_35px_rgba(38,139,240,0.45)] hover:bg-[#268bf0] w-[20rem] mb-4 h-[4.7rem] rounded-xl flex items-center`}
                        >
                          <img src={`${elem.profile}`} className="dp rounded-full w-[3.5rem] h-[3.5rem] ml-4 object-cover" alt={`${elem.name}'s profile`} />
                          <div className="dets flex-col ml-4">
                            <h1 className='font-semibold'>{elem.name}</h1>
                            <h2 className='font-light text-zinc-300 text-xs'>{elem.message}</h2>
                          </div>
                        </Link>
                      ))
                      
                    }
                  </CollapsibleContent>
                </Collapsible>


                <Collapsible>
                  <CollapsibleTrigger>
                  <div className="flex w-[20rem] justify-between mb-6 items-center mt-1">
                    <h1 className='text-zinc-400'>Last messages</h1>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                      <ChevronDown className="h-4 w-4 " />
                    </Button>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    {
                      OldMessages.map((elem, index) => (
                        <div className="message hover:drop-shadow-[0_35px_35px_rgba(38,139,240,0.45)] hover:bg-[#268bf0] w-[20rem] mb-4 h-[4.7rem] rounded-xl bg-zinc-800 flex items-center">
                          <img src={`${elem.profile}`} className="dp rounded-full w-[3.5rem] h-[3.5rem] ml-4 object-cover"></img>
                          <div className="dets flex-col ml-4">
                            <h1 className='font-semibold'>{elem.name}</h1>
                            <h2 className='font-light text-zinc-300 text-xs'>{elem.message}</h2>
                          </div>
                      </div>
                      ))
                    }
                  </CollapsibleContent>
                </Collapsible>
               

            </div>

            <div className="right flex-col bg-green-700 w-[70%]">
                    <div className='w-[90%] h-[4rem] flex items-center justify-between rounded-xl m-auto mt-8 '>
                      <div className='flex items-center'>
                        <img src={`${newMessages[0].profile}`} className="dp rounded-full w-[3.5rem] h-[3.5rem] ml-4"></img>
                        <div className="dets flex-col ml-4">
                          <h1 className='font-semibold'>{newMessages[0].name}</h1>
                          <h2 className='font-light text-zinc-300 text-xs'>{newMessages[0].message}</h2>
                        </div>
                      </div>
                      <div className='flex gap-5'>
                        
                      </div>
                    </div>

                    <div className="flex-col">
                      
                    </div>
            </div>
        </div>
    </>
  )
}

export default Chat