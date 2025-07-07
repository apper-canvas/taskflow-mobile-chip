import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import { format, formatDistanceToNow } from 'date-fns'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import TaskList from '@/components/organisms/TaskList'
import { useTasks } from '@/hooks/useTasks'
import { taskService } from '@/services/api/taskService'

const CompletedPage = () => {
  const { searchQuery } = useOutletContext()
  const { updateTask, deleteTask, toggleComplete } = useTasks()
  const [completedTasks, setCompletedTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadCompletedTasks = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await taskService.getCompleted()
      setCompletedTasks(data)
    } catch (err) {
      setError('Failed to load completed tasks. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCompletedTasks()
  }, [])

  const handleUpdateTask = async (id, updates) => {
    const updatedTask = await updateTask(id, updates)
    if (updatedTask) {
      setCompletedTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ))
    }
  }

  const handleDeleteTask = async (id) => {
    await deleteTask(id)
    setCompletedTasks(prev => prev.filter(task => task.Id !== parseInt(id)))
  }

  const handleToggleComplete = async (id) => {
    const updatedTask = await toggleComplete(id)
    if (updatedTask) {
      if (updatedTask.completed) {
        setCompletedTasks(prev => prev.map(task => 
          task.Id === parseInt(id) ? updatedTask : task
        ))
      } else {
        setCompletedTasks(prev => prev.filter(task => task.Id !== parseInt(id)))
      }
    }
  }

  const handleClearCompleted = async () => {
    if (window.confirm('Are you sure you want to delete all completed tasks? This action cannot be undone.')) {
      try {
        await Promise.all(completedTasks.map(task => deleteTask(task.Id)))
        setCompletedTasks([])
        toast.success('All completed tasks have been cleared')
      } catch (error) {
        toast.error('Failed to clear completed tasks')
      }
    }
  }

  const totalCompleted = completedTasks.length
  const thisWeekCompleted = completedTasks.filter(task => {
    const completedDate = new Date(task.completedAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return completedDate >= weekAgo
  }).length

  const getCompletionTime = (task) => {
    if (!task.completedAt) return ''
    return formatDistanceToNow(new Date(task.completedAt), { addSuffix: true })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Completed Tasks
            </h1>
            <p className="text-gray-600">
              Celebrate your accomplishments and track your progress
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">This Week</p>
              <p className="text-2xl font-bold text-success">{thisWeekCompleted}</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold text-primary">{totalCompleted}</p>
            </div>
            
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <ApperIcon name="Trophy" className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {totalCompleted > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCompleted}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
              Clear All Completed
            </Button>
          </div>
        )}
      </motion.div>

      {/* Completed Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <ApperIcon name="CheckCircle" className="w-5 h-5 text-success" />
          <h2 className="text-lg font-semibold text-gray-900">
            Completed ({totalCompleted})
          </h2>
        </div>
        
        <TaskList
          tasks={completedTasks}
          loading={loading}
          error={error}
          onRetry={loadCompletedTasks}
          onToggleComplete={handleToggleComplete}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          searchQuery={searchQuery}
          emptyType="completed"
        />
      </motion.div>
    </div>
  )
}

export default CompletedPage