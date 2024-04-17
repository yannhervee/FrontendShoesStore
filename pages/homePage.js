import React, { useState } from 'react';
import Link from 'next/link';

const HomePage = () => {
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-white pr-20">
        <h1>Home page </h1>
        <Link href='/login'>
            <span>Shop now</span>
        </Link>
     
    </div>
  );
};

export default HomePage;