import React, { useState, useEffect } from 'react';
import SideBar from '../../components/sideBar';
import './index.css'
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../../firebase/firebase";
import Search from "../../img/search.svg"
import EMPTY from "../../img/empty.svg"


const AllStudents = () => {
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate("")

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // read
                onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
                setTodos([]);
                const data = snapshot.val();
                if (data !== null) {
                    Object.values(data).map((todo) => {
                    setTodos((oldArray) => [...oldArray, todo]);
                    });
                }
                });
            } else if (!user) {
                navigate("/");
            }
            });
        }, []);


    return (
        <div className='main'>
            <SideBar/>
            <div className="main_about">
            <form className="form">
        <img className="search_img" src={Search} alt="" />
        <input className="search" type="search" placeholder="Поиск"
        onChange={e => setSearch(e.target.value)}
        />
        </form>
        <div className="main_todo">
                { todos.length > 1 ? todos.filter((todo) => todo.firstName.toLowerCase().includes(search)|| todo.lastName.toLowerCase().includes(search)||
                    todo.age.toLowerCase().includes(search) ||
                    todo.group.toLowerCase().includes(search) ||
                    todo.grade.toLowerCase().includes(search)).map((todo) => (
                        <div className="todo">
                        <img className="todo_img" src={todo.image}/>
                        <h2 className="todo_firstName">First name: {todo.firstName}</h2>
                        <h2 className="todo_lastName">Last name: {todo.lastName}</h2>
                        <p className="todo_age">Age: {todo.age}</p>
                        <p className="todo_group">Group: {todo.group}</p>
                        <p className="todo_grade">Class: {todo.grade}</p>            
                        </div>
                        )) : <div className='empty'>
                        <img src={EMPTY} alt="" />
                        <h1>Class is empty</h1></div> 
                        }  
                    
        </div>
        </div>
        </div>
    );
}

export default AllStudents;
