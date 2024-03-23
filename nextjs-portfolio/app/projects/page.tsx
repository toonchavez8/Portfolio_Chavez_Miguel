import React from 'react';

const page = (props: any): JSX.Element => {
    return (
        <main id="main" className="focus:outline-neutral-content">
            <div> Page.tsx - works</div>
            <h1> {props.title} </h1>
        </main>
    );
};

export default page;
