
import {YOUR_INIT_POIN,ENEMY_INIT_POIN,ARMOR_INIT_POINT,WALL_INIT_POIN,WALL_X_BOUNDRY,WALL_Y_BOUNDRY,FOOD_INIT_POINT,BOARD_HEIGHT,BOARD_WIDTH} from './init';

const MOVE_YOUR_POSITION = 'MOVE_YOUR_POSITION';
const MOVE_ENEMY_POSITION='MOVE_ENEMY_POSITION';
const WEAPON_PICKED='WEAPON_PICKED';
const ARMOR_PICKED='ARMOR_PICKED';
const PICK_ARMOR='PICK_ARMOR';
const PICK_FOOD='PICK_FOOD';
const MOVE_UP='MOVE_UP';
const MOVE_DOWN='MOVE_DOWN';
const MOVE_LEFT='MOVE_LEFT';
const MOVE_RIGHT='MOVE_RIGHT';
const UPDATE_WALL='UPDATE_WALL';
const UPDATE_ARMOR='UPDATE_ARMOR';
const UPDATE_ENEMY='UPDATE_ENEMY';
const UPDATE_FOOD='UPDATE_FOOD';

// Redux Action creator decleration
export const moveYourPosition=(coodinates)=>({type:MOVE_YOUR_POSITION,payload:{x:coodinates.x,y:coodinates.y}});
export const moveEnemyPosition=(newEnemiesCo)=>({type:MOVE_ENEMY_POSITION,payload:newEnemiesCo});
export const pickArmor=(id)=>({type:PICK_ARMOR,id:id});
export const pickFood=(id)=>({type:PICK_FOOD,id:id});
export const moveUp=()=>({type:MOVE_UP,payload:""});
export const moveLeft=()=>({type:MOVE_LEFT,payload:""});
export const moveDown=()=>({type:MOVE_DOWN,payload:""});
export const moveRight=()=>({type:MOVE_RIGHT,payload:""});
export const updateWalls=(walls)=>({type:UPDATE_WALL,payload:walls});
export const updateArmor=(armor)=>({type:UPDATE_ARMOR,payload:armor});
export const updateEnemy=(enemy)=>({type:UPDATE_ENEMY,payload:enemy});
export const updateFood=(food)=>({type:UPDATE_FOOD,payload:food});



const xySplit=(xy)=>{
  let arr=xy.split("_");
  const obj={x:arr[0],y:arr[1]};
  return obj;
}

const moveUpAction=(state)=>{

 return  Object.assign({},state,{top:(state.top>=BOARD_HEIGHT?BOARD_HEIGHT:state.top+32)});
}
const moveDownAction=(state)=>{

 return  Object.assign({},state,{top:(state.top<=(-1*BOARD_HEIGHT)?-1*BOARD_HEIGHT:state.top-32)});
}

const moveLeftAction=(state)=>{

 return  Object.assign({},state,{left:(state.left>=BOARD_WIDTH?BOARD_WIDTH:state.left+32)});
}
const moveRightAction=(state)=>{

 return  Object.assign({},state,{left:(state.left<=(-1*BOARD_WIDTH)?-1*BOARD_WIDTH:state.left-32)});
}
const pickFoodAction=(state,action)=>{

  const newSate=Object.assign({},state,{food:[...state.food.slice(0,action.id),...state.food.slice(action.id+1)]});
  return newSate;
  
}
const nothing=()=>{return };
const initialState={
  you:YOUR_INIT_POIN,
  enemy:ENEMY_INIT_POIN,
  armor:ARMOR_INIT_POINT,
  walls:WALL_INIT_POIN,
  dinamicWall:WALL_INIT_POIN,
  dinamicArmor:ARMOR_INIT_POINT,
  dinamicEnemy:ENEMY_INIT_POIN,
  dinamicFood:FOOD_INIT_POINT,
  food:FOOD_INIT_POINT,
  top:0,
  left:0,
}
export default (state=initialState,action)=>{

switch (action.type) {
  case MOVE_UP:
     return moveUpAction(state) ;
  case MOVE_DOWN:
     return moveDownAction(state);
  case MOVE_LEFT:
     return moveLeftAction(state);
  case MOVE_RIGHT:
     return moveRightAction(state);
  case MOVE_YOUR_POSITION:
     return Object.assign({},state,{you:action.payload});
  case MOVE_ENEMY_POSITION:
      return Object.assign({},state,{enemy:action.payload});
  case WEAPON_PICKED:
     return {...state,weapon:[...state.weapon.slice(0,action.id-1),...state.weapon.slice(action.id+1)]};
  case ARMOR_PICKED:
        return {...state,armor:[...state.armor.slice(0,action.id-1),...state.armor.slice(action.id+1)]};
  case PICK_ARMOR:
       return Object.assign({},state,{armor:[...state.armor.slice(0,action.id),...state.armor.slice(action.id+1)]});
  case PICK_FOOD:
            return  pickFoodAction(state,action);
  case UPDATE_WALL:
          return Object.assign({},state,{walls:action.payload});
  case UPDATE_ARMOR:
                  return Object.assign({},state,{armor:action.payload});
  case UPDATE_ENEMY:
          return Object.assign({},state,{enemy:action.payload});
  case UPDATE_FOOD:
          return Object.assign({},state,{food:action.payload});

  default:
    return state;

}

}
