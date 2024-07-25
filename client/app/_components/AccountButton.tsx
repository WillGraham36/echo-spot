import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    SignInButton,
    SignOutButton,
    SignedIn,
    SignedOut,
} from '@clerk/nextjs'
import { LogOut, PlusCircle} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";


const AccountButton = () => {
    const router = useRouter();

    return (
    <>
        <SignedOut>
            <SignInButton mode={"modal"}>
                <Button>
                    Sign In
                </Button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={"ghost"}
                            onClick={() => router.push("/create")}
                        >
                            <PlusCircle size={24} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Create Post</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button className="font-medium">
                        Your Account
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <p className="pr-20">
                            Account Settings
                        </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <div role="button" className="flex items-center gap-x-2">
                            <LogOut size={20} />
                            <SignOutButton />
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SignedIn>
    </>
    )
}

export default AccountButton