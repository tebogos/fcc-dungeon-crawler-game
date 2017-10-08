
// import {LOAD_TODOS,ADD_TODO,TOGGLE_TODO,DELETE_TODO} from './todo';

const NEW_MESSAGE = 'NEW_MESSAGE';


export const newMessage=(message)=>({type:NEW_MESSAGE,payload:message})
const nothing=()=>{return };
export default (state="",action)=>{

switch (action.type) {
  case NEW_MESSAGE:
     return action.payload;
  case 'LOAD_TODOS':
  case 'ADD_TODO':
  case 'TOGGLE_TODO':
  case 'DELETE_TODO':
  return "";

  default:
    return state;

}

}
