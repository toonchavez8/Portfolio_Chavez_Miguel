import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn
} from '@tabler/icons-react';
import { BentoGrid, BentoGridItem } from '@/app/ui/Accentuily_ui/Bento-Grid';

export function NowSection() {
    return (
        <BentoGrid className=" md:auto-rows-[20rem]">
            {items.map((item) => (
                <BentoGridItem
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={item.className}
                    icon={item.icon}
                />
            ))}
        </BentoGrid>
    );
}
const Skeleton = () => (
    <div className="debug flex h-full min-h-[6rem] w-full flex-1 rounded-xl  border border-transparent bg-neutral-100  bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-black dark:bg-dot-white/[0.2]"></div>
);
const items = [
    {
        title: 'The Dawn of Innovation',
        description: 'Explore the birth of groundbreaking ideas and inventions.',
        header: <Skeleton />,
        className: 'md:col-span-2',
        icon: <IconClipboardCopy className="h-4 w-4 text-primary " />
    },
    {
        title: 'The Digital Revolution',
        description: 'Dive into the transformative power of technology.',
        header: <Skeleton />,
        className: 'md:col-span-1',
        icon: <IconFileBroken className="h-4 w-4 text-primary" />
    },
    {
        title: 'The Art of Design',
        description: 'Discover the beauty of thoughtful and functional design.',
        header: <Skeleton />,
        className: 'md:col-span-1',
        icon: <IconSignature className="h-4 w-4 text-primary" />
    },
    {
        title: 'The Power of Communication',
        description: 'Understand the impact of effective communication in our lives.',
        header: <Skeleton />,
        className: 'md:col-span-2',
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />
    }
];
