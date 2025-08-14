import { Link } from "react-router-dom";
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    alt: "Интерьер кафе",
  },
  {
    id: 2,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv3_VmJPzaBK_R4ql_vw8nDVF_fPaF6CA9xQ&s",
    alt: "Вкусная пицца",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    alt: "Уютная атмосфера",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    alt: "Десерты",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    alt: "Счастливые гости",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    alt: "Свежие напитки",
  },
];
export function GalleryPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Наша галерея
          </h2>
          <p className="text-xl text-gray-600">Атмосфера и вкусы нашего кафе</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/gallery"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200"
          >
            Смотреть всю галерею
          </Link>
        </div>
      </div>
    </section>
  );
}
