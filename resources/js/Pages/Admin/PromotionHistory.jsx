import { AppSidebar } from "@/components/app-sidebar"
import { Head, router } from '@inertiajs/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, TrendingUp } from 'lucide-react';

export default function PromotionHistory({ teacher, promotions }) {
    return (
        <>
            <Head title={`Promotion History - ${teacher.name}`} />
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
                                        <BreadcrumbLink href={route('admin.teachers.index')}>
                                            Teacher Management
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Promotion History</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        {/* Background Logo Watermark */}
                        <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-20">
                            <img 
                                src="/pictures/isat.tmp" 
                                alt="ISAT Background" 
                                className="w-[600px] h-[600px] object-contain"
                            />
                        </div>

                        {/* Content with higher z-index */}
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                            <Button
                                variant="outline"
                                onClick={() => router.get(route('admin.teachers.index'))}
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Teachers
                            </Button>
                        </div>

                        {/* Teacher Info Card */}
                        <Card className="bg-white shadow">
                            <CardHeader>
                                <CardTitle>{teacher.name}</CardTitle>
                                <CardDescription>
                                    Current Position: <span className="font-semibold text-foreground">
                                        {teacher.current_position?.name || 'No Position'}
                                    </span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Email:</span>
                                        <p className="font-medium">{teacher.email}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Division:</span>
                                        <p className="font-medium">{teacher.division || '-'}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Type:</span>
                                        <p className="font-medium">{teacher.teacher_type || '-'}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Total Promotions:</span>
                                        <p className="font-medium">{promotions.length}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Promotion Timeline */}
                        <Card className="bg-white shadow">
                            <CardHeader>
                                <CardTitle>Promotion History</CardTitle>
                                <CardDescription>
                                    Complete timeline of all promotions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {promotions.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No promotion history yet
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {promotions.map((promotion, index) => (
                                            <div
                                                key={promotion.id}
                                                className="flex gap-4 pb-4 border-b last:border-b-0"
                                            >
                                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    <TrendingUp className="h-5 w-5 text-green-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <p className="font-medium">
                                                                Promoted from{' '}
                                                                <span className="text-orange-600">
                                                                    {promotion.from_position?.name || 'Unknown'}
                                                                </span>
                                                                {' '}to{' '}
                                                                <span className="text-green-600">
                                                                    {promotion.to_position?.name}
                                                                </span>
                                                            </p>
                                                            <p className="text-sm text-muted-foreground mt-1">
                                                                Promoted by: {promotion.promoted_by?.name}
                                                            </p>
                                                            {promotion.notes && (
                                                                <p className="text-sm text-muted-foreground mt-1">
                                                                    Notes: {promotion.notes}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                                                            {new Date(promotion.promoted_at).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
