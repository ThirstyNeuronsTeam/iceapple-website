import React, { JSX } from 'react';
import Image, { StaticImageData } from 'next/image';

interface TopContentProps {
    imageSrc: StaticImageData;
    children: JSX.Element[];
}

const TopContent: React.FC<TopContentProps> = (props) => {
    return (
        <section className="w-screen h-screen relative">
            <div className="bg-background-secondary h-[110%] w-[90%] left-[10vw] absolute"></div>
            {/*  <Image
                alt="Banner"
                src={props.imageSrc}
                className='absolute bottom-0 left-0 md:w-[60%] w-[80%]'
                width={500}
                height={450}
                sizes="50vw"
                style={{
                    height: "auto",
                }}
            />
           <div className='absolute right-0 h-full w-[65%] md:w-[45%] flex justify-center  flex-col gap-5 md:gap-10'>
                <div className='flex flex-col text-2xl md:text-6xl text-highlight font-bold gap-2 md:gap-4'>
                    {props.children[0]}
                </div>
                <span className='text-wrap w-[70%] md:w-[90%] text-contentcolor'>{props.children[1]}</span>
            </div> */}

            <Image
                alt="Banner"
                src={props.imageSrc}
                className='absolute bottom-0 left-0 md:w-[60%] w-[80%]'
                width={500}
                height={450}
                sizes="50vw"
                style={{
                    height: "auto",
                }}
            />
            <div className='absolute right-0 h-full w-[65%] md:w-[45%] flex justify-center  flex-col gap-5 md:gap-10'>
                <div className='flex flex-col text-2xl md:text-6xl text-highlight font-bold gap-2 md:gap-4'>
                    {props.children[0]}
                </div>
                <span className='text-wrap w-[70%] md:w-[90%] text-contentcolor'>{props.children[1]}</span>
            </div>
        </section>
    );
};

export default TopContent;