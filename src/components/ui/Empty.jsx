import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  type = 'tasks',
  title,
  description,
  actionText,
  onAction,
  showAction = true 
}) => {
  const getEmptyConfig = () => {
    switch (type) {
      case 'tasks':
        return {
          icon: 'CheckSquare',
          title: title || 'No tasks yet',
          description: description || 'Get started by creating your first task. Stay organized and productive!',
          actionText: actionText || 'Create Task',
          gradient: 'from-blue-400 to-purple-500'
        }
      case 'today':
        return {
          icon: 'Calendar',
          title: title || 'All caught up!',
          description: description || 'No tasks due today. Enjoy your free time or get ahead on tomorrow\'s work.',
          actionText: actionText || 'Add Task',
          gradient: 'from-green-400 to-blue-500'
        }
      case 'upcoming':
        return {
          icon: 'Clock',
          title: title || 'No upcoming tasks',
          description: description || 'Your schedule is clear for the upcoming days. Time to plan ahead!',
          actionText: actionText || 'Plan Task',
          gradient: 'from-orange-400 to-pink-500'
        }
      case 'completed':
        return {
          icon: 'Trophy',
          title: title || 'Nothing completed yet',
          description: description || 'Complete some tasks to see them here. Every small step counts!',
          actionText: actionText || 'View All Tasks',
          gradient: 'from-yellow-400 to-red-500'
        }
      case 'search':
        return {
          icon: 'Search',
          title: title || 'No matching tasks',
          description: description || 'Try adjusting your search terms or browse all tasks.',
          actionText: actionText || 'Clear Search',
          gradient: 'from-indigo-400 to-purple-500'
        }
      case 'category':
        return {
          icon: 'Folder',
          title: title || 'No tasks in this category',
          description: description || 'This category is empty. Add some tasks to get organized!',
          actionText: actionText || 'Add Task',
          gradient: 'from-teal-400 to-green-500'
        }
      default:
        return {
          icon: 'FileText',
          title: title || 'Nothing here',
          description: description || 'This section is empty right now.',
          actionText: actionText || 'Get Started',
          gradient: 'from-gray-400 to-gray-600'
        }
    }
  }

  const config = getEmptyConfig()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          delay: 0.1
        }}
        className={`w-20 h-20 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-6 shadow-lg`}
      >
        <ApperIcon 
          name={config.icon} 
          className="w-10 h-10 text-white" 
        />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-gray-800 mb-3"
      >
        {config.title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-8 max-w-md leading-relaxed"
      >
        {config.description}
      </motion.p>
      
      {showAction && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={onAction}
            className={`bg-gradient-to-r ${config.gradient} hover:shadow-lg text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105`}
          >
            {config.actionText}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Empty