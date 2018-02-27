import React, { Component } from 'react';
import {connect} from 'react-redux';
import {moveYourPosition,moveEnemyPosition,pickArmor,pickFood,moveUp,moveDown,moveLeft,moveRight,updateWalls,updateArmor,updateEnemy,updateFood} from '../reducers/coodinates';
import {updateHealth,damageByEnemy,getArmorPoints,getFoodPoints,getWeapon,useArmor} from '../reducers/score';
import './Board.scss';
import {BOARD_WIDTH,BOARD_HEIGHT,YOUR_INIT_POIN} from '../reducers/init';
import Task from 'data.task';
import Either from 'data.either';
const {compose,curry}=require('ramda');

class Board extends Component {




componentDidMount() {
  const getKey=(e)=>{
   if(window.event) { return e.keyCode; }  // IE
   else if(e.which) { return e.which; }    // Netscape/Firefox/Opera
 }
 const getExy=(enemy,direction)=> {
     let ex=parseInt(this.xySplit(enemy).x);
     let ey=parseInt(this.xySplit(enemy).y);
     if(direction==="UP")
        ey=parseInt(this.xySplit(enemy).y)-32;
     else if(direction==="DOWN")
        ey=parseInt(this.xySplit(enemy).y)+32;
     else if(direction==="LEFT")
          ex=parseInt(this.xySplit(enemy).x)-32;
     else if(direction==="RIGHT")
          ex=parseInt(this.xySplit(enemy).x)+32;

   let exy=ex.toString()+"_"+ey.toString();
   return exy;
 }

 const concatXY=curry((x,y)=>x.toString()+"_"+y.toString()); 
const checkXYBoundry=(xy)=> this.props.walls.indexOf(xy) <0?false:true;
const checkenemyAttack=(xy)=> this.props.enemies.indexOf(xy) <0?false:true;  
const geteAmorIndex=(xy)=>this.props.armor.indexOf(xy);
const getFoodIndex=(xy)=>this.props.food.indexOf(xy);

const checkBoundry=compose(checkXYBoundry,concatXY);

const enemyAttack=compose(checkenemyAttack,concatXY);
const pickArmor=index=>index<0?false:this.props.pickArmor(index);
const makeBool=(val)=>val===false?false:true;
const pickupArmor=compose(makeBool,pickArmor,geteAmorIndex,concatXY);
// (x,y)=>{
//   let xy=x.toString()+"_"+y.toString();
//   let index=this.props.armor.indexOf(xy);
//   if(index<0){
//     return false;
//   }
//   else{
//     this.props.pickArmor(index);
//     return true;
//   }
// }
const pickFood=index=>index<0?false:this.props.pickFood(index);
const pickupFood=compose(makeBool,pickFood,getFoodIndex,concatXY)
// (x,y)=>{
//   let xy=x.toString()+"_"+y.toString();
//   let index=this.props.food.indexOf(xy);
//   if(index<0){
//     return false;
//   }
//   else{
//     this.props.pickFood(index);
//     return true;
//   }
// }



// Initializing variables and object
 const self=this;
  document.addEventListener("keydown", function(event) {
  console.log(event.which);
  let youX= self.props.you.x;
  let youY=self.props.you.y;
  let enemies= self.props.enemies;
  let armor =self.props.armor;
  let armorPoints =self.props.armorPoints;
  let food = self.props.food;
  let left = self.props.left;
  let top = self.props.top;
  const walls= self.props.walls;
  const dinamicWall= self.props.dinamicWall;
  const moveEnemies=self.props.moveEnemyPosition;
  const move=self.props.moveYourPosition;
  const damageByEnemy=self.props.damageByEnemy;
  const getArmorPoints=self.props.getArmorPoints;
  const useArmor=self.props.useArmor;
  const getFoodPoints=self.props.getFoodPoints;
  const getWeapon=self.props.getWeapon;
  const updateHealth=self.props.updateHealth;
  const moveUp=self.props.moveUp;
  const moveDown=self.props.moveDown;
  const moveLeft=self.props.moveLeft;
  const moveRight=self.props.moveRight;
  const updateWalls =self.props.updateWalls;
  const updateArmor=self.props.updateArmor;
  const updateEnemy=self.props.updateEnemy;
  const updateFood=self.props.updateFood;


  const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT=39;
var keynum = getKey(event);

if(keynum === UP) {
  //  youX=youX;
  //  let tempY=youY;
  //  youY=(youY-32)>0?youY-32:0;

   if(!checkBoundry(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y-32)){
      // move({x:youX,y:youY});
  if(!((self.props.top)>=(BOARD_HEIGHT))&&self.props.top>(-1*BOARD_HEIGHT)-32){
       let newWall =self.moveEntity(walls,"UP");
      updateWalls(newWall);
    }
    if(!((self.props.top)>=(BOARD_HEIGHT))&&self.props.top>(-1*BOARD_HEIGHT)-32){
         let newArmor =self.moveEntity(armor,"UP");
        updateArmor(newArmor);
      }
      if(!((self.props.top)>=(BOARD_HEIGHT))&&self.props.top>(-1*BOARD_HEIGHT)-32){
        let newEnemy =self.moveEntity(enemies,"UP");
        updateEnemy(newEnemy);
        }
    if(!((self.props.top)>=(BOARD_HEIGHT))&&self.props.top>(-1*BOARD_HEIGHT)-32){
          let newFood =self.moveEntity(food,"UP");
          updateFood(newFood);
          }



      moveUp();
      if(enemyAttack(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y)){
         if(self.props.armorPoints>=1){
           useArmor();
         }
         else
         {
       damageByEnemy();
       updateHealth();
     }
       }
      if(pickupArmor(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y)){
        getArmorPoints();
         updateHealth();
       }
      if(pickupFood(YOUR_INIT_POIN,YOUR_INIT_POIN.y)){
         getFoodPoints();
         updateHealth();
      }
  // let arr=enemies.map(enemy=>getExy(enemy,"UP"));
  //  moveEnemies(arr);
}

}

if(keynum === DOWN) {

  // youX=youX;
  // let tempY= youY;
  // youY=youY+32>BOARD_HEIGHT?BOARD_HEIGHT:youY+32;


  if(!checkBoundry(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y+32)){

    // document.getElementById('game-board').style.top=document.getElementById('game-board').style.top-32;
    // move({x:youX,y:youY});
    if(!((self.props.top)>=(BOARD_HEIGHT+32))&&self.props.top>(-1*BOARD_HEIGHT)){
    let newWall =self.moveEntity(walls,"DOWN");
    updateWalls(newWall);
  }
  if(!((self.props.top)>=(BOARD_HEIGHT+32))&&self.props.top>(-1*BOARD_HEIGHT)){
  let newArmor =self.moveEntity(armor,"DOWN");
  updateArmor(newArmor);
}
if(!((self.props.top)>=(BOARD_HEIGHT+32))&&self.props.top>(-1*BOARD_HEIGHT)){
let newEnemy =self.moveEntity(enemies,"DOWN");
updateEnemy(newEnemy);
}
if(!((self.props.top)>=(BOARD_HEIGHT+32))&&self.props.top>(-1*BOARD_HEIGHT)){
let newFood =self.moveEntity(food,"DOWN");
updateFood(newFood);
}
    moveDown()
    if(enemyAttack(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y)){
       if(self.props.armorPoints>=1){
         useArmor();
       }
       else
       {
     damageByEnemy();
     updateHealth();
   }
     }
    if(pickupArmor(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y)){
      getArmorPoints();
       updateHealth();
     }
    if(pickupFood(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y)){
       getFoodPoints();
       updateHealth();
    }
// let arr=enemies.map(enemy=>getExy(enemy,"UP"));
//  moveEnemies(arr);
}
}

if(keynum === RIGHT) {

  // let tempX=youX;
  //  youX=youX+32>BOARD_WIDTH?BOARD_WIDTH:youX+32;
  // youY=youY;
  if(!checkBoundry(YOUR_INIT_POIN.x+32,YOUR_INIT_POIN.y)){
    // move({x:youX,y:youY});
    if(!((self.props.left)>=(BOARD_WIDTH+32))&&self.props.left>(-1*BOARD_WIDTH)){
      let newWall =self.moveEntity(walls,"RIGHT");
    updateWalls(newWall);
  }
  if(!((self.props.left)>=(BOARD_WIDTH+32))&&self.props.left>(-1*BOARD_WIDTH)){
    let newArmor =self.moveEntity(armor,"RIGHT");
   updateArmor(newArmor);
}
  if(!((self.props.left)>=(BOARD_WIDTH+32))&&self.props.left>(-1*BOARD_WIDTH)){
let newEnemy =self.moveEntity(enemies,"RIGHT");
updateEnemy(newEnemy);
}
if(!((self.props.left)>=(BOARD_WIDTH+32))&&self.props.left>(-1*BOARD_WIDTH)){
let newFood =self.moveEntity(food,"RIGHT");
updateFood(newFood);
}

    moveRight()
    if(enemyAttack(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y)){
       if(self.props.armorPoints>=1){
         useArmor();
       }
       else
       {
     damageByEnemy();
     updateHealth();
   }
     }
    if(pickupArmor(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y)){
      getArmorPoints();
       updateHealth();
     }
    if(pickupFood(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y)){
       getFoodPoints();
       updateHealth();
    }
  // let arr=enemies.map(enemy=>getExy(enemy,"RIGHT"));
  // moveEnemies(arr);
}
else{
  // youX=tempX;
  // move({x:youX,y:youY});
}
}
if(keynum === LEFT) {

  // let tempX=youX;
  // youX=(youX-32)>0?youX-32:0;
  // youY=youY;
  if(!checkBoundry(YOUR_INIT_POIN.x-32,YOUR_INIT_POIN.y)){
    // move({x:youX,y:youY});

  if(!((self.props.left)>=(BOARD_WIDTH))&&self.props.left>(-1*BOARD_WIDTH)-32){
     let newWall =self.moveEntity(walls,"LEFT");
    updateWalls(newWall);
  }
  if(!((self.props.left)>=(BOARD_WIDTH))&&self.props.left>(-1*BOARD_WIDTH)-32){
    let newArmor =self.moveEntity(armor,"LEFT");
   updateArmor(newArmor);
  }
  if(!((self.props.left)>=(BOARD_WIDTH))&&self.props.left>(-1*BOARD_WIDTH)-32){
let newEnemy =self.moveEntity(enemies,"LEFT");
updateEnemy(newEnemy);
}
if(!((self.props.left)>=(BOARD_WIDTH))&&self.props.left>(-1*BOARD_WIDTH)-32){
let newFood =self.moveEntity(food,"LEFT");
updateFood(newFood);
}
    moveLeft();
    if(enemyAttack(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y)){
       if(self.props.armorPoints>=1){
         useArmor();
       }
       else
       {
     damageByEnemy();
     updateHealth();
   }
     }
    if(pickupArmor(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y)){
      getArmorPoints();
       updateHealth();
     }
    if(pickupFood(YOUR_INIT_POIN.x,YOUR_INIT_POIN.y)){
       getFoodPoints();
       updateHealth();
    }
  // let arr=enemies.map(enemy=>getExy(enemy,"LEFT"));
  // moveEnemies(arr);
}
else{
  // youX=tempX;
  // move({x:youX,y:youY});
}
}


});
}

 // move entity position
moveEnemy(enemy,direction){
  if(direction==="UP"){
return  enemy.map(wall=>{
const x=  this.xySplit(wall).x;
const y= parseInt(this.xySplit(wall).y)+32;
const xy=x.toString()+"_"+y.toString();
return xy;
});
}
else if(direction==="DOWN"){
  return  enemy.map(wall=>{
  const x=  this.xySplit(wall).x;
  const y= parseInt(this.xySplit(wall).y)-32;
  const xy=x.toString()+"_"+y.toString();
  return xy;
  });
}
else if(direction==="LEFT"){

  return  enemy.map(wall=>{
  const y=  this.xySplit(wall).y;
  const x= parseInt(this.xySplit(wall).x)+32;
  const xy=x.toString()+"_"+y.toString();
  return xy;
  });
}
else if(direction==="RIGHT"){

  return  enemy.map(wall=>{
  const y=  this.xySplit(wall).y;
  const x= parseInt(this.xySplit(wall).x)-32;
  const xy=x.toString()+"_"+y.toString();
  return xy;
  });
}
}


moveEntity(entity,direction){
  if(direction==="UP"){
return  entity.map(wall=>{
const x=  this.xySplit(wall).x;
const y= parseInt(this.xySplit(wall).y)+32;
const xy=x.toString()+"_"+y.toString();
return xy;
});
}
else if(direction==="DOWN"){
  return  entity.map(wall=>{
  const x=  this.xySplit(wall).x;
  const y= parseInt(this.xySplit(wall).y)-32;
  const xy=x.toString()+"_"+y.toString();
  return xy;
  });
}
else if(direction==="LEFT"){

  return  entity.map(wall=>{
  const y=  this.xySplit(wall).y;
  const x= parseInt(this.xySplit(wall).x)+32;
  const xy=x.toString()+"_"+y.toString();
  return xy;
  });
}
else if(direction==="RIGHT"){

  return  entity.map(wall=>{
  const y=  this.xySplit(wall).y;
  const x= parseInt(this.xySplit(wall).x)-32;
  const xy=x.toString()+"_"+y.toString();
  return xy;
  });
}
}

xySplit(xy){
  let arr=xy.split("_");
  const obj={x:arr[0],y:arr[1]};
  return obj;
}
  render() {

const left =this.props.left;
const top = this.props.top;
    return (
      <div id="game-board" className="game-board">
        {this.props.food.map((fd,i)=><div key={fd} className="food" id={fd} style={{position: 'abosolute', left:parseInt(this.xySplit(fd).x), top: parseInt(this.xySplit(fd).y)}}></div>)}
        {this.props.armor.map((arm,i)=><div key={arm} className="armor" id={arm} style={{position: 'abosolute', left: parseInt(this.xySplit(arm).x), top: parseInt(this.xySplit(arm).y)}}></div>)}
      {this.props.enemies.map((enemy,i)=><div key={enemy} className="enemy" id={enemy} style={{position: 'abosolute', left: parseInt(this.xySplit(enemy).x), top: parseInt(this.xySplit(enemy).y)}}></div>)}
      {this.props.walls.map((wall,i)=><div key={wall+i} className="wall" id={wall+i} style={{position: 'abosolute', left: parseInt(this.xySplit(wall).x), top: parseInt(this.xySplit(wall).y)}}></div>)}
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
