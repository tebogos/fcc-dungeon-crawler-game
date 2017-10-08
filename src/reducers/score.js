import {YOUR_INIT_POIN,ENEMY_INIT_POIN,ARMOR_INIT_POINT,WALL_INIT_POIN,WALL_X_BOUNDRY,WALL_Y_BOUNDRY,FOOD_INIT_POINT} from './init';

const UPDATE_HEALTH = 'UPDATE_HEALTH';
const DAMAGE_BY_ENEMY='DAMAGE_BY_ENEMY';
const GET_ARMOR_POINTS='GET_ARMOR_POINTS';
const GET_FOOD_POINTS='GET_FOOD_POINTS';
const GET_WEAPON='GET_WEAPON';
const USE_ARMOR='USE_ARMOR';


export const updateHealth=()=>({type:UPDATE_HEALTH,payload:{}});
export const damageByEnemy=()=>({type:DAMAGE_BY_ENEMY,payload:""});
export const getArmorPoints=()=>({type:GET_ARMOR_POINTS,payload:""});
export const useArmor=()=>({type:USE_ARMOR,payload:""});
export const getFoodPoints=()=>({type:GET_FOOD_POINTS,payload:""});
export const getWeapon=(weapon)=>({type:GET_WEAPON,weapon})

const nothing=()=>{return };
const initialState={
  health:0,
  armor:0,
  food:0,
  damage:0,
  weapon:""
}
export default (state=initialState,action)=>{

switch (action.type) {
  case UPDATE_HEALTH:
     return Object.assign({},state,{health:state.food+state.damage});
  case DAMAGE_BY_ENEMY:
      return Object.assign({},state,{damage:state.damage-5});
  case GET_ARMOR_POINTS:
        return Object.assign({},state,{armor:state.armor+1});
  case USE_ARMOR:
        return Object.assign({},state,{armor:state.armor-1});
  case GET_FOOD_POINTS:
       return Object.assign({},state,{food:state.food+5});
  case GET_WEAPON:
            return Object.assign({},state,{weapon:action.weapon});

  default:
    return state;

}

}
