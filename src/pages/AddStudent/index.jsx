import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./index.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { auth, db } from "../../firebase/firebase";
import { useForm } from "react-hook-form"
import SideBar from '../../components/sideBar';
import Search from "../../img/search.svg"

const initialState = {
    image: '',
    firstName: '',
    lastName: '',
    age: '',
    group: '',
    grade: ''
}


export default function Homepage() {
  const [todo, setTodo] = useState(initialState);
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

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
        navigate("/homepage");
      }
    });
  }, []);

  const {register, reset, handleSubmit} = useForm()

    const {image, firstName, lastName, age, group, grade} = todo;

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setTodo({...todo, [name] : value});    
}
  // add
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db,`/${auth.currentUser.uid}/${uidd}`), {
      image: image,
      firstName: firstName,
      lastName: lastName,
      age: age,
      group: group,
      grade: grade,
      uidd: uidd
    });

    setTodo("");
    reset("")
  };

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db,`/${auth.currentUser.uid}/${tempUidd}`), {
      image: image,
      firstName: firstName, 
      lastName: lastName,
      age: age,
      group: group,
      grade: grade,
      tempUidd: tempUidd
    });

    setTodo("");
    setIsEdit(false);
  };

  // delete
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <div className="main_container">
          <SideBar/>
      <form className="container_box" onSubmit={handleSubmit}>
      <div>
      <input
              type="text"
              placeholder="Image"
              {...register('image')}
              value={image}
              onChange={handleInputChange}
            />
      </div>
          <div>
            <input 
                type="text" 
                placeholder='First name' 
                {...register('firstName')}
                value={firstName}
                onChange={handleInputChange}
            />
            </div>
            <div>
            <input 
                type="text" 
                placeholder='Last name' 
                {...register('lastName')}
                value={lastName}
                onChange={handleInputChange}
            />
            </div>
            <div>
            <input 
                type="text" 
                placeholder='Age' 
                {...register('age')}
                value={age}
                onChange={handleInputChange}
            />
            </div>
        <div>
            <input 
                type="text" 
                placeholder='Group' 
                {...register('group')}
                value={group}
                onChange={handleInputChange}
            />
            </div>
            <div>
            <input 
                type="text" 
                placeholder='Class' 
                {...register('grade')}
                value={grade}
                onChange={handleInputChange}
            />
            </div>
      {isEdit ? (
        <div>
        <button className='box_btn'
            type='submit'
            onClick={handleEditConfirm}
            >
                Save
            </button>
        </div>
      ) : (
        <div>
            <button className='box_btn'
            type='submit'
            onClick={writeToDatabase}
            >
                Add new student
            </button>
        </div>
      )}

<form className="form">
        <img className="search_icon" src={Search} alt="" />
        <input className="search" type="search" placeholder="Поиск"
        onChange={e => setSearch(e.target.value)}
        />
        </form>

        
<div className="box_about">
      {todos.filter((todo) => todo.firstName.toLowerCase().includes(search)|| todo.lastName.toLowerCase().includes(search)||
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
          <div className="todo_buttons">
          <EditIcon
            fontSize="large"
            onClick={() => handleUpdate(todo)}
            className="edit-button"
            />
          <DeleteIcon
            fontSize="large"
            onClick={() => handleDelete(todo.uidd)}
            className="delete-button"
            backgroundColor= "#fff" 
          />
          
          </div>
          </div>
          
          ))}
          </div>
    </form> 
    </div>      

  );
}