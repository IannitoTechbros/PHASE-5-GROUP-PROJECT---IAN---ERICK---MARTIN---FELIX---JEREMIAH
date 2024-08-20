import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { ReactComponent as ChevronLeftIcon } from 'feather-icons/dist/icons/chevron-left.svg';
import { ReactComponent as ChevronRightIcon } from 'feather-icons/dist/icons/chevron-right.svg';

const Testimonials = ({
  subheading = "",
  heading = "Testimonials",
  description = "Here are what some of our amazing customers are saying about our spaces & experiences with us.",
  testimonials = null,
  textOnLeft = false
}) => {
  const defaultTestimonials = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1512100356356-de1b84283e18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80",
      profileImageSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
      quote:
        "Space Hub transformed our event planning experience with their diverse and stunning venues. Booking was effortless and the service impeccable. Highly recommend for any event!",
      customerName: "Charlotte Hale",
      customerTitle: "CEO, Delos Inc."
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1523952578875-e6bb18b26645?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80",
      profileImageSrc:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
      quote:
        "The venue from Space Hub exceeded our expectations. Perfect space, excellent amenities, and a smooth booking process. We will definitely use them again!",
      customerName: "Adam Cuppy",
      customerTitle: "Founder, EventsNYC"
    }
  ];

  if (!testimonials || testimonials.length === 0) testimonials = defaultTestimonials;

  const [imageSliderRef, setImageSliderRef] = useState(null);
  const [textSliderRef, setTextSliderRef] = useState(null);

  const HeadingInfo = ({ subheading, heading, description, ...props }) => (
    <div {...props} className={`text-center ${props.className || ''}`}>
      {subheading && <h5 className="font-bold text-primary-500">{subheading}</h5>}
      <h2 className="text-3xl sm:text-5xl font-black tracking-wide leading-tight">
        {heading}
      </h2>
      <p className="max-w-md mx-auto lg:max-w-none leading-relaxed text-sm sm:text-base lg:text-lg font-medium mt-4 text-secondary-100">
        {description}
      </p>
    </div>
  );

  return (
    <div className="relative">
      <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
        <HeadingInfo
          className="text-center lg:hidden"
          subheading={subheading}
          heading={heading}
          description={description}
        />
        <div className="mt-16 lg:mt-0">
          <div className="max-w-md lg:max-w-none mx-auto lg:mx-0 flex flex-col items-center lg:items-stretch lg:flex-row">
            <Slider
              className="w-full lg:w-5/12 flex-shrink-0"
              arrows={false}
              ref={setImageSliderRef}
              asNavFor={textSliderRef}
              fade={true}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="relative outline-none">
                  <div
                    className="rounded bg-cover bg-center h-80 sm:h-96 lg:h-144"
                    style={{ backgroundImage: `url("${testimonial.imageSrc}")` }}
                  />
                  <div className="absolute bottom-0 right-0 bg-gray-100 px-6 py-4 rounded-tl-3xl border">
                    <button
                      className="mx-3 rounded-full text-white p-2 bg-[#ff5d22] hover:bg-black focus:outline-none focus:shadow-outline transition duration-300"
                      onClick={() => imageSliderRef?.slickPrev()}
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="mx-3 rounded-full text-white p-2 bg-[#ff5d22] hover:bg-black focus:outline-none focus:shadow-outline transition duration-300"
                      onClick={() => imageSliderRef?.slickNext()}
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </Slider>
            <div className={`flex flex-col w-full lg:w-7/12 ${textOnLeft ? 'lg:pr-12 lg:order-first' : 'lg:pl-12 lg:order-last'}`}>
              <HeadingInfo
                className="hidden text-center lg:block"
                subheading={subheading}
                heading={heading}
                description={description}
              />
              <Slider
                className="outline-none"
                arrows={false}
                ref={setTextSliderRef}
                asNavFor={imageSliderRef}
                fade={true}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="outline-none">
                    <div className="relative mt-10 lg:mt-20">
                      <blockquote className="text-center lg:text-left text-sm sm:text-base lg:text-lg xl:text-xl">
                        <QuotesLeftIcon className="w-6 h-6 opacity-75 text-primary-500 inline-block mr-1 -mt-3" />
                        {testimonial.quote}
                        <QuotesRightIcon className="w-6 h-6 opacity-75 text-primary-500 inline-block ml-1 -mt-3" />
                      </blockquote>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start">
                      <img
                        src={testimonial.profileImageSrc}
                        alt={testimonial.customerName}
                        className="rounded-full w-20 h-20"
                      />
                      <div className="text-center lg:text-left sm:ml-6 mt-2 sm:mt-0">
                        <h5 className="font-semibold text-lg lg:text-xl xl:text-2xl text-primary-500">
                          {testimonial.customerName}
                        </h5>
                        <p className="font-medium text-secondary-100">{testimonial.customerTitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </div>
  );
};

const HeadingInfo = ({ subheading, heading, description, ...props }) => (
  <div {...props}>
    {subheading && <h5 className="font-bold text-primary-500">{subheading}</h5>}
    <h2 className="text-4xl sm:text-5xl font-black tracking-wide text-center lg:text-left leading-tight">
      {heading}
    </h2>
    <p className="max-w-md text-center mx-auto lg:mx-0 lg:text-left lg:max-w-none leading-relaxed text-sm sm:text-base lg:text-lg font-medium mt-4 text-secondary-100">
      {description}
    </p>
  </div>
);

const QuotesLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-primary-500 inline-block mr-1 -mt-1">
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
  </svg>
);

const QuotesRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-primary-500 inline-block ml-1 -mt-1">
    <path d="M19.417 6.679C20.447 7.773 21 9 21 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311-1.804-.167-3.226-1.648-3.226-3.489a3.5 3.5 0 013.5-3.5c1.073 0 2.099.49 2.748 1.179zm-10 0C10.447 7.773 11 9 11 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311C4.591 12.322 3.17 10.841 3.17 9a3.5 3.5 0 013.5-3.5c1.073 0 2.099.49 2.748 1.179z" />
  </svg>
);

const DecoratorBlob1 = () => (
  <div className="absolute w-32 top-0 left-0 -z-10 text-primary-500 opacity-25 transform -translate-x-full">
    {/* Add your decorator SVG here */}
  </div>
);

const DecoratorBlob2 = () => (
  <div className="absolute w-32 bottom-0 right-0 -z-10 text-pink-500 opacity-15 transform translate-x-2/3 translate-y-8">
    {/* Add your decorator SVG here */}
  </div>
);

export default Testimonials;
