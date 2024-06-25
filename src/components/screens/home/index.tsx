"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomeScreen() {
  const router = useRouter()

  useEffect(() => {
    router.push('/stats')
  }, [])

  return (
    <div></div>
  )
}
