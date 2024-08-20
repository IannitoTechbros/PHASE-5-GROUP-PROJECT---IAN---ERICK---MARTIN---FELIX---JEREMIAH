import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import backgroundImage from '../../assets/images/8448.jpg';
import logo from '../../assets/images/logo.png';
import { ReactComponent as PriceIcon } from 'feather-icons/dist/icons/dollar-sign.svg';
import { ReactComponent as LocationIcon } from 'feather-icons/dist/icons/map-pin.svg';
import { ReactComponent as StarIcon } from 'feather-icons/dist/icons/star.svg';
import { ReactComponent as ChevronLeftIcon } from 'feather-icons/dist/icons/chevron-left.svg';
import { ReactComponent as ChevronRightIcon } from 'feather-icons/dist/icons/chevron-right.svg';
import { ReactComponent as FacebookIcon } from 'feather-icons/dist/icons/facebook.svg';
import { ReactComponent as TwitterIcon } from 'feather-icons/dist/icons/twitter.svg';
import { ReactComponent as YoutubeIcon } from 'feather-icons/dist/icons/youtube.svg';
import tw from 'twin.macro';
import styled from 'styled-components';
import Footer from '../common/Footer';
import Testimonials from '../common/Testimonials';
import './ContactUs.css';
import "./Home.css"; // Import the CSS file


const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between mt-8 mx-8 sm:mx-4`;
const Heading = tw.h2`text-3xl font-bold`;
const Controls = tw.div`flex items-center`;
const ControlButton = styled.button`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2 hover:bg-[#ff5d22]`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = styled(ControlButton)``;
const NextButton = styled(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16 overflow-hidden`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
  .slick-list {
    ${tw`overflow-hidden`}
  }
`;
const Card = tw.div`h-full border-2 border-gray-200 flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imagesrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100 `}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800 `;

const PrimaryButton = tw(Link)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6 bg-blue-500 text-white hover:bg-[#ff5d22] text-center`;

const imageUrls = [
  "https://img.freepik.com/free-photo/wedding-table-arrangement-outdoors_23-2149617132.jpg?t=st=1723188249~exp=1723191849~hmac=9cabbd978118909c06b608a8f4d7632d667fa49d108e799749e50de89918a82a&w=1380",
  "https://img.freepik.com/free-photo/restaurant-hall-ornated-with-flowers_140725-6308.jpg?t=st=1723188307~exp=1723191907~hmac=5937649a5136bdebf0bc9ed5249f153a9c2152ed0418ba45e51678cb2c83c881&w=1380",
  "https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-luxury-hotel-resort_146671-18835.jpg?t=st=1723188363~exp=1723191963~hmac=ca4cd4201fd0adc3195484327590b3376dbcb441f0904de5e313602c5dc9ca00&w=1380",
  "https://img.freepik.com/free-photo/beautiful-sky-orchid-water-outdoor_1203-5205.jpg?t=st=1723188390~exp=1723191990~hmac=3a9fb35efe142c201f02231f804670fbfc53c5b0f66e547c0a75831cb3a6a383&w=1380",
  "https://img.freepik.com/free-photo/elegant-wedding-dishes_1157-17838.jpg?t=st=1723188447~exp=1723192047~hmac=c46bf1ca24423173908b53bc7da490c02ef093afbf1642e17912e348c536b192&w=1380",
  "https://img.freepik.com/free-photo/white-daylight-illuminates-wooden-hangar-prepared-wedding_8353-788.jpg?t=st=1723188476~exp=1723192076~hmac=b068130763c73f6c9d96f8768cf01df21a5b18ce3ba0c578b0f610b8ac6b031d&w=1380",
  "https://img.freepik.com/free-photo/restaurant-hall-with-turquoise-chairs-french-windows-navy-coloured-ceiling_140725-8448.jpg?t=st=1723188582~exp=1723192182~hmac=815b7a41ceb9f843a5ac987b59069471a421a8abc2cc4762956f669eaa364b3b&w=1060"
];

const Home = () => {
  const [sliderRef, setSliderRef] = useState(null);
  const [cards, setCards] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);
  const [fade, setFade] = useState(true);
  
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://space-hub-backend-gphk.onrender.com/spaces');
        const spaces = response.data.map(space => ({
          imagesrc: `https://space-hub-backend-gphk.onrender.com/${space.image}`,
          title: space.name,
          locationText: space.location,
          pricingText: space.ratecard,
        }));
        setCards(spaces);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setBgIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        setFade(true);
      }, 1000); // Wait for the fade-out animation to complete
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className="flex h-screen">
        <div className="w-1/2 bg-[#F7FAFC] p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <img src={logo} alt="Space Hub Logo" className="w-10 h-10 rounded-full mr-4" />
              <h1 className="text-2xl font-bold text-[#040244]">Space Hub</h1>
            </div>
            <nav>
              <ul className="flex space-x-6 text-sm">
                <li><Link to="/userspaces" className="relative hover:text-[#ff5d22] transition-colors duration-300 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#ff5d22] after:bottom-0 after:left-0 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Available Spaces</Link></li>
                <li><Link to="/about" className="relative hover:text-[#ff5d22] transition-colors duration-300 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#ff5d22] after:bottom-0 after:left-0 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">About Us</Link></li>
                <li><Link to="/contact" className="relative hover:text-[#ff5d22] transition-colors duration-300 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#ff5d22] after:bottom-0 after:left-0 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Contact Us</Link></li>
                <li><Link to="/login" className="relative hover:text-[#ff5d22] transition-colors duration-300 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#ff5d22] after:bottom-0 after:left-0 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Login</Link></li>
              </ul>
            </nav>
          </div>

          <div className="flex-grow flex flex-col justify-center">
            <div className="mb-8 animate-fade-in transition duration-3000">
              <h2 className="text-3xl font-bold mb-5 animate-slide-in-left">
                <span className="text-[#ff5d22]">CREATING MEMORABLE</span> <span className="text-[#040244]">EVENTS</span>
              </h2>
              <h2 className="text-4xl font-bold animate-slide-in-right">
                <span className="text-[#ff5d22]">ONE SPACE</span> <span className="text-[#040244]">AT A TIME</span>
              </h2>
            </div>

            <p className="text-[#040244] mb-8 max-w-md text-lg animate-fade-in transition duration-700">
              We've been in the rental spaces business across the world for 5 years now. We assure you that you will always enjoy your experience with us.
            </p>

            <div className="flex space-x-4 animate-fade-in transition duration-700">
              <Link 
                to="/login" 
                className="px-6 py-3 bg-[#ff5d22] hover:bg-[#040244] text-white rounded font-semibold hover:bg-opacity-90 transition duration-300"
              >
                Sign Up
              </Link>
              <Link 
                to="/userspaces" 
                className="px-6 py-3 bg-[#040244] hover:bg-[#ff5d22] text-white rounded font-semibold hover:bg-opacity-90 transition duration-300"
              >
                Search Spaces
              </Link>
            </div>
          </div>
        </div>

        <div
        className={`background-image ${fade ? "fade-in" : "fade-out"}`}
        style={{ backgroundImage: `url(${imageUrls[bgIndex]})` }}
      ></div>
      </div>
      <Container>
        <Content>
          <HeadingWithControl>
            <Heading>Popular Spaces</Heading>
            <Controls>
              <PrevButton onClick={sliderRef?.slickPrev}>
                <ChevronLeftIcon />
              </PrevButton>
              <NextButton onClick={sliderRef?.slickNext}>
                <ChevronRightIcon />
              </NextButton>
            </Controls>
          </HeadingWithControl>
          <CardSlider ref={setSliderRef} {...sliderSettings}>
            {cards.map((card, index) => (
              <Card key={index}>
                <CardImage imagesrc={card.imagesrc} />
                <TextInfo>
                  <TitleReviewContainer>
                    <Title>{card.title}</Title>
                    <RatingsInfo>
                      <StarIcon />
                      <Rating>4.5</Rating>
                    </RatingsInfo>
                  </TitleReviewContainer>
                  <SecondaryInfoContainer>
                    <IconWithText>
                      <IconContainer>
                        <LocationIcon />
                      </IconContainer>
                      <Text>{card.locationText}</Text>
                    </IconWithText>
                    <IconWithText>
                      <IconContainer>
                        <PriceIcon />
                      </IconContainer>
                      <Text>{card.pricingText}</Text>
                    </IconWithText>
                  </SecondaryInfoContainer>
                </TextInfo>
                <PrimaryButton to={`/userspaces/`}>
                  View Space
                </PrimaryButton>
              </Card>
            ))}
          </CardSlider>
        </Content>
      </Container>
      <div className='text-center'>
          <h2 className='text-3xl font-bold mb-6 animate-fade-in'>Why Us?</h2>
          <div className='flex flex-wrap justify-center'>
            <div className='w-full sm:w-1/2 lg:w-1/3 mb-6 px-4 animate-slide-in-left'>
              <div className='bg-[#ff5d22] p-6 shadow-lg border-0 rounded-lg text-center hover:bg-blue-600 hover:text-white transition-colors duration-300'>
                <div className='text-yellow-500 text-4xl mb-4'>
                  ⭐
                </div>
                <h3 className='text-xl font-semibold mb-2'>Quality</h3>
                <p className='mt-2'>
                  We provide high-quality event spaces that ensure an outstanding experience for every occasion.
                </p>
              </div>
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/3 mb-6 px-4 animate-slide-in-bottom'>
              <div className='bg-[#ff5d22] p-6 shadow-lg border-0 rounded-lg text-center hover:bg-blue-600 hover:text-white transition-colors duration-300'>
                <div className='text-green-500 text-4xl mb-4'>
                  ✔️
                </div>
                <h3 className='text-xl font-semibold mb-2'>Reliability</h3>
                <p className='mt-2'>
                  You can rely on us for transparent pricing, open communication, and consistent quality in every interaction.
                </p>
              </div>
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/3 mb-6 px-4 animate-slide-in-right'>
              <div className='bg-[#ff5d22] p-6 shadow-lg border-0 rounded-lg text-center hover:bg-blue-600 hover:text-white transition-colors duration-300'>
                <div className='text-red-500 text-4xl mb-4'>
                  ⏰
                </div>
                <h3 className='text-xl font-semibold mb-2'>Timeliness</h3>
                <p className='mt-2'>
                  We adhere to schedules and prioritize efficiency to ensure timely delivery of our services.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-center py-10'>
      <div className='md:w-1/2 p-4'>
        <img
          src='https://plus.unsplash.com/premium_photo-1661962296943-bc59322f6424?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BhY2VzJTIwZm9yJTIwcmVudHxlbnwwfHwwfHx8MA%3D%3D'
          alt='spaces'
          className='w-full h-auto rounded-lg shadow-lg object-cover'
        />
      </div>
      <div className='md:w-1/2 p-4'>
        <div className='mb-6'>
          <h2 className='text-4xl font-bold mb-4 text-gray-800 text-center'>Exceptional Space Services</h2>
          <p>
            Discover premium spaces designed to meet your every need. Our offerings
            are characterized by quality, comfort, and convenience, ensuring a superior 
            experience for all our clients. With our dedicated team, we provide unmatched 
            customer service and a range of options to suit various requirements.
          </p>
        </div>
        <div className='flex flex-col md:flex-row gap-8 md:gap-16 justify-center'>
          <div className='flex flex-col space-y-8'>
            <div className='flex flex-col items-center'>
                <h3 className='text-lg text-blue-500 font-bold'>47</h3>
                <p className='font-semibold'>Counties Covered</p>
            </div>
            <div className='flex flex-col items-center'>
                <h3 className='text-lg text-blue-500 font-bold'>500 +</h3>
                <p className='font-semibold'>Clients</p>
            </div>
          </div>
          <div className='flex flex-col space-y-8'>
            <div className='flex flex-col items-center'>
                <h3 className='text-lg text-blue-500 font-bold'>5</h3>
                <p className='font-semibold'>Years of Experience</p>
            </div>
             <div className='flex flex-col items-center'>
                <h3 className='text-lg text-blue-500 font-bold'>120</h3>
                <p className='font-semibold'>Available Spaces</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <Testimonials />
    <div className="container">
          <header>
            <h1 className='text-3xl font-bold mb-6 animate-fade-in text-blue-950'>Follow Us On Social Media</h1>
          </header>
          <ul className="accordion">
            <li className="tab">
              <div className="social youtube">
                <a href="https://youtube.com/traversymedia" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
              <div className="content">
                <h1>YouTube</h1>
                <p>Follow us on YouTube for the latest Space rentals</p>
              </div>
            </li>
            <li className="tab">
              <div className="social twitter">
                <a href="https://twitter.com/traversymedia" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
              <div className="content">
                <h1>Twitter</h1>
                <p>Follow us on Twitter for updates, article & blog shares, and more</p>
              </div>
            </li>
            <li className="tab">
              <div className="social facebook">
                <a href="https://facebook.com/traversymedia" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
              <div className="content">
                <h1>Facebook</h1>
                <p>Follow us on Facebook to stay up to date with our work</p>
              </div>
            </li>
            <li className="tab">
              <div className="social instagram">
                <a href="http://instagram.com/traversymedia" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <div className="content">
                <h1>Instagram</h1>
                <p>Follow us on Instagram for a more personal look into our work</p>
              </div>
            </li>
          </ul>
        </div>
    <Footer/>
    </div>
  );
};

export default Home;