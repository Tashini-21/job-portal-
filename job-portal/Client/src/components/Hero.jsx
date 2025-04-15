import React, { useContext, useRef } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {
    const { setSearchFilter, setIsSearched } = useContext(AppContext);

    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value,
        });
        setIsSearched(true);
       
    };

    return (
        <div className='container 2xl:px-20 mx-auto my-10'>
            <div className='bg-gradient-to-r from-slate-700 to-slate-900 text-white py-16 text-center mx-2 rounded-xl'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>
                    Over 10,000+ jobs to apply
                </h2>
                <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>
                    Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
                </p>

                <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto flex-wrap sm:flex-nowrap gap-2'>
                    <div className='flex items-center flex-grow'>
                        <img className='h-4 sm:h-5 mr-2' src={assets.search_icon} alt='search icon' />
                        <input
                            type='text'
                            placeholder='Search for jobs'
                            className='max-sm:text-xs p-2 rounded outline-none w-full'
                            ref={titleRef}
                        />
                    </div>

                    <div className='flex items-center flex-grow'>
                        <img className='h-4 sm:h-5 mr-2' src={assets.location_icon} alt='location icon' />
                        <input
                            type='text'
                            placeholder='Location'
                            className='max-sm:text-xs p-2 rounded outline-none w-full'
                            ref={locationRef}
                        />
                    </div>

                    <button
                        onClick={onSearch}
                        className='bg-blue-600 px-6 py-2 rounded text-white m-1 whitespace-nowrap'
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className='border border-grey-300 shadow-md mx-2 mt-5 p-6 rounded-md flex justify-center'>
                <div className='flex justify-center gap-10 lg:gap-16 flex-wrap items-center'>
                    <p className='font-medium'>Trusted By</p>
                    <img className='h-6' src={assets.microsoft_logo} alt='Microsoft' />
                    <img className='h-6' src={assets.Hemas_logo} alt='Hemas' />
                    <img className='h-6' src={assets.virtusa_logo} alt='Virtusa' />
                    <img className='h-6' src={assets.samsung_logo} alt='Samsung' />
                    <img className='h-6' src={assets.Nestle_logo} alt='Nestle' />
                    <img className='h-6' src={assets.IFS_logo} alt='IFS' />
                </div>
            </div>
        </div>
    );
};

export default Hero;
