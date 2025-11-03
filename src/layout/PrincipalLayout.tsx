import { Outlet } from "react-router-dom";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AppSidebar from "@/components/SideBar/app-sidebar";
export default function PrincipalLayout() {
    return (
         <SidebarProvider defaultOpen={false} >
            <AppSidebar />
            <SidebarInset>
                <header className="fixed w-full z-50 h-16 shrink-0 flex items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b-2 bg-background">
                    <div className=" px-2">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                </header>
                <section className="pt-16 transition-[padding] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:pt-12  w-full px-1 md:px-14">
                    <Outlet/>        
                </section>
            </SidebarInset>
        </SidebarProvider>
    )
}
