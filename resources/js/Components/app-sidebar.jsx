import * as React from "react"
import {
  Home,
  Users,
  FileText,
  Settings,
  BarChart3,
  GraduationCap,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"

// Admin navigation data
const data = {
  user: {
    name: "Admin User",
    email: "admin@gmail.com",
    avatar: "/pictures/isat.tmp",
  },
  navMain: [
    {
      title: "Menu",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: route('admin.dashboard'),
        },
        {
          title: "Teacher Management",
          url: route('admin.teachers.index'),
        },
        {
          title: "IPCRF Submissions",
          url: route('admin.ipcrf.submissions'),
        },
        {
          title: "IPCRF Configuration",
          url: route('admin.ipcrf.configuration'),
        },
        {
          title: "Audit Logs",
          url: route('admin.audit-logs.index'),
        }
      ]
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href={route('admin.dashboard')} className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img 
                    src="/pictures/isat.tmp" 
                    alt="ISAT" 
                    className="size-8 rounded-lg object-cover"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ISAT e-TRACES</span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
