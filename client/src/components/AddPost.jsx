import React, { useState, useRef, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const AddPost = ({ onClose }) => {
    const [mediaType, setMediaType] = useState('img');
    const [mediaFile, setMediaFile] = useState(null);
    const [caption, setCaption] = useState('');
    const fileInputRef = useRef(null);
    const [postError, setPostError] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    const profile = JSON.parse(localStorage.getItem('user')) || {};
    const BASE_URL = "http://localhost:8000";

    // Cleanup object URLs
    useEffect(() => {
        return () => {
            if (mediaFile) {
                URL.revokeObjectURL(URL.createObjectURL(mediaFile));
            }
        };
    }, [mediaFile]);

    const handleMediaChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            const validVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
            
            if (
                (mediaType === 'img' && !validImageTypes.includes(file.type)) ||
                (mediaType === 'vid' && !validVideoTypes.includes(file.type))
            ) {
                setPostError(`Invalid file type. Please select ${mediaType === 'img' ? 'an image' : 'a video'}`);
                return;
            }
            
            // Check file size (25MB limit)
            if (file.size > 25 * 1024 * 1024) {
                setPostError('File size exceeds 25MB limit');
                return;
            }
            
            setMediaFile(file);
            setPostError(''); // Clear previous errors
        }
    };

    const handlePost = async () => {
        setPostError('');
        setIsPosting(true);

        const hashtags = caption
            .split(/\s+/) // Split by spaces
            .filter((word) => /^#[a-zA-Z0-9]+$/.test(word)) // Valid hashtags: # followed by alphanumerics
            .map((hashtag) => hashtag.trim());

        try {
            // Use FormData to send the media file
            const formData = new FormData();
            formData.append('postMedia', mediaFile);
            formData.append('caption', caption);
            formData.append('hashtags', JSON.stringify(hashtags));

            // Debug: Log FormData contents
            console.log("FormData contents:");
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            const response = await fetch(`${BASE_URL}/api/media`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            
            if (response.ok) {
                console.log('Post created successfully');
                onClose(); // Close modal on success
            } else {
                // Try to get error message from response
                try {
                    const errorData = await response.json();
                    console.error('Backend error:', errorData);
                    setPostError(errorData.message || errorData.error || 'Failed to create post');
                } catch (parseError) {
                    const text = await response.text();
                    console.error('Non-JSON error response:', text);
                    setPostError(text || 'Failed to create post');
                }
            }
        } catch (error) {
            console.error('Network error while posting:', error);
            setPostError('Network error. Please check your connection.');
        } finally {
            setIsPosting(false);
        }
    };

    const handleAddMediaClick = () => {
        fileInputRef.current.click();
    };

    const renderMediaPreview = () => {
        if (!mediaFile) {
            return (
                <div
                    className="w-full h-full flex flex-col items-center justify-center bg-gray-900 cursor-pointer"
                    onClick={handleAddMediaClick}
                >
                    <AddIcon className="text-6xl text-gray-500 mb-4" />
                    <p className="text-gray-500 text-lg">
                        {mediaType === 'img' ? 'Add Photo' : 'Add Video'}
                    </p>
                </div>
            );
        }

        const previewUrl = URL.createObjectURL(mediaFile);

        return mediaType === 'img' ? (
            <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain cursor-pointer"
                onClick={handleAddMediaClick}
            />
        ) : (
            <video
                src={previewUrl}
                className="w-full h-full object-contain cursor-pointer"
                controls
                onClick={handleAddMediaClick}
            />
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg overflow-hidden w-full max-w-4xl flex flex-col sm:flex-row">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-1 z-10"
                >
                    <CloseIcon />
                </button>

                <div className="w-full sm:w-2/3 h-64 sm:h-auto bg-black relative">
                    {renderMediaPreview()}
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept={mediaType === 'img' ? 'image/*' : 'video/*'}
                        onChange={handleMediaChange}
                        className="hidden"
                    />
                </div>

                <div className="w-full sm:w-1/3 p-4 bg-gray-800 flex flex-col">
                    <div className="mb-6">
                        <div className="flex items-center mb-4">
                            <div className="bg-gray-700 rounded-full p-2 mr-3">
                                <img
                                    src={`${BASE_URL}${profile.profilePhoto || ''}`.replace(/([^:]\/)\/+/g, '$1')}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            </div>
                            <span className="font-medium text-white">
                                {profile.username || 'Guest'}
                            </span>
                        </div>

                        <TextareaAutosize
                            placeholder="Write a caption..."
                            className="w-full p-3 bg-gray-700 text-white rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                            minRows={6}
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="text-gray-400 text-sm mb-2 block">Media Type</label>
                        <div className="flex space-x-2">
                            <Button
                                variant={mediaType === 'img' ? 'contained' : 'outlined'}
                                startIcon={<ImageIcon />}
                                onClick={() => setMediaType('img')}
                                className="flex-1"
                            >
                                Photo
                            </Button>
                            <Button
                                variant={mediaType === 'vid' ? 'contained' : 'outlined'}
                                startIcon={<VideoCameraBackIcon />}
                                onClick={() => setMediaType('vid')}
                                className="flex-1"
                            >
                                Video
                            </Button>
                        </div>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handlePost}
                        disabled={!mediaFile || isPosting}
                    >
                        {isPosting ? 'Posting...' : 'Post'}
                    </Button>
                    {postError && <p className="text-red-500 text-sm mt-2">{postError}</p>}
                </div>
            </div>
        </div>
    );
};

export default AddPost;