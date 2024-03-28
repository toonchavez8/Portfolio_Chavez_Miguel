import Image from 'next/image';
import Lastupdatedbadge from '@/app/ui/ClientComponents/lastupdatedbadge';

interface HeroProps {
    title: string;
    sub: string;
}

const Hero = (props: HeroProps) => {
    return (
        <section className=" relative  mt-4 flex w-full flex-col items-start justify-start gap-2 rounded xs:items-start md:mt-8  md:gap-8 ">
            <div className="flex items-center justify-center gap-2 pe-4 md:gap-8 md:pe-8">
                <Image
                    alt="profile image of miguel"
                    src="/miguel.jpg"
                    sizes="100vw"
                    width={64}
                    height={64}
                    className="hidden rounded-full xs:block"
                />
                <div className="flex flex-col items-start justify-start gap-1">
                    <h1 className="  font-mono text-lg font-bold md:text-3xl"> {props.title} </h1>
                    <p className="bg-gradient-to-r from-neutral to-neutral/50 bg-clip-text text-base  font-thin text-transparent dark:from-base-300 dark:to-base-100/50 md:text-xl">
                        {props.sub}
                    </p>
                </div>
            </div>
            <Lastupdatedbadge />

            <article className="   prose mx-auto   flex-1  text-neutral dark:text-base-100">
                <p>
                    Welcome to my little corner of the web. I'm very passionate about building and
                    designing things with simplicity in mind. I like being a knowledge sponge, from
                    jumping off the deep end into a topic I'm thoroughly passionate about or just
                    wading in the shallow end to satisfy my curiosity on random tidbits of general
                    knowledge and refining my skillset.
                </p>
                <p>
                    On the off chance I'm not working i enjoy cooking, traveling , painting and
                    video games!
                </p>
            </article>
        </section>
    );
};

export default Hero;
