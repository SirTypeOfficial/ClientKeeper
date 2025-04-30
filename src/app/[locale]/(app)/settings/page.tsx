'use client'; // Required for stateful settings components

import { useTranslations } from 'next-intl'; // Import translation hook
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Paintbrush, BellRing, MessageSquare } from "lucide-react";

// No need for explicit metadata export here

export default function SettingsPage() {
  const t = useTranslations('SettingsPage'); // Initialize translations

  // TODO: Implement state management and saving for settings

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
            {/* TODO: Add state and logic to toggle theme */}
            <Switch id="dark-mode" aria-label="Toggle dark mode" />
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
             {/* TODO: Add state and logic */}
             <Switch id="enable-reminders" aria-label="Enable birthday reminders" />
           </div>
           <div className="space-y-2">
            <Label htmlFor="reminder-days">{t('reminderDaysLabel')}</Label>
            {/* TODO: Add state and logic, potentially disable if reminders are off */}
            <Input id="reminder-days" type="number" min="1" max="30" defaultValue="7" className="w-24" />
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
            {/* TODO: Add state and logic */}
            <Textarea
              id="sms-template"
              placeholder={t('smsTemplatePlaceholder')}
              defaultValue="Happy Birthday, [Name]! Hope you have a great day! 🎉 - [Your Store Name]" // Keep default as example
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              {t('smsTemplateHint')}
            </p>
          </div>
           <Button>{t('saveSmsButton')}</Button> {/* TODO: Add save logic */}
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
