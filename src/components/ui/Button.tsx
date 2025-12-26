import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading, children, disabled, variant = 'contained', size = 'medium', ...props }, ref) => {
    return (
      <MuiButton
        ref={ref}
        variant={variant as any}
        size={size}
        disabled={isLoading || disabled}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : props.startIcon}
        {...props}
      >
        {children}
      </MuiButton>
    );
  }
);
Button.displayName = 'Button';

export { Button };

