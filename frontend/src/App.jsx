// App.jsx (React)

import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home_Page from "./Pages/Home_Page";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Admin_Doctor_Login from "./Pages/Admin_Doctor_Login";
import Admin_Home from "./Pages/Admin-section/Admin_Home";
import Admin_Add_Doctor_Page from "./Pages/Admin-section/Admin_Add_Doctor_Page";
import All_Doctors_List from "./Pages/Admin-section/All_Doctors_List";
import Doctor_Detail_Page from "./Pages/Doctor_Detail_Page";
import User_Login from "./components/Home/User_Pages/User_Login";
import User_Home from "./Pages/User-section/User_Home";
import User_Scedule_Appointment from "./Pages/User-section/User_Scedule_Appointment";
import Slote_Selection from "./Pages/User-section/Slote_Selection";
import Payment from "./Pages/User-section/Payment";
import All_Doctors_On_Home from "./components/Admin-component/Admin-Home-Components/All_Doctors_On_Home";
import Doctor_Home from "./Pages/Doctor-Section/Doctor_Home";
import Doctor_View_All_Appointment from "./Pages/Doctor-Section/Doctor_View_All_Appointment";
import User_View_Scedule_Appointment from "./Pages/User-section/User_View_Scedule_Appointment";
import User_Protected_Route from "../protected_Route/User_Protected_Route";
import Admin_Protected_Routes from "../protected_Route/Admin_Protected_Routes";
import Doctor_Protected_Routes from "../protected_Route/Doctor_Protected_Routes";
import Home_All_Doctor_List from "./components/Home/Home_All_Doctor_List";
import Create_User_Page from "./Pages/User-section/Create_User_Page";

function App() {
    const [count, setCount] = useState(0);

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <>
                    <Home_Page />
                </>
            ),
        },
        {
            path: "/about",
            element: (
                <>
                    <About />
                </>
            ),
        },
        {
            path: "/contact",
            element: (
                <>
                    <Contact />
                </>
            ),
        },
        {
            path: "/admin-doctor-login",
            element: (
                <>
                    <Admin_Doctor_Login />
                </>
            ),
        },
        {
            path: "/doctor/:id",
            element: (
                <>
                    <Doctor_Detail_Page />
                </>
            ),
        },
        {
            path: "/all-doctors",
            element: (
                <>
                    <Home_All_Doctor_List />
                </>
            ),
        },
        {
            path: "/user-create-account",
            element: (
                <>
                    <Create_User_Page />
                </>
            ),
        },
        

        // Admin
        {
            path: "/admin",
            element: <Admin_Protected_Routes />,
            children: [
                {
                    path: "admin-home",
                    element: (
                        <>
                            <Admin_Home />
                        </>
                    ),
                },
                {
                    path: "add-doctor",
                    element: (
                        <>
                            <Admin_Add_Doctor_Page />
                        </>
                    ),
                },
                {
                    path: "doctors-list",
                    element: (
                        <>
                            <All_Doctors_List />
                        </>
                    ),
                },
            ],
        },
        ,
        // Users
        {
            path: "/user-login",
            element: (
                <>
                    <User_Login />
                </>
            ),
        },
        {
            path: "/user",
            element: <User_Protected_Route />,
            children: [
                {
                    path: "/user/user-home",
                    element: (
                        <>
                            <User_Home />
                        </>
                    ),
                },
                {
                    path: "/user/doctor/:id/scedule-appointment",
                    element: (
                        <>
                            <User_Scedule_Appointment />
                        </>
                    ),
                },
                {
                    path: "/user/doctor/:id/schedule-appointment/patientid/:patientId/booking-slote",
                    element: (
                        <>
                            <Slote_Selection />
                        </>
                    ),
                },
                {
                    path: "/user/doctor/:id/schedule-appointment/patientid/:patientId/booking-slote/sloteid/:selectedSlot/payment",
                    element: (
                        <>
                            <Payment />
                        </>
                    ),
                },
                {
                    path: "/user/schedule-appointment",
                    element: (
                        <>
                            <All_Doctors_On_Home />
                        </>
                    ),
                },

                {
                    path: "/user/view-scedule-appointments",
                    element: (
                        <>
                            <User_View_Scedule_Appointment />
                        </>
                    ),
                },
            ],
        },

        // Doctor Pannel
        {
            path: "/doctor",
            element: <Doctor_Protected_Routes />,
            children: [
                {
                    path: "home",
                    element: (
                        <>
                            <Doctor_Home />
                        </>
                    ),
                },
                {
                    path: "view-all-appointments",
                    element: (
                        <>
                            <Doctor_View_All_Appointment />
                        </>
                    ),
                },
            ],
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;










