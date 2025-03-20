"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Users,
  ClipboardList,
  LogOut,
  ChevronRight,
  Eye,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Template Management",
      icon: FileText,
      path: "/templates",
    },
    {
      title: "User Management",
      icon: Users,
      path: "/users",
    },
    {
      title: "Audit Logs",
      icon: ClipboardList,
      path: "/auditlogs",
    },
    {
      title: "Preview as User",
      icon: Eye,
      path: "/user/dashboard",
    },
    {
      title: "Available Documents",
      icon: Eye,
      path: "/alltemplates",
    },
    {
      title: "My Documents",
      icon: Eye,
      path: "/mydocuments",
    },
  ];

  return (
    <Sidebar className="w-64 bg-sidebar text-sidebar-foreground shadow-lg h-screen flex flex-col">
      <SidebarHeader className="py-4 px-6 font-semibold text-lg border-b border-sidebar-accent">Menu</SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto py-2">
        <SidebarGroup>
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === item.path
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md"
                  : "hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="flex-1">{item.title}</span>
              <ChevronRight
                className={cn(
                  "h-4 w-4 opacity-0 transition-all duration-200",
                  pathname === item.path
                    ? "opacity-100"
                    : "group-hover:opacity-70"
                )}
              />
            </Link>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-accent py-3 px-5">
        <button 
          className="flex items-center text-sm text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors duration-200 w-full"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Sign Out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
