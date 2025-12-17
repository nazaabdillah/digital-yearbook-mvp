import React, { useState } from 'react';

interface CreatePostModalProps {
  onClose: () => void;
  onSubmit: (postData: any) => void;
}

export default function CreatePostModal({ onClose, onSubmit }: CreatePostModalProps) {
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // LOGIC: Mengubah File yang diupload jadi URL sementara
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file); // <--- MAGIC-NYA DISINI
      setSelectedImage(imageUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption || !selectedImage) return alert("Isi caption dan foto dulu dong!");

    // Kirim data ke Page utama
    onSubmit({
      caption,
      image: selectedImage,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl relative animate-slide-up">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Buat Postingan Baru</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Input Caption */}
          <textarea 
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none mb-4 resize-none"
            rows={3}
            placeholder="Ceritakan momen seru ini..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          {/* Upload Area */}
          <div className="mb-6">
            <label className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-blue-50 hover:border-blue-400 transition-colors">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              
              {selectedImage ? (
                <img src={selectedImage} alt="Preview" className="h-48 w-full object-cover rounded-lg" />
              ) : (
                <div className="text-gray-500">
                  <span className="text-3xl block mb-2">📸</span>
                  <span className="text-sm font-medium">Klik untuk upload foto momen</span>
                </div>
              )}
            </label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all active:scale-95"
          >
            Posting Sekarang 🚀
          </button>
        </form>

      </div>
    </div>
  );
}