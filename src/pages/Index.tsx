
import { SettingsHeader } from '@/components/SettingsHeader';
import { DefaultValuesSettings } from '@/components/settings/DefaultValuesSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { JobSitesSettings } from '@/components/settings/JobSitesSettings';
import { ApiConfigSettings } from '@/components/settings/ApiConfigSettings';
import { DataManagementSettings } from '@/components/settings/DataManagementSettings';
import { SettingsFooter } from '@/components/SettingsFooter';
import { useEffect } from 'react';

const Index = () => {
  // Apply staggered animation for cards
  useEffect(() => {
    const cards = document.querySelectorAll('.settings-card');
    cards.forEach((card, index) => {
      const delay = 0.1 * index;
      (card as HTMLElement).style.animationDelay = `${delay}s`;
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SettingsHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ApiConfigSettings />
          <NotificationSettings />
          <JobSitesSettings />
        </div>
        
        <div className="space-y-6">
          <DefaultValuesSettings />
          <DataManagementSettings />
        </div>
      </div>
      
      <SettingsFooter />
    </div>
  );
};

export default Index;
