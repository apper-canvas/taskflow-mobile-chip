import { motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import CategoryFilter from '@/components/molecules/CategoryFilter'
import { useCategories } from '@/hooks/useCategories'
import { useTasks } from '@/hooks/useTasks'

const Sidebar = ({ isOpen, onClose, activeCategory, onCategoryChange }) => {
  const location = useLocation()
  const { categories } = useCategories()
  const { tasks } = useTasks()

  const navigationItems = [
    { path: '/', label: 'Today', icon: 'Calendar', count: tasks.filter(t => !t.completed && t.dueDate === new Date().toISOString().split('T')[0]).length },
    { path: '/upcoming', label: 'Upcoming', icon: 'Clock', count: tasks.filter(t => !t.completed && t.dueDate && t.dueDate > new Date().toISOString().split('T')[0]).length },
    { path: '/all', label: 'All Tasks', icon: 'List', count: tasks.filter(t => !t.completed).length },
    { path: '/completed', label: 'Completed', icon: 'CheckCircle', count: tasks.filter(t => t.completed).length },
  ]

  const taskCounts = categories.reduce((acc, category) => {
    acc[category.Id] = tasks.filter(task => task.categoryId === category.Id && !task.completed).length
    return acc
  }, {})

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">TaskFlow</h2>
        </div>
      </div>

      <nav className="flex-1 p-6 space-y-6">
        {/* Main Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Overview
          </h3>
          <div className="space-y-1">
            {navigationItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => 
                  `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                <span className="flex-1">{item.label}</span>
                {item.count > 0 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Categories
          </h3>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
            taskCounts={taskCounts}
          />
        </div>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <ApperIcon name="Zap" className="w-4 h-4" />
          <span>Stay productive!</span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
          <motion.div
            className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl"
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            </div>
            {sidebarContent}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default Sidebar