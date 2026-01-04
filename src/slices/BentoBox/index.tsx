import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import type { FC } from "react";

/**
 * Props for `BentoBox`.
 */
export type BentoBoxProps = SliceComponentProps<Content.BentoBoxSlice>;

/**
 * Component for "BentoBox" Slices.
 */
const BentoBox: FC<BentoBoxProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			Placeholder component for bento_box (variation: {slice.variation}) slices.
			<br />
			<strong>You can edit this slice directly in your code editor.</strong>
			{/**
			 * 💡 Use the Prismic MCP server with your code editor
			 * 📚 Docs: https://prismic.io/docs/ai#code-with-prismics-mcp-server
			 */}
		</section>
	);
};

export default BentoBox;
