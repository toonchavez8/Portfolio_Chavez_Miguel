import React from 'react';
import Projectstacks from '@/app/ui/projectstack';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="   mx-auto flex h-full w-11/12 flex-col md:w-10/12 md:flex-row md:overflow-hidden lg:w-7/12">
            <aside
                className=" group/section mt-4 w-full flex-none md:flex md:w-1/6 md:max-w-full md:flex-col "
                aria-label="project stacks">
                <Projectstacks />
            </aside>
            <div className="  flex-grow sm:p-6 md:p-12">{children}</div>
        </section>
    );
};

export default layout;
