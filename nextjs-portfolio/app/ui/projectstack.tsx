import { getAllStacks } from '@/lib/projects';
import React from 'react';
import Activestacklinks from './ClientComponents/activestacklinks';

const Projectstacks = async () => {
    const filteredStacks = getAllStacks();

    return (
        <aside className="top-10 flex flex-wrap items-start justify-center gap-4 px-2 md:fixed md:mt-20 md:flex-col md:gap-6 md:px-4">
            <h2 className="font-mono text-lg  opacity-60 ">
                <span className="animate-pulse">&#47;&#47; </span>
                {filteredStacks.length} Stacks
            </h2>
            <Activestacklinks stacks={filteredStacks} />
        </aside>
    );
};

export default Projectstacks;
