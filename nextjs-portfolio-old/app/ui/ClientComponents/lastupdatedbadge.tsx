'use client';
import { useEffect, useState } from 'react';
import { FiGitCommit } from 'react-icons/fi';

import Link from 'next/link';

const LoadingSkeleton = () => <div className="skeleton my-[2px] h-3 w-16 dark:opacity-40"></div>;
const Lastupdatedbadge = () => {
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [fetching, setFetching] = useState<boolean>(true);

    useEffect(() => {
        const fetchLastCommit = async () => {
            try {
                const response = await fetch(
                    'https://api.github.com/repos/toonchavez8/Portfolio_Chavez_Miguel/commits/main'
                );
                const data = await response.json();
                const lastCommitDate = new Date(data.commit.author.date);
                const now = new Date();
                const diffMs = now.getTime() - lastCommitDate.getTime();
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                if (diffDays > 7) {
                    // If more than a week ago, display in terms of weeks
                    const diffWeeks = Math.floor(diffDays / 7);
                    setLastUpdated(`${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`);
                } else if (diffDays > 0) {
                    // If less than a week ago but more than a day, display the number of days ago
                    setLastUpdated(`${diffDays} day${diffDays > 1 ? 's' : ''} ago`);
                } else {
                    // If updated today, show 'Updated now'
                    setLastUpdated('today');
                }
            } catch (error) {
                console.error('Error fetching last commit:', error);
            } finally {
                // Set fetching to false once fetch is completed
                setFetching(false);
            }
        };

        fetchLastCommit();
    }, []);
    return (
        <Link
            href={'https://github.com/toonchavez8/Portfolio_Chavez_Miguel'}
            className="ease  right-0 mr-3 mt-1 flex items-center justify-center gap-1 rounded-full border border-neutral px-4 font-mono text-xs opacity-50 transition-all hover:scale-105 hover:bg-neutral hover:text-base-100 hover:opacity-100 dark:border-base-300  sm:absolute md:mt-3">
            <FiGitCommit />
            <span className="hidden sm:block">last updated</span>
            {fetching ? <LoadingSkeleton /> : <time dateTime={lastUpdated}>{lastUpdated}</time>}
        </Link>
    );
};

export default Lastupdatedbadge;
