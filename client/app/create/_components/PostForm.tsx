"use client";
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { useUser } from "@clerk/nextjs";
import useLocation from "@/hooks/useLocation";


const FormSchema = z.object({
    category: z.string(),

    postContent: z
        .string()
        .min(2, {
            message: "Body must be at least 2 characters long"
        })
        .max(500, {
            message: "Body must be less than 500 characters long"
    }),
})


const PostForm = () => {

    const { user } = useUser();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        
        const userId = user?.id;

        try {
            const location = await useLocation();
            console.log(location);
        } catch (error) {
            console.log(error);
        }
        

        // try {
        //     const response = await fetch('http://localhost:8080/posts', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data)
        //     });

        //     if(!response.ok) {
        //         throw new Error('Failed to submit post');
        //     }
        //     const responseData = await response.json();
        //     console.log(responseData);

        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel className="font-medium text-xl">Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full md:w-64">
                                        <SelectValue placeholder="Select a category..." />
                                    </SelectTrigger>
                                </FormControl>
                                    <SelectContent>
                                        <SelectItem value="general">General</SelectItem>
                                        <SelectItem value="a">blah blah blah</SelectItem>
                                        <SelectItem value="b">yappin</SelectItem>
                                    </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="postContent"
                    render={({ field }) => (
                        <FormItem className="py-4">
                            <FormLabel className="font-medium text-xl">Post Content</FormLabel>
                            <FormControl>
                                <AutosizeTextarea
                                    placeholder="Write your echo..."
                                    maxHeight={500}
                                    minHeight={100}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default PostForm