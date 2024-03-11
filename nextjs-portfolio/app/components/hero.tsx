'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiGitCommit } from 'react-icons/fi';
import Link from 'next/link';

interface HeroProps {
  title: string;
  sub: string;
}

const LoadingSkeleton = () => (
  <div className="skeleton my-[.125rem] h-3 w-16 dark:opacity-40"></div>
);

const Hero = (props: HeroProps) => {
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetchLastCommit = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/toonchavez8/Portfolio_Chavez_Miguel/commits/main'
        );
        const data = await response.json();
        const lastCommitDate = new Date(data.commit.author.date);
        console.log(lastCommitDate);
        const now = new Date();
        const diffMs = now.getTime() - lastCommitDate.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays > 7) {
          // If more than a week ago, display in terms of weeks
          const diffWeeks = Math.floor(diffDays / 5);
          setLastUpdated(`${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`);
        } else if (diffDays > 0) {
          // If less than a week ago but more than a day, display the number of days ago
          setLastUpdated(`${diffDays} day${diffDays > 1 ? 's' : ''} ago`);
        } else {
          // If updated today, show 'Updated now'
          setLastUpdated('Updated now');
        }
      } catch (error) {
        console.error('Error fetching last commit:', error);
      } finally {
        // Set fetching to false once fetch is completed
        setFetching(false);
      }
    };

    fetchLastCommit();
  }, []);

  return (
    <section className="xs:items-start relative  mt-4 flex w-full flex-col items-end justify-start gap-2 rounded  md:gap-8 ">
      <div className="flex items-center justify-center gap-2 pe-4 md:gap-8 md:pe-8">
        <Image
          alt="profile image of miguel"
          src="/miguel.jpg"
          sizes="100vw"
          width={64}
          height={64}
          className="xs:block hidden rounded-full"
        />
        <div className="flex flex-col items-start justify-start gap-1">
          <h1 className="  text-lg font-bold md:text-3xl"> {props.title} </h1>
          <p className="bg-gradient-to-r from-neutral to-neutral/50 bg-clip-text text-base  font-thin text-transparent dark:from-base-300 dark:to-base-100/50 md:text-xl">
            {props.sub}
          </p>
        </div>
      </div>
      <Link
        href={'https://github.com/toonchavez8/Portfolio_Chavez_Miguel'}
        className="ease  xs:absolute right-0 mr-3 mt-3 flex items-center justify-center gap-1 rounded-full border border-neutral px-4 font-mono text-xs opacity-50 transition-all hover:scale-105 hover:bg-neutral hover:text-base-100 hover:opacity-100 dark:border-base-300 sm:absolute">
        <FiGitCommit />
        <span className="hidden sm:block">last updated</span>
        {fetching ? <LoadingSkeleton /> : <time dateTime={lastUpdated}>{lastUpdated}</time>}
      </Link>

      <article className=" md:prose-xl prose mx-auto max-w-[53rem]  text-neutral dark:text-base-100">
        <p>
          Welcome to my little corner of the web. I'm very passionate about building and designing
          things with simplicity in mind. I like being a knowledge sponge, from jumping off the deep
          end into a topic I'm thoroughly passionate about or just wading in the shallow end to
          satisfy my curiosity on random tidbits of general knowledge and refining my skillset.
        </p>
        <p>
          On the off chance I'm not working i enjoy cooking, traveling , painting and video games!
        </p>
      </article>
    </section>
  );
};

export default Hero;
