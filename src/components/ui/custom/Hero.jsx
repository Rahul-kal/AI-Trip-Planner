    import React from 'react';
    import { Button } from '../button';
    import { useNavigate } from 'react-router-dom';

    function Hero() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center mx-56 gap-9">
        <h1 className="font-extrabold text-[60px] text-center mt-16">
            <span className="text-[#f56551]">
            Discover Your Next Adventure with AI
            </span>
            : Personalized Itineraries at Your Fingertips
        </h1>
        <p className="text-xl text-gray-500 text-center">
            Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>
        <Button onClick={() => navigate('/create-trip')}>
            Get Started, It's Free
        </Button>

        <img src='/landing.png' className='' />
        </div>
    );
    }

    export default Hero;
