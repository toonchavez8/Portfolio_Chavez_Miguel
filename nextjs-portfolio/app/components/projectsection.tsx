import React from 'react';

interface ProjectProps {
    title: string;
}

const Projectsection = (props: ProjectProps) => {
    return (
        <>
            <div> Projectsection - works </div>
            <h1> {props.title} </h1>
        </>
    );
};

export default Projectsection;
