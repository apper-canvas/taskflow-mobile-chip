import { motion } from 'framer-motion'

const Loading = ({ type = 'tasks' }) => {
  const renderTasksSkeleton = () => (
    <div className="space-y-4">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mt-0.5"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
              <div className="flex items-center space-x-2 mt-3">
                <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderCategoriesSkeleton = () => (
    <div className="space-y-2">
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-3 p-2 rounded-lg"
        >
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-6 h-4 bg-gray-200 rounded animate-pulse"></div>
        </motion.div>
      ))}
    </div>
  )

  const renderFormSkeleton = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
        <div className="h-20 bg-gray-200 rounded animate-pulse w-full"></div>
      </div>
      <div className="flex space-x-3">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
      </div>
      <div className="flex space-x-2 pt-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse w-20"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse w-16"></div>
      </div>
    </div>
  )

  const skeletonMap = {
    tasks: renderTasksSkeleton,
    categories: renderCategoriesSkeleton,
    form: renderFormSkeleton
  }

  return (
    <div className="animate-pulse">
      {skeletonMap[type] ? skeletonMap[type]() : renderTasksSkeleton()}
    </div>
  )
}

export default Loading