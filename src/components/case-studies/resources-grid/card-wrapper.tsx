'use client';

import clsx from "clsx";
import { PropsWithChildren } from "react";

interface CardWrapperProps extends PropsWithChildren {
    zigzag: boolean,
    index: number
}

export default function CardWrapper({ zigzag, children, index }: CardWrapperProps) {

    const wrapperClasses = clsx(
        "flex",
        zigzag
            ? [
                index % 2 === 0 ? "justify-start" : "justify-end",
                index % 2 !== 0 && "md:mt-[35%]"
            ]
            : "justify-center"
    );

    const innerClasses = clsx(
        "mx-auto w-full",
        zigzag
            ? [
                "max-w-[95vw]",
                "sm:max-w-xl",
                "md:max-w-none",
                "md:w-11/12",
                "lg:w-10/12",
                "md:pr-4"
            ]
            : [
                "max-w-[95vw]",
                "sm:max-w-2xl",
                "md:max-w-none",
                "md:w-11/12",
                "lg:w-11/12"
            ]
    );

    return (
        <div className={wrapperClasses}>
            <div className={innerClasses}>{children}</div>
        </div>
    );
}
