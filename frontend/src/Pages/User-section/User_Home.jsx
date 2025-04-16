
// User_Home.jsx (React)

import React from 'react'
import heartBeatWallpaper from '../../assets/Heart-Beat-Wallpaper-3.jpg';
import User_Navbar from '../../components/User_Component/User_Navbar';



function User_Home() {
    return (
        <>
            <div>
            <User_Navbar />

                <div style={{
                    backgroundImage: `url(${heartBeatWallpaper})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh', // Full viewport height
                    width: '100vw', // Full viewport width
                }}></div>
            </div>
        </>
    )
}

export default User_Home


