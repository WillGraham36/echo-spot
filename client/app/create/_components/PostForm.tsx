"use client";
import { set, z } from "zod"
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";


const FormSchema = z.object({
    category: z.string(),

    postContent: z
        .string()
        .min(1, {
            message: "Body must be at least 1 character long"
        })
        .max(500, {
            message: "Body must be less than 500 characters long"
    }),
})


const PostForm = () => {

    const API_URL = "http://localhost:8080";

    const { user } = useUser();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    
        const location = await useLocation();
        if(location.lat === 1000 && location.long === 1000) {
            setError('Could not get location, your location must be enabled to post');
            setLoading(false);
            return;
        }

        const postData = {
            userId : user?.id,
            location: {
                lat: location.lat,
                long: location.long,
            },
            category: data.category,
            title: data.postContent,
        }
        

        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            });

            if(!response.ok) {
                setError('Failed to submit post');
                setLoading(false);
                throw new Error('Failed to submit post');
            }

            setError(''); // Clear any previous errors
            setLoading(false);
            router.push('/'); // Redirect to home page

        } catch (error) {
            setError('Failed to submit post');
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white font-medium text-xl">Category</FormLabel>
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
                            <FormMessage className="text-primary"/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="postContent"
                    render={({ field }) => (
                        <FormItem className="py-4">
                            <FormLabel className="text-white font-medium text-xl">Post Content</FormLabel>
                            <FormControl>
                                <AutosizeTextarea
                                    placeholder="Write your echo..."
                                    maxHeight={500}
                                    minHeight={100}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-primary" />
                        </FormItem>
                    )}
                />
                
                <Button type="submit">
                    {loading ? 
                        <Spinner className="text-white p-1"/>
                    :
                        'Submit Post'
                    }    
                </Button>

                {error && 
                    <FormMessage className="text-primary font-medium pt-6">
                        {error}
                    </FormMessage>}
            </form>
        </Form>
    )
}

export default PostForm