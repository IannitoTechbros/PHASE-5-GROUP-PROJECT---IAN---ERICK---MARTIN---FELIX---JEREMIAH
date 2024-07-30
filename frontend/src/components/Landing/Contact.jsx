import React from 'react';

const Contact = () => {
  return (
    <div className="p-8" style={{ backgroundColor: '#040244', color: 'white' }}>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p>If you have any questions or need further information, please reach out to us at:</p>
      <ul className="list-disc ml-8 mt-4">
        <li>Email: contact@spacehub.com</li>
        <li>Phone: +123 456 7890</li>
      </ul>
    </div>
  );
};

export default Contact;
