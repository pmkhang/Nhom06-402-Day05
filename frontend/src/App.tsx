import { useEffect, useState } from 'react'

function App() {
  const [apiMessage, setApiMessage] = useState<string>('Pinging backend...')

  useEffect(() => {
    // Fetch from backend API
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    fetch(`${apiUrl}/`)
      .then(res => res.json())
      .then(data => setApiMessage(data.message || JSON.stringify(data)))
      .catch(err => setApiMessage(`Error connecting to backend: ${err.message}`))
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="rounded-2xl bg-white p-8 shadow-xl text-center max-w-lg">
        <h1 className="text-4xl font-bold text-blue-600">Healthcare Helper</h1>
        
        <div className="mt-6 text-slate-600 border-l-4 border-blue-500 pl-4 text-left">
          <p className="font-semibold text-gray-800">Frontend Stack:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>React + Vite</li>
            <li>TypeScript</li>
            <li>Tailwind CSS v4</li>
          </ul>
        </div>

        <div className="mt-4 text-slate-600 border-l-4 border-green-500 pl-4 text-left">
          <p className="font-semibold text-gray-800">Backend Connection Status:</p>
          <p className="mt-2 p-2 bg-gray-100 rounded text-sm font-mono text-green-700">
            {apiMessage}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
