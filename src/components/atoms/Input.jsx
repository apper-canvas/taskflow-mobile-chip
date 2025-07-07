import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Input = forwardRef(({ 
  className, 
  type = 'text',
  error = false,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export default Input