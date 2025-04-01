import { us } from './us';
import { br } from './br';
import { LanguageState } from '@/store';

export { us, br };

interface ILangs {
  flag: string;
  code: LanguageState['language'];
  label: string;
}

export const languages: ILangs[] = [
  {
    flag: 'BR',
    code: 'br',
    label: 'br',
  },
  {
    flag: 'US',
    code: 'us',
    label: 'us',
  },
];
