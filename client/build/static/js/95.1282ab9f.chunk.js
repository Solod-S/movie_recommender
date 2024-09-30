"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[95],{9427:(e,i,t)=>{t.d(i,{_:()=>c});var a=t(5043),o=t(9968),r=t(459);const s=r.J1`
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
`;var d=t(8029),v=t(5869);const c=()=>{const{state:e}=(0,a.useContext)(o.B),[i,t]=(0,a.useState)(!1),[r]=(0,d.n)(n),{loading:c,error:m,data:u,refetch:g}=(0,v.IT)(s,{variables:{page:1}}),[y]=(0,d.n)(l),[h,f]=(0,a.useState)([]);(0,a.useLayoutEffect)((()=>{e.user&&g()}),[e.user,g]),(0,a.useLayoutEffect)((()=>{u&&null!==u&&void 0!==u&&u.getSavedMovies&&(console.log("render"),f(u.getSavedMovies.results))}),[u]);return{savedMovies:h,addMovieToSaved:async e=>{t(!0);if(!h.find((i=>{let{id:t}=i;return t===e.id}))){f((i=>[...i,{...e,movieId:e.id}]));try{var i;const t={id:e.id,title:e.title,releaseDate:e.releaseDate,posterPath:e.image||"",genres:(null===e||void 0===e||null===(i=e.genres)||void 0===i?void 0:i.map((e=>e.id)))||[],adult:e.adult||!1,backdropPath:e.backdropPath||"",originalLanguage:e.originalLanguage||"",originalTitle:e.originalTitle||"",overview:e.overview||"",popularity:e.popularity||0,video:e.video||!1,voteAverage:e.voteAverage||0,voteCount:e.voteCount||0};return await r({variables:{movie:t}}),!0}catch(m){return console.error("Error saving movie:",m),!1}finally{t(!1)}}},removeMovieFromSaved:async e=>{t(!0);try{return await y({variables:{id:e.id}}),f((i=>i.filter((i=>{const t=!i.movieId||String(i.movieId)!==String(e.id);return String(i.id)!==String(e.id)&&t})))),!0}catch(m){return console.error("Error removing movie:",m),!1}finally{t(!1)}},savedMoviesLoading:i,loading:c,error:m}}},8095:(e,i,t)=>{t.r(i),t.d(i,{default:()=>j});var a=t(5043),o=t(3704),r=t(6446),s=t(8903),n=t(3336),l=t(9576),d=t(5869);const v=t(459).J1`
  query Movies($filter: MoviesFilterInput) {
    movies(filter: $filter) {
      page
      totalResults
      totalPages
      results {
        id
        title
        image: posterPath
        releaseDate(format: "dd.MM.yyyy")
        voteAverage
        voteCount
      }
    }
  }
`;var c=t(4544),m=t(8250);var u=t(3649),g=t(2718);var y=t(3226),h=t(9968),f=t(9427),p=t(579);const M=[{id:28,name:"Action"},{id:12,name:"Adventure"},{id:16,name:"Animation"},{id:35,name:"Comedy"},{id:80,name:"Crime"},{id:99,name:"Documentary"},{id:18,name:"Drama"},{id:10751,name:"Family"},{id:14,name:"Fantasy"},{id:36,name:"History"},{id:27,name:"Horror"},{id:10402,name:"Music"},{id:9648,name:"Mystery"},{id:10749,name:"Romance"},{id:878,name:"Science Fiction"},{id:10770,name:"TV Movie"},{id:53,name:"Thriller"},{id:10752,name:"War"},{id:37,name:"Western"}],x=(new Date).getFullYear(),A=Array.from({length:x-1900+1},((e,i)=>x-i)),j=()=>{var e,i;const{savedMovies:t,addMovieToSaved:x,removeMovieFromSaved:j,savedMoviesLoading:b}=(0,f._)(),{state:C}=a.useContext(h.B),{filter:S,setPage:_,setFilter:w}=(()=>{const[e,i]=(0,a.useState)({page:1,sortBy:"popularity",sortDirection:m.Pg.DESC,search:""}),t=(0,a.useCallback)((t=>{i({...e,page:t})}),[e]),o=(0,a.useCallback)((t=>{i({...e,...t,page:e.search!==t.search||e.genre!==t.genre||e.year!==t.year?1:t.page,year:+t.year,genre:""===t.genre?NaN:t.genre,primaryReleaseYear:+t.primaryReleaseYear})}),[e]);return{filter:e,setPage:t,setFilter:o}})(),{selectedMovies:D,selectMovie:I,deleteMovie:P}=(()=>{const[e,i]=(0,a.useState)([]);(0,a.useLayoutEffect)((()=>{const e=(0,c.Ml)(m.YN);e&&i(e)}),[]);const t=(0,a.useCallback)((t=>{const a=e.length;!e.find((e=>{let{id:i}=e;return i===t.id}))&&a<12&&i((e=>{const i=[...e,t];return(0,c.gC)(m.YN,i),i}))}),[e]),o=(0,a.useCallback)((e=>{i((i=>{const t=i.filter((i=>{let{id:t}=i;return t!==e.id}));return(0,c.gC)(m.YN,t),t}))}),[e]);return{selectedMovies:e,selectMovie:t,deleteMovie:o}})(),[F,T]=a.useState(""),[k,N]=a.useState([]),{showNotification:E,NotificationComponent:z}=(0,u.i)(),{loading:L,error:$,data:B}=(0,d.IT)(v,{variables:{filter:{page:S.page,sortBy:S.sortBy,sortDirection:S.sortDirection,year:S.year,genre:S.genre,search:S.search}}});a.useEffect((()=>{var e;(null===B||void 0===B||null===(e=B.movies)||void 0===e?void 0:e.results.length)>0?N((e=>B.movies.results.map((i=>{const t=e.find((e=>e.id===i.id));return{...i,image:t?t.image:i.image}})))):N([])}),[B]);const R=e=>{const i=D.length;switch(!0){case!!D.find((i=>{let{id:t}=i;return t===e.id})):return void E((0,p.jsx)(y.A,{id:"notification.movie_already_selected"}),"error",5e3,{vertical:"bottom",horizontal:"right"});case i>=12:return void E((0,p.jsx)(y.A,{id:"notification.list_limit_reached"}),"error",5e3,{vertical:"bottom",horizontal:"right"});default:E((0,p.jsx)(y.A,{id:"notification.movie_added_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"})}I(e)},Y=e=>{E((0,p.jsx)(y.A,{id:"notification.movie_removed_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"}),P(e)};return $?(0,p.jsx)(l.gP,{}):(0,p.jsxs)(r.A,{sx:{flexGrow:1,marginTop:2},children:[(0,p.jsx)(l.hH,{user:C.user||null,title:F,movieId:F,open:!!F,onClose:()=>{T("")},selectedMovies:D,selectMovie:R,deleteMovie:Y,addFavoriteMovie:async e=>{await x(e)?E((0,p.jsx)(y.A,{id:"notification.movie_add_to_favorite_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"}):E("Error in saving movie","error",5e3,{vertical:"bottom",horizontal:"right"})},removeFavoriteMovie:async e=>{await j(e)?E((0,p.jsx)(y.A,{id:"notification.movie_removed_successfully"}),"success",1e3,{vertical:"bottom",horizontal:"right"}):E("Error in removing movie","error",5e3,{vertical:"bottom",horizontal:"right"})},savedMovies:t,savedMoviesLoading:b}),z,(0,p.jsxs)(s.Ay,{container:!0,spacing:2,children:[(0,p.jsx)(s.Ay,{item:!0,xs:12,children:(0,p.jsx)(l.Cu,{initialValues:S,onSubmit:e=>{w(e)},genres:M,years:A})}),(0,p.jsx)(s.Ay,{item:!0,xs:12,md:8,children:(0,p.jsxs)(n.A,{children:[(0,p.jsxs)(r.A,{sx:{flexGrow:1,padding:2},children:[L&&(0,g.A)(),k&&k.length>0&&(0,p.jsx)(s.Ay,{container:!0,spacing:2,children:k.map(((e,i)=>(0,p.jsx)(s.Ay,{item:!0,xs:12,md:4,lg:3,children:(0,p.jsx)(o.P.div,{className:"portfolio__item",variants:m.IM,initial:"hidden",animate:"visible",custom:i,children:(0,p.jsx)(l.NU,{movie:e,onCardSelect:R,openMovieDetailsById:T,selected:D.find((i=>{let{id:t}=i;return t===e.id})),favorites:t.find((i=>{let{id:t,movieId:a}=i;return t===e.id||e.id===a}))})})},e.id)))})]}),(0,p.jsx)(r.A,{mt:2,pb:2,sx:{display:"flex",justifyContent:"center"},children:(0,p.jsx)(l.mg,{totalPages:Number(null===B||void 0===B||null===(e=B.movies)||void 0===e?void 0:e.totalPages)>500?500:(null===B||void 0===B||null===(i=B.movies)||void 0===i?void 0:i.totalPages)||1,page:S.page,paginationHandler:(e,i)=>{_(i),setTimeout((()=>{window.scrollTo({top:0,behavior:"smooth"})}),100)}})})]})}),(0,p.jsx)(s.Ay,{item:!0,xs:12,md:4,children:(0,p.jsx)(l.C6,{selectedMovies:D,onCardDelete:Y})},"Selected Movie")]})]})}},2718:(e,i,t)=>{t.d(i,{A:()=>s});var a=t(8903),o=t(7121),r=t(579);const s=()=>(0,r.jsx)(a.Ay,{container:!0,spacing:2,children:Array.from(new Array(8)).map(((e,i)=>(0,r.jsxs)(a.Ay,{item:!0,xs:12,md:4,lg:3,children:[(0,r.jsx)(o.A,{variant:"rectangular",height:431}),(0,r.jsx)(o.A,{variant:"text",height:32}),(0,r.jsx)(o.A,{variant:"text",height:32})]},i)))})}}]);
//# sourceMappingURL=95.1282ab9f.chunk.js.map