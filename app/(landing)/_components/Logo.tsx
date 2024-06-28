import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from '@/lib/utils';

const font = Poppins({
    subsets: ['latin'],
    weight: ["400", "600"]
});

const Logo = () => {
    return (
        <div className="flex items-center gap-x-2 dark:bg-primary rounded-full py-2 md:pl-3 md:pr-7 px-2">
            <Image 
                src="/logo.png"
                alt="EchoSpot logo"
                width={40}
                height={40}
            />
            <p className={cn("font-semibold hidden md:block", font.className)}>
                EchoSpot
            </p>
        </div>
    )   
}

export default Logo