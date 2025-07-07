import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import { useCategories } from '@/hooks/useCategories'

const QuickAddTask = ({ onTaskCreate, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { categories } = useCategories()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error('Please enter a task title')
      return
    }

    try {
      setLoading(true)
      await onTaskCreate({
        title: title.trim(),
        description: '',
        categoryId: categoryId ? parseInt(categoryId) : categories[0]?.Id || 1,
        priority,
        dueDate: dueDate || null
      })
      
      // Reset form
      setTitle('')
      setCategoryId('')
      setPriority('medium')
      setDueDate('')
      setIsExpanded(false)
      
      toast.success('Task created successfully!')
    } catch (error) {
      toast.error('Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setTitle('')
    setCategoryId('')
    setPriority('medium')
    setDueDate('')
    setIsExpanded(false)
  }

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-3">
          <ApperIcon name="Plus" className="w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="border-none focus:ring-0 focus:border-none p-0 text-base placeholder-gray-500"
          />
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {isExpanded && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <Select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category.Id} value={category.Id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <Select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Button
                  type="submit"
                  loading={loading}
                  disabled={!title.trim()}
                  className="px-4 py-2"
                >
                  Add Task
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCancel}
                  className="px-4 py-2"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </form>
    </motion.div>
  )
}

export default QuickAddTask