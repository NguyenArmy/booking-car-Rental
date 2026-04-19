import React from 'react';
import { assets } from '../assets/assets';
import Title from './Title';
import { motion } from 'motion/react';

const Testimonial = () => {
  // Dữ liệu mẫu cho các đánh giá
  const testimonials = [
    {
      name: "Donald Bennet",
      location: "New York, USA",

      testimonial: "The service was excellent! The car was in great condition and the booking process was very smooth. Highly recommended!",
      image: assets.testimonial_image_1
    },
    {
      name: "Skylar Dias",
      location: "London, UK",
   
      testimonial: "Great experience with Car Rental. Wide variety of cars to choose from and the customer support was very helpful.",
      image: assets.testimonial_image_2
    },
    {
      name: "James Gouse",
      location: "Paris, France",
    
      testimonial: "Affordable prices and premium cars. I've used their service multiple times and it's always top-notch.",
      image: assets.testimonial_image_1 // Dùng tạm lại ảnh 3
    }
  ];

  return (
    // container: Căn giữa và tạo khoảng cách trên dưới
    <div className="flex flex-col items-center justify-center py-16 px-4 md:px-20">
      
      {/* Sử dụng lại component Title đã tạo ở phút 01:14 */}
      <Title 
        title="What Our Clients Say" 
        subtitle="Discover why thousands of customers trust us for their journeys. Real stories from real travelers."
      />

      {/* Grid Layout: 1 cột trên mobile, 2 cột trên tablet (md), 3 cột trên desktop (lg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full">
        {testimonials.map((testimonial, index) => (
          <motion.div
              initial={{y: 20, opacity: 0}}
              whileInView={{y: 0, opacity: 1}}
              transition={{duration: 0.5, delay: index * 0.3, ease: "easeOut"}} 
              viewport={{once: true, amount: 0.3}}
            key={index} 
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            {/* Phần Header của Card: Ảnh và Tên */}
            <div className="flex items-center gap-3">
              <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="text-xl">{testimonial.name}</h3>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>

            {/* Hiển thị 5 ngôi sao */}
            <div className="flex items-center gap-1 mb-3">
              {Array(5).fill(0).map((_, index) => (
                <img key={index} src={assets.star_icon} alt="star" className="w-4" />
              ))}
            </div>

            {/* Nội dung đánh giá */}
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;