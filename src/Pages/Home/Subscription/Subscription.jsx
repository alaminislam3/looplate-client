const Subscription = () => {
    return (
      <section
        className="w-full bg-cover bg-center py-20"
        style={{ backgroundImage: `url('https://i.ibb.co.com/d4pWTYkP/subscription.jpg')` }}
      >
        <div className="max-w-3xl mx-auto text-center px-4">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 ml-22">
            Don’t miss out on the Latest News
          </h2>
          <p className="mt-2 text-base md:text-lg text-black">
            We won’t spam you and we respect your privacy.
          </p>
  
          {/* Form */}
          <div className="mt-6 flex items-center gap-0 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3  border"
            />
            <button className="bg-sky-500 text-black px-6 py-3 font-semibold hover:bg-sky-600 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default Subscription;
  