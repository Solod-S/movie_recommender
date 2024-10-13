"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[323],{9427:(e,i,t)=>{t.d(i,{_:()=>c});var o=t(5043),a=t(9968),r=t(8029),s=t(5869),n=t(459);const d=n.J1`
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
`,v=n.J1`
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
`,l=n.J1`
  mutation RemoveMovie($id: ID!) {
    removeMovie(id: $id) {
      id
      movieId
      title
      releaseDate(format: "dd.MM.yyyy")
      image
    }
  }
`,c=()=>{const{state:e}=(0,o.useContext)(a.B),[i,t]=(0,o.useState)(!1),[n]=(0,r.n)(v),{loading:c,error:g,data:u,refetch:m}=(0,s.IT)(d,{variables:{page:1,all:!0}}),[y]=(0,r.n)(l),[h,f]=(0,o.useState)([]);(0,o.useLayoutEffect)((()=>{e.user&&m()}),[e.user,m]),(0,o.useLayoutEffect)((()=>{u&&null!==u&&void 0!==u&&u.getSavedMovies&&f(u.getSavedMovies.results)}),[u]);return{savedMovies:h,addMovieToSaved:async e=>{t(!0);if(!h.find((i=>{let{id:t}=i;return t===e.id}))){f((i=>[...i,{...e,movieId:e.id}]));try{var i;const t={id:e.id,title:e.title,releaseDate:e.releaseDate,image:e.image||"",genres:(null===e||void 0===e||null===(i=e.genres)||void 0===i?void 0:i.map((e=>e.id)))||[],adult:e.adult||!1,backdropPath:e.backdropPath||"",originalLanguage:e.originalLanguage||"",originalTitle:e.originalTitle||"",overview:e.overview||"",popularity:e.popularity||0,video:e.video||!1,voteAverage:e.voteAverage||0,voteCount:e.voteCount||0};return await n({variables:{movie:t}}),!0}catch(g){return console.error("Error saving movie:",g),!1}finally{t(!1)}}},removeMovieFromSaved:async e=>{t(!0);try{return await y({variables:{id:e.id}}),f((i=>i.filter((i=>{const t=!i.movieId||String(i.movieId)!==String(e.id);return String(i.id)!==String(e.id)&&t})))),!0}catch(g){return console.error("Error removing movie:",g),!1}finally{t(!1)}},savedMoviesLoading:i,loading:c,error:g}}},4323:(e,i,t)=>{t.r(i),t.d(i,{default:()=>M});var o=t(5043),a=t(5475),r=t(5869),s=t(6446),n=t(5865),d=t(8903),v=t(3336);const l=t(459).J1`
  query MoviesByIds($ids: [Int]) {
    moviesByIds(ids: $ids) {
      releaseDate(format: "dd MMM yyy")
      image: posterPath
      title
      id
      adult
      backdropPath
      originalLanguage
      originalTitle
      overview
      popularity
      video
      voteAverage
      voteCount
    }
  }
`;var c=t(4316),g=t(2718),u=t(9968),m=t(3226),y=t(9427),h=t(3649),f=t(579);const M=()=>{const{savedMovies:e,addMovieToSaved:i,removeMovieFromSaved:t,savedMoviesLoading:M}=(0,y._)(),{state:p}=(0,o.useContext)(u.B),[x]=(0,a.ok)(),[A,S]=(0,o.useState)(!1),[I,j]=(0,o.useState)(""),[C,w]=(0,o.useState)({title:"",ids:[]}),[b,$]=(0,o.useState)("100vh"),{showNotification:L,NotificationComponent:k}=(0,h.i)(),{loading:D,error:B,data:E}=(0,r.IT)(l,{variables:{ids:C.ids}});(0,o.useEffect)((()=>{const e=x.get("ids").split(",").map((e=>+e)),i=x.get("title");w({title:i,ids:e})}),[x]),(0,o.useEffect)((()=>{const e=document.querySelector("header"),i=document.querySelector("footer");if(e){const t=e.offsetHeight,o=i.offsetHeight;$(`calc(100vh - ${t+o}px)`)}}),[]);return B?(console.log(`error in recommendation page: ${B}`),(0,f.jsx)(c.gP,{})):(0,f.jsxs)(s.A,{sx:{minHeight:b,display:"flex",flexDirection:"column",alignItems:"center",padding:3,backgroundColor:"#f5f5f5"},children:[(0,f.jsx)(c.hH,{user:p.user||null,isPreviewMode:!0,title:I,movieId:I,setMovieCardIsLoading:S,open:!!I,onClose:()=>{j("")},addFavoriteMovie:async e=>{await i(e)?L((0,f.jsx)(m.A,{id:"notification.movie_add_to_favorite_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"}):L("Error in saving movie","error",5e3,{vertical:"bottom",horizontal:"right"})},removeFavoriteMovie:async e=>{await t(e)?L((0,f.jsx)(m.A,{id:"notification.movie_removed_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"}):L("Error in removing movie","error",5e3,{vertical:"bottom",horizontal:"right"})},savedMovies:e,savedMoviesLoading:M}),(0,f.jsx)(n.A,{variant:"h4",gutterBottom:!0,children:C.title?C.title:"Recommended Movies"}),(0,f.jsx)(d.Ay,{item:!0,xs:12,md:8,sx:{width:"100%"},children:(0,f.jsx)(v.A,{sx:{padding:2,minHeight:"400px"},children:(0,f.jsxs)(s.A,{sx:{flexGrow:1},children:[D&&(0,g.A)({favoriteMode:!0}),E&&(0,f.jsx)(d.Ay,{container:!0,spacing:2,children:E.moviesByIds.map((e=>(0,f.jsx)(d.Ay,{item:!0,xs:12,md:3,lg:2,children:(0,f.jsx)(c.NU,{movie:e,movieCardIsLoading:A,onCardSelect:()=>console.log("onCardSelect"),openMovieDetailsById:j,isPreviewMode:!0})},e.id)))})]})})}),k]})}},2718:(e,i,t)=>{t.d(i,{A:()=>s});var o=t(8903),a=t(7121),r=t(579);const s=e=>{let{favoriteMode:i=!1}=e;return(0,r.jsx)(o.Ay,{container:!0,spacing:2,children:Array.from(new Array(8)).map(((e,t)=>(0,r.jsxs)(o.Ay,{item:!0,xs:12,md:i?3:4,lg:i?2:3,children:[(0,r.jsx)(a.A,{variant:"rectangular",height:431}),(0,r.jsx)(a.A,{variant:"text",height:32}),(0,r.jsx)(a.A,{variant:"text",height:32})]},t)))})}}}]);
//# sourceMappingURL=323.d2e284ee.chunk.js.map