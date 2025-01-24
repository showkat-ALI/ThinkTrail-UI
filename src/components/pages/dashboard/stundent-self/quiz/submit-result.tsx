import React from 'react';
import {
    PieChart,
    Pie,
    Legend,
    Cell,
    ResponsiveContainer,
    Label
  } from "recharts";
import moment from "moment";
import { useGetOneSubQuizQuery } from "../../../../../feature/api/dashboardApi";
import {useRouter} from "next/router";
import { Spinner } from "flowbite-react";

const data01 = [
    { name: "Active Campagins", value: 50},
   
     
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  

const CustomLabel = ({labelText, value }:{labelText:any;value:any}) => {
    return (
      <g>
        <text
          x={206}
          y={210}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fill="#0088FE"
          fontSize="26"
          fontWeight="600"
        >
          {value}%
        </text>
      </g>
    );
  };

const SubmitResult = () => {
    const router = useRouter();
    const id = router.query.id as any;
    const { isError,data, error, isLoading, isSuccess } =  useGetOneSubQuizQuery(id)
   // console.log(data)
  return (
    <>
       {
         isLoading ? <div className='flex justify-center items-center'><Spinner /></div> : isSuccess &&
         <div className='grid grid-cols-2 items-center'>
            <div style={{ width: "100%", height: 420 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={data01}
                        dataKey="value"
                        cx={200}
                        cy={200}
                        innerRadius={80}
                        outerRadius={100}
                      >
                          
                          {data01.map((entry, index) => (
            <Cell
               key={`cell-${index}`}
               fill={COLORS[index % COLORS.length]}
            />
         ))}
                      
                        <Label
                          content={<CustomLabel labelText="Score" value={data.data.subQuiz.percent} />}
                          position="center"
                        />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
            </div>
            <div>
                <div className='flex gap-2 items-center'>
                    <h3 className='font-nunito text-3xl'>Your Score:</h3>
                    <h3 className='font-nunito text-3xl'>{data.data.subQuiz.mark}</h3>
                </div>
                <div className='flex gap-2 items-center'>
                    <h3 className='font-nunito text-3xl'>Total Score:</h3>
                    <h3 className='font-nunito text-3xl'>{data.data.subQuiz.totalMark}</h3>
                </div>
            </div>
         </div>
      } 
    </>
  )
}

export default SubmitResult