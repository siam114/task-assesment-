import clsx from 'clsx'
import React, { ReactNode } from 'react'

type Props = {
    classNames?: string;
    children: ReactNode;
}

const PageLayout = ({ classNames, children }: Props) => {
    return (
        <div className='w-full h-[calc(100vh-128px)] relative'>
            <div className={clsx('bg-[#040612] relative min-h-44 w-full z-[-1]', classNames)}>
                <img src={"/icons/overlay.svg"} className='absolute -left-35 -top-20 w-lg h-xl' />
                <img src={"/icons/banner-img-r.png"} className='absolute opacity-15 right-14 -top-8 h-48 w-72' />
                <img src={"/icons/overlay.svg"} className='absolute -right-35 -top-30 w-xl h-lg' />
            </div>
            <div className='w-full px-12 h-full mb-10 -mt-24 z-10 relative'>
                {children}
            </div>
        </div>
    )
}

export default PageLayout
