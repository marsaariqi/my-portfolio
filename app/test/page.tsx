import AboutSkeleton from '@/components/AboutSkeleton'
import React from 'react'
import Starfield from 'react-starfield'

const test = () => {
    return (
        <div>
            <Starfield starCount={1200}
                starColor={[255, 255, 255]}
                speedFactor={0.02} />
        </div>
    )
}

export default test