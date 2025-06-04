import { cva, type VariantProps } from 'class-variance-authority';

export { default as Sheet } from './Sheet.vue';

export const sheetVariants = cva(
  'bg-card text-card-foreground rounded-sm p-1 transition-all border',
  {
    variants: {
      size: {
        default: 'w-96 h-[32rem]'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

export type SheetVariants = VariantProps<typeof sheetVariants>;
