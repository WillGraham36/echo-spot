"use client";
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from '@/components/ui/spinner';
import { FormReducer, INITAL_STATE } from "@/reducers/FormReducer";
import { useReducer } from "react";
import { useUser } from '@clerk/nextjs';
import { API_URL } from '@/utils/constants';
import { revalidatePath } from 'next/cache';

const FormSchema = z.object({
    commentContent: z
        .string()
        .min(1, {
            message: "Body must be at least 1 character long"
        })
        .max(500, {
            message: "Body must be less than 500 characters long"
        }),
});

const CommentForm = ({postId}: {postId: string}) => {
    
    const { user } = useUser();
    const [state, dispatch] = useReducer(FormReducer, INITAL_STATE);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    
    
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const commentData = {
            parentPostId: postId,
            userId: user?.id,
            commentContent: data.commentContent,
            upvotes: 1,
            usersWhoUpvoted: [user?.id]
        };
        try {
            const response = await fetch(`${API_URL}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData)
            });

            if (!response.ok) {
                dispatch({ type: "CREATE_ERROR", payload: 'Failed to submit post' });
                throw new Error('Failed to submit post');
            }

            dispatch({ type: "CREATE_SUCCESS" });
            console.log('Comment submitted');

        } catch (error) {
            dispatch({ type: "CREATE_ERROR", payload: 'Failed to submit post' });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='pl-2'>
                <FormField
                    control={form.control}
                    name='commentContent'
                    render={({ field }) => (
                        <FormItem className="py-4">
                            <FormControl>
                                <div className=''>
                                    <AutosizeTextarea
                                        placeholder="Add a comment..."
                                        maxHeight={200}
                                        minHeight={50}
                                        className='w-full dark:bg-[#1f1f1f]'
                                        {...field}
                                    />
                                    <FormMessage className="text-primary absolute pt-4" />
                                    <span className='flex justify-end'>
                                        <Button type="submit" variant={"ghostHover"} className='px-2 mt-2'>
                                            {state.loading ?
                                                <Spinner className="text-white p-1" />
                                                :
                                                <h1>Add Comment</h1>
                                            }
                                        </Button>
                                    </span>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                {state.error &&
                    <FormMessage className="text-primary font-medium pt-6">
                        {state.error}
                    </FormMessage>}
            </form>
        </Form>
    )
}

export default CommentForm