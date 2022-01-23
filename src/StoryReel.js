import React from 'react'
import Story from './Story'
import './StoryReel.css'
import { useStateValue } from './StateProvider'


const StoryReel = () => {
    const [{ user }, dispatch] = useStateValue()
    return (
        <div className='storyReel' >
            <Story
                image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQybPjNXIPLr6RjLYMYfJGPNApfm1AKd6Gs6pfGWuYL02rtysj5526OLPYWyBDthCeD_I&usqp=CAU'
                profileSrc={user.photoURL}
            />
            <Story
                image='https://i.guim.co.uk/img/media/525ef2d4758df45f138e40a378137be508ce7216/0_0_960_960/master/960.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=040c8052531cafee4f6d289be7908f4d'
                profileSrc='https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTQyMDA0NDgwMzUzNzcyNjA2/mark-zuckerberg_gettyimages-512304736jpg.jpg'
            />
            <Story
                image='https://cdn.geekwire.com/wp-content/uploads/2018/02/180205-starman-630x629.jpg'
                profileSrc='https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg'
            />

        </div>
    )
}

export default StoryReel
