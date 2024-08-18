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
import { useFormStatus } from 'react-dom';
import createComment from '@/actions/createComment';

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
    setNumComments: React.Dispatch<React.SetStateAction<number>>,
    setReplyIsOpen?: React.Dispatch<React.SetStateAction<boolean>>,
    parentCommentId?: string,
}
const CommentForm = ({ postId, setNumComments, parentCommentId, setReplyIsOpen }: CommentFormProps) => {
    
    const { user } = useUser();
    const [state, dispatch] = useReducer(FormReducer, INITAL_STATE);
    const { pending } = useFormStatus();
    const ref = useRef<HTMLFormElement>(null);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            commentContent: "",
        }
    });

    const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
        const userId = user?.id as string;
        const content = data.commentContent;
        await createComment({ content, postId, userId, parentCommentId });
        form.reset();
        ref.current?.reset();
        setNumComments((prev) => prev + 1);
        setReplyIsOpen && setReplyIsOpen(false);
    }
    
    return (
        
        <Form {...form}>
            <form
                className='pl-2'
                ref={ref}
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <FormField
                    control={form.control}
                    name='commentContent'
                    render={({ field }) => (
                        <FormItem className="py-2">
                            <FormControl>
                                <>
                                    <AutosizeTextarea
                                        placeholder="Add a comment..."
                                        maxHeight={200}
                                        minHeight={50}
                                        className='w-full dark:bg-[#1f1f1f]'
                                        {...field}
                                    />
                                    <FormMessage className="text-primary absolute pl-1" />
                                </>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <span className='flex justify-end items-center'>
                    <Button size={"sm"} className='flex justify-center rounded-3xl px-3 cursor-pointer 
                        bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700'>
                        {pending ?
                            <Spinner className="text-white p-1" />
                            :
                            <h1>Add Comment</h1>
                        }
                    </Button>
                </span>
                {state.error &&
                    <FormMessage className="text-primary font-medium">
                        {state.error}
                    </FormMessage>}
            </form>
        </Form>
    )
}

export default CommentForm