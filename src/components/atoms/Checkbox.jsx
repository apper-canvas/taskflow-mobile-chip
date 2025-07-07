import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const Checkbox = forwardRef(({ 
  className, 
  checked = false,
  onChange,
  ...props 
}, ref) => {
  return (
    <motion.input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={cn(
        'task-checkbox',
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    />
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox