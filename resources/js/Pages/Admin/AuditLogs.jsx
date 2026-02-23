import { AppSidebar } from "@/components/app-sidebar"
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Download, Plus, Edit, Trash2, TrendingUp, Activity, LogIn, FileText, Printer } from 'lucide-react';

export default function AuditLogs({ logs, actions, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedAction, setSelectedAction] = useState(filters.action || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');

    // Handle search and filter
    const handleFilter = () => {
        router.get(route('admin.audit-logs.index'), {
            search: searchTerm,
            action: selectedAction,
            date_from: dateFrom,
            date_to: dateTo,
        }, {
            preserveState: true,
        });
    };

    // Handle export CSV
    const handleExportCSV = () => {
        // Create CSV content
        const headers = ['User', 'Email', 'Action', 'Description', 'Timestamp'];
        const rows = logs.data.map(log => [
            log.user?.name || 'Unknown',
            log.user?.email || 'Unknown',
            log.action,
            log.description,
            new Date(log.created_at).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            })
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Handle print
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Audit Logs - ISAT e-TRACES</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    h1 {
                        color: #1a5f3a;
                        text-align: center;
                        margin-bottom: 10px;
                    }
                    .subtitle {
                        text-align: center;
                        color: #666;
                        margin-bottom: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #1a5f3a;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    .action-badge {
                        display: inline-block;
                        padding: 2px 8px;
                        border-radius: 12px;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    .action-create { background-color: #d1fae5; color: #065f46; }
                    .action-update { background-color: #fef3c7; color: #92400e; }
                    .action-delete { background-color: #fee2e2; color: #991b1b; }
                    .action-promote { background-color: #dbeafe; color: #1e40af; }
                    .action-login { background-color: #e9d5ff; color: #6b21a8; }
                    @media print {
                        button { display: none; }
                    }
                </style>
            </head>
            <body>
                <h1>ISAT e-TRACES</h1>
                <div class="subtitle">Audit Logs Report</div>
                <div class="subtitle">Generated: ${new Date().toLocaleString()}</div>
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Action</th>
                            <th>Description</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${logs.data.map(log => `
                            <tr>
                                <td>${log.user?.name || 'Unknown'}</td>
                                <td>${log.user?.email || 'Unknown'}</td>
                                <td><span class="action-badge action-${log.action}">${log.action.charAt(0).toUpperCase() + log.action.slice(1)}</span></td>
                                <td>${log.description}</td>
                                <td>${new Date(log.created_at).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `;
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };

    // Get action color
    const getActionColor = (action) => {
        const colors = {
            create: 'bg-green-100 text-green-700 border-green-200',
            update: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            delete: 'bg-red-100 text-red-700 border-red-200',
            promote: 'bg-blue-100 text-blue-700 border-blue-200',
            login: 'bg-purple-100 text-purple-700 border-purple-200',
        };
        return colors[action] || 'bg-gray-100 text-gray-700 border-gray-200';
    };

    // Get action icon
    const getActionIcon = (action) => {
        const icons = {
            create: Plus,
            update: Edit,
            delete: Trash2,
            promote: TrendingUp,
            login: LogIn,
        };
        const Icon = icons[action] || Activity;
        return <Icon className="h-3 w-3" />;
    };

    return (
        <>
            <Head title="Audit Logs" />
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
                                        <BreadcrumbPage>Audit Logs</BreadcrumbPage>
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
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                                            <FileText className="h-6 w-6 text-green-600" />
                                            Audit Logs
                                        </h2>
                                        <p className="text-sm text-gray-600 mt-1">Track all user actions and system activities</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button 
                                            onClick={handlePrint}
                                            variant="outline"
                                            className="border-green-600 text-green-600 hover:bg-green-50"
                                        >
                                            <Printer className="h-4 w-4 mr-2" />
                                            Print
                                        </Button>
                                        <Button 
                                            onClick={handleExportCSV}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            Export CSV
                                        </Button>
                                    </div>
                                </div>

                                {/* Filters */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                    <div>
                                        <Label htmlFor="search">Search</Label>
                                        <Input
                                            id="search"
                                            placeholder="Name or email..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="action">Action Type</Label>
                                        <Select value={selectedAction || "all"} onValueChange={(value) => {
                                            setSelectedAction(value === "all" ? "" : value);
                                        }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Actions" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Actions</SelectItem>
                                                {actions.map((action) => (
                                                    <SelectItem key={action} value={action}>
                                                        {action.charAt(0).toUpperCase() + action.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="date_from">From Date</Label>
                                        <Input
                                            id="date_from"
                                            type="date"
                                            value={dateFrom}
                                            onChange={(e) => setDateFrom(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="date_to">To Date</Label>
                                        <Input
                                            id="date_to"
                                            type="date"
                                            value={dateTo}
                                            onChange={(e) => setDateTo(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2 mb-6">
                                    <Button onClick={handleFilter} className="bg-green-600 hover:bg-green-700">
                                        <Search className="h-4 w-4 mr-2" />
                                        Apply Filters
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => {
                                            setSearchTerm('');
                                            setSelectedAction('');
                                            setDateFrom('');
                                            setDateTo('');
                                            router.get(route('admin.audit-logs.index'));
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </div>

                                {/* Logs Table */}
                                <div className="rounded-md border overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-50">
                                                <TableHead className="font-semibold">User</TableHead>
                                                <TableHead className="font-semibold">Email</TableHead>
                                                <TableHead className="font-semibold">Action</TableHead>
                                                <TableHead className="font-semibold">Description</TableHead>
                                                <TableHead className="font-semibold">Timestamp</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {logs.data.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                                                        No audit logs found
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                logs.data.map((log) => (
                                                    <TableRow key={log.id} className="hover:bg-gray-50">
                                                        <TableCell className="font-medium">{log.user?.name || 'Unknown'}</TableCell>
                                                        <TableCell className="text-gray-600">{log.user?.email || 'Unknown'}</TableCell>
                                                        <TableCell>
                                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${getActionColor(log.action)}`}>
                                                                {getActionIcon(log.action)}
                                                                {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-sm text-gray-700">{log.description}</TableCell>
                                                        <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                                                            {new Date(log.created_at).toLocaleString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Pagination */}
                                {logs.links.length > 3 && (
                                    <div className="flex justify-center gap-2 mt-6">
                                        {logs.links.map((link, index) => (
                                            <Button
                                                key={index}
                                                variant={link.active ? "default" : "outline"}
                                                size="sm"
                                                disabled={!link.url}
                                                onClick={() => link.url && router.get(link.url)}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className={link.active ? "bg-green-600 hover:bg-green-700" : ""}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
