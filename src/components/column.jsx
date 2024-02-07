import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';
import '../styles/column.css';

// Mapping of colors for column states
const colorMapping = {
    'Not Started': '#ff0000',
    'In Progress': '#ffff00',
    'Under Review': '#00ff00',
    'Completed': '#0000ff'
};

export default class Column extends React.Component {
    render() {
        // Destructure props to access column and tasks
        const { column } = this.props;
        // Determine border color based on column title
        const borderTopColor = colorMapping[column.title];

        return (
            // Container for droppable column
            <div className='droppable-container' style={{ borderTop: `3px solid ${borderTopColor}` }}>
                <div className='title-container'>
                    {/* Column title */}
                    <h3 className='title'>{column.title}</h3>
                </div>
                {/* Droppable area for tasks */}
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (
                        <div
                            // Container for task list with dragging styles
                            className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {/* Render tasks */}
                            {this.props.tasks.map((task, index) => (
                                <Task key={task.id} task={task} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}