import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
