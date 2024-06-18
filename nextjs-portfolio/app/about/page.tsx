import React from 'react';
import Sectiontitles from '@/app/ui/atomic/sectiontitles';

const About = () => {
    return (
        <main
            id="main"
            className=" mx-auto flex w-11/12 flex-col  md:w-10/12 md:gap-8   lg:w-7/12 ">
            <section className="  prose my-3 flex w-full flex-col gap-4 dark:prose-invert md:flex-row ">
                <article className="group/section  my-3 w-full ">
                    <Sectiontitles title="About me" />
                    <h1>I'm Miguel Chavez</h1>
                    <p>
                        I'm a very passionate ceative. I enjoy learning new things and I'm always
                        looking for new challenges. I used to work a full time filmaker and motion
                        designer, traveling around with artists and making some amazing music
                        videos, but with the pandemic, I had to change my life and I decided to
                        focus on my hobbies.
                    </p>
                    <p>
                        As a motion designer i would work alot with JS expressions and after
                        finishing a UI UX course, to expand on my design skills i took an intensive
                        coding course and i fell in love for the second time. I'm a big fan of the
                        web and I love to learn new things, so I decided to start a new career as a
                        fullstack developer.
                    </p>

                    <p>
                        When im not working on my projects, I like to read, watch movies, and listen
                        to music, with my amazing wife!
                    </p>
                </article>
            </section>
        </main>
    );
};

export default About;
