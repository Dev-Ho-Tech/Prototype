import React from 'react';
import { cn } from '../utils/utils';

interface DropdownMenuSeparatorProps {
  className?: string;
}

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement, 
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("h-px my-1 bg-gray-200", className)}
      {...props}
    />
  );
});

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export { DropdownMenuSeparator };