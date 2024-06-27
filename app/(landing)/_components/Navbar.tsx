import { ModeToggle } from "@/components/theme-mode-toggle"
import Logo from "./Logo"

const Navbar = () => {
    return (
        <div className="z-50 fixed top-0 flex items-center w-full p-4">
            <Logo />
            <ModeToggle />
        </div>
    )
}

export default Navbar
