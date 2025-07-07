import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import { format, addDays, startOfDay } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import QuickAddTask from '@/components/molecules/QuickAddTask'
import TaskList from '@/components/organisms/TaskList'
import { useTasks } from '@/hooks/useTasks'
import { taskService } from '@/services/api/taskService'

const UpcomingPage = () => {
  const { searchQuery } = useOutletContext()
  const { createTask, updateTask, deleteTask, toggleComplete } = useTasks()
  const [upcomingTasks, setUpcomingTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadUpcomingTasks = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await taskService.getUpcoming()
      setUpcomingTasks(data)
    } catch (err) {
      setError('Failed to load upcoming tasks. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUpcomingTasks()
  }, [])

  const handleCreateTask = async (taskData) => {
    const newTask = await createTask(taskData)
    if (newTask.dueDate && new Date(newTask.dueDate) > new Date()) {
      setUpcomingTasks(prev => [...prev, newTask])
    }
  }

  const handleUpdateTask = async (id, updates) => {
    const updatedTask = await updateTask(id, updates)
    if (updatedTask) {
      setUpcomingTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ))
    }
  }

  const handleDeleteTask = async (id) => {
    await deleteTask(id)
    setUpcomingTasks(prev => prev.filter(task => task.Id !== parseInt(id)))
  }

  const handleToggleComplete = async (id) => {
    const updatedTask = await toggleComplete(id)
    if (updatedTask) {
      setUpcomingTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ))
    }
  }

  // Group tasks by date
  const groupedTasks = upcomingTasks.reduce((groups, task) => {
    if (!task.dueDate) return groups
    
    const date = format(new Date(task.dueDate), 'yyyy-MM-dd')
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(task)
    return groups
  }, {})

  const sortedDates = Object.keys(groupedTasks).sort()

  const getDateLabel = (dateString) => {
    const date = new Date(dateString)
    const today = startOfDay(new Date())
    const tomorrow = addDays(today, 1)
    
    if (format(date, 'yyyy-MM-dd') === format(tomorrow, 'yyyy-MM-dd')) {
      return 'Tomorrow'
    }
    
    return format(date, 'EEEE, MMMM d')
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
              Upcoming
            </h1>
            <p className="text-gray-600">
              Plan ahead and stay on top of your schedule
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-2xl font-bold text-primary">{upcomingTasks.length}</p>
            </div>
            
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
              <ApperIcon name="Clock" className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Add */}
      <QuickAddTask onTaskCreate={handleCreateTask} />

      {/* Grouped Tasks */}
      {sortedDates.length > 0 ? (
        <div className="space-y-8">
          {sortedDates.map((date, index) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <ApperIcon name="Calendar" className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {getDateLabel(date)} ({groupedTasks[date].length})
                </h2>
              </div>
              
              <TaskList
                tasks={groupedTasks[date]}
                loading={false}
                error=""
                onToggleComplete={handleToggleComplete}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                onCreateTask={handleCreateTask}
                searchQuery={searchQuery}
                emptyType="upcoming"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <TaskList
          tasks={upcomingTasks}
          loading={loading}
          error={error}
          onRetry={loadUpcomingTasks}
          onToggleComplete={handleToggleComplete}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onCreateTask={handleCreateTask}
          searchQuery={searchQuery}
          emptyType="upcoming"
        />
      )}
    </div>
  )
}

export default UpcomingPage