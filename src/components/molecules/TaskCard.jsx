import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, isToday, isPast } from 'date-fns'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Checkbox'
import { useCategories } from '@/hooks/useCategories'

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete, className = "" }) => {
  const [isCompleting, setIsCompleting] = useState(false)
  const { categories } = useCategories()
  
  const category = categories.find(cat => cat.Id === task.categoryId)
  
  const handleToggleComplete = async () => {
    try {
      setIsCompleting(true)
      await onToggleComplete(task.Id)
      toast.success(task.completed ? 'Task reopened!' : 'Task completed! 🎉')
    } catch (error) {
      toast.error('Failed to update task')
    } finally {
      setIsCompleting(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await onDelete(task.Id)
        toast.success('Task deleted')
      } catch (error) {
        toast.error('Failed to delete task')
      }
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500'
      case 'medium':
        return 'text-yellow-500'
      case 'low':
        return 'text-green-500'
      default:
        return 'text-gray-400'
    }
  }

  const getPriorityBorder = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500'
      case 'medium':
        return 'border-l-yellow-500'
      case 'low':
        return 'border-l-green-500'
      default:
        return 'border-l-gray-300'
    }
  }

  const formatDueDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    
    if (isToday(date)) {
      return { text: 'Today', color: 'text-blue-600 bg-blue-50' }
    } else if (isPast(date)) {
      return { text: 'Overdue', color: 'text-red-600 bg-red-50' }
    } else {
      return { text: format(date, 'MMM d'), color: 'text-gray-600 bg-gray-50' }
    }
  }

  const dueDateInfo = formatDueDate(task.dueDate)

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200 ${getPriorityBorder(task.priority)} border-l-4 ${task.completed ? 'opacity-60' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            disabled={isCompleting}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`font-medium text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-1 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ApperIcon name="Edit2" className="w-4 h-4 text-gray-400" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ApperIcon name="Trash2" className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mt-3">
            {category && (
              <span 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${category.color}20`,
                  color: category.color
                }}
              >
                <ApperIcon name={category.icon} className="w-3 h-3 mr-1" />
                {category.name}
              </span>
            )}
            
            <div className="flex items-center space-x-2">
              <ApperIcon 
                name="Flag" 
                className={`w-4 h-4 ${getPriorityColor(task.priority)}`} 
              />
              <span className="text-xs text-gray-500 capitalize">
                {task.priority}
              </span>
            </div>
            
            {dueDateInfo && (
              <span className={`px-2 py-1 rounded text-xs font-medium ${dueDateInfo.color}`}>
                {dueDateInfo.text}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {isCompleting && (
        <motion.div
          className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TaskCard