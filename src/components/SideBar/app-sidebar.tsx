
import * as React from "react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import TeamSwitcher from "./team-switcher"
import NavMain from "./nav-main"
import { data } from "./Data"




export default function AppSidebar( { ...props }: React.ComponentProps<typeof Sidebar> ) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                {/* <NavUser user={data.user} /> */}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
