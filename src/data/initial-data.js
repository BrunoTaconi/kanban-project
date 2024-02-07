import data from './data.json';

const initialData = () => {
  const tasks = {};
  const columns = {
    'column-1': {
      id: 'column-1',
      title: 'Not Started',
      status: 'Não Iniciado', 
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      status: 'Em Progresso',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Under Review',
      status: 'Em Revisão', 
      taskIds: [],
    },
    'column-4': {
      id: 'column-4',
      title: 'Completed',
      status: 'Concluído', 
      taskIds: [],
    },
  };

  data.forEach(atividade => {
    tasks[`task-${atividade.code}`] = {
      id: `task-${atividade.code}`,
      content: `${atividade.activity}`,
      startDate: atividade.startDate,
      endDate: atividade.endDate,
      status: columns['column-1'].status, 
    };
    columns['column-1'].taskIds.push(`task-${atividade.code}`);
  });

  return {
    tasks: tasks,
    columns: columns,
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
  };
};

export default initialData;