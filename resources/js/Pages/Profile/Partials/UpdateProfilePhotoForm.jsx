import { useRef, useState, useCallback } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Trash2, X, Check, Crop } from 'lucide-react';
import Cropper from 'react-easy-crop';

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.src = url;
    });

const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, 'image/jpeg', 0.95);
    });
};

export default function UpdateProfilePhotoForm({ user, onPhotoPreview, className = '' }) {
    const fileInputRef = useRef(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    
    const { data, setData, post, processing, errors } = useForm({
        photo: null,
    });

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handlePhotoSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageToCrop(reader.result);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropConfirm = async () => {
        try {
            const croppedBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
            const croppedFile = new File([croppedBlob], 'profile-photo.jpg', { type: 'image/jpeg' });
            
            setData('photo', croppedFile);
            
            // Create preview from blob
            const previewUrl = URL.createObjectURL(croppedBlob);
            setPhotoPreview(previewUrl);
            if (onPhotoPreview) {
                onPhotoPreview(previewUrl);
            }
            
            setShowCropper(false);
            setImageToCrop(null);
        } catch (error) {
            console.error('Error cropping image:', error);
        }
    };

    const handleCropCancel = () => {
        setShowCropper(false);
        setImageToCrop(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();
        post(route('profile.photo.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                setData('photo', null);
                if (onPhotoPreview) {
                    onPhotoPreview(null);
                }
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to remove your profile photo?')) {
            post(route('profile.photo.delete'), {
                onSuccess: () => {
                    setPhotoPreview(null);
                    if (onPhotoPreview) {
                        onPhotoPreview(null);
                    }
                },
            });
        }
    };

    return (
        <section className={className}>
            {/* Crop Modal */}
            {showCropper && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden">
                        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Crop className="h-5 w-5" />
                                Crop Your Photo
                            </h3>
                        </div>
                        
                        <div className="relative h-96 bg-gray-900">
                            <Cropper
                                image={imageToCrop}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Zoom
                                </label>
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                                />
                            </div>
                            
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleCropConfirm}
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                    <Check className="h-4 w-4 mr-2" />
                                    Apply Crop
                                </Button>
                                <Button
                                    onClick={handleCropCancel}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    className="hidden"
                />

                <div className="flex flex-col gap-3">
                    <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="w-full border-green-200 hover:bg-green-50 hover:text-green-700 hover:border-green-400"
                    >
                        <Upload className="h-4 w-4 mr-2" />
                        {photoPreview ? 'Choose Different Photo' : 'Upload Photo'}
                    </Button>

                    {photoPreview && (
                        <Button
                            onClick={handleUpload}
                            disabled={processing}
                            className="w-full bg-green-600 hover:bg-green-700"
                        >
                            {processing ? 'Uploading...' : 'Save Photo'}
                        </Button>
                    )}

                    {user.photo && !photoPreview && (
                        <Button
                            type="button"
                            onClick={handleDelete}
                            variant="outline"
                            className="w-full border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-400"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Photo
                        </Button>
                    )}
                </div>

                <p className="text-xs text-gray-500 text-center">
                    JPG, PNG or GIF (max 2MB)
                </p>

                {errors.photo && (
                    <p className="text-sm text-red-600 text-center">{errors.photo}</p>
                )}
            </div>
        </section>
    );
}
