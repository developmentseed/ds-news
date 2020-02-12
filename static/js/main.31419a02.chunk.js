(this["webpackJsonpds-news"]=this["webpackJsonpds-news"]||[]).push([[0],{142:function(e,t,a){e.exports=a(223)},147:function(e,t,a){},223:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(64),o=a.n(r),l=(a(147),a(23)),i=a(15),u=a(9),s=a(244),d=a(50),p=a(19),m=a(127),b=a.n(m),O=a(109),f=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||u.d,h=a(37),j=a(7),v=Object(j.createAsyncAction)("AUTH/FETCH_TOKEN_REQUEST","AUTH/FETCH_TOKEN_SUCCESS","AUTH/FETCH_TOKEN_FAILURE")(),E=Object(j.createAction)("AUTH/LOGOUT")(),y=Object(j.createReducer)(null).handleType(Object(j.getType)(v.request),(function(e,t){return{status:"FETCHING",data:void 0,error:void 0}})).handleType(Object(j.getType)(v.success),(function(e,t){return{status:"SUCCESS",data:t.payload,error:void 0}})).handleType(Object(j.getType)(v.failure),(function(e,t){return{status:"FAILED",data:void 0,error:t.payload}})).handleType(Object(j.getType)(E),(function(){return null})),g=Object(u.c)({token:y}),A=a(103),S=Object(j.createAction)("QUERY/SET")(),T=Object(j.createAction)("QUERY/SET_SEARCH_TERM")(),N=Object(j.createAction)("QUERY/SET_SORT")(),R=Object(j.createAction)("QUERY/REPO_ADD")(),k=Object(j.createAction)("QUERY/REPO_RM")(),q=Object(j.createAsyncAction)("QUERY/SEARCH_REQUEST","QUERY/SEARCH_SUCCESS","QUERY/SEARCH_FAILURE")(),w=Object(j.createAction)("QUERY/START_POLLING")(),C=Object(j.createAction)("QUERY/STOP_POLLING")(),U=Object(j.createAction)("QUERY/SET_POLLING_TIMER")(),_=a(40),L=a.n(_),I={search:"",repo:[],sort:"created"},H=null,x={active:!0,count:null,interval:300},F=Object(j.createReducer)(I).handleAction(T,(function(e,t){var a=t.payload;return Object(i.a)({},e,{search:a})})).handleAction(S,(function(e,t){var a=t.payload;return Object(i.a)({},I,{},a)})).handleAction(N,(function(e,t){var a=t.payload;return Object(i.a)({},e,{sort:a})})).handleAction(R,(function(e,t){var a=t.payload,n=e.repo,c=Object(A.a)(e,["repo"]);return Object(i.a)({},c,{repo:n.includes(a)?n:n.concat(a)})})).handleAction(k,(function(e,t){var a=t.payload,n=e.repo,c=Object(A.a)(e,["repo"]);return Object(i.a)({},c,{repo:n.filter((function(e){return e!==a}))})})),Q=Object(j.createReducer)(H).handleAction(q.request,(function(e,t){return{status:"FETCHING",data:null===e||void 0===e?void 0:e.data,error:void 0,asOf:L()().format("LLL")}})).handleAction(q.success,(function(e,t){return{status:"SUCCESS",data:t.payload,error:void 0,asOf:L()().format("LLL")}})).handleAction(q.failure,(function(e,t){return{status:"FAILED",data:void 0,error:t.payload,asOf:L()().format("LLL")}})),P=Object(j.createReducer)(x).handleAction(w,(function(e){return Object(i.a)({},e,{active:!0})})).handleAction(C,(function(e){return Object(i.a)({},e,{count:null,active:!1})})).handleAction(U,(function(e,t){var a=t.payload;return Object(i.a)({},e,{count:a})})),D=Object(u.c)({query:F,results:Q,polling:P}),Y=a(102),G=a(242),M=a(16),B=a(128),z=a(72),J=a(227),K=a(98),W=a(44),$=a(57),X=a(232),V=a(233),Z=[function(e,t,a){var n=a.ajax,c=a.config;return e.pipe(Object(J.a)(Object(j.isActionOf)(v.request)),Object(K.a)((function(e){var t=e.payload;return n.post(c.api.auth,{code:t},{"Content-Type":"application/json",Accept:"application/json"}).pipe(Object(W.a)((function(e){return e.response})),Object($.a)((function(e){return e.error?Object(B.a)(e.error_description.split("+").join(" ")):Object(z.a)(e)})),Object(W.a)((function(e){var t=e.access_token;v.success(t)})),Object(X.a)((function(e){return Object(z.a)(v.failure(e))})))})))},function(e,t,a){var n=a.config;return e.pipe(Object(J.a)(Object(j.isActionOf)(v.success)),Object(V.a)(Object(M.d)("".concat(n.basePath).concat(n.paths.feed))))}],ee=a(14),te=a(130),ae=a(228),ne=a(248),ce=a(238),re=a(77),oe=a(234),le=a(235),ie=a(236),ue=a(237),se=a(239),de=a(240),pe=a(241),me=a(129),be=Object(me.a)([function(e){return e}],(function(e){return Object.entries(e).filter((function(e){var t=Object(ee.a)(e,2),a=(t[0],t[1]);return Array.isArray(a)?a.length:a})).flatMap((function(e){var t=Object(ee.a)(e,2),a=t[0],n=t[1];return Array.isArray(n)?n.map((function(e){return[a,e]})):[[a,n]]})).map((function(e){var t=Object(ee.a)(e,2),a=t[0],n=t[1];return"search"===a?n:"".concat(a,":").concat(n)})).join(" ")})),Oe=a(26),fe=function(e){var t=Object(ee.a)(e,2),a=t[0],n=t[1];return JSON.stringify(a.query.query)!==JSON.stringify(n.query.query)},he=[function(e,t,a){var n=a.config;return(t.pipe(Object(J.a)((function(){return t.value.router.location.pathname==="".concat(n.basePath).concat(n.paths.feed)})),Object(oe.a)(),Object(J.a)(fe),Object(le.a)(n.searchDebounceMs),Object(W.a)((function(e){var t=Object(ee.a)(e,2);t[0];return t[1].query.query})),Object(W.a)((function(e){return Object(M.e)(Object(i.a)({},t.value.router.location,{search:"q=".concat(encodeURIComponent(be(e)))}))}))))},function(e,t,a){var n=a.config;return e.pipe(Object(te.a)(d.a),Object(J.a)((function(){return t.value.router.location.pathname==="".concat(n.basePath).concat(n.paths.feed)})),Object(W.a)((function(){return S((e=t.value.router.location.search.slice(3),decodeURIComponent(e).split(" ").map((function(e){return e.split(":")})).reduce((function(e,t){return Object(i.a)({},e,{},1!==t.filter(Boolean).length&&["sort","repo"].includes(t[0])?Object(Oe.a)({},t[0],(e[t[0]]||[]).concat(t.slice(1).join(":"))):{search:e.search?"".concat(e.search," ").concat(t.join(":")):t.join(":")})}),{})));var e})))},function(e,t,a){var n=a.config;return(Object(ae.a)(e.pipe(Object(J.a)(Object(j.isActionOf)(v.success))),e.pipe(Object(J.a)(Object(j.isActionOf)(U)),Object(J.a)((function(e){return 0===e.payload}))),t.pipe(Object(oe.a)(),Object(J.a)(fe))).pipe(Object(J.a)((function(){var e;return!!(null===(e=t.value.auth.token)||void 0===e?void 0:e.data)})),Object(le.a)(n.searchDebounceMs),Object(W.a)((function(){return q.request(be(t.value.query.query))}))))},function(e,t,a){var n=a.github;a.ajax;return e.pipe(Object(J.a)(Object(j.isActionOf)(q.request)),Object(K.a)((function(e){var a,c=e.payload;return((null===(a=t.value.auth.token)||void 0===a?void 0:a.data)?Object(re.a)(n.query({query:c,token:t.value.auth.token.data})):Object(B.a)("You must be logged in to query Github")).pipe(Object(W.a)((function(e){return q.success(e)})),Object(X.a)((function(e){return Object(z.a)(q.failure(e))})))})))},function(e,t){return e.pipe(Object(te.a)(w),Object(ue.a)(Object(ce.a)(0,1e3).pipe(Object(W.a)((function(e){return t.value.query.polling.interval-e})),Object(se.a)((function(e){return e>=0})),Object(W.a)(U),Object(de.a)(),Object(pe.a)(e.pipe(Object(te.a)(C))))))},function(e,t){return e.pipe(Object(te.a)(d.a),Object(ie.a)(Object(ne.a)(Object(z.a)(q.request(be(t.value.query.query))).pipe(Object(J.a)((function(){var e;return!!(null===(e=t.value.auth.token)||void 0===e?void 0:e.data)}))),Object(z.a)(w()).pipe(Object(J.a)((function(){return!!t.value.query.polling.active})),Object(J.a)((function(){var e;return!!(null===(e=t.value.auth.token)||void 0===e?void 0:e.data)}))))))}],je=G.a.apply(void 0,Object(Y.a)(Z).concat(Object(Y.a)(he))),ve=a(246),Ee=a(131),ye=a.n(Ee),ge=a(45),Ae=a(132),Se=a(133),Te={github:new(function(){function e(){Object(ge.a)(this,e)}return Object(Ae.a)(e,[{key:"query",value:function(e){var t,a;return ye.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.query,a=e.token,n.abrupt("return",Object(Se.graphql)("\n        query($searchQuery: String!) {\n          search(query: $searchQuery, type: ISSUE, first: 100) {\n            issueCount\n            nodes {\n              ... on Issue {\n                title\n                number\n                repository {\n                  owner {\n                    login\n                  }\n                  name\n                }\n                author {\n                  login\n                  avatarUrl\n                }\n                createdAt\n                closedAt\n                reactions(first: 100) {\n                  edges {\n                    node {\n                      content\n                    }\n                  }\n                }\n                comments {\n                  totalCount\n                }\n              }\n            }\n          }\n        }\n      ",{searchQuery:t,headers:{authorization:"Bearer ".concat(a)}}));case 2:case"end":return n.stop()}}))}}]),e}()),ajax:ve.a},Ne="https://5sy0eu5bsh.execute-api.us-west-2.amazonaws.com/dev";var Re="https://alukach.com";var ke,qe={clientId:"3f43f5bebd8452ebf262",domain:Re,searchDebounceMs:300,basePath:"/ds-news",api:{auth:"".concat(Ne,"/auth")},paths:{feed:"/",login:"/login"}},we=Object(p.a)(),Ce=Object(s.a)({dependencies:Object(i.a)({},Te,{config:qe})}),Ue=[Ce,Object(O.a)(we)],_e=f(u.a.apply(void 0,Ue)),Le={key:"root",storage:b.a,whitelist:["auth","query"]},Ie=Object(d.b)(Le,(ke=we,Object(u.c)({router:Object(h.b)(ke),auth:g,query:D}))),He=Object(u.e)(Ie,{},_e),xe=Object(d.c)(He);Ce.run(je);var Fe=a(135),Qe=a(141),Pe=a(22),De=Object(l.c)((function(e){var t;return{isLoggedIn:!!(null===(t=e.auth.token)||void 0===t?void 0:t.data)}}),(function(e){return Object(u.b)({dispatchLogout:E},e)}))((function(e){var t=e.isLoggedIn,a=e.dispatchLogout;return c.a.createElement("nav",{id:"header",className:"navbar"},c.a.createElement("ul",null,c.a.createElement("li",null,c.a.createElement("img",{className:"logo",src:"".concat("/ds-news","/favicon.png"),alt:"ds news logo"}),c.a.createElement("h1",null,"ds news")),c.a.createElement("li",null,c.a.createElement("a",{className:"selected",href:"".concat("/ds-news").concat(qe.paths.feed)},"feed"))),c.a.createElement("ul",null,c.a.createElement("li",null,t?c.a.createElement("button",{onClick:a,className:"link-button"},"logout"):c.a.createElement("a",{href:"https://github.com/login/oauth/authorize?client_id=".concat(qe.clientId,"&redirect_uri=").concat(qe.domain).concat(qe.basePath).concat(qe.paths.login,"&scope=repo")},"Login with Github"))))})),Ye=a(136),Ge=a.n(Ye),Me=Object(l.c)((function(e){return{token:e.auth.token}}),(function(e){return Object(u.b)({dispatchfetchToken:v.request},e)}))((function(e){var t=e.location,a=e.dispatchfetchToken,r=e.token,o=Ge.a.parse(t.search).code,l=Array.isArray(o)?o[0]:o;return Object(n.useEffect)((function(){l&&a(l)}),[l,a]),o?"FETCHING"===(null===r||void 0===r?void 0:r.status)?c.a.createElement("p",null,"Fetching auth token..."):"FAILED"===(null===r||void 0===r?void 0:r.status)?c.a.createElement("p",{className:"error"},r.error):c.a.createElement("p",null,"Successfully retrieved token"):c.a.createElement("p",{className:"error"},"No code provided. Please login.")})),Be=a(101),ze={CONFUSED:":confused:",EYES:":eyes:",HEART:":heart:",HOORAY:":tada:",LAUGH:":smile:",ROCKET:":rocket:",THUMBS_DOWN:":-1:",THUMBS_UP:":+1:"},Je=function(e){var t,a,n=e.title,r=e.number,o=e.author,l=e.createdAt,u=e.closedAt,s=e.repository,d=e.reactions,p=e.comments;return c.a.createElement("li",{className:u?"closed":""},c.a.createElement("h6",{className:"mb-0"},c.a.createElement("a",{href:"https://github.com/".concat(null===s||void 0===s?void 0:s.owner.login,"/").concat(null===s||void 0===s?void 0:s.name,"/issues/").concat(r)},n)),c.a.createElement("p",null,c.a.createElement("a",{href:"https://github.com/".concat(null===s||void 0===s?void 0:s.owner.login,"/").concat(null===s||void 0===s?void 0:s.name,"/issues/").concat(r)},c.a.createElement("strong",null,null===s||void 0===s?void 0:s.name),"#",r)," by ",c.a.createElement("a",{href:"https://github.com/".concat(null===o||void 0===o?void 0:o.login)},c.a.createElement("img",{src:null===o||void 0===o?void 0:o.avatarUrl,alt:"".concat(null===o||void 0===o?void 0:o.login," profile pic"),className:"mr-1",style:{maxHeight:"1rem",borderRadius:2,verticalAlign:"text-top"}}),null===o||void 0===o?void 0:o.login)," ",c.a.createElement("span",{title:l},L()(l).fromNow()),u&&c.a.createElement("em",{className:"small",title:u}," ","(closed ",L()(u).fromNow(),")")," | ",(null===(t=d.edges)||void 0===t?void 0:t.length)?Object.entries((null===d||void 0===d?void 0:null===(a=d.edges)||void 0===a?void 0:a.reduce((function(e,t){return Object(i.a)({},e,Object(Oe.a)({},(null===t||void 0===t?void 0:t.node.content)||"",(e[(null===t||void 0===t?void 0:t.node.content)||""]||0)+1))}),{}))||{}).slice().sort((function(e,t){var a=Object(ee.a)(e,1)[0];return Object(ee.a)(t,1)[0]>a?-1:1})).map((function(e){var t=Object(ee.a)(e,2),a=t[0],n=t[1];return c.a.createElement("span",{key:a},c.a.createElement(Be.a,{emoji:ze[a],size:16,tooltip:!0}),n>1&&c.a.createElement("sup",null,n))})):c.a.createElement("em",{className:"small"},"no reactions")," | ",c.a.createElement("span",null,p.totalCount?c.a.createElement(c.a.Fragment,null,c.a.createElement(Be.a,{emoji:"speech_balloon",size:16,tooltip:!0}),p.totalCount>1&&c.a.createElement("sup",null,100===p.totalCount?"100+":p.totalCount)):c.a.createElement("em",{className:"small"},"no comments"))))},Ke=function(e){var t=e.query.repo,a=e.results,r=e.dispatchAddRepo,o=e.dispatchRmRepo,l=Object(n.useState)(""),i=Object(ee.a)(l,2),u=i[0],s=i[1];return c.a.createElement("ul",{className:"col-sm-3 list-unstyled sidebar"},c.a.createElement("li",{className:"mt-2 "},c.a.createElement("h4",null,"last updated"),c.a.createElement("span",{className:"text-monospace small"},a&&("FETCHING"===a.status?"loading...":"".concat(a.asOf.toLowerCase())))),c.a.createElement("li",null,c.a.createElement("h4",null,"Repos"),c.a.createElement("ul",{className:"list-unstyled"},t.slice().sort().map((function(e,t){return c.a.createElement("li",{key:t,className:"overflow-auto text-nowrap"},c.a.createElement("span",{className:"ml-1 close-link",title:"remove repo",onClick:function(){return o(e)}}),c.a.createElement("pre",{className:"ml-1 d-inline"},e))}))),c.a.createElement("form",{onSubmit:function(e){e.preventDefault(),r(u),s("")}},c.a.createElement("input",{type:"text",placeholder:"owner/repo",className:"small text-monospace w-100 pl-1 mt-2",value:u,onChange:function(e){return s(e.currentTarget.value)}}))))},We=a(247),$e=a(245),Xe=a(249),Ve=a(243),Ze=function(e){var t=e.sort,a=e.setSort,n=e.searchTerm,r=e.setSearchTerm,o={created:"recently created",updated:"recently updated",interactions:"interactions","reactions-heart":"loved","reactions-tada":"celebrated",reactions:"reactions","reactions-+1":"liked","reactions--1":"disliked"};return c.a.createElement("nav",{className:"navbar px-1"},c.a.createElement("ul",{className:"d-flex",style:{flexGrow:1}},c.a.createElement("li",{className:"w-100"},c.a.createElement("input",{placeholder:"Search",value:n,className:"text-monospace w-100",onChange:function(e){return r(e.currentTarget.value)}}))),c.a.createElement("ul",{className:"ml-auto"},c.a.createElement("li",{className:"ml-2"},c.a.createElement(We.a,{className:"d-inline"},c.a.createElement($e.a,{tag:"a",className:"link-button d-inline-block"},"most ",o[t]," \u25bc")," ",c.a.createElement(Xe.a,null,Object.entries(o).map((function(e){var t=Object(ee.a)(e,2),n=t[0],r=t[1];return c.a.createElement(Ve.a,{key:n,onClick:function(){return a(n)}},r)})))))))},et=Object(l.c)((function(e){var t=e.query;return{query:t.query,results:t.results,polling:t.polling}}),(function(e){return Object(u.b)({dispatchSetSearchTerm:T,dispatchSetSort:N,dispatchAddRepo:R,dispatchRmRepo:k},e)}))((function(e){var t,a=e.results,n=e.query,r=e.dispatchSetSort,o=e.dispatchSetSearchTerm,l=e.dispatchAddRepo,i=e.dispatchRmRepo;return c.a.createElement("div",{className:"row no-gutters"},c.a.createElement("div",{className:"col-sm pr-1"},c.a.createElement(Ze,{sort:n.sort,setSort:r,searchTerm:n.search,setSearchTerm:o}),"FAILED"===(null===a||void 0===a?void 0:a.status)?c.a.createElement("pre",null,a.error):(null===a||void 0===a?void 0:a.data)&&c.a.createElement("ol",{className:"issues"},null===(t=a.data.search.nodes)||void 0===t?void 0:t.filter((function(e){return 0!==Object.entries(e).length})).map((function(e,t){return c.a.createElement(Je,Object.assign({key:t},e))}))),c.a.createElement("code",null,be(n))),c.a.createElement(Ke,{query:n,results:a,dispatchAddRepo:l,dispatchRmRepo:i}))})),tt=function(){return c.a.createElement(l.a,{store:He},c.a.createElement(h.a,{history:we},c.a.createElement(Fe.a,{persistor:xe,loading:c.a.createElement("p",null,"Loading...")},c.a.createElement(Qe.a,{basename:qe.basePath},c.a.createElement(De,null),c.a.createElement("div",{className:"container-fluid"},c.a.createElement(Pe.c,null,c.a.createElement(Pe.a,{path:qe.paths.login,component:Me}),c.a.createElement(Pe.a,{path:qe.paths.feed,component:et})))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(tt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[142,1,2]]]);
//# sourceMappingURL=main.31419a02.chunk.js.map