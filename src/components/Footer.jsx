import { MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";
export function Footer() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-300">Мы всегда рады вас видеть!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <MapPinIcon className="w-12 h-12 text-orange-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Адрес</h3>
            <p className="text-gray-300">г. Ош, ул. Келечик, 12</p>
          </div>
          <div className="flex flex-col items-center">
            <PhoneIcon className="w-12 h-12 text-orange-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Телефон</h3>
            <a
              href="tel:+996700123456"
              className="text-orange-400 hover:text-orange-300"
            >
              +996 700 123 456
            </a>
          </div>
          <div className="flex flex-col items-center">
            <MailIcon className="w-12 h-12 text-orange-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <a
              href="mailto:hello@cafedelicious.com"
              className="text-orange-400 hover:text-orange-300"
            >
              hello@cafedelicious.com
            </a>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Следите за нами в социальных сетях
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <h1 className="text-gray-400  transition-colors font-semibold text-center mt-8">
        © 2024 Ваша команда по быстрой разработке |
        <a
          href="https://kaytov.kesug.com/"
          className="hover:text-orange-400 ml-2"
        >
          kaytov.kesug.com
        </a>
      </h1>
    </section>
  );
}
