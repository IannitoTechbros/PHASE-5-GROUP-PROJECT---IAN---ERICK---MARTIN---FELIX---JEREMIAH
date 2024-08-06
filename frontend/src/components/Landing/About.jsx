import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.png";
import clouds from "../../assets/images/742.jpg"; // Ensure this path is correct
import { Link } from "react-router-dom";
import reliabilityIcon from "../../assets/images/reliability.png"; // Placeholder icons, update paths as necessary
import commitmentIcon from "../../assets/images/commitment.png";
import timelyDeliveryIcon from "../../assets/images/timelyDelivery.png";
import innovationIcon from "../../assets/images/innovation.png";
import customerSatisfactionIcon from "../../assets/images/customerSatisfaction.png";
import peopleFirstIcon from "../../assets/images/peopleFirst.png";
import background2 from "../../assets/images/background2.jpg"; // Ensure this path is correct

const dropDownAnimation = {
  hidden: { opacity: 0, y: -50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.5,
      duration: 0.5,
    },
  }),
};

const slideInAnimation = {
  hidden: { opacity: 0, x: 50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.5,
      duration: 0.5,
    },
  }),
};

function About() {
  const [accordionOpen, setAccordionOpen] = useState({});
  const [inactive, setInactive] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const toggleAccordion = (section) => {
    setAccordionOpen((prev) => ({ ...prev, [section]: !prev[section] }));
    setInactive(false);

    // Clear any existing timeout to reset the timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout to collapse the accordion after 30 seconds of inactivity
    const newTimeoutId = setTimeout(() => {
      setAccordionOpen({});
      setInactive(true);
    }, 30000); // 30 seconds

    setTimeoutId(newTimeoutId);
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header
        className="relative bg-transparent p-4 flex justify-between items-center"
        style={{
          backgroundImage: `url(${clouds})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <a href="/" className="flex items-center space-x-2 relative z-10">
          <img src={logo} alt="Space Hub Logo" className="w-20 h-18" />
        </a>
        <nav className="flex space-x-4 relative z-10">
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>
          <Link to="/contact" className="hover:text-yellow-400">
            Contact Us
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative text-white text-center py-16"
        style={{
          backgroundImage: `url(${clouds})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Who We Are</h1>
          <p className="text-lg">
            We are a dynamic team committed to providing you with unique event
            spaces and a seamless booking experience. Our mission is to make
            hosting events effortless and enjoyable.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-300 mb-4">
            Our Core Values
          </h2>
        </div>

        {/* Core Values Section */}
        <section
          className="relative py-16"
          style={{
            backgroundImage: `url(${background2})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-wrap justify-center mb-12">
            {[
              {
                icon: reliabilityIcon,
                title: "Reliability",
                text: "We ensure our clients can rely on us for transparent pricing, open communication, and consistent quality.",
              },
              {
                icon: commitmentIcon,
                title: "Commitment",
                text: "Our dedication to quality service and building lasting relationships with our clients sets us apart.",
              },
              {
                icon: timelyDeliveryIcon,
                title: "Timely Delivery",
                text: "We prioritize efficiency and adhere to schedules to ensure timely delivery of our services.",
              },
              {
                icon: innovationIcon,
                title: "Innovation",
                text: "Embracing the latest tools and technologies, we innovate to provide industry-leading solutions.",
              },
              {
                icon: customerSatisfactionIcon,
                title: "Customer Satisfaction",
                text: "We place customer satisfaction at the core of our values, crafting solutions that perfectly match client requirements.",
              },
              {
                icon: peopleFirstIcon,
                title: "People First",
                text: "We prioritize the well-being of our clients and workforce, ensuring a positive and supportive environment.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="w-full md:w-1/2 lg:w-1/3 mb-6 px-4"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={dropDownAnimation}
              >
                <div className="bg-gray-800 p-6 shadow-2xl border border-gray-600 rounded-lg text-center transition-transform duration-300 transform hover:scale-105">
                  <div className="mb-4">
                    <img
                      src={value.icon}
                      alt={`${value.title} Icon`}
                      className="w-16 h-16 mx-auto"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="mt-2">{value.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-300 mb-4 mt-6">
            What We Do
          </h2>
          <p className="text-gray-400">
            At Space Hub, we specialize in offering a diverse range of event
            spaces designed to meet various needs. We focus on providing venues
            that are both stylish and functional.
          </p>
        </div>

        {/* Accordion Section */}
        <div className="w-3/4 mx-auto mb-12 p-6 bg-gray-800 bg-opacity-75 rounded-lg transition-transform transform hover:scale-105">
          {!inactive &&
            [
              {
                title: "What is SpaceHub?",
                content:
                  "SpaceHub is a platform where you can book and pay for spaces online, ensuring a hassle-free experience for your events and activities.",
              },
              {
                title: "About SpaceHub",
                content:
                  "Founded in 2024, SpaceHub aims to simplify the process of finding and booking spaces for all your needs, from corporate meetings to private parties.",
              },
              {
                title: "Why Choose SpaceHub?",
                content:
                  "With a wide variety of spaces and user-friendly interface, SpaceHub offers the best solutions for your space rental needs, all at competitive prices.",
              },
              {
                title: "Advantages of SpaceHub",
                content:
                  "Enjoy easy booking, secure payments, and a vast selection of spaces. Our platform ensures that you find the perfect space for your event, every time.",
              },
              {
                title: "Our Mission",
                content:
                  "To connect people with the perfect spaces for their events, making the booking process simple and efficient, while providing top-notch customer service.",
              },
            ].map((section) => (
              <div
                key={section.title}
                className="mb-2 transition-transform transform hover:scale-105"
              >
                <button
                  onClick={() => toggleAccordion(section.title)}
                  className="w-full flex justify-between items-center px-4 py-2 text-lg font-semibold bg-gray-800 text-white rounded-t"
                >
                  {section.title}
                  <span>{accordionOpen[section.title] ? "-" : "+"}</span>
                </button>
                {accordionOpen[section.title] && (
                  <div className="px-4 py-2 bg-gray-700 text-white rounded-b">
                    <p>{section.content}</p>
                  </div>
                )}
              </div>
            ))}
          {inactive && (
            <button
              onClick={() => setInactive(false)}
              className="w-full flex justify-between items-center px-4 py-2 text-lg font-semibold bg-gray-800 text-white rounded transition-transform transform hover:scale-105"
            >
              Show Information
              <span>+</span>
            </button>
          )}
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-300 mb-6 mt-12">
            Why Us?
          </h2>
          <div className="flex flex-wrap justify-center">
            {[
              {
                icon: "⭐",
                title: "Quality",
                text: "We provide high-quality event spaces that ensure an outstanding experience for every occasion.",
              },
              {
                icon: "✔️",
                title: "Reliability",
                text: "You can rely on us for transparent pricing, open communication, and consistent quality in every interaction.",
              },
              {
                icon: "⏰",
                title: "Timeliness",
                text: "We adhere to schedules and prioritize efficiency to ensure timely delivery of our services.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="w-full sm:w-1/2 lg:w-1/3 mb-6 px-4"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={slideInAnimation}
              >
                <div className="bg-gray-800 p-6 shadow-2xl border-0 rounded-lg text-center transition-transform duration-300 transform hover:scale-105 hover:bg-blue-600 hover:text-white">
                  <div
                    className="text-4xl mb-4"
                    style={{
                      color:
                        value.icon === "⭐"
                          ? "yellow"
                          : value.icon === "✔️"
                          ? "green"
                          : "red",
                    }}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="mt-2">{value.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
