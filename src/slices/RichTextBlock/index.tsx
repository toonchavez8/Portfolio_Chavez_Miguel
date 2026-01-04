import type { Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import type { FC } from "react";

/**
 * Props for `RichTextBlock`.
 */
export type RichTextBlockProps =
	SliceComponentProps<Content.RichTextBlockSlice>;

/**
 * Component for "RichTextBlock" Slices.
 */
const RichTextBlock: FC<RichTextBlockProps> = ({ slice }) => {
	return <PrismicRichText field={slice.primary.rich_text} />;
};

export default RichTextBlock;
