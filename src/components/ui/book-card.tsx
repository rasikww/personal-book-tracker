import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Book } from "@/db";
import { EditBookForm } from "./edit-book-form";

export function BookCard({ book }: { book: Book }) {
    return (
        <Card className="h-full hover:bg-slate-200">
            <CardHeader>
                <CardTitle>{book.title}</CardTitle>
                <CardDescription>{book.author}</CardDescription>
                <CardDescription>{book.status}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            className="hover:bg-[#4a90e2] hover:text-white"
                        >
                            Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Book Details</DialogTitle>
                            <DialogDescription>
                                Make changes to "{book.title}" book details.
                            </DialogDescription>
                        </DialogHeader>
                        <EditBookForm book={book} />
                    </DialogContent>
                </Dialog>
                {/* <Button
                    variant="destructive"
                    onClick={async () => {
                        if (
                            confirm(
                                "Are you sure you want to delete this book?"
                            )
                        ) {
                            const response = await axios.delete(
                                `/api/books/${book.id}`
                            );
                            window.location.reload();
                        }
                    }}
                >
                    Delete
                </Button> */}
            </CardContent>
        </Card>
    );
}

// import { FC } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "./card";
// import { Button } from "./button";

// interface BookCardProps {
//     author: string;
//     bookTitle: string;
//     btnFaceName: string;
// }

// const BookCard: FC<BookCardProps> = ({ author, bookTitle, btnFaceName }) => {
//     return (
//         <>
//             <Card className="flex w-full mt-6 rounded-sm bg-[#f0f0f0] items-center">
//                 <div className="flex-col">
//                     <CardHeader>
//                         <CardTitle className="flex text-black">
//                             {/* Clean Code */ bookTitle}
//                         </CardTitle>
//                     </CardHeader>
//                     <CardContent className="text-sm ml-6 p-0 pb-4">
//                         {/* Robert C. Martin */ author}
//                     </CardContent>
//                 </div>
//                 <CardContent className="pt-6">
//                     <Button className="bg-[#4a90e2]">
//                         {/* Start Reading */ btnFaceName}
//                     </Button>
//                 </CardContent>
//             </Card>
//         </>
//     );
// };

// export default BookCard;
