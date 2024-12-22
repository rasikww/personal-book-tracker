"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookStatus } from "@/app/add-books/page";

export function DropdownMenuRadioGroupBookStatus({
    setStatus,
    status,
}: {
    status: BookStatus;
    setStatus: React.Dispatch<React.SetStateAction<BookStatus>>;
}) {
    // const [status, setStatus] = React.useState(bookStatus);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Change Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Book Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={status}
                    onValueChange={(value: string) =>
                        setStatus(value as BookStatus)
                    }
                >
                    <DropdownMenuRadioItem value={BookStatus.TO_READ}>
                        To Read
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={BookStatus.READING}>
                        Reading
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={BookStatus.COMPLETED}>
                        Completed
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
