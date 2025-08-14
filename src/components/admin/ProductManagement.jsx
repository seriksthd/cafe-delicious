import { useState } from "react";

import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../store/slices/productSlice";
import { useGetGalleryImagesQuery } from "../../store/slices/gallerySlice";

const ProductManagement = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();
  console.log("products: ", products);
  const { data: galleryImages = [] } = useGetGalleryImagesQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectFromGallery = (imageUrl) => {
    setFormData({ ...formData, image: imageUrl });
    setShowGallery(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await updateProduct({ id: editingProduct.id, ...formData }).unwrap();
      } else {
        await createProduct({
          ...formData,
          price: parseFloat(formData.price),
        }).unwrap();
      }

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
      setEditingProduct(null);
      setIsFormVisible(false);
    } catch (error) {
      console.error("Продукт сактоодо ката:", error);
      alert("Продукт сактоодо ката кетти");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
    });
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Бул продуктту өчүрөсүзбү?")) {
      try {
        setDeletingId(id);
        await deleteProduct(id).unwrap();
      } catch (error) {
        console.error("Продукт өчүрүүдө ката:", error);
        alert("Продукт өчүрүүдө ката кетти");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
    setEditingProduct(null);
    setIsFormVisible(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
        <p className="ml-4 text-gray-600">Продуктулар жүктөлүүдө...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Продукт башкаруу</h2>
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Жаңы продукт кошуу
        </button>
      </div>

      {/* Add/Edit Form */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
              {editingProduct ? "Продукт өзгөртүү" : "Жаңы продукт кошуу"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Аталышы
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                  disabled={isCreating || isUpdating}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Сүрөттөмө
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                  disabled={isCreating || isUpdating}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Баасы (сом)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                  disabled={isCreating || isUpdating}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Категория
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                  disabled={isCreating || isUpdating}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Сүрөт</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border rounded-lg"
                    disabled={isCreating || isUpdating}
                  />
                  <button
                    type="button"
                    onClick={() => setShowGallery(true)}
                    className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                    disabled={isCreating || isUpdating}
                  >
                    Галереядан тандоо
                  </button>
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isCreating || isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingProduct ? "Өзгөртүлүүдө..." : "Кошулууда..."}
                    </>
                  ) : editingProduct ? (
                    "Өзгөртүү"
                  ) : (
                    "Кошуу"
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isCreating || isUpdating}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  Жабуу
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Галереядан тандоо</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.image_url}
                    alt="Gallery"
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleSelectFromGallery(image.image_url)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg"></div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowGallery(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Жабуу
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Сүрөт
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Аталышы
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Категория
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Баасы
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Аракеттер
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr
                key={product.id}
                className={deletingId === product.id ? "opacity-50" : ""}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {product.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {product.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {product.price} сом
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(product)}
                    disabled={deletingId === product.id}
                    className="text-amber-600 hover:text-amber-900 mr-4 disabled:opacity-50"
                  >
                    Өзгөртүү
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50 flex items-center"
                  >
                    {deletingId === product.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                        Өчүрүлүүдө...
                      </>
                    ) : (
                      "Өчүрүү"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
