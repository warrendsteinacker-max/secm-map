import { useState } from 'react'
import LiteracyMindMap from './comps/LiteracyMindMap'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LiteracyMindMap />
    </>
  )
}

export default App
