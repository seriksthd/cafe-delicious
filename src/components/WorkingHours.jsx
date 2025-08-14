import React from "react";
import { ClockIcon } from "lucide-react";
export function WorkingHours() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-orange-50 rounded-lg p-8">
          <ClockIcon className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Время работы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Понедельник — Пятница
              </h3>
              <p className="text-gray-700">09:00 — 22:00</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Суббота — Воскресенье
              </h3>
              <p className="text-gray-700">10:00 — 23:00</p>
            </div>
          </div>
          <div className="mt-8 p-4 bg-white rounded-lg">
            <p className="text-gray-600">
              <strong>Доставка:</strong> Ежедневно с 11:00 до 21:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
