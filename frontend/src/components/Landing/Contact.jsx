import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-blue-500 min-h-screen flex flex-col items-center justify-between">
      <div className="flex-grow flex items-center justify-center p-4 w-full">
        <div className="bg-blue-200 p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center ">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block font-bold text-black">Name:</label>
              <input type="text" name="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition-transform hover:scale-105" />
            </div>
            <div>
              <label className="block font-bold text-black">Email:</label>
              <input type="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition-transform hover:scale-105" />
            </div>
            <div>
              <label className="block font-bold text-black">Phone:</label>
              <input type="tel" name="phone" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition-transform hover:scale-105" />
            </div>
            <div>
              <label className="block font-bold text-black">Message:</label>
              <textarea name="message" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition-transform hover:scale-105"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Send</button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="font-semibold text-black">Or reach us on:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="https://wa.me/your-number" className="text-green-500 text-2xl"><FaWhatsapp /></a>
              <a href="https://instagram.com/your-profile" className="text-pink-500 text-2xl"><FaInstagram /></a>
              <a href="https://facebook.com/your-profile" className="text-blue-700 text-2xl"><FaFacebook /></a>
              <a href="mailto:your-email@gmail.com" className="text-red-600 text-2xl"><FaEnvelope /></a>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-white w-full py-4 text-center">
        <p className="font-bold">If you have any questions or need further information, please reach out to us at:</p>
        <ul className="list-disc list-inside mt-2 font-bold">
          <li>Email: contact@spacehub.com</li>
          <li>Phone: +123 456 7890</li>
        </ul>
        <p className="mt-4 font-bold">© 2024 SpaceHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Contact;