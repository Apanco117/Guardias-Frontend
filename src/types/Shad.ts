import type { LucideIcon } from "lucide-react"



export type item = {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: subItem[]
}

export type subItem = {
    title: string
    url: string
}