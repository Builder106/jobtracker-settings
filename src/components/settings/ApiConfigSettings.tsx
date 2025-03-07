
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SettingsCard } from '../SettingsCard';
import { Cable } from 'lucide-react';
import { toast } from 'sonner';

export function ApiConfigSettings() {
  const [apiUrl, setApiUrl] = useState('http://localhost:8080');
  const [isTesting, setIsTesting] = useState(false);

  const testConnection = () => {
    setIsTesting(true);
    
    // Simulate API connection test
    setTimeout(() => {
      setIsTesting(false);
      toast.success('Connection successful!');
    }, 1500);
  };

  const saveApiConfig = () => {
    // Save API config to localStorage or extension storage
    localStorage.setItem('apiUrl', apiUrl);
    toast.success('API configuration saved');
  };

  return (
    <SettingsCard 
      title="API Configuration" 
      icon={<Cable className="h-5 w-5 text-brand-blue" />}
    >
      <div className="space-y-6">
        <div className="grid gap-3">
          <Label htmlFor="apiUrl">API URL</Label>
          <Input 
            id="apiUrl" 
            value={apiUrl} 
            onChange={(e) => setApiUrl(e.target.value)} 
            placeholder="https://api.example.com" 
          />
          <p className="text-sm text-muted-foreground">
            The URL of your CareerChronos API server
          </p>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={testConnection} 
            variant="outline" 
            disabled={isTesting}
            className="flex-1"
          >
            {isTesting ? 'Testing...' : 'Test Connection'}
          </Button>
          <Button onClick={saveApiConfig} className="flex-1">Save</Button>
        </div>
      </div>
    </SettingsCard>
  );
}
