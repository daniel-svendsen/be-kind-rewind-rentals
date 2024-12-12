import React, { useState, useEffect } from 'react';

const HeroSection = () => {
    const backgrounds = [
        'https://picsum.photos/1920/1080?random=1',
        'https://picsum.photos/1920/1080?random=2',
        'https://picsum.photos/1920/1080?random=3',
    ];

    const [currentBackground, setCurrentBackground] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [backgrounds.length]);

    return (
        <div
            className="w-screen h-screen flex items-center justify-center text-white text-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${backgrounds[currentBackground]})`,
            }}
        >
            <div className="bg-black bg-opacity-50 p-8 rounded-lg">
                <h1 className="text-6xl font-extrabold">Be Kind Rewind Rentals</h1>
                <p className="mt-4 text-xl">Hyr dina favoritfilmer enkelt och snabbt!</p>
            </div>
        </div>
    );
};

export default HeroSection;
