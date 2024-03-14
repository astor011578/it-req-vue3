import{_ as e,a,c as l,d as t,e as s,r as n,o,g as r,t as i,b as c,l as u,f as d,w as m,i as p,B as f,A as v,F as g,n as b,j as w,h as _,u as h,C as y,E as T,m as q,I as k,p as x,q as R,H as C}from"./index-0d31eeb0.js";import{F as V}from"./FullLoading-8c88c2fe.js";import{u as P}from"./IT-request-8c7adaff.js";import{F as U}from"./file-97aeb4b1.js";import{V as j}from"./ValidateText-311130b7.js";import"./useValidate-1451d16f.js";const A=e({},[["render",function(e,n){const o=a("font-awesome-icon");return l(),t("div",null,[s(o,{icon:"fa-solid fa-triangle-exclamation"})])}],["__file","C:/Program Files/Workspace/it-req-fe/src/icons/common/exclamationTriangle.vue"]]),I={class:"ce-title-lg"},F={class:"mt-3 mb-8"},N={class:"flex"},O={class:"flex"},S=e({__name:"index",setup(e){const f=n(""),v=n("");return o((()=>{f.value=P().getReqrInfo.name,v.value=P().getPgrInfo.name})),(e,n)=>{const o=a("el-input"),g=a("el-col"),b=a("el-row"),w=a("el-form-item");return l(),t("div",null,[r("span",I,i(c(u)("Core team member")),1),r("div",F,[d(" Requester name "),s(w,{label:c(u)("Requester name")},{default:m((()=>[s(b,{class:"form-row-width"},{default:m((()=>[s(g,{span:12},{default:m((()=>[r("span",N,[s(o,{modelValue:c(f),"onUpdate:modelValue":n[0]||(n[0]=e=>p(f)?f.value=e:null),disabled:""},null,8,["modelValue"])])])),_:1})])),_:1})])),_:1},8,["label"]),d(" IT name "),s(w,{label:c(u)("IT name")},{default:m((()=>[s(b,{class:"form-row-width"},{default:m((()=>[s(g,{span:12},{default:m((()=>[r("span",O,[s(o,{modelValue:c(v),"onUpdate:modelValue":n[1]||(n[1]=e=>p(v)?v.value=e:null),disabled:""},null,8,["modelValue"])])])),_:1})])),_:1})])),_:1},8,["label"])])])}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/review-new/components/coreTeam/index.vue"]]),W={class:"ce-title-lg"},D={class:"mt-3 mb-8"},B={key:0},L={key:0,class:"ce-gray-color-italic"},$=["href","download"],E={class:"inline-flex"},H={key:0},M=["src"],G=e({__name:"index",setup(e){const p=P(),_=f().params.reqNo,h={reqName:{label:"Request name",type:"textarea",rows:"1"},stage:{label:"Stage"},customer:{label:"Customer"},device:{label:"Device"},tester:{label:"Tester"},equipment:{label:"Equipment"},system:{label:"System"},purpose:{label:"Purpose",type:"textarea",rows:"3"},plant:{label:"Plant"}},y="https://35.229.168.239:7000/uploads/attached_files/",T=["jpg","jpeg","gif","png","svg"],q=n({}),k=v((()=>{var e;return null==(e=p.getScope.attachedFiles)?void 0:e.map((e=>{const a=e.originalName.split(".").slice(-1)[0];return{...e,ext:a}}))}));return o((async()=>{const{reqName:e}=p.getBasicInfo,a=p.getScope;for await(const l of Object.keys(h))q.value[l]="reqName"===l?e:a[l]})),(e,n)=>{const o=a("el-input"),p=a("el-col"),f=a("el-row"),v=a("el-form-item");return l(),t("div",null,[r("span",W,i(c(u)("Request table")),1),r("div",D,[(l(),t(g,null,b(h,((e,a)=>s(v,{key:a,label:c(u)(e.label)},{default:m((()=>[s(f,{class:"form-row-width"},{default:m((()=>[s(p,{span:12},{default:m((()=>[s(o,{modelValue:c(q)[a],"onUpdate:modelValue":e=>c(q)[a]=e,type:e.type,rows:e.rows,disabled:""},null,8,["modelValue","onUpdate:modelValue","type","rows"])])),_:2},1024)])),_:2},1024)])),_:2},1032,["label"]))),64)),d(" 上傳附件 "),s(v,{label:c(u)("Attached files")},{default:m((()=>[c(k)?(l(),t("span",B,[c(k).length?d("v-if",!0):(l(),t("span",L,i(c(u)("There is no file attached")),1)),(l(!0),t(g,null,b(c(k),((e,a)=>(l(),t("div",{key:a,class:"attachedFiles-container"},[r("a",{class:"ce-link",href:y+e.fileName,download:c(_)+"_attachment_"+e.originalName,target:"_blank"},[r("div",E,[s(c(U),{class:"mr-1"}),w(" "+i(e.originalName),1)]),-1!==T.indexOf(e.ext.toLowerCase())?(l(),t("div",H,[r("img",{src:`${y}/${e.fileName}`},null,8,M)])):d("v-if",!0)],8,$)])))),128))])):d("v-if",!0)])),_:1},8,["label"])])])}}},[["__scopeId","data-v-567c67a2"],["__file","C:/Program Files/Workspace/it-req-fe/src/views/review-new/components/reqTable/index.vue"]]),Y={class:"mb-0"},z=r("strong",null,"Project:",-1),J=r("strong",null,"OneTime:",-1),K={class:"ce-red-color font-semibold"},Q=e({__name:"Notice",setup:e=>(e,t)=>{const s=a("el-alert");return l(),_(s,{type:"warning",title:c(u)("Definition of request type"),"show-icon":"",closable:!1},{default:m((()=>[r("ul",Y,[r("li",null,[z,r("span",null,i(c(u)("Directly related to mass production")),1)]),r("li",null,[J,r("span",null,[w(i(c(u)("Case which is one-shot, urgent, and"))+" ",1),r("span",K,i(c(u)("not directly related")),1),w(" "+i(c(u)("to mass production")),1)])])])])),_:1},8,["title"])}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/review-new/components/schedule/components/Notice.vue"]]),X={class:"mt-3"},Z=e({__name:"TypeRadios",emits:["get-need-refresh"],setup(e,{emit:i}){const f=h(),v=i,g=n("Project");o((()=>w(g.value)));const b=async e=>{if("OneTime"===e){const e="OneTime request cannot be directly related to mass production, ",a="Continue?";await y.confirm(`${u(e)}${u(a)}`,"Warning",{type:"error",icon:A}).then((()=>{T.info(u("You chose the type OneTime"))})).catch((()=>{T.info(u("Action cancelled")),g.value="Project"}))}w(g.value)},w=e=>{f.setRequestType(e),v("get-need-refresh",!0)};return(e,n)=>{const o=a("el-radio"),i=a("el-radio-group"),f=a("el-form-item");return l(),t("div",null,[d(" radio of type "),r("div",X,[s(f,{label:c(u)("Request type")},{default:m((()=>[s(i,{modelValue:c(g),"onUpdate:modelValue":n[0]||(n[0]=e=>p(g)?g.value=e:null),onChange:b},{default:m((()=>[s(o,{label:"Project"}),s(o,{label:"OneTime"})])),_:1},8,["modelValue"])])),_:1},8,["label"])])])}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/review-new/components/schedule/components/TypeRadios.vue"]]),ee=e({__name:"ScheduleTable",props:{refreshCode:{type:Number,default:0}},setup(e){const r=e,i=h(),d=n(""),p=n({}),f=n({turnOnDate:"",UAT1:"",UAT2:"",release:"",monitor:""});o((async()=>{await v(),y()})),q(r,(async(e,a)=>{await v(),y()}));const v=async()=>{d.value=i.getRequestType,p.value={turnOnDate:{label:"Start coding date"},UAT1:{label:"Test-IT buyoff (UAT1)"},UAT2:{label:"User buyoff (UAT2)"}},"Project"===d.value&&(p.value.release={label:"Release"},p.value.monitor={label:"Monitor 1 lot"})},w=async e=>{for await(const[a,l]of Object.entries(f.value))f.value[a]=k(l);y()},y=()=>{const{turnOnDate:e,UAT1:a,UAT2:l,release:t,monitor:s}=f.value;"OneTime"===d.value?i.setSchedule({turnOnDate:e,UAT1:a,UAT2:l,release:"",monitor:""}):i.setSchedule({turnOnDate:e,UAT1:a,UAT2:l,release:t,monitor:s})};return(e,n)=>{const o=a("el-date-picker"),r=a("el-col"),i=a("el-row"),d=a("el-form-item");return l(),t("div",null,[(l(!0),t(g,null,b(c(p),((e,a)=>(l(),_(d,{key:a,label:e.label},{default:m((()=>[s(i,{class:"form-row-width"},{default:m((()=>[s(r,{span:12},{default:m((()=>[s(o,{modelValue:c(f)[a],"onUpdate:modelValue":e=>c(f)[a]=e,type:"date",placeholder:c(u)("Pick a date"),onChange:w},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1024),s(r,{span:12},{default:m((()=>[s(c(j),{"key-outer":"schedule","key-inner":a},null,8,["key-inner"])])),_:2},1024)])),_:2},1024)])),_:2},1032,["label"])))),128))])}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/review-new/components/schedule/components/ScheduleTable.vue"]]),ae={class:"ce-title-lg"},le={class:"p-3"},te={class:"mb-8"},se=e({__name:"index",setup(e){const a=n(0),o=e=>{e&&a.value++};return(e,n)=>(l(),t("div",null,[r("span",ae,i(c(u)("Fill the schedule")),1),d(" prompt text "),r("div",le,[s(Q)]),s(Z,{onGetNeedRefresh:o}),r("div",te,[s(ee,{"refresh-code":c(a)},null,8,["refresh-code"])])]))}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/review-new/components/schedule/index.vue"]]),ne={class:"submit-container"},oe=e({__name:"SubmitButton",setup(e){const o=f().params.reqNo,r=h(),d=x(),p=n(!1),v=e=>{y.prompt(u("Please leave a reason for rejection or sending back this IT-request"),"Warning",{confirmButtonText:u("Submit"),cancelButtonText:u("Cancel"),dangerouslyUseHTMLString:!0,inputValidator:a=>{const l="Please fill in this field";switch(!0){case"Returned"===e:return!0;case"string"==typeof a&&""===a.trim():case"string"!=typeof a:return u(l);default:return!0}}}).then((async({value:a})=>await b(e,null==a?void 0:a.trim()))).catch((()=>T.info(u("Action cancelled"))))},g=async()=>{await r.checkEmpty(!0),await r.checkIllegalDate();const e=r.getValidate;let a=!1;for await(const[l,t]of Object.entries(e.schedule))if(a=""===t,""!==t)return;a&&await b("Approved")},b=async(e,a)=>{p.value=!0;const l=R.service({lock:!0,text:u("Loading"),background:"rgba(168, 171, 178, 0.3)"});setTimeout((async()=>{await r.reviewApplication(o,e,a)?(T.success(u("Review a IT-Request successfully")),d.replace({path:"/tables"})):(T.error(u("Failed to review a IT-Request")),d.push({path:"/reload"})),l.close(),p.value=!1}),2e3)};return(e,n)=>{const o=a("el-button");return l(),t("div",ne,[s(o,{type:"danger",loading:c(p),onClick:n[0]||(n[0]=e=>v("Rejected"))},{default:m((()=>[w(i(c(u)("Reject")),1)])),_:1},8,["loading"]),s(o,{type:"warning",loading:c(p),onClick:n[1]||(n[1]=e=>v("Returned"))},{default:m((()=>[w(i(c(u)("Return")),1)])),_:1},8,["loading"]),s(o,{type:"success",loading:c(p),onClick:g},{default:m((()=>[w(i(c(u)("Approve")),1)])),_:1},8,["loading"])])}}},[["__scopeId","data-v-32f79399"],["__file","C:/Program Files/Workspace/it-req-fe/src/views/review-new/components/SubmitButton.vue"]]),re={id:"addnew-container",class:"ce-main-container"},ie={key:0},ce=e({__name:"index",setup(e){const r=x(),i=P(),u=f().params.reqNo,p=n(!1);return o((async()=>{p.value=!0,i.setReqNo(u),await i.getITReqInfo();const e="Reviewing"===i.getReqStatus,a=C().userId,l=i.getPgrInfo.id===a,t=!(!e||!l);p.value=!1,t||r.push({path:"/401",replace:!0})})),(e,n)=>{const o=a("el-form");return l(),t("div",re,[s(c(V),{loading:c(p)},null,8,["loading"]),c(p)?d("v-if",!0):(l(),t("div",ie,[s(o,{"label-width":"150px"},{default:m((()=>[d(" Core team members "),s(c(S)),d(" Request table "),s(c(G)),d(" Type & schedule "),s(c(se))])),_:1}),d(" Submit button "),s(c(oe))]))])}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/review-new/index.vue"]]);export{ce as default};
