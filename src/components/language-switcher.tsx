'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Languages } from 'lucide-react';
import { usePathname, useRouter } from '@/navigation'; // Import from custom navigation

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex items-center gap-2">
       <Languages className="h-5 w-5 text-muted-foreground" />
       <Label htmlFor="language-select" className="sr-only">{t('label')}</Label>
       <Select value={locale} onValueChange={onSelectChange}>
        <SelectTrigger className="w-[120px]" id="language-select">
          <SelectValue placeholder={t('label')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{t('en')}</SelectItem>
          <SelectItem value="fa">{t('fa')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
