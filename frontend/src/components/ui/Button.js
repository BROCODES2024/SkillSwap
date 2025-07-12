import React from 'react';
import { cn } from '../../utils/helpers';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  ...props 
}) => {
  const baseClasses = 'btn font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'btn-primary focus:ring-primary-500',
    secondary: 'btn-secondary focus:ring-secondary-500',
    outline: 'btn-outline focus:ring-primary-500',
    ghost: 'btn-ghost focus:ring-secondary-500',
    danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500',
    success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500'
  };
  
  const sizeClasses = {
    sm: 'btn-sm text-xs',
    md: 'btn-md',
    lg: 'btn-lg'
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <LoadingSpinner size="sm" className="mr-2" />
      )}
      
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className="mr-2 h-4 w-4" />
      )}
      
      {children}
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="ml-2 h-4 w-4" />
      )}
    </button>
  );
};

// Simple loading spinner for button
const LoadingSpinner = ({ size = 'sm', className }) => (
  <div className={cn('animate-spin rounded-full border-2 border-current border-t-transparent', className)}>
    <span className="sr-only">Loading...</span>
  </div>
);

export default Button; 