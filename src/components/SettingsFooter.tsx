
import { Button } from '@/components/ui/button';
import { RefreshCw, Save } from 'lucide-react';
import { toast } from 'sonner';

export function SettingsFooter() {
  const resetToDefaults = () => {
    // This would actually reset all settings in a real app
    toast.info('All settings reset to defaults');
  };

  const saveAllSettings = () => {
    // This would save all settings in a real app
    toast.success('All settings saved successfully');
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-8 pb-8 animate-fade-in">
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
        <Button 
          variant="outline" 
          onClick={resetToDefaults}
          className="flex items-center"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset to Defaults
        </Button>
        
        <Button 
          onClick={saveAllSettings}
          className="flex items-center"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
      
      <div className="flex justify-between items-center text-xs text-slate-500 mt-8">
        <div>CareerChronos Browser Extension</div>
        <div className="flex items-center gap-8">
          <span>Version 1.0.0</span>
          <a 
            href="https://github.com/careerchronos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue hover:underline"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
