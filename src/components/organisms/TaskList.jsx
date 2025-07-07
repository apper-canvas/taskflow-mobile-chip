import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from '@/components/molecules/TaskCard'
import TaskModal from '@/components/molecules/TaskModal'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onRetry,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  onCreateTask,
  emptyType = 'tasks',
  emptyTitle,
  emptyDescription,
  searchQuery = '',
  categoryFilter = null,
  className = ""
}) => {
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (categoryFilter !== null) {
      filtered = filtered.filter(task => task.categoryId === categoryFilter)
    }

    // Sort by priority and due date
    filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
      
      if (priorityDiff !== 0) return priorityDiff
      
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      
      if (a.dueDate) return -1
      if (b.dueDate) return 1
      
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return filtered
  }, [tasks, searchQuery, categoryFilter])

  const handleEditTask = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleCreateTask = () => {
    setSelectedTask(null)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setSelectedTask(null)
    setIsModalOpen(false)
  }

  const handleTaskSave = async (taskData) => {
    if (selectedTask) {
      await onUpdateTask(selectedTask.Id, taskData)
    } else {
      await onCreateTask(taskData)
    }
    handleModalClose()
  }

  if (loading) {
    return <Loading type="tasks" />
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={onRetry}
        type="default"
      />
    )
  }

  if (filteredTasks.length === 0) {
    return (
      <Empty
        type={searchQuery ? 'search' : emptyType}
        title={emptyTitle}
        description={emptyDescription}
        onAction={searchQuery ? null : handleCreateTask}
      />
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.Id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={handleEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </AnimatePresence>

      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleTaskSave}
      />
    </div>
  )
}

export default TaskList