import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type ContainerProps = {
    size?: 'default' | 'narrow';
    className?: string;
    children: ReactNode;
};

const WIDTHS = {
    default: 'max-w-7xl',
    narrow: 'max-w-3xl',
} as const;

export default function Container({
    size = 'default',
    className,
    children,
}: ContainerProps) {
    return (
        <div
            className={cn(
                'mx-auto w-full px-4 sm:px-8',
                WIDTHS[size],
                className,
            )}
        >
            {children}
        </div>
    );
}
