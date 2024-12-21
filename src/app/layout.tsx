import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TabsNavigation } from "@/components/tabs-navigation";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Personal Book Tracker",
    description: "Sample project to learn NextJS, Tailwind and Shadcn/ui",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <main className="container mx-auto p-4">
                    <div className="w-full flex justify-center bg-blue-500 rounded-md mb-8">
                        <TabsNavigation />
                    </div>

                    {children}
                </main>
            </body>
        </html>
    );
}
