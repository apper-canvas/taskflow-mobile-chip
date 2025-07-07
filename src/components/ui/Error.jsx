import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ 
  message = 'Something went wrong', 
  onRetry, 
  showRetry = true,
  type = 'default'
}) => {
  const getErrorIcon = () => {
    switch (type) {
      case 'network':
        return 'WifiOff'
      case 'notFound':
        return 'Search'
      case 'permission':
        return 'Lock'
      default:
        return 'AlertCircle'
    }
  }

  const getErrorTitle = () => {
    switch (type) {
      case 'network':
        return 'Connection Problem'
      case 'notFound':
        return 'Nothing Found'
      case 'permission':
        return 'Access Denied'
      default:
        return 'Oops! Something went wrong'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 100 
        }}
        className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
      >
        <ApperIcon 
          name={getErrorIcon()} 
          className="w-8 h-8 text-red-500" 
        />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-gray-800 mb-2"
      >
        {getErrorTitle()}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-6 max-w-md"
      >
        {message}
      </motion.p>
      
      {showRetry && onRetry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            onClick={onRetry}
            className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Error