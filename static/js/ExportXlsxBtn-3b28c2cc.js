import{_ as o,r as s,m as t,o as e,a,c as n,d as r,f as l,g as c,t as p,b as i,l as x,e as u,w as f,F as m}from"./index-9e27afd7.js";import{E as d}from"./FileSaver.min-8b294d8d.js";const E={class:"export-xlsx-container"},_={class:"mr-2"},b=o({__name:"ExportXlsxBtn",props:{onExport:{type:Function,require:!0,default:()=>null}},setup(o){const b=s(null),v=o;return t(v,((o,s)=>b.value=v.onExport)),e((()=>b.value=v.onExport)),(o,s)=>{const t=a("el-button"),e=a("el-tooltip");return n(),r(m,null,[l(" 此組件只有包裝好外觀而已, 匯出 .xlsx 方法要另外實作 "),c("span",E,[c("strong",_,p(`${i(x)("Export")}:`),1),u(e,{content:i(x)("Export as xlsx file"),effect:"dark",placement:"bottom"},{default:f((()=>[u(t,{icon:i(d),color:"#c6c6c6",circle:"",onClick:i(b)},null,8,["icon","onClick"])])),_:1},8,["content"])])],2112)}}},[["__scopeId","data-v-1b16f16f"],["__file","C:/Program Files/Workspace/it-req-fe/src/components/ExportXlsxBtn.vue"]]);export{b as E};