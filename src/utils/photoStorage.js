// Local Image Storage with IndexedDB & Canvas Compression
const DB_NAME = 'FarheenaFairytalePhotos';
const STORE_NAME = 'user_photos';
const DB_VERSION = 1;

// Helper to open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Compress image on canvas to avoid huge memory/storage usage
export async function compressImage(file, maxWidth = 1400, quality = 0.85) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Save photo to IndexedDB
export async function savePhotoToStorage(photoItem) {
  try {
    const db = await openDB();
    if (!db) {
      // Fallback to localStorage
      const existing = JSON.parse(localStorage.getItem('farheena_photos') || '[]');
      const index = existing.findIndex(p => p.id === photoItem.id);
      if (index >= 0) existing[index] = photoItem;
      else existing.push(photoItem);
      localStorage.setItem('farheena_photos', JSON.stringify(existing));
      return photoItem;
    }

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(photoItem);
      req.onsuccess = () => resolve(photoItem);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Storage error:', err);
  }
}

// Get all photos from storage
export async function getAllStoredPhotos() {
  try {
    const db = await openDB();
    if (!db) {
      return JSON.parse(localStorage.getItem('farheena_photos') || '[]');
    }

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch (err) {
    console.error('Error fetching photos:', err);
    return [];
  }
}

// Delete photo
export async function deleteStoredPhoto(id) {
  try {
    const db = await openDB();
    if (!db) {
      const existing = JSON.parse(localStorage.getItem('farheena_photos') || '[]');
      const filtered = existing.filter(p => p.id !== id);
      localStorage.setItem('farheena_photos', JSON.stringify(filtered));
      return;
    }

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Delete error:', err);
  }
}
