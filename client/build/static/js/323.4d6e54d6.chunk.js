"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[323],{9427:(e,i,t)=>{t.d(i,{_:()=>c});var o=t(5043),a=t(9968),r=t(459);const s=r.J1`
  query GetSavedMovies($page: Int) {
    getSavedMovies(page: $page) {
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
`,d=r.J1`
  mutation RemoveMovie($id: ID!) {
    removeMovie(id: $id) {
      id
      movieId
      title
      releaseDate(format: "dd.MM.yyyy")
      image
    }
  }
`;var v=t(8029),l=t(5869);const c=()=>{const{state:e}=(0,o.useContext)(a.B),[i,t]=(0,o.useState)(!1),[r]=(0,v.n)(n),{loading:c,error:g,data:u,refetch:m}=(0,l.IT)(s,{variables:{page:1}}),[y]=(0,v.n)(d),[h,f]=(0,o.useState)([]);(0,o.useLayoutEffect)((()=>{e.user&&m()}),[e.user,m]),(0,o.useLayoutEffect)((()=>{u&&null!==u&&void 0!==u&&u.getSavedMovies&&(console.log("render"),f(u.getSavedMovies.results))}),[u]);return{savedMovies:h,addMovieToSaved:async e=>{t(!0);if(!h.find((i=>{let{id:t}=i;return t===e.id}))){f((i=>[...i,{...e,movieId:e.id}]));try{var i;const t={id:e.id,title:e.title,releaseDate:e.releaseDate,posterPath:e.image||"",genres:(null===e||void 0===e||null===(i=e.genres)||void 0===i?void 0:i.map((e=>e.id)))||[],adult:e.adult||!1,backdropPath:e.backdropPath||"",originalLanguage:e.originalLanguage||"",originalTitle:e.originalTitle||"",overview:e.overview||"",popularity:e.popularity||0,video:e.video||!1,voteAverage:e.voteAverage||0,voteCount:e.voteCount||0};return await r({variables:{movie:t}}),!0}catch(g){return console.error("Error saving movie:",g),!1}finally{t(!1)}}},removeMovieFromSaved:async e=>{t(!0);try{return await y({variables:{id:e.id}}),f((i=>i.filter((i=>{const t=!i.movieId||String(i.movieId)!==String(e.id);return String(i.id)!==String(e.id)&&t})))),!0}catch(g){return console.error("Error removing movie:",g),!1}finally{t(!1)}},savedMoviesLoading:i,loading:c,error:g}}},4323:(e,i,t)=>{t.r(i),t.d(i,{default:()=>p});var o=t(5869),a=t(6446),r=t(5865),s=t(8903),n=t(3336),d=t(5043),v=t(5475);const l=t(459).J1`
  query MoviesByIds($ids: [Int]) {
    moviesByIds(ids: $ids) {
      releaseDate(format: "dd MMM yyy")
      image: posterPath
      title
      id
      # adult
      # backdropPath
      # originalLanguage
      # originalTitle
      # overview
      # popularity
      # video
      voteAverage
      voteCount
    }
  }
`;var c=t(9576),g=t(2718),u=t(9968),m=t(3226),y=t(9427),h=t(3649),f=t(579);const p=()=>{const{savedMovies:e,addMovieToSaved:i,removeMovieFromSaved:t,savedMoviesLoading:p}=(0,y._)(),{state:M}=(0,d.useContext)(u.B),[x]=(0,v.ok)(),[A,S]=(0,d.useState)(""),[I,j]=(0,d.useState)({title:"",ids:[]}),[w,b]=(0,d.useState)("100vh"),{showNotification:C,NotificationComponent:k}=(0,h.i)(),{loading:D,error:E,data:$}=(0,o.IT)(l,{variables:{ids:I.ids}});(0,d.useEffect)((()=>{const e=x.get("ids").split(",").map((e=>+e)),i=x.get("title");j({title:i,ids:e})}),[x]),(0,d.useEffect)((()=>{const e=document.querySelector("header");if(e){const i=e.offsetHeight;b(`calc(100vh - ${i}px)`)}}),[]);return E?(0,f.jsx)("div",{children:"Error. Try again!"}):(0,f.jsxs)(a.A,{sx:{minHeight:w,display:"flex",flexDirection:"column",alignItems:"center",padding:3,backgroundColor:"#f5f5f5"},children:[(0,f.jsx)(c.hH,{user:M.user||null,isPreviewMode:!0,title:A,movieId:A,open:!!A,onClose:()=>{S("")},addFavoriteMovie:async e=>{await i(e)?C((0,f.jsx)(m.A,{id:"notification.movie_add_to_favorite_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"}):C("Error in saving movie","error",5e3,{vertical:"bottom",horizontal:"right"})},removeFavoriteMovie:async e=>{await t(e)?C((0,f.jsx)(m.A,{id:"notification.movie_removed_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"}):C("Error in removing movie","error",5e3,{vertical:"bottom",horizontal:"right"})},savedMovies:e,savedMoviesLoading:p}),(0,f.jsx)(r.A,{variant:"h4",gutterBottom:!0,children:I.title?I.title:"Recommended Movies"}),(0,f.jsx)(s.Ay,{item:!0,xs:12,md:8,sx:{width:"100%"},children:(0,f.jsx)(n.A,{sx:{padding:2,minHeight:"400px"},children:(0,f.jsxs)(a.A,{sx:{flexGrow:1},children:[D&&(0,g.A)(),$&&(0,f.jsx)(s.Ay,{container:!0,spacing:2,children:$.moviesByIds.map((e=>(0,f.jsx)(s.Ay,{item:!0,xs:12,md:3,lg:2,children:(0,f.jsx)(c.NU,{movie:e,onCardSelect:()=>console.log("onCardSelect"),openMovieDetailsById:S,isPreviewMode:!0})},e.id)))})]})})}),k]})}},2718:(e,i,t)=>{t.d(i,{A:()=>s});var o=t(8903),a=t(7121),r=t(579);const s=()=>(0,r.jsx)(o.Ay,{container:!0,spacing:2,children:Array.from(new Array(8)).map(((e,i)=>(0,r.jsxs)(o.Ay,{item:!0,xs:12,md:4,lg:3,children:[(0,r.jsx)(a.A,{variant:"rectangular",height:431}),(0,r.jsx)(a.A,{variant:"text",height:32}),(0,r.jsx)(a.A,{variant:"text",height:32})]},i)))})}}]);
//# sourceMappingURL=323.4d6e54d6.chunk.js.map