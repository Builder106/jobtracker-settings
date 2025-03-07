
import { ThemeSelector } from './ThemeSelector';

export function SettingsHeader() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-brand-blue text-white rounded-lg flex items-center justify-center font-bold text-xl">
            CC
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              CareerChronos
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Settings</p>
          </div>
        </div>
        <ThemeSelector />
      </div>
    </header>
  );
}
