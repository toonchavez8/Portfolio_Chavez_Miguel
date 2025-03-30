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
        <section className="group/section flex w-full flex-col justify-center gap-4 py-2 md:gap-6 md:px-4">
            <Sectiontitles title={props.title} />
            <Accordion type="single" collapsible className="">
                <AccordionItem
                    value="item-1"
                    className=" m-0 border-neutral border-opacity-25 dark:border-shark-700 dark:border-opacity-75">
                    <span className="badge badge-outline mt-1 font-mono opacity-25 group-hover:opacity-100   ">
                        currently enrolled
                    </span>
                    <AccordionTrigger className="">
                        Master's Degree in Software Engineering and Computer Systems, UNIR{' '}
                        <span className="ml-auto mr-4 hidden font-mono font-light opacity-50 md:block md:text-sm">
                            Feb 2025 - EXP Apr 2027
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="prose  dark:prose-invert">
                        <ul>
                            <li>
                                Agile Methodologies & Software Quality – I will learn about Agile
                                frameworks, Lean principles, and software quality improvement
                                techniques to develop flexible, maintainable systems.
                            </li>
                            <li>
                                Software Project Management – I will gain expertise in planning,
                                executing, monitoring, and closing software projects while mastering
                                leadership, decision-making, and risk management.
                            </li>
                            <li>
                                Cybersecurity & Secure Software Development – I will study secure
                                coding practices, threat mitigation, and cybersecurity auditing to
                                ensure robust and resilient applications
                            </li>
                            <li>
                                Cloud Computing & DevOps – I will engage in system administration,
                                virtualization, and cloud infrastructure management while
                                integrating DevOps methodologies for continuous integration and
                                deployment.
                            </li>
                            <li>
                                Software Development Platforms & Architecture – I will explore
                                development environments such as Java, .NET, and mobile platforms
                                while working with distributed services and event-driven
                                architectures.
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem
                    value="item-2"
                    className=" m-0 border-neutral border-opacity-25 dark:border-shark-700 dark:border-opacity-75">
                    <AccordionTrigger className="">
                        Full Stack Development, CoderHouse{' '}
                        <span className="ml-auto mr-4 hidden font-mono font-light opacity-50 md:block md:text-sm">
                            Dec 2022 - Jan 2024
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert">
                        <ul>
                            <li>
                                Completed a comprehensive program that covered the fundamentals and
                                best practices of web development, JavaScript, React, and backend
                                programming with node.
                            </li>
                            <li>
                                During the Web Development stage I learned how to build a multi-page
                                portfolio with JS logic to handle form submission and mail
                                confirmation.
                            </li>
                            <li>
                                With react along with react router, i built an eccomerce website
                                that allows users to search for products and add them to their cart,
                                and send a confirmation email order with their reqeust,
                            </li>
                            <li>
                                During 6 month backend stage i build a backend centric eccom with
                                node.js, express, and mongodb and handlebars to handel the views.
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem
                    value="item-3"
                    className=" m-0 border-neutral border-opacity-25 dark:border-shark-700 dark:border-opacity-75">
                    <AccordionTrigger className="">
                        Web Development Full Stack JavaScript, Bedu{''}
                        <span className="ml-auto mr-4 hidden font-mono font-light opacity-50 md:block md:text-sm">
                            Feb 2022 - Dec 2022
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert">
                        <ul>
                            <li>
                                Granted a scholership along with over 2500 others with whome only 50
                                finalists were able to complete the course and i ranked 12th.
                            </li>
                            <li>learned html, css, js and react along with node</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem
                    value="item-4"
                    className=" m-0 border-neutral border-opacity-25 dark:border-shark-700 dark:border-opacity-75">
                    <AccordionTrigger className="">
                        UI/UX BootCamp, Bedu{' '}
                        <span className="ml-auto mr-4  hidden font-mono font-light opacity-50 md:block md:text-sm">
                            Jan 2020 - Aug 2020
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert">
                        <ul>
                            <li>
                                learned fundamentals of user reasarch and based on the results of
                                the reseach craft ui
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem
                    value="item-5"
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
