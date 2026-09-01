import{a as m,j as e,H as E,r as p}from"./app-C9oUWCsd.js";import{S as F,A as $,a as B,b as P,c as R,B as H,d as V,e as z,h as M,I as x}from"./breadcrumb-e8IE2iq8.js";import{B as c}from"./button-BhtdDOiE.js";import{T as O,a as q,b as u,c as l,d as G,e as o}from"./table-CzwRGDKR.js";import{S as K,a as W,b as Y,c as J,d as A}from"./select-TyTwhnAC.js";import{L as h}from"./label-BqRcJ8IM.js";import{F as Q}from"./file-text-BJSKomWm.js";import{c as X}from"./createLucideIcon-BjYlnjAS.js";import{D as Z}from"./download-CjEv48mI.js";import{S as ee}from"./search-BA823flD.js";import{L as te}from"./log-in-Fp02wFIg.js";import{T as ae}from"./trending-up-BQ98o8Cr.js";import{T as re}from"./trash-2-LliIgeXV.js";import{S as se}from"./square-pen-Fa88BKbu.js";import{P as ie}from"./plus-DIsKM8Us.js";import{A as ne}from"./activity-CjzqM1s5.js";import"./tslib.es6-Dt4L5h6_.js";import"./x-C2tfWDct.js";import"./roleLabels-DBaSYfRT.js";import"./chevron-down-CzSVVD37.js";import"./chevron-up-CU8acwpX.js";const oe=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],ce=X("printer",oe);function _e({logs:i,actions:T,filters:d}){const[b,g]=m.useState(d.search||""),[j,f]=m.useState(d.action||""),[y,v]=m.useState(d.date_from||""),[w,N]=m.useState(d.date_to||""),S=()=>{p.get(route("admin.audit-logs.index"),{search:b,action:j,date_from:y,date_to:w},{preserveState:!0})},k=()=>{const t=["User","Email","Action","Description","Timestamp"],r=i.data.map(s=>[s.user?.name||"Unknown",s.user?.email||"Unknown",s.action,s.description,new Date(s.created_at).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})]),a=[t.join(","),...r.map(s=>s.map(I=>`"${I}"`).join(","))].join(`
`),U=new Blob([a],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a"),D=URL.createObjectURL(U);n.setAttribute("href",D),n.setAttribute("download",`audit_logs_${new Date().toISOString().split("T")[0]}.csv`),n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n)},C=()=>{const t=window.open("","_blank"),r=`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Audit Logs - ISAT e-TRACES</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    h1 {
                        color: #1a5f3a;
                        text-align: center;
                        margin-bottom: 10px;
                    }
                    .subtitle {
                        text-align: center;
                        color: #666;
                        margin-bottom: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #1a5f3a;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    .action-badge {
                        display: inline-block;
                        padding: 2px 8px;
                        border-radius: 12px;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    .action-create { background-color: #d1fae5; color: #065f46; }
                    .action-update { background-color: #fef3c7; color: #92400e; }
                    .action-delete { background-color: #fee2e2; color: #991b1b; }
                    .action-promote { background-color: #dbeafe; color: #1e40af; }
                    .action-login { background-color: #e9d5ff; color: #6b21a8; }
                    @media print {
                        button { display: none; }
                    }
                </style>
            </head>
            <body>
                <h1>ISAT e-TRACES</h1>
                <div class="subtitle">Audit Logs Report</div>
                <div class="subtitle">Generated: ${new Date().toLocaleString()}</div>
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Action</th>
                            <th>Description</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${i.data.map(a=>`
                            <tr>
                                <td>${a.user?.name||"Unknown"}</td>
                                <td>${a.user?.email||"Unknown"}</td>
                                <td><span class="action-badge action-${a.action}">${a.action.charAt(0).toUpperCase()+a.action.slice(1)}</span></td>
                                <td>${a.description}</td>
                                <td>${new Date(a.created_at).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </body>
            </html>
        `;t.document.write(r),t.document.close(),t.focus(),setTimeout(()=>{t.print(),t.close()},250)},L=t=>({create:"bg-green-100 text-green-700 border-green-200",update:"bg-yellow-100 text-yellow-700 border-yellow-200",delete:"bg-red-100 text-red-700 border-red-200",promote:"bg-blue-100 text-blue-700 border-blue-200",login:"bg-purple-100 text-purple-700 border-purple-200"})[t]||"bg-gray-100 text-gray-700 border-gray-200",_=t=>{const a={create:ie,update:se,delete:re,promote:ae,login:te}[t]||ne;return e.jsx(a,{className:"h-3 w-3"})};return e.jsxs(e.Fragment,{children:[e.jsx(E,{title:"Audit Logs"}),e.jsxs(F,{children:[e.jsx($,{}),e.jsxs(B,{children:[e.jsx("header",{className:"flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",children:e.jsxs("div",{className:"flex items-center gap-2 px-4",children:[e.jsx(P,{className:"-ml-1"}),e.jsx(R,{orientation:"vertical",className:"mr-2 h-4"}),e.jsx(H,{children:e.jsx(V,{children:e.jsx(z,{children:e.jsx(M,{children:"Audit Logs"})})})})]})}),e.jsxs("div",{className:"flex flex-1 flex-col gap-4 p-4 pt-0",children:[e.jsx("div",{className:"fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-20",children:e.jsx("img",{src:"/pictures/isat.tmp",alt:"ISAT Background",className:"w-[600px] h-[600px] object-contain"})}),e.jsx("div",{className:"relative z-10",children:e.jsxs("div",{className:"bg-white rounded-lg shadow p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"text-2xl font-semibold text-gray-900 flex items-center gap-2",children:[e.jsx(Q,{className:"h-6 w-6 text-green-600"}),"Audit Logs"]}),e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:"Track all user actions and system activities"})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(c,{onClick:C,variant:"outline",className:"border-green-600 text-green-600 hover:bg-green-50",children:[e.jsx(ce,{className:"h-4 w-4 mr-2"}),"Print"]}),e.jsxs(c,{onClick:k,className:"bg-green-600 hover:bg-green-700",children:[e.jsx(Z,{className:"h-4 w-4 mr-2"}),"Export CSV"]})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4 mb-6",children:[e.jsxs("div",{children:[e.jsx(h,{htmlFor:"search",children:"Search"}),e.jsx(x,{id:"search",placeholder:"Name or email...",value:b,onChange:t=>g(t.target.value),onKeyPress:t=>t.key==="Enter"&&S()})]}),e.jsxs("div",{children:[e.jsx(h,{htmlFor:"action",children:"Action Type"}),e.jsxs(K,{value:j||"all",onValueChange:t=>{f(t==="all"?"":t)},children:[e.jsx(W,{children:e.jsx(Y,{placeholder:"All Actions"})}),e.jsxs(J,{children:[e.jsx(A,{value:"all",children:"All Actions"}),T.map(t=>e.jsx(A,{value:t,children:t.charAt(0).toUpperCase()+t.slice(1)},t))]})]})]}),e.jsxs("div",{children:[e.jsx(h,{htmlFor:"date_from",children:"From Date"}),e.jsx(x,{id:"date_from",type:"date",value:y,onChange:t=>v(t.target.value)})]}),e.jsxs("div",{children:[e.jsx(h,{htmlFor:"date_to",children:"To Date"}),e.jsx(x,{id:"date_to",type:"date",value:w,onChange:t=>N(t.target.value)})]})]}),e.jsxs("div",{className:"flex gap-2 mb-6",children:[e.jsxs(c,{onClick:S,className:"bg-green-600 hover:bg-green-700",children:[e.jsx(ee,{className:"h-4 w-4 mr-2"}),"Apply Filters"]}),e.jsx(c,{variant:"outline",onClick:()=>{g(""),f(""),v(""),N(""),p.get(route("admin.audit-logs.index"))},children:"Clear"})]}),e.jsx("div",{className:"rounded-md border overflow-hidden",children:e.jsxs(O,{children:[e.jsx(q,{children:e.jsxs(u,{className:"bg-gray-50",children:[e.jsx(l,{className:"font-semibold",children:"User"}),e.jsx(l,{className:"font-semibold",children:"Email"}),e.jsx(l,{className:"font-semibold",children:"Action"}),e.jsx(l,{className:"font-semibold",children:"Description"}),e.jsx(l,{className:"font-semibold",children:"Timestamp"})]})}),e.jsx(G,{children:i.data.length===0?e.jsx(u,{children:e.jsx(o,{colSpan:5,className:"text-center text-gray-500 py-8",children:"No audit logs found"})}):i.data.map(t=>e.jsxs(u,{className:"hover:bg-gray-50",children:[e.jsx(o,{className:"font-medium",children:t.user?.name||"Unknown"}),e.jsx(o,{className:"text-gray-600",children:t.user?.email||"Unknown"}),e.jsx(o,{children:e.jsxs("span",{className:`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${L(t.action)}`,children:[_(t.action),t.action.charAt(0).toUpperCase()+t.action.slice(1)]})}),e.jsx(o,{className:"text-sm text-gray-700",children:t.description}),e.jsx(o,{className:"text-sm text-gray-500 whitespace-nowrap",children:new Date(t.created_at).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})]},t.id))})]})}),i.links.length>3&&e.jsx("div",{className:"flex justify-center gap-2 mt-6",children:i.links.map((t,r)=>e.jsx(c,{variant:t.active?"default":"outline",size:"sm",disabled:!t.url,onClick:()=>t.url&&p.get(t.url),dangerouslySetInnerHTML:{__html:t.label},className:t.active?"bg-green-600 hover:bg-green-700":""},r))})]})})]})]})]})]})}export{_e as default};
