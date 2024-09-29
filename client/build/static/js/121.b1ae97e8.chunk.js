"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[121],{7121:(t,e,n)=>{n.d(e,{A:()=>E});var r=n(8587),a=n(8168),i=n(5043),o=n(8387),s=n(3290),l=n(8610);function h(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function d(t){return parseFloat(t)}var u=n(7868),c=n(1188);function p(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return(0,c.A)(t,e,n)}function g(t){if(t.type)return t;if("#"===t.charAt(0))return g(function(t){t=t.slice(1);const e=new RegExp(`.{1,${t.length>=6?2:1}}`,"g");let n=t.match(e);return n&&1===n[0].length&&(n=n.map((t=>t+t))),n?`rgb${4===n.length?"a":""}(${n.map(((t,e)=>e<3?parseInt(t,16):Math.round(parseInt(t,16)/255*1e3)/1e3)).join(", ")})`:""}(t));const e=t.indexOf("("),n=t.substring(0,e);if(-1===["rgb","rgba","hsl","hsla","color"].indexOf(n))throw new Error((0,u.A)(9,t));let r,a=t.substring(e+1,t.length-1);if("color"===n){if(a=a.split(" "),r=a.shift(),4===a.length&&"/"===a[3].charAt(0)&&(a[3]=a[3].slice(1)),-1===["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(r))throw new Error((0,u.A)(10,r))}else a=a.split(",");return a=a.map((t=>parseFloat(t))),{type:n,values:a,colorSpace:r}}function f(t){const{type:e,colorSpace:n}=t;let{values:r}=t;return-1!==e.indexOf("rgb")?r=r.map(((t,e)=>e<3?parseInt(t,10):t)):-1!==e.indexOf("hsl")&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),r=-1!==e.indexOf("color")?`${n} ${r.join(" ")}`:`${r.join(", ")}`,`${e}(${r})`}function m(t,e){return t=g(t),e=p(e),"rgb"!==t.type&&"hsl"!==t.type||(t.type+="a"),"color"===t.type?t.values[3]=`/${e}`:t.values[3]=e,f(t)}var b=n(4535),v=n(6431),w=n(2532),y=n(2372);function A(t){return(0,y.Ay)("MuiSkeleton",t)}(0,w.A)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var $=n(579);const k=["animation","className","component","height","style","variant","width"];let C,x,S,R,O=t=>t;const M=(0,s.i7)(C||(C=O`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),j=(0,s.i7)(x||(x=O`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),X=(0,b.Ay)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,e[n.variant],!1!==n.animation&&e[n.animation],n.hasChildren&&e.withChildren,n.hasChildren&&!n.width&&e.fitContent,n.hasChildren&&!n.height&&e.heightAuto]}})((t=>{let{theme:e,ownerState:n}=t;const r=h(e.shape.borderRadius)||"px",i=d(e.shape.borderRadius);return(0,a.A)({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:m(e.palette.text.primary,"light"===e.palette.mode?.11:.13),height:"1.2em"},"text"===n.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${i}${r}/${Math.round(i/.6*10)/10}${r}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===n.variant&&{borderRadius:"50%"},"rounded"===n.variant&&{borderRadius:(e.vars||e).shape.borderRadius},n.hasChildren&&{"& > *":{visibility:"hidden"}},n.hasChildren&&!n.width&&{maxWidth:"fit-content"},n.hasChildren&&!n.height&&{height:"auto"})}),(t=>{let{ownerState:e}=t;return"pulse"===e.animation&&(0,s.AH)(S||(S=O`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),M)}),(t=>{let{ownerState:e,theme:n}=t;return"wave"===e.animation&&(0,s.AH)(R||(R=O`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),j,(n.vars||n).palette.action.hover)})),E=i.forwardRef((function(t,e){const n=(0,v.b)({props:t,name:"MuiSkeleton"}),{animation:i="pulse",className:s,component:h="span",height:d,style:u,variant:c="text",width:p}=n,g=(0,r.A)(n,k),f=(0,a.A)({},n,{animation:i,component:h,variant:c,hasChildren:Boolean(g.children)}),m=(t=>{const{classes:e,variant:n,animation:r,hasChildren:a,width:i,height:o}=t,s={root:["root",n,r,a&&"withChildren",a&&!i&&"fitContent",a&&!o&&"heightAuto"]};return(0,l.A)(s,A,e)})(f);return(0,$.jsx)(X,(0,a.A)({as:h,ref:e,className:(0,o.A)(m.root,s),ownerState:f},g,{style:(0,a.A)({width:p,height:d},u)}))}))}}]);
//# sourceMappingURL=121.b1ae97e8.chunk.js.map