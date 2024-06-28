import { ModeToggle } from "@/components/theme-mode-toggle"
import Logo from "./Logo"
import { Button } from "@/components/ui/button"

const Navbar = () => {
    return (
        <div className="z-50 fixed top-0 flex items-center justify-between w-full p-4">
            <Logo />
            <div className="flex items-center gap-x-2">
                <Button>
                    Log in
                </Button>
                <ModeToggle />
            </div>
        </div>
    )
}

export default Navbar
