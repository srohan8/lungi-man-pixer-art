const sharp=require('sharp');
(async()=>{const {data,info}=await sharp(process.env.TEMP+'/leaf_clear.png').ensureAlpha().raw().toBuffer({resolveWithObject:true});const W=info.width,H=info.height;
const lab=new Int32Array(W*H);let n=0;const comps=[];
for(let i=0;i<W*H;i++){if(data[i*4+3]<=40||lab[i])continue;n++;const st=[i];lab[i]=n;let cnt=0,x0=W,x1=0,y0=H,y1=0;while(st.length){const p=st.pop();cnt++;const x=p%W,y=(p/W)|0;if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=W||ny>=H)continue;const q=ny*W+nx;if(!lab[q]&&data[q*4+3]>40){lab[q]=n;st.push(q)}}}comps.push({n,cnt,x0,x1,y0,y1})}
comps.sort((a,b)=>b.cnt-a.cnt);console.log(comps.filter(c=>c.cnt>1500).map(c=>c.n+':'+c.cnt+' x'+c.x0+'-'+c.x1+' y'+c.y0+'-'+c.y1).join('\n'))})()
