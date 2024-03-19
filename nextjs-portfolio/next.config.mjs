import { remark } from 'remark';
import createMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
    experimental: {
        ppr: true
    }
};

/** @type {import('rehype-pretty-code').Options} */
const options = {
    keepBackground: false,
    defaultLang: {
        block: 'plaintext',
        inline: 'plaintext'
    },
    theme: {
        dark: 'github-dark-dimmed',
        light: 'github-light'
    }
};

const withMDX = createMDX({
    options: {
        remarkPlugins: [remark],
        rehypePlugins: [[rehypePrettyCode, options]]
    }
});
// Merge MDX config with Next.js config
export default withMDX(nextConfig);
