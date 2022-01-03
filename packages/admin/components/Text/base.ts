import { DetailedHTMLProps, HTMLAttributes } from "react";

export type DefaultTextComponentProps =
  { style?: string; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'style' | 'ref'>;