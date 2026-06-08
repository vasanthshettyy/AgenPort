import { Helmet } from 'react-helmet-async'

function App() {
  return (
    <>
      <Helmet>
        <title>Custom Full-Stack Development Agency | USA, UK, AU</title>
        <meta name="description" content="Premium custom software systems for high-ticket international B2B clients. We build the systems that scale your business — without the SaaS tax." />
      </Helmet>
      
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-accent-primary mb-4">
          Agency Portfolio initialized
        </h1>
        <p className="text-gray-400">
          Tailwind, Vite, React Helmet, and dependencies are ready.
        </p>
      </main>
    </>
  )
}

export default App
