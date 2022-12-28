import React from 'react'
import timeAgo from '../../utils/date'
import getImage from '../../utils/images'


export const CommentLoading = ()=>{
    return (
        <div className='flex flex-row gap-2 justify-start items-start self-stretch'>
            <div  className="h-10 w-10 rounded-full object-cover posts-loading bg-midnightLight"/>
            <div style={{minHeight: '5rem'}} className="rounded-2xl posts-loading bg-midnightLight py-2 px-4 flex flex-col justify-start items-start flex-1 overflow-auto">
                
            </div>
        </div>
      )
}

export default function Comment({writer= 'Nono Habibty', content =  'Bahbak Awy!!', postedOn = new Date(), img = getImage()}) {
 console.log('Image comment for writer', writer, 'is', img)
    return (
    <div className=' flex flex-row gap-2 justify-start items-start self-stretch'>
        <img src={img}  className="h-10 w-10 rounded-full object-cover"/>
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
 