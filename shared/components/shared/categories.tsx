"use client";
import { cn } from "@/lib/utils"
import React from 'react'

interface Props{
    className?: string
}

const data=['Пиццы', '2772', '2882','sjsj','Пиццы', '2772', '2882','sjsj']

export const Categories: React.FC<Props> =({className}) =>{

    const [activeEl, setActiveEl]=React.useState<number>(0)

    return(
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {
              data.map((el, index) => (
                <a key={index} onClick={() => setActiveEl(index)} className={cn('flex items-center font-bold h-11 rounded-2xl px-5',activeEl===index && 'bg-white shadow-md shadow-gray-200 text-primary') }>
                    <button>{el}</button>
                </a>
              ))  
            }
        </div>
    )
}