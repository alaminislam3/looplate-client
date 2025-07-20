const ImpactOverview = () => {
  return (
    <section className=" md:py-20 py-10 px-6 md:px-16">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Together, We're Making a Difference
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {/* Box 1 */}
        <div className="bg-[#F0FDF4] p-6 rounded-2xl shadow-md">
          <div className="text-5xl mb-2">🍞</div>
          <h3 className="text-xl font-semibold text-gray-800">
            Total Food Donated
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">3,500 kg</p>
          <p className="text-gray-600 mt-1 text-sm">
            Across all partner restaurants
          </p>
        </div>

        {/* Box 2 */}
        <div className="bg-[#EFF6FF] p-6 rounded-2xl shadow-md">
          <div className="text-5xl mb-2">👨‍👩‍👧‍👦</div>
          <h3 className="text-xl font-semibold text-gray-800">People Fed</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">12,000+</p>
          <p className="text-gray-600 mt-1 text-sm">
            Families and individuals helped
          </p>
        </div>

        {/* Box 3 */}
        <div className="bg-[#FEF3C7] p-6 rounded-2xl shadow-md">
          <div className="text-5xl mb-2">🌍</div>
          <h3 className="text-xl font-semibold text-gray-800">CO₂ Prevented</h3>
          <p className="text-3xl font-bold text-yellow-700 mt-2">1.2 Tons</p>
          <p className="text-gray-600 mt-1 text-sm">
            Less food waste, cleaner air
          </p>
        </div>

        {/* Box 4 */}
        <div className="bg-[#F3E8FF] p-6 rounded-2xl shadow-md">
          <div className="text-5xl mb-2">🏆</div>
          <h3 className="text-xl font-semibold text-gray-800">
            Active Partners
          </h3>
          <p className="text-3xl font-bold text-purple-700 mt-2">85+</p>
          <p className="text-gray-600 mt-1 text-sm">
            Restaurants, charities, and volunteers
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactOverview;
