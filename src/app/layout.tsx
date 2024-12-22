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
    description:
        "Sample project to learn NextJS, Tailwind, Axios and Shadcn/ui",
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
                        <div className="flex justify-center flex-col">
                            <h1 className="text-white text-center font-semibold text-lg pt-5 md:text-xl lg:text-2xl xl:text-3xl">
                                Personal Book Tracker
                            </h1>
                            <div className="flex justify-center">
                                <TabsNavigation />
                            </div>
                        </div>
                    </div>

                    {children}
                </main>
            </body>
        </html>
    );
}
