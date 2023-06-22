import { Box, Button, List, ListItem,ListItemText, Modal, Paper } from '@mui/material';
import './Todo.css'
import React, { useState } from 'react'
import db from '../database/data'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Todo(props) {
    const [open, setOpen] = React.useState(false);
    const [input,setInput] = useState('');
    // const [task,setTask] = useState('');
    const updateTodo = () =>{
        db.collection('todos').doc(props.todo.id).set({
            todo:input
            // ,task:task
        },{ merge: true})
        setOpen(false);
    }
  return (
    <>
    <Modal open={open} onclose={e => setOpen(false)}>
        <Box sx = {style}>
            <h1> Edit your Todo</h1>
            <p> Here you can edit your task only not owner name</p>
            <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}></input>
            {/* <br/>
            <input placeholder={props.todo.task} value={task} onChange={event => setTask(event.target.value)}></input>
            <br/> */}
            <Button onClick={updateTodo}>Update Todo</Button>
            <Button onClick={e=> setOpen(false)}>Cancel</Button>
        </Box>
    </Modal>

    <div className='listcontainer'>
    <Paper elevation={3}>
    <List className='todo_list'>
        <ListItem>
            <ListItemText primary={props.todo.todo} secondary="Task"></ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText primary={props.todo.task} secondary="Owner"></ListItemText>
        </ListItem>
        <ListItem>
            <ModeEditIcon onClick={e => setOpen(true)}>Edit Tasks</ModeEditIcon>
            <DeleteRoundedIcon  onClick={event => db.collection('todos').doc(props.todo.id).delete()}> Delete Me</DeleteRoundedIcon>
        </ListItem>
    </List>
    </Paper>
    </div>
    </>
  )
}

export default Todo