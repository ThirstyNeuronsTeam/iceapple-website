import React from 'react';
import aboutus_main from "@/assets/aboutus_main.png"
import TopContent from '@/components/top-content';

// /Users/senthilkumaranchinnathambi/Desktop/Desktop/work/collections/icepple-collection/iceapple-website/src/app/page.tsx

const AboutUs: React.FC = () => {
  return (

    <main className='-mt-25'>
      <TopContent imageSrc={aboutus_main}>
        <p>Ignite Business<br></br> Brilliance With <br></br>Futuristic Digital <br></br>Solutions</p>
        <>Empower The Needs Of Today And Opportunities Of Tomorrow</>
      </TopContent>

    </main>

  );
};

export default AboutUs;

