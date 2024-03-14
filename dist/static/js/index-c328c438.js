import{_ as e,a as s,c as a,d as o,e as r,B as l,p as n,P as t,m as c,r as i,g as d,w as u,b as f,t as p,s as m,l as v,h as w,Q as g,R as y,j as _,D as h,G as k,H as I,E as C,S as P,T as q}from"./index-0d31eeb0.js";const b=e({},[["render",function(e,l){const n=s("font-awesome-icon");return a(),o("div",null,[r(n,{icon:"fa-solid fa-user"})])}],["__file","C:/Program Files/Workspace/it-req-fe/src/icons/common/user.vue"]]);const x=e({},[["render",function(e,l){const n=s("font-awesome-icon");return a(),o("div",null,[r(n,{icon:"fa-solid fa-lock"})])}],["__file","C:/Program Files/Workspace/it-req-fe/src/icons/common/lock.vue"]]);const V=e({},[["render",function(e,l){const n=s("font-awesome-icon");return a(),o("div",null,[r(n,{icon:"fa-solid fa-eye"})])}],["__file","C:/Program Files/Workspace/it-req-fe/src/icons/common/eye.vue"]]);const F=e({},[["render",function(e,l){const n=s("font-awesome-icon");return a(),o("div",null,[r(n,{icon:"fa-solid fa-eye-slash"})])}],["__file","C:/Program Files/Workspace/it-req-fe/src/icons/common/eyeSlash.vue"]]),S=e=>(h("data-v-37dfd6fc"),e=e(),k(),e),W={class:"login-container columnCC"},j=S((()=>d("div",{class:"login-bg"},null,-1))),D={class:"login-pane"},Q=S((()=>d("div",{class:"login-logo"},null,-1))),U={class:"login-title-container"},K={class:"title text-center"},T={class:"rowSC"},L={class:"rowSC flex-1"},R={class:"tip-message"},z=e({__name:"index",setup(e){const h=l(),k=n();let S=t({userId:"",password:""}),z=t({otherQuery:{},redirect:void 0});c((()=>h.query),(e=>{e&&(z.redirect=e.redirect,z.otherQuery=(e=>Object.keys(e).reduce(((s,a)=>("redirect"!==a&&(s[a]=e[a]),s)),{}))(e))}),{immediate:!0});const B=i(!1),E=i(""),G=async()=>{const{userId:e,password:s}=S,a=!!e.trim().length,o=!!s.trim().length;switch(!0){case!a:return E.value="Please input user ID";case!o:return E.value="Please input password";default:await H()}},H=async()=>{B.value=!0,localStorage.setItem("userId",S.userId);const e=I();await e.login(S).then((()=>{C.success(v("Login successfully")),k.push({path:z.redirect||"/",query:z.otherQuery})})).catch((e=>{P(30).then((()=>{E.value="User ID or password is incorrect",B.value=!1}))}))},O=()=>E.value&&""!==E.value.trim()?E.value="":null,A=i("password"),J=i(null),M=()=>{A.value="password"===A.value?"":"password",q((()=>J.value.focus()))};return(e,l)=>{const n=s("el-input"),t=s("el-form-item"),c=s("el-button"),i=s("el-row"),h=s("el-form");return a(),o("div",W,[j,d("div",D,[Q,r(h,{class:"login-form",model:f(S)},{default:u((()=>[d("div",U,[d("h3",K,p(f(m).title),1)]),r(t,{prop:"userId"},{default:u((()=>[d("div",T,[r(f(b),{class:"icon-container"}),r(n,{class:"test",modelValue:f(S).userId,"onUpdate:modelValue":l[0]||(l[0]=e=>f(S).userId=e),placeholder:f(v)("User ID (Test account: 999999)"),onKeyup:O},null,8,["modelValue","placeholder"])])])),_:1}),r(t,{prop:"password"},{default:u((()=>[d("div",L,[r(f(x),{class:"icon-container"}),(a(),w(n,{key:f(A),ref_key:"pwdRef",ref:J,modelValue:f(S).password,"onUpdate:modelValue":l[1]||(l[1]=e=>f(S).password=e),type:f(A),placeholder:f(v)("Password (Test password: 999999)"),onKeyup:[O,g(G,["enter"])]},null,8,["modelValue","type","placeholder","onKeyup"])),d("span",{class:"show-pwd",onClick:M},[(a(),w(y("password"===f(A)?f(F):f(V))))])])])),_:1}),d("div",R,p(f(v)(f(E))),1),r(i,{class:"row-bg",justify:"center"},{default:u((()=>[r(c,{loading:f(B),type:"primary",size:"default",onClick:G},{default:u((()=>[_(p(f(v)("Login")),1)])),_:1},8,["loading"])])),_:1})])),_:1},8,["model"])])])}}},[["__scopeId","data-v-37dfd6fc"],["__file","C:/Program Files/Workspace/it-req-fe/src/views/login/index.vue"]]);export{z as default};