import React, { useMemo, useState } from 'react'
const initList = [
  {
    name: '张三',
    id: 366362362
  }, {
    name: '李四',
    id: 226262625
  }
]
export default function App() {
  const [keyword, setKeyword] = useState('')
  const [userList, setUserList] = useState(initList)
  //useMemo接收一个函数，一个依赖数组，每当依赖数组里的元素发生变化，useMemo就会重新执行并返回这个函数的返回值，从而拿到最新的值
  const newUserList = useMemo(() => {
    //当查询关键词发生变化，这里就会执行并返回最新的过滤后的用户列表
    return userList.filter(user => user.name.includes(keyword))
  }, [keyword, userList])
  return (
    <div>
      <input
        type="text"
        placeholder="添加用户"
        onKeyUp={
          e => {
            if (e.code === 'Enter' && e.target.value) {
              setUserList([...userList, { name: e.target.value, id: +new Date() }])
            }
          }}
      />
      <input
        type="text"
        placeholder="查询用户"
        onChange={e => setKeyword(e.target.value)}
      />
      <ul>
        {
          newUserList.map(user => {
            return <li key={user.id}>
              编号:{user.id}---姓名：{user.name}
            </li>
          })
        }
      </ul>
    </div>
  )
}
