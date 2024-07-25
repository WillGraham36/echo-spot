"use client";
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from '@/components/ui/spinner';
import { FormReducer, INITAL_STATE } from "@/reducers/FormReducer";
import { useReducer } from "react";

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
});

const onSubmit = async (data: z.infer<typeof FormSchema>) => {

}

const SubmitCommentForm = ({postId}: {postId: string}) => {

    const [state, dispatch] = useReducer(FormReducer, INITAL_STATE);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='pl-2'>
                <FormField
                    control={form.control}
                    name="postContent"
                    render={({ field }) => (
                        <FormItem className="py-4">
                            <FormControl>
                                <div className=''>
                                    <AutosizeTextarea
                                        placeholder="Add a comment..."
                                        maxHeight={200}
                                        minHeight={75}
                                        className='w-full dark:bg-[#1f1f1f]'
                                        {...field}
                                    />
                                    <span className='flex justify-end'>
                                        <Button type="submit" variant={"ghostHover"} className='px-2 mt-1'>
                                            {state.loading ?
                                                <Spinner className="text-white p-1" />
                                                :
                                                'Add comment'
                                            }
                                        </Button>
                                    </span>
                                </div>
                            </FormControl>
                            <FormMessage className="text-primary" />
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

export default SubmitCommentForm