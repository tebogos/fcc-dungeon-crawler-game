const {compose,curry,map,chain}=require('ramda');
export const xySplit=(xy)=>{
  let arr=xy.split("_");
  const obj={x:arr[0],y:arr[1]};
  return obj;
}
 export const peak=x=>{  
  console.log('peaking in compose',x);
  return x;
  }
// move entity position
export const moveEntity=(entity,direction)=>{
  if(direction==="UP"){
return  entity.map(wall=>{
const x=  xySplit(wall).x;
const y= parseInt(xySplit(wall).y)+32;
const xy=x.toString()+"_"+y.toString();
return xy;
});
}
else if(direction==="DOWN"){
  return  entity.map(wall=>{
  const x=  xySplit(wall).x;
  const y= parseInt(xySplit(wall).y)-32;
  const xy=x.toString()+"_"+y.toString();
  return xy;
  });
}
else if(direction==="LEFT"){

  return  entity.map(wall=>{
  const y=  xySplit(wall).y;
  const x= parseInt(xySplit(wall).x)+32;
  const xy=x.toString()+"_"+y.toString();
  return xy;
  });
}
else if(direction==="RIGHT"){

  return  entity.map(wall=>{
  const y=  xySplit(wall).y;
  const x= parseInt(xySplit(wall).x)-32;
  const xy=x.toString()+"_"+y.toString();
  return xy;
  });
}
}

export const concatXY=curry((x,y)=>x.toString()+"_"+y.toString()); 




