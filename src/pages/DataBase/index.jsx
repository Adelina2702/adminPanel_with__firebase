import React, { useState, useEffect } from 'react';
import SideBar from '../../components/sideBar';
import './index.css'
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../../firebase/firebase";
import EMPTY from "../../img/loading.jpeg"
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";


const AllStudents = () => {
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate("")
    const [val, setVal] = useState('');


    useEffect(() => {
    if(val !== ''){
        let newArr = sortMethods(val)
        setTodos(newArr)

    }
    },[val])

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

          // sort
const sortAsc = (a, b, key) => {
    const obj1 = a[key];
    const obj2 = b[key];
    if (obj1 < obj2) {
        return -1;
        }
        if (obj1 > obj2) {
        return 1;
        }
        return 0;
    }


    const sortMethods = (value) => {
        let newTodos = [...todos]
        if(value === 'name'){
        return newTodos?.sort((a,b) => sortAsc(a, b, 'firstName'))
        }
        if(value === 'age'){
        return newTodos?.sort((a,b) => a.age -  b.age)
    } 
    if(value === 'group'){
        return newTodos?.sort((a,b) => sortAsc(a, b, 'group'))
    } 
    if(value === 'grade'){
    return newTodos?.sort((a,b) => a.grade - b.grade)
} 
}

    return (
        <div className='main'>
            <SideBar/>
            <div className="main_about">
        <form className="form"
        onChange={e => setSearch(e.target.value)}
        >
            <p className='content_filter'>Filter:</p>
        <input className="search" type="search" placeholder="Search by name"
        />
        <input className="search" type="search" placeholder="Search by last name"
        />
        <input className="search" type="search" placeholder="Search by age"
        />
        <FormControl>
        <RadioGroup
                            aria-label="gender"
                            onChange={e => setSearch(e.target.value)}
                            >
                            <div className="filter">
                                <p className='filter_title'>Group :  </p>
                            <FormControlLabel
                                value="A"
                                control={<Radio/>}
                                label="A"
                            />
                            <FormControlLabel
                                value="B"
                                control={<Radio/>}
                                label="B"
                            />
                            <FormControlLabel
                                value="C"
                                control={<Radio/>}
                                label="C"
                            />
                            <FormControlLabel
                                    value="D"
                                control={<Radio />}
                                    label="D"
                            />
                            </div>
                        </RadioGroup>
                        </FormControl>
        </form>
        <div className="sort">
            <p className='sort_title'>Sort by :</p> <select defaultValue={'all'}
                onChange={(e) =>   { let newArr = sortMethods(e.target.value)
                    setTodos(newArr)}}
                >
                <option value="all" disabled>All</option>
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="group">Group</option>
                <option value="grade">Grade</option>
            </select> 
                </div>
        <div className="main_todo">
                { todos.length > 1 ? todos.filter((todo) => todo.firstName.toLowerCase().includes(search)|| todo.lastName.toLowerCase().includes(search)||
                    todo.age.includes(search) ||
                    todo.group.includes(search) ||
                    todo.grade.includes(search)).map((todo) => (
                        <div className="todo">
                        <img className="todo_img" src={todo.image}/>
                        <h2 className="todo_firstName">First name: {todo.firstName}</h2>
                        <h2 className="todo_lastName">Last name: {todo.lastName}</h2>
                        <p className="todo_age">Age: {todo.age}</p>
                        <p className="todo_group">Group: {todo.group}</p>
                        <p className="todo_grade">Class: {todo.grade}</p>            
                        </div>
                        )) : <div className='empty'>
                        <h1>Class is empty</h1>
                        <img className='empty_img' src={EMPTY} alt="" />
                        </div> 
                        }  
                    
        </div>
        </div>
        </div>
    );
}

export default AllStudents;
