import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import QuickAddTask from '@/components/molecules/QuickAddTask'
import TaskList from '@/components/organisms/TaskList'
import { useTasks } from '@/hooks/useTasks'

const TasksPage = () => {
  const { searchQuery, activeCategory } = useOutletContext()
  const { tasks, loading, error, loadTasks, createTask, updateTask, deleteTask, toggleComplete } = useTasks()

  const totalTasks = tasks.filter(task => !task.completed).length
  const completedTasks = tasks.filter(task => task.completed).length

  const handleClick = () => {
    const temp = {};
    console.log(temp.length());
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
              All Tasks
            </h1>
            <p className="text-gray-600">
              Manage and organize all your tasks 1
            </p>
            <button onClick={handleClick}>
              Click me
            </button>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-primary">{totalTasks}</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-success">{completedTasks}</p>
            </div>
            
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="List" className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Add */}
      <QuickAddTask onTaskCreate={createTask} />

      {/* Tasks List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <ApperIcon name="CheckSquare" className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">
            Tasks ({tasks.filter(task => !task.completed).length})
          </h2>
        </div>
        
        <TaskList
          tasks={tasks.filter(task => !task.completed)}
          loading={loading}
          error={error}
          onRetry={loadTasks}
          onToggleComplete={toggleComplete}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onCreateTask={createTask}
          searchQuery={searchQuery}
          categoryFilter={activeCategory}
          emptyType="tasks"
        />
      </motion.div>
    </div>
  )
}

export default TasksPage
