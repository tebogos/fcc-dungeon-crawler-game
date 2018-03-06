import React, { Component } from 'react';
import {connect} from 'react-redux';
import {moveYourPosition,moveEnemyPosition,pickArmor,pickFood,moveUp,moveDown,moveLeft,moveRight,updateWalls,updateArmor,updateEnemy,updateFood} from '../reducers/coodinates';
import {updateHealth,damageByEnemy,getArmorPoints,getFoodPoints,getWeapon,useArmor} from '../reducers/score';
import {moveEntity,xySplit,peak,concatXY} from './board_utils';
import './Board.scss';
import {BOARD_WIDTH,BOARD_HEIGHT,YOUR_INIT_POIN} from '../reducers/init';
import Task from 'data.task';
import Either from 'data.either';
const {compose,curry,map,chain}=require('ramda');
// const {Either} =require('data.either');

class Board extends Component {




componentDidMount() {
  const getKey=(e)=>{
   if(window.event) { return e.keyCode; }  // IE
   else if(e.which) { return e.which; }    // Netscape/Firefox/Opera
 }
 



// Initializing variables and object
 const self=this;
  document.addEventListener("keydown", function(event) {
  console.log(event.which);
  const moveUp=self.props.moveUp;
  const moveDown=self.props.moveDown;
  const moveLeft=self.props.moveLeft;
  const moveRight=self.props.moveRight;
  const updateWalls =self.props.updateWalls;
  const updateArmor=self.props.updateArmor;
  const updateEnemy=self.props.updateEnemy;
  const updateFood=self.props.updateFood;

//  This is the fuctiona refactoring branch
  const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT=39;
var keynum = getKey(event);









// const checkXYBoundry=(xy)=> this.props.walls.indexOf(xy) <0?Either.Left(null):Either.Right(xy);
const checkenemyAttack=(xy)=> self.props.enemies.indexOf(xy) <0?Either.Left(null):Either.Right(true);  
const getAmorIndex=(xy)=>self.props.armor.indexOf(xy);
const getFoodIndex=(xy)=>self.props.food.indexOf(xy);
const enemyAttack=compose(checkenemyAttack,concatXY);

const checkBoundry=curry((xy)=> self.props.walls.indexOf(xy) <0?Either.Right(xy):Either.Left(null));




const updateHealth=bool=>{
  if(bool){
    self.props.updateHealth();
    return Either.Right(true)
  }
    else 
      return Either.Left(null)
    };
    const damageByEnemy=bool=>{
      if(bool){
        self.props.damageByEnemy();
        return Either.Right(true)
      }
        else 
          return Either.Left(null)
        };
const getArmorPoints=bool=>{
  if(bool){
    self.props.getArmorPoints();
    return Either.Right(true);
  }
  esle 
    return Either.Left(null);
}

const  pickArmor=(index)=>{
  if(index>0){
    self.props.pickArmor(index);
    return Either.Right(true);
  }
  else
    return Either.Left(null);
};
const pickFood=index=>{
  if(index<0)
    return Either.Left(null);
  else {
  
    self.props.pickFood(index);
    return Either.Right(true);
  }
  };
  
  
  const getFoodPoints=bool=>{
    if(bool)
     {
      self.props.getFoodPoints();
        return Either.Right(true)
      }
    else 
      return 
      Either.Left(null)};



const xyUp=concatXY(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y-32);
const keyUp=(direction,code)=>direction===code?Either.Right(xyUp):Either.Left(null);
const xyDown=concatXY( YOUR_INIT_POIN.x,YOUR_INIT_POIN.y+32);
const keyDown=(direction,code)=>direction===code?Either.Right(xyDown):Either.Left(null);
const xyLeft=concatXY( YOUR_INIT_POIN.x-32,YOUR_INIT_POIN.y);
const keyLeft=(direction,code)=>direction===code?Either.Right(xyLeft):Either.Left(null);
const xyRight=concatXY( YOUR_INIT_POIN.x+32,YOUR_INIT_POIN.y);
const keyRight=(direction,code)=>{
 
  
  return direction===code?Either.Right(xyRight):Either.Left(null)};

const checkDirectionToValidate=(direction,code)=>{
  if(code===38)
    return validateUpMove(direction,code);
    else if(code===40)
    return validateDownMove(direction,code);
    else if(code===37)
    return validateLeftMove(direction,code);
    else if(code===39)
    return validateRightMove(direction,code);
}

const checkIfCanupdateUp=(bd)=>bd&&(!((self.props.top)>=(BOARD_HEIGHT))&&self.props.top>(-1*BOARD_HEIGHT)-32)?Either.Right('UP')
     :Either.Left(null);
const checkIfCanupdateDown=(bd)=>bd&&(!((self.props.top)>=(BOARD_HEIGHT+32))&&self.props.top>(-1*BOARD_HEIGHT))?Either.Right('DOWN')
     :Either.Left(null);
const checkIfCanupdateLeft=(bd)=>bd&&(!((self.props.left)>=(BOARD_WIDTH))&&self.props.left>(-1*BOARD_WIDTH)-32)?Either.Right('LEFT')
     :Either.Left(null);
const checkIfCanupdateRight=(bd)=>bd&&(!((self.props.left)>=(BOARD_WIDTH+32))&&self.props.left>(-1*BOARD_WIDTH))?Either.Right('RIGHT')
     :Either.Left(null);
const newEntety=curry((ent,dr)=>moveEntity(ent,dr));
const newWall=newEntety(self.props.walls);
const newArmor=newEntety(self.props.armor);
const newEnemy=newEntety(self.props.enemies);
const newFood=newEntety(self.props.food);
const validateUpMove=compose(chain(checkIfCanupdateUp),chain(checkBoundry),keyUp);
const validateDownMove=compose(chain(checkIfCanupdateDown),chain(checkBoundry),keyDown);
const validateLeftMove=compose(chain(checkIfCanupdateLeft),chain(checkBoundry),keyLeft);
const validateRightMove=compose(chain(checkIfCanupdateRight),chain(checkBoundry),keyRight)
const doUpdateWalls=compose(map(updateWalls),map(newWall),checkDirectionToValidate);
const doUpdateArmor=compose(map(updateArmor),map(newArmor),checkDirectionToValidate);
const doUpdateEnemy=compose(map(updateEnemy),map(newEnemy),checkDirectionToValidate);
const doUpdateFood=compose(map(updateFood),map(newFood),checkDirectionToValidate);
const doMoveUp=compose(moveUp,map(checkBoundry),keyUp);
const doMoveDown=compose(moveDown,map(checkBoundry),keyDown);
const doMoveLeft=compose(moveLeft,map(checkBoundry),keyLeft);
const doMoveRight=compose(moveRight,map(checkBoundry),keyRight);
// const isEnemyAttecking=enemyAttack(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y);
const hasArmor=attack=>{
  if(attack&&self.props.armorPoints>=1)
    return Either.Right('attacking-armor');
  else  if(attack)
    return Either.Right('attacking-no-armor');
  else
    return Either.Left(null);
    };
const useArmor=armor=>{
  if(armor==="attacking-armor"){
    self.props.useArmor();
    return Either.Left(null);
  }
  else if(armor==="attacking-no-armor")
    return Either.Right(true);
}
const doEnemyAttack=compose(chain(updateHealth),chain(damageByEnemy),chain(useArmor),chain(hasArmor),enemyAttack)


const pickupArmor=compose(chain(updateHealth),chain(getArmorPoints),pickArmor,getAmorIndex,concatXY);
const pickupFood=compose(chain(updateHealth),chain(getFoodPoints),pickFood,getFoodIndex,concatXY)
  const updateHealthAndArmor=compose(pickupArmor);
  
  const updateHealthAndFood=compose(pickupFood);
  
doUpdateWalls(keynum,UP);
doUpdateArmor(keynum,UP);
doUpdateEnemy(keynum,UP);
doUpdateFood(keynum,UP);
doUpdateWalls(keynum,DOWN);
doUpdateArmor(keynum,DOWN);
doUpdateEnemy(keynum,DOWN);
doUpdateFood(keynum,DOWN);
doUpdateWalls(keynum,LEFT);
doUpdateArmor(keynum,LEFT);
doUpdateEnemy(keynum,LEFT);
doUpdateFood(keynum,LEFT);
doUpdateWalls(keynum,RIGHT);
doUpdateArmor(keynum,RIGHT);
doUpdateEnemy(keynum,RIGHT);
doUpdateFood(keynum,RIGHT);
doMoveUp(keynum,UP);
doMoveDown(keynum,DOWN);
doMoveLeft(keynum,LEFT);
doMoveRight(keynum,RIGHT);
doEnemyAttack(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y);
updateHealthAndArmor(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y);
updateHealthAndFood(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y);



});
}

 


  render() {

const left =this.props.left;
const top = this.props.top;
    return (
      <div id="game-board" className="game-board">
        {this.props.food.map((fd,i)=><div key={fd} className="food" id={fd} style={{position: 'abosolute', left:parseInt(xySplit(fd).x), top: parseInt(xySplit(fd).y)}}></div>)}
        {this.props.armor.map((arm,i)=><div key={arm} className="armor" id={arm} style={{position: 'abosolute', left: parseInt(xySplit(arm).x), top: parseInt(xySplit(arm).y)}}></div>)}
      {this.props.enemies.map((enemy,i)=><div key={enemy} className="enemy" id={enemy} style={{position: 'abosolute', left: parseInt(xySplit(enemy).x), top: parseInt(xySplit(enemy).y)}}></div>)}
      {this.props.walls.map((wall,i)=><div key={wall+i} className="wall" id={wall+i} style={{position: 'abosolute', left: parseInt(xySplit(wall).x), top: parseInt(xySplit(wall).y)}}></div>)}
      <div id="you" style={{position: 'abosolute', left: this.props.you.x, top: this.props.you.y}}></div>
      <span >x  { left} </span> <span>y {top} </span>
      </div>
    );
  }

}

export default connect(
  (state)=>({you:state.coodinates.you,enemies:state.coodinates.enemy,left:state.coodinates.left,top:state.coodinates.top,dinamicWall:state.coodinates.dinamicWall,
    walls:state.coodinates.walls,armor:state.coodinates.armor,food:state.coodinates.food,armorPoints:state.score.armor}),{moveYourPosition,moveEnemyPosition,pickArmor,pickFood,
      updateHealth,damageByEnemy,getArmorPoints,getFoodPoints,getWeapon,useArmor,moveUp,moveDown,moveLeft,moveRight,updateWalls,updateArmor,updateEnemy,updateFood
    }
)(Board);
