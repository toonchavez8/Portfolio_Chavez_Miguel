import { IconFileBroken, IconTableColumn, IconNotebook, IconComet } from '@tabler/icons-react';
import { BentoGrid, BentoGridItem } from '@/app/ui/Accentuily_ui/Bento-Grid';
import { Meteors } from '@/app/ui/Accentuily_ui/metor';

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
const Skeleton = ({
    children
}: Readonly<{
    children?: React.ReactNode;
}>) => (
    <div className=" \ relative flex h-full min-h-[6rem] w-full  flex-1 flex-col items-start justify-center  rounded-xl border border-primary bg-neutral-100 px-6 bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
        {children}
    </div>
);
const items = [
    {
        title: 'What im learning now',
        description: "Im starting my master's degree in  Software Engineering",
        header: (
            <Skeleton>
                <figure className=" flex aspect-square h-full w-2/3 flex-col items-start justify-around  py-1 transition-all duration-500 group-hover/bento:animate-pulse">
                    <div className="h-4 w-4   rounded-full bg-primary transition-all duration-150 group-hover/bento:w-full" />
                    <div className="h-4 w-4   rounded-full bg-accent transition-all duration-150 group-hover/bento:w-2/3" />
                    <div className="h-4 w-4   rounded-full bg-primary transition-all duration-150 group-hover/bento:w-4/5" />
                    <div className="h-4 w-4   rounded-full bg-secondary transition-all duration-150 group-hover/bento:w-1/3" />
                </figure>
            </Skeleton>
        ),
        className: 'md:col-span-2',
        icon: <IconNotebook className="h-4 w-4 text-primary " />
    },
    {
        title: 'What im reading?',
        description: 'The throne of glass series.',
        header: (
            <Skeleton>
                <figure className=" mx-auto flex h-full w-full max-w-fit flex-col items-center  justify-center  py-1 transition-all  duration-500 group-hover/bento:-rotate-6 group-hover/bento:scale-110">
                    <img
                        src="https://assets.literal.club/cover/5/ckrpanjhs215701euwfweygxvq.jpg?size=600"
                        alt="the throne of glass book cover"
                        className=" h-full rounded-sm"
                    />
                </figure>
            </Skeleton>
        ),
        className: 'md:col-span-1',
        icon: <IconFileBroken className="h-4 w-4 text-primary" />
    },
    {
        title: 'What im aiming for?',
        description: 'Starting a family with my incredible wife.',
        header: (
            <Skeleton>
                <Meteors className="bg-red-700 hover:bg-viridian-600 dark:hover:bg-viridian-500" />
            </Skeleton>
        ),
        className: 'md:col-span-1',
        icon: <IconComet className="h-4 w-4 text-primary" />
    },
    {
        title: 'What im doing',
        description: (
            <ul className="">
                <li>Im getting really into making pizza and the science of neopolitin style</li>
                <li>Nearly complete in my Wizarding world homebrew dnd</li>
                <li className="group/list">
                    Still Bingeing one piece{' '}
                    <span className="hidden text-sm text-primary transition-all ease-out group-hover/list:block ">
                        Oh gawd what am i doing??
                    </span>
                </li>
            </ul>
        ),
        header: <Skeleton></Skeleton>,
        className: 'md:col-span-2',
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />
    }
];
