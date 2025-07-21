import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div>
          <SidebarTrigger className="ml-1 mt-2" />
        </div>
        <main className="flex flex-1 flex-col gap-2 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
