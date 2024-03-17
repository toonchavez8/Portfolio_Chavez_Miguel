import { FaGithub } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { FaLinkedin } from 'react-icons/fa6';

const footerLinks = [
    {
        name: 'instagram',
        url: 'https://www.instagram.com/toonchavez/',
        icon: <RiInstagramFill />,
        text: 'toonchavez'
    },
    {
        name: 'github',
        url: 'https://github.com/toonchavez8',
        icon: <FaGithub />,
        text: 'toonchavez8'
    },
    {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/toonchavez8/',
        icon: <FaLinkedin />,
        text: 'toonchavez'
    }
];

export const Footer = () => {
    return (
        <footer className="mx-auto flex w-11/12   flex-col items-center justify-center border-t border-primary/50 py-4 text-2xl font-bold dark:border-primary/15 md:w-10/12 lg:w-7/12 ">
            <div className="flex flex-wrap justify-center gap-2">
                {footerLinks.map((link) => (
                    <a href={`${link.url}`} key={link.name}>
                        <code className="badge badge-neutral gap-2 bg-transparent px-4 py-3 text-neutral  hover:bg-neutral hover:bg-opacity-25 dark:border-base-300 dark:border-opacity-10 dark:text-base-200 dark:hover:bg-base-300 dark:hover:bg-opacity-10">
                            {link.icon}
                            {link.text}
                        </code>
                    </a>
                ))}
            </div>
            <p className="tracking-widest">...</p>
        </footer>
    );
};
