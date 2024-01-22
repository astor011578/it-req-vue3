import{_ as e,a as l,c as a,d as t,e as i,r as n,p as o,A as s,o as c,m as r,f as d,w as u,b as p,l as f,h as m,j as v,t as b,H as g,F as y,n as _,g as w,i as h,$ as k,E as R,B as T,a0 as q,a1 as A,a2 as N,a3 as j,O as C,a4 as P,a5 as U,s as B,a6 as F,C as x,D as I}from"./index-4ed6fded.js";import{F as S}from"./FullLoading-c2099cc3.js";import{u as D}from"./IT-request-2ec1ddb2.js";import{P as O}from"./pen-d539dfc2.js";import{T as V}from"./TopTitle-0bc76145.js";import{F as $}from"./file-cffd5871.js";import{h as E,v as W}from"./useValidate-1451d16f.js";import{U as z}from"./UploadFiles-933c70b4.js";import"./loading-fcb3ebe6.js";const K=e({},[["render",function(e,n){const o=l("font-awesome-icon");return a(),t("div",null,[i(o,{icon:"fa-solid fa-check"})])}],["__file","C:/Program Files/Workspace/it-req-fe/src/icons/common/check.vue"]]);const L=e({},[["render",function(e,n){const o=l("font-awesome-icon");return a(),t("div",null,[i(o,{icon:"fa-solid fa-xmark"})])}],["__file","C:/Program Files/Workspace/it-req-fe/src/icons/common/cancel.vue"]]);const M=e({},[["render",function(e,n){const o=l("font-awesome-icon");return a(),t("div",null,[i(o,{icon:"fa-solid fa-arrow-up-from-bracket"})])}],["__file","C:/Program Files/Workspace/it-req-fe/src/icons/common/upload.vue"]]);const Y=e({},[["render",function(e,n){const o=l("font-awesome-icon");return a(),t("div",null,[i(o,{icon:"fa-solid fa-calendar-days"})])}],["__file","C:/Program Files/Workspace/it-req-fe/src/icons/common/calendar.vue"]]),G={class:"mr-3"},H=["href","download"],J={class:"ce-dialog-footer-btn"},Q=e({__name:"ApproveBtn",props:{icon:{type:Object,required:!0},tip:{type:String,required:!0}},setup(e){const q=e,A=n({}),N=n(!1),j=n(""),C=o(),P=s().params.reqNo,U=`https://10.185.137.71:7000/uploads/${P}`,B=n({}),F=n({}),x=n(!1),I=n(!1),S=async()=>{F.value.reviewerReply.result="Approved",x.value=!0,setTimeout((async()=>{await k(P,F.value).then((()=>{R.success(f("Approve evidence successfully")),C.push("/reload")}))}),2e3)},O=async()=>{T.prompt(f("Please leave a reason for rejection"),f("Reject evidence"),{confirmButtonText:f("Submit"),cancelButtonText:f("Cancel"),inputPlaceholder:f("Please leave a reason for rejection"),inputType:"textArea",buttonSize:"small"}).then((({value:e,action:l})=>{F.value.reviewerReply.result="Rejected",F.value.reviewerReply.comments=e,x.value=!0,setTimeout((async()=>{await k(P,F.value).then((()=>{x.value=!1,R.success(f("Reject evidence successfully")),C.push("/reload")}))}),2e3)})).catch((()=>{R({type:"info",message:f("Action cancelled")})}))};return c((()=>A.value=D())),r(A,(async()=>{N.value=await A.value.getPermission.approve,j.value=await A.value.getSimpleStep;const e=await A.value.getEvidence,l=new Date;j.value.length&&E(e)&&"Done"!==j.value&&"Cancel"!==j.value&&(B.value={updateDate:e[j.value].updateDate,uploadFiles:Object.assign({},e[j.value].uploadFiles)},F.value={step:j.value,reviewerReply:{reviewDate:l}})})),(e,n)=>{const o=l("el-button"),s=l("el-tooltip"),c=l("el-descriptions-item"),r=l("el-descriptions"),k=l("el-dialog");return a(),t("span",G,[d(" Approve button "),i(s,{content:p(f)(q.tip),placement:"bottom",effect:"dark"},{default:u((()=>[i(o,{icon:q.icon,plain:"",circle:"",type:"success",disabled:!p(N),onClick:n[0]||(n[0]=e=>I.value=!0)},null,8,["icon","disabled"])])),_:1},8,["content"]),d(" Approve evidence dialog "),i(k,{modelValue:p(I),"onUpdate:modelValue":n[1]||(n[1]=e=>h(I)?I.value=e:null),title:p(f)("Approve evidence"),width:"500px"},{default:u((()=>[p(E)(p(B))?(a(),m(r,{key:0,id:"uApprove-table",column:"1",border:""},{default:u((()=>[i(c,{label:p(f)("Upload date")},{default:u((()=>[v(b(p(g)(p(B).updateDate)),1)])),_:1},8,["label"]),i(c,{label:p(f)("Evidence")},{default:u((()=>[(a(!0),t(y,null,_(p(B).uploadFiles,((e,l)=>(a(),t("div",{key:l},[w("a",{class:"ce-link",target:"_blank",href:`${U}/${p(j)}/${e.fileName}`,download:e.originalName},[i(p($),{class:"mr-1"}),v(" "+b(e.originalName),1)],8,H)])))),128))])),_:1},8,["label"])])),_:1})):d("v-if",!0),d(" Submit button (Reject / Approve) "),w("div",J,[i(o,{loading:p(x),onClick:O},{default:u((()=>[v(b(p(f)("Reject")),1)])),_:1},8,["loading"]),i(o,{type:"primary",loading:p(x),onClick:S},{default:u((()=>[v(b(p(f)("Approve")),1)])),_:1},8,["loading"])])])),_:1},8,["modelValue","title"])])}}},[["__scopeId","data-v-04e068cc"],["__file","C:/Program Files/Workspace/it-req-fe/src/views/detail/components/fnBtns/ApproveBtn.vue"]]),X={class:"mr-1"},Z={class:"ce-dialog-footer-btn"},ee=e({__name:"CancelBtn",props:{icon:{type:Object,required:!0},tip:{type:String,required:!0}},setup(e){const m=n({}),y=n(!1),_=s().params.reqNo,k=n(!1),A=o(),N=n(!1),j=e,C=n({applyDate:new Date,applicantName:"",applicantId:"",reason:""}),P=async()=>{T.confirm(f("Are you sure to cancel this request? This action cannot be undone"),"",{confirmButtonText:f("OK"),cancelButtonText:f("Cancel"),type:"warning"}).then((async()=>{k.value=!0,await q(_,C.value).then((e=>{if(k.value=!1,200===e.code)R.success(f("Apply for cancellation successfully"));else R.error(f("Failed to apply for cancellation"));A.push("/reload")}))})).catch((()=>{R.info(f("Action cancelled"))}))};return c((()=>m.value=D())),r(m,(async e=>{const l=await m.value.getApplicant;y.value=await m.value.getPermission.cancel,E(l)&&(C.value.applicantName=l[0],C.value.applicantId=l[1])})),(e,n)=>{const o=l("el-button"),s=l("el-tooltip"),c=l("el-descriptions-item"),r=l("el-input"),m=l("el-descriptions"),_=l("el-dialog");return a(),t("span",X,[d(" Cancel button "),i(s,{content:p(f)(j.tip),placement:"bottom",effect:"dark"},{default:u((()=>[i(o,{icon:j.icon,plain:"",circle:"",type:"danger",disabled:!p(y),onClick:n[0]||(n[0]=e=>N.value=!0)},null,8,["icon","disabled"])])),_:1},8,["content"]),i(_,{modelValue:p(N),"onUpdate:modelValue":n[2]||(n[2]=e=>h(N)?N.value=e:null),title:p(f)("Cancel this IT-request"),width:"450px"},{default:u((()=>[i(m,{id:"cancellation-table",column:"1",border:""},{default:u((()=>[i(c,{label:p(f)("Application date")},{default:u((()=>[v(b(p(g)(p(C).applyDate)),1)])),_:1},8,["label"]),i(c,{label:p(f)("Applicant")},{default:u((()=>[v(b(p(C).applicantName),1)])),_:1},8,["label"]),i(c,{label:p(f)("Reason")},{default:u((()=>[i(r,{modelValue:p(C).reason,"onUpdate:modelValue":n[1]||(n[1]=e=>p(C).reason=e),type:"textarea",placeholder:p(f)("Please leave the reason for cancellation here")},null,8,["modelValue","placeholder"])])),_:1},8,["label"])])),_:1}),w("div",Z,[i(o,{type:"primary",loading:p(k),onClick:P},{default:u((()=>[v(b(p(f)("Submit")),1)])),_:1},8,["loading"])])])),_:1},8,["modelValue","title"])])}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/detail/components/fnBtns/CancelBtn.vue"]]),le={class:"mr-3"},ae={class:"ce-dialog-footer-btn"},te=e({__name:"EvidenceBtn",props:{icon:{type:Object,required:!0},tip:{type:String,required:!0}},setup(e){const m=e,g=n({}),y=o(),_=n(!1),k=s().params.reqNo,T=n(""),q=n(!1),C=A(""),P=n([]),U=n(!1),B=async e=>{P.value=Object.assign([],e)},F=async()=>{q.value=!0;let e=[];if(!P.value.length)return R.info(f("No files selected")),q.value=!1;{const l=new FormData;for await(const e of P.value)l.append("files",e.raw);const a=await N(l,k,T.value);e=Object.assign([],a.data)}if(e.length){let l=[];e.forEach((e=>{const{fileName:a,originalName:t}=e;l.push({fileName:a,originalName:t})}));const a={step:T.value,updateDate:new Date,uploadFiles:l};await j(k,a).then((()=>{setTimeout((()=>{R.success(f("Upload to server successfully")),y.push("/reload")}),1500)})).catch((()=>{R.error(f("Failed to upload files")),q.value=!1}))}else q.value=!1};return c((()=>g.value=D())),r(g,(async e=>{_.value=await g.value.getPermission.evidence,T.value=await g.value.getSimpleStep,C.value=await g.value.getReqType})),(e,n)=>{const o=l("el-button"),s=l("el-tooltip"),c=l("el-dialog");return a(),t("span",le,[d(" Upload evidence button "),i(s,{content:p(f)(m.tip),placement:"bottom",effect:"dark"},{default:u((()=>[i(o,{icon:m.icon,plain:"",circle:"",type:"primary",disabled:!p(_),onClick:n[0]||(n[0]=e=>U.value=!0)},null,8,["icon","disabled"])])),_:1},8,["content"]),d(" Upload evidence dialog "),i(c,{modelValue:p(U),"onUpdate:modelValue":n[1]||(n[1]=e=>h(U)?U.value=e:null),title:p(f)("Upload evidence"),width:"400px"},{default:u((()=>[i(p(z),{size:"large",plain:false,step:p(T),onGetChildren:B},null,8,["step"]),w("div",ae,[i(o,{type:"primary",disabled:p(q),onClick:F},{default:u((()=>[v(b(p(f)("Upload to server")),1)])),_:1},8,["disabled"])])])),_:1},8,["modelValue","title"])])}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/detail/components/fnBtns/EvidenceBtn.vue"]]),ie={class:"mr-3"},ne={key:0,class:"ce-validate p-1"},oe={class:"ce-dialog-footer-btn"},se=e({__name:"PostponeBtn",props:{icon:{type:Object,required:!0},tip:{type:String,required:!0}},setup(e){const m=n({}),y=n(!1),_=o(),k=s().params.reqNo,T=D().getReqType,q=n(!1),A=n(!1),N=n([]);let j=C({UAT1:null,UAT2:null,release:null,monitor:null});const U=e;c((()=>m.value=D())),r(m,(async e=>{const l=await m.value.getSchedule;if(y.value=await m.value.getPermission.postpone,E(l)){for(;N.value.length;)N.value.pop();for(const[e,a]of Object.entries(l)){if(("release"===e||"monitor"===e)&&!l[e])break;N.value.push({stage:e,title:a.title,exp:a.exp.new?g(a.exp.new):"undefined",rescheduling:a.exp.old.length,state:a.state}),j[e]=g(a.exp.new)}}}));let B=C({UAT1:"",UAT2:"",release:"",monitor:""});const F={Proceeding:{disabled:!1,placeholder:"Pick a date"},Reviewing:{disabled:!1,placeholder:"Pick a date"},Cancel:{disabled:!0,placeholder:"Item has been closed"},Done:{disabled:!0,placeholder:"Item has been closed"},Rejected:{disabled:!1,placeholder:"Pick a date"}},x=async()=>{if(j.UAT1||j.UAT2||j.release||j.monitor){let e={UAT1:g(j.UAT1),UAT2:g(j.UAT2),release:g(j.release),monitor:g(j.monitor)};if(B.UAT2=W(e.UAT1,e.UAT2,"UAT1","UAT2"),B.release="Project"===T?W(e.UAT2,e.release,"UAT2","Release"):"",B.monitor="Project"===T?W(e.release,e.monitor,"release","Monitor 1 lot"):"",!B.UAT2.length&&!B.release.length&&!B.monitor.length){const l=m.value.getReqType,a=Object.assign({type:l},e);q.value=!0,setTimeout((async()=>{await P(k,a).then((e=>{if(q.value=!1,200===e.code)R.success(f("Reschedule successfully")),_.push("/reload");else R.error(f("Failed to reschedule")),j={UAT1:"",UAT2:"",release:"",monitor:""}}))}),2e3)}}else R.warning(f("Please fill in this field")),B={UAT1:"",UAT2:"",release:"",monitor:""}};return(e,n)=>{const o=l("el-button"),s=l("el-tooltip"),c=l("el-table-column"),r=l("el-date-picker"),m=l("el-table"),g=l("el-dialog");return a(),t("span",ie,[i(s,{content:p(f)(U.tip),placement:"bottom",effect:"dark"},{default:u((()=>[i(o,{icon:U.icon,plain:"",circle:"",type:"warning",disabled:!p(y),onClick:n[0]||(n[0]=e=>A.value=!0)},null,8,["icon","disabled"])])),_:1},8,["content"]),i(g,{modelValue:p(A),"onUpdate:modelValue":n[1]||(n[1]=e=>h(A)?A.value=e:null),title:p(f)("Re-schedule"),width:"500"},{default:u((()=>[i(m,{id:"postpone-table",data:p(N)},{default:u((()=>[i(c,{align:"center",prop:"title",width:"135"}),i(c,{align:"center",prop:"exp",label:p(f)("Expect date"),width:"95"},null,8,["label"]),i(c,{align:"center",prop:"rescheduling",label:p(f)("Rescheduling times"),width:"100"},null,8,["label"]),i(c,{align:"center",label:`${p(f)("Postpone to")}...`},{default:u((e=>[i(r,{modelValue:p(j)[e.row.stage],"onUpdate:modelValue":l=>p(j)[e.row.stage]=l,type:"date",size:"small",format:"YYYY/MM/DD",placeholder:p(f)(F[e.row.state].placeholder),disabled:F[e.row.state].disabled,clearable:!1,editable:!1},null,8,["modelValue","onUpdate:modelValue","placeholder","disabled"]),""!==p(B)[e.row.stage]?(a(),t("div",ne,b(p(f)(p(B)[e.row.stage])),1)):d("v-if",!0)])),_:1},8,["label"])])),_:1},8,["data"]),w("div",oe,[i(o,{type:"primary",loading:p(q),onClick:x},{default:u((()=>[v(b(p(f)("Submit")),1)])),_:1},8,["loading"])])])),_:1},8,["modelValue","title"])])}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/detail/components/fnBtns/PostponeBtn.vue"]]),ce={class:"mr-3"},re=e({__name:"RevNewBtn",props:{icon:{type:Object,required:!0},tip:{type:String,required:!0}},setup(e){const m=e,v=n({}),b=n(!1),g=o(),y=s().params.reqNo,_=()=>g.push({path:`/review/new/${y}`,replace:!0});return c((()=>v.value=D())),r(v,(async()=>b.value=await v.value.getPermission.revNew)),(e,n)=>{const o=l("el-button"),s=l("el-tooltip");return a(),t("span",ce,[d(" Review new request button "),i(s,{content:p(f)(m.tip),placement:"bottom",effect:"dark"},{default:u((()=>[i(o,{icon:m.icon,plain:"",circle:"",type:"success",disabled:!p(b),onClick:_},null,8,["icon","disabled"])])),_:1},8,["content"])])}}},[["__scopeId","data-v-2a158b24"],["__file","C:/Program Files/Workspace/it-req-fe/src/views/detail/components/fnBtns/RevNewBtn.vue"]]),de={class:"mr-3"},ue=e({__name:"EditNewBtn",props:{icon:{type:Object,required:!0},tip:{type:String,required:!0}},setup(e){const m=e,v=n({}),b=n(!1),g=o(),y=s().params.reqNo,_=()=>g.push({path:`/edit/${y}`,replace:!0});return c((()=>v.value=D())),r(v,(async e=>b.value=await v.value.getPermission.editNew)),(e,n)=>{const o=l("el-button"),s=l("el-tooltip");return a(),t("span",de,[d(" Edit new request button "),i(s,{content:p(f)(m.tip),placement:"bottom",effect:"dark"},{default:u((()=>[i(o,{icon:m.icon,plain:"",circle:"",type:"primary",disabled:!p(b),onClick:_},null,8,["icon","disabled"])])),_:1},8,["content"])])}}},[["__scopeId","data-v-42a2b791"],["__file","C:/Program Files/Workspace/it-req-fe/src/views/detail/components/fnBtns/EditNewBtn.vue"]]),pe=e({__name:"TopButtons",setup(e){const l=`IT-Request #${s().params.reqNo}`,t=D().getReqStatus,n=["Reviewing","Rejected","Returned"],o={tip:{approve:"Approve evidence",upload:"Upload evidence",postpone:"Reschedule",cancel:"Cancel this IT-Request",revNew:"Approve this IT-Request",editNew:"Edit this IT-Request"},icon:{approve:K,upload:M,postpone:Y,cancel:L,revNew:K,editNew:O}};return(e,s)=>(a(),m(p(V),null,U({title:u((()=>[v(b(l))])),_:2},[n.includes(p(t))?{name:"align-right",fn:u((()=>[i(p(re),{icon:o.icon.revNew,tip:o.tip.revNew},null,8,["icon","tip"]),i(p(ue),{icon:o.icon.editNew,tip:o.tip.editNew},null,8,["icon","tip"])])),key:"1"}:{name:"align-right",fn:u((()=>[i(p(Q),{icon:o.icon.approve,tip:o.tip.approve},null,8,["icon","tip"]),i(p(te),{icon:o.icon.upload,tip:o.tip.upload},null,8,["icon","tip"]),i(p(se),{icon:o.icon.postpone,tip:o.tip.postpone},null,8,["icon","tip"]),i(p(ee),{icon:o.icon.cancel,tip:o.tip.cancel},null,8,["icon","tip"])])),key:"0"}]),1024))}},[["__scopeId","data-v-98d658fe"],["__file","C:/Program Files/Workspace/it-req-fe/src/views/detail/components/TopButtons.vue"]]),fe={class:"detail-collapse"},me={key:0,class:"m-2 multiple-el-descriptions"},ve={key:1,class:"ce-gray-color-italic"},be={key:0},ge={key:1,class:"ce-gray-color-italic"},ye={key:0,class:"ce-gray-color-italic"},_e={key:1},we=e({__name:"BasicInfoBlock",setup(e){const o=D(),s=n({}),r=C({Done:"success",Cancel:"info",Proceeding:"primary",Rejected:"danger",Returned:"warning",Reviewing:"warning"});return c((()=>s.value=o.getBasicInfo)),(e,n)=>{const o=l("font-awesome-icon"),c=l("el-descriptions-item"),_=l("el-tag"),h=l("el-descriptions"),k=l("el-collapse-item");return a(),t(y,null,[d(" basic information block "),i(k,{name:"1"},{title:u((()=>[w("div",fe,[i(o,{icon:"fa-solid fa-thumbtack"}),v(" "+b(p(f)("Basic Info")),1)])])),default:u((()=>[p(E)(p(s))?(a(),t("div",me,[i(h,{column:"2",border:""},{default:u((()=>[i(c,{label:p(f)("IT #")},{default:u((()=>[v(b(p(s).reqNo),1)])),_:1},8,["label"]),i(c,{label:p(f)("Type")},{default:u((()=>[p(s).type?(a(),m(_,{key:0,size:"small"},{default:u((()=>[v(b(p(s).type),1)])),_:1})):(a(),t("span",ve,"N/A"))])),_:1},8,["label"]),i(c,{label:p(f)("Request name")},{default:u((()=>[v(b(p(s).reqName),1)])),_:1},8,["label"]),i(c,{label:p(f)("Status")},{default:u((()=>[i(_,{size:"small",type:p(r)[p(s).status]},{default:u((()=>[v(b(p(s).status),1)])),_:1},8,["type"])])),_:1},8,["label"]),i(c,{label:p(f)("Requester")},{default:u((()=>[v(b(p(s).reqrName),1)])),_:1},8,["label"]),i(c,{label:p(f)("IT")},{default:u((()=>[v(b(p(s).pgrName),1)])),_:1},8,["label"]),i(c,{label:p(f)("Issue date")},{default:u((()=>[v(b(p(g)(p(s).issueDate)),1)])),_:1},8,["label"]),i(c,{label:p(f)("Review date")},{default:u((()=>[p(s).review.date?(a(),t("span",be,b(p(g)(p(s).review.date)),1)):(a(),t("span",ge,"N/A"))])),_:1},8,["label"]),i(c,{label:p(f)("Lead time (day)")},{default:u((()=>[p(s).leadTime<0?(a(),t("span",ye,"N/A")):(a(),t("span",_e,b(p(s).leadTime),1))])),_:1},8,["label"]),i(c,{label:p(f)("Review duration (day)")},{default:u((()=>[v(b(p(s).reviewDuration),1)])),_:1},8,["label"])])),_:1}),i(h,{column:"1",border:""},{default:u((()=>["Rejected"===p(s).status||"Returned"===p(s).status?(a(),m(c,{key:0,label:p(f)("Review comments")},{default:u((()=>[v(b(p(s).approveComments),1)])),_:1},8,["label"])):d("v-if",!0)])),_:1})])):d("v-if",!0)])),_:1})],2112)}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/detail/components/BasicInfoBlock.vue"]]),he={class:"detail-collapse"},ke={key:0,class:"m-2 multiple-el-descriptions"},Re={key:0,class:"ce-gray-color-italic"},Te={key:1},qe=["href","download"],Ae={class:"inline-flex"},Ne={key:0},je=["src"],Ce=e({__name:"ScopeBlock",setup(e){const o=D(),s=o.getReqNo,m="https://10.185.137.71:7000/uploads/attached_files/",g=["jpg","jpeg","gif","png","svg"],h=n({}),k=C([]);return c((()=>h.value=o.getScope)),r(h,(()=>{if(E(h.value))for(const[e,l]of Object.entries(h.value.attachedFiles)){const e=Object.assign({},l),{originalName:a}=l;let t=a.split(".").slice(-1)[0];e.ext=t,k.push(e)}})),(e,n)=>{const o=l("font-awesome-icon"),c=l("el-descriptions-item"),r=l("el-descriptions"),R=l("el-collapse-item");return a(),t(y,null,[d(" Scope block "),i(R,{name:"3"},{title:u((()=>[w("div",he,[i(o,{icon:"fa-solid fa-thumbtack"}),v(" "+b(p(f)("Scope")),1)])])),default:u((()=>[p(E)(p(h))?(a(),t("div",ke,[i(r,{column:"2",border:""},{default:u((()=>[i(c,{label:p(f)("Plant")},{default:u((()=>[v(b(p(h).plant),1)])),_:1},8,["label"]),i(c,{label:p(f)("Device")},{default:u((()=>[v(b(p(h).device),1)])),_:1},8,["label"]),i(c,{label:p(f)("Stage")},{default:u((()=>[v(b(p(h).stage),1)])),_:1},8,["label"]),i(c,{label:p(f)("Tester")},{default:u((()=>[v(b(p(h).tester),1)])),_:1},8,["label"]),i(c,{label:p(f)("Customer")},{default:u((()=>[v(b(p(h).customer),1)])),_:1},8,["label"]),i(c,{label:p(f)("Equipment")},{default:u((()=>[v(b(p(h).equipment),1)])),_:1},8,["label"]),i(c,{label:p(f)("System")},{default:u((()=>[v(b(p(h).system),1)])),_:1},8,["label"])])),_:1}),i(r,{column:"1",border:""},{default:u((()=>[i(c,{label:p(f)("Purpose")},{default:u((()=>[v(b(p(h).purpose),1)])),_:1},8,["label"]),i(c,{label:p(f)("Attached files")},{default:u((()=>[0===p(k).length?(a(),t("span",Re,b(p(f)("There is no file attached")),1)):(a(),t("span",Te,[(a(!0),t(y,null,_(p(k),((e,l)=>(a(),t("div",{key:l,class:"attachedFiles-container"},[w("a",{class:"ce-link",href:m+e.fileName,download:p(s)+"_attachment_"+e.originalName,target:"_blank"},[w("div",Ae,[i(p($),{class:"mr-1"}),v(" "+b(e.originalName),1)]),-1!==g.indexOf(e.ext.toLowerCase())?(a(),t("div",Ne,[w("img",{src:`${m}/${e.fileName}`},null,8,je)])):d("v-if",!0)],8,qe)])))),128))]))])),_:1},8,["label"])])),_:1})])):d("v-if",!0)])),_:1})],2112)}}},[["__scopeId","data-v-5e75f9a4"],["__file","C:/Program Files/Workspace/it-req-fe/src/views/detail/components/ScopeBlock.vue"]]),Pe=e=>(x("data-v-3c7ba831"),e=e(),I(),e),Ue={class:"detail-collapse"},Be={key:0,class:"schedule-container"},Fe=Pe((()=>w("h4",null,"IT start coding",-1))),xe=Pe((()=>w("br",null,null,-1))),Ie={class:"mt-2"},Se={class:"schedule-details rounded p-2 m-2"},De={class:"ce-blue-color ce-text-bold"},Oe=Pe((()=>w("br",null,null,-1))),Ve={class:"mt-2"},$e={class:"schedule-details"},Ee={key:0,class:"ce-blue-color ce-text-bold"},We={key:1},ze={class:"schedule-details"},Ke={class:"ce-blue-color ce-text-bold"},Le={class:"schedule-details"},Me=Pe((()=>w("div",null,"KPI:",-1))),Ye=Pe((()=>w("h4",null,"Done",-1))),Ge=e({__name:"ScheduleBlock",setup(e){const o={Proceeding:{size:"large",type:"primary",icon:F},Done:{size:"normal",type:"success",icon:K},Cancel:{size:"normal",color:"#999",icon:L},Reviewing:{size:"large",type:"warning",icon:F},Rejected:{size:"large",type:"warning",icon:F}},s=D(),r=n({}),h=n({});c((()=>{h.value=s.getTurnOnDate;const e=s.getSchedule;for(const[l,a]of Object.entries(e)){if(("release"===l||"monitor"===l)&&!e[l])break;r.value[l]=e[l]}}));const k=e=>parseInt(e,10)>0;return(e,n)=>{const s=l("font-awesome-icon"),c=l("el-card"),R=l("el-timeline-item"),T=l("el-timeline"),q=l("el-collapse-item");return a(),t(y,null,[d(" schedule block "),i(q,{name:"4"},{title:u((()=>[w("div",Ue,[i(s,{icon:"fa-solid fa-thumbtack"}),v(" "+b(p(f)("Schedule")),1)])])),default:u((()=>[p(E)(p(r))?(a(),t("div",Be,[i(T,null,{default:u((()=>[d(" Turn on date "),i(R,{center:""},{default:u((()=>[i(c,null,{default:u((()=>[w("span",null,[Fe,w("h5",null,"("+b(p(f)("Owner"))+": "+b(p(h).owner)+")",1)]),xe,w("span",Ie,[w("div",Se,[w("div",null,b(p(f)("Turn on date"))+":",1),w("div",De,b(p(g)(p(h).date)),1)])])])),_:1})])),_:1}),d(" UAT1 ~ Monitor 1 lot "),(a(!0),t(y,null,_(p(r),((e,l)=>(a(),m(R,{key:l,size:o[e.state].size,icon:o[e.state].icon,type:o[e.state].type,color:o[e.state].color,center:""},{default:u((()=>[i(c,null,{default:u((()=>[w("span",null,[w("h4",null,b(e.title),1),w("h5",null,"("+b(p(f)("Owner"))+": "+b(e.owner)+")",1)]),Oe,w("span",Ve,[w("div",$e,[w("div",null,b(p(f)("Actual date"))+":",1),e.act?(a(),t("div",Ee,b(p(g)(e.act)),1)):(a(),t("div",We,b("Rejected"===e.state?`${p(f)("Rejected,")}\n${p(f)("re-uploading")}`:e.state),1))]),w("div",ze,[w("div",null,b(p(f)("Expect date"))+":",1),w("div",null,[(a(!0),t(y,null,_(e.exp.old,(e=>(a(),t("div",{key:e,class:"ce-line-through"},b(p(g)(e)),1)))),128)),w("div",Ke,b(p(g)(e.exp.new)),1)])]),w("div",Le,[Me,w("div",null,[v(b(p(f)("Rescheduling"))+": ",1),w("span",{class:B(k(e.KPI.reschedule)?"ce-red-color ce-text-bold":"")},b(e.KPI.reschedule),3)]),w("div",null,[v(b(p(f)("Delay"))+": ",1),w("span",{class:B(k(e.KPI.delay)?"ce-red-color ce-text-bold":"")},b(e.KPI.delay),3)])])])])),_:2},1024)])),_:2},1032,["size","icon","type","color"])))),128)),d(" Done "),i(R,{center:""},{default:u((()=>[i(c,null,{default:u((()=>[Ye])),_:1})])),_:1})])),_:1})])):d("v-if",!0)])),_:1})],2112)}}},[["__scopeId","data-v-3c7ba831"],["__file","C:/Program Files/Workspace/it-req-fe/src/views/detail/components/ScheduleBlock.vue"]]),He={class:"detail-collapse"},Je={key:0},Qe={key:0,class:"ce-gray-color-italic"},Xe={key:1},Ze=["href","download"],el={key:0},ll=["src"],al=e({__name:"EvidenceBlock",setup(e){const o=D(),s=o.getReqNo,r=n({}),h=`https://10.185.137.71:7000/uploads/${s}`,k=["jpg","jpeg","gif","png","svg"];return c((()=>{const e=o.getReqType,l=o.getEvidence;r.value=Object.assign({},l);for(const[a,t]of Object.entries(l)){const{uploadFiles:l,uploadReply:i}=t;if(("release"===a||"monitor"===a)&&"OneTime"===e)break;if(l.length&&l.forEach(((e,l)=>{let t=e.originalName.split(".").slice(-1)[0];r.value[a].uploadFiles[l].ext=t})),i)switch(i){case"Reviewing":r.value[a].state="Pending approval",r.value[a].class="ce-gray-color-italic";break;case"Rejected":r.value[a].state="Rejected, re-uploading",r.value[a].class="ce-gray-color-italic";break;case"Approved":r.value[a].state="Approved"}else r.value[a].state="Not uploaded yet",r.value[a].class="ce-gray-color-italic";switch(a){case"UAT1":r.value[a].title="IT buyoff (UAT1)";break;case"UAT2":r.value[a].title="User buyoff (UAT2)";break;case"release":r.value[a].title="Release";break;case"monitor":r.value[a].title="Monitor 1 lot"}}})),(e,n)=>{const o=l("font-awesome-icon"),s=l("el-tag"),c=l("el-descriptions-item"),R=l("el-descriptions"),T=l("el-collapse-item");return a(),t(y,null,[d(" evidence block "),i(T,{name:"5"},{title:u((()=>[w("div",He,[i(o,{icon:"fa-solid fa-thumbtack"}),v(" "+b(p(f)("Evidence")),1)])])),default:u((()=>[p(E)(p(r))?(a(),t("div",Je,[(a(!0),t(y,null,_(p(r),((e,l)=>(a(),m(R,{key:l,column:"1",border:""},U({default:u((()=>[e.state?(a(),m(c,{key:0,label:p(f)("Status")},{default:u((()=>["Approved"===e.state?(a(),m(s,{key:0,type:"primary"},{default:u((()=>[v(b(p(f)("Approved")),1)])),_:1})):(a(),t("span",{key:1,class:B(e.class)},b(p(f)(e.state)),3))])),_:2},1032,["label"])):d("v-if",!0),"Rejected"===e.uploadReply?(a(),m(c,{key:1,label:p(f)("Rejection message")},{default:u((()=>[e.comments?(a(),t("span",Xe,b(e.comments),1)):(a(),t("span",Qe,b(p(f)("There is no comments")),1))])),_:2},1032,["label"])):d("v-if",!0),e.uploadReply&&"Reviewing"!==e.uploadReply?(a(),m(c,{key:2,label:p(f)("Last review date")},{default:u((()=>[v(b(p(g)(e.reviewDate)),1)])),_:2},1032,["label"])):d("v-if",!0),e.uploadFiles.length?(a(),m(c,{key:3,label:p(f)("Last update date")},{default:u((()=>[v(b(p(g)(e.updateDate)),1)])),_:2},1032,["label"])):d("v-if",!0),e.uploadFiles.length?(a(),m(c,{key:4,label:p(f)("Evidence")},{default:u((()=>[(a(!0),t(y,null,_(e.uploadFiles,((e,n)=>(a(),t("div",{key:n,class:"evidence-container"},[w("a",{class:"ce-link",href:`${h}/${l}/${e.fileName}`,download:e.originalName,target:"_blank"},[w("div",null,[i(p($),{class:"mr-1"}),v(" "+b(e.originalName),1)]),-1!==k.indexOf(e.ext.toLowerCase())?(a(),t("div",el,[w("img",{src:`${h}/${l}/${e.fileName}`},null,8,ll)])):d("v-if",!0)],8,Ze)])))),128))])),_:2},1032,["label"])):d("v-if",!0)])),_:2},[e.title?{name:"title",fn:u((()=>[w("div",null,[i(o,{icon:"fa-solid fa-paperclip"}),v(" "+b(e.title),1)])])),key:"0"}:void 0]),1024)))),128))])):d("v-if",!0)])),_:1})],2112)}}},[["__scopeId","data-v-f4c0571e"],["__file","C:/Program Files/Workspace/it-req-fe/src/views/detail/components/EvidenceBlock.vue"]]),tl={class:"detail-collapse"},il={key:0,class:"ce-gray-color-italic"},nl={key:1},ol={key:0,class:"ce-gray-color-italic"},sl={key:1},cl=e({__name:"CancelBlock",setup(e){const o=D(),s=n({}),r={Approved:"primary",Rejected:"info",Reviewing:"warning"};return c((()=>{s.value=o.getCancellation?o.getCancellation:{}})),(e,n)=>{const o=l("font-awesome-icon"),c=l("el-descriptions-item"),_=l("el-tag"),h=l("el-descriptions"),k=l("el-collapse-item");return a(),t(y,null,[d(" cancellation block "),p(E)(p(s))?(a(),m(k,{key:0,name:"2"},{title:u((()=>[w("div",tl,[i(o,{icon:"fa-solid fa-thumbtack"}),v(" "+b(p(f)("Cancellation")),1)])])),default:u((()=>[w("div",null,[i(h,{column:"2",border:""},{default:u((()=>[i(c,{label:p(f)("Application date")},{default:u((()=>[v(b(p(g)(p(s).applyDate)),1)])),_:1},8,["label"]),i(c,{label:p(f)("Applicant")},{default:u((()=>[v(b(p(s).applicantName),1)])),_:1},8,["label"]),i(c,{label:p(f)("Reason")},{default:u((()=>[p(s).reason&&""!==p(s).reason?(a(),t("span",nl,b(p(s).reason),1)):(a(),t("span",il,b(p(f)("There is no reason")),1))])),_:1},8,["label"]),i(c,{label:p(f)("Status")},{default:u((()=>[i(_,{type:r[p(s).result]},{default:u((()=>[v(b(p(f)(p(s).result)),1)])),_:1},8,["type"])])),_:1},8,["label"]),p(s).reviewDate?(a(),m(c,{key:0,label:p(f)("Review date")},{default:u((()=>[v(b(p(g)(p(s).reviewDate)),1)])),_:1},8,["label"])):d("v-if",!0),"Rejected"===p(s).result?(a(),m(c,{key:1,label:p(f)("Rejection message")},{default:u((()=>[p(s).comments&&""!==p(s).comments?(a(),t("span",sl,b(p(s).comments),1)):(a(),t("span",ol,b(p(f)("There is no comments")),1))])),_:1},8,["label"])):d("v-if",!0)])),_:1})])])),_:1})):d("v-if",!0)],2112)}}},[["__file","C:/Program Files/Workspace/it-req-fe/src/views/detail/components/CancelBlock.vue"]]),rl={key:1,class:"ce-main-container"},dl=e({__name:"index",setup(e){const o=s().params.reqNo,r=D(),f=n(""),v=["Reviewing","Rejected","Returned"],b=n(!1),g=n(["1","2","3","4","5"]);return c((async()=>{b.value=!0,r.setReqNo(o),await r.getITReqInfo(),f.value=r.getReqStatus,setTimeout((()=>b.value=!1),1500)})),(e,n)=>{const o=l("el-collapse");return a(),t("div",null,[i(p(S),{loading:p(b)},null,8,["loading"]),d(" top title & functional buttons "),p(b)?d("v-if",!0):(a(),m(p(pe),{key:0})),d(" content "),p(b)?d("v-if",!0):(a(),t("div",rl,[i(o,{modelValue:p(g),"onUpdate:modelValue":n[0]||(n[0]=e=>h(g)?g.value=e:null)},{default:u((()=>[i(p(we)),i(p(cl)),i(p(Ce)),v.includes(p(f))?d("v-if",!0):(a(),m(p(Ge),{key:0})),v.includes(p(f))?d("v-if",!0):(a(),m(p(al),{key:1}))])),_:1},8,["modelValue"])]))])}}},[["__scopeId","data-v-3316eea4"],["__file","C:/Program Files/Workspace/it-req-fe/src/views/detail/index.vue"]]);export{dl as default};
