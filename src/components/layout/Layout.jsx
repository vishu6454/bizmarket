import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="grow">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout