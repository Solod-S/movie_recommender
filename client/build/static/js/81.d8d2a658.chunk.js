"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[81],{3271:(e,t,i)=>{i.d(t,{O:()=>o});const o=12},298:(e,t,i)=>{i.d(t,{$:()=>n});var o=i(5043),a=i(3271),r=i(4544),s=i(8250);const n=()=>{const[e,t]=(0,o.useState)([]);(0,o.useLayoutEffect)((()=>{const e=(0,r.Ml)(s.YN);e&&t(e)}),[]);const i=(0,o.useCallback)((i=>{const o=e.length;!e.find((e=>{let{id:t}=e;return t===i.id}))&&o<a.O&&t((e=>{const t=[...e,i];return(0,r.gC)(s.YN,t),t}))}),[e]),n=(0,o.useCallback)((e=>{t((t=>{const i=t.filter((t=>{let{id:i}=t;return i!==e.id}));return(0,r.gC)(s.YN,i),i}))}),[e]);return{selectedMovies:e,selectMovie:i,deleteMovie:n}}},9427:(e,t,i)=>{i.d(t,{_:()=>c});var o=i(5043),a=i(9968),r=i(8029),s=i(5869),n=i(459);const l=n.J1`
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
`,d=n.J1`
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
`,v=n.J1`
  mutation RemoveMovie($id: ID!) {
    removeMovie(id: $id) {
      id
      movieId
      title
      releaseDate(format: "dd.MM.yyyy")
      image
    }
  }
`,c=()=>{const{state:e}=(0,o.useContext)(a.B),[t,i]=(0,o.useState)(!1),[n]=(0,r.n)(d),{loading:c,error:u,data:g,refetch:m}=(0,s.IT)(l,{variables:{page:1,all:!0}}),[f]=(0,r.n)(v),[h,M]=(0,o.useState)([]);(0,o.useLayoutEffect)((()=>{e.user&&m()}),[e.user,m]),(0,o.useLayoutEffect)((()=>{g&&null!==g&&void 0!==g&&g.getSavedMovies&&M(g.getSavedMovies.results)}),[g]);return{savedMovies:h,addMovieToSaved:async e=>{i(!0);if(!h.find((t=>{let{id:i}=t;return i===e.id}))){M((t=>[...t,{...e,movieId:e.id}]));try{var t;const i={id:e.id,title:e.title,releaseDate:e.releaseDate,image:e.image||"",genres:(null===e||void 0===e||null===(t=e.genres)||void 0===t?void 0:t.map((e=>e.id)))||[],adult:e.adult||!1,backdropPath:e.backdropPath||"",originalLanguage:e.originalLanguage||"",originalTitle:e.originalTitle||"",overview:e.overview||"",popularity:e.popularity||0,video:e.video||!1,voteAverage:e.voteAverage||0,voteCount:e.voteCount||0};return await n({variables:{movie:i}}),!0}catch(u){return console.error("Error saving movie:",u),!1}finally{i(!1)}}},removeMovieFromSaved:async e=>{i(!0);try{return await f({variables:{id:e.id}}),M((t=>t.filter((t=>{const i=!t.movieId||String(t.movieId)!==String(e.id);return String(t.id)!==String(e.id)&&i})))),!0}catch(u){return console.error("Error removing movie:",u),!1}finally{i(!1)}},savedMoviesLoading:t,loading:c,error:u}}},2081:(e,t,i)=>{i.r(t),i.d(t,{default:()=>x});var o=i(5043),a=i(5869);const r=i(459).J1`
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
`;var s=i(6446),n=i(8903),l=i(3336),d=i(3704),v=i(4316),c=i(2718),u=i(8250),g=i(9968),m=i(298),f=i(3649),h=i(3271),M=i(9427),y=i(3226),p=i(579);const x=()=>{const{state:e}=(0,o.useContext)(g.B),[t,i]=(0,o.useState)(""),[x,S]=(0,o.useState)(!1),[A,j]=(0,o.useState)([]),[b,I]=(0,o.useState)(1),[C,_]=(0,o.useState)(),[w,$]=(0,o.useState)(1),{showNotification:L,NotificationComponent:P}=(0,f.i)(),{selectedMovies:k,selectMovie:D,deleteMovie:E}=(0,m.$)(),{savedMovies:T,removeMovieFromSaved:z,addMovieToSaved:N,savedMoviesLoading:H}=(0,M._)(),{loading:B,error:q,data:F,refetch:J}=(0,a.IT)(r,{variables:{page:b}});(0,o.useEffect)((()=>{var e,t,i;(null===F||void 0===F||null===(e=F.getSavedMovies)||void 0===e||null===(t=e.results)||void 0===t?void 0:t.length)>0?($((null===F||void 0===F||null===(i=F.getSavedMovies)||void 0===i?void 0:i.totalPages)||1),j((e=>F.getSavedMovies.results.map((t=>{const i=e.find((e=>e.id===t.id));return{...t,image:i?i.image:t.image}}))))):j([])}),[F]),(0,o.useEffect)((()=>{const e=document.querySelector("header"),t=document.querySelector("footer");if(e){const i=e.offsetHeight,o=t.offsetHeight;_(`calc(100vh - ${i+o}px)`)}}),[]);return q?(console.log(`error in favorite page: ${q}`),(0,p.jsx)(v.gP,{})):(0,p.jsxs)(s.A,{sx:{minHeight:C,display:"flex",flexDirection:"column",alignItems:"center",padding:3,backgroundColor:"#f5f5f5"},children:[P,(0,p.jsx)(v.hH,{user:e.user||null,title:t,movieId:t,setMovieCardIsLoading:S,open:!!t,onClose:()=>{i("")},selectedMovies:k,selectMovie:e=>{const t=k.length;switch(!0){case!!k.find((t=>{let{id:i}=t;return i===e.id})):return void L((0,p.jsx)(y.A,{id:"notification.movie_already_selected"}),"error",5e3,{vertical:"bottom",horizontal:"right"});case t>=h.O:return void L((0,p.jsx)(y.A,{id:"notification.list_limit_reached"}),"error",5e3,{vertical:"bottom",horizontal:"right"});default:L((0,p.jsx)(y.A,{id:"notification.movie_added_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"})}D(e)},deleteMovie:e=>{L((0,p.jsx)(y.A,{id:"notification.movie_removed_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"}),E(e)},removeFavoriteMovie:async e=>{const t=T.length-1;await z(e)?(t%12===0&&b>1&&I((e=>e-1)),setTimeout((()=>{J()}),100),L((0,p.jsx)(y.A,{id:"notification.movie_removed_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"})):L("Error in removing movie","error",5e3,{vertical:"bottom",horizontal:"right"})},addFavoriteMovie:async e=>{await N(e)?(J(),L((0,p.jsx)(y.A,{id:"notification.movie_add_to_favorite_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"})):L("Error in saving movie","error",5e3,{vertical:"bottom",horizontal:"right"})},savedMovies:T,savedMoviesLoading:H}),(0,p.jsx)(n.Ay,{item:!0,xs:12,md:8,sx:{width:"100%"},children:(0,p.jsxs)(l.A,{sx:{padding:2,minHeight:"55vh"},children:[(0,p.jsxs)(s.A,{sx:{flexGrow:1,marginBottom:"16px"},children:[B&&(0,c.A)({favoriteMode:!0}),A&&(0,p.jsx)(n.Ay,{container:!0,spacing:2,children:A.map(((e,t)=>(0,p.jsx)(n.Ay,{item:!0,xs:12,md:3,lg:2,children:(0,p.jsx)(d.P.div,{className:"portfolio__item",variants:u.IM,initial:"hidden",animate:"visible",custom:t,children:(0,p.jsx)(v.NU,{movie:e,movieCardIsLoading:x,openMovieDetailsById:i,selected:k.find((t=>{let{id:i}=t;return i===e.id})),favorites:T.find((t=>{let{id:i,movieId:o}=t;return e.id===o})),isPreviewMode:!0})})},e.id)))})]}),A.length>0&&(0,p.jsx)(s.A,{sx:{display:"flex",justifyContent:"center"},children:(0,p.jsx)(v.mg,{totalPages:w,page:b,paginationHandler:(e,t)=>{I(t),setTimeout((()=>{window.scrollTo({top:0,behavior:"smooth"})}),100)}})})]})})]})}},2718:(e,t,i)=>{i.d(t,{A:()=>s});var o=i(8903),a=i(7121),r=i(579);const s=e=>{let{favoriteMode:t=!1}=e;return(0,r.jsx)(o.Ay,{container:!0,spacing:2,children:Array.from(new Array(8)).map(((e,i)=>(0,r.jsxs)(o.Ay,{item:!0,xs:12,md:t?3:4,lg:t?2:3,children:[(0,r.jsx)(a.A,{variant:"rectangular",height:431}),(0,r.jsx)(a.A,{variant:"text",height:32}),(0,r.jsx)(a.A,{variant:"text",height:32})]},i)))})}}}]);
//# sourceMappingURL=81.d8d2a658.chunk.js.map