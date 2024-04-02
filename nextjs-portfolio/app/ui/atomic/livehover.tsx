import Link from 'next/link';
import { HoverCardContent, HoverCardTrigger, HoverCard } from '@/app/ui/atomic/hovercard';
import { TbLivePhoto } from 'react-icons/tb';
import { ProjectItem } from '@/types';

interface LiveHoverButtonProps {
    live: ProjectItem['live'];
    image: ProjectItem['image'];
    name: ProjectItem['name'];
    handleClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const LiveHoverButton: React.FC<LiveHoverButtonProps> = ({ live, image, name, handleClick }) => {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <Link
                    href={live}
                    className="  badge badge-secondary  btn-sm flex gap-2 rounded-full bg-opacity-30 py-0 font-mono filter backdrop-blur-xl transition duration-150 hover:scale-105 hover:animate-pulse  hover:bg-opacity-80 hover:text-base-100"
                    target="_blank"
                    onClick={handleClick}>
                    <TbLivePhoto className="animate-pulse text-viridian-500 saturate-150 motion-safe:animate-spin" />{' '}
                    <span className="hidden xs:block">live</span>
                </Link>
            </HoverCardTrigger>
            <HoverCardContent
                className="  border-shark-200 bg-base-200 dark:border-shark-600 dark:bg-neutral "
                side="top">
                <img
                    src={image}
                    alt={name}
                    className="aspect-video w-full rounded-lg object-cover"
                />
                <p className="text-primary-100 text-sm font-semibold">{name}</p>
            </HoverCardContent>
        </HoverCard>
    );
};

export default LiveHoverButton;
