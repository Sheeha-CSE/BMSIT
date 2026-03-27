import { HeadContent, Scripts, Outlet, createRootRoute } from '@tanstack/react-router'
import { AppProvider } from '@/contexts/AppContext'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ChatBot } from '@/components/ChatBot'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'BMSIT Institute of Technology — Smart Campus OS' },
      { name: 'description', content: 'NAAC A+ Accredited Engineering College. Admissions Open 2024-25.' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
})

function RootLayout() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </AppProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
