import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";

interface BookCardProps {
    author: string;
    bookTitle: string;
    btnFaceName: string;
}

const BookCard: FC<BookCardProps> = ({ author, bookTitle, btnFaceName }) => {
    return (
        <>
            <Card className="flex w-full mt-6 rounded-sm bg-[#f0f0f0] items-center">
                <div className="flex-col">
                    <CardHeader>
                        <CardTitle className="flex text-black">
                            {/* Clean Code */ bookTitle}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm ml-6 p-0 pb-4">
                        {/* Robert C. Martin */ author}
                    </CardContent>
                </div>
                <CardContent>
                    <Button className="bg-[#4a90e2]">
                        {/* Start Reading */ btnFaceName}
                    </Button>
                </CardContent>
            </Card>
        </>
    );
};

export default BookCard;
