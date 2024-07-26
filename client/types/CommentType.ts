export type CommentType = {
    _id: string,
    parendPostId: string,
    childIds: Array<string>,
    level: number,
    userNumber: number,
    userId: string,
    date: Date,
    commentContent: string,
    upvotes: number,
    usersWhoUpvoted: Array<string>,
    usersWhoDownvoted: Array<string>,
}