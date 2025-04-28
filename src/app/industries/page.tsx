import React from 'react';
import industries_main from "@/assets/industries_main.png"
import TopContent from '@/components/top-content';

// /Users/senthilkumaranchinnathambi/Desktop/Desktop/work/collections/icepple-collection/iceapple-website/src/app/page.tsx

const Industries: React.FC = () => {
  return (

    <main className='-mt-25'>
      <TopContent imageSrc={industries_main}>
      <p>Industry-Leading <br/> Software Solutions: <br/> Sky-Rocketing <br/> Efficiency and <br/> Growth</p>
      <>IceApple takes pride in crafting a diverse range of custom software solutions, empowering numerous industries to unlock new value, foster transparency, and inspire trust across their businesses.</>
      </TopContent>
   
    </main>

  );
};

export default Industries;

