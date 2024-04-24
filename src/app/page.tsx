import React from 'react';
import HomeScreen from '../components/screens/home';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Home() {
  return (
    <>
      <HomeScreen />
    </>
  )
}
