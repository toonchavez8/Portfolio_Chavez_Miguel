import React from 'react';

interface SectiontittlesProps {
    title: string;
}

const Sectiontitles = (props: SectiontittlesProps) => {
    return (
        <h2 className="font-mono text-lg  opacity-60 transition-colors duration-150 group-hover/section:text-viridian-600 dark:group-hover/section:text-viridian-500">
            <span className=" animate-pulse" aria-hidden="true">
                &#47;&#47;{' '}
            </span>
            {props.title}
        </h2>
    );
};

export default Sectiontitles;
