import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { NavBar } from '@/app/ui/NavBar/NavBar';
import { Footer } from '@/app/ui/Footer/Footer';
import { Providers } from '@/app/providers';
import { DotBackgroundDemo } from '@/app/ui/Accentuily_ui/Background-Boxes';

export const metadata: Metadata = {
    title: {
        template: '%s | Toonchavez.dev',
        default: 'Toonchavez.dev'
    },
    description: 'Generated by create next app'
};
const GeistSans = localFont({
    src: './fonts/GeistVariableVF.woff2',
    variable: '--font-geist-sans'
});
const GeistMono = localFont({
    src: './fonts/GeistMonoVariableVF.woff2',
    variable: '--font-geist-mono'
});

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${GeistSans.variable} ${GeistMono.variable}  relative`}
            suppressHydrationWarning>
            <Providers>
                <body className=" group relative isolate min-h-screen bg-base-200 px-4  pt-4 text-neutral antialiased filter dark:bg-neutral dark:text-base-100 ">
                    <NavBar />
                    {children}
                    <Footer />
                    <DotBackgroundDemo />
                    <SpeedInsights />
                </body>
            </Providers>
        </html>
    );
}
