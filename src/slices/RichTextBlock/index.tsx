import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

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
