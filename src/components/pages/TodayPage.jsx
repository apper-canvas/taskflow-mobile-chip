import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import QuickAddTask from '@/components/molecules/QuickAddTask'
import TaskList from '@/components/organisms/TaskList'
import { useTasks } from '@/hooks/useTasks'
import { taskService } from '@/services/api/taskService'

const TodayPage = () => {
  const { searchQuery } = useOutletContext()
  const { createTask, updateTask, deleteTask, toggleComplete } = useTasks()
  const [todayTasks, setTodayTasks] = useState([])
  const [overdueTasks, setOverdueTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadTodayTasks = async () => {
    try {
      setLoading(true)
      setError('')
      const [todayData, overdueData] = await Promise.all([
        taskService.getToday(),
        taskService.getOverdue()
      ])
      setTodayTasks(todayData)
      setOverdueTasks(overdueData)
    } catch (err) {
      setError('Failed to load today\'s tasks. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTodayTasks()
  }, [])

  const handleCreateTask = async (taskData) => {
    const newTask = await createTask(taskData)
    if (newTask.dueDate === format(new Date(), 'yyyy-MM-dd')) {
      setTodayTasks(prev => [...prev, newTask])
    }
  }

  const handleUpdateTask = async (id, updates) => {
    const updatedTask = await updateTask(id, updates)
    if (updatedTask) {
      setTodayTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ))
      setOverdueTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ))
    }
  }

  const handleDeleteTask = async (id) => {
    await deleteTask(id)
    setTodayTasks(prev => prev.filter(task => task.Id !== parseInt(id)))
    setOverdueTasks(prev => prev.filter(task => task.Id !== parseInt(id)))
  }

  const handleToggleComplete = async (id) => {
    const updatedTask = await toggleComplete(id)
    if (updatedTask) {
      setTodayTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ))
      setOverdueTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ))
    }
  }

  const totalTasks = todayTasks.length + overdueTasks.length
  const completedTasks = [...todayTasks, ...overdueTasks].filter(task => task.completed).length

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
              Today
            </h1>
            <p className="text-gray-600">
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Progress</p>
              <p className="text-lg font-semibold text-gray-900">
                {completedTasks} of {totalTasks}
              </p>
            </div>
            
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#5B4EFF"
                  strokeWidth="2"
                  strokeDasharray={`${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <ApperIcon name="Calendar" className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Add */}
      <QuickAddTask onTaskCreate={handleCreateTask} />

      {/* Overdue Tasks */}
      {overdueTasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <ApperIcon name="AlertTriangle" className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Overdue ({overdueTasks.length})
            </h2>
          </div>
          <TaskList
            tasks={overdueTasks}
            loading={false}
            error=""
            onToggleComplete={handleToggleComplete}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onCreateTask={handleCreateTask}
            searchQuery={searchQuery}
            emptyType="today"
          />
        </motion.div>
      )}

      {/* Today's Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <ApperIcon name="Calendar" className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">
            Today ({todayTasks.length})
          </h2>
        </div>
        <TaskList
          tasks={todayTasks}
          loading={loading}
          error={error}
          onRetry={loadTodayTasks}
          onToggleComplete={handleToggleComplete}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onCreateTask={handleCreateTask}
          searchQuery={searchQuery}
          emptyType="today"
        />
      </motion.div>
    </div>
  )
}

export default TodayPage