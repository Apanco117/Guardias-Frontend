import {
    Calendar,
    Frame,
    Map,
    PieChart,
    User,
} from "lucide-react"

export const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Calendarios",
            url: "/",
            icon: Calendar,
            isActive: true,
            items: [
                {
                    title: "Guardias",
                    url: "/",
                },
                {
                    title: "Administrar",
                    url: "/admincalendarios",
                }
            ],
        },
        {
            title: "Usuarios",
            url: "/usuarios",
            icon: User,
            items: [
                {
                    title: "Administrar usuarios",
                    url: "/usuarios",
                }
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}