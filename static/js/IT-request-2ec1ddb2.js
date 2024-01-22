import{p as e,I as t,G as a,J as o,E as s,l as r}from"./index-4ed6fded.js";import{h as n}from"./useValidate-1451d16f.js";const i=e(),l=t("ITRequest",{state:()=>({reqNo:"",pgrInfo:{},reqrInfo:{},uploadStatus:{},step:"",basicInfo:{},cancellation:{},scope:{},turnOnDate:{},schedule:{},evidence:{}}),getters:{getReqNo:e=>e.reqNo,getSimpleStep:e=>e.step,getFullStep:e=>"monitor"===e.step?"monitor 1 lot":e.step,getPgrInfo:e=>e.pgrInfo,getReqrInfo:e=>e.reqrInfo,getReqType:e=>e.basicInfo.type,getReqStatus:e=>e.basicInfo.status,getUploadStatus:e=>e.uploadStatus,getBasicInfo:e=>e.basicInfo,getCancellation:e=>null==e?void 0:e.cancellation,getScope:e=>e.scope,getTurnOnDate:e=>e.turnOnDate,getSchedule:e=>e.schedule,getEvidence:e=>e.evidence,getPermission:e=>{var t;const o=e.getSimpleStep,s=e.getUploadStatus,r="Reviewing"===(null==(t=e.getCancellation)?void 0:t.result),n=a().getUserId,i=e.getPgrInfo.id===n,l=e.getReqrInfo.id===n;let d={};switch(e.basicInfo.status){case"Reviewing":d.revNew=!!i,d.editNew=!1;break;case"Returned":d.revNew=!1,d.editNew=!!l;break;default:d.revNew=!1,d.editNew=!1}switch(s[o]){case"Unuploaded":case"Rejected":d.approve=!1,d.postpone=!(!i&&!l),d.cancel=!r&&!!l,d.evidence="UAT1"===o?!!i:!!l;break;case"Reviewing":d.evidence=!1,d.postpone=!(!i&&!l),d.cancel=!r&&!!l,d.approve="UAT1"===o?!!l:!!i;break;case"Approved":d.approve=!1,d.evidence=!1,d.postpone=!1,d.cancel=!1}return d},getApplicant:e=>{const t=a().getUserId,o=e.pgrInfo.id===t,s=e.reqrInfo.id===t,r=[e.pgrInfo.name,e.pgrInfo.id],n=[e.reqrInfo.name,e.reqrInfo.id];return o?r:s?n:[]}},actions:{setReqNo(e){this.reqNo=e},async getITReqInfo(){try{if(!this.reqNo.length)throw"missingArgumentError";await o(this.reqNo).then((e=>{const{reqNo:t,reqrName:a,reqrId:o,pgrName:s,pgrId:r,issueDate:n,status:i,reqTable:l,review:p,cancel:c,turnOnDate:u,type:v,uploadStatus:g,attachedFiles:m,leadTime:I,reviewDuration:f,UAT1Logs:h,UAT2Logs:w,releaseLogs:q,monitorLogs:D}=e.data,{reqName:T}=l;switch(this.pgrInfo={name:s,id:r},this.reqrInfo={name:a,id:o},this.uploadStatus=g,this.basicInfo={reqNo:t,reqName:T,type:v,status:i,leadTime:I,pgrName:s,reqrName:a,issueDate:n,review:p,reviewDuration:f},this.cancellation=c,this.scope=Object.assign({attachedFiles:m},l),this.turnOnDate={owner:s,date:u},this.schedule={UAT1:d(e.data,"UAT1",i),UAT2:d(e.data,"UAT2",i),release:"Project"===v?d(e.data,"release",i):void 0,monitor:"Project"===v?d(e.data,"monitor",i):void 0},this.evidence={UAT1:{uploadFiles:null==h?void 0:h.uploadFiles,uploadReply:null==h?void 0:h.result,updateDate:null==h?void 0:h.updateDate,reviewDate:null==h?void 0:h.reviewDate,comments:null==h?void 0:h.comments},UAT2:{uploadFiles:null==w?void 0:w.uploadFiles,uploadReply:null==w?void 0:w.result,updateDate:null==w?void 0:w.updateDate,reviewDate:null==w?void 0:w.reviewDate,comments:null==w?void 0:w.comments},release:{uploadFiles:null==q?void 0:q.uploadFiles,uploadReply:null==q?void 0:q.result,updateDate:null==q?void 0:q.updateDate,reviewDate:null==q?void 0:q.reviewDate,comments:null==q?void 0:q.comments},monitor:{uploadFiles:null==D?void 0:D.uploadFiles,uploadReply:null==D?void 0:D.result,updateDate:null==D?void 0:D.updateDate,reviewDate:null==D?void 0:D.reviewDate,comments:null==D?void 0:D.comments}},!0){case g.UAT1&&"Approved"!==g.UAT1:this.step="UAT1";break;case g.UAT2&&"Approved"!==g.UAT2:this.step="UAT2";break;case g.release&&"Approved"!==g.release:this.step="release";break;case g.monitor&&"Approved"!==g.monitor:this.step="monitor";break;default:this.step=i}}))}catch(e){if(-1===e.indexOf("status code "))return"missingArgumentError"===e?console.error("請提供 reqNo"):console.error(e);const t=JSON.parse(e).msg.split("status code ")[1];return"404"===t?(console.error(`找不到 IT #${this.reqNo} 資料，請確認 IT # 是否正確輸入`),s.error(`IT #${this.reqNo} ${r("data not found")}`),void i.push("/404")):console.error(t)}}}}),d=(e,t,a)=>{let o=e[`${t}Logs`],s={title:"",owner:"",state:"",act:"",exp:{old:[],new:""},KPI:{}};switch(t){case"UAT1":s.title="IT buyoff (UAT1)",s.owner=e.pgrName;break;case"UAT2":s.title="User buyoff (UAT2)",s.owner=e.reqrName;break;case"release":s.title="Release",s.owner=e.reqrName;break;case"monitor":s.title="Monitor 1 lot",s.owner=e.reqrName}o.actDate?s.state="Done":"Cancel"===a?s.state="Cancel":"Reviewing"===o.result?s.state="Reviewing":"Rejected"===o.result?s.state="Rejected":s.state="Proceeding",s.act=o.actDate;const r=o.expDates.length;switch(r>1){case!0:for(let e=0;e<r;e++)e<r-1?s.exp.old.push(o.expDates[e]):s.exp.new=o.expDates[e];break;case!1:s.exp.new=o.expDates[0]}return n(e.KPI[t])?s.KPI=Object.assign({},e.KPI[t]):s.KPI={reschedule:0,delay:0},s};export{l as u};
