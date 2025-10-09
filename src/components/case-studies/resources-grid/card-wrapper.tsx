'use client';

import { PropsWithChildren } from "react";
import { useDeviceType } from "../../../../hooks/useDeviceType";

interface CardWrapperProps extends PropsWithChildren {
    zigzag: boolean,
    index: number
}

export default function CardWrapper({ zigzag, children, index }: CardWrapperProps) {

    const deviceType = useDeviceType();

    return <div

        className={
            zigzag
                ? deviceType === "mobile"
                    ? `flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`
                    : index % 2 !== 0
                        ? "md:mt-[35%] flex"
                        : "flex"
                : "flex justify-center"
        }
    >
        <div
            className={
                deviceType === "mobile"
  ? "max-w-[95vw] w-full mx-auto"
                    : "w-full md:w-11/12 lg:w-auto md:pr-4 mx-auto"
            }
        >
            {children}
        </div>
    </div>
}