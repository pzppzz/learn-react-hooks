import React, { useEffect, useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(+new Date())
  useEffect(() => {
    //do something when component update
    return () => {
      //do something when component unmount
    }
  }, [])
  useEffect(() => {
    console.log('count触发组件更新了')
  }, [count])
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>点击加一</button>
      <button onClick={() => setTime(+new Date())}>更新时间戳</button>
    </div>
  )
}
