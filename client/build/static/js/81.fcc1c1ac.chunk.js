"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[81],{3271:(e,t,i)=>{i.d(t,{O:()=>o});const o=12},298:(e,t,i)=>{i.d(t,{$:()=>n});var o=i(5043),a=i(3271),r=i(4544),s=i(8250);const n=()=>{const[e,t]=(0,o.useState)([]);(0,o.useLayoutEffect)((()=>{const e=(0,r.Ml)(s.YN);e&&t(e)}),[]);const i=(0,o.useCallback)((i=>{const o=e.length,n=!e.find((e=>{let{id:t}=e;return t===i.id}));console.log("movie",i),n&&o<a.O&&t((e=>{const t=[...e,i];return(0,r.gC)(s.YN,t),t}))}),[e]),n=(0,o.useCallback)((e=>{t((t=>{const i=t.filter((t=>{let{id:i}=t;return i!==e.id}));return(0,r.gC)(s.YN,i),i}))}),[e]);return{selectedMovies:e,selectMovie:i,deleteMovie:n}}},9427:(e,t,i)=>{i.d(t,{_:()=>c});var o=i(5043),a=i(9968),r=i(459);const s=r.J1`
  query GetSavedMovies($page: Int, $all: Boolean) {
    getSavedMovies(page: $page, all: $all) {
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
`,n=r.J1`
  mutation SaveMovie($movie: MovieInput!) {
    saveMovie(movie: $movie) {
      id
      movieId
      title
      releaseDate(format: "dd.MM.yyyy")
      image
      voteAverage
      voteCount
    }
  }
`,l=r.J1`
  mutation RemoveMovie($id: ID!) {
    removeMovie(id: $id) {
      id
      movieId
      title
      releaseDate(format: "dd.MM.yyyy")
      image
    }
  }
`;var d=i(8029),v=i(5869);const c=()=>{const{state:e}=(0,o.useContext)(a.B),[t,i]=(0,o.useState)(!1),[r]=(0,d.n)(n),{loading:c,error:u,data:g,refetch:m}=(0,v.IT)(s,{variables:{page:1,all:!0}}),[f]=(0,d.n)(l),[h,y]=(0,o.useState)([]);(0,o.useLayoutEffect)((()=>{e.user&&m()}),[e.user,m]),(0,o.useLayoutEffect)((()=>{g&&null!==g&&void 0!==g&&g.getSavedMovies&&y(g.getSavedMovies.results)}),[g]);return{savedMovies:h,addMovieToSaved:async e=>{i(!0);if(!h.find((t=>{let{id:i}=t;return i===e.id}))){y((t=>[...t,{...e,movieId:e.id}]));try{var t;const i={id:e.id,title:e.title,releaseDate:e.releaseDate,image:e.image||"",genres:(null===e||void 0===e||null===(t=e.genres)||void 0===t?void 0:t.map((e=>e.id)))||[],adult:e.adult||!1,backdropPath:e.backdropPath||"",originalLanguage:e.originalLanguage||"",originalTitle:e.originalTitle||"",overview:e.overview||"",popularity:e.popularity||0,video:e.video||!1,voteAverage:e.voteAverage||0,voteCount:e.voteCount||0};return await r({variables:{movie:i}}),!0}catch(u){return console.error("Error saving movie:",u),!1}finally{i(!1)}}},removeMovieFromSaved:async e=>{i(!0);try{return await f({variables:{id:e.id}}),y((t=>t.filter((t=>{const i=!t.movieId||String(t.movieId)!==String(e.id);return String(t.id)!==String(e.id)&&i})))),!0}catch(u){return console.error("Error removing movie:",u),!1}finally{i(!1)}},savedMoviesLoading:t,loading:c,error:u}}},2081:(e,t,i)=>{i.r(t),i.d(t,{default:()=>p});var o=i(5869);const a=i(459).J1`
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
`;var r=i(5043),s=i(4316),n=i(6446),l=i(8903),d=i(3336),v=i(3704),c=i(2718),u=i(8250),g=i(9968),m=i(298),f=i(3226),h=i(3649),y=i(3271),M=i(9427),x=i(579);const p=()=>{var e,t;const{state:i}=(0,r.useContext)(g.B),[p,S]=(0,r.useState)(""),[A,j]=(0,r.useState)([]),[b,C]=(0,r.useState)(1),[I,_]=(0,r.useState)(),{showNotification:w,NotificationComponent:$}=(0,h.i)(),{selectedMovies:P,selectMovie:k,deleteMovie:D}=(0,m.$)(),{savedMovies:E,removeMovieFromSaved:z,addMovieToSaved:L,savedMoviesLoading:N}=(0,M._)(),{loading:T,error:H,data:B,refetch:q}=(0,o.IT)(a,{variables:{page:b}});(0,r.useEffect)((()=>{var e,t;(null===B||void 0===B||null===(e=B.getSavedMovies)||void 0===e||null===(t=e.results)||void 0===t?void 0:t.length)>0?j((e=>B.getSavedMovies.results.map((t=>{const i=e.find((e=>e.id===t.id));return{...t,image:i?i.image:t.image}})))):j([])}),[B]),(0,r.useEffect)((()=>{const e=document.querySelector("header"),t=document.querySelector("footer");if(e){const i=e.offsetHeight,o=t.offsetHeight;_(`calc(100vh - ${i+o}px)`)}}),[]);return H?(console.log(`error in favorite page: ${H}`),(0,x.jsx)(s.gP,{})):(0,x.jsxs)(n.A,{sx:{minHeight:I,display:"flex",flexDirection:"column",alignItems:"center",padding:3,backgroundColor:"#f5f5f5"},children:[$,(0,x.jsx)(s.hH,{user:i.user||null,title:p,movieId:p,open:!!p,onClose:()=>{S("")},selectedMovies:P,selectMovie:e=>{const t=P.length;switch(!0){case!!P.find((t=>{let{id:i}=t;return i===e.id})):return void w((0,x.jsx)(f.A,{id:"notification.movie_already_selected"}),"error",5e3,{vertical:"bottom",horizontal:"right"});case t>=y.O:return void w((0,x.jsx)(f.A,{id:"notification.list_limit_reached"}),"error",5e3,{vertical:"bottom",horizontal:"right"});default:w((0,x.jsx)(f.A,{id:"notification.movie_added_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"})}k(e)},deleteMovie:e=>{w((0,x.jsx)(f.A,{id:"notification.movie_removed_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"}),D(e)},removeFavoriteMovie:async e=>{await z(e)?(q(),w((0,x.jsx)(f.A,{id:"notification.movie_removed_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"})):w("Error in removing movie","error",5e3,{vertical:"bottom",horizontal:"right"})},addFavoriteMovie:async e=>{console.log("movie",e);await L(e)?(q(),w((0,x.jsx)(f.A,{id:"notification.movie_add_to_favorite_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"})):w("Error in saving movie","error",5e3,{vertical:"bottom",horizontal:"right"})},savedMovies:E,savedMoviesLoading:N}),(0,x.jsx)("dix",{style:{height:"80%"}}),(0,x.jsx)(l.Ay,{item:!0,xs:12,md:8,sx:{width:"100%"},children:(0,x.jsxs)(d.A,{sx:{padding:2,minHeight:"400px"},children:[(0,x.jsxs)(n.A,{sx:{flexGrow:1,marginBottom:"16px"},children:[T&&(0,c.A)({favoriteMode:!0}),A&&(0,x.jsx)(l.Ay,{container:!0,spacing:2,children:A.map(((e,t)=>(0,x.jsx)(l.Ay,{item:!0,xs:12,md:3,lg:2,children:(0,x.jsx)(v.P.div,{className:"portfolio__item",variants:u.IM,initial:"hidden",animate:"visible",custom:t,children:(0,x.jsx)(s.NU,{movie:e,onCardSelect:()=>console.log("onCardSelect"),openMovieDetailsById:S,selected:P.find((t=>{let{id:i}=t;return i===e.id})),favorites:E.find((t=>{let{id:i,movieId:o}=t;return e.id===o})),isPreviewMode:!0})})},e.id)))})]}),A.length>0&&(0,x.jsx)(n.A,{sx:{display:"flex",justifyContent:"center"},children:(0,x.jsx)(s.mg,{totalPages:Number(null===B||void 0===B||null===(e=B.getSavedMovies)||void 0===e?void 0:e.totalPages)>500?500:(null===B||void 0===B||null===(t=B.getSavedMovies)||void 0===t?void 0:t.totalPages)||1,page:b,paginationHandler:(e,t)=>{C(t),setTimeout((()=>{window.scrollTo({top:0,behavior:"smooth"})}),100)}})})]})})]})}},2718:(e,t,i)=>{i.d(t,{A:()=>s});var o=i(8903),a=i(7121),r=i(579);const s=e=>{let{favoriteMode:t=!1}=e;return(0,r.jsx)(o.Ay,{container:!0,spacing:2,children:Array.from(new Array(8)).map(((e,i)=>(0,r.jsxs)(o.Ay,{item:!0,xs:12,md:t?3:4,lg:t?2:3,children:[(0,r.jsx)(a.A,{variant:"rectangular",height:431}),(0,r.jsx)(a.A,{variant:"text",height:32}),(0,r.jsx)(a.A,{variant:"text",height:32})]},i)))})}}}]);
//# sourceMappingURL=81.fcc1c1ac.chunk.js.map