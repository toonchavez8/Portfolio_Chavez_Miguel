import React from 'react';
import Sectiontitles from '../atomic/sectiontitles';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/app/ui/atomic/accordion';

interface EducationProps {
    title: string;
}

const Educationsection = (props: EducationProps) => {
    return (
        <section className="flex w-full flex-col justify-center gap-4 px-2 md:gap-6 md:px-4">
            <Sectiontitles title={props.title} />
            <Accordion type="single" collapsible className="">
                <AccordionItem
                    value="item-1"
                    className=" m-0 border-neutral border-opacity-25 dark:border-shark-700 dark:border-opacity-75">
                    <AccordionTrigger className="">
                        Full Stack Development, CoderHouse{' '}
                        <span className="ml-auto mr-4 hidden font-mono font-light opacity-50 md:block md:text-sm">
                            Dec 2022 - Jan 2024
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert">
                        <p>
                            Completed a comprehensive program that covered the fundamentals and best
                            practices of web development, JavaScript, React, and backend programming
                            with node.
                        </p>
                        <p>
                            Created and deployed my own SPA app using React with Vite, using
                            Firebase as de DB
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem
                    value="item-2"
                    className=" m-0 border-neutral border-opacity-25 dark:border-shark-700 dark:border-opacity-75">
                    <AccordionTrigger className="">
                        Web Development Full Stack JavaScript, Bedu{''}
                        <span className="ml-auto mr-4 hidden font-mono font-light opacity-50 md:block md:text-sm">
                            Feb 2022 - Dec 2022
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert">
                        <p>
                            Completed a comprehensive program that covered the fundamentals and best
                            practices of web development, JavaScript, React, and backend programming
                            with node.
                        </p>
                        <p>
                            Created and deployed my own SPA app using React with Vite, using
                            Firebase as de DB
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem
                    value="item-3"
                    className=" m-0 border-neutral border-opacity-25 dark:border-shark-700 dark:border-opacity-75">
                    <AccordionTrigger className="">
                        UI/UX BootCamp, Bedu{' '}
                        <span className="ml-auto mr-4  hidden font-mono font-light opacity-50 md:block md:text-sm">
                            Jan 2020 - Aug 2020
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert">
                        <p>
                            Completed a comprehensive program that covered the fundamentals and best
                            practices of web development, JavaScript, React, and backend programming
                            with node.
                        </p>
                        <p>
                            Created and deployed my own SPA app using React with Vite, using
                            Firebase as de DB
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem
                    value="item-4"
                    className=" m-0 border-neutral border-opacity-25 dark:border-shark-700 dark:border-opacity-75">
                    <AccordionTrigger className="">
                        Degree in film and animation, Uniat{' '}
                        <span className="ml-auto mr-4  hidden font-mono font-light opacity-50 md:block md:text-sm">
                            Sep 2012 - Jun 2016
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert">
                        <p>
                            Completed a comprehensive program that covered the fundamentals and best
                            practices of web development, JavaScript, React, and backend programming
                            with node.
                        </p>
                        <p>
                            Created and deployed my own SPA app using React with Vite, using
                            Firebase as de DB
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
};

export default Educationsection;
