
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SettingsCard } from '../SettingsCard';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function NotificationSettings() {
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [playSounds, setPlaySounds] = useState(true);
  const [notifyNewJobs, setNotifyNewJobs] = useState(true);
  const [notifyUpdates, setNotifyUpdates] = useState(true);
  const [frequency, setFrequency] = useState('daily');

  const handleSave = () => {
    // In a real app, this would save to browser extension storage
    localStorage.setItem('enableNotifications', String(enableNotifications));
    localStorage.setItem('playSounds', String(playSounds));
    localStorage.setItem('notifyNewJobs', String(notifyNewJobs));
    localStorage.setItem('notifyUpdates', String(notifyUpdates));
    localStorage.setItem('notificationFrequency', frequency);
    
    toast.success('Notification settings saved successfully');
  };

  return (
    <SettingsCard 
      title="Notifications" 
      icon={<Bell className="h-5 w-5 text-brand-blue" />}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableNotifications">Enable Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive timely alerts for job application updates
            </p>
          </div>
          <div className="flex items-center">
            <Switch 
              id="enableNotifications" 
              checked={enableNotifications} 
              onCheckedChange={setEnableNotifications} 
            />
            <span className="ml-2 text-xs badge-active">Active</span>
          </div>
        </div>

        {enableNotifications && (
          <>
            <div className="space-y-6 pl-1 animate-fade-in">
              <div className="flex items-center justify-between">
                <Label htmlFor="playSounds">Play Sound</Label>
                <Switch 
                  id="playSounds" 
                  checked={playSounds} 
                  onCheckedChange={setPlaySounds} 
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="notifyNewJobs">New Job Matches</Label>
                <Switch 
                  id="notifyNewJobs" 
                  checked={notifyNewJobs} 
                  onCheckedChange={setNotifyNewJobs} 
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="notifyUpdates">Application Updates</Label>
                <Switch 
                  id="notifyUpdates" 
                  checked={notifyUpdates} 
                  onCheckedChange={setNotifyUpdates} 
                />
              </div>

              <div className="space-y-2">
                <Label>Notification Frequency</Label>
                <RadioGroup value={frequency} onValueChange={setFrequency}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="immediately" id="immediately" />
                    <Label htmlFor="immediately">Immediately</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">Daily Summary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly">Weekly Digest</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </>
        )}

        <Button onClick={handleSave} className="w-full">Save Notification Settings</Button>
      </div>
    </SettingsCard>
  );
}
