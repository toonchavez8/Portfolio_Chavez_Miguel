"use client";
import React from "react";

export function BackGroundSquares() {
	return (
		<div className="absolute inset-0 -z-10 flex w-full items-center justify-center [background-image:radial-gradient(circle,theme(colors.viridian.500)_1.5px,transparent_1.5px)] bg-[size:20px_20px] opacity-20 dark:opacity-10 group-hover:opacity-15  transition-opacity duration-1000">
			{/* Radial gradient for the container to give a faded look */}
		</div>
	);
}
