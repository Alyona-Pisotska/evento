import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export { cn, capitalize, sleep };
