interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const Button = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
  fullWidth = false,
}: ButtonProps) => {
  const baseStyles = 'font-medium rounded-lg transition-colors duration-200';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const width = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
