import React, { useState } from 'react'
function App() {
  const [value, setValue] = useState(0)
  return (
    <div>
      <h1>当前值:{value}</h1>
      <button onClick={() => {
        setTimeout(() => {
          console.log(value)
        },2000)
        setValue(value + 1)
      }}>
        点击加一
      </button>
    </div>
  );
}

export default App;
