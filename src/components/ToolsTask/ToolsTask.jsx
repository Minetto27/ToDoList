import React from 'react';
import { useState } from 'react';
import './ToolsTask.css';

function ToolsTask(props){  
    const { count, onChangeTaskType, onRemAllCom } = props;

    const [stateNow, setStateNow] = useState('all');

    const clickTypeFilter = (typeNow) => {
        setStateNow(typeNow);
        //Envia qual array quero mostrar na tela
        onChangeTaskType(typeNow);
    }
   
    return (
        <>      
        <div className='tools-task'>     
            <div>
            <a style={{ marginLeft: '-16rem',float: 'left', zIndex: '0'}}>{count} item left <span className='clearComple' onClick={() => onRemAllCom('removeAll')}> Clear Completed</span></a> 
            </div> 
            <div className='buttonsTool'>
            <button type='button' style={{ borderWidth: stateNow === 'all' ? '1px' : '', borderColor: stateNow === 'all' ? 'black' : ''}} onClick={() => clickTypeFilter('all')}> All </button>
            <button type='button' style={{ borderWidth: stateNow === 'active' ? '1px' : '', borderColor: stateNow === 'active' ? 'black' : '' , marginLeft: '15px',marginRight: '15px'}} onClick={() => clickTypeFilter('active')}> Active </button>
            <button type='button' style={{ borderWidth: stateNow === 'completed' ? '1px' : '', borderColor: stateNow === 'completed' ? 'black' : ''}} onClick={() => clickTypeFilter('completed')}> Completed </button>
            </div>
            <div>
            
            </div>
            
        </div>  
        
        </>
        
    )
    
}

export default ToolsTask;