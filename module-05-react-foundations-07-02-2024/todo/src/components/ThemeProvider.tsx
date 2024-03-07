import React, { ReactNode, createContext, useContext, useState } from 'react';

// Define the types for the ThemeContextContainerProps and ThemeContextProps
interface ThemeContextContainerProps {
    children: ReactNode;
}

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

// Create the ThemeContext and ThemeProvider components
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);


// Create the ThemeProvider component
export default function ThemeProvider({ children }: ThemeContextContainerProps) {
   const [theme, setTheme] = useState<string>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
    
  return (
   <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Create the useTheme custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};