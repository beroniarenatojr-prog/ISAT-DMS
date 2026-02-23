import { AppSidebar } from "@/components/app-sidebar";
import { Head, router, useForm } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Search, Plus, Eye, FileDown, ChevronDown, ChevronUp } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function IpcrfSubmissions({ teachers, availableYears, kras, filters, flash }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [selectedYear, setSelectedYear] = useState(filters.year || '');
    const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(null);
    const [expandedRows, setExpandedRows] = useState([]);

    // Show flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Handle search
    const handleSearch = () => {
        router.get(route('admin.ipcrf.submissions'), {
            search: searchTerm,
            status: selectedStatus,
            year: selectedYear,
        }, {
            preserveState: true,
        });
    };

    // Get status badge color
    const getStatusBadge = (status) => {
        const colors = {
            draft: 'bg-gray-100 text-gray-800',
            submitted: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
        };
        return colors[status] || colors.draft;
    };

    // Get rating equivalency
    const getRatingEquivalency = (rating) => {
        const numRating = Number(rating);
        if (numRating >= 4.5) return 'Outstanding';
        if (numRating >= 3.5) return 'Very Satisfactory';
        if (numRating >= 2.5) return 'Satisfactory';
        if (numRating >= 1.5) return 'Unsatisfactory';
        return 'Poor';
    };

    // Get rating color
    const getRatingColor = (rating) => {
        const numRating = Number(rating);
        if (numRating >= 4.5) return 'text-purple-600 bg-purple-50';
        if (numRating >= 3.5) return 'text-green-600 bg-green-50';
        if (numRating >= 2.5) return 'text-blue-600 bg-blue-50';
        if (numRating >= 1.5) return 'text-orange-600 bg-orange-50';
        return 'text-red-600 bg-red-50';
    };

    // Toggle row expansion
    const toggleRowExpansion = (teacherId) => {
        setExpandedRows(prev => 
            prev.includes(teacherId) 
                ? prev.filter(id => id !== teacherId)
                : [...prev, teacherId]
        );
    };

    // View rating details
    const viewRatingDetails = (rating) => {
        setSelectedRating(rating);
        setIsViewDetailsModalOpen(true);
    };

    // Export rating to PDF in official IPCRF format
    const exportRatingToPDF = () => {
        if (!selectedRating) return;

        try {
            console.log('Exporting rating to PDF:', selectedRating);
            
            // Create PDF in landscape orientation
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'legal'
            });

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            
            // Pink/salmon background color
            doc.setFillColor(255, 192, 203);
            doc.rect(0, 0, pageWidth, pageHeight, 'F');

            // Add logos
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text('DepEd', 15, 15);
            doc.text('BHROD', pageWidth - 25, 15);

            // Title section
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Official Electronic IPCRF Tool v4.3', pageWidth / 2, 12, { align: 'center' });
            doc.text('Highly Proficient Regular Teacher', pageWidth / 2, 17, { align: 'center' });
            doc.text(`SY ${selectedRating.rating_period || '2024-2025'}`, pageWidth / 2, 22, { align: 'center' });
            doc.setFontSize(11);
            doc.text('PART 1: INDIVIDUAL PERFORMANCE COMMITMENT AND REVIEW FORM', pageWidth / 2, 28, { align: 'center' });

            // Privacy notice
            doc.setFontSize(7);
            doc.setFont('helvetica', 'bold');
            doc.text('PRIVACY NOTICE:', 10, 35);
            doc.setFont('helvetica', 'normal');
            const privacyText = 'By using this tool, you agree to authorize the Department of Education to collect, process, retain, and dispose of your personal information in accordance with the Data Privacy Act of 2012.';
            doc.text(privacyText, 10, 38, { maxWidth: pageWidth - 20 });

            // Instructions
            doc.setFont('helvetica', 'bold');
            doc.text('INSTRUCTIONS:', 10, 45);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(6);
            const instructions = 'Part 1 shall be accomplished by the Rater during the Phase III: Performance Review and Evaluation of the RPMS Cycle. Fill in empty cells (white) with needed information about the rater and approving authority.';
            doc.text(instructions, 10, 48, { maxWidth: pageWidth - 20 });

            // Find teacher from the list
            const teacher = teachers.data.find(t => t.ipcrf_ratings?.some(r => r.id === selectedRating.id));

            // Employee information table
            const employeeData = [
                [
                    { content: 'Name of Employee:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: teacher?.name || '', colSpan: 2, styles: { fillColor: [255, 255, 255] } },
                    { content: 'RATER Last Name:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: '', styles: { fillColor: [255, 255, 255] } },
                    { content: 'First:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: '', styles: { fillColor: [255, 255, 255] } },
                    { content: 'Middle:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: '', styles: { fillColor: [255, 255, 255] } }
                ],
                [
                    { content: 'Position:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: teacher?.current_position?.name || 'Master Teacher II', colSpan: 2, styles: { fillColor: [255, 255, 255] } },
                    { content: 'Position:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: 'Principal IV', styles: { fillColor: [255, 255, 255] } },
                    { content: 'DepEd Email:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: '', colSpan: 2, styles: { fillColor: [255, 255, 255] } }
                ],
                [
                    { content: 'Bureau/Center/Service/Division:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: 'ISABELA SCHOOL OF ARTS AND TRADES - Ilagan Campus', colSpan: 2, styles: { fillColor: [255, 255, 255] } },
                    { content: 'Date of Review:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }), colSpan: 4, styles: { fillColor: [255, 255, 255] } }
                ],
                [
                    { content: 'Rating Period:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: `SY ${selectedRating.rating_period || '2024-2025'}`, colSpan: 7, styles: { fillColor: [255, 255, 255] } }
                ]
            ];

            autoTable(doc, {
                startY: 55,
                body: employeeData,
                theme: 'grid',
                styles: {
                    fontSize: 7,
                    cellPadding: 2,
                    lineColor: [0, 0, 0],
                    lineWidth: 0.1
                },
                columnStyles: {
                    0: { cellWidth: 45 },
                    1: { cellWidth: 35 },
                    2: { cellWidth: 35 },
                    3: { cellWidth: 35 },
                    4: { cellWidth: 30 },
                    5: { cellWidth: 20 },
                    6: { cellWidth: 30 },
                    7: { cellWidth: 25 }
                }
            });

            // Main IPCRF table
            let currentY = doc.lastAutoTable.finalY + 3;

            // Table headers
            const headers = [
                [
                    { content: 'KRA', rowSpan: 3, styles: { halign: 'center', valign: 'middle', fillColor: [144, 238, 144] } },
                    { content: 'Objective\nNo.', rowSpan: 3, styles: { halign: 'center', valign: 'middle', fillColor: [144, 238, 144] } },
                    { content: 'PPST', rowSpan: 3, styles: { halign: 'center', valign: 'middle', fillColor: [144, 238, 144] } },
                    { content: 'COI/NCOI', rowSpan: 3, styles: { halign: 'center', valign: 'middle', fillColor: [144, 238, 144] } },
                    { content: 'Weight\nper\nObjective', rowSpan: 3, styles: { halign: 'center', valign: 'middle', fillColor: [144, 238, 144] } },
                    { content: 'COT\nIndicator\nNo.', rowSpan: 3, styles: { halign: 'center', valign: 'middle', fillColor: [144, 238, 144] } },
                    { content: 'COT 1', colSpan: 2, styles: { halign: 'center', fillColor: [255, 192, 203] } },
                    { content: 'COT 2', colSpan: 2, styles: { halign: 'center', fillColor: [255, 192, 203] } },
                    { content: 'COT 3', colSpan: 2, styles: { halign: 'center', fillColor: [255, 192, 203] } },
                    { content: 'COT 4', colSpan: 2, styles: { halign: 'center', fillColor: [255, 192, 203] } },
                    { content: 'Ave', rowSpan: 3, styles: { halign: 'center', valign: 'middle', fillColor: [144, 238, 144] } },
                    { content: 'IPCRF Numerical Ratings', colSpan: 4, styles: { halign: 'center', fillColor: [144, 238, 144] } },
                    { content: 'Score', rowSpan: 3, styles: { halign: 'center', valign: 'middle', fillColor: [144, 238, 144] } },
                    { content: 'Adjectival\nRating', rowSpan: 3, styles: { halign: 'center', valign: 'middle', fillColor: [144, 238, 144] } }
                ],
                [
                    { content: 'Rating', styles: { halign: 'center', fillColor: [255, 192, 203] } },
                    { content: 'RPMS 5-pt', styles: { halign: 'center', fillColor: [255, 192, 203] } },
                    { content: 'Rating', styles: { halign: 'center', fillColor: [255, 192, 203] } },
                    { content: 'RPMS 5-pt', styles: { halign: 'center', fillColor: [255, 192, 203] } },
                    { content: 'Rating', styles: { halign: 'center', fillColor: [255, 192, 203] } },
                    { content: 'RPMS 5-pt', styles: { halign: 'center', fillColor: [255, 192, 203] } },
                    { content: 'Rating', styles: { halign: 'center', fillColor: [255, 192, 203] } },
                    { content: 'RPMS 5-pt', styles: { halign: 'center', fillColor: [255, 192, 203] } },
                    { content: 'Q', styles: { halign: 'center', fillColor: [144, 238, 144] } },
                    { content: 'E', styles: { halign: 'center', fillColor: [144, 238, 144] } },
                    { content: 'T', styles: { halign: 'center', fillColor: [144, 238, 144] } },
                    { content: 'Ave', styles: { halign: 'center', fillColor: [144, 238, 144] } }
                ]
            ];

            // Get rating description
            const getRatingDescription = (rating) => {
                const numRating = Number(rating);
                if (numRating >= 4.5) return 'Outstanding';
                if (numRating >= 3.5) return 'Very Satisfactory';
                if (numRating >= 2.5) return 'Satisfactory';
                if (numRating >= 1.5) return 'Unsatisfactory';
                return 'Poor';
            };

            // Build data rows from KRA details
            const dataRows = [];
            if (selectedRating.kra_details) {
                selectedRating.kra_details.forEach((kra, kraIndex) => {
                    if (kra.objectives) {
                        kra.objectives.forEach((obj, objIndex) => {
                            const rating = Number(obj.rating) || 0;
                            const score = Number(obj.score) || 0;
                            
                            dataRows.push([
                                (kraIndex + 1).toString(),
                                (objIndex + 1).toString(),
                                obj.objective_code || '',
                                'COI',
                                '7.14%',
                                '',
                                '', '', '', '', '', '', '', '',
                                rating ? rating.toFixed(3) : '',
                                rating || '',
                                rating || '',
                                rating || '',
                                rating ? rating.toFixed(3) : '',
                                score ? score.toFixed(3) : '',
                                rating ? getRatingDescription(rating) : ''
                            ]);
                        });
                    }
                });
            }

            autoTable(doc, {
                startY: currentY,
                head: headers,
                body: dataRows,
                theme: 'grid',
                styles: {
                    fontSize: 6,
                    cellPadding: 1,
                    lineColor: [0, 0, 0],
                    lineWidth: 0.1,
                    halign: 'center',
                    valign: 'middle'
                },
                headStyles: {
                    fillColor: [144, 238, 144],
                    textColor: [0, 0, 0],
                    fontStyle: 'bold'
                }
            });

            // Footer section
            currentY = doc.lastAutoTable.finalY;
            
            const footerData = [
                [
                    { content: 'Date Observed:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: new Date().toLocaleDateString('en-US'), styles: { fillColor: [255, 255, 255] } },
                    { content: '', colSpan: 2, styles: { fillColor: [255, 192, 203] } },
                    { content: 'Final Rating', styles: { fontStyle: 'bold', fillColor: [144, 238, 144] } },
                    { content: selectedRating.numerical_rating ? Number(selectedRating.numerical_rating).toFixed(3) : '', styles: { fillColor: [255, 255, 255] } }
                ],
                [
                    { content: 'COT Status:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: '✓', styles: { fillColor: [255, 255, 255] } },
                    { content: '', colSpan: 2, styles: { fillColor: [255, 192, 203] } },
                    { content: 'Adjectival Rating', styles: { fontStyle: 'bold', fillColor: [144, 238, 144] } },
                    { content: selectedRating.numerical_rating ? getRatingDescription(selectedRating.numerical_rating) : '', styles: { fillColor: [255, 255, 255] } }
                ]
            ];

            autoTable(doc, {
                startY: currentY,
                body: footerData,
                theme: 'grid',
                styles: {
                    fontSize: 7,
                    cellPadding: 2,
                    lineColor: [0, 0, 0],
                    lineWidth: 0.1
                }
            });

            // Signature section
            currentY = doc.lastAutoTable.finalY + 5;
            
            const signatureData = [
                [
                    { content: 'Rater', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: 'Approving Authority', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: '', colSpan: 2, styles: { fillColor: [255, 192, 203] } }
                ],
                [
                    { content: '', styles: { fillColor: [255, 255, 255] } },
                    { content: '', styles: { halign: 'center', fontStyle: 'bold', fillColor: [255, 255, 255] } },
                    { content: 'Last:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: '', styles: { fillColor: [255, 255, 255] } },
                    { content: 'First:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: '', styles: { fillColor: [255, 255, 255] } }
                ],
                [
                    { content: '', styles: { fillColor: [255, 192, 203] } },
                    { content: 'Principal IV', styles: { halign: 'center', fontStyle: 'italic', fillColor: [255, 255, 255] } },
                    { content: 'Position:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: 'Schools Division Superintendent', styles: { fillColor: [255, 255, 255] } },
                    { content: 'Middle:', styles: { fontStyle: 'bold', fillColor: [255, 192, 203] } },
                    { content: '', styles: { fillColor: [255, 255, 255] } }
                ]
            ];

            autoTable(doc, {
                startY: currentY,
                body: signatureData,
                theme: 'grid',
                styles: {
                    fontSize: 7,
                    cellPadding: 3,
                    lineColor: [0, 0, 0],
                    lineWidth: 0.1
                }
            });

            // Save the PDF
            const fileName = `IPCRF_${teacher?.name.replace(/\s+/g, '_') || 'Teacher'}_${selectedRating.rating_period}_${new Date().toISOString().split('T')[0]}.pdf`;
            console.log('Saving PDF as:', fileName);
            doc.save(fileName);
            
            toast.success('PDF exported successfully!');
        } catch (error) {
            console.error('Error exporting PDF:', error);
            toast.error('Failed to export PDF: ' + error.message);
        }
    };

    return (
        <>
            <Head title="IPCRF Submissions" />
            <Toaster />
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
                                        <BreadcrumbPage>IPCRF Submissions</BreadcrumbPage>
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

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-semibold mb-6">IPCRF Submissions</h2>
                                
                                {/* Search and Filter Section */}
                                <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
                                    <div className="flex-1">
                                        <Label htmlFor="search">Search by Teacher Name</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="search"
                                                placeholder="Search teachers..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                            />
                                            <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                                                <Search className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    <div className="w-full md:w-48">
                                        <Label htmlFor="status">Filter by Status</Label>
                                        <Select value={selectedStatus || "all"} onValueChange={(value) => {
                                            const filterValue = value === "all" ? "" : value;
                                            setSelectedStatus(filterValue);
                                            router.get(route('admin.ipcrf.submissions'), {
                                                search: searchTerm,
                                                status: filterValue,
                                                year: selectedYear,
                                            }, {
                                                preserveState: true,
                                            });
                                        }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Status</SelectItem>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="submitted">Submitted</SelectItem>
                                                <SelectItem value="approved">Approved</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="w-full md:w-48">
                                        <Label htmlFor="year">Filter by Year</Label>
                                        <Select value={selectedYear || "all"} onValueChange={(value) => {
                                            const filterValue = value === "all" ? "" : value;
                                            setSelectedYear(filterValue);
                                            router.get(route('admin.ipcrf.submissions'), {
                                                search: searchTerm,
                                                status: selectedStatus,
                                                year: filterValue,
                                            }, {
                                                preserveState: true,
                                            });
                                        }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Years" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Years</SelectItem>
                                                {availableYears.map((year) => (
                                                    <SelectItem key={year} value={year}>
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Teachers Table */}
                                <div className="rounded-md border overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-12"></TableHead>
                                                <TableHead>Teacher Name</TableHead>
                                                <TableHead>Position</TableHead>
                                                <TableHead className="text-center">Rating</TableHead>
                                                <TableHead className="text-center">Equivalency</TableHead>
                                                <TableHead className="text-center">Year</TableHead>
                                                <TableHead className="text-center">Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {teachers.data.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                                                        No teachers found
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                teachers.data.map((teacher) => {
                                                    const latestRating = teacher.ipcrf_ratings?.[0];
                                                    const isExpanded = expandedRows.includes(teacher.id);
                                                    
                                                    return (
                                                        <React.Fragment key={teacher.id}>
                                                            <TableRow>
                                                                <TableCell>
                                                                    {teacher.ipcrf_ratings?.length > 0 && (
                                                                        <Button
                                                                            size="sm"
                                                                            variant="ghost"
                                                                            className="h-6 w-6 p-0"
                                                                            onClick={() => toggleRowExpansion(teacher.id)}
                                                                        >
                                                                            {isExpanded ? (
                                                                                <ChevronUp className="h-4 w-4" />
                                                                            ) : (
                                                                                <ChevronDown className="h-4 w-4" />
                                                                            )}
                                                                        </Button>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell className="font-medium">{teacher.name}</TableCell>
                                                                <TableCell>
                                                                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700">
                                                                        {teacher.current_position?.name || 'No Position'}
                                                                    </span>
                                                                </TableCell>
                                                                <TableCell className="text-center">
                                                                    {latestRating ? (
                                                                        <span className="font-semibold text-lg">
                                                                            {latestRating.numerical_rating ? Number(latestRating.numerical_rating).toFixed(2) : 'N/A'}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-gray-400 text-sm">No rating</span>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell className="text-center">
                                                                    {latestRating?.numerical_rating ? (
                                                                        <span className={`inline-flex px-3 py-1 text-xs font-bold rounded ${getRatingColor(latestRating.numerical_rating)}`}>
                                                                            {getRatingEquivalency(latestRating.numerical_rating)}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-gray-400 text-sm">-</span>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell className="text-center">
                                                                    {latestRating?.rating_period || '-'}
                                                                </TableCell>
                                                                <TableCell className="text-center">
                                                                    {latestRating ? (
                                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getStatusBadge(latestRating.status)}`}>
                                                                            {latestRating.status}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-gray-400 text-sm">-</span>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    <div className="flex gap-2 justify-end">
                                                                        <Button
                                                                            size="sm"
                                                                            className="bg-green-600 hover:bg-green-700"
                                                                            onClick={() => router.visit(route('admin.ipcrf.rate', teacher.id))}
                                                                        >
                                                                            <Plus className="h-3 w-3 mr-1" />
                                                                            Rate
                                                                        </Button>
                                                                        {latestRating && (
                                                                            <Button
                                                                                size="sm"
                                                                                variant="outline"
                                                                                onClick={() => viewRatingDetails(latestRating)}
                                                                            >
                                                                                <Eye className="h-3 w-3 mr-1" />
                                                                                View
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                            
                                                            {/* Expanded Row - Show all ratings */}
                                                            {isExpanded && teacher.ipcrf_ratings?.length > 0 && (
                                                                <TableRow>
                                                                    <TableCell colSpan={8} className="bg-gray-50">
                                                                        <div className="p-4">
                                                                            <h4 className="font-semibold mb-3">Rating History</h4>
                                                                            <div className="space-y-2">
                                                                                {teacher.ipcrf_ratings.map((rating) => (
                                                                                    <div key={rating.id} className="flex items-center justify-between p-3 bg-white rounded border">
                                                                                        <div className="flex items-center gap-4">
                                                                                            <span className="font-medium">{rating.rating_period}</span>
                                                                                            <span className="text-lg font-semibold text-blue-600">
                                                                                                {rating.numerical_rating ? Number(rating.numerical_rating).toFixed(2) : 'N/A'}
                                                                                            </span>
                                                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getStatusBadge(rating.status)}`}>
                                                                                                {rating.status}
                                                                                            </span>
                                                                                        </div>
                                                                                        <Button
                                                                                            size="sm"
                                                                                            variant="outline"
                                                                                            onClick={() => viewRatingDetails(rating)}
                                                                                        >
                                                                                            <Eye className="h-3 w-3 mr-1" />
                                                                                            View Details
                                                                                        </Button>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )}
                                                        </React.Fragment>
                                                    );
                                                })
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Pagination */}
                                {teachers.links.length > 3 && (
                                    <div className="flex justify-center gap-2 mt-4">
                                        {teachers.links.map((link, index) => (
                                            <Button
                                                key={index}
                                                variant={link.active ? "default" : "outline"}
                                                size="sm"
                                                disabled={!link.url}
                                                onClick={() => link.url && router.get(link.url)}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>

            {/* View Details Modal */}
            <Dialog open={isViewDetailsModalOpen} onOpenChange={setIsViewDetailsModalOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>IPCRF Rating Details</DialogTitle>
                        <DialogDescription>
                            Rating Period: {selectedRating?.rating_period}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedRating && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className={`p-4 rounded-lg ${getRatingColor(selectedRating.numerical_rating)}`}>
                                    <p className="text-sm font-medium opacity-80">Rating Equivalency</p>
                                    <p className="text-2xl font-bold mt-1">
                                        {selectedRating.numerical_rating ? getRatingEquivalency(selectedRating.numerical_rating) : 'N/A'}
                                    </p>
                                    <p className="text-sm font-medium mt-1 opacity-70">
                                        ({selectedRating.numerical_rating ? Number(selectedRating.numerical_rating).toFixed(2) : 'N/A'})
                                    </p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Total Score</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {selectedRating.total_score ? Number(selectedRating.total_score).toFixed(2) : 'N/A'}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Status</p>
                                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded mt-2 ${getStatusBadge(selectedRating.status)}`}>
                                        {selectedRating.status}
                                    </span>
                                </div>
                            </div>

                            {/* KRA Details */}
                            {selectedRating.kra_details?.map((kra, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <h3 className="font-semibold text-lg mb-3">{kra.kra_name}</h3>
                                    <div className="space-y-2">
                                        {kra.objectives?.map((obj, objIndex) => (
                                            <div key={objIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                <div className="flex-1">
                                                    <span className="font-medium text-sm text-blue-600">{obj.objective_code}</span>
                                                    <p className="text-sm text-gray-600">{obj.objective_description}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className="text-xs text-gray-500">Rating</p>
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getRatingColor(obj.rating)}`}>
                                                            {obj.rating ? getRatingEquivalency(obj.rating) : 'N/A'}
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xs text-gray-500">Score</p>
                                                        <span className="font-semibold text-sm">{obj.score ? Number(obj.score).toFixed(2) : 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 pt-3 border-t flex justify-between items-center">
                                        <span className="font-semibold">KRA Average:</span>
                                        <div className="text-right">
                                            <span className={`inline-flex px-3 py-1 text-sm font-bold rounded ${getRatingColor(kra.average_rating)}`}>
                                                {kra.average_rating ? getRatingEquivalency(kra.average_rating) : 'N/A'}
                                            </span>
                                            <p className="text-xs text-gray-500 mt-1">
                                                ({kra.average_rating ? Number(kra.average_rating).toFixed(2) : 'N/A'})
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {selectedRating.remarks && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Remarks:</p>
                                    <p className="text-sm text-gray-600">{selectedRating.remarks}</p>
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsViewDetailsModalOpen(false)}>
                            Close
                        </Button>
                        <Button 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={exportRatingToPDF}
                        >
                            <FileDown className="h-4 w-4 mr-2" />
                            Export PDF
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
