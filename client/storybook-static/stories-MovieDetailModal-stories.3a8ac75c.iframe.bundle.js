"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[1],{"./src/stories/MovieDetailModal.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>MovieDetailModal_stories});__webpack_require__("./node_modules/react/index.js");var MovieDetailModal=__webpack_require__("./src/components/MovieDetailModal/index.js"),v4=__webpack_require__("./node_modules/@storybook/addon-actions/node_modules/uuid/dist/esm-browser/v4.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_=__webpack_require__("storybook/internal/preview-errors"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a};function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_.ImplicitActionsDuringRendering({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id="object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.A)():Date.now().toString(36)+Math.random().toString(36).substring(2),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler.implicit=options.implicit,handler}var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const MovieDetailModal_stories={title:"Card/Movie Card Detail",component:MovieDetailModal.A,tags:["autodocs"],argTypes:{onClose:{action:"closed"},selectMovie:{action:"selected"},deleteMovie:{action:"deleted"}}},Default=(args=>(0,jsx_runtime.jsx)(MovieDetailModal.A,{...args})).bind({});Default.args={open:!0,movieId:"533535",isPreviewMode:!1,selectedMovies:[],selectMovie:action("selectMovie"),deleteMovie:action("deleteMovie"),onClose:action("onClose")};const __namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <MovieDetailModal {...args} />",...Default.parameters?.docs?.source}}}},"./src/components/MovieDetailModal/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>components_MovieDetailModal});var react=__webpack_require__("./node_modules/react/index.js"),useQuery=__webpack_require__("./node_modules/@apollo/client/react/hooks/useQuery.js"),useMediaQuery=__webpack_require__("./node_modules/@mui/system/esm/useMediaQuery/useMediaQuery.js"),Typography=__webpack_require__("./node_modules/@mui/material/Typography/Typography.js"),Modal=__webpack_require__("./node_modules/@mui/material/Modal/Modal.js"),Box=__webpack_require__("./node_modules/@mui/material/Box/Box.js"),IconButton=__webpack_require__("./node_modules/@mui/material/IconButton/IconButton.js"),Divider=__webpack_require__("./node_modules/@mui/material/Divider/Divider.js"),Tooltip=__webpack_require__("./node_modules/@mui/material/Tooltip/Tooltip.js"),Button=__webpack_require__("./node_modules/@mui/material/Button/Button.js"),List=__webpack_require__("./node_modules/@mui/material/List/List.js"),ListItem=__webpack_require__("./node_modules/@mui/material/ListItem/ListItem.js"),ListItemAvatar=__webpack_require__("./node_modules/@mui/material/ListItemAvatar/ListItemAvatar.js"),Avatar=__webpack_require__("./node_modules/@mui/material/Avatar/Avatar.js"),ListItemText=__webpack_require__("./node_modules/@mui/material/ListItemText/ListItemText.js"),Close=__webpack_require__("./node_modules/@mui/icons-material/Close.js"),formatDistanceToNow=__webpack_require__("./node_modules/date-fns/formatDistanceToNow.js"),lib=__webpack_require__("./node_modules/graphql-tag/lib/index.js");const MOVIE_DETAIL_BY_ID_QUERY=lib.J1`
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
      genres {
        id
        name
      }
    }
  }
`,TRAILERS_BY_ID_QUERY=lib.J1`
  query TrailersById($id: Int) {
    trailersById(id: $id) {
      key
      site
      type
    }
  }
`,CASTS_BY_ID_QUERY=lib.J1`
  query CreditsById($id: Int) {
    creditsById(id: $id) {
      adult
      castId
      character
      creditId
      gender
      id
      knownForDepartment
      name
      order
      originalName
      popularity
      posterPath
    }
  }
`,REVIEWS_BY_ID_QUERY=lib.J1`
  query Reviews($filter: ReviewsFilterInput!) {
    reviews(filter: $filter) {
      page
      results {
        author
        authorDetails {
          name
          username
          avatar_path
          rating
        }
        content
        createdAt
        id
        updatedAt
        url
      }
      totalPages
      totalResults
    }
  }
`;var poster=__webpack_require__("./src/assets/poster.jpg"),message=__webpack_require__("./node_modules/react-intl/lib/src/components/message.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const MovieDetailModal=_ref=>{var _movie$genres;let{user,isPreviewMode=!0,open=!1,selectedMovies=[],savedMovies=[],movieId,savedMoviesLoading,onClose=()=>{},selectMovie=()=>{},deleteMovie=()=>{},addFavoriteMovie=()=>{},removeFavoriteMovie=()=>{},setMovieCardIsLoading=()=>{}}=_ref;const{loading,error,data}=(0,useQuery.IT)(MOVIE_DETAIL_BY_ID_QUERY,{variables:{ids:[+movieId]},skip:!movieId||""===movieId}),{data:trailersData}=(0,useQuery.IT)(TRAILERS_BY_ID_QUERY,{variables:{id:+movieId},skip:!movieId||""===movieId}),{data:castsData}=(0,useQuery.IT)(CASTS_BY_ID_QUERY,{variables:{id:+movieId},skip:!movieId||""===movieId}),{data:reviewsData,refetch}=(0,useQuery.IT)(REVIEWS_BY_ID_QUERY,{variables:{filter:{page:1,id:+movieId}},skip:!movieId||isNaN(Number(movieId))||Number(movieId)<=0});(0,react.useEffect)((()=>{if(movieId&&!isNaN(Number(movieId))&&Number(movieId)>0){const fetchMoviesDetail=async()=>{try{setMovieCardIsLoading(!0);const result=await refetch();console.log("result",result)}catch(error){console.log("error in fetchMoviesDetail",error)}finally{setMovieCardIsLoading(!1)}};fetchMoviesDetail()}}),[movieId,refetch]);const[trailerUrl,setTrailerUrl]=(0,react.useState)(null),[casts,setCasts]=(0,react.useState)([]),[reviews,setReviews]=(0,react.useState)([]),isLargeScreen=(0,useMediaQuery.A)("(min-width:1280px)"),contentStyle={display:"flex",flexDirection:isLargeScreen?"row":"column"},imageStyle={width:isLargeScreen?"40%":"100%",marginRight:isLargeScreen?"20px":"0",marginBottom:isLargeScreen?"0":"20px",borderRadius:"10px"},textContentStyle={width:isLargeScreen?"60%":"100%"},style={position:"absolute",borderRadius:"15px",top:"50%",left:"50%",transform:"translate(-50%, -50%)",bgcolor:"background.paper",boxShadow:24,p:4,maxHeight:"90vh",overflowY:"auto",scrollbarWidth:"thin","&::-webkit-scrollbar":{width:"6px"},"&::-webkit-scrollbar-track":{backgroundColor:"transparent"},"&::-webkit-scrollbar-thumb":{backgroundColor:"#888",borderRadius:"10px"},"&::-webkit-scrollbar-thumb:hover":{backgroundColor:"#555"}};isLargeScreen||(style.minWidth="90%");if((0,react.useEffect)((()=>{var _trailersData$trailer,_castsData$creditsByI,_reviewsData$reviews,_reviewsData$reviews$;if(trailersData&&(null==trailersData||null===(_trailersData$trailer=trailersData.trailersById)||void 0===_trailersData$trailer?void 0:_trailersData$trailer.length)>0){const trailer=trailersData.trailersById.find((video=>"Trailer"===video.type&&"YouTube"===video.site));trailer&&setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`)}return castsData&&(null==castsData||null===(_castsData$creditsByI=castsData.creditsById)||void 0===_castsData$creditsByI?void 0:_castsData$creditsByI.length)>0&&setCasts(castsData.creditsById.slice(0,10)),reviewsData&&(null==reviewsData||null===(_reviewsData$reviews=reviewsData.reviews)||void 0===_reviewsData$reviews||null===(_reviewsData$reviews$=_reviewsData$reviews.results)||void 0===_reviewsData$reviews$?void 0:_reviewsData$reviews$.length)>0&&setReviews(reviewsData.reviews.results.slice(0,5)),()=>{setTrailerUrl(null),setCasts([]),setReviews([])}}),[trailersData,castsData,reviewsData]),loading)return(0,jsx_runtime.jsx)(Typography.A,{children:"Loading..."});if(error)return(0,jsx_runtime.jsx)(Typography.A,{children:"Error loading data"});const movie=null==data?void 0:data.moviesByIds[0];return(0,jsx_runtime.jsx)(Modal.A,{open,onClose,"aria-label":"modal-title",children:(0,jsx_runtime.jsxs)(Box.A,{sx:style,children:[(0,jsx_runtime.jsx)(IconButton.A,{"aria-label":"close",onClick:onClose,sx:{position:"absolute",right:8,top:8},children:(0,jsx_runtime.jsx)(Close.A,{})}),(0,jsx_runtime.jsxs)(Box.A,{sx:contentStyle,children:[(0,jsx_runtime.jsxs)(Box.A,{sx:imageStyle,children:[(0,jsx_runtime.jsx)("img",{src:null!=movie&&movie.image?null==movie?void 0:movie.image:poster,alt:null==movie?void 0:movie.title,style:{width:"100%",borderRadius:"10px"}}),(0,jsx_runtime.jsx)(Divider.A,{sx:{my:1}}),(0,jsx_runtime.jsxs)(Typography.A,{variant:"body1",children:[(0,jsx_runtime.jsxs)("strong",{children:[(0,jsx_runtime.jsx)(message.A,{id:"movie_details.original_title"}),":"]})," ",null==movie?void 0:movie.originalTitle]}),(0,jsx_runtime.jsxs)(Typography.A,{variant:"body1",children:[(0,jsx_runtime.jsxs)("strong",{children:[(0,jsx_runtime.jsx)(message.A,{id:"movie_details.vote"}),":"]})," ",(null==movie?void 0:movie.voteAverage)&&Number(null==movie?void 0:movie.voteAverage.toFixed(1))]}),(0,jsx_runtime.jsxs)(Typography.A,{variant:"body1",children:[(0,jsx_runtime.jsxs)("strong",{children:[(0,jsx_runtime.jsx)(message.A,{id:"movie_details.release_date"}),":"]})," ",null==movie?void 0:movie.releaseDate]}),(0,jsx_runtime.jsxs)(Typography.A,{variant:"body1",children:[(0,jsx_runtime.jsxs)("strong",{children:[(0,jsx_runtime.jsx)(message.A,{id:"movie_details.genre"}),":"]})," ",(null==movie||null===(_movie$genres=movie.genres)||void 0===_movie$genres?void 0:_movie$genres.length)>0&&movie.genres.map(((_ref2,index)=>{let{name}=_ref2;return index+1<movie.genres.length?`${name}, `:name}))]}),casts.length>0&&(0,jsx_runtime.jsxs)(Typography.A,{variant:"body1",children:[(0,jsx_runtime.jsxs)("strong",{children:[(0,jsx_runtime.jsx)(message.A,{id:"movie_details.cast",defaultMessage:"Cast"}),":"]})," ",casts.map(((actor,index)=>(0,jsx_runtime.jsxs)(react.Fragment,{children:[(0,jsx_runtime.jsx)(Tooltip.A,{title:(0,jsx_runtime.jsx)("img",{src:actor.posterPath,alt:actor.name,style:{width:"100px",height:"150px"}}),arrow:!0,children:(0,jsx_runtime.jsx)("span",{style:{cursor:"pointer"},children:actor.name})}),index<casts.length-1?", ":"..."]},actor.id)))]}),(0,jsx_runtime.jsx)(Divider.A,{sx:{my:1}})]}),(0,jsx_runtime.jsxs)(Box.A,{sx:textContentStyle,children:[(0,jsx_runtime.jsx)(Typography.A,{id:"modal-title",variant:"h5",component:"h2",children:null==movie?void 0:movie.title}),trailerUrl&&(0,jsx_runtime.jsx)(Box.A,{sx:{width:"100%",height:"315px",marginTop:"20px",borderRadius:"10px"},children:(0,jsx_runtime.jsx)("iframe",{width:"100%",height:"100%",src:trailerUrl,title:"Movie Trailer",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})}),(0,jsx_runtime.jsx)(Typography.A,{variant:"body1",sx:{mt:2},children:null==movie?void 0:movie.overview}),isPreviewMode?(0,jsx_runtime.jsx)(Box.A,{sx:{display:"flex",justifyContent:"center",gap:"10px",mt:2},children:user&&(Array.isArray(savedMovies)&&!savedMovies.some((sm=>sm.movieId===(null==movie?void 0:movie.id)))?(0,jsx_runtime.jsx)(Button.A,{variant:"contained",disabled:!Boolean(null==data?void 0:data.moviesByIds[0])||savedMoviesLoading,color:"primary",sx:{background:"#FFBC01",flex:.4,transition:"transform 0.3s ease","&:hover":{transform:"scale(1.03)",background:"#FFBC01"}},onClick:()=>addFavoriteMovie(movie),children:(0,jsx_runtime.jsx)(message.A,{id:"movie_details.add_to_favorite_btn"})}):(0,jsx_runtime.jsx)(Button.A,{variant:"contained",disabled:!Boolean(null==data?void 0:data.moviesByIds[0])||savedMoviesLoading,color:"error",sx:{background:"#B2B2B2",flex:.4,transition:"transform 0.3s ease","&:hover":{transform:"scale(1.03)",background:"#B2B2B2"}},onClick:()=>removeFavoriteMovie(movie),children:(0,jsx_runtime.jsx)(message.A,{id:"movie_details.remove_from_favorite_btn"})}))}):(0,jsx_runtime.jsxs)(Box.A,{sx:{display:"flex",justifyContent:"center",gap:"10px",mt:2},children:[null!=selectedMovies&&selectedMovies.some((sm=>sm.id===(null==movie?void 0:movie.id)))?(0,jsx_runtime.jsx)(Button.A,{variant:"contained",disabled:!Boolean(null==data?void 0:data.moviesByIds[0]),color:"error",sx:{flex:user?.4:.8,transition:"transform 0.3s ease","&:hover":{transform:"scale(1.03)"}},onClick:()=>deleteMovie(movie),children:(0,jsx_runtime.jsx)(message.A,{id:"movie_details.remove_selected_btn"})}):(0,jsx_runtime.jsx)(Button.A,{variant:"contained",disabled:!Boolean(null==data?void 0:data.moviesByIds[0]),color:"primary",sx:{flex:user?.4:.8,transition:"transform 0.3s ease","&:hover":{transform:"scale(1.03)"}},onClick:()=>selectMovie(movie),children:(0,jsx_runtime.jsx)(message.A,{id:"movie_details.add_to_selected_btn"})}),user&&(Array.isArray(savedMovies)&&!savedMovies.some((sm=>sm.movieId===(null==movie?void 0:movie.id)))?(0,jsx_runtime.jsx)(Button.A,{variant:"contained",disabled:!Boolean(null==data?void 0:data.moviesByIds[0])||savedMoviesLoading,color:"primary",sx:{background:"#FFBC01",flex:.4,transition:"transform 0.3s ease","&:hover":{transform:"scale(1.03)",background:"#FFBC01"}},onClick:()=>addFavoriteMovie(movie),children:(0,jsx_runtime.jsx)(message.A,{id:"movie_details.add_to_favorite_btn"})}):(0,jsx_runtime.jsx)(Button.A,{variant:"contained",disabled:!Boolean(null==data?void 0:data.moviesByIds[0])||savedMoviesLoading,color:"error",sx:{background:"#B2B2B2",flex:.4,transition:"transform 0.3s ease","&:hover":{transform:"scale(1.03)",background:"#B2B2B2"}},onClick:()=>removeFavoriteMovie(movie),children:(0,jsx_runtime.jsx)(message.A,{id:"movie_details.remove_from_favorite_btn"})}))]}),reviews&&reviews.length>0&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Typography.A,{variant:"h6",gutterBottom:!0,sx:{textAlign:"center",marginTop:"16px"},children:(0,jsx_runtime.jsx)(message.A,{id:"movie_details.reviews"})}),(0,jsx_runtime.jsx)(List.A,{sx:{maxHeight:"350px",overflow:"auto",scrollbarWidth:"thin","&::-webkit-scrollbar":{width:"6px"},"&::-webkit-scrollbar-track":{backgroundColor:"transparent"},"&::-webkit-scrollbar-thumb":{backgroundColor:"#888",borderRadius:"10px"},"&::-webkit-scrollbar-thumb:hover":{backgroundColor:"#555"}},children:reviews.map((review=>(0,jsx_runtime.jsxs)(react.Fragment,{children:[(0,jsx_runtime.jsxs)(ListItem.Ay,{children:[(0,jsx_runtime.jsx)(ListItemAvatar.A,{children:(0,jsx_runtime.jsx)(Avatar.A,{src:review.authorDetails.avatar_path,alt:review.authorDetails.name||review.author})}),(0,jsx_runtime.jsx)(ListItemText.A,{primary:(0,jsx_runtime.jsx)(Typography.A,{variant:"body1",component:"div",fontWeight:"bold",children:review.authorDetails.name||review.author}),secondary:(0,jsx_runtime.jsxs)(Box.A,{children:[(0,jsx_runtime.jsx)(Typography.A,{variant:"body2",color:"textPrimary",component:"div",children:(0,jsx_runtime.jsx)("span",{dangerouslySetInnerHTML:{__html:review.content}})}),(0,jsx_runtime.jsx)(Typography.A,{variant:"body2",color:"textSecondary",children:(0,formatDistanceToNow.m)(new Date(review.createdAt),{addSuffix:!0})})]})})]}),(0,jsx_runtime.jsx)(Divider.A,{variant:"inset",component:"li"})]},review.id)))})]})]})]})]})})},components_MovieDetailModal=MovieDetailModal;MovieDetailModal.__docgenInfo={description:"",methods:[],displayName:"MovieDetailModal",props:{isPreviewMode:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1},open:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},selectedMovies:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"shape",value:{__typename:{name:"string",required:!0},id:{name:"string",required:!0},title:{name:"string",required:!0},image:{name:"string",required:!0},releaseDate:{name:"string",required:!0},voteAverage:{name:"number",required:!0},voteCount:{name:"number",required:!0}}}},required:!1},savedMovies:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"shape",value:{__typename:{name:"string",required:!0},id:{name:"string",required:!0},movieId:{name:"string",required:!0},title:{name:"string",required:!0},image:{name:"string",required:!0},releaseDate:{name:"string",required:!0},voteAverage:{name:"number",required:!0},voteCount:{name:"number",required:!0}}}},required:!1},onClose:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"func"},required:!1},selectMovie:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"func"},required:!1},deleteMovie:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"func"},required:!1},addFavoriteMovie:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"func"},required:!1},removeFavoriteMovie:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"func"},required:!1},setMovieCardIsLoading:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"func"},required:!1},user:{description:"",type:{name:"union",value:[{name:"shape",value:{accessToken:{name:"string",required:!0},refreshToken:{name:"string",required:!0},user:{name:"shape",value:{id:{name:"string",required:!0},name:{name:"string",required:!0},email:{name:"string",required:!0}},required:!0}}},{name:"enum",value:[{value:"null",computed:!1}]}]},required:!1},savedMoviesLoading:{description:"",type:{name:"bool"},required:!1},movieId:{description:"",type:{name:"string"},required:!0}}}},"./src/assets/poster.jpg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"9264f0e6736e3a17cefa.jpg"}}]);
//# sourceMappingURL=stories-MovieDetailModal-stories.3a8ac75c.iframe.bundle.js.map