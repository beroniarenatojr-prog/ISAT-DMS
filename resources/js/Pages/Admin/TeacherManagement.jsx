import { AppSidebar } from "@/components/app-sidebar"
import { Head, router, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Plus, Edit, Trash2, TrendingUp, History, MoreVertical, Calendar, Award, CheckCircle2, User, Briefcase, Mail, Phone, MapPin, Building, IdCard } from 'lucide-react';
import { Toaster } from "@/components/ui/sonner"

export default function TeacherManagement({ teachers, positions, filters, flash }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedPosition, setSelectedPosition] = useState(filters.position || '');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [openMenuRow, setOpenMenuRow] = useState(null);
    const [promotionHistory, setPromotionHistory] = useState([]);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuRow(null);
            }
        };

        if (openMenuRow !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenuRow]);

    // Show flash messages as toasts
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Form for creating teacher
    const createForm = useForm({
        name: '',
        email: '',
        password: '',
        career_stage: '',
        current_position_id: '',
        department: '',
        teacher_status: '',
    });

    // Form for editing teacher
    const editForm = useForm({
        name: '',
        email: '',
        department: '',
        teacher_status: '',
    });

    // Form for promotion
    const promoteForm = useForm({
        to_position_id: '',
        career_stage: '',
        notes: '',
    });

    // Handle search
    const handleSearch = () => {
        router.get(route('admin.teachers.index'), {
            search: searchTerm,
            position: selectedPosition,
        }, {
            preserveState: true,
        });
    };

    // Handle create teacher
    const handleCreate = (e) => {
        e.preventDefault();
        createForm.post(route('admin.teachers.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
                toast.success('Teacher created successfully!');
            },
            onError: (errors) => {
                // Display specific validation errors
                Object.keys(errors).forEach((field) => {
                    const errorMessage = Array.isArray(errors[field]) ? errors[field][0] : errors[field];
                    toast.error(errorMessage);
                });
            },
        });
    };

    // Handle edit teacher
    const handleEdit = (e) => {
        e.preventDefault();
        editForm.put(route('admin.teachers.update', selectedTeacher.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                editForm.reset();
                setSelectedTeacher(null);
                toast.success('Teacher updated successfully!');
            },
            onError: (errors) => {
                // Display specific validation errors
                Object.keys(errors).forEach((field) => {
                    const errorMessage = Array.isArray(errors[field]) ? errors[field][0] : errors[field];
                    toast.error(errorMessage);
                });
            },
        });
    };

    // Handle delete teacher
    const handleDelete = () => {
        router.delete(route('admin.teachers.destroy', selectedTeacher.id), {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setSelectedTeacher(null);
            },
            onError: () => {
                toast.error('Failed to delete teacher. Please try again.');
            },
        });
    };

    // Handle promote teacher
    const handlePromote = (e) => {
        e.preventDefault();
        promoteForm.post(route('admin.teachers.promote', selectedTeacher.id), {
            onSuccess: () => {
                setIsPromoteModalOpen(false);
                promoteForm.reset();
                setSelectedTeacher(null);
                toast.success('Teacher promoted successfully!');
            },
            onError: (errors) => {
                // Display specific validation errors
                Object.keys(errors).forEach((field) => {
                    const errorMessage = Array.isArray(errors[field]) ? errors[field][0] : errors[field];
                    toast.error(errorMessage);
                });
            },
        });
    };

    // Open edit modal
    const openEditModal = (teacher) => {
        setSelectedTeacher(teacher);
        editForm.setData({
            name: teacher.name,
            email: teacher.email,
            department: teacher.department || '',
            teacher_status: teacher.teacher_type || '',
        });
        setIsEditModalOpen(true);
    };

    // Open delete modal
    const openDeleteModal = (teacher) => {
        setSelectedTeacher(teacher);
        setIsDeleteModalOpen(true);
    };

    // Open promote modal
    const openPromoteModal = (teacher) => {
        setSelectedTeacher(teacher);
        promoteForm.setData({
            to_position_id: '',
            career_stage: '',
            notes: '',
        });
        setIsPromoteModalOpen(true);
    };

    // Open history modal
    const openHistoryModal = (teacher) => {
        setSelectedTeacher(teacher);
        // Fetch promotion history
        fetch(route('admin.teachers.promotions.data', teacher.id))
            .then(res => res.json())
            .then(data => {
                setPromotionHistory(data);
                setIsHistoryModalOpen(true);
            })
            .catch(() => {
                toast.error('Failed to load promotion history.');
            });
    };

    // Open profile modal
    const openProfileModal = (teacher) => {
        setSelectedTeacher(teacher);
        setIsProfileModalOpen(true);
    };

    // Get next position name
    const getNextPosition = (currentPosition) => {
        if (!currentPosition) return null;
        const currentOrder = currentPosition.order;
        const nextPos = positions.find(p => p.order === currentOrder + 1);
        return nextPos;
    };

    // Check if teacher can be promoted
    const canPromote = (teacher) => {
        if (!teacher.current_position) return false;
        const maxOrder = Math.max(...positions.map(p => p.order));
        return teacher.current_position.order < maxOrder;
    };

    return (
        <>
            <Head title="Teacher Management" />
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
                                        <BreadcrumbPage>Teacher Management</BreadcrumbPage>
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
                                <h2 className="text-2xl font-semibold mb-6">Teacher Management</h2>
                                
                                {/* Search and Filter Section */}
                                <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
                            <div className="flex-1">
                                <Label htmlFor="search">Search by Name</Label>
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
                                <Label htmlFor="position">Filter by Position</Label>
                                <Select value={selectedPosition || "all"} onValueChange={(value) => {
                                    const filterValue = value === "all" ? "" : value;
                                    setSelectedPosition(filterValue);
                                    router.get(route('admin.teachers.index'), {
                                        search: searchTerm,
                                        position: filterValue,
                                    }, {
                                        preserveState: true,
                                    });
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Positions" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Positions</SelectItem>
                                        {positions.map((position) => (
                                            <SelectItem key={position.id} value={position.id.toString()}>
                                                {position.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button onClick={() => setIsCreateModalOpen(true)} className="bg-green-600 hover:bg-green-700">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Teacher
                            </Button>
                        </div>

                        {/* Teachers Table */}
                        <div className="rounded-md border overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Career Stage</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teachers.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                                                No teachers found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        teachers.data.map((teacher) => (
                                            <TableRow key={teacher.id}>
                                                <TableCell className="font-medium">{teacher.name}</TableCell>
                                                <TableCell>{teacher.email}</TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700">
                                                        {teacher.position_range || 'No Position'}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700">
                                                        {teacher.career_stage || '-'}
                                                    </span>
                                                </TableCell>
                                                <TableCell>{teacher.department || '-'}</TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-purple-50 text-purple-700">
                                                        {teacher.teacher_type || '-'}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="relative inline-block" ref={openMenuRow === teacher.id ? menuRef : null}>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0"
                                                            onClick={() => setOpenMenuRow(openMenuRow === teacher.id ? null : teacher.id)}
                                                        >
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                        
                                                        {/* Dropdown menu that appears on click */}
                                                        {openMenuRow === teacher.id && (
                                                            <div className="absolute right-0 top-0 flex flex-row gap-1 bg-white border rounded-md shadow-lg p-1 z-10">
                                                                <Button
                                                                    size="sm"
                                                                    className="bg-purple-600 hover:bg-purple-700 w-8 h-8 p-0"
                                                                    onClick={() => {
                                                                        openProfileModal(teacher);
                                                                        setOpenMenuRow(null);
                                                                    }}
                                                                    title="View Profile"
                                                                >
                                                                    <IdCard className="h-3 w-3" />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    className="bg-green-600 hover:bg-green-700 w-8 h-8 p-0"
                                                                    onClick={() => {
                                                                        openPromoteModal(teacher);
                                                                        setOpenMenuRow(null);
                                                                    }}
                                                                    title="Promote"
                                                                >
                                                                    <TrendingUp className="h-3 w-3" />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    className="bg-blue-600 hover:bg-blue-700 w-8 h-8 p-0"
                                                                    onClick={() => {
                                                                        openHistoryModal(teacher);
                                                                        setOpenMenuRow(null);
                                                                    }}
                                                                    title="History"
                                                                >
                                                                    <History className="h-3 w-3" />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    className="bg-yellow-600 hover:bg-yellow-700 w-8 h-8 p-0"
                                                                    onClick={() => {
                                                                        openEditModal(teacher);
                                                                        setOpenMenuRow(null);
                                                                    }}
                                                                    title="Edit"
                                                                >
                                                                    <Edit className="h-3 w-3" />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="destructive"
                                                                    className="w-8 h-8 p-0"
                                                                    onClick={() => {
                                                                        openDeleteModal(teacher);
                                                                        setOpenMenuRow(null);
                                                                    }}
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
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

                    {/* Create Teacher Modal */}
                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogContent className="max-w-lg">
                            <DialogHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                                        <Plus className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <DialogTitle className="text-lg font-bold">Add New Teacher</DialogTitle>
                                        <DialogDescription className="text-xs text-gray-600">
                                            Create a new teacher account
                                        </DialogDescription>
                                    </div>
                                </div>
                            </DialogHeader>
                            <form onSubmit={handleCreate}>
                                <div className="py-3 space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <Label htmlFor="create_name" className="text-xs">Name *</Label>
                                            <Input
                                                id="create_name"
                                                placeholder="Full name"
                                                value={createForm.data.name}
                                                onChange={(e) => {
                                                    // Capitalize first letter of each word
                                                    const capitalized = e.target.value.split(' ').map(word => 
                                                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                                                    ).join(' ');
                                                    createForm.setData('name', capitalized);
                                                }}
                                                required
                                                autoFocus
                                                className={`h-9 text-sm ${createForm.errors.name ? 'border-red-500' : ''}`}
                                            />
                                            {createForm.errors.name && (
                                                <p className="text-xs text-red-600 mt-1">{createForm.errors.name}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="create_email" className="text-xs">Email *</Label>
                                            <Input
                                                id="create_email"
                                                type="email"
                                                placeholder="email@example.com"
                                                value={createForm.data.email}
                                                onChange={(e) => createForm.setData('email', e.target.value)}
                                                required
                                                className={`h-9 text-sm ${createForm.errors.email ? 'border-red-500' : ''}`}
                                            />
                                            {createForm.errors.email && (
                                                <p className="text-xs text-red-600 mt-1">{createForm.errors.email}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="create_password" className="text-xs">Password *</Label>
                                        <Input
                                            id="create_password"
                                            type="password"
                                            placeholder="Min 8 characters"
                                            value={createForm.data.password}
                                            onChange={(e) => createForm.setData('password', e.target.value)}
                                            required
                                            minLength={8}
                                            className={`h-9 text-sm ${createForm.errors.password ? 'border-red-500' : ''}`}
                                        />
                                        {createForm.errors.password && (
                                            <p className="text-xs text-red-600 mt-1">{createForm.errors.password}</p>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">
                                            Password must be at least 8 characters long
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <Label htmlFor="create_position" className="text-xs">Position *</Label>
                                            <Select
                                                value={createForm.data.current_position_id}
                                                onValueChange={(value) => {
                                                    // Auto-set career stage based on position
                                                    let careerStage = '';
                                                    if (value === 'T1 - T3') {
                                                        careerStage = 'Beginner';
                                                    } else if (value === 'T4 - T7') {
                                                        careerStage = 'Proficient';
                                                    } else if (value === 'MT1 - MT2') {
                                                        careerStage = 'Highly Proficient';
                                                    } else if (value === 'MT3 - MT5') {
                                                        careerStage = 'Distinguished';
                                                    }
                                                    // Set both values at once
                                                    createForm.setData({
                                                        ...createForm.data,
                                                        current_position_id: value,
                                                        career_stage: careerStage
                                                    });
                                                }}
                                            >
                                                <SelectTrigger className={`h-9 text-sm ${createForm.errors.current_position_id ? 'border-red-500' : ''}`}>
                                                    <SelectValue placeholder="Select position" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="T1 - T3">T1 - T3</SelectItem>
                                                    <SelectItem value="T4 - T7">T4 - T7</SelectItem>
                                                    <SelectItem value="MT1 - MT2">MT1 - MT2</SelectItem>
                                                    <SelectItem value="MT3 - MT5">MT3 - MT5</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {createForm.errors.current_position_id && (
                                                <p className="text-xs text-red-600 mt-1">{createForm.errors.current_position_id}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="create_career_stage" className="text-xs">Career Stage</Label>
                                            <Input
                                                id="create_career_stage"
                                                value={createForm.data.career_stage}
                                                readOnly
                                                placeholder="Auto-filled"
                                                className="h-9 text-sm bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <Label htmlFor="create_status" className="text-xs">Status</Label>
                                            <Select
                                                value={createForm.data.teacher_status}
                                                onValueChange={(value) => createForm.setData('teacher_status', value)}
                                            >
                                                <SelectTrigger className={`h-9 text-sm ${createForm.errors.teacher_status ? 'border-red-500' : ''}`}>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Permanent">Permanent</SelectItem>
                                                    <SelectItem value="Provisioning">Provisioning</SelectItem>
                                                    <SelectItem value="Volunteer/COS">Volunteer/COS</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {createForm.errors.teacher_status && (
                                                <p className="text-xs text-red-600 mt-1">{createForm.errors.teacher_status}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="create_department" className="text-xs">Department</Label>
                                            <Select
                                                value={createForm.data.department}
                                                onValueChange={(value) => createForm.setData('department', value)}
                                            >
                                                <SelectTrigger className={`h-9 text-sm ${createForm.errors.department ? 'border-red-500' : ''}`}>
                                                    <SelectValue placeholder="Select department" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Acad">Acad</SelectItem>
                                                    <SelectItem value="Tech">Tech</SelectItem>
                                                    <SelectItem value="Pro">Pro</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {createForm.errors.department && (
                                                <p className="text-xs text-red-600 mt-1">{createForm.errors.department}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <DialogFooter className="pt-3">
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={() => setIsCreateModalOpen(false)}
                                        size="sm"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        disabled={createForm.processing} 
                                        className="bg-green-600 hover:bg-green-700"
                                        size="sm"
                                    >
                                        Create
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Edit Teacher Modal */}
                    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                        <DialogContent className="max-w-md">
                            <DialogHeader className="pb-2">
                                <DialogTitle className="text-lg">Edit Teacher</DialogTitle>
                                <DialogDescription className="text-xs">Update teacher information</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleEdit}>
                                <div className="space-y-3 py-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <Label htmlFor="edit_name" className="text-xs">Name *</Label>
                                            <Input
                                                id="edit_name"
                                                value={editForm.data.name}
                                                onChange={(e) => {
                                                    // Capitalize first letter of each word
                                                    const capitalized = e.target.value.split(' ').map(word => 
                                                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                                                    ).join(' ');
                                                    editForm.setData('name', capitalized);
                                                }}
                                                required
                                                className={`h-9 text-sm ${editForm.errors.name ? 'border-red-500' : ''}`}
                                            />
                                            {editForm.errors.name && (
                                                <p className="text-xs text-red-600 mt-1">{editForm.errors.name}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="edit_email" className="text-xs">Email *</Label>
                                            <Input
                                                id="edit_email"
                                                type="email"
                                                value={editForm.data.email}
                                                onChange={(e) => editForm.setData('email', e.target.value)}
                                                required
                                                className={`h-9 text-sm ${editForm.errors.email ? 'border-red-500' : ''}`}
                                            />
                                            {editForm.errors.email && (
                                                <p className="text-xs text-red-600 mt-1">{editForm.errors.email}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <Label htmlFor="edit_department" className="text-xs">Department</Label>
                                            <Select
                                                value={editForm.data.department}
                                                onValueChange={(value) => editForm.setData('department', value)}
                                            >
                                                <SelectTrigger className={`h-9 text-sm ${editForm.errors.department ? 'border-red-500' : ''}`}>
                                                    <SelectValue placeholder="Select department" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Acad">Acad</SelectItem>
                                                    <SelectItem value="Tech">Tech</SelectItem>
                                                    <SelectItem value="Pro">Pro</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {editForm.errors.department && (
                                                <p className="text-xs text-red-600 mt-1">{editForm.errors.department}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="edit_teacher_status" className="text-xs">Status</Label>
                                            <Select
                                                value={editForm.data.teacher_status}
                                                onValueChange={(value) => editForm.setData('teacher_status', value)}
                                            >
                                                <SelectTrigger className={`h-9 text-sm ${editForm.errors.teacher_status ? 'border-red-500' : ''}`}>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Permanent">Permanent</SelectItem>
                                                    <SelectItem value="Provisioning">Provisioning</SelectItem>
                                                    <SelectItem value="Volunteer/COS">Volunteer/COS</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {editForm.errors.teacher_status && (
                                                <p className="text-xs text-red-600 mt-1">{editForm.errors.teacher_status}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter className="pt-3">
                                    <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)} size="sm">
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={editForm.processing} className="bg-green-600 hover:bg-green-700" size="sm">
                                        Update
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Delete Confirmation Modal */}
                    <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                        <DialogContent className="max-w-sm">
                            <DialogHeader className="pb-2">
                                <DialogTitle className="text-lg">Delete Teacher</DialogTitle>
                                <DialogDescription className="text-xs">
                                    Delete {selectedTeacher?.name}? This cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="pt-3">
                                <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} size="sm">
                                    Cancel
                                </Button>
                                <Button variant="destructive" onClick={handleDelete} size="sm">
                                    Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Promote Teacher Modal */}
                    <Dialog open={isPromoteModalOpen} onOpenChange={setIsPromoteModalOpen}>
                        <DialogContent className="max-w-md">
                            <DialogHeader className="pb-2">
                                <DialogTitle className="text-lg">Promote Teacher</DialogTitle>
                                <DialogDescription className="text-xs">
                                    Select new position for {selectedTeacher?.name}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handlePromote}>
                                <div className="space-y-3 py-3">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Current Position</Label>
                                        <Input
                                            value={selectedTeacher?.position_range || 'No Position'}
                                            disabled
                                            className="bg-gray-50 h-9 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Current Career Stage</Label>
                                        <Input
                                            value={selectedTeacher?.career_stage || '-'}
                                            disabled
                                            className="bg-gray-50 h-9 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="to_position" className="text-xs">Promote To *</Label>
                                        <Select
                                            value={promoteForm.data.to_position_id}
                                            onValueChange={(value) => {
                                                // Auto-set career stage based on position
                                                let careerStage = '';
                                                if (value === 'T1 - T3') {
                                                    careerStage = 'Beginner';
                                                } else if (value === 'T4 - T7') {
                                                    careerStage = 'Proficient';
                                                } else if (value === 'MT1 - MT2') {
                                                    careerStage = 'Highly Proficient';
                                                } else if (value === 'MT3 - MT5') {
                                                    careerStage = 'Distinguished';
                                                }
                                                promoteForm.setData({
                                                    ...promoteForm.data,
                                                    to_position_id: value,
                                                    career_stage: careerStage
                                                });
                                            }}
                                        >
                                            <SelectTrigger className={`h-9 text-sm ${promoteForm.errors.to_position_id ? 'border-red-500' : ''}`}>
                                                <SelectValue placeholder="Select position" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="T1 - T3">T1 - T3</SelectItem>
                                                <SelectItem value="T4 - T7">T4 - T7</SelectItem>
                                                <SelectItem value="MT1 - MT2">MT1 - MT2</SelectItem>
                                                <SelectItem value="MT3 - MT5">MT3 - MT5</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {promoteForm.errors.to_position_id && (
                                            <p className="text-xs text-red-600 mt-1">{promoteForm.errors.to_position_id}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">New Career Stage</Label>
                                        <Input
                                            value={promoteForm.data.career_stage}
                                            readOnly
                                            placeholder="Auto-filled"
                                            className="h-9 text-sm bg-gray-50"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="notes" className="text-xs">Notes</Label>
                                        <Input
                                            id="notes"
                                            placeholder="Optional notes..."
                                            value={promoteForm.data.notes}
                                            onChange={(e) => promoteForm.setData('notes', e.target.value)}
                                            className="h-9 text-sm"
                                        />
                                    </div>
                                </div>
                                <DialogFooter className="pt-3">
                                    <Button type="button" variant="outline" onClick={() => setIsPromoteModalOpen(false)} size="sm">
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={promoteForm.processing || !promoteForm.data.to_position_id} className="bg-green-600 hover:bg-green-700" size="sm">
                                        Promote
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Promotion History Modal */}
                    <Dialog open={isHistoryModalOpen} onOpenChange={setIsHistoryModalOpen}>
                        <DialogContent className="max-w-2xl bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
                            <DialogHeader className="border-b border-green-100 pb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                                        <Award className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <DialogTitle className="text-xl font-bold text-gray-900">
                                            Career Progression
                                        </DialogTitle>
                                        <DialogDescription className="text-sm text-gray-600">
                                            {selectedTeacher?.name}'s promotion journey
                                        </DialogDescription>
                                    </div>
                                </div>
                            </DialogHeader>
                            
                            <div className="py-4 space-y-4">
                                {/* Teacher Info Card */}
                                <div className="bg-white rounded-lg shadow-sm border border-green-100 p-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="flex items-start gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                                <Award className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Position</p>
                                                <p className="text-sm font-bold text-green-600 mt-0.5">
                                                    {selectedTeacher?.position_range || 'None'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <TrendingUp className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Career Stage</p>
                                                <p className="text-sm font-bold text-gray-900 mt-0.5">{selectedTeacher?.career_stage || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                <Briefcase className="h-4 w-4 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Department</p>
                                                <p className="text-xs font-semibold text-gray-900 mt-0.5">{selectedTeacher?.department || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                                                <User className="h-4 w-4 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Status</p>
                                                <p className="text-xs font-semibold text-gray-900 mt-0.5">{selectedTeacher?.teacher_type || '-'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Promotion Timeline */}
                                <div className="bg-white rounded-lg shadow-sm border border-green-100 p-4">
                                    <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <History className="h-4 w-4 text-green-600" />
                                        Promotion Timeline
                                    </h3>
                                    
                                    {promotionHistory.length === 0 ? (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                                                <TrendingUp className="h-8 w-8 text-green-600" />
                                            </div>
                                            <p className="text-base font-semibold text-gray-900 mb-1">No Promotion History Yet</p>
                                            <p className="text-xs text-gray-500">This teacher hasn't been promoted yet.</p>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            {/* Timeline Line */}
                                            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-600 to-green-200"></div>
                                            
                                            <div className="space-y-4">
                                                {promotionHistory.slice(0, 5).map((promotion, index) => (
                                                    <div
                                                        key={promotion.id}
                                                        className="relative pl-12 animate-in fade-in slide-in-from-left-4"
                                                        style={{ animationDelay: `${index * 100}ms` }}
                                                    >
                                                        {/* Timeline Dot */}
                                                        <div className="absolute left-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg border-4 border-white">
                                                            <CheckCircle2 className="h-5 w-5 text-white" />
                                                        </div>
                                                        
                                                        {/* Content Card */}
                                                        <div className="bg-gradient-to-br from-green-50 to-white rounded-lg border-2 border-green-200 p-3 hover:shadow-md transition-shadow">
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">
                                                                            {promotion.from_position_range || promotion.from_position?.name || 'Unknown'}
                                                                        </span>
                                                                        <TrendingUp className="h-3 w-3 text-green-600" />
                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-600 text-white border border-green-700">
                                                                            {promotion.to_position_range || promotion.to_position?.name}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                                                            {promotion.from_career_stage || '-'}
                                                                        </span>
                                                                        <TrendingUp className="h-3 w-3 text-blue-600" />
                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white border border-blue-700">
                                                                            {promotion.to_career_stage || '-'}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-xs text-gray-600 flex items-center gap-1 mb-1">
                                                                        <User className="h-3 w-3 text-gray-400" />
                                                                        By: <span className="font-semibold text-gray-900">{promotion.promoted_by?.name}</span>
                                                                    </p>
                                                                    {promotion.notes && (
                                                                        <p className="text-xs text-gray-600 mt-1 italic bg-white/50 rounded px-2 py-1 border border-green-100">
                                                                            "{promotion.notes}"
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <div className="flex items-center gap-1 text-xs text-gray-500 bg-white rounded px-2 py-1 border border-gray-200 ml-2">
                                                                    <Calendar className="h-3 w-3 text-green-600" />
                                                                    <span className="font-medium whitespace-nowrap">
                                                                        {new Date(promotion.promoted_at).toLocaleDateString('en-US', {
                                                                            year: 'numeric',
                                                                            month: 'short',
                                                                            day: 'numeric',
                                                                        })}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {promotionHistory.length > 5 && (
                                                <div className="mt-4 text-center">
                                                    <p className="text-xs text-gray-500 bg-green-50 rounded px-3 py-2 border border-green-200 inline-block">
                                                        Showing 5 most recent of <span className="font-bold text-green-600">{promotionHistory.length}</span> total
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <DialogFooter className="border-t border-green-100 pt-3">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setIsHistoryModalOpen(false)}
                                    className="border-green-600 text-green-600 hover:bg-green-50"
                                >
                                    Close
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </SidebarInset>
            </SidebarProvider>
            <Toaster />
        </>
    );
}
