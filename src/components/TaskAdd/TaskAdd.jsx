import { useState } from 'react';
import generators from '../../lib/generators';

function TaskAdd(props) {
 
    const [text, setText] = useState('');

    const { onSubmit } = props;

    const handleInput = (event) => {
        setText(event.target.value);
    }

    const handleSubmit = (event) => {
        //Desabilita o evento padrão do form com submit
        event.preventDefault();
        //gerador de ID aleatórias
        const { randomId } = generators;

        //Monta a tarefa e envia para função que adiciona ao array
        onSubmit({
            id: randomId(9999999),
            task: text,
            finish: false
        });

        //Limpa o Input para uma nova tarefa
        setText('');
    }


    return ( 
        <form className='formNewTask' onSubmit={handleSubmit}>            
          <input className='btnNewTaskInp' type="text" value={text} onChange={handleInput} placeholder="What do you intend to do?" />
          <button className='btn-form' type="submit" style={{marginLeft: "1em"}} >New Task</button>
        </form>
    );
}

export default TaskAdd;