import React from 'react';
import Sectiontitles from '@/app/ui/atomic/sectiontitles';

const About = () => {
    return (
        <main
            id="main"
            className=" mx-auto flex w-11/12 flex-col  md:w-10/12 md:gap-8   lg:w-7/12 ">
            <section className="  prose my-3 flex w-full flex-col gap-4 dark:prose-invert md:flex-row ">
                <article className="group/section  my-3 w-full  text-justify">
                    <Sectiontitles title="About Me" />
                    <h1>I'm Miguel Chavez</h1>
                    <p>
                        I'm a passionate and creative individual who thrives on learning new things
                        and tackling new challenges. My journey started in filmmaking and motion
                        design, where I spent years traveling with artists, capturing incredible
                        moments, and producing stunning music videos. However, when the pandemic
                        reshaped the world, it also reshaped my path. I took that moment as an
                        opportunity to pivot, diving deeper into my hobbies and exploring new
                        possibilities.
                    </p>

                    <p>
                        As a motion designer, I frequently worked with JavaScript expressions in
                        After Effects. Seeking to expand my design skills, I completed a UI/UX
                        course, which sparked my curiosity about coding. To push myself further, I
                        enrolled in an intensive programming course—and that’s when I fell in love
                        with development. My passion for the web and my love for continuous learning
                        led me to transition into a career as a full-stack developer.
                    </p>

                    <p>
                        In August 2024, I started a new chapter as a software engineer, and it has
                        been a rollercoaster of emotions ever since. Managing the stress of
                        developing proprietary software has been both challenging and rewarding,
                        especially when working with WinDev— a tool that operates within a closed,
                        encrypted ecosystem. Fortunately, I’ve been lucky to work alongside an
                        incredible team. We all started together, and through collaboration and
                        persistence, we’ve managed to tame the beast that is WinDev. Today, we’ve
                        built a massive software system that efficiently handles government
                        resources, proving that even the most complex tools can be mastered with the
                        right mindset and teamwork.
                    </p>

                    <p>
                        When I’m not immersed in coding or working on personal projects, I love to
                        spend time with my amazing wife, reading books, watching movies, and
                        enjoying great music together.
                    </p>
                </article>
            </section>
        </main>
    );
};

export default About;
