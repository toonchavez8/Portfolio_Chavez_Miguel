"use client";

import { type Content, isFilled } from "@prismicio/client";
import { Github } from "lucide-react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import type { FC } from "react";
import { TagLink } from "../ProjectGallery/TagLink";

export interface ProjectListItemProps {
  project: Content.ProjectGallerySliceDefaultPrimaryProjectByteItem;
  formattedDate?: string;
  index: number;
}

const Projectlistitem: FC<ProjectListItemProps> = ({
  project,
  formattedDate,
  index,
}) => {
  const tags = (project.project_tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const handleButtonClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <article
      key={project.project_name || index}
      className="relative isolate grid min-w-0 grid-cols-1 gap-4 rounded-xl border border-shark-700/25 bg-neutral-100/70 p-4 antialiased backdrop-blur-lg transition hover:border-viridian-600 hover:bg-viridian-400/5 dark:border-shark-700/50 dark:bg-neutral-950/30 dark:hover:border-shark-500/75 dark:hover:bg-viridian-950/10 md:grid-cols-[8rem_minmax(0,1fr)_auto] md:items-center "
    >
      {project.project_link?.link_type !== "Any" && (
        <PrismicNextLink
          field={project.project_link}
          className="absolute inset-0"
          aria-label={`View ${project.project_name} project`}
        />
      )}

      <PrismicNextImage
        field={project.project_image}
        className="hidden aspect-video h-full w-full rounded-lg object-cover md:block"
      />

      <div className="flex w-full  min-w-0 flex-col items-start justify-start gap-2 md:px-2">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start sm:justify-between ">
          <p className="hidden font-mono text-xs font-extralight opacity-60 xs:block xs:text-sm">
            {formattedDate}
          </p>

          <div className=" z-10 ml-auto hidden max-w-full flex-wrap items-center justify-end gap-2 text-right md:flex">
            {tags.map((tag) => (
              <TagLink key={tag} tag={tag} />
            ))}
          </div>
        </div>

        <h3 className="w-full break-words font-mono text-xl font-bold text-viridian-700 dark:text-viridian-100 md:text-2xl">
          {project.project_name}
        </h3>

        <p className="w-full text-sm leading-6 text-shark-700/80 dark:text-shark-100/75 md:text-base">
          {project.project_description}
        </p>

        <div className="z-10 ml-auto flex flex-wrap items-center justify-end gap-2 text-right md:hidden">
          {tags.map((tag) => (
            <TagLink key={`${tag}-mobile`} tag={tag} />
          ))}
        </div>
      </div>

      <div className="z-10 flex md:w-full flex-wrap md:flex-col items-center justify-start gap-3 md:w-auto md:justify-end ">
        {isFilled.link(project.repo_link) && (
          <PrismicNextLink
            field={project.repo_link}
            className="inline-flex items-center gap-2 rounded-full border border-shark-600/70 bg-transparent px-3 py-2 font-mono text-sm duration-150 hover:border-viridian-700/70 hover:text-viridian-500 dark:border-shark-400/50 dark:hover:text-viridian-300 md:w-full"
            onClick={handleButtonClick}
          >
            <Github size={16} strokeWidth={1.75} />
            <span>repo</span>
          </PrismicNextLink>
        )}
        {isFilled.link(project.live_link) && (
          <PrismicNextLink
            field={project.live_link}
            className="inline-flex  gap-2 rounded-full border border-viridian-600/70 bg-viridian-500/10 px-3 py-2 font-mono text-sm text-viridian-700 transition hover:bg-viridian-500/20 dark:border-viridian-400/70 dark:text-viridian-200 md:w-full items-center-safe content-center "
            onClick={handleButtonClick}
          >
            <span className="relative h-1.5 w-1.5 rounded-full bg-viridian-500 ">
              <span className="absolute h-1.5 w-1.5 rounded-full bg-viridian-500 animate-ping"></span>
            </span>
            <p>live</p>
          </PrismicNextLink>
        )}
      </div>
    </article>
  );
};

export default Projectlistitem;
