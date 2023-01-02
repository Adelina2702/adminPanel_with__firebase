import React, {useEffect, useState} from "react";
import DataBase from "../../img/database.svg";
import Managers from "../../img/managers.svg";
import { NavLink } from "react-router-dom";
import "./index.css";
import Exit from "../../img/exit.svg";
import logo from "../../img/school.svg";
import { useNavigate } from "react-router-dom";
import { signOut} from 'firebase/auth'
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from "../../firebase/firebase";

const SideBar = () => {
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(!user){
                navigate('/homepage')
            }
        })
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(()=> {
            navigate("/auth")
        }).catch((err) => {
            alert(err.message)
        })
    }

    const menuItem = [
        isEdit ? 
        {
            path: "/homepage",
            name: "Back",
            icon: <img className="icon" src={Managers} alt="" />,
        }
        : 
        {
            path: "/admin",
            name: "Admin",
            icon: <img className="icon" src={Managers} alt="" />,
            function: () => setIsEdit(true),
        },
        {
        path: "/auth",
        name: "Exit",
        icon: <img className="icon" src={Exit} alt="" />,
        function: () => handleSignOut(),
        },
    ];

    return (
        <div className="side_bar">
            <div className="top_section">
            <img className="logo" src={logo} alt="img" />
            </div>
            {menuItem.map((item, index) => (
            <NavLink
                to={item.path}
                key={index}
                className="link"
                activeclassName="active"
                onClick={item.function}
            >
                <div className="icon">{item.icon}</div>
                <div className="link_text">{item.name}</div>
            </NavLink>
            ))}
        </div>
    );
};

export default SideBar;