'use client';

import * as React from "react";
import { useTranslations } from 'next-intl'; // Import translation hook
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload } from "lucide-react";
import { useToast } from '@/hooks/use-toast'; // Import useToast

export default function ImportExportPage() {
  const t = useTranslations('ImportExportPage'); // Initialize translations
  const { toast } = useToast(); // Initialize toast

  const handleExport = (format: 'json' | 'csv' | 'excel') => {
    // Use toast for feedback
    toast({
      title: t('exportNotImplemented', { format: format.toUpperCase() }),
    });
    console.log(`Initiating export in ${format} format.`);
    // Actual logic remains the same placeholder
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Use toast for feedback
    toast({
       title: t('importNotImplemented', { fileName: file.name }),
    });
    console.log(`Selected file for import: ${file.name}, type: ${file.type}`);
    // Actual logic remains the same placeholder
    event.target.value = '';
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      <p className="text-muted-foreground">
        {t('description')}
      </p>

      <Card>
        <CardHeader>
          <CardTitle>{t('exportCardTitle')}</CardTitle>
          <CardDescription>{t('exportCardDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => handleExport('json')} variant="outline">
            <Download className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t('exportJsonButton')}
          </Button>
          <Button onClick={() => handleExport('csv')} variant="outline">
            <Download className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t('exportCsvButton')}
          </Button>
          <Button onClick={() => handleExport('excel')} variant="outline">
            <Download className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t('exportExcelButton')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('importCardTitle')}</CardTitle>
          <CardDescription>{t('importCardDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex items-center gap-4">
            <label htmlFor="import-file" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer">
                <Upload className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t('importChooseFileButton')}
            </label>
            <input
                id="import-file"
                type="file"
                accept=".json, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleImport}
                className="hidden"
            />
            <span className="text-sm text-muted-foreground">{t('importFileHint')}</span>
           </div>
           <p className="mt-4 text-xs text-muted-foreground">
             {t('importValidationHint')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
