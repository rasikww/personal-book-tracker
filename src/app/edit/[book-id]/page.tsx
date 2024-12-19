import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function EditBook() {
    return (
        <div className="flex justify-center mt-6">
            <Card className="w-[350px] rounded-sm border-current">
                <CardHeader className="bg-[#4a4a4a]">
                    <CardTitle className="flex text-white justify-center">
                        Edit Book Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        className="mt-6"
                        type="text"
                        placeholder="Book Title"
                    />
                    <Input className="mt-2" type="text" placeholder="Author" />
                    <Input className="mt-2" type="text" placeholder="Genre" />
                    <Input className="mt-2" type="text" placeholder="Status" />
                    <Input
                        className="mt-2"
                        type="text"
                        placeholder="Start Date"
                    />
                    <Button className="bg-[#4a90e2] mt-2 w-full">
                        Save Changes
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
