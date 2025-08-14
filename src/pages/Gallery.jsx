import { useState } from "react";
import { Lightbox } from "../components/gallery/Lightbox";
import { useGetGalleryImagesQuery } from "../store/slices/gallerySlice";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: images = [], isLoading } = useGetGalleryImagesQuery();
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Галерея</h1>
          <p className="text-xl text-gray-600">
            Лучшие моменты и атмосфера нашего кафе
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`${
                image.featured ? "md:col-span-2 md:row-span-2" : "col-span-1"
              } cursor-pointer group`}
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
                <img
                  src={image.image_url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImage !== null && (
        <Lightbox
          images={images}
          currentIndex={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNavigate={setSelectedImage}
        />
      )}
    </div>
  );
}
