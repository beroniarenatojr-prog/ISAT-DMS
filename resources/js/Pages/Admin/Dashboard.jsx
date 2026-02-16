import { AppSidebar } from "@/components/app-sidebar"
import { Head } from '@inertiajs/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import DashboardHeader from '@/Components/Admin/DashboardHeader';
import DashboardCard from '@/Components/Admin/DashboardCard';
import StatsGrid from '@/Components/Admin/StatsGrid';
import VisionMissionCard from '@/Components/Admin/VisionMissionCard';
import GoalsObjectivesCard from '@/Components/Admin/GoalsObjectivesCard';

export default function AdminDashboard({ stats }) {
    return (
        <>
            <Head title="Admin Dashboard" />
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-6 p-4 pt-0 relative">
                        {/* Background Logo Watermark */}
                        <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-20">
                            <img 
                                src="/pictures/isat.jpg" 
                                alt="ISAT Background" 
                                className="w-[600px] h-[600px] object-contain"
                            />
                        </div>

                        {/* Content with higher z-index */}
                        <div className="relative z-10">
                            <DashboardCard>
                                <DashboardHeader 
                                    title="Welcome to Admin Dashboard" 
                                    subtitle="Manage your application from here"
                                />
                                <StatsGrid stats={stats} />
                            </DashboardCard>

                            <VisionMissionCard />
                            
                            <GoalsObjectivesCard />
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
