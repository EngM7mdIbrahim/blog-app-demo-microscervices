import React from 'react'
import Card from '../Card'

import timeAgo from '../../utils/date'

const images = {
  '1' : 'avatar_0.png',
  '2' : 'avatar_1.jpg',
  '3' : 'avatar_4.webp',
  '4' : 'avatar_6.webp',
  '5' : 'avatat_2.png',
  '6' : 'avatat_3.png'
}

function Post({writer, postedOn, content}) {

  const imageIndex = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  return <Card style={{minHeight: '24rem'}}>
    <div id="post-title" className="flex gap-4 h-16 justify-start items-center">
      <img src={`images/${images[imageIndex]}`}  className="h-14 w-14 rounded-full object-cover"/>
      <h2 className='text-slate-900 font-bold text-3xl'>{writer}</h2>
    </div>

  <div id="post-content" className="flex-1 flex items-center justify-center">
    <h3 className="font-semibold text-lg">
      {content}
    </h3>
  </div>

  <div id="post-footer" className="flex justify-start">
    <button href="" className="text-lightblue text-left text-base font-semibold flex-1 hover:text-white transition-all">Show comments</button>
    <p className="text-base">Posted {timeAgo(postedOn)}</p>
  </div>

  </Card>
}

export default Post
