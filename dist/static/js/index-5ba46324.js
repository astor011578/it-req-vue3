import{_ as e,u as a,r as t,o as l,a as s,b as r,c as o,d as n,e as c,f as i,i as u,g as d,t as m,l as p,w as f,s as _,h as b,j as v,k as w,E as h,m as g,n as q,F as y,p as T,q as k}from"./index-51968b70.js";import{F as P}from"./FullLoading-ed22d6d6.js";import{V as x}from"./ValidateText-f1948840.js";import{h as R}from"./useValidate-1451d16f.js";import{S as F,r as V,u as C}from"./xlsx-4e57dfab.js";import{U as N}from"./UploadFiles-f14beecf.js";import"./search-b2488689.js";import"./loading-80f0889b.js";const j={key:0,class:"flex"},I=e({__name:"ReqrName",setup(e){const u=a(),d=t(localStorage.getItem("userId")),m=t({});return l((async()=>{m.value=await u.fetchUserInfo(d.value),u.setReqr(m.value)})),(e,a)=>{const t=s("el-input");return r(R)(r(m))?(o(),n("span",j,[c(t,{modelValue:r(m).name,"onUpdate:modelValue":a[0]||(a[0]=e=>r(m).name=e),disabled:""},null,8,["modelValue"])])):i("v-if",!0)}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/add-new/components/coreTeam/components/ReqrName.vue"]]),S={class:"flex"},W=e({__name:"PgrName",setup(e){const l=t(""),d=t({}),m=e=>{d.value=e,l.value=e.name,a().setPgr(d.value)};return(e,a)=>{const t=s("el-input");return o(),n("span",S,[i(" 顯示 Programmer name 框 "),c(t,{modelValue:r(l),"onUpdate:modelValue":a[0]||(a[0]=e=>u(l)?l.value=e:null),disabled:""},null,8,["modelValue"]),i(" 選擇 Programmer button 與搜尋對話框 "),c(r(F),{dept:"IT",onGetUserInfo:m})])}}},[["__scopeId","data-v-411d3adc"],["__file","C:/Program Files/Workspace/it-req-fe/src/views/add-new/components/coreTeam/components/PgrName.vue"]]),U={class:"ce-title-lg"},A={class:"mt-3 mb-8"},B=e({__name:"index",setup:e=>(e,a)=>{const t=s("el-col"),l=s("el-row"),u=s("el-form-item");return o(),n("div",null,[d("span",U,m(r(p)("Define core team member")),1),d("div",A,[i(" Requester name "),c(u,{label:r(p)("Requester name")},{default:f((()=>[c(l,{class:"form-row-width"},{default:f((()=>[c(t,{span:12},{default:f((()=>[c(I)])),_:1})])),_:1})])),_:1},8,["label"]),i(" IT name "),c(u,{label:r(p)("IT name")},{default:f((()=>[c(l,{class:"form-row-width"},{default:f((()=>[c(t,{span:12},{default:f((()=>[c(W)])),_:1}),c(t,{span:12},{default:f((()=>[c(r(x),{"key-outer":"coreTeam","key-inner":"pgr"})])),_:1})])),_:1})])),_:1},8,["label"])])])}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/add-new/components/coreTeam/index.vue"]]),E=["href"],z=d("br",null,null,-1),G="/application/template.xlsx",O=e({__name:"Notice",setup(e){const a="./"===_.viteBasePath?G:`/it-req-vue3${G}`;return(e,t)=>{const l=s("el-alert");return o(),b(l,{type:"info",title:r(p)("How to fill out this form?"),"show-icon":"",closable:!1},{default:f((()=>[v(m(r(p)("You can download"))+" ",1),d("a",{href:r(a),class:"ce-link",download:"it-req-template"},m(r(p)("template file")),9,E),v(" "+m(r(p)(", then upload it after you complete it")),1),z,v(" "+m(r(p)("Without uploading the template, you can complete these fields then submit it")),1)])),_:1},8,["title"])}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/add-new/components/reqTable/components/Notice.vue"]]),D=e({__name:"PrintReqTable",emits:["get-need-refresh"],setup(e,{emit:l}){const n=t(null),i=a(),u=l,d=e=>{n.value.clearFiles(),e.raw=null,i.setReqTable({reqName:"",stage:"",customer:"",device:"",tester:"",equipment:"",system:"",purpose:""}),u("get-need-refresh",!0)},_=(e,a)=>{n.value.clearFiles();const t=e[0];t.uid=w(),n.value.handleStart(t)},g=e=>{if(!e.raw)return;let a=e.raw,t=new FileReader;t.onloadend=a=>{let l=t.result,s=V(l,{type:"array"}),r=s.SheetNames,o=s.Sheets[r];C.sheet_to_json(o);for(let t=2;t<=9;t++)if(void 0===o[C.encode_cell({r:t,c:3})])return h.error(p("You have not completed the request table yet")),void d(e);i.setReqTable({reqName:o[C.encode_cell({r:2,c:3})].v,stage:o[C.encode_cell({r:3,c:3})].v,customer:o[C.encode_cell({r:4,c:3})].v,device:o[C.encode_cell({r:5,c:3})].v,tester:o[C.encode_cell({r:6,c:3})].v,equipment:o[C.encode_cell({r:7,c:3})].v,system:o[C.encode_cell({r:8,c:3})].v,purpose:o[C.encode_cell({r:9,c:3})].v}),u("get-need-refresh",!0)},t.readAsArrayBuffer(a)};return(e,a)=>{const t=s("el-button"),l=s("el-upload"),i=s("el-form-item");return o(),b(i,{label:r(p)("Upload excel"),class:"block"},{default:f((()=>[c(l,{ref_key:"uploadRef",ref:n,limit:1,"on-remove":d,"auto-upload":!1,"on-exceed":_,"on-change":g,accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"},{trigger:f((()=>[c(t,{type:"primary",plain:""},{default:f((()=>[v(m(`${r(p)("Select file")}...`),1)])),_:1})])),_:1},512)])),_:1},8,["label"])}}},[["__scopeId","data-v-ddcda982"],["__file","C:/Program Files/Workspace/it-req-fe/src/views/add-new/components/reqTable/components/PrintReqTable.vue"]]),L=e({__name:"ManualReqTable",props:{refreshCode:{type:Number,default:0}},setup(e){const i=a(),u=t({}),d=e,m={reqName:{label:"Request name",type:"textarea",rows:"1"},stage:{label:"Stage"},customer:{label:"Customer"},device:{label:"Device"},tester:{label:"Tester"},equipment:{label:"Equipment"},system:{label:"System"},purpose:{label:"Purpose",type:"textarea",rows:"5"}},_=e=>i.setReqTable(u.value);return l((()=>u.value=i.getReqTable)),g(d,(e=>u.value=i.getReqTable)),(e,a)=>{const t=s("el-input"),l=s("el-col"),i=s("el-row"),d=s("el-form-item");return o(),n(y,null,q(m,((e,a)=>c(d,{key:a,label:r(p)(e.label)},{default:f((()=>[c(i,{class:"form-row-width"},{default:f((()=>[c(l,{span:12},{default:f((()=>[c(t,{modelValue:r(u)[a],"onUpdate:modelValue":e=>r(u)[a]=e,type:e.type,rows:e.rows,onChange:_},null,8,["modelValue","onUpdate:modelValue","type","rows"])])),_:2},1024),c(l,{span:12},{default:f((()=>[c(r(x),{"key-outer":"reqTable","key-inner":a},null,8,["key-inner"])])),_:2},1024)])),_:2},1024)])),_:2},1032,["label"]))),64)}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/add-new/components/reqTable/components/ManualReqTable.vue"]]),M=e({__name:"PlantRadios",setup(e){const n=a(),i=t("");return l((()=>i.value=n.getPlant)),g(i,(e=>n.setPlant(i.value))),(e,a)=>{const t=s("el-radio"),l=s("el-radio-group"),n=s("el-col"),d=s("el-row"),m=s("el-form-item");return o(),b(m,{label:r(p)("Plant")},{default:f((()=>[c(d,{class:"form-row-width"},{default:f((()=>[c(n,{span:12},{default:f((()=>[c(l,{modelValue:r(i),"onUpdate:modelValue":a[0]||(a[0]=e=>u(i)?i.value=e:null)},{default:f((()=>[c(t,{label:"P1",size:"small",class:"pl-2"},{default:f((()=>[v("P1")])),_:1}),c(t,{label:"P2",size:"small"},{default:f((()=>[v("P2")])),_:1}),c(t,{label:"P3",size:"small"},{default:f((()=>[v("P3")])),_:1})])),_:1},8,["modelValue"])])),_:1}),c(n,{span:12},{default:f((()=>[c(r(x),{"key-outer":"reqTable","key-inner":"plant"})])),_:1})])),_:1})])),_:1},8,["label"])}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/add-new/components/reqTable/components/PlantRadios.vue"]]),Y={class:"ce-title-lg"},$={class:"p-3"},H={class:"mt-3 mb-8"},J=e({__name:"index",setup(e){const u=a(),_=t(0),b=t([]),v=e=>{e&&_.value++},w=async e=>{b.value=Object.assign([],e),u.setAttachedFiles(b.value)};return l((()=>u.setAttachedFiles(b.value))),(e,a)=>{const t=s("el-form-item");return o(),n("div",null,[d("span",Y,m(r(p)("Fill the request table")),1),i(" 提示 alert "),d("div",$,[c(r(O))]),i(" 填 Request table 可以有兩種方式:  "),d("div",H,[i(" 1. 讀 .xlsx 檔填表 "),c(r(D),{onGetNeedRefresh:v}),i(" 2. 手動輸入各項欄位 "),c(r(L),{"refresh-code":r(_)},null,8,["refresh-code"]),i(" 再來選擇此需求是哪個廠 "),c(r(M)),i(" 上傳附件 "),c(t,{label:r(p)("Attached files")},{default:f((()=>[c(r(N),{size:"small",plain:true,onGetChildren:w})])),_:1},8,["label"])])])}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/add-new/components/reqTable/index.vue"]]),K={class:"add-new-submit-container"},Q=e({__name:"SubmitButton",setup(e){const l=a(),i=T(),u=t(!1),d=async()=>{await l.checkEmpty(!1),await _()},_=async()=>{const e=await l.getValidate;let a=!1;for await(const[t,s]of Object.entries(e))for await(const[e,r]of Object.entries(s)){const t=l.getBenefitType;if(a=""===r,""!==r){switch(e){case"pgr":window.scrollTo({top:0,behavior:"smooth"});break;case"reqName":case"stage":case"customer":{const e="Efficiency"===t?510:560;window.scrollTo({top:e,behavior:"smooth"});break}case"device":case"tester":case"equipment":case"system":case"purpose":case"plant":{const e="Efficiency"===t?840:880;window.scrollTo({top:e,behavior:"smooth"});break}}return}}a&&await b()},b=async()=>{u.value=!0;const e=k.service({lock:!0,text:p("Loading"),background:"rgba(168, 171, 178, 0.3)"});setTimeout((async()=>{await l.submitApplication()?(h.success(p("New a IT-Request successfully")),i.replace({path:"/tables"})):(h.error(p("Failed to new a IT-Request")),i.push({path:"/reload"})),e.close(),u.value=!1}),2e3)};return(e,a)=>{const t=s("el-button");return o(),n("div",K,[c(t,{type:"primary",loading:r(u),onClick:d},{default:f((()=>[v(m(r(p)("Submit")),1)])),_:1},8,["loading"])])}}},[["__scopeId","data-v-20d5f3c4"],["__file","C:/Program Files/Workspace/it-req-fe/src/views/add-new/components/SubmitButton.vue"]]),X={id:"addnew-container",class:"ce-main-container"},Z={key:0},ee=e({__name:"index",setup(e){const a=t(!1);return l((async()=>{a.value=!0,setTimeout((()=>a.value=!1),1500)})),(e,t)=>{const l=s("el-form");return o(),n("div",X,[c(r(P),{loading:r(a)},null,8,["loading"]),r(a)?i("v-if",!0):(o(),n("div",Z,[c(l,{"label-width":"150px"},{default:f((()=>[i(" Core team members "),c(r(B)),i(" Request table "),c(r(J))])),_:1}),i(" Submit button "),c(r(Q))]))])}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/add-new/index.vue"]]);export{ee as default};