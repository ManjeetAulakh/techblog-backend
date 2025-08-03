import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-green-500 text-white p-6 rounded-md">
        Tailwind is working!
      </div>

    </>
  )
}

export default App
