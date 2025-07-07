import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Select = forwardRef(({ 
  className, 
  children,
  error = false,
  ...props 
}, ref) => {
  return (
    <select
      className={cn(
        'flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
})

Select.displayName = 'Select'

export default Select