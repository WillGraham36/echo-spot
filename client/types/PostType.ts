export type PostType = {
    _id: string,
    userId: string,
    date: Date
    category: string,
    title: string,
    upvotes: number,
    usersWhoUpvoted: Array<string>,
    usersWhoDownvoted: Array<string>,
    comments?: Array<Comment>,
}