import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Paintbrush, BellRing, MessageSquare } from "lucide-react";

export default function SettingsPage() {
  // TODO: Implement state management and saving for settings (e.g., using localStorage or Firestore)

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Paintbrush className="h-5 w-5"/> Appearance</CardTitle>
          <CardDescription>Customize the look and feel of the app.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
              <span>Dark Mode</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Enable dark theme for the application.
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
          <CardTitle className="flex items-center gap-2"><BellRing className="h-5 w-5"/> Birthday Reminders</CardTitle>
          <CardDescription>Configure notifications for upcoming birthdays.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
             <Label htmlFor="enable-reminders" className="flex flex-col space-y-1">
               <span>Enable Reminders</span>
               <span className="font-normal leading-snug text-muted-foreground">
                 Receive notifications for upcoming birthdays.
               </span>
             </Label>
             {/* TODO: Add state and logic */}
             <Switch id="enable-reminders" aria-label="Enable birthday reminders" />
           </div>
           <div className="space-y-2">
            <Label htmlFor="reminder-days">Remind me before (days)</Label>
            {/* TODO: Add state and logic, potentially disable if reminders are off */}
            <Input id="reminder-days" type="number" min="1" max="30" defaultValue="7" className="w-24" />
            <p className="text-xs text-muted-foreground">
              Set how many days in advance you want to be notified.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SMS Template Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5"/> SMS Template</CardTitle>
          <CardDescription>Edit the default message sent for birthday greetings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sms-template">Default Birthday SMS</Label>
            {/* TODO: Add state and logic */}
            <Textarea
              id="sms-template"
              placeholder="Enter your default birthday message..."
              defaultValue="Happy Birthday, [Name]! Hope you have a great day! 🎉 - [Your Store Name]"
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Use <strong>[Name]</strong> as a placeholder for the customer's first name.
            </p>
          </div>
           <Button>Save SMS Template</Button> {/* TODO: Add save logic */}
        </CardContent>
      </Card>

      {/* Permissions Placeholder */}
       <Card className="border-orange-300 dark:border-orange-700">
        <CardHeader>
          <CardTitle className="text-orange-600 dark:text-orange-400">Permissions (Placeholder)</CardTitle>
           <CardDescription>Manage app permissions for contacts and SMS.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">
            Permission management for Contacts and SMS needs to be handled natively (e.g., in Flutter/Kotlin/Swift). This section is a placeholder to indicate where such settings might appear.
           </p>
           {/* In a native app, you'd link to the OS settings or have buttons to request/check permissions */}
           <Button variant="outline" disabled className="mt-4">Manage Permissions (OS)</Button>
        </CardContent>
       </Card>

    </div>
  );
}

// Add metadata for the page
export const metadata = {
  title: 'Settings - Client Keeper',
  description: 'Configure application settings and preferences.',
};
