import{ab as t,e as r,u as I,ay as f,am as p,x as i,o as h,w as y,P as j,aJ as m}from"./index.4dcad61d.js";const w={prefix:Math.floor(Math.random()*1e4),current:0},F=Symbol("elIdInjection"),K=e=>{const u=t(F,w);return r(()=>I(e)||`el-id-${u.prefix}-${u.current++}`)},_=()=>{const e=t(f,void 0),u=t(p,void 0);return{form:e,formItem:u}},E=(e,{formItemContext:u,disableIdGeneration:s,disableIdManagement:a})=>{s||(s=i(!1)),a||(a=i(!1));const n=i();let d;const v=r(()=>{var o;return!!(!e.label&&u&&u.inputIds&&((o=u.inputIds)==null?void 0:o.length)<=1)});return h(()=>{d=y([j(e,"id"),s],([o,c])=>{const l=o!=null?o:c?void 0:K().value;l!==n.value&&(u!=null&&u.removeInputId&&(n.value&&u.removeInputId(n.value),!(a!=null&&a.value)&&!c&&l&&u.addInputId(l)),n.value=l)},{immediate:!0})}),m(()=>{d&&d(),u!=null&&u.removeInputId&&n.value&&u.removeInputId(n.value)}),{isLabeledByFormItem:v,inputId:n}};export{E as a,K as b,_ as u};