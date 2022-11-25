import { useState } from 'react';
import './Task.css';

function Task(props){    

    //Desestruturei as props
    const { data, onRemove, onChecked, onUpdate } = props;
    //Desestruturei o data
    const { id, task, finish } = data;

    const [view, setView] = useState('editInput') ;

    const [newText, setnewText] = useState('');

    const handleCheckbox = (event) => {
        onChecked({
            id: id,
            finish: event.target.checked
        });           
    }
    
    const handleEdit = () => setView('editInputNow');

    const handleNewValue = (event) => setnewText(event.target.value);

    //Salva alteração da task
    const saveTask = () => {
        if (newText !== ''){
            onUpdate({
                id: id,
                task: newText
            });    
        }        
        setView('editInput');
    }

    return (
        <div className='unique-task'>
            <input type="checkbox" onChange={handleCheckbox} checked={finish}/>
            <span className='taskAdds' title="Edit" style={{ cursor: 'pointer', display: view === 'editInput' ? '': 'none' }} onClick={handleEdit}>{task}</span>
            <input className='inpuEditTasks' onChange={handleNewValue} defaultValue={task} style={{ display: view === 'editInput' ? 'none': '' }}></input>
            <button className='removbutton' type='button' onClick={() => onRemove(id)} style={{ display: view === 'editInput' ? '': 'none' }}> Remove </button>
            <button className='removbutton' type='button' onClick={saveTask} style={{ display: view === 'editInput' ? 'none': '' }}> Save </button>
        </div>
    )
    
}


export default Task;
