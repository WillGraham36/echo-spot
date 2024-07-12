"use client";
import { ModeToggle } from "@/components/theme-mode-toggle"
import Logo from "./Logo"
import { Button } from "@/components/ui/button"
import LocationRange from "./LocationRange";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Ellipsis, LogOut, PlusCircle, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
    SignInButton,
    SignOutButton,
    SignedIn,
    SignedOut,
} from '@clerk/nextjs'
import { useRouter } from "next/navigation";

const Navbar = () => {

    const [miles, setMiles] = useState(20);
    const router = useRouter();

    return (
        <div className="z-50 fixed top-0 flex items-center justify-between w-full px-4 py-2 border-b-2 bg-white dark:bg-[#1f1f1f] border-neutral-100 dark:border-neutral-800">
            <Link href="/">
                <Logo />
            </Link>
            <span className="hidden sm:block">
                <LocationRange miles={miles} setMiles={setMiles} />
            </span>
            <div className="flex items-center gap-x-2">
                <SignedOut>
                    <SignInButton mode={"modal"} >
                        <Button asChild>
                            Sign In
                        </Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button
                                    variant={"ghost"}
                                    onClick={() => router.push("/create")}
                                    asChild
                                >
                                    <PlusCircle size={24} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Create Post</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button className="font-medium" asChild>
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


                <span className="hidden sm:block">
                    <ModeToggle />
                </span>

                <span className="flex sm:hidden items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Ellipsis size={32} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <p className="pr-[14px]">Appearance theme: </p>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <ModeToggle />
                                </div>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <LocationRange miles={miles} setMiles={setMiles} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </span>

            </div>
        </div>
    )
}

export default Navbar
