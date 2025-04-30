'use client'; // Required for stateful settings components

import * as React from 'react';
import { useTranslations } from 'next-intl'; // Import translation hook
import { useTheme } from 'next-themes'; // Import useTheme hook
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Paintbrush, BellRing, MessageSquare, Save } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

// No need for explicit metadata export here

export default function SettingsPage() {
  const t = useTranslations('SettingsPage'); // Initialize translations
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  // State for settings (replace with persistent storage later)
  const [enableReminders, setEnableReminders] = React.useState(false);
  const [reminderDays, setReminderDays] = React.useState(7);
  const [smsTemplate, setSmsTemplate] = React.useState(
    "Happy Birthday, [Name]! Hope you have a great day! 🎉 - [Your Store Name]"
  );
  const [mounted, setMounted] = React.useState(false);

  // Ensure component is mounted before using theme to avoid hydration mismatch
  React.useEffect(() => setMounted(true), []);

  const handleSaveSmsTemplate = () => {
     // TODO: Implement saving logic (e.g., to localStorage or backend)
     console.log('Saving SMS Template:', smsTemplate);
     toast({
        title: "SMS Template Saved", // TODO: Add translation
        description: "Your default birthday SMS has been updated.",
     });
  };

  if (!mounted) {
    // Render nothing or a loading indicator until mounted
    return null;
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Paintbrush className="h-5 w-5"/> {t('appearanceCardTitle')}</CardTitle>
          <CardDescription>{t('appearanceCardDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
              <span>{t('darkModeLabel')}</span>
              <span className="font-normal leading-snug text-muted-foreground">
                {t('darkModeDescription')}
              </span>
            </Label>
            <Switch
              id="dark-mode"
              aria-label="Toggle dark mode"
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Birthday Reminder Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BellRing className="h-5 w-5"/> {t('remindersCardTitle')}</CardTitle>
          <CardDescription>{t('remindersCardDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
             <Label htmlFor="enable-reminders" className="flex flex-col space-y-1">
               <span>{t('enableRemindersLabel')}</span>
               <span className="font-normal leading-snug text-muted-foreground">
                 {t('enableRemindersDescription')}
               </span>
             </Label>
             <Switch
                id="enable-reminders"
                aria-label="Enable birthday reminders"
                checked={enableReminders}
                onCheckedChange={setEnableReminders}
             />
           </div>
           <div className="space-y-2">
            <Label htmlFor="reminder-days">{t('reminderDaysLabel')}</Label>
            <Input
                id="reminder-days"
                type="number"
                min="1"
                max="30"
                value={reminderDays}
                onChange={(e) => setReminderDays(parseInt(e.target.value, 10))}
                className="w-24"
                disabled={!enableReminders} // Disable if reminders are off
             />
            <p className="text-xs text-muted-foreground">
              {t('reminderDaysHint')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SMS Template Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5"/> {t('smsCardTitle')}</CardTitle>
          <CardDescription>{t('smsCardDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sms-template">{t('smsTemplateLabel')}</Label>
            <Textarea
              id="sms-template"
              placeholder={t('smsTemplatePlaceholder')}
              value={smsTemplate}
              onChange={(e) => setSmsTemplate(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              {t('smsTemplateHint')}
            </p>
          </div>
           <Button onClick={handleSaveSmsTemplate}>
                <Save className="ltr:mr-2 rtl:ml-2 h-4 w-4"/>
                {t('saveSmsButton')}
            </Button>
        </CardContent>
      </Card>

      {/* Permissions Placeholder */}
       <Card className="border-orange-300 dark:border-orange-700">
        <CardHeader>
          <CardTitle className="text-orange-600 dark:text-orange-400">{t('permissionsCardTitle')}</CardTitle>
           <CardDescription>{t('permissionsCardDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">
             {t('permissionsExplanation')}
           </p>
           <Button variant="outline" disabled className="mt-4">{t('managePermissionsButton')}</Button>
        </CardContent>
       </Card>

    </div>
  );
}
