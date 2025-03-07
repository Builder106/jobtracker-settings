
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SettingsCardProps {
  title: ReactNode;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function SettingsCard({ title, children, icon, className }: SettingsCardProps) {
  return (
    <div className={cn('settings-card animate-fade-in', className)}>
      <h2 className="settings-section-title">
        {icon}
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
