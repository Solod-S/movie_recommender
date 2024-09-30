"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[81],{2081:(e,t,i)=>{i.r(t),i.d(t,{default:()=>x});var s=i(5869);const a=i(459).J1`
  query GetSavedMovies($page: Int) {
    getSavedMovies(page: $page, perPage: 12) {
      page
      totalResults
      totalPages
      results {
        id
        movieId
        title
        image
        releaseDate(format: "dd.MM.yyyy")
        voteAverage
        voteCount
      }
    }
  }
`;var o=i(5043),l=i(4316),n=i(6446),r=i(8903),d=i(3336),g=i(3704),v=i(2718),c=i(8250),u=i(579);const x=()=>{var e,t;const[i,x]=(0,o.useState)([]),[h,m]=(0,o.useState)(1),[f,p]=(0,o.useState)(),{loading:j,error:y,data:A}=(0,s.IT)(a,{variables:{page:h}});(0,o.useEffect)((()=>{var e,t,i;(null===A||void 0===A||null===(e=A.getSavedMovies)||void 0===e||null===(t=e.results)||void 0===t?void 0:t.length)>0?(console.log("data?.getSavedMovies?.results",null===A||void 0===A||null===(i=A.getSavedMovies)||void 0===i?void 0:i.results),x((e=>A.getSavedMovies.results.map((t=>{const i=e.find((e=>e.id===t.id));return{...t,image:i?i.image:t.image}}))))):x([])}),[A]),(0,o.useEffect)((()=>{const e=document.querySelector("header"),t=document.querySelector("footer");if(e){const i=e.offsetHeight,s=t.offsetHeight;p(`calc(100vh - ${i+s}px)`)}}),[]);return y?(0,u.jsx)(l.gP,{}):(0,u.jsxs)(n.A,{sx:{minHeight:f,display:"flex",flexDirection:"column",alignItems:"center",padding:3,backgroundColor:"#f5f5f5"},children:[(0,u.jsx)("dix",{style:{height:"80%"}}),(0,u.jsx)(r.Ay,{item:!0,xs:12,md:8,sx:{width:"100%"},children:(0,u.jsxs)(d.A,{sx:{padding:2,minHeight:"400px"},children:[(0,u.jsxs)(n.A,{sx:{flexGrow:1,marginBottom:"16px"},children:[j&&(0,v.A)(),i&&(0,u.jsx)(r.Ay,{container:!0,spacing:2,children:i.map(((e,t)=>(0,u.jsx)(r.Ay,{item:!0,xs:12,md:3,lg:2,children:(0,u.jsx)(g.P.div,{className:"portfolio__item",variants:c.IM,initial:"hidden",animate:"visible",custom:t,children:(0,u.jsx)(l.NU,{movie:e,onCardSelect:()=>console.log("onCardSelect"),isPreviewMode:!0})})},e.id)))})]}),i.length>0&&(0,u.jsx)(n.A,{sx:{display:"flex",justifyContent:"center"},children:(0,u.jsx)(l.mg,{totalPages:Number(null===A||void 0===A||null===(e=A.getSavedMovies)||void 0===e?void 0:e.totalPages)>500?500:(null===A||void 0===A||null===(t=A.getSavedMovies)||void 0===t?void 0:t.totalPages)||1,page:h,paginationHandler:(e,t)=>{m(t),setTimeout((()=>{window.scrollTo({top:0,behavior:"smooth"})}),100)}})})]})})]})}},2718:(e,t,i)=>{i.d(t,{A:()=>l});var s=i(8903),a=i(7121),o=i(579);const l=()=>(0,o.jsx)(s.Ay,{container:!0,spacing:2,children:Array.from(new Array(8)).map(((e,t)=>(0,o.jsxs)(s.Ay,{item:!0,xs:12,md:4,lg:3,children:[(0,o.jsx)(a.A,{variant:"rectangular",height:431}),(0,o.jsx)(a.A,{variant:"text",height:32}),(0,o.jsx)(a.A,{variant:"text",height:32})]},t)))})}}]);
//# sourceMappingURL=81.e1d89e9d.chunk.js.map