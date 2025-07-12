import React from 'react';
import { cn } from '../../utils/helpers';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className,
  onClick,
  removable = false,
  onRemove,
  ...props 
}) => {
  const baseClasses = 'badge inline-flex items-center font-medium';
  
  const variantClasses = {
    default: 'badge-default',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    primary: 'badge-default'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  };

  const isClickable = onClick || removable;

  return (
    <span
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        isClickable && 'cursor-pointer hover:scale-105 transition-transform',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
      
      {removable && (
        <button
          type="button"
          className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-current hover:bg-current hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.(e);
          }}
        >
          <span className="sr-only">Remove</span>
          <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Badge; 