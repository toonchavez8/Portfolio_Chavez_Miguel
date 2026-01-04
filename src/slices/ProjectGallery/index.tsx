import { FC } from "react";
import { Content, asDate } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `ProjectGallery`.
 */
export type ProjectGalleryProps = SliceComponentProps<Content.ProjectGallerySlice>;

/**
 * Component for "ProjectGallery" Slices.
 */
const ProjectGallery: FC<ProjectGalleryProps> = ({ slice }) => {
  const projects = slice.primary.project_byte ?? [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="group/section flex w-full flex-col justify-center gap-4 py-2 md:gap-6 lg:px-4"
    >
      {slice.primary.sectiontittle && (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-viridian-500">
          // {slice.primary.sectiontittle}
        </p>
      )}

      <div className="grid w-full grid-cols-1 gap-4">
        {projects.map((item, index) => {
          const date = asDate(item.project_date);
          const formattedDate = date?.toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          });

          const tags = (item.project_tags || "")
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

          return (
            <article
              key={item.project_name || index}
              className="@container relative isolate flex flex-col gap-3 rounded-lg border border-neutral-300/40 bg-neutral-50/60 p-3 antialiased backdrop-blur-sm transition hover:border-neutral-900/70 hover:bg-neutral-100 dark:border-neutral-700/40 dark:bg-neutral-900/40 hover:dark:border-neutral-300/75 dark:hover:bg-neutral-900/70"
            >
              <div className="flex w-full items-center justify-between gap-3">
                <p className="hidden font-mono text-xs font-extralight text-neutral-500 opacity-80 md:block md:text-sm">
                  {formattedDate}
                </p>
                <div className="flex flex-wrap items-center justify-end gap-2 text-xs font-mono">
                  {item.live_link?.url && (
                    <PrismicNextLink
                      field={item.live_link}
                      className="inline-flex items-center gap-2 rounded-full border border-emerald-500/70 bg-emerald-500/10 px-3 py-1 text-[11px] uppercase tracking-wide text-emerald-700 transition hover:bg-emerald-500/20 dark:border-emerald-400/70 dark:text-emerald-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>live</span>
                    </PrismicNextLink>
                  )}
                  {item.repo_link?.url && (
                    <PrismicNextLink
                      field={item.repo_link}
                      className="inline-flex items-center gap-2 rounded-full border border-neutral-500/70 bg-neutral-900/5 px-3 py-1 text-[11px] uppercase tracking-wide text-neutral-700 transition hover:bg-neutral-900/10 dark:border-neutral-400/70 dark:text-neutral-100"
                    >
                      <span>repo</span>
                    </PrismicNextLink>
                  )}
                </div>
              </div>

              {item.project_link?.link_type !== "Any" ? (
                <PrismicNextLink
                  field={item.project_link}
                  className="relative flex w-full flex-row items-center justify-between gap-3 rounded-md border border-neutral-300/60 bg-white/60 p-2 text-left transition hover:border-neutral-900/80 hover:bg-white dark:border-neutral-700/60 dark:bg-neutral-900/70 hover:dark:border-neutral-200"
                >
                  <PrismicNextImage
                    field={item.project_image}
                    className="hidden aspect-video h-full w-full max-w-32 rounded-md object-cover md:block"
                  />
                  <div className="flex w-full flex-col items-start justify-start gap-1 px-1">
                    <h3 className="w-full font-mono text-sm font-semibold text-neutral-900 @md:text-lg dark:text-neutral-50">
                      {item.project_name}
                    </h3>
                    <p className="hidden w-full text-sm text-neutral-600 opacity-80 dark:text-neutral-200 lg:block">
                      {item.project_description}
                    </p>
                    {tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap items-center gap-1">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-neutral-300 bg-neutral-50 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-neutral-600 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </PrismicNextLink>
              ) : (
                <div className="relative flex w-full flex-row items-center justify-between gap-3 rounded-md border border-neutral-300/60 bg-white/60 p-2 text-left dark:border-neutral-700/60 dark:bg-neutral-900/70">
                  <PrismicNextImage
                    field={item.project_image}
                    className="hidden aspect-video h-full w-full max-w-32 rounded-md object-cover md:block"
                  />
                  <div className="flex w-full flex-col items-start justify-start gap-1 px-1">
                    <h3 className="w-full font-mono text-sm font-semibold text-neutral-900 @md:text-lg dark:text-neutral-50">
                      {item.project_name}
                    </h3>
                    <p className="hidden w-full text-sm text-neutral-600 opacity-80 dark:text-neutral-200 lg:block">
                      {item.project_description}
                    </p>
                    {tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap items-center gap-1">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-neutral-300 bg-neutral-50 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-neutral-600 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectGallery;
