import { useCallback, useEffect } from "react";
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
export function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      }
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      }
    },
    [currentIndex, images.length, onClose, onNavigate]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full z-50"
      >
        <XIcon className="w-6 h-6" />
      </button>
      <div className="relative w-full h-full flex items-center justify-center">
        {currentIndex > 0 && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
        )}
        <img
          src={images[currentIndex].image_url}
          alt={images[currentIndex].alt}
          className="max-h-[90vh] max-w-[90vw] object-contain"
        />
        {currentIndex < images.length - 1 && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
