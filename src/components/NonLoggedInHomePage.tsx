"use client"

import Login from '@/app/login/page';
import Register from '@/app/register/page';
import React from 'react'

interface Props{
  handleIsLoggedIn: () => void;
}

const NonLoggedInHomePage = () => {
  return (
    <>
        <Login />
    </>
  )
}

export default NonLoggedInHomePage