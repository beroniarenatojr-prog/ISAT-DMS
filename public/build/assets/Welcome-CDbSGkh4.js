import{a as r,j as e,H as k,L as o}from"./app-C9oUWCsd.js";import{C as h}from"./chevron-down-CzSVVD37.js";import{E as u}from"./eye-DIVvPe2L.js";import{T as j}from"./target-BDkJzhcy.js";import{A as c}from"./award-B0OF24nJ.js";import{S as T,A as a}from"./sparkles-DR5d4zaD.js";import{c as S}from"./createLucideIcon-BjYlnjAS.js";import{X as A}from"./x-C2tfWDct.js";import{C as t}from"./circle-check-big-B0nYxIbG.js";import{T as C}from"./trending-up-BQ98o8Cr.js";const I=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],E=S("map-pin",I);function q({auth:b}){const[v,d]=r.useState(!1),[m,p]=r.useState(!1),[l,y]=r.useState(0),[f,w]=r.useState({}),n=r.useRef(null),x=r.useRef(null);return r.useEffect(()=>{const s=()=>{y(window.scrollY)};return window.addEventListener("scroll",s,{passive:!0}),()=>window.removeEventListener("scroll",s)},[]),r.useEffect(()=>(n.current=new IntersectionObserver(i=>{i.forEach(g=>{g.isIntersecting&&w(N=>({...N,[g.target.id]:!0}))})},{threshold:.1,rootMargin:"0px 0px -100px 0px"}),document.querySelectorAll("[data-animate]").forEach(i=>{n.current&&n.current.observe(i)}),()=>{n.current&&n.current.disconnect()}),[]),r.useEffect(()=>{const s=i=>{x.current&&!x.current.contains(i.target)&&p(!1)};return document.addEventListener("mousedown",s),()=>document.removeEventListener("mousedown",s)},[]),e.jsxs(e.Fragment,{children:[e.jsx(k,{title:"Welcome to ISAT e-TRACES"}),e.jsxs("div",{className:"min-h-screen relative overflow-hidden",children:[e.jsxs("div",{className:"fixed inset-0 z-0",children:[e.jsx("img",{src:"/pictures/landingpage.png",alt:"",className:"w-full h-full object-cover"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/70"})]}),e.jsxs("div",{className:"relative z-10",children:[e.jsx("nav",{className:`bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ${l>50?"shadow-lg":""}`,style:{transform:(l>50,"translateY(0)")},children:e.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"flex justify-between items-center h-16",children:[e.jsxs("div",{className:"flex items-center gap-3 group cursor-pointer",children:[e.jsxs("div",{className:"relative",children:[e.jsx("img",{src:"/pictures/isat.tmp",alt:"ISAT Logo",className:"h-10 w-10 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"}),e.jsx("div",{className:"absolute inset-0 rounded-lg bg-gradient-to-br from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"})]}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-600",children:"ISAT e-TRACES"}),e.jsx("p",{className:"text-xs text-gray-600",children:"E-Management Portal"})]})]}),e.jsx("div",{className:"flex items-center gap-4",children:e.jsxs("div",{className:"relative",ref:x,children:[e.jsxs("button",{onClick:()=>p(!m),className:"flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#1a5f3a] transition-colors duration-300 font-medium",children:["About ISAT",e.jsx(h,{className:`h-4 w-4 transition-transform duration-300 ${m?"rotate-180":""}`})]}),m&&e.jsxs("div",{className:"absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fade-in",children:[e.jsx(o,{href:"/vision",className:"block px-4 py-2 text-sm text-gray-700 hover:bg-[#1a5f3a]/10 hover:text-[#1a5f3a] transition-colors duration-200",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(u,{className:"h-4 w-4"}),"Vision"]})}),e.jsx(o,{href:"/mission",className:"block px-4 py-2 text-sm text-gray-700 hover:bg-[#1a5f3a]/10 hover:text-[#1a5f3a] transition-colors duration-200",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(j,{className:"h-4 w-4"}),"Mission"]})}),e.jsx(o,{href:"/core-values",className:"block px-4 py-2 text-sm text-gray-700 hover:bg-[#1a5f3a]/10 hover:text-[#1a5f3a] transition-colors duration-200",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(c,{className:"h-4 w-4"}),"Core Values"]})})]})]})})]})})}),e.jsxs("section",{className:"relative px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center justify-center",id:"hero","data-animate":!0,children:[e.jsxs("div",{className:"absolute inset-0 pointer-events-none overflow-hidden",children:[e.jsx("div",{className:"absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30",style:{transform:`translateY(${l*.1}px)`}}),e.jsx("div",{className:"absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30",style:{transform:`translateY(${l*.05}px)`}})]}),e.jsx("div",{className:"max-w-5xl mx-auto relative",children:e.jsx("div",{className:"flex items-center justify-center",children:e.jsxs("div",{className:"text-center space-y-8 px-4",children:[e.jsxs("div",{className:"inline-flex items-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-md text-white rounded-full text-sm font-semibold animate-fade-in border border-white/30 shadow-2xl hover:bg-white/20 transition-all duration-300",children:[e.jsx(T,{className:"h-5 w-5 animate-pulse text-yellow-300"}),"For Teachers, By Educators"]}),e.jsxs("h1",{className:"text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight animate-slide-up",children:[e.jsx("span",{className:"drop-shadow-2xl",children:"Empower Your"}),e.jsx("span",{className:"block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-green-400 mt-3 animate-gradient drop-shadow-2xl",children:"Teaching Career"})]}),e.jsx("p",{className:"text-xl md:text-2xl text-gray-100 leading-relaxed animate-slide-up animation-delay-200 max-w-3xl mx-auto font-light drop-shadow-lg",children:"Digital IPCRF submission and performance tracking made simple. Focus on teaching while we handle your professional documentation."}),e.jsx("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-400 pt-4",children:b.user?e.jsxs(o,{href:route("dashboard"),className:"group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl hover:from-green-500 hover:to-green-600 transition-all transform hover:scale-105 hover:shadow-2xl font-bold text-lg overflow-hidden shadow-xl",children:[e.jsx("span",{className:"absolute inset-0 w-full h-full bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"}),e.jsx("span",{className:"relative",children:"Go to My Dashboard"}),e.jsx(a,{className:"ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform relative"})]}):e.jsxs(o,{href:route("login"),className:"group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl hover:from-green-500 hover:to-green-600 transition-all transform hover:scale-105 hover:shadow-2xl font-bold text-lg overflow-hidden shadow-xl",children:[e.jsx("span",{className:"absolute inset-0 w-full h-full bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"}),e.jsx("span",{className:"relative",children:"Get Started"}),e.jsx(a,{className:"ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform relative"})]})}),e.jsx("div",{className:"flex justify-center pt-12 animate-bounce",children:e.jsx(h,{className:"h-10 w-10 text-white/70 drop-shadow-lg"})})]})})})]}),e.jsx("section",{className:"py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden",id:"gallery","data-animate":!0,children:e.jsxs("div",{className:"max-w-7xl mx-auto relative z-10",children:[e.jsxs("div",{className:"text-center mb-16",children:[e.jsxs("div",{className:"inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full text-lg font-semibold mb-6 border border-white/20 shadow-2xl",children:[e.jsx(E,{className:"h-6 w-6 text-green-300"}),"Our Campus"]}),e.jsx("h2",{className:"text-3xl md:text-4xl font-bold text-white mb-4",children:"Isabela School of Arts and Trades"}),e.jsx("p",{className:"text-lg text-gray-300 max-w-2xl mx-auto",children:"A glimpse into our vibrant learning environment where excellence meets innovation"})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[e.jsx("div",{className:`lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 transform hover:-translate-y-2 bg-white p-2 ${f.gallery?"animate-fade-in-up":"opacity-0"}`,children:e.jsxs("div",{className:"relative h-full min-h-[400px] overflow-hidden rounded-[20px]",children:[e.jsx("img",{src:"/pictures/pic1.jpg",alt:"ISAT Campus Main Building",className:"w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",loading:"lazy"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"}),e.jsxs("div",{className:"absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300",children:[e.jsx("h3",{className:"text-2xl font-bold mb-2",children:"Main Campus"}),e.jsx("p",{className:"text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100",children:"Where innovation and tradition meet to shape future leaders"})]})]})}),[{src:"/pictures/pic2.jpg",title:"Learning Facilities",desc:"State-of-the-art classrooms"},{src:"/pictures/pic3.jpg",title:"Campus Grounds",desc:"Beautiful learning environment"},{src:"/pictures/pic4.jpg",title:"Student Activities",desc:"Vibrant campus life"},{src:"/pictures/pic5.jpg",title:"Academic Excellence",desc:"Committed to quality education"},{src:"/pictures/pic6.jpg",title:"Community",desc:"Building tomorrow together"}].map((s,i)=>e.jsx("div",{className:`group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 transform hover:-translate-y-2 bg-white p-2 ${f.gallery?"animate-fade-in-up":"opacity-0"}`,style:{animationDelay:`${(i+1)*150}ms`},children:e.jsxs("div",{className:"relative h-64 overflow-hidden rounded-[20px]",children:[e.jsx("img",{src:s.src,alt:s.title,className:"w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",loading:"lazy"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"}),e.jsxs("div",{className:"absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300",children:[e.jsx("h3",{className:"text-lg font-bold mb-1",children:s.title}),e.jsx("p",{className:"text-xs text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100",children:s.desc})]})]})},i))]})]})}),e.jsx("footer",{className:"bg-[#2c3e50] text-gray-300 py-4 px-4 sm:px-6 lg:px-8",children:e.jsx("div",{className:"max-w-7xl mx-auto",children:e.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center gap-2",children:[e.jsxs("p",{className:"text-sm text-gray-400",children:["© ",new Date().getFullYear()," ISAT e-TRACES. All rights reserved."]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx(c,{className:"h-4 w-4 text-[#fbbf24]"}),e.jsx("span",{className:"text-gray-400",children:"Isabela School of Arts and Trades"})]})]})})})]})]}),v&&e.jsx("div",{className:"fixed inset-0 z-50 overflow-y-auto animate-fade-in",children:e.jsxs("div",{className:"flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0",children:[e.jsx("div",{className:"fixed inset-0 transition-all duration-300 bg-gray-900/80 backdrop-blur-sm",onClick:()=>d(!1),style:{animation:"fade-in 0.3s ease-out"}}),e.jsxs("div",{className:"inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full",style:{animation:"scale-in 0.3s ease-out"},children:[e.jsxs("div",{className:"bg-gradient-to-r from-[#1a5f3a] via-[#fbbf24] to-[#1a5f3a] px-6 py-6 relative overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 opacity-10",children:e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"})}),e.jsxs("div",{className:"flex items-center justify-between relative z-10",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"relative group",children:[e.jsx("img",{src:"/pictures/isat.tmp",alt:"ISAT Logo",className:"h-12 w-12 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110"}),e.jsx("div",{className:"absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-2xl font-bold text-white",children:"About ISAT"}),e.jsx("p",{className:"text-green-100 text-sm",children:"Vision, Mission & Core Values"})]})]}),e.jsx("button",{onClick:()=>d(!1),className:"text-white hover:text-gray-200 transition-all duration-300 hover:rotate-90 hover:scale-110 p-2 rounded-lg hover:bg-white/10","aria-label":"Close modal",children:e.jsx(A,{className:"h-6 w-6"})})]})]}),e.jsx("div",{className:"px-6 py-6 max-h-[70vh] overflow-y-auto",children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200",children:[e.jsxs("div",{className:"flex items-start gap-3 mb-3",children:[e.jsx("div",{className:"w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0",children:e.jsx(u,{className:"h-5 w-5 text-white"})}),e.jsx("h4",{className:"text-xl font-bold text-blue-900",children:"VISION"})]}),e.jsx("p",{className:"text-gray-700 leading-relaxed pl-13",children:'"To produce Filipinos who passionately love their country, realize their full potential, and contribute to nation-building through a continuously improving, learner-centered environment."'})]}),e.jsxs("div",{className:"bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200",children:[e.jsxs("div",{className:"flex items-start gap-3 mb-3",children:[e.jsx("div",{className:"w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0",children:e.jsx(j,{className:"h-5 w-5 text-white"})}),e.jsx("h4",{className:"text-xl font-bold text-green-900",children:"MISSION"})]}),e.jsx("p",{className:"text-gray-700 leading-relaxed pl-13",children:'"To provide quality, equitable, and culture-based basic education in a safe, motivating environment, supported by nurturing teachers and active stakeholder involvement."'})]}),e.jsxs("div",{className:"bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-2 border-yellow-200",children:[e.jsxs("div",{className:"flex items-start gap-3 mb-4",children:[e.jsx("div",{className:"w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0",children:e.jsx(c,{className:"h-5 w-5 text-white"})}),e.jsx("h4",{className:"text-xl font-bold text-yellow-900",children:"CORE VALUES"})]}),e.jsxs("div",{className:"pl-13 grid grid-cols-2 gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2 text-gray-700",children:[e.jsx(t,{className:"h-5 w-5 text-yellow-600 flex-shrink-0"}),e.jsx("span",{className:"font-medium",children:"Maka-Diyos"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-gray-700",children:[e.jsx(t,{className:"h-5 w-5 text-yellow-600 flex-shrink-0"}),e.jsx("span",{className:"font-medium",children:"Maka-tao"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-gray-700",children:[e.jsx(t,{className:"h-5 w-5 text-yellow-600 flex-shrink-0"}),e.jsx("span",{className:"font-medium",children:"Makakalikasan"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-gray-700",children:[e.jsx(t,{className:"h-5 w-5 text-yellow-600 flex-shrink-0"}),e.jsx("span",{className:"font-medium",children:"Makabansa"})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200",children:[e.jsxs("div",{className:"flex items-start gap-3 mb-4",children:[e.jsx("div",{className:"w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0",children:e.jsx(c,{className:"h-5 w-5 text-white"})}),e.jsx("h4",{className:"text-xl font-bold text-purple-900",children:"GOALS"})]}),e.jsxs("ul",{className:"space-y-2 pl-13",children:[e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(t,{className:"h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"Continuously commit to service excellence in skills training in all registered qualifications/programs"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(t,{className:"h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"Extend skills training opportunities to a greater number of people"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(t,{className:"h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"Intensify and strengthen linkages with industries known for their international standards"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(t,{className:"h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"Intensify and strengthen stakeholder's linkages"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(t,{className:"h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"Improve capability in income generating project production and entrepreneurship"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(t,{className:"h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"Greening ISAT"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(t,{className:"h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"Construction of new training laboratories"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(t,{className:"h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"Implement flexible learning delivery"})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200",children:[e.jsxs("div",{className:"flex items-start gap-3 mb-4",children:[e.jsx("div",{className:"w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0",children:e.jsx(C,{className:"h-5 w-5 text-white"})}),e.jsx("h4",{className:"text-xl font-bold text-orange-900",children:"OBJECTIVES"})]}),e.jsxs("ul",{className:"space-y-2 pl-13",children:[e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"To strive for excellence in skills training strategy"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"To upgrade programs in skills training for trainers to be globally competent"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"To conduct TVET research"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"To produce globally competitive trainees"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"To conduct skills training to be identified areas"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"To produce globally competitive skilled workforce"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"To establish a strong relationship with different stakeholders of the school"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"To encourage trainers of all qualifications to venture into IGP"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"To serve quality and different variety of products"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"To achieve 100% ARTA/CUSAT positive comments on services and products"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"To increase the marketability of products and services"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"To re-orient existing education programs to address sustainable development"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"Construct additional training laboratories that conforms to the international standards"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"Offer programs relevant to the new normal situation/condition and in demand in the locality"})]}),e.jsxs("li",{className:"flex items-start gap-2 text-gray-700",children:[e.jsx(a,{className:"h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"Continues implementation of disrupted programs"})]})]})]})]})}),e.jsx("div",{className:"bg-gradient-to-r from-gray-50 to-[#fbbf24]/10 px-6 py-4 border-t border-gray-200",children:e.jsxs("button",{onClick:()=>d(!1),className:"group w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#1a5f3a] to-[#1a5f3a]/90 text-white rounded-lg hover:from-[#1a5f3a]/90 hover:to-[#1a5f3a] transition-all font-semibold transform hover:scale-105 hover:shadow-lg relative overflow-hidden",children:[e.jsx("span",{className:"absolute inset-0 w-full h-full bg-[#fbbf24]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"}),e.jsx("span",{className:"relative",children:"Close"})]})})]})]})}),e.jsx("style",{jsx:!0,children:`
                /* Performance-optimized animations using GPU acceleration */
                @keyframes blob {
                    0% { 
                        transform: translate3d(0px, 0px, 0) scale(1);
                    }
                    33% { 
                        transform: translate3d(30px, -50px, 0) scale(1.1);
                    }
                    66% { 
                        transform: translate3d(-20px, 20px, 0) scale(0.9);
                    }
                    100% { 
                        transform: translate3d(0px, 0px, 0) scale(1);
                    }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                    will-change: transform;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                
                @keyframes float {
                    0%, 100% { 
                        transform: translateY(0px) translateZ(0);
                    }
                    50% { 
                        transform: translateY(-20px) translateZ(0);
                    }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                    will-change: transform;
                }
                
                @keyframes fade-in {
                    from { 
                        opacity: 0;
                        transform: translateZ(0);
                    }
                    to { 
                        opacity: 1;
                        transform: translateZ(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
                
                @keyframes slide-up {
                    from { 
                        opacity: 0;
                        transform: translate3d(0, 30px, 0);
                    }
                    to { 
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                
                .animate-slide-up {
                    animation: slide-up 0.6s ease-out forwards;
                    will-change: transform, opacity;
                }
                
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 40px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    will-change: transform, opacity;
                }
                
                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
                
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
                
                .animation-delay-200 {
                    animation-delay: 0.2s;
                    opacity: 0;
                }
                
                .animation-delay-400 {
                    animation-delay: 0.4s;
                    opacity: 0;
                }
                
                .animation-delay-600 {
                    animation-delay: 0.6s;
                    opacity: 0;
                }
                
                /* 3D perspective for cards */
                .perspective-1000 {
                    perspective: 1000px;
                }
                
                /* Smooth scroll behavior */
                html {
                    scroll-behavior: smooth;
                }
                
                /* Accessibility: Respect user's motion preferences */
                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                        scroll-behavior: auto !important;
                    }
                    
                    .animate-blob,
                    .animate-float,
                    .animate-pulse,
                    .animate-bounce {
                        animation: none !important;
                    }
                }
                
                /* Loading optimization */
                img {
                    content-visibility: auto;
                }
                
                /* GPU acceleration hints */
                .transform,
                .transition-transform,
                .hover\\:scale-105,
                .hover\\:scale-110,
                .group-hover\\:scale-110 {
                    will-change: transform;
                }
                
                /* Remove will-change after animation completes */
                .animate-fade-in,
                .animate-slide-up,
                .animate-fade-in-up {
                    animation-fill-mode: forwards;
                }
                
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                
                /* Focus visible for accessibility */
                *:focus-visible {
                    outline: 2px solid #1a5f3a;
                    outline-offset: 2px;
                    border-radius: 4px;
                }
                
                /* High contrast mode support */
                @media (prefers-contrast: high) {
                    .bg-gradient-to-r,
                    .bg-gradient-to-br {
                        background: #1a5f3a !important;
                    }
                }
                
                /* Modal animations */
                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.95) translateZ(0);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateZ(0);
                    }
                }
                
                @keyframes shimmer {
                    from {
                        transform: translateX(-100%);
                    }
                    to {
                        transform: translateX(100%);
                    }
                }
                
                .animate-shimmer {
                    animation: shimmer 3s infinite;
                }
                
                /* Grid pattern background */
                .bg-grid-pattern {
                    background-image: 
                        linear-gradient(to right, rgba(26, 95, 58, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(26, 95, 58, 0.1) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
                
                /* Animation delays for staggered effects */
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
            `}),l>500&&e.jsx("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-[#1a5f3a] to-[#1a5f3a]/90 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-fade-in group","aria-label":"Scroll to top",children:e.jsx(h,{className:"h-6 w-6 rotate-180 group-hover:-translate-y-1 transition-transform duration-300"})})]})}export{q as default};
