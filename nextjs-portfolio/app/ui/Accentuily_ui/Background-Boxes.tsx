'use client';
import React from 'react';

export function DotBackgroundDemo() {
    return (
        <div className="absolute inset-0 -z-10 flex  w-full items-center justify-center bg-grid-black/[0.05]   dark:bg-grid-white/[0.01] ">
            {/* Radial gradient for the container to give a faded look */}
            <div className="bg-base pointer-events-none absolute inset-0 flex items-center justify-center   [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-black"></div>
        </div>
    );
}
