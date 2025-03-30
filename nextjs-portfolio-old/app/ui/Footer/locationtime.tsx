'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface LocationTimeProps {
    // Define props here if needed
}

const LocationTime: React.FC<LocationTimeProps> = () => {
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        // Function to update current time
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'America/Mexico_City',
                hour12: true,
                hour: 'numeric',
                minute: 'numeric'
            };
            setCurrentTime(now.toLocaleTimeString('en-US', options));
        };

        // Update time initially
        updateTime();

        // Update time every minute
        const intervalId = setInterval(updateTime, 60000); // 60,000 milliseconds = 1 minute

        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
    }, [currentTime]);

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            <Link
                href="https://maps.app.goo.gl/TEPjUeHgX8zCpFnB9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base hover:underline">
                Guadalajara, Jal
            </Link>

            <p className=" font-mono text-sm text-shark-500 dark:text-shark-500"> {currentTime}</p>
        </div>
    );
};

export default LocationTime;
