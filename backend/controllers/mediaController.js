import axios from 'axios';

const cloudinaryConfig = {
    cloudName: 'your-cloud-name',
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret',
};

const uploadMedia = async (file) => {
    console.log('Uploading media:', file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your-upload-preset');

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Media uploaded successfully:', response.data);
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading media:', error);
        throw error;
    }
};

export { uploadMedia };