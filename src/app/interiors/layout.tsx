import React from 'react';
import Navbar from "@/components/views/navbar"

export default function InteriorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <section className='body_wrapper_section'>
        {children}
      </section>
    </>
  )
}