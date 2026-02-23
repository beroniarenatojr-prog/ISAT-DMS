import { AppSidebar } from "@/components/app-sidebar";
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { 
    Plus, 
    Edit, 
    Trash2, 
    Lock, 
    Unlock, 
    CheckCircle, 
    XCircle,
    Settings,
    AlertCircle,
    Save
} from 'lucide-react';

export default function IpcrfConfiguration({ configurations, currentYear, flash }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [selectedConfig, setSelectedConfig] = useState(null);
    
    const [formData, setFormData] = useState({
        school_year: '',
        kra_count: 4,
        objectives_per_kra: [3, 3, 3, 3],
        notes: '',
    });

    // Show flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const resetForm = () => {
        setFormData({
            school_year: '',
            kra_count: 4,
            objectives_per_kra: [3, 3, 3, 3],
            submission_start_date: '',
            submission_end_date: '',
            notes: '',
        });
    };

    const handleKraCountChange = (count) => {
        const newCount = parseInt(count);
        const newObjectives = Array(newCount).fill(3);
        
        // Preserve existing values if reducing count
        if (newCount < formData.kra_count) {
            for (let i = 0; i < newCount; i++) {
                newObjectives[i] = formData.objectives_per_kra[i] || 3;
            }
        } else {
            // Copy existing values and fill new ones with 3
            for (let i = 0; i < formData.kra_count; i++) {
                newObjectives[i] = formData.objectives_per_kra[i] || 3;
            }
        }
        
        setFormData({
            ...formData,
            kra_count: newCount,
            objectives_per_kra: newObjectives,
        });
    };

    const handleObjectiveChange = (kraIndex, value) => {
        const newObjectives = [...formData.objectives_per_kra];
        newObjectives[kraIndex] = parseInt(value);
        setFormData({
            ...formData,
            objectives_per_kra: newObjectives,
        });
    };

    const openCreateModal = () => {
        resetForm();
        setFormData({
            ...formData,
            school_year: `${currentYear}-${parseInt(currentYear) + 1}`,
        });
        setIsCreateModalOpen(true);
    };

    const openEditModal = (config) => {
        setSelectedConfig(config);
        setFormData({
            school_year: config.school_year,
            kra_count: config.kra_count,
            objectives_per_kra: config.objectives_per_kra,
            submission_start_date: config.submission_start_date || '',
            submission_end_date: config.submission_end_date || '',
            notes: config.notes || '',
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (config) => {
        setSelectedConfig(config);
        setIsDeleteModalOpen(true);
    };

    const openPreviewModal = () => {
        setIsPreviewModalOpen(true);
    };

    const handleCreate = () => {
        router.post(route('admin.ipcrf.configuration.store'), formData, {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                resetForm();
                toast.success('Configuration created successfully!');
            },
            onError: (errors) => {
                Object.keys(errors).forEach((field) => {
                    toast.error(errors[field]);
                });
            },
        });
    };

    const handleUpdate = () => {
        router.put(route('admin.ipcrf.configuration.update', selectedConfig.id), formData, {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setSelectedConfig(null);
                resetForm();
                toast.success('Configuration updated successfully!');
            },
            onError: (errors) => {
                Object.keys(errors).forEach((field) => {
                    toast.error(errors[field]);
                });
            },
        });
    };

    const handleDelete = () => {
        router.delete(route('admin.ipcrf.configuration.destroy', selectedConfig.id), {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setSelectedConfig(null);
                toast.success('Configuration deleted successfully!');
            },
            onError: (errors) => {
                if (typeof errors === 'object') {
                    Object.keys(errors).forEach((field) => {
                        toast.error(errors[field]);
                    });
                }
            },
        });
    };

    const handleToggleActive = (config) => {
        router.post(route('admin.ipcrf.configuration.toggle-active', config.id), {}, {
            onSuccess: () => {
                toast.success(`Configuration ${config.is_active ? 'deactivated' : 'activated'} successfully!`);
            },
            onError: (errors) => {
                if (typeof errors === 'object') {
                    Object.keys(errors).forEach((field) => {
                        toast.error(errors[field]);
                    });
                }
            },
        });
    };

    const handleToggleLock = (config) => {
        router.post(route('admin.ipcrf.configuration.toggle-lock', config.id), {}, {
            onSuccess: () => {
                toast.success(`Configuration ${config.is_locked ? 'unlocked' : 'locked'} successfully!`);
            },
            onError: (errors) => {
                if (typeof errors === 'object') {
                    Object.keys(errors).forEach((field) => {
                        toast.error(errors[field]);
                    });
                }
            },
        });
    };

    const getTotalObjectives = (objectives) => {
        return objectives.reduce((sum, count) => sum + count, 0);
    };

    return (
        <>
            <Head title="IPCRF Configuration" />
            <Toaster />
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4 w-full justify-between">
                            <div className="flex items-center gap-2">
                                <SidebarTrigger className="-ml-1" />
                                <Separator orientation="vertical" className="mr-2 h-4" />
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>IPCRF Configuration</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <Button onClick={openCreateModal} className="bg-green-600 hover:bg-green-700">
                                <Plus className="h-4 w-4 mr-2" />
                                New Configuration
                            </Button>
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
                        <div className="relative z-10 space-y-4">
                            {/* Info Card */}
                            <Card className="border-blue-200 bg-blue-50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-blue-900">
                                        <Settings className="h-5 w-5" />
                                        IPCRF Configuration Management
                                    </CardTitle>
                                    <CardDescription className="text-blue-700">
                                        Configure KRAs and Objectives per school year. Changes are year-specific and won't affect previous records.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            {/* Configurations Table */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>School Year Configurations</CardTitle>
                                    <CardDescription>
                                        Manage KRA and Objective structure for each school year
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {configurations.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Settings className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Configurations Yet</h3>
                                            <p className="text-gray-600 mb-4">Create your first IPCRF configuration to get started.</p>
                                            <Button onClick={openCreateModal} className="bg-green-600 hover:bg-green-700">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Create Configuration
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>School Year</TableHead>
                                                        <TableHead className="text-center">KRAs</TableHead>
                                                        <TableHead className="text-center">Total Objectives</TableHead>
                                                        <TableHead className="text-center">Status</TableHead>
                                                        <TableHead className="text-center">Lock</TableHead>
                                                        <TableHead className="text-right">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {configurations.map((config) => (
                                                        <TableRow key={config.id}>
                                                            <TableCell className="font-medium">
                                                                {config.school_year}
                                                                {config.submission_start_date && config.submission_end_date && (
                                                                    <p className="text-xs text-gray-500 mt-1">
                                                                        Submission: {new Date(config.submission_start_date).toLocaleDateString()} - {new Date(config.submission_end_date).toLocaleDateString()}
                                                                    </p>
                                                                )}
                                                                {config.notes && (
                                                                    <p className="text-xs text-gray-500 mt-1">{config.notes}</p>
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold">
                                                                    {config.kra_count}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold">
                                                                    {getTotalObjectives(config.objectives_per_kra)}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => handleToggleActive(config)}
                                                                    className={config.is_active ? 'border-green-500 text-green-700' : 'border-gray-300'}
                                                                >
                                                                    {config.is_active ? (
                                                                        <>
                                                                            <CheckCircle className="h-3 w-3 mr-1" />
                                                                            Active
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <XCircle className="h-3 w-3 mr-1" />
                                                                            Inactive
                                                                        </>
                                                                    )}
                                                                </Button>
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => handleToggleLock(config)}
                                                                    className={config.is_locked ? 'border-red-500 text-red-700' : 'border-gray-300'}
                                                                >
                                                                    {config.is_locked ? (
                                                                        <>
                                                                            <Lock className="h-3 w-3 mr-1" />
                                                                            Locked
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Unlock className="h-3 w-3 mr-1" />
                                                                            Unlocked
                                                                        </>
                                                                    )}
                                                                </Button>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        onClick={() => openEditModal(config)}
                                                                        disabled={config.is_locked}
                                                                        title={config.is_locked ? 'Configuration is locked' : 'Edit configuration'}
                                                                    >
                                                                        <Edit className="h-3 w-3" />
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        onClick={() => openDeleteModal(config)}
                                                                        disabled={config.is_locked}
                                                                        className="text-red-600 hover:text-red-700"
                                                                        title={config.is_locked ? 'Configuration is locked' : 'Delete configuration'}
                                                                    >
                                                                        <Trash2 className="h-3 w-3" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>

            {/* Create Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Create New Configuration</DialogTitle>
                        <DialogDescription>
                            Set up KRA and Objective structure for a school year
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        {/* School Year */}
                        <div className="space-y-2">
                            <Label htmlFor="school_year">School Year</Label>
                            <Input
                                id="school_year"
                                value={formData.school_year}
                                onChange={(e) => setFormData({ ...formData, school_year: e.target.value })}
                                placeholder="e.g., 2024-2025"
                            />
                        </div>

                        {/* KRA Count */}
                        <div className="space-y-2">
                            <Label htmlFor="kra_count">Number of KRAs</Label>
                            <Input
                                id="kra_count"
                                type="number"
                                min="1"
                                max="10"
                                value={formData.kra_count}
                                onChange={(e) => handleKraCountChange(e.target.value)}
                            />
                        </div>

                        {/* Submission Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="submission_start_date">Submission Start Date</Label>
                                <Input
                                    id="submission_start_date"
                                    type="date"
                                    value={formData.submission_start_date}
                                    onChange={(e) => setFormData({ ...formData, submission_start_date: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="submission_end_date">Submission End Date</Label>
                                <Input
                                    id="submission_end_date"
                                    type="date"
                                    value={formData.submission_end_date}
                                    onChange={(e) => setFormData({ ...formData, submission_end_date: e.target.value })}
                                    min={formData.submission_start_date}
                                />
                            </div>
                        </div>

                        {/* Objectives per KRA */}
                        <div className="space-y-2">
                            <Label>Objectives per KRA</Label>
                            <div className="grid grid-cols-2 gap-3">
                                {Array.from({ length: formData.kra_count }).map((_, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Label className="w-20">KRA {index + 1}:</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="20"
                                            value={formData.objectives_per_kra[index]}
                                            onChange={(e) => handleObjectiveChange(index, e.target.value)}
                                            className="flex-1"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <Textarea
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Add any notes about this configuration..."
                                rows={3}
                            />
                        </div>

                        {/* Preview Button */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={openPreviewModal}
                            className="w-full"
                        >
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Preview Structure
                        </Button>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreate} className="bg-green-600 hover:bg-green-700">
                            <Save className="h-4 w-4 mr-2" />
                            Create Configuration
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Configuration</DialogTitle>
                        <DialogDescription>
                            Modify KRA and Objective structure for {selectedConfig?.school_year}
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        {/* School Year */}
                        <div className="space-y-2">
                            <Label htmlFor="edit_school_year">School Year</Label>
                            <Input
                                id="edit_school_year"
                                value={formData.school_year}
                                onChange={(e) => setFormData({ ...formData, school_year: e.target.value })}
                                placeholder="e.g., 2024-2025"
                            />
                        </div>

                        {/* KRA Count */}
                        <div className="space-y-2">
                            <Label htmlFor="edit_kra_count">Number of KRAs</Label>
                            <Input
                                id="edit_kra_count"
                                type="number"
                                min="1"
                                max="10"
                                value={formData.kra_count}
                                onChange={(e) => handleKraCountChange(e.target.value)}
                            />
                        </div>

                        {/* Submission Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit_submission_start_date">Submission Start Date</Label>
                                <Input
                                    id="edit_submission_start_date"
                                    type="date"
                                    value={formData.submission_start_date}
                                    onChange={(e) => setFormData({ ...formData, submission_start_date: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit_submission_end_date">Submission End Date</Label>
                                <Input
                                    id="edit_submission_end_date"
                                    type="date"
                                    value={formData.submission_end_date}
                                    onChange={(e) => setFormData({ ...formData, submission_end_date: e.target.value })}
                                    min={formData.submission_start_date}
                                />
                            </div>
                        </div>

                        {/* Objectives per KRA */}
                        <div className="space-y-2">
                            <Label>Objectives per KRA</Label>
                            <div className="grid grid-cols-2 gap-3">
                                {Array.from({ length: formData.kra_count }).map((_, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Label className="w-20">KRA {index + 1}:</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="20"
                                            value={formData.objectives_per_kra[index]}
                                            onChange={(e) => handleObjectiveChange(index, e.target.value)}
                                            className="flex-1"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <Label htmlFor="edit_notes">Notes (Optional)</Label>
                            <Textarea
                                id="edit_notes"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Add any notes about this configuration..."
                                rows={3}
                            />
                        </div>

                        {/* Preview Button */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={openPreviewModal}
                            className="w-full"
                        >
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Preview Structure
                        </Button>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700">
                            <Save className="h-4 w-4 mr-2" />
                            Update Configuration
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Configuration</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the configuration for {selectedConfig?.school_year}?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-red-800">
                                <p className="font-semibold mb-1">Warning</p>
                                <p>This configuration will be permanently deleted. Make sure no submissions exist for this school year.</p>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Configuration
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Preview Modal */}
            <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Configuration Preview</DialogTitle>
                        <DialogDescription>
                            Preview of the KRA and Objective structure for {formData.school_year}
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        {/* Summary */}
                        <div className="grid grid-cols-3 gap-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-1">Total KRAs</p>
                                        <p className="text-3xl font-bold text-blue-600">{formData.kra_count}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-1">Total Objectives</p>
                                        <p className="text-3xl font-bold text-purple-600">
                                            {getTotalObjectives(formData.objectives_per_kra)}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-1">Avg per KRA</p>
                                        <p className="text-3xl font-bold text-green-600">
                                            {(getTotalObjectives(formData.objectives_per_kra) / formData.kra_count).toFixed(1)}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Structure */}
                        <div className="space-y-3">
                            {Array.from({ length: formData.kra_count }).map((_, kraIndex) => (
                                <Card key={kraIndex} className="border-2">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base flex items-center justify-between">
                                            <span>KRA {kraIndex + 1}</span>
                                            <span className="text-sm font-normal text-gray-600">
                                                {formData.objectives_per_kra[kraIndex]} Objectives
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-4 gap-2">
                                            {Array.from({ length: formData.objectives_per_kra[kraIndex] }).map((_, objIndex) => (
                                                <div
                                                    key={objIndex}
                                                    className="bg-gray-100 rounded-lg p-2 text-center text-sm font-medium text-gray-700"
                                                >
                                                    Obj {objIndex + 1}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setIsPreviewModalOpen(false)}>
                            Close Preview
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
