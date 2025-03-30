'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface ActivestacklinksProps {
    stacks: string[];
}

const Activestacklinks: React.FC<ActivestacklinksProps> = ({ stacks }) => {
    const pathname = usePathname();

    const isActiveLink = (stack: string) => {
        return pathname.includes('/projects/stack/' + encodeURIComponent(stack));
    };

    return (
        <>
            {stacks.map((stack) => (
                <Link
                    key={stack}
                    href={'/projects/stack/' + stack}
                    className={clsx(
                        'badge badge-primary badge-outline badge-sm  font-mono  text-sm font-semibold hover:scale-105 hover:shadow-md',
                        isActiveLink(stack) ? ' badge-success dark:saturate-150' : 'badge-outline'
                    )}
                    aria-current={isActiveLink(stack) ? 'page' : 'false'}
                    aria-label={`to filter projects by ${stack}`}>
                    {stack}
                </Link>
            ))}
        </>
    );
};

export default Activestacklinks;
