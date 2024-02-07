import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../styles/task.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Task(props) {
  
  // State for menu anchor element
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to open the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Draggable component for task
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          // Container for the task with dragging styles
          className={`task-content ${snapshot.isDragging ? 'dragging' : ''}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          innerRef={provided.innerRef}
        >
          <div className='left-content'>
            {/* Task content */}
            {props.task.content}
            <div className='data'>
              {/* Display task end date */}
              <p>{props.task.endDate.toLocaleString()}</p>
            </div>
          </div>
          <div className='right-content'>
            {/* Button to open menu */}
            <button className='more-btn' onClick={handleMenuOpen}><MoreVertIcon /></button>
            {/* Menu for additional actions */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {/* Menu items */}
              <MenuItem onClick={() => console.log('Add task')}>Add Task</MenuItem>
              <MenuItem onClick={() => console.log('Delete')}>Delete</MenuItem>
            </Menu>
          </div>
        </div>
      )}
    </Draggable>
  );
}
