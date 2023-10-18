import React from 'react';

const EmailLink = ({ email }) => {
  const handleEmailClick = () => {
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className='cursor-pointer text-blue-800 font-bold px-3 py-2 border' onClick={handleEmailClick}>
      ⏎ Reply
    </div>
  );
};

export default EmailLink;