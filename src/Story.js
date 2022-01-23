import { Avatar } from '@material-ui/core'
import React from 'react'
import './Story.css'

const Story = ({ image, profileSrc }) => {
    return (
        <div style={{ backgroundImage: `url(${image})` }} className='story' >
            <Avatar src={profileSrc} className='story__avatar' />
        </div>
    )
}

export default Story
