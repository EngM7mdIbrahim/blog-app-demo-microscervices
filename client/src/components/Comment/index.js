import React from 'react'
import timeAgo from '../../utils/date'
import getImage from '../../utils/images'

export default function Comment({writer= 'Nono Habibty', content =  'Bahbak Awy!!', postedOn = new Date()}) {
  return (
    <div className=' flex flex-row gap-2 justify-start items-start self-stretch'>
        <img src={getImage()}  className="h-10 w-10 rounded-full object-cover"/>
        <div style={{minHeight: '5rem'}} className="rounded-2xl bg-midnightDark py-2 px-4 flex flex-col justify-start items-start flex-1 overflow-auto">
            <h2 className="text-lightblue text-base sm:text-lg font-bold">
                {writer}
            </h2>
            <p style={{overflowWrap: 'anywhere'}} className="text w-full">
                {content}
            </p>
            <p className="text-sm self-stretch text-right text-gray-500">
                Posted {timeAgo(postedOn)}
            </p>
        </div>
    </div>
  )
}
 