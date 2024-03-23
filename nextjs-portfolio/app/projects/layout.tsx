import React from 'react';
import Projectstacks from '@/app/ui/projectstack';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className=" mx-auto flex h-full w-11/12 flex-col md:w-7/12 md:flex-row md:overflow-hidden">
            <section className=" w-full flex-none md:flex md:w-1/4 md:flex-col">
                <Projectstacks title="Projects" />
            </section>
            <div className=" flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </main>
    );
};

export default layout;
