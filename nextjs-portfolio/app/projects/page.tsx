import React from 'react';

const page = (props: any): JSX.Element => {
    return (
        <>
            <div> Page.tsx - works </div>
            <h1> {props.title} </h1>
        </>
    );
};

export default page;
