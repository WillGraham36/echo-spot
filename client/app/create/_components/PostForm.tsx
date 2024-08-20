"use client";
import { set, z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { useUser } from "@clerk/nextjs";
import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { FormReducer, INITAL_STATE } from "../../../reducers/FormReducer";
import getLocation from "@/utils/getLocation";
import { createPostData } from "@/types/createTypes";
import createPost from "@/actions/createPost";


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

    const { user } = useUser();
    const router = useRouter();
    const [state, dispatch] = useReducer(FormReducer, INITAL_STATE);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    
        dispatch({ type: "CREATE_START" });
        const location = await getLocation();
        if(location.lat === 1000 && location.long === 1000) {
            dispatch({ type: "CREATE_ERROR", payload: 'Could not get location, your location must be enabled to post' });
            return;
        }
        const postData: createPostData = {
            location: {
                lat: location.lat,
                long: location.long,
            },
            category: data.category,
            title: data.postContent,
            upvotes: 0,
        }

        const createPostStatus = await createPost({postData, userId: user?.id as string});
        const { type, payload } = createPostStatus;
        if(type === "CREATE_SUCCESS") {
            router.push('/'); // Redirect to feed
            dispatch({ type: "CREATE_SUCCESS" });
            return;
        }
        if(type === "CREATE_ERROR") {
            dispatch({ type: "CREATE_ERROR", payload: payload });
            return;
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
                            <FormLabel className="dark:text-white font-medium text-xl">Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full md:w-64">
                                        <SelectValue placeholder="Select a category..." />
                                    </SelectTrigger>
                                </FormControl>
                                    <SelectContent>
                                        {/* TODO: Change categories and values */}
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
                            <FormLabel className="dark:text-white font-medium text-xl">Post Content</FormLabel>
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
                    {state.loading ? 
                        <Spinner className="text-white p-1"/>
                    :
                        'Submit Post'
                    }    
                </Button>

                {state.error && 
                    <FormMessage className="text-primary font-medium pt-6">
                        {state.error}
                    </FormMessage>}
            </form>
        </Form>
    )
}

export default PostForm