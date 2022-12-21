import React from 'react'
import Card from '../Card'

function Post({writer}) {

  const image = 'avatar_0.png'
  return <Card>
    <div id="post-title" className="flex gap-4 h-16 justify-start items-center">
      <img src={`images/${image}`}  className="h-14 rounded-full "/>
      <h2 className='text-slate-900 font-bold text-3xl'>{writer}</h2>
    </div>


  </Card>
}

export default Post
