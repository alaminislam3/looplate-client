const OurTestimonial = () => {
    const testimonials = [
      {
        id: 1,
        img: "./public/res1.webp",
        title: "Food For All",
        desc: "Helping people with daily meals to fight hunger.",
        site: "https://www.foodforall.org",
      },
      {
        id: 2,
        img: "./public/res2.webp",
        title: "Cloth Share",
        desc: "Providing warm clothes to the needy during winter.",
        site: "https://www.clothshare.org",
      },
      {
        id: 3,
        img: "./public/res3.jpg",
        title: "Hope Foundation",
        desc: "Supporting children with education and shelter.",
        site: "https://www.hopefoundation.org",
      },
    ];
  
    return (
      <section className="md:py-20 px-4 md:px-8 lg:px-16 py-10 my-10 bg-gray-50">
        <div className="mx-auto ">
          <div className="p-5">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Our Testimonial
            </h2>
            <p className="text-2xl font-semibold text-center">
              Restaurants help us by providing a lot of food every day
            </p>
          </div>
  
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (  
              
              <div
                key={item.id}
                className="p-10 flex items-center gap-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300"
              >
                
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc} </p>
                  <a
                    href={item.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sky-500 hover:underline mt-1 block"
                  >
                    {item.site}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default OurTestimonial;
  