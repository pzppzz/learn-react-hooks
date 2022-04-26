import React, { useContext, useState } from "react";

//创建一个context对象，初始值只有当Provider没有传递value prop属性时才会生效
const Context = React.createContext(null)
export default function App() {
  // 创建一个person状态
  const [person, setPerson] = useState({ name: '张三', age: 20 })
  return (
    //通过Provider将person共享出去，属性必须为value
    <Context.Provider value={person}>
      {/* 触发重新渲染 */}
      <button
        onClick={() => setPerson({
          ...person,
          name: +new Date() + '张三'
        })}
      >
        更新姓名
      </button>
      <Father />
    </Context.Provider>
  )
}
function Father() {
  // 订阅Context
  const value = useContext(Context)
  return (
    <div>
      <h1>Father组件</h1>
      {/* 这里就将展示App传递过来的person */}
      <div>接收到App组件传递的person信息:{`姓名：${value.name}---年龄：${value.age}`}</div>
      <hr />
      {/* 在Father组件里将person的age属性更新，在通过provider共享出去 */}
      <Context.Provider value={{ ...value, age: 30 }}>
        <Son />
      </Context.Provider>
    </div>
  )
}
function Son() {
  // 订阅Context
  const value = useContext(Context)
  return (
    <div>
      <h2>Son组件</h2>
      {/* 这里就将展示距离最近的上层Provider传递的person */}
      <div>接收到Father组件传递的person信息:{`姓名：${value.name}---年龄：${value.age}`}</div>
    </div>
  )
}