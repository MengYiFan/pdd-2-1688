import{C as b,a8 as e,ax as y,b1 as h,b2 as m}from"./index.82e61b98.js";import{E as w}from"./index2.8c200d58.js";import"./index2.b3b07065.js";var E=b({setup(){const p=async u=>{var n,o;const a=(o=(n=u.target.files)==null?void 0:n[0])!=null?o:null;if(!a)return;const t=await h(()=>import("./xlsx.89ea120e.js"),[]),r=new FileReader;r.onload=c=>{let l=t.read(c.target.result,{type:"binary"}),i=l.SheetNames.map(s=>{let d=l.Sheets[s],g=t.utils.sheet_to_json(d,{header:1,defval:"-",raw:!0,rawNumbers:!0});return console.log("Raw data: ",d),{sheetName:s,data:g.filter(f=>!f.every(x=>x===""))}});console.log("Sheet data: ",i),m({message:`<pre>${JSON.stringify(i,null,2)}</pre>`,dangerouslyUseHTMLString:!0,duration:1e3,showClose:!0})},r.readAsBinaryString(a)};return()=>e("div",{class:"parse-excel-container"},[e(w,{type:"info",style:{backgroundColor:"#232323"}},{default:()=>[e("label",{for:"input-file",style:{cursor:"pointer"}},[y("\u4E0A\u4F20 Excel \u89E3\u6790")])]}),e("input",{id:"input-file",type:"file",style:{display:"none"},onChange:p},null)])}});export{E as default};
