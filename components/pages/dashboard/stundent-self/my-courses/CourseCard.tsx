import React from 'react'
import Image from 'next/image'

import Link from 'next/link'



const CourseCard = ({ item }: { item: any }) => {
  
  return (
    <Link href={`/dashboard/my-course/${item?._id}`} passHref>
      <div className='w-[275px] h-[406px] cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:scale-[1.02]'>
        <div className='flex flex-col h-full'>
          {/* Course Image */}
          <div className='relative h-[180px] w-full overflow-hidden'>
            <Image 
              src={item?.fileUrl || '/default-course-image.jpg'} 
              layout='fill'
              objectFit='cover'
              alt={item?.title || 'Course image'}
              className='hover:scale-105 transition-transform duration-500'
            />
            {item.isDiscount && (
              <div className='absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold'>
                SALE
              </div>
            )}
          </div>
          
          {/* Course Content */}
          <div className='p-4 flex-1 flex flex-col'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2 line-clamp-2'>
              {item?.title || 'Untitled Course'}
            </h3>
            
            <div className='flex items-center text-sm text-gray-600 mb-3'>
              <span className='mr-3'>{item?.language || 'English'}</span>
              <span>•</span>
              <span className='ml-3'>{item?.durationInMinutes || '0'} min</span>
            </div>
            
            <div className='mb-3'>
              <span className={`px-2 py-1 text-xs rounded-full ${
                item?.level === 'Beginner' ? 'bg-blue-100 text-blue-800' :
                item?.level === 'Intermediate' ? 'bg-purple-100 text-purple-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {item?.level || 'All Levels'}
              </span>
            </div>
            
            <div className='mt-auto pt-2'>
              {/* <div className='flex items-center'>
                {item.isDiscount ? (
                  <>
                    <span className='text-lg font-bold text-gray-900'>
                      ${item.discountPrice}
                    </span>
                    <span className='ml-2 text-sm text-gray-500 line-through'>
                      ${item.price}
                    </span>
                  </>
                ) : (
                  <span className='text-lg font-bold text-gray-900'>
                    ${item.price || 'Free'}
                  </span>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
