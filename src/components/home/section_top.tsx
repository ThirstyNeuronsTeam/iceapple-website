import React from 'react';
import Image from 'next/image';
import banner from '@/assets/banner.png';
import HomePageIntro from '@/components/homePageIntro';

const SectionTop: React.FC = () => {
    return (
        <section className="w-screen h-screen relative">
            <div className="bg-background-secondary h-[110%] w-[90%] left-[10vw] absolute"></div>
            <Image
                alt="Banner"
                src={banner}
                className='absolute bottom-0 left-0 md:w-[45%] w-[80%]'
                width={500}
                height={450}
                sizes="50vw"
                style={{
                    height: "auto",
                }}
            />
            <HomePageIntro />
        </section>
    );
};

export default SectionTop;