import { getAllStacks } from '@/lib/projects';
import React from 'react';
import Activestacklinks from './ClientComponents/activestacklinks';

const Projectstacks = async () => {
    const filteredStacks = getAllStacks();

    return (
        <div className=" top-10 flex flex-wrap items-center justify-center gap-2 px-2 sm:gap-4 md:fixed md:mt-20 md:flex-col md:items-start md:gap-6 md:px-4">
            <h2 className="w-full font-mono text-lg opacity-60 transition-colors duration-150 group-hover/section:text-viridian-600 dark:group-hover/section:text-viridian-500  ">
                <span className="animate-pulse">&#47;&#47; </span>
                {filteredStacks.length} Stacks
            </h2>
            <Activestacklinks stacks={filteredStacks} />
        </div>
    );
};

export default Projectstacks;
