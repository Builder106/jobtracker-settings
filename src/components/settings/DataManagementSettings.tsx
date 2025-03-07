
import { useState } from 'react';
import { SettingsCard } from '../SettingsCard';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  Download, 
  Upload, 
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

export function DataManagementSettings() {
  const [exportFormat, setExportFormat] = useState('json');
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const dummyData = {
    applications: [
      {
        id: 1,
        company: "Tech Innovations Inc.",
        position: "Frontend Developer",
        dateApplied: "2023-09-15",
        status: "interviewing",
        notes: "Had first round interview on 9/28"
      },
      {
        id: 2,
        company: "Digital Solutions LLC",
        position: "Software Engineer",
        dateApplied: "2023-09-10",
        status: "applied",
        notes: "Applied via company website"
      }
    ],
    settings: {
      defaultStatus: "applied",
      notifications: true
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    
    setTimeout(() => {
      // Create blob of data
      const dataStr = JSON.stringify(dummyData, null, 2);
      const dataBlob = new Blob([dataStr], { 
        type: exportFormat === 'json' ? 'application/json' : 'text/csv' 
      });
      
      // Create download link
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `career-chronos-data.${exportFormat}`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsExporting(false);
      
      toast.success(`Data exported successfully as ${exportFormat.toUpperCase()}`);
    }, 1000);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsImporting(true);
    
    // Simulate file reading
    setTimeout(() => {
      setIsImporting(false);
      toast.success('Data imported successfully');
    }, 1500);
  };

  const triggerImportDialog = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = exportFormat === 'json' ? '.json' : '.csv';
    input.onchange = handleImport as any;
    input.click();
  };

  const handleReset = () => {
    // In a real app, this would clear all data
    localStorage.clear();
    toast.success('All data has been reset to defaults');
  };

  return (
    <SettingsCard 
      title="Data Management" 
      icon={<Database className="h-5 w-5 text-brand-blue" />}
    >
      <div className="space-y-6">
        <div className="grid gap-3">
          <Label htmlFor="exportFormat">Export Format</Label>
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger id="exportFormat">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button 
            onClick={handleExport} 
            variant="outline" 
            className="flex-1"
            disabled={isExporting}
          >
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? 'Exporting...' : 'Export Data'}
          </Button>
          
          <Button 
            onClick={triggerImportDialog} 
            variant="outline" 
            className="flex-1" 
            disabled={isImporting}
          >
            <Upload className="mr-2 h-4 w-4" />
            {isImporting ? 'Importing...' : 'Import Data'}
          </Button>
        </div>
        
        <div className="pt-2 border-t">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Reset All Data
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete all your saved job applications, settings and preferences. 
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>
                  Reset All Data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </SettingsCard>
  );
}
