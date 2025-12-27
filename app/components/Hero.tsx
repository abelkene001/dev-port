import React from 'react';

const Hero = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center items-start p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
