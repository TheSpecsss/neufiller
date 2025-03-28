"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { supabase } from "@/lib/supabase/client";
export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter(); // ✅ Use Next.js router for navigation

  const [userName, setUserName] = useState<string | null>(null);

  const Logout = async () => {
    console.log("clicki clicki");
    const { error } = await supabase.auth.signOut();
    router.push("/");

    if (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          console.error("Error fetching user:", error);
        } else {
          setUserName(data.user?.user_metadata?.name || null);
        }
      } else {
        console.log("No active session.");
        // Optionally, redirect to login page if needed: router.push('/login');
      }
    };

    fetchUser();
  }, []); // Empty dependency array, run only once on mount

  const navItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Template Management", icon: FileText, path: "/templates" },
    { title: "User Management", icon: Users, path: "/users" },
    { title: "Audit Logs", icon: ClipboardList, path: "/auditlogs" },
    { title: "Preview as User", icon: Eye, path: "/user/dashboard" },
    { title: "Available Documents", icon: Eye, path: "/alltemplates" },
    { title: "My Documents", icon: Eye, path: "/mydocuments" },
  ];

  return (
    <Sidebar className="w-64 bg-sidebar text-sidebar-foreground shadow-lg h-screen flex flex-col">
      <SidebarHeader className="py-4 px-6 font-semibold text-lg border-b border-sidebar-accent">
        Menu
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto py-2">
        <SidebarGroup>
          {navItems.map((item) => (
            // biome-ignore lint/a11y/useButtonType: <explanation>
            <button
              key={item.path}
              onClick={() => router.push(item.path)} // ✅ Navigate dynamically
              className={cn(
                "flex items-center w-full text-left px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200",
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
            </button>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-accent py-3 px-5">
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          className="flex items-center text-sm text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors duration-200 w-full"
          onClick={Logout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Sign Out please</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
