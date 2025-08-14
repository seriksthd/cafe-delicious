import { XIcon } from "lucide-react";
export function DishModal({ dish, onClose }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <div
          className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <XIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{dish.name}</h3>
            <p className="mt-2 text-gray-600">{dish.description}</p>
            <div className="mt-4 text-2xl font-bold text-orange-600">
              {dish.price} сом
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
