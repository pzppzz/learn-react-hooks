import React, { useCallback, useState } from 'react'

export default function App() {
  const [num, setNum] = useState(0)
  // let val = 0
  // console.log('val:' + val++);
  // console.log('num:' + num);
  const handleClick = useCallback(
    () => {
      console.log(num);
  }, [])
  return (
    <div>
      <h1>num: {num}</h1>
      <button onClick={() => setNum(num + 1)}>num + 1</button>
      <button onClick={handleClick}>打印num</button>
    </div>
  )
}
