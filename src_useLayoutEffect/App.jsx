import React, { useEffect, useLayoutEffect, useRef } from 'react'

const App = () => {
  const ref = useRef()
  useLayoutEffect(() => {
    // 在浏览器渲染dom之前更改dom的文字
    ref.current.innerText = 'dom渲染之前'
  }, [])
  useEffect(() => {
    console.log(ref.current.innerText);
  }, [])
  return (
    <div ref={ref}>App</div>
  )
}
export default App
