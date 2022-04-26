import React, { useReducer } from 'react'

const defaultCount = 0
// 接收一个参数， 可选
const init = (initCount) => {
  return { count: initCount }
}
/**
 * reducer是一个函数，
 * 第一个参数是当前组件使用useReducer的状态，React会自动帮我们传递过来
 * 第二个参数action是dispatch函数下发的命令类型，它规定了在reducer函数里如何改变状态
 */
const reducer = (state, action) => {
  // 当然action不一定是一个对象，这取决于你的dispach函数怎么传递参数，可以字符串也可以是数字
  const { type, payload } = action
  // 通过switch来处理各种type
  switch (type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return init(payload)
    default:
      throw new TypeError('type not found')
  }
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, { count: defaultCount }, () => ({ count: 0 }))
  return (
    <div>
      <h2>当前值为：{state.count}</h2>
      <button onClick={() => dispatch({ type: 'increment' })}>点击加一</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>点击减一</button>
      <button onClick={() => dispatch({ type: 'reset', payload: defaultCount })}>重置</button>
    </div>
  )
}
export default App
