// src/hooks/use-toast.ts
import { toast as sonnerToast } from "sonner";
import type React from 'react'; // Import React for ReactNode type

// Define the types for different toast variants
// Added "destructive" to the allowed types
type ToastType = "success" | "info" | "warning" | "error" | "action" | "default" | "destructive";

// Define the structure for toast props, extending sonner's options
type ToastProps = {
  title?: string;
  description?: React.ReactNode;
  variant?: ToastType; // Now includes "destructive"
  action?: React.ReactNode; // For action toasts
} & Omit<React.ComponentPropsWithoutRef<typeof sonnerToast>, 'type'>; // Omit 'type' to avoid conflict if needed


// The main useToast hook
const useToast = () => {
  const toast = ({ title, description, variant = "default", action, ...props }: ToastProps) => {
    // Map variant to sonner's functions
    switch (variant) {
      case "success":
        sonnerToast.success(title, { description, action, ...props });
        break;
      case "info":
        sonnerToast.info(title, { description, action, ...props });
        break;
      case "warning":
        sonnerToast.warning(title, { description, action, ...props });
        break;
      case "error":
      case "destructive": // Map "destructive" to sonnerToast.error
        sonnerToast.error(title, { description, action, ...props });
        break;
      case "action":
         // For action, title might be optional if description provides enough context
        sonnerToast(title || description, { action, ...props });
        break;
      default: // default case
        sonnerToast(title || description, { action, ...props });
        break;
    }
  };

  return { toast }; // Return the toast function
};

export { useToast }; // Export the hook