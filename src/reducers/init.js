export const BOARD_WIDTH=512;
export const BOARD_HEIGHT=512;

export const YOUR_INIT_POIN={
  x:0,y:0
};


// Contatinates coodinates
const cooConcat=(x,y)=>{
return ""+x.toString()+"_"+y.toString();
}
const lWall=(startx,starty)=>{
  let arr=[starty,starty,starty,starty,starty,starty,starty,starty,starty];
  let xyArr=arr.map((x,i)=>i<6?cooConcat(x,(starty+(32*(i+1)))):cooConcat(x+(32*(i-5)),starty+(32*6)));
  return xyArr;
}

const tWall=(startx,starty)=>{
  let arr=[startx,starty,starty,starty,starty,starty,starty,starty,starty,starty];
  let xyArr=arr.map((y,i)=>i<6?cooConcat((startx+(32*(i+1))),y):cooConcat(starty+(32*4),y+(32*(i-5)),));
  return xyArr;
}
const xWall=(startx,starty)=>{
  let arr=[starty,starty,starty,starty,starty,starty,starty,starty,starty,starty];
  let xyArr=arr.map((y,i)=>i<6?cooConcat((startx+(32*(i+1))),y):cooConcat(starty+(32*4),y+(32*(i-8)),));
  return xyArr;
}

const vlineWall5=(startx,starty)=>{
  let arr=[starty,starty,starty,starty,starty];
    let xyArr=arr.map((y,i)=>cooConcat(startx,y+(32*(i))));
  return xyArr;
}

const boxWall=(startx,starty)=>{
  return [...lineWall(startx+32,starty,10),...vLineWall(startx,starty,5),...vLineWall(startx+352,starty,5),...lineWall(startx+32,starty+160,8)]
}

const vLineWall=(startx,starty,n)=>{
  let arr=[];
  for(let j=0;j<=n;j++){
    arr.push(starty);
  }
  // let arr=[startx,startx,startx,startx,startx,startx,startx,startx,startx,startx];
    let xyArr=arr.map((y,i)=>cooConcat(startx,y+(32*(i))));
  return xyArr;
}
const lineWall=(startx,starty,n)=>{
  let arr=[];
  for(let j=0;j<=n;j++){
    arr.push(startx);
  }
  // let arr=[startx,startx,startx,startx,startx,startx,startx,startx,startx,startx];
    let xyArr=arr.map((x,i)=>cooConcat(x+(32*(i)),starty));
  return xyArr;
}
const lineWall10=(startx,starty)=>{
  let arr=[startx,startx,startx,startx,startx,startx,startx,startx,startx,startx];
    let xyArr=arr.map((x,i)=>cooConcat(x+(32*(i)),starty));
  return xyArr;
}
let tempWall1=[...lWall(0,0),...tWall(160,160)];
let tempWall2=[...tempWall1,...xWall(64,64)];
const wallArrs=[...tempWall2,...lineWall(320,96,10),...boxWall(384,224),...lineWall(480,288,4)];
export const WALL_INIT_POIN=wallArrs;
console.log("wall init point--->");
console.log(WALL_INIT_POIN);

const getRandomIntInclusive=(min, max)=>{
  min = Math.ceil(min);
  max = Math.floor(max/32);
  return (Math.floor(Math.random() * (max - min + 1)) + min)*32; //The maximum is inclusive and the minimum is inclusive
}

const genEntities=(max,num,wall,enemy)=>{
  let arr=[];
  let adj=[];

  for(let j=0;j<=num;j++){
    const x=getRandomIntInclusive(0,max);
    const nextx=x+32;
    const beforex=x-32;
  const y =getRandomIntInclusive(0,max);
  const nexty=y+32;
  const beforey=y-32;
  const nextOnX=nextx.toString()+"_"+y.toString();
  const nextOnY=x.toString()+"_"+nexty.toString();
  const beforeOnX=beforex.toString()+"_"+y.toString();
  const beforeOnY=x.toString()+"_"+beforey.toString();
  const adjxy=nextx.toString()+"_"+nexty.toString();
  const adjyNxy=beforex.toString()+"_"+beforey.toString();
  const xy=x.toString()+"_"+y.toString();
  if(wall.indexOf(xy)<0&&arr.indexOf(xy)<0&&adj.indexOf(xy)<0&&enemy.indexOf(xy)<0){
     arr.push(xy);
     adj.push(adjxy);
     adj.push(adjyNxy);
     adj.push(nextOnX);
     adj.push(nextOnY);
     adj.push(beforeOnX);
     adj.push(beforeOnY);
}
}
  return arr;

}




export const ENEMY_INIT_POIN=genEntities(BOARD_WIDTH,10,WALL_INIT_POIN,[]);

export const ARMOR_INIT_POINT=genEntities(BOARD_WIDTH,10,WALL_INIT_POIN,ENEMY_INIT_POIN);

export const FOOD_INIT_POINT=genEntities(BOARD_WIDTH,10,WALL_INIT_POIN,ENEMY_INIT_POIN)
console.log("Food init point--->");
console.log(FOOD_INIT_POINT);
console.log("Armor init point--->");
console.log(ARMOR_INIT_POINT);
