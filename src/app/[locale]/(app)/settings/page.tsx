
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

// localStorage keys
const SETTINGS_KEY = 'clientKeeperSettings';
const DEFAULT_SMS_TEMPLATE = "Happy Birthday, [Name]! Hope you have a great day! 🎉 - [Your Store Name]";

interface AppSettings {
  enableReminders: boolean;
  reminderDays: number;
  smsTemplate: string;
  theme?: string; // Theme is handled by next-themes, but good to be aware
}

export default function SettingsPage() {
  const t = useTranslations('SettingsPage'); // Initialize translations
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  // State for settings
  const [enableReminders, setEnableReminders] = React.useState(false);
  const [reminderDays, setReminderDays] = React.useState(7);
  const [smsTemplate, setSmsTemplate] = React.useState(DEFAULT_SMS_TEMPLATE);
  const [mounted, setMounted] = React.useState(false);

  // Load settings from localStorage on mount
  React.useEffect(() => {
    setMounted(true);
    try {
        const savedSettingsRaw = localStorage.getItem(SETTINGS_KEY);
        if (savedSettingsRaw) {
            const savedSettings: Partial<AppSettings> = JSON.parse(savedSettingsRaw);
            setEnableReminders(savedSettings.enableReminders ?? false);
            setReminderDays(savedSettings.reminderDays ?? 7);
            setSmsTemplate(savedSettings.smsTemplate ?? DEFAULT_SMS_TEMPLATE);
            // Theme is handled by next-themes, but you could load it here if needed elsewhere
        }
    } catch (error) {
        console.error("Failed to load settings from localStorage:", error);
        // Use default values if loading fails
    }
  }, []);

  // Save settings to localStorage whenever they change
  const saveSettings = React.useCallback((newSettings: Partial<AppSettings>) => {
     if (!mounted) return; // Don't save during server render or before mount
    try {
        const currentSettingsRaw = localStorage.getItem(SETTINGS_KEY);
        const currentSettings: Partial<AppSettings> = currentSettingsRaw ? JSON.parse(currentSettingsRaw) : {};
        const updatedSettings = { ...currentSettings, ...newSettings };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
    } catch (error) {
        console.error("Failed to save settings to localStorage:", error);
        toast({
            title: "Error Saving Settings", // TODO: Add translation
            description: "Could not save your preferences.",
            variant: "destructive",
        });
    }
  }, [mounted, toast]); // Add toast dependency

  // Handlers that update state and save
  const handleEnableRemindersChange = (checked: boolean) => {
    setEnableReminders(checked);
    saveSettings({ enableReminders: checked });
  };

  const handleReminderDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(e.target.value, 10);
    if (!isNaN(days) && days >= 1 && days <= 30) { // Add validation
      setReminderDays(days);
      saveSettings({ reminderDays: days });
    }
  };

  const handleSaveSmsTemplate = () => {
     saveSettings({ smsTemplate });
     toast({
        title: "SMS Template Saved", // TODO: Add translation
        description: "Your default birthday SMS has been updated.",
     });
  };

   // Handle theme change (saves automatically via next-themes)
   const handleThemeChange = (checked: boolean) => {
       const newTheme = checked ? 'dark' : 'light';
       setTheme(newTheme);
       // No need to call saveSettings here, next-themes handles localStorage
   };


  if (!mounted) {
    // Render nothing or a loading indicator until mounted to avoid hydration mismatch
    // Using null avoids layout shifts
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
            <Label htmlFor="dark-mode" className="flex flex-col space-y-1 cursor-pointer">
              <span>{t('darkModeLabel')}</span>
              <span className="font-normal leading-snug text-muted-foreground">
                {t('darkModeDescription')}
              </span>
            </Label>
            <Switch
              id="dark-mode"
              aria-label="Toggle dark mode"
              checked={theme === 'dark'}
              onCheckedChange={handleThemeChange} // Use updated handler
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
             <Label htmlFor="enable-reminders" className="flex flex-col space-y-1 cursor-pointer">
               <span>{t('enableRemindersLabel')}</span>
               <span className="font-normal leading-snug text-muted-foreground">
                 {t('enableRemindersDescription')}
               </span>
             </Label>
             <Switch
                id="enable-reminders"
                aria-label="Enable birthday reminders"
                checked={enableReminders}
                onCheckedChange={handleEnableRemindersChange} // Use updated handler
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
                onChange={handleReminderDaysChange} // Use updated handler
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
              onChange={(e) => setSmsTemplate(e.target.value)} // Update state directly
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

