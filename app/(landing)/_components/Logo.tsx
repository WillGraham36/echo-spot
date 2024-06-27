import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from '@/lib/utils';

const font = Poppins({
    subsets: ['latin'],
    weight: ["400", "600"]
});

const Logo = () => {
    return (
        <div className=" md:flex items-center gap-x-2 dark:bg-primary rounded-full p-2 px-3">
            <Image 
                src="/logo.png"
                alt="EchoSpot logo"
                width={40}
                height={40}
            />
            <p className={cn("font-semibold", font.className)}>
                EchoSpot
            </p>
        </div>
    )   
}

export default Logo