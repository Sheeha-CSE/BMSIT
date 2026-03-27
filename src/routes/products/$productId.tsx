import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$productId')({
  component: () => (
    <div className="min-h-screen flex items-center justify-center dark:bg-slate-900">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#1e3a5f] dark:text-white mb-4">Page Not Found</h1>
        <Link to="/" className="text-amber-600 hover:underline">Go to Home</Link>
      </div>
    </div>
  ),
})
