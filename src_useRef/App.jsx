import React, { useEffect, useRef, useState } from 'react'

export default function App() {
  // const inputRef = useRef(null)
  // useEffect(() => {
  //   inputRef.current.focus()
  // }, [])
  // return (
  //   <input ref={inputRef} type="text" placeholder="搜索你想要的"/>
  // )
  const [num, setNum] = useState(0)
  const numRef = useRef(num)
  numRef.current = num
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(`当前值：${numRef.current}`);
    }, 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <div>
      <h1>当前值：{num}</h1>
      <button onClick={() => setNum(num + 1)}>点击加一</button>
    </div>
  )
}
