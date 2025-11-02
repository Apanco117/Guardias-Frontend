import { getMonths } from "@/api";
import BasicLoading from "@/components/BasicLoading";
import CardMonth from "@/components/Calendario/CardMonth";
import NoDataBasic from "@/components/NoDataBasic";
import type { Month } from "@/types";
import { useQuery } from "@tanstack/react-query";



export default function AdminCalendarios() {

    
    const { data, isLoading, isError } = useQuery< Month[] >({
        queryKey:["month"],
        queryFn: getMonths
    })

    const datas = data || []

    return (
        <div className=" w-full pt-5">
            <div className=" w-full">
                <h2 className="text-xl font-bold">Administar calendarios</h2>
                <p className=" text-accent">Administre los calendarios ya generados</p>

                <div className=" w-full pt-5">
                    {isLoading ? (
                       <BasicLoading/>
                    ) : isError ? (
                        <>
                           
                        </>
                    ) : (
                        <div className=" space-y-3">
                            {datas.length > 0 ? (
                                <>
                                    {data?.map( month => {
                                        return (
                                            <CardMonth month={month} key={month.month + month.year} />
                                        )
                                    } )}
                                </>
                            ) : (
                                <NoDataBasic/>
                            )}

                            
                        </div>
                    ) }
                </div>
            </div>
        </div>
    )
}
