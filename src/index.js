import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './data/initial-data';
import Column from './components/column';
import './styles/style.css';

class App extends React.Component {

  // WARNING: Functionalities for adding and deleting tasks are not yet implemented. Feel free to contribute :)

  constructor(props) {
    super(props);
    // Initialize state with initial data
    this.state = initialData();
  }

  // Function to handle dragging and dropping tasks
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Logic to update task positions and statuses
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    const newStartTaskIds = Array.from(start.taskIds);
    newStartTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: newStartTaskIds,
    };

    const newFinishTaskIds = Array.from(finish.taskIds);
    newFinishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: newFinishTaskIds,
    };

    const updatedTasks = { ...this.state.tasks };
    const task = updatedTasks[draggableId];
    const status = finish.title;
    updatedTasks[draggableId] = { ...task, status };

    const newState = {
      ...this.state,
      tasks: updatedTasks,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    //

    // Update the state with the new task positions and statuses
    this.setState(newState);
  };

  render() {
    return (
      <>
        {/* Top bar */}
        <div className='top-bar'>
          <p>Kanban Board</p>
        </div>
        {/* DragDropContext to handle drag and drop */}
        <DragDropContext onDragEnd={this.onDragEnd}>
          {/* Container for columns and tasks */}
          <div className='global-container'>
            {/* Render columns and tasks */}
            {this.state.columnOrder.map(columnId => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
              return (
                <Column key={column.id} column={column} tasks={tasks.filter(task => task.id)} />
              );
            })}
          </div>
        </DragDropContext>
      </>
    );
  }
}

// Render the App component
ReactDOM.render(<App />, document.getElementById('root'));
