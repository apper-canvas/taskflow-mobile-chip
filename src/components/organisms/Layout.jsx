import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/organisms/Header'
import Sidebar from '@/components/organisms/Sidebar'

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={handleSearch}
        onMenuToggle={handleMenuToggle}
        searchQuery={searchQuery}
      />
      
      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <Outlet context={{ searchQuery, activeCategory }} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout