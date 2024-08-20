import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs"

type IsCurrentUserProps = {
    postUserId: string,
    children?: React.ReactNode
}
/**
 * 
 * @param postUserId: string - The user id of the post
 * @returns Renders children if the current user is the same as the post user, otherwise does nothing
 */
const IsCurrentUser = ({
    postUserId,
    children,
}: IsCurrentUserProps) => {

    const { user } = useUser();



    return (
        <>
            <SignedOut/>
            <SignedIn>
                {user?.id === postUserId && children}
            </SignedIn>
        </>
    )
}

export default IsCurrentUser