"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface LocationRangeProps {
    miles: number,
    setMiles: (miles: number) => void
}

const LocationRange = ({ miles, setMiles }: LocationRangeProps) => {

    const milesPlaceholder = `${miles} miles`;

    const handleMilesChange = (miles: string) => {
        setMiles(parseInt(miles));
    }

    return (
        <div className="flex items-center gap-x-1">
            <h3>
                Viewing posts within:
            </h3>
            <Select onValueChange={handleMilesChange}>
                <SelectTrigger className="w-[6.5rem] bg-neutral-100 dark:bg-neutral-800">
                    <SelectValue placeholder={milesPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">5 miles</SelectItem>
                    <SelectItem value="10">10 miles</SelectItem>
                    <SelectItem value="25">25 miles</SelectItem>
                    <SelectItem value="50">50 miles</SelectItem>
                    <SelectItem value="100">100 miles</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )   
}

export default LocationRange