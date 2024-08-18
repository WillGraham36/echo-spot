export type CommentType = {
    _id: string,
    childIds?: [string],
    userNumber: number,
    userId: string,
    date: Date,
    commentContent: string,
    upvotes: number,
}