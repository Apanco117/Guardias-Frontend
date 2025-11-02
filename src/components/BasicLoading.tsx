import { Skeleton } from "./ui/skeleton";

export default function BasicLoading() {
    return (
         <div className=" w-full space-y-3">
            <Skeleton className=" w-full h-20"/>
            <Skeleton className=" w-full h-20"/>
            <Skeleton className=" w-full h-20"/>
            <Skeleton className=" w-full h-20"/>
            <Skeleton className=" w-full h-20"/>
        </div>
    )
}
