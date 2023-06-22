import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import Todo from './Todo';
import db from '../database/data.js';
import firebase from 'firebase/compat/app';

function App() {
  const [todos,setTodos] = useState([]);
  const [input,setInput] = useState('');
  const [task,setTask] = useState('')
  // when app loads,we need to listen to database and fetch new removed/added todos
  useEffect(()=>{
      // this code fires when the app loads
        db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot =>{
        setTodos(snapshot.docs.map(doc => ({id:doc.id,todo: doc.data().todo,task: doc.data().task})))
      })
  },[]);

  const addTodo = (event) =>{
    event.preventDefault(); // this will stop refreshing after hitting button or entering

    db.collection('todos').add({
      todo:input,
      task:task,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
    setTask('');
  }

  return (
    <div className="App">
        <h1> The Todo App</h1>
        <form>
        <FormControl>
          <InputLabel >Write you todos</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl> &nbsp;&nbsp;&nbsp;
        <FormControl>
        <InputLabel>Owner of Task</InputLabel>
          <Input value={task} onChange={event => setTask(event.target.value)}></Input>
        </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button disabled={!input&&!task} variant="contained" type= 'submit' onClick={addTodo}>Add Tasks</Button>
        </form>

      <div className='Cont'>
          {todos.map(todo => (
              <Todo todo={todo}/>
            ))}
      </div>
    </div>
  );
}

export default App;
