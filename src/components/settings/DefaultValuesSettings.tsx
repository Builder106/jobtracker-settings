
import { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';
import { SettingsCard } from '../SettingsCard';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function DefaultValuesSettings() {
  const [defaultStatus, setDefaultStatus] = useState('applied');
  const [defaultJobTitle, setDefaultJobTitle] = useState('Software Developer');
  const [defaultDate, setDefaultDate] = useState<Date | undefined>(new Date());

  const handleSave = () => {
    // In a real application, this would save to browser extension storage
    localStorage.setItem('defaultApplicationStatus', defaultStatus);
    localStorage.setItem('defaultJobTitle', defaultJobTitle);
    localStorage.setItem('defaultDateApplied', defaultDate ? defaultDate.toISOString() : '');
    
    // Show notification (this would use the toast in a real app)
    console.log('Default values saved');
  };

  return (
    <SettingsCard 
      title="Default Values" 
      icon={<Briefcase className="h-5 w-5 text-brand-blue" />}
    >
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="defaultStatus">Default Application Status</Label>
          <Select value={defaultStatus} onValueChange={setDefaultStatus}>
            <SelectTrigger id="defaultStatus">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="offered">Offered</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="defaultJobTitle">Default Job Title</Label>
          <Input 
            id="defaultJobTitle" 
            value={defaultJobTitle} 
            onChange={(e) => setDefaultJobTitle(e.target.value)} 
            placeholder="e.g. Software Developer" 
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="defaultDate">Default Date Applied</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="defaultDate"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !defaultDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {defaultDate ? format(defaultDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={defaultDate}
                onSelect={setDefaultDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button onClick={handleSave} className="mt-2">Save Default Values</Button>
      </div>
    </SettingsCard>
  );
}
