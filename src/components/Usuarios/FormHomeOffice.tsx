import { Checkbox } from "@/components/ui/checkbox"

export default function FormHomeOffice( {ho} : {ho:boolean | null | undefined} ) {

    const checked = ho === true ? true : false    

    return (
        <div className="
            flex 
            items-center        
            justify-center      
            flex-col            
            gap-2               
            sm:flex-row         
            sm:gap-3            
        ">
            <p className="font-medium text-gray-100 flex items-center">
                <span className="sm:hidden text-xs flex items-center">
                    HO
                </span>
                <span className="hidden sm:inline text-xs md:flex items-center">
                    Home Office
                </span>
            </p>
            <Checkbox defaultChecked = {checked} />
        </div>
    )
}
