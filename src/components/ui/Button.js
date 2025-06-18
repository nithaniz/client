// src/components/ui/Button.js
import React from 'react';

const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  icon: Icon, // 👈 receive icon as a component
  iconPosition = 'left', // 'left' or 'right'
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-400',
    secondary: 'bg-transparent border-2 border-violet-600 text-violet-600 hover:bg-violet-100 focus:ring-violet-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400',
    ghost: 'bg-white/5 text-violet-600 hover:bg-white/10 focus:ring-violet-300',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className="mr-2 h-4 w-4" />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className="ml-2 h-4 w-4" />
      )}
    </button>
  );
};

export default Button;
