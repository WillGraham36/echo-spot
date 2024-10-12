import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
    ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
    title: "EchoSpot",
    description: "Talk with others in your area, anonymously.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
	<html lang="en" suppressHydrationWarning>
            <body className={cn("h-full dark:bg-[#1f1f1f] overflow-y-scroll", inter.className)}>
            <ClerkProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                    storageKey="echo-spot-theme"
                >
                    {children}
                </ThemeProvider>
            </ClerkProvider>
            <Toaster/>
	    </body>
	</html>
    );
}
