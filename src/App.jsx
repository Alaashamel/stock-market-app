import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import TickerTape from './components/market/TickerTape'
import Dashboard from './pages/Dashboard'
import Market from './pages/Market'
import Portfolio from './pages/Portfolio'
import News from './pages/News'
import Analysis from './pages/Analysis'
import Auth from './pages/Auth'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { user, loading } = useAuth()

  const renderPage = () => {
    if (!user) {
      return <Auth />
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'market':
        return <Market />
      case 'portfolio':
        return <Portfolio />
      case 'news':
        return <News />
      case 'analysis':
        return <Analysis />
      case 'auth':
        return <Auth />
      default:
        return <Dashboard />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {user && (
        <>
          <TickerTape />
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
      )}
      <main className="flex-grow container mx-auto px-4 py-6">
        {renderPage()}
      </main>
      {user && <Footer />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App