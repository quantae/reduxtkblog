import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {reactionAdded} from './postsSlice';

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}



const ReactionButtons = ({post}) => {
    const dispatch = useDispatch();


    /**
     * We perform an object lookup on the reactionEmoji object to get the emoji
     * the key is the btnName and the value is the emoji
     */
    const reactionButtons = Object.entries(reactionEmoji).map(([btnName, emoji]) => {
        
        return (
            <button
            key={btnName}
            type='button'
            className='reactionButton'
            onClick={() => dispatch(reactionAdded({postId: post.id, reaction: btnName}))}
            >
                {emoji} {post.reactions[btnName]}
            </button>
        )
    })
  return (
    <div>
        {reactionButtons}
    </div>
  )
}

export default ReactionButtons
