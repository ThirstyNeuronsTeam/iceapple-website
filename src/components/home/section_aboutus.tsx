import React from 'react';
import Image from 'next/image';
import home_aboutus_1 from '@/assets/home_aboutus_1.png';
import home_aboutus_2 from '@/assets/home_aboutus_2.png';
import SectionTitle from '../SectionTitle';

const ValuesList = () => {
    return <>
    
    <span className='text-content font-bold text-3xl'>Our Values</span>
    <ul className='list-disc flex flex-col gap-5 pl-5'>
        <li>Partnerships and Collaboration</li>
        <li>Empowering Innovation</li>
        <li>Long-lasting Relationships</li>
        <li>Thriving Together</li>
        <li>Inspiring Possibilities</li>
    </ul>
    </>
}

const Content = () => {
    return <>
        <p>
            We are a dynamic technology company providing innovative and cost-effective solutions for businesses across industries. Our passionate team of engineers, with expertise in Automotive, Industrial, and Gaming domains, focuses on developing deep technology products and delivering niche software development services.
        </p>
        <p>
            With a vision to build a world-class technology services and product development company, IceApple leverages cutting-edge technologies like Artificial Intelligence, Machine Learning, web, cloud, IoT, mobile app development, and embedded software.
        </p>
    </>
}

const SectionAboutUs: React.FC = () => {
    return (
        <>
            <section className="w-screen h-[115vh] relative hidden md:block">
                <div className="bg-background-primary h-[110%] w-[90%] left-[0] top-[0] absolute"></div>
                <div className='absolute top-[5%] left-[0%] z-10 w-[53%]'>
                    <Image
                        alt="Banner"
                        src={home_aboutus_1}
                        className='top-[0%] left-[0%]'
                        width={300}
                        height={300}
                        sizes="30vw"
                        style={{
                            width: "100%",
                            height: "auto",
                        }}
                    />
                    <Image
                        alt="Banner"
                        src={home_aboutus_2}
                        className='absolute top-[35%] left-[40%] '
                        width={300}
                        height={300}
                        sizes="30vw"
                        style={{
                            width: "100%",
                            height: "auto",
                        }}
                    />
                </div>

                <div className='flex flex-col absolute w-[25%] gap-2 top-[12%] left-[68%] z-5'>
                    <SectionTitle>-- A brief overview of ‘About us’</SectionTitle>
                    <span className='text-content text-6xl font-bold w-[400px]'>Driven by the desire to drive innovation.</span>
                    <div className='flex flex-col text-conten gap-10 pl-15 mt-8 text-lg'>
                        <Content />
                    </div>

                </div>


                <div className="bg-background-secondary h-[110%] w-[90%] top-[80%] absolute z-0">
                    <div className='text-content flex flex-col absolute w-[30%] gap-5  left-[9%] bg-white p-15 pb-35 '>
                        <span className='text-content font-bold text-3xl'>Our Values</span>
                        <ValuesList />
                    </div>
                </div>
            </section>
            <section className="w-screen h-[115vh]  flex flex-col px-5  md:hidden">
                <div className='z-10 w-full block h-max'>
                    <Image
                        alt="Banner"
                        src={home_aboutus_1}
                        className='-ml-10'
                        width={300}
                        height={300}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                            width: "90%",
                            height: "auto",
                        }}
                    />
                    <Image
                        alt="Banner"
                        src={home_aboutus_2}
                        className="-mt-50 ml-10"
                        width={300}
                        height={300}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                            width: "90%",
                            height: "auto",
                        }}
                    />

                </div>

                <div className='flex flex-col  w-full gap-2  z-5'>
                    <SectionTitle>-- A brief overview of ‘About us’</SectionTitle>
                    <span className='text-content text-xl font-bold w-full'>Driven by the desire to drive innovation.</span>
                    <div className='flex flex-col text-conten gap-10  text-lg'>
                        <Content />
                    </div>

                </div>


                <div className="bg-background-secondary h-[110%] w-full  z-0">
                    <div className='text-content flex flex-col  w-full gap-5  bg-white p-15 pb-35 '>
                        <span className='text-content font-bold text-xl'>Our Values</span>
                        <ValuesList />
                    </div>
                </div>
            </section>
        </>
    );
};

export default SectionAboutUs;