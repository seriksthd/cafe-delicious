import { useState } from "react";
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Свяжитесь с нами
          </h2>
          <p className="text-lg text-gray-600">
            Остались вопросы или хотите сделать заказ?
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-800 p-3 rounded-lg">
                    <MapPinIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Адрес
                    </h3>
                    <p className="text-gray-600">г. Ош, ул. Келечик, 12</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-800 p-3 rounded-lg">
                    <PhoneIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Телефон
                    </h3>
                    <p className="text-gray-600">+996 700 123 456</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-800 p-3 rounded-lg">
                    <MailIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Электронная почта
                    </h3>
                    <p className="text-gray-600">hello@cafearoma.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-800 p-3 rounded-lg">
                    <ClockIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Время работы
                    </h3>
                    <div className="text-gray-600">
                      <p>Пн – Пт: 09:00 – 22:00</p>
                      <p>Сб – Вс: 10:00 – 23:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[300px] bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10726.81478128859!2d72.80116360284485!3d40.53538515561843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bdac017f5a2e85%3A0xe0a3c61dc6f47b95!2sOsh!5e0!3m2!1sen!2skg!4v1749923022300!5m2!1sen!2skg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Отправьте нам сообщение
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Имя *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Сообщение
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-transparent"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-900 transition-colors"
              >
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
