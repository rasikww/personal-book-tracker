import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddBook() {
    return (
        <div className="max-w-xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Book</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        {/* Add your form fields here */}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
