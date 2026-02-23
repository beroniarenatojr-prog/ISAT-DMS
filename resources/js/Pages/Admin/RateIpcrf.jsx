import { AppSidebar } from "@/components/app-sidebar";
import { Head, router, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { ArrowLeft, Save, User, Award, TrendingUp } from 'lucide-react';

export default function RateIpcrf({ teacher, kras, flash }) {
    // Show flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Form for rating
    const ratingForm = useForm({
        teacher_id: teacher.id,
        rating_period: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
        kra_details: kras.map(kra => ({
            kra_id: kra.id,
            kra_name: kra.name,
            objectives: kra.objectives.map(obj => ({
                objective_id: obj.id,
                objective_code: obj.code,
                objective_description: obj.description,
                rating: 3,
                score: 0,
            })),
            average_rating: 0,
            score: 0,
        })),
        remarks: '',
    });

    // Update objective rating
    const updateObjectiveRating = (kraIndex, objIndex, rating) => {
        const newKraDetails = [...ratingForm.data.kra_details];
        newKraDetails[kraIndex].objectives[objIndex].rating = parseInt(rating);
        
        // Calculate score (rating * weight)
        const weight = kras[kraIndex].objectives[objIndex].weight;
        newKraDetails[kraIndex].objectives[objIndex].score = (parseInt(rating) * weight) / 5;
        
        // Calculate KRA average and score
        const objectives = newKraDetails[kraIndex].objectives;
        const totalScore = objectives.reduce((sum, obj) => sum + obj.score, 0);
        const avgRating = objectives.reduce((sum, obj) => sum + obj.rating, 0) / objectives.length;
        
        newKraDetails[kraIndex].score = totalScore;
        newKraDetails[kraIndex].average_rating = avgRating;
        
        ratingForm.setData('kra_details', newKraDetails);
    };

    // Calculate total score
    const calculateTotalScore = () => {
        return ratingForm.data.kra_details.reduce((sum, kra) => sum + kra.score, 0);
    };

    // Calculate average rating
    const calculateAverageRating = () => {
        const totalObjectives = ratingForm.data.kra_details.reduce(
            (sum, kra) => sum + kra.objectives.length, 
            0
        );
        const totalRating = ratingForm.data.kra_details.reduce(
            (sum, kra) => sum + kra.objectives.reduce((s, obj) => s + obj.rating, 0),
            0
        );
        return totalObjectives > 0 ? (totalRating / totalObjectives).toFixed(2) : '0.00';
    };

    // Get rating description
    const getRatingDescription = (avgRating) => {
        const rating = parseFloat(avgRating);
        if (rating >= 4.5) return { text: 'Outstanding', color: 'text-green-600' };
        if (rating >= 3.5) return { text: 'Very Satisfactory', color: 'text-blue-600' };
        if (rating >= 2.5) return { text: 'Satisfactory', color: 'text-yellow-600' };
        if (rating >= 1.5) return { text: 'Unsatisfactory', color: 'text-orange-600' };
        return { text: 'Poor', color: 'text-red-600' };
    };

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate KRA details
        if (ratingForm.data.kra_details.length === 0) {
            toast.error('Please add at least one KRA rating');
            return;
        }

        ratingForm.post(route('admin.ipcrf.rating.store'), {
            onSuccess: () => {
                toast.success('IPCRF rating saved successfully!');
                router.visit(route('admin.ipcrf.submissions'));
            },
            onError: (errors) => {
                Object.keys(errors).forEach((field) => {
                    const errorMessage = Array.isArray(errors[field]) ? errors[field][0] : errors[field];
                    toast.error(errorMessage);
                });
            },
        });
    };

    const avgRating = calculateAverageRating();
    const ratingDesc = getRatingDescription(avgRating);

    return (
        <>
            <Head title={`Rate IPCRF - ${teacher.name}`} />
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
                                        <BreadcrumbLink href={route('admin.ipcrf.submissions')}>
                                            IPCRF Submissions
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Rate IPCRF</BreadcrumbPage>
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
                            <div className="bg-white rounded-lg shadow">
                                {/* Header */}
                                <div className="border-b bg-gradient-to-r from-green-50 to-blue-50 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Link href={route('admin.ipcrf.submissions')}>
                                                <Button variant="outline" size="sm">
                                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                                    Back
                                                </Button>
                                            </Link>
                                            <div className="h-8 w-px bg-gray-300"></div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">Rate IPCRF</h2>
                                                <p className="text-sm text-gray-600">Individual Performance Commitment and Review Form</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Teacher Info Card */}
                                    <div className="bg-white rounded-lg border-2 border-green-200 p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                                                    <User className="h-5 w-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Teacher</p>
                                                    <p className="text-sm font-bold text-gray-900 mt-0.5">{teacher.name}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                                    <Award className="h-5 w-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Position</p>
                                                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                                                        {teacher.current_position?.name || 'No Position'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                                                    <TrendingUp className="h-5 w-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Division</p>
                                                    <p className="text-sm font-bold text-gray-900 mt-0.5">{teacher.division || '-'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0">
                                                    <User className="h-5 w-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Type</p>
                                                    <p className="text-sm font-bold text-gray-900 mt-0.5">{teacher.teacher_type || '-'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="p-6">
                                    <div className="space-y-6">
                                        {/* Rating Period */}
                                        <div className="bg-gray-50 rounded-lg p-4 border">
                                            <Label htmlFor="rating_period" className="text-sm font-semibold">Rating Period</Label>
                                            <Input
                                                id="rating_period"
                                                value={ratingForm.data.rating_period}
                                                onChange={(e) => ratingForm.setData('rating_period', e.target.value)}
                                                placeholder="e.g., 2024-2025"
                                                required
                                                className="mt-2"
                                            />
                                            {ratingForm.errors.rating_period && (
                                                <p className="text-xs text-red-600 mt-1">{ratingForm.errors.rating_period}</p>
                                            )}
                                        </div>

                                        {/* KRA Ratings */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Key Result Areas (KRAs)</h3>
                                            {ratingForm.data.kra_details.map((kra, kraIndex) => (
                                                <div key={kra.kra_id} className="border-2 border-gray-200 rounded-lg p-5 bg-white hover:border-green-300 transition-colors">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h4 className="font-semibold text-lg text-gray-900">{kra.kra_name}</h4>
                                                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                                                            <span className="text-xs text-gray-600">Avg:</span>
                                                            <span className="text-sm font-bold text-blue-600">
                                                                {kra.average_rating.toFixed(2)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="space-y-3">
                                                        {kra.objectives.map((obj, objIndex) => (
                                                            <div key={obj.objective_id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-600 text-white">
                                                                            {obj.objective_code}
                                                                        </span>
                                                                        <span className="text-xs text-gray-500">
                                                                            Weight: {kras[kraIndex].objectives[objIndex].weight}%
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-sm text-gray-700 leading-relaxed">
                                                                        {obj.objective_description}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-40">
                                                                        <Select
                                                                            value={obj.rating.toString()}
                                                                            onValueChange={(value) => updateObjectiveRating(kraIndex, objIndex, value)}
                                                                        >
                                                                            <SelectTrigger className="h-9">
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="5">5 - Outstanding</SelectItem>
                                                                                <SelectItem value="4">4 - Very Satisfactory</SelectItem>
                                                                                <SelectItem value="3">3 - Satisfactory</SelectItem>
                                                                                <SelectItem value="2">2 - Unsatisfactory</SelectItem>
                                                                                <SelectItem value="1">1 - Poor</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                    <div className="w-20 text-right">
                                                                        <div className="text-xs text-gray-500 mb-1">Score</div>
                                                                        <span className="font-bold text-green-600">{obj.score.toFixed(2)}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    
                                                    <div className="mt-4 pt-4 border-t-2 border-gray-200 flex justify-between items-center bg-blue-50 px-4 py-2 rounded">
                                                        <span className="font-semibold text-gray-700">KRA Total Score:</span>
                                                        <span className="text-xl font-bold text-blue-600">{kra.score.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Summary Cards */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-5">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-1">Total Score</p>
                                                        <p className="text-3xl font-bold text-green-600">{calculateTotalScore().toFixed(2)}</p>
                                                    </div>
                                                    <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center">
                                                        <Award className="h-7 w-7 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-5">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-1">Average Rating</p>
                                                        <p className="text-3xl font-bold text-blue-600">{avgRating}</p>
                                                        <p className={`text-sm font-semibold mt-1 ${ratingDesc.color}`}>
                                                            {ratingDesc.text}
                                                        </p>
                                                    </div>
                                                    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center">
                                                        <TrendingUp className="h-7 w-7 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Remarks */}
                                        <div className="bg-gray-50 rounded-lg p-4 border">
                                            <Label htmlFor="remarks" className="text-sm font-semibold">Remarks (Optional)</Label>
                                            <textarea
                                                id="remarks"
                                                value={ratingForm.data.remarks}
                                                onChange={(e) => ratingForm.setData('remarks', e.target.value)}
                                                rows="4"
                                                className="w-full rounded-md border border-gray-300 p-3 mt-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="Add any remarks, comments, or observations about the teacher's performance..."
                                            />
                                            {ratingForm.errors.remarks && (
                                                <p className="text-xs text-red-600 mt-1">{ratingForm.errors.remarks}</p>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <Link href={route('admin.ipcrf.submissions')}>
                                                <Button type="button" variant="outline">
                                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                                    Cancel
                                                </Button>
                                            </Link>
                                            <Button 
                                                type="submit" 
                                                disabled={ratingForm.processing} 
                                                className="bg-green-600 hover:bg-green-700 px-8"
                                            >
                                                <Save className="h-4 w-4 mr-2" />
                                                {ratingForm.processing ? 'Saving...' : 'Save Rating'}
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
