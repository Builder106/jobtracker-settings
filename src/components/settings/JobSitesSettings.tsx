
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { SettingsCard } from '../SettingsCard';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function JobSitesSettings() {
  const [sites, setSites] = useState({
    linkedin: true,
    indeed: true,
    glassdoor: true,
    monster: true,
    ziprecruiter: true
  });

  const handleSiteChange = (site: keyof typeof sites) => {
    setSites(prev => ({
      ...prev,
      [site]: !prev[site]
    }));
  };

  const handleSave = () => {
    // Save to local storage or extension storage in real app
    localStorage.setItem('jobSites', JSON.stringify(sites));
    toast.success('Job site settings saved successfully');
  };

  return (
    <SettingsCard 
      title="Supported Job Sites" 
      icon={<Globe className="h-5 w-5 text-brand-blue" />}
    >
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Enable or disable job detection for specific sites
        </p>

        <div className="space-y-4">
          {Object.entries(sites).map(([site, enabled]) => (
            <div key={site} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={site} 
                  checked={enabled} 
                  onCheckedChange={() => handleSiteChange(site as keyof typeof sites)} 
                />
                <Label htmlFor={site} className="capitalize">{site}</Label>
              </div>
              {enabled && (
                <span className="text-xs badge-active">Active</span>
              )}
            </div>
          ))}
        </div>

        <Button onClick={handleSave} className="w-full">Save Site Settings</Button>
      </div>
    </SettingsCard>
  );
}
