import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./appSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar - Fixed or Collapsible */}
        <AppSidebar />

        {/* Main Content - Takes Full Space */}
        <main className="flex-1 flex flex-col overflow-hidden p-6 transition-all duration-300">
          <SidebarTrigger />
          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
