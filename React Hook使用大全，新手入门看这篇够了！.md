React Hook使用大全，新手入门看这篇够了！

## 一、useState

useState的出现使我们在函数组件中也能够使用类组件的state特性

useState接受一个参数，也就是定义state的初始值，然后会返回一个数组，这个数组存储了state的值和更改state的方法。通过数组解构的方式我们能够拿到它们，名称可以随便取，但实际中还是要符合规范。

下面是个简单的例子:

我们初始化一个状态value，点击按钮实现value加一的效果

```javascript
import React, { useState } from 'react'

function App() {
  //const [state, setState] = useState(initState)
  const [value, setValue] = useState(0)
  return (
    <div>
      <h1>当前值：{value}</h1>
      <button onClick={() => setValue(value + 1)}>
        点击加一
      </button>
    </div>
  );
}

export default App;
```

运行效果：页面会随着按钮的点击更新当前的值

![](C:\Users\acer\Desktop\新建文件夹\images\动画.gif)

需要注意的是:

1、 修改了数据但是页面没有更新,下面是一个例子

​		我们维护一个person，并定义了一个方法用来更改person的属性值，点击按钮却发现页面没有更新

```javascript
import React, { useState } from 'react'

function App() {
  const [person, setPerson] = useState({name: '张三', age: 20})
  function updatePerson(name, age) {
    person.name = name
    person.age = age
    setPerson(person)
  }
  return (
    <div>
      <h1>我的名字是:{person.name}</h1>
      <button onClick={() => updatePerson('李四', 21)}>更新person</button>
    </div>
  );
}

export default App;
```

![](C:\Users\acer\Desktop\新建文件夹\images\2.gif)

这是因为对于对象类型的数据，React会进行浅比较，如果我们没有更改state的引用地址，只更改其内部属性值，React就认为我们没有更新这个state，解法办法就是重新给state赋个新对象。这和在类组件中使用React.PureComponent是一样的。

```javascript
  function updatePerson(name, age) {
    // person.name = name
    // person.age = age
    // 使用展开运算符
    setPerson({...person, name, age})
  }
```

这样就正常工作了!

![](C:\Users\acer\Desktop\新建文件夹\images\3.gif)

像这样还有个典型的例子就是对数组的操作，这里就不演示了。





## 二、useEffect

 通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。

useEffect接收两个参数，第一个参数是一个函数，每次渲染就会执行这个函数，第二个参数（非必须）是一个依赖数组，用来控制useEffect的执行，我们稍后会讲解。

先来看个简单的例子：

```javascript
import React, { useEffect, useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(+new Date())
  useEffect(() => {
    console.log('组件更新了')
  })
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>点击加一</button>
      <button onClick={() => setTime(+new Date())}>更新时间戳</button>
    </div>
  )
}
```



我们使用两个按钮来触发组件更新，useEffect就会执行，控制台就会打印组件更新。

来看下效果：

![](C:\Users\acer\Desktop\新建文件夹\images\effect1.gif)

可以看到只要组件渲染，就会触发useEffect的执行。

现在我们有一个小需求，就是只打印我们点击按钮触发组件更新的情况。

现在我们就要请出useEffect的第二个参数了，第二个参数是一个数组，用来存储依赖，只要当中的依赖发生了变化，React就会帮我们执行这个useEffect。所以，刚刚那个小需求就很简单了，我们只依赖于count，所以把它放进这个数组里就可以了！

代码：

```javascript
import React, { useEffect, useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(+new Date())
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
```

效果：

![](C:\Users\acer\Desktop\新建文件夹\images\effect2.gif)

可以看到不论点击了多少次更新时间戳，控制台都不会打印组件更新

当然，如果数组里什么都不加，那么就只有组件初次渲染会触发useEffect的执行，通常我们会在这里进行页面的初次渲染，例如网络请求获取数据，这相当于类组件里面的**componentDidMount**。

看到这里有小伙伴会想到既然能模仿**componentDidMount**，那能模仿**componentWillUnmount**吗？

当然可以！

useEffect还可以返回一个函数，当组件卸载的时候，就会触发这个函数执行，跟**componentWillUnmount**一样，我们通常在这里做一些收尾工作，例如清除定时器。

好了effect这个hook差不多讲完了，主要的使用方法就是下面这串代码：

```jsx
  useEffect(() => {
    //do something when component update
    return () => {
      //do something when component unmount
    }
  }, [])
```



## 三、useRef

useRef接受一个参数，然后返回一个对象，这个对象有一个**current**属性，它被初始化为传入的参数。只要函数组件不被销毁，那么这个对象在组件的整个生命周期内持续存在。

那么，useRef有什么作用呢？

1、访问子组件

```jsx
import React, { useEffect, useRef } from 'react'

export default function App() {
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  return (
    <input ref={inputRef} type="text" placeholder="搜索你想要的"/>
  )
}
```

当组件挂载的时候，inputRef的current属性就会保存对input组件的引用，通过focus使其获取焦点。

2、保存一些数据

在说这个作用之前，我们先来看一下React Hook中一个比较经典的坑：**闭包**

```jsx
import React, { useEffect, useState } from 'react'

export default function App() {
  const [num, setNum] = useState(0)
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(`当前值：${num}`);
    }, 3000)
    return () => {
      console.log(`卸载值：${num}`)
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
```

我们想在组件挂载3s后打印最新的num值

效果：

![](C:\Users\acer\Desktop\新建文件夹\images\ref1.gif)

可以看到，我们更新了num，但是3s过后控制台打印的是最初的值，这就是闭包问题，我们的定时器里的num是对最初的num的引用。

有同学想到既然要打印最新的num值，那么直接在依赖数组里加上num就好了呀。这个方法最然能打印最新的值，但是每次num更新，我们都会重新触发一个新的定时器，已经不满足我们的需求了。

解决这个闭包问题的唯一方案就是useRef这个Hook。

```jsx
import React, { useEffect, useRef, useState } from 'react'

export default function App() {
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
```

![](C:\Users\acer\Desktop\新建文件夹\images\ref2.gif)

闭包问题完美解决了！

对闭包问题有疑惑的同学可以先去学习一下，这是javascript一个非常重要的特性。

但实际上我们在使用React Hook的时候多数情况下是不会存在闭包问题的。

我这里列举了几个比较常见的出现闭包的情况

* setTimeout，setInterval，Promise.then等
* useEffect的卸载函数

## 四、useContext

useContext接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的<Mycontext.Provider>的 value prop 决定。 

 当组件上层最近的<Mycontext.Provider>更新时，该 Hook 会触发重渲染，并使用最新传递给 `MyContext` Provider 的 context value 值 

我们通过一段代码演示一下

```jsx
import React, { useContext, useState } from "react";

//创建一个context对象，初始值只有当Provider没有传递value prop属性时才会生效
const Context = React.createContext(null)
//App组件
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
```

看下效果：

![](C:\Users\acer\Desktop\新建文件夹\images\context1.gif)

有了useContext，我们就可以把一些需要共享的数据通过Provider共享出去，就不需要父子组件一代一代的传递了！



## 五、useCallback

useCallback是一个记忆函数，接收两个参数，第一个是一个函数，第二个是依赖数组。

```jsx
const myCallbackFunc = useCallback(
    () => {
        
    }, [])
```

useCallback能防止因为组件重新渲染，导致方法被重新创建 ，起到缓存作用，只有依赖数组里的元素变化了，该方法才会重新声明一次 。

什么是记忆？我们拿useState举个例（useState也是一个记忆函数)

```jsx
import React, { useState } from 'react'

export default function App() {
  const [num, setNum] = useState(0)
  let val = 0
  console.log('val:' + val++);
  console.log('num:' + num);
  return (
    <div>
      <button
        onClick={() => setNum(num + 1)}
      >
        num + 1
      </button>
    </div>
  )
}
```

看下效果：

![](C:\Users\acer\Desktop\新建文件夹\images\callback1.gif)

每当组件重新渲染，控制台打印的val一直是0，而使用了useState维护的num一直是最新值，这就是记忆。如果我们在组件内部直接声明或者初始化一个变量，每当组件重新渲染，这个变量总会重新声明或者被初始化，而useState的初始值只在组件挂载的时候初始化给对应状态。

说完记忆，我们再来演示useCallback

```jsx
import React, { useCallback, useState } from 'react'

export default function App() {
  const [num, setNum] = useState(0)
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
```

我们把打印num的的代码用useCallback包裹起来，依赖数组里先什么都不加

效果：

![](C:\Users\acer\Desktop\新建文件夹\images\callback2.gif)

可以看到我们更新了num，但控制台打印的num总是初始值，这是因为组件的渲染没有引起我们函数的重新声明，起了缓存作用，handleClick函数里的num值一直就是最初的值。

要解决这个问题，在依赖数组里加入num就好了，每次num变化，这个函数就会重新被声明。

有同学想到那这跟不用useCallback没区别呀，但是别忘了实际使用当中我们的组件可能不止一个状态呢！

因此，使用useCallback能避免一些不必要的更新。

但是要注意的是， **useCallback必须配合 react.memo pureComponent ，否则不但不会提升性能，还有可能降低性能** 





## 六、useMemo

useMemo和useCallback接收的参数都是一样，都是在其依赖项发生变化后才执行，都是返回缓存的值，区别在于useCallback返回的是函数，而useMemo返回的是函数运行的结果。

直接上例子：

```jsx
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
  //useMemo接收一个函数，一个依赖数组，每当依赖数组里的元素发生变化，useMemo就会重新执行并返回这个函数的返回值，从而拿到最新的值,需要注意的是,useMemo里的函数必须要有返回值
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

```

我们用两个input组件，一个负责添加用户，一个用于查询用户，ul里展示列表信息

效果:

![](C:\Users\acer\Desktop\新建文件夹\images\memo1.gif)

useMemo能够为我们的React项目做性能优化

* useMemo可以减少不必要的循环，减少不必要的渲染 

* 因为useMemo根据依赖执行，可以避免很多不必要的开销(变量重新声明赋值)

相比于useCallback，我们在项目中因当多多使用useMemo，优化我们的项目。





## 七、useReducer

useReducer是useState的替代品，下面是他的基本用法

```js
const [state, dispatch] = useReducer(reducer, initState, init)
```

现在我们来讲一下这两个变量和三个参数是干什么用的

state没有什么好说的，跟<a href="#heading-0">**useState**</a>返回的state一样，就是一个状态

initState跟useState接收的参数一样，代表状态的初始值

init我们最后面再讲解

接下来重点讲一下reducer，dispatch

根据一个案例就能清楚的知道它们分别是干什么的了

```jsx
import React, { useReducer } from 'react'
/**
 * reducer是一个函数，
 * 第一个参数是当前组件使用useReducer维护的状态，React会自动帮我们传递过来
 * 第二个参数action是dispatch函数下发的命令类型，它规定了在reducer函数里如何改变状态
 */
const reducer = (state, action) => {
  // 当然action不一定是一个对象，这取决于你的dispach函数怎么传递参数，可以字符串也可以是数字
  const { type } = action
  // 通过switch来处理各种type
  switch (type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new TypeError('type not found')
  }
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  return (
    <div>
      <h2>当前值为：{state.count}</h2>
      <button onClick={() => dispatch({type: 'increment'})}>点击加一</button>
      <button onClick={() => dispatch({type: 'decrement'})}>点击减一</button>
    </div>
  )
}
export default App
```

这是一个简单的计数器

![](C:\Users\acer\Desktop\新建文件夹\images\useReducer1.gif)

通过上面的代码大概清楚了dispatch就是一个下发命令的函数，而reducer就是负责真正干活的函数

通俗讲reducer就是我们手机的语言助手，dispatch就是我们自己，我们叫语言助手打开某个应用，它就会帮我们打开它，而一些无法识别的它就没办法工作。

useReducer的第三个参数init的作用是惰性的创建初始state，是一个可选的参数。 这么做可以将用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利 

```jsx
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

```



## 八、useLayoutEffect

大部分情况下使用useEffect已经能满足我们的需求。

useEffect是在浏览器渲染dom后执行，而useLayoutEffect是在浏览器渲染dom之前执行，会引起页面卡顿的效果。

```jsx
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
```

最终页面呈现的效果是'dom渲染之前'





## React18

