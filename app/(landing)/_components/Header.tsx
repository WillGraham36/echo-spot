import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const Header = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                See what&apos;s happening around you <span className="underline">right now</span>
            </h1>
            <h3 className="font-medium text-base sm:text-xl md:text-2xl">
                EchoSpot is location-based and 100% anonymous, allowing you to share your thoughts with people around you however you want
            </h3>

            <Button asChild size={"lg"}>
                <Link href="/documents">
                    Find Your Spot
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
            </Button>
        </div>
    )
}

export default Header