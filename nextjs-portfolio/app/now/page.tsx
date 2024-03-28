import React from 'react';

const page = () => {
    return (
        <main id="main" className="prose mx-auto flex w-11/12 flex-col dark:prose-invert md:w-7/12">
            <section>
                <h1> Now</h1>
                <p>
                    Lets pertend were friends and we havent seen each other in 5 years, what would
                    we say? Thats what this page is <span className="font-bold">"about"</span>{' '}
                    instead of a regular about me page where i can tell you all about me, that would
                    be boring, and plus if you want to know more about me thats what my{' '}
                    <span className="font-bold">CV</span> is for.
                </p>
                <p>
                    Im a human being, and i have a lot of things to learn, and i am always looking
                    for new things to learn, and i am always looking for new people to learn from.
                </p>
            </section>
        </main>
    );
};

export default page;
