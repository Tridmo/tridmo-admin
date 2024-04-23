"use client"
import * as React from 'react';
import LoginScreen from '@/components/screens/auth/login';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Login() {

  return (
    <>
      <LoginScreen />
    </>
  )
}
