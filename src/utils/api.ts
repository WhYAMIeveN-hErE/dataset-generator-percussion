
const API_BASE_URL = 'http://localhost:5000/api';

export const uploadCsvFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}/upload-csv`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to upload CSV file');
  }
  
  return response.json();
};

export const uploadTextFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}/upload-text`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to upload text file');
  }
  
  return response.json();
};

export const processUrl = async (url: string, startTime: string, endTime: string) => {
  const response = await fetch(`${API_BASE_URL}/process-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      startTime,
      endTime,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to process URL');
  }
  
  return response.json();
};

export const uploadAudioFiles = async (files: FileList) => {
  const formData = new FormData();
  Array.from(files).forEach(file => {
    formData.append('files', file);
  });
  
  const response = await fetch(`${API_BASE_URL}/upload-audio`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to upload audio files');
  }
  
  return response.json();
};
