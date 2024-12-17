import BookCard from "@/components/ui/book-card";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
    return (
        <div className="flex justify-center mt-6">
            <Card className="w-[350px] rounded-sm border-current">
                <CardHeader className="bg-[#4a4a4a]">
                    <CardTitle className="flex text-white justify-center">
                        Personal Book Tracker
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        className="mt-6"
                        type="text"
                        placeholder="Book Title"
                    />
                    <Input className="mt-2" type="text" placeholder="Author" />
                    <Button className="bg-[#4a90e2] mt-2 w-full">
                        Add book
                    </Button>
                    <div className="flex justify-between">
                        <Button className="bg-[#4a90e2] mt-2">All</Button>
                        <Button className="bg-[#4a90e2] mt-2">To Read</Button>
                        <Button className="bg-[#4a90e2] mt-2">Reading</Button>
                        <Button className="bg-[#4a90e2] mt-2">Done</Button>
                    </div>
                    <BookCard
                        author="Robert C. Martin"
                        bookTitle="Clean Code"
                        btnFaceName="Start Reading"
                    />
                    <BookCard
                        author="Andrew Hunt"
                        bookTitle="The Pragmatic Programmer"
                        btnFaceName="Complete"
                    />
                </CardContent>
                <CardFooter className="flex justify-between">
                    {/* <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button> */}
                </CardFooter>
            </Card>
        </div>
    );
}
