import { useState } from "react";
import {
  useGetGalleryImagesQuery,
  useUploadGalleryImageMutation,
  useDeleteGalleryImageMutation,
} from "../../store/slices/gallerySlice";

const GalleryManagement = () => {
  const { data: images = [], isLoading } = useGetGalleryImagesQuery();
  const [uploadImage, { isLoading: isUploading }] =
    useUploadGalleryImageMutation();
  const [deleteImage, { isLoading: isDeleting }] =
    useDeleteGalleryImageMutation();

  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [uploadData, setUploadData] = useState({ image_url: "", alt: "" }); // ← alt коштук
  const [deletingId, setDeletingId] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadData((prev) => ({ ...prev, image_url: reader.result })); // alt сакталсын
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uploadData.image_url) {
      alert("Сүрөт тандаңыз");
      return;
    }

    try {
      await uploadImage({
        ...uploadData,
        featured: isFeatured,
      }).unwrap();
      setUploadData({ image_url: "", alt: "" });
      setIsUploadVisible(false);
      setIsFeatured(false);
    } catch (error) {
      console.error("Сүрөт жүктөөдө ката:", error);
      alert("Сүрөт жүктөөдө ката кетти");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Бул сүрөттү өчүрөсүзбү?")) {
      try {
        setDeletingId(id);
        await deleteImage(id).unwrap();
      } catch (error) {
        console.error("Сүрөт өчүрүүдө ката:", error);
        alert("Сүрөт өчүрүүдө ката кетти");
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
        <p className="ml-4 text-gray-600">Галерея жүктөлүүдө...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Галерея башкаруу</h2>
        <button
          onClick={() => setIsUploadVisible(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Сүрөт жүктөө
        </button>
      </div>

      {/* Upload Form */}
      {isUploadVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Сүрөт жүктөө</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Сүрөт тандоо
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                  disabled={isUploading}
                />

                {/* Alt input */}
                <label className="block text-sm font-medium mb-2 mt-4">
                  Сүрөттүн аталышы (alt)
                </label>
                <input
                  type="text"
                  value={uploadData.alt}
                  onChange={(e) =>
                    setUploadData((prev) => ({ ...prev, alt: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Мисалы: Кофе кружка"
                  disabled={isUploading}
                />

                {/* Featured checkbox */}
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    className="mt-1 mr-1"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                  <label>Избранный</label>
                </div>

                {/* Preview */}
                {uploadData.image_url && (
                  <div className="mt-4">
                    <img
                      src={uploadData.image_url}
                      alt={uploadData.alt || "Preview"}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Жүктөлүүдө...
                    </>
                  ) : (
                    "Жүктөө"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsUploadVisible(false);
                    setUploadData({ image_url: "", alt: "" });
                  }}
                  disabled={isUploading}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  Жабуу
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">Галереяда сүрөт жок</p>
          </div>
        ) : (
          images.map((image) => (
            <div
              key={image.id}
              className={`bg-white rounded-lg shadow overflow-hidden ${
                deletingId === image.id ? "opacity-50" : ""
              }`}
            >
              <img
                src={image.image_url}
                alt={image.alt || "Gallery"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm font-semibold">{image.alt}</p>{" "}
                {/* alt көрсөтүү */}
                <button
                  onClick={() => handleDelete(image.id)}
                  disabled={deletingId === image.id}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {deletingId === image.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Өчүрүлүүдө...
                    </>
                  ) : (
                    "Өчүрүү"
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GalleryManagement;
