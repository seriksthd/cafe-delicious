import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  const handleViewMenu = () => {
    navigate("/menu");
  };

  return (
    <section className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold mb-6 text-white">
          Добро пожаловать в CafeDelicious
        </h1>
        <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
          Насладитесь идеальным сочетанием ароматного кофе, вкусной еды и уютной
          атмосферы
        </p>
        <div className="space-x-4">
          <button
            onClick={handleViewMenu}
            className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Посмотреть меню
          </button>
        </div>
      </div>
    </section>
  );
}
