import React from 'react'
import Image from 'next/image'
import img  from '../../../../../assets/No_image_.png';
import star  from '../../../../../assets/star.png';
import Link from 'next/link'


const CourseCard = ({item}:{item:any}) => {
  return (
   <Link href={"/dashboard/my-course/[id]"} as={`/dashboard/my-course/${item.id}`}>
    <div className='w-[275px] h-[406px] cursor-pointer overflow-hidden'>
        <div className='test bg-[#FFFFFF] h-full'>
         <div className='!w-full bg-[#FFFFFF]'>
           <Image src={item.course ? item.course.courseImage : img} className='!w-full h-auto' 
              width={500}
              height={400}
              objectFit="cover"
              alt='courseImage'
              />
         </div>
            <div className='bg-[#FFFFFF] p-3'>
                           <h4 className='text-lg font-medium h-[4.5rem] overflow-auto'>{item.course == null ? "Empty":item.course.title}</h4>
                         <div>
                           <div className='flex justify-between pt-3 pb-2'>
                               <span className='text-[#8A92A6]'><Image src={star}/>{item.course == null ? 0 : item.course.ratingsAverage}</span>
                           </div>
                           <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                                 <div className="bg-[#1AA053] h-1.5 rounded-full dark:bg-blue-500" style={{width: item.completed}}></div>
                           </div>
                           <span className='text-[#8A92A6]'>{item.completed}% Completed</span>
                         </div>    
            </div>
         </div> 
    </div>
  </Link>  
  )
}

export default CourseCard