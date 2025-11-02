import { Skeleton } from "@/components/ui/skeleton"

type DayCellProps = {
    day: number
}
export default function DayLoading( {day} : DayCellProps ) {
    return (
        <div  className="border border-border p-2 flex flex-col">
            <span className="hidden md:flex self-end font-medium text-gray-100">{day}</span>
            <div className="grow overflow-y-auto space-y-2">
                <Skeleton className="h-[25px] w-full" />
                <Skeleton className="h-[25px] w-full" />
            </div>
        </div>
    )
}
