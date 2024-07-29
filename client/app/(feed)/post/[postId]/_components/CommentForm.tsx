"use client";
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from '@/components/ui/spinner';
import { FormReducer, INITAL_STATE } from "@/reducers/FormReducer";
import { useReducer, useRef } from "react";
import { useUser } from '@clerk/nextjs';
import addComment from '@/actions/addComment';

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

interface CommentFormProps {
    postId: string,
}
const CommentForm = ({ postId }: CommentFormProps) => {
    
    const { user } = useUser();
    const [state, dispatch] = useReducer(FormReducer, INITAL_STATE);
    const ref = useRef<HTMLFormElement>(null);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    return (
        <Form {...form}>
            <form
                className='pl-2'
                ref={ref}
                action={async formData => {
                    const userId = user?.id;
                    await addComment({ formData, postId, userId });
                    form.reset();
                    ref.current?.reset();
                }}
            >
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