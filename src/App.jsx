
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskAdd from './components/TaskAdd/TaskAdd';
import Task from './components/Task/Task';
import './css/App.css';
import ToolsTask from './components/ToolsTask/ToolsTask';
import LoginScreen from './components/LoginScreen/LoginScreen';
import RegisterScreen from './components/RegisterScreen/RegisterScreen';


function App() {

  const [tasks, setTasks] = useState([]);

  const [tasksCompleted, setTasksCompleted] = useState([]);

  const [tasksNotCompleted, setTasksNotCompleted] = useState([]);

  const [tasksView, setTasksView] = useState([]);

  const [userLoggedId, setUserLoggedId] = useState(0);

  const [stateViewTask, setStateViewTask] = useState('all');

  const [countTaskCompleted, setCountTaskCompleted] = useState(0);

  const [pages, setPages] = useState('home');

  //Cria uma nova tarefa
  const createTask = (newTask) => {
    if (newTask.task === '') {
      return;
    }

    const newGroup = [...tasks, newTask];

    setTasks(newGroup);
  }

  const removeTask = (id) => {
    //Remove a tarefa comparando ID
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
    
    if (stateViewTask === 'all') {     
      setTasksView(newTasks);
    } else if (stateViewTask === 'active') {
      const newTasksT = tasksNotCompleted.filter((task) => task.id !== id);
      setTasksNotCompleted(newTasksT);
    } else {
      const newTasksF = tasksCompleted.filter((task) => task.id !== id);
      setTasksCompleted(newTasksF);
    }
  }

  const checkedTask = (data) => {
    //Mapeando array e alterando a tarefa para true
    const updateTasks = tasks.map((task) => {
      const taskToUpdate = task;
      if (taskToUpdate.id === data.id) {
        taskToUpdate.finish = data.finish;
      }
      return taskToUpdate;
    });
    //Atualizando o estado
    setTasks(updateTasks);    
  }

  const updateTask = (data) => {
    //Mapeando array e alterando a tarefa para true
    const updateTasks = tasks.map((task) => {
      const taskToUpdate = task;
      if (taskToUpdate.id === data.id) {
        taskToUpdate.task = data.task;
      }
      return taskToUpdate;
    });
    //Atualizando o estado
    setTasks(updateTasks);
  }

  //Remove tasks completadas
  const removeAllCompleted = (remove) =>{
    if ( remove === 'removeAll'){
      setTasks(tasks.filter((item) => item.finish === false));
      setTasksCompleted([]);
    }
  }

  //Troca qual array sera visualizado
  const exchangeTaskTypeView = (toolArrayActive) => setStateViewTask(toolArrayActive);

  //Estado do login atual
  const userLogged = (idUser) => setUserLoggedId(idUser);

  //Desloga o usuário do sistema
  const userLogout = () => {
    setUserLoggedId(0);
    setTasks([]);
  }


  //troca os elementos da pagina
  const exchangePage = (pageAcess) => setPages(pageAcess);

  useEffect(() => {
    if (userLoggedId !== 0) {
      axios.post("http://localhost/BITXYZ/php/controller/all_controller.php?act=handleTask&userid=" + userLoggedId)
        .then((response) => {
          if(response.data === 1) {
            setTasks([]);
          } else {
            setTasks(response.data);
          }          
        });
    }
  }, [userLoggedId]);




  useEffect(() => {
    if (userLoggedId !== 0) {
      axios.post("http://localhost/BITXYZ/php/controller/all_controller.php?act=taskCrud&tasks=" + JSON.stringify(tasks) + "&id=" + userLoggedId)
        .then((response) => {
        });
    }

    setCountTaskCompleted(tasks.filter((item) => item.finish === false).length);
    setTasksCompleted(tasks.filter((item) => item.finish === true));
    setTasksNotCompleted(tasks.filter((item) => item.finish === false));
    if (stateViewTask === 'all') {
      setTasksView(tasks);
    } else if (stateViewTask === 'active') {
      setTasksView(tasksNotCompleted);      
    } else {
      setTasksView(tasksCompleted);
    }
  }, [tasks, stateViewTask, countTaskCompleted]);



  return (
    <div className='main'>
      <div className='contents'>
        <div className='divLog' style={{ display: userLoggedId === 0 ? '' : 'none' }}>
          <button className='btn' onClick={() => exchangePage('login')} style={{ display: pages === 'home' ? '' : 'none' }}>Login/Register</button>
        </div>
        <div className='divLog' style={{ display: userLoggedId === 0 ? 'none' : '' }}>
          <button className='btn' onClick={() => userLogout()} >Logout</button>
        </div>

        <button className='btn' onClick={() => exchangePage('home')} style={{ display: pages === 'login' ? '' : 'none' }}>Back</button>
        <button className='btn' onClick={() => exchangePage('login')} style={{ display: pages === 'register' ? '' : 'none' }}>Back</button>
        <div>
        
        </div>        
        <div style={{ display: pages === 'home' ? '' : 'none' }}>
        <h1 className='todolistText'>
          To do List!
        </h1>
          <TaskAdd onSubmit={createTask} />
          {tasksView.map((task) => (
            <Task
              key={task.id}
              data={task}
              onRemove={removeTask}
              onChecked={checkedTask}
              onUpdate={updateTask}
            />
          ))}
          <ToolsTask
            count={countTaskCompleted}
            onChangeTaskType={exchangeTaskTypeView}
            onRemAllCom={removeAllCompleted}
          />
        </div>
        <div style={{ display: pages === 'login' ? '' : 'none' }}>
        <h1 className='todolistText'>
        Access Area!
        </h1>
          <LoginScreen
            onPage={exchangePage}
            onLogged={userLogged}
            stateLogin={userLoggedId}
          />
        </div>
        <div style={{ display: pages === 'register' ? '' : 'none' }}>
        <h1 className='todolistText'>
          Register!
        </h1>
          <RegisterScreen />
        </div>
      </div>
    </div>
  );

}

export default App;
