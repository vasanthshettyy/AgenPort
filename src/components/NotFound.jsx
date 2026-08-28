import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404: Page Not Found | Custom Full-Stack Development Agency</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="min-h-screen flex items-center justify-center bg-canvas p-6">
        <div className="max-w-md w-full text-center">
          <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-accent-primary to-accent-secondary mb-6">404</div>
          <h1 className="text-2xl font-bold text-white mb-4">System Endpoint Unreachable</h1>
          <p className="text-gray-400 mb-8">
            The page you are looking for has been moved or does not exist in our current architecture.
          </p>
          <a href="/" className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl text-canvas font-bold bg-accent-primary overflow-hidden">
            <span className="btn-fill-text group-hover:text-accent-primary">Return to Core Infrastructure</span>
            <div className="btn-fill-layer bg-white" />
          </a>
        </div>
      </section>
    </>
  );
}
