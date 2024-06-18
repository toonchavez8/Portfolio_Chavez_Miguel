import React from 'react';

const page = () => {
    return (
        <main className=" mx-auto flex w-11/12 flex-col md:w-10/12 lg:w-7/12" id="main">
            <div className="hero my-auto  ">
                <div className=" hero-content flex text-center">
                    <div className="flex max-w-md animate-pulse flex-col items-center justify-center opacity-70">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">
                            Im writing in my journel and ill be back with content soon.
                        </p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default page;
