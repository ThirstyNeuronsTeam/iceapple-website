import React from 'react';

const HomePageIntro: React.FC = () => {
    return (
        <div className='absolute right-0 h-full w-[65%] md:w-[45%] flex justify-start pt-50 md:pt-0 md:justify-center  flex-col gap-5 md:gap-10'>
            <div className='flex flex-col text-2xl md:text-6xl text-highlight font-bold gap-2 md:gap-4'>
                <p>
                    Creating <br />

                    Tomorrow&apos;s<br />

                    Solutions Today<br />
                </p>
            </div>
            <span className='text-wrap w-[70%] md:w-full text-contentcolor'>Innovation-driven tech resolution for Success</span>
            <button className='bg-button-background w-[120px] h-[50px] md:w-[300px] md:h-[50px] text-button-foreground'>Case Studies</button>
        </div>
    );
};

export default HomePageIntro;