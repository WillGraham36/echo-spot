export type CommentType = {
    _id: string,
    childIds: Array<string>,
    userNumber: number,
    userId: string,
    date: Date,
    commentContent: string,
    upvotes: number,
}