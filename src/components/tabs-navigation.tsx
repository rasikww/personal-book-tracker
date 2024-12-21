"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, usePathname } from "next/navigation";

export function TabsNavigation() {
    const router = useRouter();
    const pathname = usePathname();

    const currentTab = pathname === "/add-books" ? "add-books" : "my-books";

    return (
        <Tabs value={currentTab} className="w-48 mb-8 mt-8">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                    value="my-books"
                    onClick={() => router.push("/")}
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                    My Books
                </TabsTrigger>
                <TabsTrigger
                    value="add-books"
                    onClick={() => router.push("/add-books")}
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                    Add Book
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
