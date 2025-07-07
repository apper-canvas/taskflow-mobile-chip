import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const CategoryFilter = ({ categories, activeCategory, onCategoryChange, taskCounts = {} }) => {
  const allTaskCount = Object.values(taskCounts).reduce((sum, count) => sum + count, 0)

  return (
    <div className="space-y-1">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant={activeCategory === null ? 'primary' : 'ghost'}
          onClick={() => onCategoryChange(null)}
          className="w-full justify-start text-left p-2 rounded-lg"
        >
          <ApperIcon name="List" className="w-4 h-4 mr-3" />
          <span className="flex-1">All Tasks</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {allTaskCount}
          </span>
        </Button>
      </motion.div>

      {categories.map((category, index) => (
        <motion.div
          key={category.Id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Button
            variant={activeCategory === category.Id ? 'primary' : 'ghost'}
            onClick={() => onCategoryChange(category.Id)}
            className="w-full justify-start text-left p-2 rounded-lg"
          >
            <ApperIcon name={category.icon} className="w-4 h-4 mr-3" />
            <span className="flex-1">{category.name}</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {taskCounts[category.Id] || 0}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

export default CategoryFilter