import React, { useState,useEffect } from 'react';
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFormContext,
} from "react-hook-form";

//component
import Creation1 from './steps/Creation1'
import Creation2 from './steps/Creation2';
import Creation3 from './steps/Creation3';
import Creation4 from './steps/Creation4';
import CourseCreationSuccessful from './steps/CourseCreationSuccessful';

export type InitialFormDataCourse = {
  title: string,
  shortDescription: string,
  category: string,
  language:string,
  durationInMinutes: number,
  price: number,
  level: string,
  featured?: boolean,
  numberOfLectures: number,
  discountPrice: number,
  isDiscount?: boolean,
  description: string,
  courseImage:string,
  videoUrl:string,
  tags:string[],
  msgtoreviewer:string
}

const InitialFormDataCourse = {
  title: "",
  shortDescription: "",
  category: "",
  language: "",
  durationInMinutes: 0,
  price: 0,
  level: "",
  featured: false,
  numberOfLectures: 0,
  discountPrice: 0,
  isDiscount: false,
  description: "",
  courseImage:"",
  videoUrl:"",
  msgtoreviewer:"",
  tags:[]
}

const CourseCreationMain = () => {
  const [formData, setFormData] = useState<InitialFormDataCourse>(InitialFormDataCourse);
  
  // console.log("form data", formData);
  const [step,setStep] = useState(1);

  const onNext = () => {
      setStep(step + 1)
  }

  const onPrev = () => {
    setStep(step - 1);
  }

  
  return (
    <>
         <div className='course_creation sm:p-3 xsm:p-[2px] lg:p-5 md:p-5 md:bg-[red]' style={{background:"#fff"}}>
            { step === 5 ? <CourseCreationSuccessful onPrev={onPrev} onNext={onNext}/>: (
               <div className="step-indicator flex items-center ">
                      <div className="flex items-center flex-col z-10 relative">
                           <div className={`${step === 1? 'activeBorder': ""}`}>
                              <div className={`${step ===1 ? "activeBg":""} m-[2px] sm:m-1 w-[35px] h-[35px] sm:w-[39px] sm:h-[39px] lg:w-[54px] lg:h-[54px] text-center relative text-[#8A92A6] rounded-full bg-[#EBEEFD] flex items-center justify-center text-[27px] font-semibold`}>1</div>
                           </div>   
                           <p className='text-[10px] sm:text-[12px]  lg:text-base font-medium mt-2'>Course Details</p>
                      </div>
                      <div className="indicator-line  w-[100%] h-[1px] bg-[#ADB5BD] flex-1 mb-5"></div>
                      <div className="flex items-center flex-col z-10 relative">
                           <div  className={`${step === 2? 'activeBorder': ""}`}>
                              <div className={`${step ===2 ? "activeBg":""} m-[2px] sm:m-1 w-[35px] h-[35px] sm:w-[39px] sm:h-[39px] lg:w-[54px] lg:h-[54px] text-center relative text-[#8A92A6] rounded-full bg-[#EBEEFD] flex items-center justify-center text-[27px] font-semibold`}>2</div>
                           </div>   
                           <p className='text-[10px] sm:text-[12px]   lg:text-base font-medium mt-2'>Course Media</p>
                      </div>
                      <div className="indicator-line  w-[100%] h-[1px] bg-[#ADB5BD] flex-1 mb-5"></div>
                      <div className="flex items-center flex-col z-10 relative">
                           <div  className={`${step === 3? 'activeBorder': ""}`}> 
                              <div className={`${step ===3 ? "activeBg":""} m-[2px] sm:m-1 w-[35px] h-[35px] sm:w-[39px] sm:h-[39px] lg:w-[54px] lg:h-[54px] text-center relative text-[#8A92A6] rounded-full bg-[#EBEEFD] flex items-center justify-center text-[27px] font-semibold`}>3</div>
                           </div>
                           <p className='text-[10px] sm:text-[12px]  lg:text-base font-medium mt-2'>Curriculum</p>
                      </div>
                      <div className="indicator-line  w-[100%] h-[1px] bg-[#ADB5BD] flex-1 mb-5"></div>
                      <div className="step step3  flex items-center flex-col z-10 relative">
                           <div  className={`${step === 4? 'activeBorder': ""}`}>
                              <div className={`${step ===4 ? "activeBg":""} m-[2px] sm:m-1 w-[35px] h-[35px] sm:w-[39px] sm:h-[39px] lg:w-[54px] lg:h-[54px] text-center relative text-[#8A92A6] rounded-full bg-[#EBEEFD] flex items-center justify-center text-[27px] font-semibold`}>4</div>
                            </div>  
                           <p className='text-[10px] sm:text-[12px]   lg:text-base font-medium mt-2'>Additional Information</p>
                      </div>
               </div>
         )}
             {
               step === 1 ? <Creation1 setFormData={setFormData} setStep={setStep} formData={formData} step={step} /> : 
               step === 2 ? <Creation2 setFormData={setFormData} setStep={setStep} formData={formData} step={step}/> : 
               step === 3 ? <Creation3 setFormData={setFormData} setStep={setStep} formData={formData}  step={step} /> :
               step === 4 && <Creation4 setFormData={setFormData} setStep={setStep} formData={formData} step={step} />
             
             }



         </div>
    </>
  )
}

export default CourseCreationMain


