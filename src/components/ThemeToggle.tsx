
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" /> 
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
