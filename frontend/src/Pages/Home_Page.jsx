
// Home_Page.jsx

import React from 'react'
import Home_Navar from '../components/Home/Home_Navar'
import Section_2 from '../components/Home/Section_2'
import Section_3 from '../components/Home/Section_3'
import All_Doctors_On_Home from '../components/Admin-component/Admin-Home-Components/All_Doctors_On_Home'
import Home_Create_Account from '../components/Home/Home_Create_Account'

function Home_Page() {
    return (
        <>
            <Home_Navar />
            <Section_2 />
            <Section_3 />
            <All_Doctors_On_Home />
            <Home_Create_Account />
        </>
    )
}

export default Home_Page
