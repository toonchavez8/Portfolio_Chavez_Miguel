import { cn } from '@/app/utils/cn';

export const BentoGrid = ({
    className,
    children
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                ' mx-auto grid w-full grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3 ',
                className
            )}>
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <article
            className={cn(
                'group/bento shadow-input border-neutral-[.5] relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-xl border bg-transparent p-4  backdrop-blur transition duration-200 hover:shadow-xl dark:border-white/[0.1] dark:bg-black/30 dark:shadow-none',
                className
            )}>
            {header}
            <div className="transition duration-200 group-hover/bento:translate-x-2">
                {icon}
                <div className="mb-2 mt-2 font-sans font-bold ">{title}</div>
                <div className="font-sans font-normal ">{description}</div>
            </div>
            <div className="absolute top-0 -z-10 aspect-square w-1/3  rounded-full bg-viridian-300 blur-3xl dark:bg-viridian-800 dark:opacity-50" />
        </article>
    );
};
