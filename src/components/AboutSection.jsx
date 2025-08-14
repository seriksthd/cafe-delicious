export function AboutSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">О нас</h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                CafeDelicious открылось в 2018 году с простой идеей: создать
                место, где каждый гость чувствует себя как дома, а каждое блюдо
                готовится с душой и любовью.
              </p>
              <p>
                Мы используем только натуральные ингредиенты от проверенных
                поставщиков и готовим по семейным рецептам, передающимся из
                поколения в поколение.
              </p>
              <p>
                Наша цель — не просто накормить, а подарить вам незабываемые
                вкусовые впечатления и создать атмосферу тепла и уюта.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Наша команда"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
