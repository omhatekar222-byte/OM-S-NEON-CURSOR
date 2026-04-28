const canvas=document.getElementById('trail');
const ctx=canvas.getContext('2d');
const glow=document.querySelector('.glow');
let w,h;
function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight}
addEventListener('resize',resize);resize();

let points=[];
function draw(){
 ctx.clearRect(0,0,w,h);
 ctx.lineCap='round';
 ctx.lineJoin='round';
 for(let i=1;i<points.length;i++){
   const p1=points[i-1],p2=points[i];
   ctx.beginPath();
   ctx.strokeStyle='#f01b13';
   ctx.shadowColor='#eb660e';
   ctx.shadowBlur=18;
   ctx.lineWidth=Math.max(1,p2.life/8);
   ctx.moveTo(p1.x,p1.y);
   ctx.lineTo(p2.x,p2.y);
   ctx.stroke();
 }
 points.forEach(p=>p.life-=0.6);
 points=points.filter(p=>p.life>0);
 requestAnimationFrame(draw);
}
draw();

addEventListener('mousemove',e=>{
 glow.style.left=e.clientX+'px';
 glow.style.top=e.clientY+'px';
 points.push({x:e.clientX,y:e.clientY,life:22});
 if(points.length>80) points.shift();
});
