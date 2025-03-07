
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Theme = 'light' | 'dark' | 'system';

export function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    // On mount, read the theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Check system preference
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      applyTheme(systemPreference);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Determine the actual theme (accounting for system preference)
    if (newTheme === 'system') {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemPreference);
    } else {
      root.classList.add(newTheme);
    }
  };

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <Select value={theme} onValueChange={(value) => changeTheme(value as Theme)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Sun size={16} />
            <span>Light</span>
          </div>
        </SelectItem>
        <SelectItem value="dark" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Moon size={16} />
            <span>Dark</span>
          </div>
        </SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}
