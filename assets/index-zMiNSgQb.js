var yt=Object.defineProperty;var we=n=>{throw TypeError(n)};var bt=(n,s,e)=>s in n?yt(n,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[s]=e;var o=(n,s,e)=>bt(n,typeof s!="symbol"?s+"":s,e),$e=(n,s,e)=>s.has(n)||we("Cannot "+e);var x=(n,s,e)=>($e(n,s,"read from private field"),e?e.call(n):s.get(n)),Y=(n,s,e)=>s.has(n)?we("Cannot add the same private member more than once"):s instanceof WeakSet?s.add(n):s.set(n,e),Se=(n,s,e,t)=>($e(n,s,"write to private field"),t?t.call(n,e):s.set(n,e),e);import v from"https://cdn.jsdelivr.net/npm/axios@1.6.5/+esm";import le from"https://cdn.jsdelivr.net/npm/abcjs@6.2.3/+esm";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();var w;const h=class h{static async authcall(s,e){try{const t=await v.post(`${x(h,w)}auth/login`,{email:s,password:e});if(t.status==200)return t.data.authToken;Promise.reject(!1)}catch(t){console.log(t)}}static returnheader(){return{headers:{Authorization:`Bearer ${h.token}`}}}static async getuser(s){h.token=s;const e=await v.get(x(h,w)+"auth/me",h.returnheader());return e.status==200?e.data:(h.token="",!1)}static async getsingletune(s){const e=await v.get(x(h,w)+"tunes/"+s,h.returnheader());return e.status==200?e.data:!1}static async getalltunes(){const s=await v.get(x(h,w)+"tunes",h.returnheader());return s.status==200?s.data:!1}static async gettunebook(){const s=await v.get(x(h,w)+"tunebook",h.returnheader());return s.status==200?s.data:!1}static async addtotunes(s){const e=await v.post(x(h,w)+"tunes",s,h.returnheader());return e.status==200?e.data:!1}static async deletetune(s){return(await v.delete(x(h,w)+"tunes/"+s,h.returnheader())).status==200}static async deletetunebooktune(s){return(await v.delete(x(h,w)+"tunebook/"+s,h.returnheader())).status==200}static async addtotunebook(s){const e=await v.post(x(h,w)+"tunebook",s,h.returnheader());return e.status==200?e.data:!1}static async edittune(s,e){const t=await v.patch(x(h,w)+"tunes/"+s,e,h.returnheader());return t.status==200?t.data:!1}static async edittunebooktune(s,e){const t=await v.patch(x(h,w)+"tunebook/"+s,e,h.returnheader());return t.status==200?t.data:!1}static async addvideo(s){const e=await v.post(x(h,w)+"videos",s,h.returnheader());return e.status==200?e.data:!1}static async getallvideos(){const s=await v.get(x(h,w)+"videos",h.returnheader());return s.status==200?s.data:!1}static async editvideo(s,e){const t=await v.patch(x(h,w)+"videos/"+s,e,h.returnheader());return t.status==200?t.data:!1}static async getsecrets(){const s=await v.get(x(h,w)+"secrets",h.returnheader());return s.status==200?s.data:!1}static async addsuggestion(s){const e=await v.post(x(h,w)+"suggestions",s,h.returnheader());return e.status==200?e.data:!1}static async getallsuggestions(){const s=await v.get(x(h,w)+"suggestions",h.returnheader());return s.status==200?s.data:!1}static async editsuggestion(s,e){const t=await v.patch(x(h,w)+"suggestions/"+s,e,h.returnheader());return t.status==200?t.data:!1}static async getsetbook(){const s=await v.get(x(h,w)+"sets",h.returnheader());return s.status==200?s.data:!1}static async addtosetbook(s){const e=await v.post(x(h,w)+"sets",s,h.returnheader());return e.status==200?e.data:!1}static async editsetbookset(s,e){const t=await v.patch(x(h,w)+"sets/"+s,e,h.returnheader());return t.status==200?t.data:!1}static async addvideotune(s){const e=await v.post(x(h,w)+"videotunes",s,h.returnheader());return e.status==200?e.data:!1}static async editvideotune(s,e){const t=await v.patch(x(h,w)+"videotunes/"+s,e,h.returnheader());return t.status==200?t.data:!1}static async deletevideotune(s){return(await v.delete(x(h,w)+"videotunes/"+s,h.returnheader())).status==200}};w=new WeakMap,Y(h,w,"https://x8ki-letl-twmt.n7.xano.io/api:JIBL7nZM/"),o(h,"token");let L=h;class me{static async search(s){let e=1,t=await this.singlesearch(s,e),a=t.data.tunes,r=t.data.pages;for(r=r>3?3:r;e<r;)e++,t=await this.singlesearch(s,e),a=a.concat(t.data.tunes);return a}static singlesearch(s,e=1){const t=`https://thesession.org/tunes/search?q=${s}&format=json&page=${e}`;return v.get(t)}static async gettune(s){const e=`https://thesession.org/tunes/${s}?format=json`,t=await v.get(e);if(t.status==200){if(t.data.recordings>0){const a=await this.gettunerecordings(s);t.data.recordings=a.data.recordings}return t.data}return!1}static async gettunerecordings(s){const e=`https://thesession.org/tunes/${s}/recordings?format=json`;return await v.get(e)}}var K,re;const M=class M{static async search(s,e=5){const t=await v.get(x(M,re)+"search?query="+s+"&per_page="+e,{headers:{Authorization:x(M,K)}});return t.status==200?t.data.photos.map(i=>i.src.large):[]}static async initialize(){const e=(await L.getsecrets()).find(a=>a.name=="pexels");return Se(M,K,e.value),await M.search("folk music europe")}};K=new WeakMap,re=new WeakMap,Y(M,K),Y(M,re,"https://api.pexels.com/v1/");let V=M;class S{constructor(s,e){o(this,"element",null);this.name=s,this.parentel=e}attachAt(s,e=!0,t=this.parentel){e?t.innerHTML=s:t.insertAdjacentHTML("beforeend",s),this.element=t.lastElementChild}replace(s){const e=this.element.cloneNode(!1);e.outerHTML=s,this.element=this.element.parentNode.replaceChild(e,this.element)}hide(){this.element.classList.add("hidden")}show(){this.element.classList.remove("hidden")}remove(){this.element.remove()}}class vt extends S{constructor(s,e){super(s,e),this.setup()}setup(){const s=this.generatehtml();this.attachAt(s),this.element.querySelector("#sendlogin").addEventListener("click",this.action.bind(this))}generatehtml(){return`<div id="${this.name}" class="fixed inset-0 bg-gray-500 
    bg-opacity-75 flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-lg w-128">
          <h2 class="text-2xl text-gray-400 font-bold mb-4">${u.poly.t("login.title")}</h2>
          <form id="loginform">
            <p class="generalerror"></p>
            <div class="mb-4">
              <label class="block text-gray-300 text-sm mb-1 uppercase" 
              for="email">
               ${u.poly.t("login.email")}
              </label>
              <input
                class="w-full px-3 text-black py-2 border rounded-md 
                focus:outline-none focus:border-blue-500"
                type="email"
                id="email"
                placeholder="${u.poly.t("login.email")}"
                required
              />
              <span class="emailerror"></span>
            </div>
            <div class="mb-6">
              <label class="block text-gray-300 text-sm mb-1 uppercase" 
              for="password">
                ${u.poly.t("login.pass")}
              </label>
              <input
                class="w-full px-3 py-2 text-black border rounded-md 
                focus:outline-none focus:border-blue-500"
                type="password"
                id="password"
                placeholder="${u.poly.t("login.pass")}"
                required
              />
              <span class="passworderror"></span>
            </div>
            <div class="flex justify-center">
              <button id="sendlogin"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                ${u.poly.t("login.login")}
              </button>
            </div>
            <p class="newuser">${u.poly.t("login.new_user")}</p>
          </form>
        </div>
      </div>`}getformdata(){var e,t;const s=this.element.querySelector("#loginform").elements;return{email:(e=s.email)==null?void 0:e.value,password:(t=s.password)==null?void 0:t.value}}checkvalue(s){return s.email&&s.password?!0:(s.email||(this.element.querySelector(".emailerror").textContent=u.poly.t("login.required_mail")),s.password||(this.element.querySelector(".passworderror").textContent=u.poly.t("login.required_pass")),!1)}async action(s){s.preventDefault();const e=this.getformdata();if(this.checkvalue(e))try{const t=await L.authcall(e.email,e.password);t?(localStorage.setItem("token",t),this.remove(),u.getuserdetails()):this.element.querySelector(".generalerror").innerHTML=`<span class="bg-red-500 text-white p-2">${u.poly.t("login.login_error")}</span>`}catch(t){console.log(t)}}}const l={template:{tunebook:{tunes_id:0,user_id:0,preferred_img_url:"",prefered_name:"",prefered_tone:"",status:"",learned_date:"",rehearsal_days:0,last_rehearsals:[],status_num:0},set:{user_id:0,tunes:[],title:"",notes:""},suggestion:{type_of_suggestion:"",user_id:0,content:"",status:"",notes:""}},tunes:[],tunebook:[],setbook:[],videos:[],genericpics:[],status:[{value:1,factor:0,label:"Pendiente",color:"stone-600"},{value:2,factor:2,label:"Aprendiendo",color:"orange-600",times:7,days:10},{value:3,factor:2,label:"Fijar",color:"yellow-500",days:15},{value:4,factor:1,label:"Básica",color:"lime-500",days:30},{value:5,factor:.5,label:"Intermedio",color:"green-600",days:45},{value:6,factor:.25,label:"Avanzada",color:"emerald-600",days:60},{value:7,factor:.1,label:"Maestro",color:"emerald-900",days:60}],rythms:{"Double Jig":"6/8","Single Jig":"6/8",Reel:"4/4",March:"4/4",Hornpipe:"4/4",Slide:"12/8","Slip Jig":"9/8",Polka:"2/4",Mazurka:"4/4",Waltz:"3/4"},videotypes:["album","live event","tv record","home record","learning","others"],tones:{A:"la",B:"si",C:"do",D:"re",E:"mi",F:"fa",G:"sol"},keyAlterations:{"C maj":0,"A min":0,"G maj":1,"E min":1,"D maj":2,"B min":2,"A maj":3,"F# min":3,"E maj":4,"C# min":4,"B maj":5,"G# min":5,"F# maj":6,"D# min":6,"C# maj":7,"A# min":7,"F maj":-1,"D min":-1,"Bb maj":-2,"G min":-2,"Eb maj":-3,"C min":-3,"Ab maj":-4,"F min":-4,"Db maj":-5,"Bb min":-5,"Gb maj":-6,"Eb min":-6,"Cb maj":-7,"Ab min":-7,"D dor":-1,"E dor":2,"F dor":-4,"G dor":1,"A dor":3,"B dor":5,"C dor":0,"C mix":0,"D mix":1,"E mix":4,"F mix":-1,"G mix":1,"A mix":2,"B mix":5}},q=class q{static playabc(s){const e=s.replace(/!/g,`
`);if(le.synth.supportsAudio()){const t=le.renderAbc("*",e)[0];q.midiBuffer=new le.synth.CreateSynth,q.midiBuffer.init({visualObj:t,options:{}}).then(function(){q.midiBuffer.prime().then(function(){q.midiBuffer.start()})}).catch(function(a){console.warn("Audio problem:",a)})}else console.warn("Audio not supported")}static stopabc(){q.midiBuffer&&q.midiBuffer.stop()}static manageabc(s){s.stopPropagation();const e=s.currentTarget;e instanceof HTMLElement&&(e.dataset.state=="playing"?(e.dataset.state="stop",q.stopabc(),e.querySelector("i").classList.remove("fa-circle-stop"),e.querySelector("i").classList.add("fa-play-circle")):(e.dataset.state="playing",q.playabc(e.dataset.abc),e.querySelector("i").classList.remove("fa-play-circle"),e.querySelector("i").classList.add("fa-circle-stop")))}};o(q,"midiBuffer");let P=q,p=class G{static generatelinks(s){const e=[];return s&&s.forEach(t=>{let a;switch(t==null?void 0:t.service_name){case"thesession.org":a="https://thesession.org/tunes/"+t.service_ID,e.push(`<a class="bg-yellow-600 px-2 rounded-full text-sm" 
                href="${a}" target="_blank" title="thesession">TS</a>`);break;case"irishtune.info":a="https://www.irishtune.info/tune/"+t.service_ID,e.push(`<a class="bg-blue-600 px-2 rounded-full text-sm" 
                href="${a}" target="_blank" title="irishtune">IT</a>`);break;case"tunearch.org":a="https://tunearch.org/wiki/"+t.service_ID,e.push(`<a class="bg-red-600 px-2 rounded-full text-sm" 
                href="${a}" target="_blank" title="tunearchive">TA</a>`);break}}),e}static extractYoutubeID(s){const e=new RegExp(["(?:https?:\\/\\/)?","(?:www\\.)?","(?:youtube\\.com\\/[^\\s]+\\?v=)(\\w{11})|","(?:youtu\\.be\\/(\\w{11}))"].join("")),t=s.match(e);return t?t[1]?t[1]:t[2]:null}static getUniqueValues(s){let e=[...new Set(s)];return e.includes(null)&&(e=e.filter(t=>t!=null),e.sort()),e}static calcValueforTunes(s){s.titlesort=G.titleforsort(s.prefered_name);const e=s==null?void 0:s.last_rehearsals.find(t=>t!=null&&t!==0);s.last_rehearsalDate=e??0,s.meanRehear=G.getMeanRehear(s.last_rehearsals)}static titleforsort(s){return s=s.toLowerCase(),s.substring(0,4)=="the "?s=s.substring(4):s.substring(0,2)=="a "&&(s=s.substring(2)),s}static calctimesince(s,e=!1){let t="";if(typeof s=="number"){const a=new Date,r=new Date(s),i=a.valueOf()-r.valueOf(),c=Math.floor(i/(1e3*60*60*24*30));c>0&&(t=t.concat("",`${c}m`));const d=i%(1e3*60*60*24*30),g=Math.floor(d/(1e3*60*60*24));if(e)return g;g>0&&(t=t.concat(" ",`${g}d`));const $=d%(1e3*60*60*24),_=Math.floor($/(1e3*60*60));c==0&&_>0&&(t=t.concat(" ",`${_}h`));const y=$%(1e3*60*60),f=Math.floor(y/(1e3*60));c==0&&g==0&&f>0&&(t=t.concat(" ",`${f}min`)),t==""&&(t="ahora")}else t="nunca";return t}static removeWhiteSpaces(s){return s.split(" ").join("").toLowerCase()}static getstatus(s){return l.status.find(e=>e.value===s)}static dateformat(s,e="short"){s===void 0?s=new Date:s instanceof Date||(s=new Date(s));const t=s.toISOString(),a=e=="short"?10:16;return t.substring(0,a)}static converttones(s){return!Array.isArray(s)||s.length===0?[]:[...new Set(s)].map(a=>{const r=a.trim().split(" ");return{Key:r[0].toUpperCase(),Mode:r[1].substring(0,1).toUpperCase()+r[1].substring(1)}})}static videoembed(s){return`
        <div class="aspect-w-16 aspect-h-9">
        <iframe class="w-full h-full" src="https://www.youtube.com/embed/${s}" 
        title="" frameBorder="0" allow="accelerometer; autoplay; 
        clipboard-write; encrypted-media; gyroscope; picture-in-picture; 
        web-share" allowFullScreen>
        </iframe></div>`}static appendOption(s,e,t){const a=document.createElement("option");a.value=e,a.text=t,s.appendChild(a)}static generatefilteroptions(s,e,t){s.innerHTML="",G.appendOption(s,"",e),t.forEach(a=>{G.appendOption(s,Array.isArray(a)?a[0]:a,Array.isArray(a)?a[1]:a)})}static generateformfield(s,e,t,a=null,r=!1){let i=!1;return Array.isArray(a)&&a.length>1&&(i=!0),`
      <div class="flex flex-col border-2 p-4 border-slate-100 bg-slate-50 
      rounded-md mb-4 ${i?"formcomponent":"staticcomponent"}">
        <label class="uppercase text-slate-400 text-sm">${e}
        ${i?'<span><i class="fa fa-edit"></i></span>':""}
        </label>
        <h4 data-name="${s}" 
        ${r?'contenteditable="true" ':""} 
        class="formelement font-semibold 
        text-slate-600 text-xl">${t}</h4> 
        ${i?this.generateselect(a,"data"+s):""}
      </div>`}static generateselect(s,e){return Array.isArray(s)&&s.length>1?`
      <ul class="absolute border border-blue-400 shadow-lg edit-select
        hidden mt-2 text-sm font-semibold border-0 text-blue-400 
        bg-blue-200 rounded-md uppercase p-4 max-h-64 overflow-scroll"
        name="${e}">
            <li>${s.join("</li><li>")}</li>
      </ul>`:""}static getMeanRehear(s){if(Array.isArray(s)&&s.length>1){const e=s.map(i=>new Date(i).getTime());e.reverse();const t=[];for(let i=1;i<e.length;i++){const c=e[i]-e[i-1];t.push(c)}const r=t.reduce((i,c)=>i+c,0)/t.length/(1e3*60*60*24);return Math.round(r)}return null}};class xt extends S{constructor(e,t,a){super(e,t);o(this,"data");o(this,"Thesessionzone");o(this,"videolinks");this.data=a,this.setup()}generatehtml(){var c,d,g,$,_,y,f,E,T,I;const e=(c=this.data)!=null&&c.References&&((d=this.data.References[0])!=null&&d.service_name)?this.data.References.find(j=>j.service_name=="thesession.org"):!1,t=(g=this.data)!=null&&g.References&&(($=this.data.References[0])!=null&&$.service_name)?this.data.References.find(j=>j.service_name=="irishtune.info"):!1,a=(_=this.data)!=null&&_.References&&((y=this.data.References[0])!=null&&y.service_name)?this.data.References.find(j=>j.service_name=="tunearch.org"):!1,r=(f=this.data)!=null&&f.Modes_played&&((E=this.data.Modes_played[0])!=null&&E.key)?this.data.Modes_played.map(j=>j.Key+" "+j.Mode):[];let i="";return e&&(i=`<button class="refreshThesession bg-purple-500 text-white p-2 rounded-md" data-id="${e.service_ID}">Completar datos Thesession</button>`),`<div id="modaledittunemanager" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white p-8 rounded-xl shadow-lg w-4/5 relative flex gap-3 max-h-screen">
            <p id="closeaddtunebook" class="absolute right-4 top-4 text-red-400 text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
                <div class="owndata basis-1/2">
                    <h2 class="text-2xl text-blue-400 font-semibold mb-6">Editar tune</h2> 

                    <div class="flex gap-3">
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">thesession</label>
                            <p class="editthesession border" contenteditable="true">${e?e.service_ID:""}</p>
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">irishtune</label>
                            <p class="editirishtune border" contenteditable="true">${t?t.service_ID:""}</p>
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">tunearch</label>
                            <p class="edittunearch border" contenteditable="true">${a?a.service_ID:""}</p>
                        </div>
                    </div>

                    <label class="uppercase text-slate-400 text-sm mt-3">titulo</label>
                    <p class="editmainname border" contenteditable="true">${this.data.main_name}</p>
                    <label class="uppercase text-slate-400 text-sm mt-3">titulo para orden</label>
                    <p class="editsortname border" contenteditable="true">${this.data.sortname.length>0?this.data.sortname:"sin alias"}</p>

                    <label class="uppercase text-slate-400 text-sm mt-3">aliases</label>
                    <p class="editalias border" contenteditable="true">${(T=this.data)!=null&&T.other_names?this.data.other_names.join(" / "):""}</p>

                    <div class="flex gap-3">
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">tipo</label>
                            <p class="edittype border" contenteditable="true">${this.data.type}</p>
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">tiempo</label> 
                            <p class="edittime border" contenteditable="true">${this.data.time}</p>
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">compases</label>
                            <p class="editcompases border" contenteditable="true">${this.data.compasses}</p>
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">estructura</label>
                            <p class="editestructure border" contenteditable="true">${this.data.Estructure}</p>
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">popularidad</label>
                            <p class="editpopularity border" contenteditable="true">${this.data.popularity??0}</p>
                        </div>
                    </div>

                    <label class="uppercase text-slate-400 text-sm mt-3">autor</label>
                    <p class="editautor border" contenteditable="true">${this.data.author}</p>

                    <label class="uppercase text-slate-400 text-sm mt-3">tradicion</label>
                    <p class="edittradition border" contenteditable="true">${(I=this.data)!=null&&I.tradition?this.data.tradition.join(" / "):""}</p>

                    <label class="uppercase text-slate-400 text-sm mt-3">trivia</label>
                    <p class="edittrivia border" contenteditable="true">${this.data.trivia}</p>

                    <label class="uppercase text-slate-400 text-sm mt-3">tonalidades</label>
                    <p class="editmodesplayed border" contenteditable="true">${r.join(" / ")}</p>

                    <label class="uppercase text-slate-400 text-sm mt-3">ABC</label>
                    <p class="editabcsample border" contenteditable="true">${this.data.ABCsample}</p>

                    <div class="flex items-center justify-center">
                        <button class="updatetune px-4 py-3 rounded-md bg-blue-500 text-white text-md font-bold uppercase mx-4">guardar cambios</button>
                    </div>
                </div>
                <div class="Thesessiondata basis-1/2 shrink-0 overflow-auto">
                    <p class="mb-2">${i}</p>
                </div>
        </div>`}generatesessionhtml(e){const t=/http(s)?[\S]+you[\S]+/g,a=e.recordings.map(d=>`<li><strong>${d.artist.name}</strong> - ${d.name}</li>`),r=e.comments.map(d=>d.content),i=r.map(d=>`<li class="border-b mb-2">${d}</li>`);this.videolinks=r.join("").match(t);const c=e.settings.map(d=>`<li class="py-2"><span class="addtoform"><i class="fa fa-plus-circle fa-lg"></i></span> 
            <span data-target="editabcsample" class="playabc" data-state="stop" data-abc="${d.abc}">
             <i class="fa fa-circle-play fa-lg"></i></span> ${d.key} by ${d.member.name}</li>`);return`
      <h2 class="text-2xl text-blue-400 font-semibold mb-6">Datos Thesession</h2> 

      <label class="uppercase addtoform text-slate-400 text-sm mt-1"><i class="fa fa-plus-circle fa-lg"></i> titulo</label>
      <p data-target="editmainname">${e.name}</p>

      <label class="uppercase addtoform text-slate-400 text-sm mt-1"><i class="fa fa-plus-circle fa-lg"></i> titulo para orden</label>
      <p data-target="editsortname">${p.titleforsort(e.name)}</p>

      <label class="uppercase addtoform text-slate-400 text-sm mt-1"><i class="fa fa-plus-circle fa-lg"></i> aliases</label>
      <p data-target="editalias">${e.aliases.join(" / ")}</p>

      <label class="uppercase text-slate-400 text-sm mt-1">  tipo</label>
      <p>${e.type}</p>
  
      <label class="uppercase addtoform text-slate-400 text-sm mt-1"><i class="fa fa-plus-circle fa-lg"></i> popularidad</label>
      <p data-target="editpopularity">${e.tunebooks}</p>

      <details>
      <summary class="uppercase text-slate-400 text-sm mt-1">Settings ABC ${c.length}</summary>
        <ul class="list-disc">${c.join("")}</ul>
        </details>

        <details>
        <summary class="uppercase text-slate-400 text-sm mt-1">Grabaciones ${a.length}</summary>
        <ul class="list-disc">${a.join("")}</ul>
        </details>

        <details>
        <summary class="uppercase text-slate-400 text-sm mt-1">Comentarios ${i.length}</summary>
        <ul>${i.join("")}</ul>
        </details>
        
        `}setup(){var e;this.attachAt(this.generatehtml(),!1),this.Thesessionzone=this.element.querySelector(".Thesessiondata"),this.element.querySelector("#closeaddtunebook").addEventListener("click",this.remove.bind(this)),this.element.querySelector(".updatetune").addEventListener("click",this.updatetune.bind(this)),(e=this.element)!=null&&e.querySelector(".refreshThesession")&&this.element.querySelector(".refreshThesession").addEventListener("click",this.refreshsession.bind(this))}async refreshsession(e){const t=e.currentTarget.dataset.id,a=await me.gettune(t);this.Thesessionzone.innerHTML=this.generatesessionhtml(a),this.Thesessionzone.querySelectorAll(".addtoform").forEach(r=>{r.addEventListener("click",this.savefromsessiontoform.bind(this))})}savefromsessiontoform(e){const t=e.currentTarget.nextElementSibling;if(t.dataset.target){const a=this.element.querySelector(".owndata ."+t.dataset.target);a.innerText=t.innerText}}checkservicesid(e){const t=[];return e.forEach(a=>{const r=a.split("."),i=this.element.querySelector("#modaledittunemanager .edit"+r[0]).innerText;i.length>0&&t.push({service_name:a,service_ID:i})}),t}async updatetune(e){e.preventDefault();const t=this.checkservicesid(["thesession.org","irishtune.info","tunearch.org"]),a=p.converttones(this.element.querySelector("#modaledittunemanager .editmodesplayed").innerText.split("/")),r={main_name:this.element.querySelector("#modaledittunemanager .editmainname").innerText,other_names:this.element.querySelector("#modaledittunemanager .editalias").innerText.split("/"),type:this.element.querySelector("#modaledittunemanager .edittype").innerText,author:this.element.querySelector("#modaledittunemanager .editautor").innerText,time:this.element.querySelector("#modaledittunemanager .edittime").innerText,tradition:this.element.querySelector("#modaledittunemanager .edittradition").innerText.split("/"),References:t,Modes_played:a,Estructure:this.element.querySelector("#modaledittunemanager .editestructure").innerText,compasses:this.element.querySelector("#modaledittunemanager .editcompases").innerText,trivia:this.element.querySelector("#modaledittunemanager .edittrivia").innerText,popularity:this.element.querySelector("#modaledittunemanager .editpopularity").innerText,sortname:this.element.querySelector("#modaledittunemanager .editsortname").innerText,ABCsample:this.element.querySelector("#modaledittunemanager .editabcsample").innerText};try{const i=await L.edittune(this.data.id,r);if(i){let c=l.tunes.find(g=>g.id===this.data.id);c=i,u.activeScreen.rendertunes(),this.remove()}}catch(i){console.log(i)}}}class wt extends S{constructor(s,e,t){super(s,e),this.id=t,this.data=l.tunes.find(a=>a.id===t),this.setup()}setup(){this.attachAt(this.generatehtml(),!1),this.addListeners()}addListeners(){this.data.ABCsample&&this.element.querySelector(".playabc").addEventListener("click",P.manageabc),this.element.querySelector(".edittune").addEventListener("click",this.edittune.bind(this)),this.element.querySelector(".deletetune").addEventListener("click",this.deletetune.bind(this))}generatehtml(){var e,t,a,r;const s=p.generatelinks((e=this.data)==null?void 0:e.References);return`<div id="tune${this.data.id}" class="tunelist w-full bg-white border-b-2 border-slate200 rounded-md px-6 py-2 flex items-center gap-3">
            <span class="rounded-full w-8 h-8 text-center bg-slate-300 text-white text-xl font-light uppercase">${this.data.ABCsample?`<i data-abc="${this.data.ABCsample}" data-state="stop" class="playabc fa fa-circle-play fa-lg"></i>`:this.data.main_name.substr(0,1)}</span>
            <span class="bg-slate-200 rounded-md text-xs p-1 w-16 shrink-0"><i class="fa fa-star fa-lg mr-1 text-yellow-600"></i>${this.data.popularity??0}</span>
            <h2 class="tunetitle text-xl font-semibold mr-2">${this.data.main_name}</h2>
            ${(t=this.data)!=null&&t.other_names?`<span class="bg-blue-400 text-white rounded-md text-xs p-1" title="${this.data.other_names.join(" / ")}">${this.data.other_names.length}</span>`:""}
            <p class="tunemodes text-blue-400 font-semibold mr-2">${this.data.type}</p>
            <p class="tunealiases text-gray-500">${this.data.author}</p>
            <p class="text-gray-500">${(a=this.data)!=null&&a.tradition?(r=this.data)==null?void 0:r.tradition.join(" · "):""}</p>
            <div class="flex gap-2 ml-auto items-center">
                ${s.join(" ")}
                <span>${this.checkcontent(this.data.Modes_played,"tonalidades")}</span>
                <span>${this.checkcontent(this.data.first_reference,"historia")}</span>
                <span>${this.checkcontent(this.data.media_links,"videos")}</span>
            </div>
            <div class="flex gap-1 ml-3 items-center">
                <button class="edittune bg-slate-400 p-1 rounded-md text-white text-bold" title="editar tema"><i class="fa fa-pencil fa-fw fa-lg"></i></button>
                <button class="deletetune bg-red-400 p-1 rounded-md text-white text-bold" title="eliminar tema"><i class="fa fa-trash fa-fw fa-lg"></i></button>
            </div>
        </div>`}checkcontent(s,e){return s&&Array.isArray(s)&&s.length>0&&s[0]!=null?`<i title="${e}" class="text-green-500 fa fa-check-circle"></i>`:`<i title="${e}" class="text-red-500 fa fa-times-circle"></i>`}edittune(){u.activeScreen instanceof Ue&&(u.activeScreen.subelement=new xt("tunemanageredit",u.htmlelement,this.data))}async deletetune(){if(await L.deletetune(this.data.id)){delete l.tunes[this.data.id];const e=u.getinstance("Tunemanager"),t=e.tunes.findIndex(r=>r.id==this.data.id);e.tunes.splice(t,1);const a=e.items.findIndex(r=>r.name=="tune"+this.data.id);e.items.splice(a,1),this.remove()}}}class $t extends S{constructor(e,t,a){super(e,t);o(this,"tunes",[]);o(this,"results");o(this,"details");o(this,"blocked",!1);o(this,"parent");this.parent=a,this.setup()}setup(){this.attachAt(this.generatehtml(),!1),this.addListeners(),this.results=this.element.querySelector(".results"),this.myinfo=this.element.querySelector(".info")}addListeners(){this.element.querySelector("#managertunesearch").addEventListener("input",this.search.bind(this)),this.element.querySelector("#managerclosetunesearch").addEventListener("click",this.hide.bind(this))}generatehtml(){return`<div id="${this.name}" class="fixed inset-0 bg-gray-500 
    bg-opacity-75 flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-lg w-1/3 max-h-screen 
        flex flex-col">
        <p id="managerclosetunesearch" class="text-right" title="close">
        <i class="fa fa-times-circle fa-2x"></i></p>
          <h2 class="text-2xl text-gray-400 font-bold mb-4">
          Añadir temas desde thesession</h2>
          <input id="managertunesearch" type="text" 
          placeholder="escriba parte del nombre">
          <p class="info mt-6 mb-2"></p>
        <ul class="results bg-slate-300 text-slate-50 p-2 overflow-auto h-auto">
        </ul>
      </div>
    </div>`}generateresults(e){this.results.innerHTML="",e.forEach(t=>{const a=!this.checktuneexistindb(t.id);this.results.insertAdjacentHTML("beforeend",`<li data-enriched="false" class="${a?"searchitem cursor-pointer bg-slate-500 hover:bg-slate-700":"bg-slate-300"} bg-slate-500 items-baseline 
          px-4 py-3 border-y border-slate-400" data-id="${t.id}">
                <div class="title">
                <span class="font-bold">${t.name}</span>
                <em class="ml-2 text-xs text-slate-300 uppercase">
                ${t.type}</em>
                </div>
          </li>`)}),this.results.querySelectorAll("li.searchitem").forEach(t=>t.addEventListener("click",this.showdetails.bind(this)))}async showdetails(e){const t=e.currentTarget;if(t.dataset.enriched=="false"){t.dataset.enriched="true";const a=t.dataset.id;this.details=await me.gettune(a);let r=this.details.settings.map(i=>i.key);r=[...new Set(r)],t.insertAdjacentHTML("beforeend",`<div class="details"><p>Alias: 
          ${this.details.aliases.join(" / ")}</p>
                <p>Tonalidades: ${r.join(" - ")}</p>
                <button class="addtune bg-white text-slate-600 uppercase 
                p-2 font-bold mt-2 rounded-md">Añadir</button>
                </div>`),t.querySelector(".title").insertAdjacentHTML("afterbegin",`<span class="playabc mr-2" data-state="stop" data-abc="L: 1/8
                K:${this.details.settings[0].key}
                ${this.details.settings[0].abc}">
                <i class="fa fa-play-circle fa-lg"></i></span>`),t.querySelector(".playabc").addEventListener("click",P.manageabc),t.querySelector(".addtune").addEventListener("click",this.preparedata.bind(this))}}async search(e){this.results.innerHTML="",this.myinfo.textContent="";const t=e.target.value;if(t.length>6&&!this.blocked){this.blocked=!0;const a=await me.search(t);a.length>0?(this.myinfo.textContent=`Encontrados ${a.length} resultados:`,this.generateresults(a)):this.myinfo.textContent=`Sin resultados en Thesession para ${t}`,this.blocked=!1}else this.myinfo.textContent="Introduzca al menos 6 caracteres"}checktuneexistindb(e){return l.tunes.some(t=>(t==null?void 0:t.References)&&Array.isArray(t.References)&&t.References.length>0&&t.References.some(a=>(a==null?void 0:a.service_name)=="Thesession.org"&&(a==null?void 0:a.service_ID)==e.toString()))}preparedata(e){const a=e.target.closest(".searchitem");let r=this.details.settings.map(d=>d.key);r=[...new Set(r)],r=r.map(d=>({Key:d.substring(0,1).toUpperCase(),Mode:d.substring(1,2).toUpperCase()+d.substring(2)}));const i=this.normalicetype(this.details.type),c={main_name:this.details.name,sortname:p.titleforsort(this.details.name),other_names:this.details.aliases,popularity:this.details.tunebooks,type:i.type,author:"trad.",time:i.time,References:[{service_name:"thesession.org",service_ID:this.details.id}],Modes_played:r,ABCsample:`L: 1/8
                K:${this.details.settings[0].key}
                ${this.details.settings[0].abc}`};this.savetune(c,a)}normalicetype(e){return e=e.replace(/\b\w/g,t=>t.toUpperCase()),e=="Jig"&&(e="Double Jig"),{type:e,time:l.rythms[e]??""}}async savetune(e,t){try{const a=await L.addtotunes(e);a&&(l.tunes.push(a),this.parent.rendertunes(),t.remove())}catch(a){console.log(a)}}}class Ue extends S{constructor(e,t){super(e,t);o(this,"filtered",[]);o(this,"contentzone",null);o(this,"sortcriteria","sortname");o(this,"tuneInstances",[]);o(this,"subelement");this.setup()}setup(){const e=l.tunes.map(r=>r.type);this.typeslist=[...new Set(e)];const t=l.tunes.map(r=>r.tradition);this.originlist=[...new Set(t.flat())],this.filtered=l.tunes;const a=this.generatehtml();this.attachAt(a,!1),this.contentzone=this.element.querySelector("main"),this.addListeners(),this.rendertunes()}generatehtml(){return`
    <section id="${this.name}">
      <header class="p-6">
        <div class="flex tuneInstances-center gap-2">
          <h3 class="text-3xl">Todos los temas</h3>
          <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">${l.tunes.length} temas</span>
          <span class="addnewtune text-blue-600 hover:text-blue-400">
          <i class="fa fa-plus-circle fa-2x"></i></span>
          <div class="ml-auto flex tuneInstances-center gap-3">
              <select class="typetune_search">
                <option value="">Tipo</option>
                <option> ${this.typeslist.join("</option><option>")}</option>
              </select>
              <select class="origintune_search">
                <option value="">Origen</option>
                <option> ${this.originlist.join("</option><option>")}</option>
              </select>
              Filtrar <input type="text" class="tunes_search">
              <i class="resetfilter fa fa-trash"></i>
          </div>
        </div>
        <p>sorting by 
          <select class="tunesorting">
            <option selected value="sortname">Nombre</option>
            <option value="type">Tipo</option>
            <option value="popularity">Popularidad</option>
          </select>
        </p>
      </header>
      <main class="flex px-6 flex-wrap"></main>
    </section>`}addListeners(){this.element.querySelector(".tunes_search").addEventListener("input",this.filter.bind(this)),this.element.querySelector(".typetune_search").addEventListener("change",this.filter.bind(this)),this.element.querySelector(".origintune_search").addEventListener("change",this.filter.bind(this)),this.element.querySelector(".addnewtune").addEventListener("click",this.launchsearch.bind(this)),this.element.querySelector(".tunesorting").addEventListener("change",this.applysort.bind(this)),this.element.querySelector(".resetfilter").addEventListener("click",this.resetFilter.bind(this))}rendertunes(e=l.tunes){this.contentzone.innerHTML="",this.element.querySelector(".num_of_tunes").innerHTML=e.length+" temas",e=this.sorter(e),this.tuneInstances=e.map(t=>new wt("tune"+t.id,this.contentzone,t.id))}sorter(e){return e.sort((t,a)=>t[this.sortcriteria]<a[this.sortcriteria]?this.sortcriteria=="popularity"?1:-1:t[this.sortcriteria]>a[this.sortcriteria]?this.sortcriteria=="popularity"?-1:1:0),e}applysort(e){if(e.target instanceof HTMLSelectElement){const t=e.target.value;this.sortcriteria=t,this.rendertunes(this.filtered)}}resetFilter(){this.filtered=l.tunes,this.element.querySelector(".tunes_search").value="",this.element.querySelector(".typetune_search").value="",this.element.querySelector(".origintune_search").value="",this.rendertunes()}filter(){const e=this.element.querySelector(".tunes_search").value.toLowerCase(),t=this.element.querySelector(".typetune_search").value.toLowerCase(),a=this.element.querySelector(".origintune_search").value.toLowerCase();this.filtered=l.tunes.filter(r=>{let i=!0;e&&(i=r.other_names.join().toLowerCase().includes(e));let c=!0;t&&(c=r.type==t);let d=!0;return a&&(d=r.tradition.includes(a)),i&&c&&d}),this.rendertunes(this.filtered)}launchsearch(){this.subelement=new $t("tunemanagersearch",this.element,this)}}class St extends S{constructor(e,t){super(e,t);o(this,"pages",[{tag:u.poly.t("menubar.manager"),name:"Tunemanager",role:"admin"},{tag:u.poly.t("menubar.videos"),name:"Videos",role:"admin"},{tag:u.poly.t("menubar.suggest"),name:"Suggestions",role:"admin"},{tag:u.poly.t("menubar.tunebook"),name:"Tunebook",role:"all"},{tag:u.poly.t("menubar.sets"),name:"Setbook",role:"all"},{tag:u.poly.t("menubar.learn"),name:"Learn",role:"all"},{tag:u.poly.t("menubar.practice"),name:"Rehear",role:"all"},{tag:u.poly.t("menubar.game"),name:"Game",role:"all"},{tag:u.poly.t("menubar.stats"),name:"Stats",role:"all"}]);this.setup()}setup(){this.attachAt(this.generatehtml(),!1),this.addListeners(),this.element.querySelector('[data-nav="Tunebook"]').click()}generatehtml(){let e="";return this.pages.forEach(t=>{var a;(t.role=="all"||t.role==((a=l.user)==null?void 0:a.role))&&(e=e+`<span class="menuopt cursor-pointer 
        px-4 py-1 hover:font-bold" 
        data-nav="${t.name}">${t.tag}</span>`)}),`
      <div class="flex h-full">
      <nav id="mainnav" class="uppercase flex mr-5 
      text-slate-200 text-xs leading-none items-center">
          ${e}
      </nav>
      <div class="user ml-auto mr-6">
          <span class="text-slate-400 uppercase bg-slate-50>
          <i class="fa fa-user-circle text-white/50 hover:text-white/90"></i>
           ${l.user.name}</span>
          <span id="logout" title="${u.poly.t("menubar.signoff")}">
          <i class="fa fa-times-circle fa-lg"></i></span>
      </div></div>`}addListeners(){this.element.querySelector("#logout").addEventListener("click",this.closesession.bind(this)),this.element.querySelectorAll(".menuopt").forEach(e=>{e.addEventListener("click",this.showcomponent.bind(this))})}showcomponent(e){const t=e.currentTarget;if(t instanceof HTMLElement&&!t.classList.contains("selected")){const a=this.element.querySelector(".menuopt.selected");if(a){const i=u.activeScreen;i&&i.remove(),a.classList.remove("selected","font-bold","bg-white/30")}const r=t.dataset.nav;u.getinstance(r),t.classList.add("selected","font-bold","bg-white/30","text-white")}}closesession(){l.user="",localStorage.removeItem("token"),l.tunebook=[],l.setbook=[],this.remove(),u.getuserdetails()}}class b extends S{constructor(e,t){const a=document.getElementById("notifications");super("notification",a);o(this,"typedict",{info:{name:"info",color:"blue",icon:"circle-info"},danger:{name:"danger",color:"red",icon:"circle-exclamation"},success:{name:"success",color:"green",icon:"square-check"},warning:{name:"warning",color:"yellow",icon:"triangle-exclamation"}});o(this,"timeInfoExpires",2500);this.type=this.typedict[e],this.message=t,this.setup()}setup(){const e=this.generatehtml();this.attachAt(e,!1),this.element.addEventListener("click",this.eliminate.bind(this)),(this.type.name=="success"||this.type.name=="info")&&setTimeout(this.eliminate.bind(this),this.timeInfoExpires)}generatehtml(){return`
        <div class="animate__animated animate__fadeInUp notification p-4 
        mb-4 text-sm text-${this.type.color}-800 rounded-lg 
        bg-${this.type.color}-50 text-right" role="${this.type}">
          <i class="fa fa-solid fa-lg fa-${this.type.icon} mr-2"></i>
          <span class="font-medium">${this.message}</span>
        </div>`}eliminate(){this.element.classList.remove("animate__fadeInUp"),this.element.classList.add("animate__backOutRight"),this.element.addEventListener("animationend",()=>{this.remove()})}}class He extends S{constructor(e,t,a,r="new"){super(e,t);o(this,"tune");o(this,"pics");o(this,"isNew");this.isNew=r=="new";const i=this.isNew?"tunes":"tunebook";this.tune=l[i].find(c=>c.id===a),this.setup()}async setup(){this.pics=await V.search(this.isNew?this.tune.other_names[0]:this.tune.prefered_name),this.pics=this.pics.concat(l.genericpics),this.isNew||this.pics.unshift(this.tune.preferred_img_url),this.attachAt(this.generatehtml(),!1),this.addListeners()}generatehtml(){const e=this.isNew?this.tune:this.tune.tuneref;e.tunekeys=e.Modes_played.map(i=>`${i.Key} ${i.Mode}`);const t=this.isNew?l.status[0].label:p.getstatus(this.tune.status_num).label,a=this.isNew||this.tune.tags.length==0?"":this.tune.tags.join(" "),r=this.isNew||this.tune.notes.trim()==""?"":this.tune.notes;return`
    <div id="${this.isNew?"modaladdtune":"modaledittune"}" 
    class="fixed inset-0 bg-gray-500 bg-opacity-75 
    flex items-center justify-center">
      <div class="bg-white p-8 rounded-xl shadow-lg relative 
      max-h-full overflow-scroll">
        <p id="closeaddtunebook" class="absolute right-4 top-4 text-red-400 
        text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
          <h2 class="text-2xl text-blue-400 font-semibold mb-6">
          ${this.isNew?"Añadir tema a tu repertorio":"Editar tema"}</h2>
            <section id="editform">
              <div class="flex items-center justify-center -mb-4 gap-4">
                <div class="bg-slate-500 text-white/75 rounded-md p-4 
                text-xs min-w-max">
                  <p>${e.type} (${e.time})</p>
                  <p>${e.compasses} compases</p>
                  <p>${e.Estructure}</p>
                </div>
                <div class="relative">
                  <img class="picphoto rounded-full h-48 w-48 border-8 
                  border-slate-200 object-cover object-center" 
                  src="${this.pics[0]}">
                  <span class="searchphoto absolute top-2 left-2 p-2 bg-white/75
                  w-10 hover:w-48 h-10 border border-slate-300 rounded-lg 
                  overflow-hidden transition-all ease-in-out">
                      <i class="fa fa-search fa-lg" aria-hidden="true"></i>
                      <input type="text" placeholder="busqueda de imagen" 
                      class="searchpics w-32 ml-2 py-0 px-2 txt-sm rounded-md 
                      border border-slate-200">
                  </span>
                </div>          
                <div class="bg-slate-500 text-white/75 rounded-md p-4 text-xs
                 min-w-max">
                  <p>${e.author}</p>
                  <p>${e!=null&&e.tradition?e.tradition.join(" · "):""}
                  </p>
                </div>
              </div>
        ${p.generateformfield("titulo","titulo favorito",this.isNew?e.main_name:this.tune.prefered_name,e.other_names)}
        ${p.generateformfield("tonalidad","tonalidad preferida",this.isNew?e.tunekeys[0]:this.tune.prefered_tone,e.tunekeys)}
        ${p.generateformfield("status","status de ejecución",t,l.status.map(i=>i.label))}
              <div class="flex border-2 p-4 border-slate-100 
              bg-slate-50 rounded-md mb-4 gap-3 justify-between">
                <div class="flex flex-col">
                    <label class="uppercase text-slate-400 text-sm">
                    aprendido</label>
                    <input class="font-semibold text-sm border-0 text-blue-400 
                    bg-blue-200 rounded-md uppercase"type="date" 
                    name="learneddate" value="${this.isNew?p.dateformat():this.tune.learned_date}">
                </div>
                <div class="flex flex-col">
                    <label class="uppercase text-slate-400 text-sm">
                    ensayos</label>
                    <input class="font-semibold text-sm border-0 
                    text-blue-400 text-right bg-blue-200 rounded-md" 
                    type="number" 
                    value="${this.isNew?0:this.tune.rehearsal_days}"
                    min="0" name="numrehearsals">
                </div>
              </div>
              <div class="flex flex-col border-2 p-4 border-slate-100 
              bg-slate-50 rounded-md mb-4">
                <label class="uppercase text-slate-400 text-sm">
                Etiquetas</label>   
                <textarea name="tags">${a}</textarea>
              </div>
              <div class="flex flex-col border-2 p-4 border-slate-100 
              bg-slate-50 rounded-md mb-4">
                <label class="uppercase text-slate-400 text-sm">
                Notas</label>   
                <textarea name="notes">${r}</textarea>
              </div>
                <div class="flex items-center justify-center">
                    <button class="savedata px-4 py-3 rounded-md bg-blue-500 
                    text-white text-md font-bold uppercase mr-4" 
                    >${this.isNew?"Añadir tema":"Guardar cambios"}</button>
                </div>
          </section>
        </div>`}addListeners(){this.element.querySelector("#closeaddtunebook").addEventListener("click",this.remove.bind(this)),this.element.querySelector(".picphoto").addEventListener("click",this.changeimage.bind(this)),this.element.querySelectorAll(".formcomponent").forEach(e=>e.addEventListener("click",this.showeditselect.bind(this))),this.element.querySelectorAll(".edit-select li").forEach(e=>e.addEventListener("click",this.changeselectvalue.bind(this))),this.element.querySelector("button.savedata").addEventListener("click",this.savetunedata.bind(this)),this.element.querySelector(".searchphoto").addEventListener("click",this.showinputforpicsearch.bind(this)),this.element.querySelector(".searchpics").addEventListener("change",this.searchpics.bind(this))}async savetunedata(e){e.preventDefault();const t={...l.template.tunebook};t.tunes_id=this.isNew?this.tune.id:this.tune.tuneref.id,t.user_id=l.user.id,t.preferred_img_url=this.element.querySelector(".picphoto").src,t.prefered_name=this.element.querySelector('[data-name="titulo"]').textContent,t.prefered_tone=this.element.querySelector('[data-name="tonalidad"]').textContent,t.learned_date=this.element.querySelector('input[name="learneddate"]').value,t.rehearsal_days=this.element.querySelector('input[name="numrehearsals"]').value,t.last_rehearsals=[],!this.isNew&&Array.isArray(this.tune.last_rehearsals)&&(this.tune.last_rehearsals.length>10&&this.tune.last_rehearsals.slice(0,10),t.last_rehearsals=this.tune.last_rehearsals);const a=this.element.querySelector('[data-name="status"]').textContent,r=l.status.find(c=>c.label==a);if(t.status_num=r.value??0,t.tags=this.element.querySelector('[name="tags"]').value.split(" "),t.tags=t.tags.filter(c=>c!=""),t.notes=this.element.querySelector('[name="notes"').value.trim(),this.isNew)try{const c=await L.addtotunebook(t);c&&(c.tuneref=l.tunes.find(d=>d.id===c.tunes_id),p.calcValueforTunes(c),l.tunebook.push(c),new b("success","Se ha añadido el tema a tu tunebook."))}catch(c){console.log(c)}else try{const c=await L.edittunebooktune(this.tune.id,t);if(c){const d=l.tunebook.findIndex(g=>g.id==this.tune.id);l.tunebook[d]={...l.tunebook[d],...c},p.calcValueforTunes(l.tunebook[d]),new b("success","Se han guardado los cambios en el tema.")}}catch(c){console.log(c)}const i=u.getinstance("Tunebook");i.resetFilter(),i.populateFilterOptions(),this.remove()}showinputforpicsearch(){this.element.querySelector(".searchpics").classList.remove("hidden")}async searchpics(e){e.currentTarget.classList.add("hidden");const t=e.currentTarget.value;t.length>3&&(this.pics=await V.search(t,10),new b("success","Se han encontrado imágenes nuevas. Pulse para verlas."))}changeimage(e){const t=e.currentTarget;this.pics[0]===t.src&&this.pics.shift(),this.pics.push(t.src),t.src=this.pics.shift()}showeditselect(e){e.currentTarget.querySelector(".edit-select").classList.remove("hidden")}changeselectvalue(e){e.stopImmediatePropagation();const t=e.currentTarget,a=t.parentNode,r=a.previousElementSibling;a.classList.add("hidden"),r.textContent=t.textContent}}class kt extends S{constructor(e,t,a){super(e,t);o(this,"tunedetail");o(this,"isintunebook");this.tunedetail=l.tunes.find(r=>r.id===a),this.isintunebook=l.tunebook.some(r=>r.tunes_id==a),this.setup()}setup(){this.attachAt(this.generatehtml(),!1),this.addListeners()}generatehtml(){var e,t;return`
    <li class="${this.isintunebook?"opacity-50":"cursor-pointer hover:bg-white/25"}
    flex gap-2 items-baseline px-4 py-3 border-y border-slate-400" 
    data-id="${this.tunedetail.id}">
        ${(e=this.tunedetail)!=null&&e.ABCsample?`<span data-state="stop" data-abc="${this.tunedetail.ABCsample}" 
          class="player rounded-full bg-black p-1 w-8 h-8 flex">
          <i class="fa fa-play-circle fa-lg m-auto"></i></span>`:""}
        <span class="font-bold">${this.tunedetail.main_name}</span>
        <em class="text-xs text-slate-300">${this.tunedetail.type}</em>
        <span class="text-xs uppercase">${(t=this.tunedetail)!=null&&t.tradition?this.tunedetail.tradition.join(" · "):""}</span>
        ${this.tunedetail.popularity?`<span class="ml-auto bg-slate-600
        p-1 rounded-lg text-xs w-16 text-center" title="popularidad">
        <i class="fa fa-star mr-1"></i>
        ${this.tunedetail.popularity}</span>`:""}
    </li>`}addListeners(){var e;this.isintunebook||this.element.addEventListener("click",this.showmodaltune.bind(this)),(e=this.tunedetail)!=null&&e.ABCsample&&this.tunedetail.ABCsample.length>0&&this.element.querySelector(".player").addEventListener("click",P.manageabc)}showmodaltune(){u.getinstance("Tunebook").subelements.push(new He("addtunetobook",u.htmlelement,this.tunedetail.id))}}class Lt extends S{constructor(e,t){super(e,t);o(this,"tunes",l.tunes);o(this,"listoftunebookids");o(this,"resultszone");o(this,"resultInstances");this.setup()}setup(){const e=this.generatehtml();this.element?this.element.outerHTML=e:this.attachAt(e,!1),this.resultszone=this.element.querySelector(".results"),this.addListeners()}generatehtml(){return`
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75">
    <div id="${this.name}" class="animate__animated animate__slideInLeft
     fixed inset-0 w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-gray-400 flex p-6 
     shadow-lg">
            <div class="bg-white p-6 w-full rounded max-h-lvh overflow-auto">
                <p id="closetunesearch" class="text-right" title="close">
                <i class="fa fa-times-circle fa-2x"></i></p>
                <h2 class="text-2xl text-gray-400 font-bold mb-4">
                Añadir nuevos temas a tu repertorio</h2>
                <input id="tunesearchfield" class="w-full" type="text" 
                placeholder="escribe parte del nombre para ver resultados">
                <p class="info mt-6 mb-2"></p>
                <div class="sugestion hidden">
                    <input type="text" class="titlesuggestion" size="40" 
                    placeholder="escriba el título del tune que desea">
                    <button class="sendsuggestion bg-blue-600 text-white p-2 
                    rounded-md uppercase">enviar</button>
                </div>
                <ul class="results hidden bg-slate-500 text-slate-50 p-2"></ul>
          </div>
        </div>
      </div>`}addListeners(){this.element.querySelector("#tunesearchfield").addEventListener("input",this.search.bind(this)),this.element.querySelector("#closetunesearch").addEventListener("click",this.eliminate.bind(this)),this.element.querySelector(".sendsuggestion").addEventListener("click",this.suggestion.bind(this))}search(e){const t=this.element.querySelector(".info"),a=this.element.querySelector(".sugestion");t.textContent="";const r=e.target.value.toLowerCase();if(r.length>0){const i=this.tunes.filter(c=>c.other_names.some(d=>d.toLowerCase().includes(r)));i.length>0?(a.classList.add("hidden"),t.textContent=`Encontrados ${i.length} resultados:`):(this.resultszone.innerHTML="",this.resultInstances="",t.textContent=`Sin resultados en la base de datos.
        Si crees que el tema debería aparecer, por favor escribe el título
        a continuación e intentaremos añadirlo. Gracias!`,a.classList.remove("hidden")),this.generateresults(i)}}generateresults(e){e.length>0?(this.resultszone.classList.remove("hidden"),this.resultszone.innerHTML="",this.resultInstances=e.map(t=>new kt("tune"+t.id,this.resultszone,t.id))):this.resultszone.classList.add("hidden")}eliminate(){this.element.classList.remove("animate__slideInLeft"),this.element.classList.add("animate__slideOutLeft"),this.element.addEventListener("animationend",()=>{this.remove();const e=u.getinstance("Tunebook"),t=e.subelements.findIndex(a=>a.name==this.name);e.subelements.splice(t,1)})}async suggestion(e){const t=this.element.querySelector(".titlesuggestion").value;if(t){const a={...l.template.suggestion};a.type_of_suggestion="tune",a.user_id=l.user.id,a.content=t,a.status="waiting",await L.addsuggestion(a)?(this.setup(),new b("success","Se ha guardado su petición.")):(this.data=backup,new b("danger","error al guardar la petición."))}}}class _t extends S{constructor(s,e,t,a){super(s,e),this.id=t,this.data=l.tunebook.find(r=>r.id===t),this.format=a,this.setup()}setup(){const s=this["generatehtml_"+this.format]();this.element?this.replace(s):this.attachAt(s,!1),this.addlisteners()}addlisteners(){this.element.querySelector(".rehearsal").addEventListener("click",this.addrehearsal.bind(this)),this.element.querySelector(".deletetune").addEventListener("click",this.deletetune.bind(this)),this.element.querySelector(".edittune").addEventListener("click",this.quickedit.bind(this)),this.element.addEventListener("click",this.viewdetails.bind(this)),this.data.tuneref.ABCsample&&this.element.querySelector(".playabc").addEventListener("click",P.manageabc)}generatehtml_card(){var t,a,r;const s=p.getstatus(this.data.status_num),e=p.generatelinks((t=this.data.tuneref)==null?void 0:t.References);return`<div id="tune${this.data.id}" class="group cursor-pointer flex 
    flex-col border-t-8 border-${s.color} relative tunecard 
    bg-white shadow-md rounded-md p-6 transition duration-300 ease-in-out 
    hover:shadow-lg hover:scale-110 hover:z-40">
        <div class="tuneimg flex h-52 -mt-6 -mx-6 bg-center bg-cover 
        bg-[url('${this.data.preferred_img_url??`https://picsum.photos/200/200?random=${this.data.id}`}')]">
        ${this.data.tuneref.ABCsample?`<span data-abc="${this.data.tuneref.ABCsample}" data-state="stop"
             class="opacity-0 transition group-hover:opacity-100 playabc
             text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
            <i class=" m-auto fa fa-circle-play fa-5x"></i><span>`:""}
        </div>
        <span class="px-2 py-1 rounded-md text-sm absolute top-4 left-3 
        uppercase text-slate-700/75 font-bold bg-${s.color}/75" >
         ${s.label}</span>
         ${this.data.prefered_tone?`<div class="absolute right-3 top-4 px-2 py-1 bg-slate-800/70 
        text-white/90 rounded-lg text-sm" title="Tonalidad">
            <span class="group/item ml-1 font-medium uppercase">
            ${this.data.prefered_tone.substring(0,5)}
            <img class="group-hover/item:visible invisible w-42 fixed inset-0 
        h-auto m-auto border border-slate-400 p-4 bg-white/90 rounded-lg 
        shadow-2xl z-40" src="./img/${p.removeWhiteSpaces(this.data.prefered_tone.substring(0,5))}.png">
           </span>
        </div>`:""}

        ${this.data.notes.trim()?`<div class="absolute right-3 top-40 mt-2">
        <i class="fa-solid fa-2x fa-note-sticky text-yellow-300/75 
        shadow-lg"></i>
        <span class="absolute hidden group-hover:block -right-8 bottom-10 
        w-40 shadow-xl rounded-md text-xs p-2 bg-yellow-200 text-slate-500 
        z-40">
        ${this.data.notes}</span>
        </div>`:""}
        <div class="flex gap-2 items-center justify-center -mt-8 rounded-md
        w-fit mx-auto px-2 bg-white/50 group-hover:bg-white/85 shadow-lg">
        <p class="text-center text-xs text-slate-800/75 px-2 py-1 uppercase">
            <i class="opacity-75 fas fa-stopwatch">
            </i> <span class="lastrehearsal ml-1">
            ${p.calctimesince((a=this.data)==null?void 0:a.last_rehearsals[0])}</span>
        </p>
        <p class="text-center text-xs text-slate-800/75 px-2 py-1 uppercase">
            <span class="numrehearsal"><i class="opacity-75 
            fas fa-calendar-check">
            </i> ${(r=this.data)==null?void 0:r.rehearsal_days}</span>
        </p>
          </div>
        <h2 class="leading-none tunetitle text-xl font-medium text-center 
        mt-5 mb-2 text-blue-900">${this.data.prefered_name}
        <span>${e.join("")}</span></h2>
        <p class="tuneadditionaldata text-slate-400 font-regular uppercase 
        text-xs text-center mb-2"><span class="font-medium mr-1 text-slate-500">
        ${this.data.tuneref.type}</span>${this.data.tuneref.author}</p>
        <div class="mytags text-xs flex flex-wrap gap-1 justify-center">
        ${this.generatetags()}
        </div>
        <div class="flex gap-1 mt-auto justify-center opacity-0 
        transition-opacity duration-300 group-hover:opacity-100
        scale-0 group-hover:scale-100">
            <button class="uppercase font-medium rehearsal bg-blue-500 px-3 
            py-1 rounded-md text-white text-bold hover:bg-blue-700" 
            title="añadir ensayo"><i class="fa fa-bolt mr-1"></i></button>
            <button class="uppercase font-medium edittune bg-slate-400 px-3 py-1
            rounded-md text-white text-bold hover:bg-slate-700" 
            title="edicion rapida"><i class="fa fa-gear"></i></button>
            <button class="uppercase font-medium deletetune bg-red-500 px-3 py-1
             rounded-md text-white text-bold hover:bg-red-700" 
             title="borrar tema"><i class="fa fa-trash"></i></button>
        </div>
        </div>`}generatetags(){let s="";return Array.isArray(this.data.tags)&&this.data.tags.length>0&&this.data.tags.forEach(e=>{s+=`<span class="bg-yellow-100 text-slate-600/75 p-2
        uppercase">${e}</span>`}),s}generatehtml_list(){var e;const s=p.getstatus(this.data.status_num);return`<div id="tune${this.data.id}" class="tunelist group w-full bg-white
     border-b-2 border-slate200 rounded-md px-6 py-2 flex items-center gap-2">
      <div class="tuneimg flex h-20 w-20 bg-center bg-cover mr-3
      bg-[url('${this.data.preferred_img_url??`https://picsum.photos/200/200?random=${this.data.id}`}')]">
      ${this.data.tuneref.ABCsample?`<span data-abc="${this.data.tuneref.ABCsample}" data-state="stop"
            class="opacity-0 transition group-hover:opacity-100 playabc
            text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
          <i class="m-auto fa fa-circle-play fa-3x"></i><span>`:""}
      </div>
      <div class="w-20 text-center border border-slate-200 p-1 rounded-md">
        <p class="numrehearsal bg-slate-500 text-white font-medium px-2
        rounded-lg"> ${this.data.rehearsal_days} 
        <i class="opacity-75 fas fa-calendar-check"></i></p>
      <p class="lastrehearsal text-xs text-slate-400 uppercase mt-1">
      ${p.calctimesince((e=this.data)==null?void 0:e.last_rehearsals[0])}</p>
      </div>
      <div>
        <p class="px-2 py-1 w-32 text-center rounded-md text-xs 
        top-4 left-3 uppercase text-slate-700/75 font-bold
        bg-${s.color}/75">${s.label}</p>            
        <h2 class="tunetitle text-xl font-semibold mr-2">
        ${this.data.prefered_name} 
        <span class="group/item ml-1 text-sm bg-slate-200 rounded-md p-1 px-2 
        font-medium
        uppercase text-slate-500">${this.data.prefered_tone.substring(0,5)}
        <img class="group-hover/item:visible invisible w-42 fixed inset-0 
        h-auto m-auto border border-slate-400 p-4 bg-white/90 rounded-lg 
        shadow-2xl" src="./img/${p.removeWhiteSpaces(this.data.prefered_tone.substring(0,5))}.png">
        </span>
        </h2>
        <p class="tuneadditionaldata text-slate-400 font-regular uppercase 
        text-xs mb-2"><span class="font-medium mr-1 text-slate-500">
        ${this.data.tuneref.type}</span>${this.data.tuneref.author}</p>
      </div>
      <div class="flex gap-1 ml-auto items-center">
        <button class="rehearsal bg-blue-400 p-1 rounded-md text-white 
        text-bold" title="añadir ensayo"><i class="fa fa-guitar 
        fa-fw fa-lg"></i></button>
        <button class="edittune bg-red-400 p-1 rounded-md text-white 
        text-bold" title="editar tema"><i class="fa fa-gear fa-fw 
        fa-lg"></i></button>
        <button class="deletetune bg-red-400 p-1 rounded-md text-white 
        text-bold" title="eliminar tema"><i class="fa fa-trash fa-fw 
        fa-lg"></i></button>
    </div>
  </div>`}async addrehearsal(s){if(s.stopPropagation(),u.addrehearsal(this.data.id)){const t=u.activeScreen;t.rendertunes(t.filtered)}}viewdetails(){}quickedit(){const s=u.activeScreen;s.subelement=new He("modaltuneedit",s.element,this.data.id,"edit")}async deletetune(){if(await L.deletetunebooktune(this.data.id)){const e=l.tunebook.findIndex(a=>a.id==this.data.id);l.tunebook.splice(e,1),new b("success",`eliminado el tema ${this.data.prefered_name} del repertorio.`);const t=u.activeScreen;t.rendertunes(t.filtered)}else new b("danger","no se ha podido eliminar el tema.")}}class At extends S{constructor(e,t){super(e,t);o(this,"max_non_active",3);o(this,"filtered",[]);o(this,"criterialist",[{value:"titlesort",label:u.poly.t("tunebook.sorttitle")},{value:"status_num",label:u.poly.t("tunebook.sortstatus")},{value:"last_rehearsalDate",label:u.poly.t("tunebook.sortlast"),selected:!0},{value:"prefered_tone",label:u.poly.t("tunebook.sortkey")},{value:"rehearsal_days",label:u.poly.t("tunebook.sortnumber")}]);o(this,"sortcriteria","last_rehearsalDate");o(this,"sortorder","DESC");o(this,"tune_instances",[]);o(this,"typeslist",[]);o(this,"statuslist",[]);o(this,"toneslist",[]);o(this,"contentzone",null);o(this,"format","card");o(this,"subelement");this.setup()}setup(e=l.tunebook){this.filtered=e;const t=this.generatehtml();this.element?this.replace(t):this.attachAt(t,!1),this.populateFilterOptions(),this.contentzone=this.element.querySelector("main"),this.filterzone=this.element.querySelector(".filtercomponent"),this.filternotice=this.element.querySelector(".filternotice"),this.counter=this.element.querySelector(".tunecounter"),this.addListeners(),this.rendertunes()}addListeners(){this.element.querySelector("#tunebook_filter").addEventListener("input",this.applyFilter.bind(this)),this.element.querySelector("#typetune_filter").addEventListener("change",this.applyFilter.bind(this)),this.element.querySelector("#tonetune_filter").addEventListener("change",this.applyFilter.bind(this)),this.element.querySelector("#statustune_filter").addEventListener("change",this.applyFilter.bind(this)),this.element.querySelector(".resetfilter").addEventListener("click",this.resetFilter.bind(this)),this.element.querySelector(".addnewtune").addEventListener("click",this.launchsearch.bind(this)),this.element.querySelectorAll(".viewselector").forEach(e=>e.addEventListener("click",this.changeview.bind(this))),this.element.querySelector(".tunesorting").addEventListener("change",this.applysort.bind(this)),this.element.querySelector(".sortorder").addEventListener("click",this.changesortorder.bind(this))}rendertunes(){this.contentzone.innerHTML="";const e=this.sorter(this.filtered);this.tune_instances=e.map(t=>new _t("tune"+t.id,this.contentzone,t.id,this.format))}generatehtml(){return`
    <section id="${this.name}">
      <header class="p-6">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-3xl">${u.poly.t("tunebook.title")}</h3>
          <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 
          uppercase text-slate-200 rounded-lg text-md">
          <span class="tunecounter">${this.filtered.length}</span> ${u.poly.t("tunebook.tunes")}
          </span></h3>
          <span class="addnewtune text-blue-600 hover:text-blue-400">
          <i class="fa fa-plus-circle fa-2x"></i></span>
          <div class="ml-auto flex items-center gap-1 mr-3">
            <span class="viewselector p-1 rounded-md
            ${this.format=="card"?"selected bg-slate-500 text-white":""}"
            data-format="card">
              <i class="fa fa-fw fa-grip fa-lg"></i></span>
            <span class="viewselector p-1 rounded-md
            ${this.format=="list"?"selected bg-slate-500 text-white":""}"
            data-format="list">
              <i class="fa fa-fw fa-list fa-lg fa-fw"></i></span>
          </div>
          <div class="filtercomponent border border-slate-400 p-2 rounded-md">
          <i class="fas fa-filter"></i>
          <select id="typetune_filter" class="text-sm 
          bg-cyan-200 text-cyan-500 p-1 rounded-md border-0">
          </select>
          <select id="statustune_filter" class="text-sm 
          bg-cyan-200 text-cyan-500 p-1 rounded-md border-0">
         </select>
          <select id="tonetune_filter" class="text-sm 
          bg-cyan-200 text-cyan-500 p-1 rounded-md border-0">
          </select>
          <input type="search" id="tunebook_filter" 
          placeholder="${u.poly.t("tunebook.search")}"
          class="w-32 rounded-md bg-white/50 p-1 text-sm text-slate-500 
          border-slate-300">
          </div>
        </div>
        <p class="filternotice bg-slate-500 rounded-lg text-white p-2 text-xs 
        mb-2 w-64 flex uppercase hidden">${u.poly.t("tunebook.show")} 
        <span class="numfiltered mx-1 font-bold"></span> ${u.poly.t("tunebook.filtered")}
        <span class="resetfilter ml-auto cursor-pointer hover:text-white/75">
        <i class="fa fa-times-circle fa-lg"></i></span>
        </p>
        <p><span class="sortorder"><i class="fa-solid 
        ${this.sortorder=="ASC"?"fa-arrow-down-short-wide":"fa-arrow-up-wide-short"}"></i></span>
          <select class="tunesorting text-sm bg-cyan-200 text-cyan-500 p-1 
          rounded-md border-0">
          ${this.criterialist.map(e=>`<option ${e!=null&&e.selected?"selected":""}
      value="${e.value}">${e.label}</option>`).join("")}
          </select>
        </p>
      </header>
      <main class="p-6 ${this.format=="card"?"grid gap-6":""}" 
        style="grid-template-columns: repeat(auto-fit, 350px);
        justify-content: center;">
      </main>
    </section>`}populateFilterOptions(){this.generateFilterList();const e=this.element.querySelector("#typetune_filter"),t=this.element.querySelector("#tonetune_filter"),a=this.element.querySelector("#statustune_filter");this.statuslist.push([99,"activas"]),p.generatefilteroptions(e,u.poly.t("tunebook.alltypes"),this.typeslist),p.generatefilteroptions(t,u.poly.t("tunebook.allkeys"),this.tonelist),p.generatefilteroptions(a,u.poly.t("tunebook.allstatus"),this.statuslist)}generateFilterList(){this.typeslist=p.getUniqueValues(l.tunebook.map(e=>e.tuneref.type)).sort(),this.statuslist=p.getUniqueValues(l.tunebook.map(e=>e.status_num)).sort(),this.tonelist=p.getUniqueValues(l.tunebook.map(e=>e.prefered_tone)).sort(),this.statuslist=this.statuslist.map(e=>{const t=l.status.find(a=>a.value==e);return[t.value,t.label]})}sorter(e){return e.sort((t,a)=>t[this.sortcriteria]<a[this.sortcriteria]?this.sortorder=="ASC"?-1:1:t[this.sortcriteria]>a[this.sortcriteria]?this.sortorder=="ASC"?1:-1:0),e}applysort(e){if(e.target instanceof HTMLInputElement){const t=e.target.value;this.sortcriteria=t,this.rendertunes()}}changesortorder(){this.sortorder=this.sortorder=="ASC"?"DESC":"ASC";const e=this.element.querySelector(".sortorder i");this.sortorder=="ASC"?(e.classList.remove("fa-arrow-up-wide-short"),e.classList.add("fa-arrow-down-short-wide")):(e.classList.remove("fa-arrow-down-short-wide"),e.classList.add("fa-arrow-up-wide-short")),this.rendertunes()}resetFilter(){this.element.querySelector("#tunebook_filter").value="",this.element.querySelector("#typetune_filter").value="",this.element.querySelector("#statustune_filter").value="",this.element.querySelector("#tonetune_filter").value="",this.filtered=l.tunebook,this.filternotice.classList.add("hidden"),this.rendertunes()}applyFilter(){const e=this.element.querySelector("#tunebook_filter").value.toLowerCase(),t=this.element.querySelector("#typetune_filter").value,a=parseInt(this.element.querySelector("#statustune_filter").value),r=this.element.querySelector("#tonetune_filter").value;this.filtered=l.tunebook.filter(i=>{let c=!0;e!=""&&(c=i.prefered_name.toLowerCase().includes(e)||i.tuneref.other_names.join(",").toLowerCase().includes(e));let d=!0;t!=""&&(d=i.tuneref.type==t);let g=!0;isNaN(a)||(a===99?g=i.status_num>this.max_non_active:g=i.status_num===a);let $=!0;return r!=""&&($=i.prefered_tone==r),c&&d&&g&&$}),this.filtered.length<l.tunebook.length?(this.filternotice.querySelector(".numfiltered").textContent=this.filtered.length,this.filternotice.classList.remove("hidden"),this.rendertunes()):this.resetFilter()}changeview(e){const t=e.currentTarget;t instanceof HTMLBodyElement&&t.dataset.format!=this.format&&(this.element.querySelector(".viewselector.selected").classList.remove("selected","bg-slate-500","text-white"),t.classList.add("selected","bg-slate-500","text-white"),this.format=t.dataset.format,this.contentzone.classList.toggle("grid"),this.rendertunes())}launchsearch(){this.subelements=new Lt("tunesearch",this.element)}}class Et extends S{constructor(e,t,a,r=0){super(e,t);o(this,"contentzone");o(this,"parent");o(this,"set");this.parent=a,this.isNew=r===0,this.isNew||(this.set=l.setbook.find(i=>i.id===r),this.tunes=this.set.tunes),this.setup()}setup(){this.attachAt(this.generatehtml(),!1),this.contentzone=this.element.querySelector("main"),this.addListeners()}rendersets(e){this.contentzone.innerHTML="",this.element.querySelector("#num_of_tunes").innerHTML=e.length+" temas",this.items=e.map(t=>new Setitem("tune"+t.id,this.contentzone,t,this.format))}generatehtml(){return`
     <div id="modalvideoadd" class="fixed inset-0 bg-gray-500 bg-opacity-75 
    flex items-center justify-center">
      <div class="bg-white p-8 rounded-xl shadow-lg w-auto relative
      max-h-full overflow-scroll">
        <p id="closeaddvideo" class="absolute right-4 top-4 text-red-400 
        text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
        <h2 class="text-2xl text-blue-400 font-semibold mb-3">
        ${this.isNew?"Añadir nuevo video":"Editar video"}</h2>
        </h2>

        <div class="flex justify-center gap-3">
            <label class="uppercase text-slate-400 text-sm mt-4">
            Youtube video URL (ID)</label>
            <input class="getVideoKey" type="text" 
            placeholder="paste a youtube URL" 
            value="${this.isNew?"":this.video.url}">
        </div>

        <main class="mt-3 grid md:grid-cols-2 xl:grid-cols-5 gap-4">
          <section id="form" class="xl:col-span-2">
            <div class="flex flex-col gap-2">
  ${Utils.generateformfield("titulo","titulo del vídeo",this.isNew?"":this.video.Title,null,!0)}
  ${Utils.generateformfield("artista","artista",this.isNew?"":this.video.Performer,null,!0)}
  ${Utils.generateformfield("type","Categoría de vídeo",this.isNew?"":this.video.type,l.videotypes)}
              <div class="flex flex-col border-2 p-4 border-slate-100 
              bg-slate-50 rounded-md mb-4">
                <label class="uppercase text-slate-400 text-sm">
                Notas</label>   
                <textarea 
                name="notes">${this.isNew?"":this.video.notes}</textarea>
              </div>        
          <section class="tunesaddition ${this.isNew?"hidden":""}
          bg-slate-100 border 
              border-slate-300 p-4">
          <div id="datatuneadd" class="flex gap-3 tunecontainer">
              <datalist id="alltunes">
                ${this.isNew?"":this.getfulllistoftunes()}
              </datalist>
              <input list="alltunes" class="tuneselector p-1 txt-sm mx-auto" 
              name="tuneselector" placeholder="añadir un tema">
          </div>   
          <ul class="listoftunes mt-2"></ul>    
        </section>
      </div>
      </section>
          <section id="videocontainer" class="xl:col-span-3">
          </section>
          </main>
      <div class="flex items-center justify-center mt-6">
        <button disabled class="sendbutton px-4 py-3 rounded-md bg-blue-500 
        text-white text-md font-bold uppercase mr-4">Guardar video</button>
      </div>
    <div>
  </div>`}}let Tt=class extends S{constructor(s,e,t){super(s,e),this.id=t,this.data=l.setbook.find(a=>a.id===this.id),this.setup()}setup(){this.attachAt(this.generatehtml(),!1),this.addListeners()}generatehtml(){let s="";return this.data.tunes.forEach(e=>{const t=l.tunebook.find(a=>a.id===e.tunebook_id);t&&(s+=`
        <div class="border border-slate-300 rounded-md p-4 bg-slate-100">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img class="mr-2 h-10 w-10 rounded-full object-cover" 
              src="${t.preferred_img_url}">
              <div>
                <h3 class="text-base font-semibold text-gray-900">
                ${t.prefered_name}</h3>
                <span class="block text-xs font-normal text-gray-500">
                ${t.tuneref.Estructure} · 
                ${t.tuneref.compasses?t.tuneref.compasses+" compases · ":""}
                <em>${e.notes}</em></span>
              </div>
            </div>
            <p class="text-sm font-regular text-slate-400">
            ${t.tuneref.type} <span class="uppercase font-bold ml-1">
            ${t.prefered_tone}</span></p>
          </div>
        </div>`)}),`<div class="group transition w-full my-3 p-6 rounded-lg shadow-lg 
    shadow-gray-300 bg-white/75 hover:bg-white relative" 
    data-id="${this.data.id}">
      <div class="absolute right-6 top-6 flex gap-1 mt-auto justify-end 
      opacity-0 transition duration-300 group-hover:opacity-100 scale-0 
      group-hover:scale-100">
        <button class="uppercase font-medium addrehearsal bg-blue-500 px-3 
        py-1 rounded-md text-white text-bold hover:bg-blue-700" 
        title="añadir ensayo"><i class="fa fa-bolt mr-1"></i></button>
        <button class="uppercase font-medium editset bg-slate-400 px-3 py-1
        rounded-md text-white text-bold hover:bg-slate-700" 
        title="edicion"><i class="fa fa-gear"></i></button>
        <button class="uppercase font-medium deleteset bg-red-500 px-3 py-1
          rounded-md text-white text-bold hover:bg-red-700" 
          title="borrar tema"><i class="fa fa-trash"></i></button>
        </div>
      <h3 class="font-medium text-lg">
      <strong>#${this.data.id}</strong> ${this.data.title}
      <span class="font-normal text-sm text-slate-500">
      ${this.data.created_at}</span>
      </h3>
      <p class="text-sm font-light text-slate-500">${this.data.notes}</p>
      <div class="items flex flex-col gap-1">
      ${s}
      </div>
    </div>`}addListeners(){this.element.querySelector(".addrehearsal").addEventListener("click",this.addrehearsal.bind(this)),this.element.querySelector(".editset").addEventListener("click",this.editset.bind(this)),this.element.querySelector(".deleteset").addEventListener("click",this.deleteset.bind(this))}addrehearsal(){}editset(){}deleteset(){}};class qt extends S{constructor(e,t){super(e,t);o(this,"contentzone");o(this,"subelements",[]);this.setup()}setup(){this.attachAt(this.generatehtml(),!1),this.contentzone=this.element.querySelector("main"),this.addListeners(),this.rendersets(l.setbook)}generatehtml(){return`<section id="${this.name}">
      <header class="p-6">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-3xl">Mis sets</h3>
          <span class="num_of_sets bg-slate-400 text-sm px-2 py-1 
          uppercase text-slate-200 rounded-lg text-md">
          ${l.setbook.length} sets</span>
          <span class="addnewset text-blue-600 hover:text-blue-400">
          <i class="fa fa-plus-circle fa-2x"></i></span>
        </div>
      </header>
      <main class="p-6"></main>
    </section>`}addListeners(){this.element.querySelector(".addnewset").addEventListener("input",this.createnewset.bind(this))}rendersets(e){this.contentzone.innerHTML="",this.element.querySelector(".num_of_sets").innerHTML=e.length+" sets",this.items=e.map(t=>new Tt("set"+t.id,this.contentzone,t.id))}createnewset(){this.subelements.push(new Et("newset",this.element))}}class jt extends S{constructor(e,t){super(e,t);o(this,"points");o(this,"turns");o(this,"drawbase");o(this,"rightanswer");o(this,"tiempo");o(this,"numoftunes");o(this,"numofturns");o(this,"maxscore");this.setup()}setup(){this.turns=0,this.points=0,this.numoftunes=5,this.numofturns=20,this.maxscore=1e3,this.audioKO=new Audio("./audio/Sad_Trombone-Joe_Lamb-665429450.mp3"),this.audioOK=new Audio("./audio/SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408.mp3"),this.drawbase=l.tunes.filter(e=>e.ABCsample&&e.ABCsample.length>0),this.attachAt(this.generatehtml(),!1),this.gamezone=this.element.querySelector("main"),this.addListeners()}generatehtml(){return`<section id="${this.name}">
    <header class="p-6">
        <div class="flex flex-wrap items-center gap-2">
            <h3 class="text-3xl">Juego</h3>
                <span class="turns bg-slate-400 text-sm px-2 py-1 
                uppercase text-slate-200 rounded-lg text-md">
                ${this.turns} Intentos</span> 
                <span class="points bg-slate-400 text-sm px-2 py-1 
                uppercase text-slate-200 rounded-lg text-md">
                ${this.points} Puntos</span> 
            </h3>
        </div>
        <button class="newgame">Nueva partida</button>
    </header>
    <main class="p-6"></main>
    </section>`}addListeners(){this.element.querySelector(".newgame").addEventListener("click",this.startgame.bind(this))}startgame(){this.turns=0,this.points=0,this.nextturn()}nextturn(){if(this.element.querySelector(".turns").textContent=this.turns+" intentos",this.element.querySelector(".points").textContent=this.points+" puntos",this.turns==this.numofturns)this.gamezone.innerHTML="",this.showresult("right",`Fin de la partida. Has obtenido ${this.points} 
          puntos en ${this.turns} preguntas.`);else{const e=this.drawnewtunegroup(),t={abc:this.rightanswer.ABCsample,names:e.map(a=>({id:a.id,name:a.main_name}))};this.renderquiz(t)}}drawnewtunegroup(){const e=this.drawbase.length,t=[];let a,r;for(;t.length<this.numoftunes;)a=Math.floor(Math.random()*(e+1)),r={...this.drawbase[a]},t.includes(r)||t.push(r);return this.rightanswer=t[0],this.barajar(t)}renderquiz(e){this.gamezone.innerHTML=`
        <div class="question relative">
            <div class="flex p-6">
                <div data-abc="${e.abc}" data-state="stop" 
                class="rounded-full playabc h-48 w-48 bg-slate-600 flex 
                text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
                <i class=" m-auto fa fa-circle-play fa-5x"></i>
                </div>
            </div>
            <ul class="options divide-y w-1/2 m-auto border border-slate-200
             rounded-md bg-white p-8 shadow-md">
            ${e.names.map(t=>`<li class="text-lg p-4 
            text-center font-medium bg-slate-100 hover:bg-slate-200 
            cursor-pointer" data-value="${t.id}">${t.name}</li>`).join("")}
            </ul>
        </div>`,this.element.querySelector(".playabc").addEventListener("click",this.lanzatiempo.bind(this)),this.element.querySelectorAll(".options li").forEach(t=>{t.addEventListener("click",this.checkanswer.bind(this))})}lanzatiempo(e){this.tiempo=new Date,P.manageabc(e)}barajar(e){const t=[...e];for(let a=t.length-1;a>0;a--){const r=Math.floor(Math.random()*(a+1));[t[a],t[r]]=[t[r],t[a]]}return t}checkanswer(e){P.stopabc(),e.currentTarget.classList.add("bg-slate-700","text-white","font-bold");const t=e.currentTarget.dataset.value;this.turns++;const r=new Date-this.tiempo;t==this.rightanswer.id?(this.audioOK.play(),this.points+=Math.max(Math.floor(this.maxscore-r/100),0),this.showresult("right","Has dado la respuesta correcta")):(this.audioKO.play(),this.showresult("wrong","La respuesta correcta es <strong>"+this.rightanswer.main_name+"</strong>"))}showresult(e,t){const a=`<div class="animate__animate 
    ${e=="right"?"animate__bounceIn bg-green-700":"animate__backInDown bg-red-600"} 
    message shadow-xl absolute top-64 p-12 rounded-lg text-3xl text-white
    left-1/3 right-1/3 text-center">${t}</div>`;this.gamezone.insertAdjacentHTML("beforeend",a),this.gamezone.querySelector(".message").addEventListener("click",this.nextturn.bind(this))}}class ke extends S{constructor(e,t,a){super(e,t);o(this,"video");o(this,"tune");o(this,"metatune");this.video=l.videos.find(r=>r.id==a.videoid),this.tune=l.tunes.find(r=>r.id==a.tunes_id),this.setup(),this.metatune=a}async setup(){this.attachAt(this.generatehtml(),!1),this.addListeners()}addListeners(){this.element.querySelector(".removetune").addEventListener("click",this.remove.bind(this))}async remove(){if(this.tune.medialinks&&this.tune.medialinks.some(e=>e.videoid==this.video.id)){this.tune.medialinks=this.tune.medialinks.filter(e=>e.videoid!=this.video.id);try{await L.edittune(this.tune.id,this.tune)&&new b("success",`Se ha borrado referencia al tema ${tune.main_name}.`)}catch(e){new b("danger",`No se ha podido borrar referencia al tema ${tune.main_name}.`),console.log(e)}}super.remove()}generatehtml(){return`
        <li class="flex txt-xs bg-slate-500 text-white/80 p-2 gap-3"
         data-id="${this.tune.id}">
        <h2 class="font-semibold">${this.tune.main_name}</h2>
        <div class="ml-auto">
          <label class="uppercase text-slate-400 text-sm mt-4">
          <i class="fa fa-clock"></i> de</label>
          <input type="number" name="inicio" 
          class="p-1 w-16 text-right text-slate-600"
          value="${this.metatune?this.metatune.start_time:0}">
        </div>
        <div>
            <label class="uppercase text-slate-400 text-sm mt-4">
            <i class="fa fa-clock"></i> a</label>
            <input type="number" name="final" 
            class="p-1 w-16 text-right text-slate-600"
            value="${this.metatune?this.metatune.end_time:0}">
        </div>
        <button class="removetune text-white ml-3">
        <i class="fa fa-times-circle fa-lg text-red-300"></i></button>
    </li>
        `}async savevideoreference(){const e={videos_id:this.video.id,tunes_id:this.tune.id,start_time:this.element.querySelector('[name="inicio"]').value,end_time:this.element.querySelector('[name="final"]').value,notes:""};try{await L.edittune(this.tune.id,e)&&new b("success",`Se ha guardado referencia al tema ${this.tune.main_name}.`)}catch(t){new b("danger",`No se ha podido guardar referencia al tema ${this.tune.main_name}.`),console.log(t)}}}class Ge extends S{constructor(e,t,a,r=0){super(e,t);o(this,"videokey");o(this,"videozone");o(this,"tuneszone");o(this,"video");o(this,"isNew");o(this,"tunes",[]);o(this,"instances");o(this,"parent");this.parent=a,this.isNew=r===0,this.isNew||(this.video=l.videos.find(i=>i.id==r),this.tunes=this.video.tuneslinks,this.videokey=this.video.url),this.setup()}async setup(){this.attachAt(this.generatehtml(),!1),this.videozone=this.element.querySelector("#videocontainer"),this.tuneszone=this.element.querySelector("ul.listoftunes"),this.inputvideo=this.element.querySelector(".getVideoKey"),this.inputtune=this.element.querySelector(".tuneselector"),this.isNew||(this.loadVideo(this.videokey),this.instances=this.tunes.map(e=>new ke("tune"+e.tunes_id,this.tuneszone,e))),this.addListeners()}addListeners(){this.element.querySelector("#closeaddvideo").addEventListener("click",this.remove.bind(this)),this.inputvideo.addEventListener("change",this.getVideoKey.bind(this)),this.inputtune.addEventListener("change",this.addtunetovideo.bind(this)),this.element.querySelector(".sendbutton").addEventListener("click",this.addvideo.bind(this)),this.element.querySelectorAll(".formcomponent").forEach(e=>e.addEventListener("click",this.showeditselect.bind(this))),this.element.querySelectorAll(".edit-select li").forEach(e=>e.addEventListener("click",this.changeselectvalue.bind(this)))}generatehtml(){return`
    <div id="modalvideoadd" class="fixed inset-0 bg-gray-500 bg-opacity-75 
    flex items-center justify-center">
      <div class="bg-white p-8 rounded-xl shadow-lg w-auto relative
      max-h-full overflow-scroll">
        <p id="closeaddvideo" class="absolute right-4 top-4 text-red-400 
        text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
        <h2 class="text-2xl text-blue-400 font-semibold mb-3">
        ${this.isNew?"Añadir nuevo video":"Editar video"}</h2>
        </h2>

        <div class="flex justify-center gap-3">
            <label class="uppercase text-slate-400 text-sm mt-4">
            Youtube video URL (ID)</label>
            <input class="getVideoKey" type="text" 
            placeholder="paste a youtube URL" 
            value="${this.isNew?"":this.video.url}">
        </div>

        <main class="mt-3 grid md:grid-cols-2 xl:grid-cols-5 gap-4">
          <section id="form" class="xl:col-span-2">
            <div class="flex flex-col gap-2">
  ${p.generateformfield("titulo","titulo del vídeo",this.isNew?"":this.video.Title,null,!0)}
  ${p.generateformfield("artista","artista",this.isNew?"":this.video.Performer,null,!0)}
  ${p.generateformfield("type","Categoría de vídeo",this.isNew?"":this.video.type,l.videotypes)}
              <div class="flex flex-col border-2 p-4 border-slate-100 
              bg-slate-50 rounded-md mb-4">
                <label class="uppercase text-slate-400 text-sm">
                Notas</label>   
                <textarea 
                name="notes">${this.isNew?"":this.video.notes}</textarea>
              </div>        
          <section class="tunesaddition ${this.isNew?"hidden":""}
          bg-slate-100 border 
              border-slate-300 p-4">
          <div id="datatuneadd" class="flex gap-3 tunecontainer">
              <datalist id="alltunes">
                ${this.isNew?"":this.getfulllistoftunes()}
              </datalist>
              <input list="alltunes" class="tuneselector p-1 txt-sm mx-auto" 
              name="tuneselector" placeholder="añadir un tema">
          </div>   
          <ul class="listoftunes mt-2"></ul>    
        </section>
      </div>
      </section>
          <section id="videocontainer" class="xl:col-span-3">
          </section>
          </main>
      <div class="flex items-center justify-center mt-6">
        <button disabled class="sendbutton px-4 py-3 rounded-md bg-blue-500 
        text-white text-md font-bold uppercase mr-4">Guardar video</button>
      </div>
    <div>
  </div>`}getfulllistoftunes(){return this.isNew?"":l.tunes.flatMap(t=>{const a=t.id;return t.other_names.map(r=>`<option value="${a}" label="${r}">${r}</option>`)}).join("")}getVideoKey(e){if(e.currentTarget instanceof HTMLInputElement){const t=e.currentTarget.value,a=p.extractYoutubeID(t);a&&(this.videokey=a,this.loadVideo(this.videokey),e.currentTarget.value=this.videokey)}}loadVideo(e){this.videozone.innerHTML=p.videoembed(e),this.element.querySelector(".sendbutton").disabled=!1,this.inputvideo.value=""}async addtunetovideo(e){const t=e.currentTarget,a=t.value;t.value="",this.tunes.push(a),this.instances.push(new ke("tune"+a,this.tuneszone,this.video.id,a))}async addvideo(e){e.preventDefault();const t={url:this.videokey,thumb_url:`https://i3.ytimg.com/vi/${this.videokey}/hqdefault.jpg`,type:this.element.querySelector('[data-name="type"]').textContent,Title:this.element.querySelector('[data-name="titulo"]').textContent,Performer:this.element.querySelector('[data-name="artista"]').textContent,notes:this.element.querySelector('[name="notes"]').textContent,album_relation:{}};if(this.isNew)if(l.videos.some(a=>a.url==this.videokey))new b("danger","Ya hay un video guardado con la misma url.");else try{await L.addvideo(t)&&(new b("success","Se ha guardado el nuevo vídeo."),u.getinstance("Videos").rendervideos(),this.remove())}catch(a){new b("danger","No se ha podido guardar el nuevo vídeo."),console.log(a)}else{t.id=this.video.id;try{await L.editvideo(this.video.id,t)&&(new b("success","Se ha actualizado el vídeo."),this.instances.forEach(i=>i.savevideoreference()),u.getinstance("Videos").rendervideos(),this.remove())}catch(a){new b("danger","No se ha podido actualizar el vídeo."),console.log(a)}}}showeditselect(e){e.currentTarget.querySelector(".edit-select").classList.remove("hidden")}changeselectvalue(e){e.stopImmediatePropagation();const t=e.currentTarget,a=t.parentNode,r=a.previousElementSibling;a.classList.add("hidden"),r.textContent=t.textContent}}class Pt extends S{constructor(e,t,a,r){super(e,t);o(this,"parent");this.parent=r,this.id=a,this.data=l.videos.find(i=>i.id===a),this.setup()}setup(){const e=this.generatehtml();this.attachAt(e,!1),this.addlisteners()}addlisteners(){this.element.querySelector(".mythumbvideo").addEventListener("click",this.showvideo.bind(this)),this.element.querySelector(".editbutton").addEventListener("click",this.editvideo.bind(this)),this.element.querySelector(".deletebutton").addEventListener("click",this.deletevideo.bind(this))}gettunedata(e){const t=l.tunes.find(a=>a.id==e);return`<li>${t.main_name} ${t.type}</li>`}generatehtml(){let e="";return this.data.tuneslinks&&this.data.tuneslinks.length>0&&(e=this.data.tuneslinks.map(t=>this.gettunedata(t.tunes_id)).join("")),`<div id="video${this.data.id}" class="videolist 
    relative w-full bg-white border-b-2 border-slate200 rounded-md flex 
    items-top border border-slate-300">
        <div class="mythumbvideo w-auto h-full min-w-96 min-h-48 bg-cover 
        bg-center bg-[url('${this.data.thumb_url}')]">
              <div class="hidden w-full">
              </div>
          </div>
          <div class="px-4 py-4 flex-col">
              <span class="bg-slate-500 text-slate-50 font-light uppercase 
              text-xs px-2 py-1 rounded-lg">${this.data.type}</span>  
              <h2 class="title mt-2 text-lg font-semibold leading-tight 
              text-slate-700">${this.data.Title}</h2>
              <p class="otherdata text-slate-600 text-sm">
              ${this.data.Performer}</p>
              <ul class="list-disc mt-2 text-xs bg-slate400 p-4">
                  ${e}
              </ul>
          </div>
          <div class="absolute right-2 top-2 flex gap-1 items-center">
              <button class="editbutton bg-blue-400 p-1 rounded-md text-white
              text-bold" title="editar">
              <i class="fa fa-edit fa-fw"></i></button>
              <button class="deletebutton bg-red-400 p-1 rounded-md text-white 
              text-bold" title="eliminar">
              <i class="fa fa-trash fa-fw"></i></button>
          </div>
      </div>`}showvideo(e){const t=e.currentTarget.firstElementChild;t.innerHTML=p.videoembed(this.data.url),t.classList.remove("hidden")}editvideo(){const e=u.getinstance("Videos");e.subelements.push(new Ge("modalvideoedit",e.element,this.data.id))}deletevideo(){}}class It extends S{constructor(e,t){super(e,t);o(this,"items",[]);o(this,"videozone",null);o(this,"subelements",[]);this.setup()}addListeners(){this.element.querySelector(".addnewvideo").addEventListener("click",this.modalnewvideo.bind(this))}async setup(){this.attachAt(this.generatehtml(),!1),this.videozone=this.element.querySelector("main"),this.addListeners(),(!l.videos||l.videos.length===0)&&(l.videos=await L.getallvideos(),l.videos&&l.videos.length>0&&new b("success",`cargados ${l.videos.length} videos.`)),this.rendervideos()}generatehtml(){return`<section id="${this.name}">
      <header class="p-6">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-3xl">Videos guardados</h3>
          <span class="num_of_videos bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">
          ${l.videos.length} videos</span></h3>
          <span class="addnewvideo text-blue-600 hover:text-blue-400">
          <i class="fa fa-plus-circle fa-2x"></i></span>
        </div>
      </header>
      <main class="p-6 grid lg:grid-cols-2 gap-3"></main>
      </section>`}rendervideos(e=l.videos){this.videozone.innerHTML="",this.element.querySelector(".num_of_videos").innerHTML=e.length+" videos",this.items=e.map(t=>new Pt("video"+t.id,this.videozone,t.id,this))}modalnewvideo(){this.subelements.push(new Ge("newvideo",this.element,this))}}class Dt extends S{constructor(e,t){super(e,t);o(this,"contentZoneList");o(this,"contentZoneGraphs");o(this,"listDates",[]);o(this,"objectDates",{});this.setup()}async setup(){this.attachAt(this.generatehtml(),!1),this.contentZoneList=this.element.querySelector("main .list"),this.renderDiary()}createDatesArray(){const e=[];return l.tunebook.forEach(t=>{t.last_rehearsals.forEach(a=>{e.push({tuneid:t.id,date:a})})}),e}groupDatesByDay(e){return this.objectDates={},e.forEach(t=>{const r=new Date(t.date).toISOString().split("T")[0];this.listDates.includes(r)||this.listDates.push(r),this.objectDates[r]||(this.objectDates[r]=[]),this.objectDates[r].push(t)}),!0}generatehtml(){return`<section id="${this.name}">
      <header class="pt-6 px-6">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-3xl">Histórico de ensayos</h3>
          <span class="num_of_days bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">
          </span></h3>
        </div>
      </header>
      <main class="p-6 grid lg:grid-cols-2 gap-2 grid-flow-row">
        <section class="list">
        </section>
        <section class="graphs">
        </section>
      </main>
      </section>`}async renderDiary(){const e=this.createDatesArray();await this.groupDatesByDay(e),this.listDates.sort().reverse(),this.element.querySelector(".num_of_days").innerHTML=this.listDates.length+" días",this.listDates.forEach(t=>{this.attachAt(this.renderDay(t),!1,this.contentZoneList)})}renderGraphs(){const e=this.listDates.length,t=this.objectDates.reduce((c,d)=>{c+=d.length},0),a=p.calctimesince(this.listDates.at(-1),!0),r=e/a,i=`
    <div>
    <p>${e} rehears in last ${a} days.</p>
    <p>${t} tunes played in total</p>
    <p>${Math.floor(t/e)} avg tunes per
    rehearsal</p>
    <p>${r*7} rehears avg per week</p>
    </div>
    `;this.attachAt(i,!0,this.contentZoneGraphs)}renderDay(e){const t=new Date(e),a={weekday:"long",year:"numeric",month:"long",day:"numeric"};return`<details class="border border-slate-300 bg-slate-200 
    my-3 rounded-md p-4 hover:bg-slate-300 transition cursor-pointer">
      <summary><span class="font-bold text-blue-800">${t.toLocaleDateString("es-ES",a)}</span>
        <span class="ml-1 bg-slate-400 p-1 text-xs uppercase text-white/75
        rounded-lg">
        ${this.objectDates[e].length} temas ensayados</span></summary>
      <ol class="bg-white/75 p-2 mt-2 rounded-md">
        ${this.renderDayTunes(this.objectDates[e])}
      </ol>
    </details>`}renderDayTunes(e){let t="";return e.sort((a,r)=>r.date-a.date),e.forEach(a=>{const r=l.tunebook.find(d=>d.id===a.tuneid),i=new Date(a.date),c=i.getMinutes()<10?"0"+i.getMinutes():i.getMinutes();t+=`<li class="py-1 text-slate-500">
      <span class="text-xs text-white bg-slate-400/75 py-1 px-2
      rounded-xl mr-1">
      ${i.getHours()}:${c}</span>
      ${r.prefered_name} 
      <span class="font-medium ml-1 text-xs text-slate-400 uppercase">
        ${r.tuneref.type}</span>
           </li>`}),t}show(){this.renderDiary(),super.show()}}class Le extends S{constructor(e,t,a){super(e,t);o(this,"tune");this.tune=a,this.setup()}async setup(){this.attachAt(this.generatehtml(),!1),this.addListeners()}addListeners(){this.element.querySelector(".rehearsal").addEventListener("click",this.addrehearsal.bind(this)),this.tune.tuneref.ABCsample&&this.element.querySelector(".playabc").addEventListener("click",P.manageabc)}generatehtml(){var t;const e=p.generatelinks((t=this.tune.tuneref)==null?void 0:t.References);return`<div id="tuneoriginal${this.tune.id}" class="tunelist group 
      w-full bg-white
      border-b-2 border-slate200 rounded-md px-6 py-2 flex items-center gap-2">
      <div class="tuneimg flex h-20 w-20 bg-center bg-cover mr-3
      bg-[url('${this.tune.preferred_img_url??`https://picsum.photos/200/200?random=${this.tune.id}`}')]">
      ${this.tune.tuneref.ABCsample?`<span data-abc="${this.tune.tuneref.ABCsample}" data-state="stop"
            class="opacity-0 transition group-hover:opacity-100 playabc
            text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
          <i class="m-auto fa fa-circle-play fa-3x"></i><span>`:""}
      </div>
      <div>         
        <h2 class="tunetitle text-xl font-semibold mr-2">
        ${this.tune.prefered_name}
        <span class="group/item ml-1 text-sm bg-slate-200 rounded-md p-1 px-2 
        font-medium
        uppercase text-slate-500">${this.tune.prefered_tone.substring(0,5)}
        <img class="group-hover/item:visible invisible w-42 fixed inset-0 
        h-auto m-auto border border-slate-400 p-4 bg-white/90 rounded-lg 
        shadow-2xl" src="./img/${p.removeWhiteSpaces(this.tune.prefered_tone.substring(0,5))}.png">
        </span>
        <span>${e.join("")}</span>
        </h2>
        <p class="tuneadditionaldata text-slate-400 font-regular uppercase 
        text-xs mb-2"><span class="font-medium mr-1 text-slate-500">
        ${this.tune.tuneref.type}</span>${this.tune.tuneref.author}</p>
      </div>
      <div class="flex gap-1 ml-auto items-center">
        <button" class="rehearsal bg-blue-400 p-1
        rounded-md text-white text-bold uppercase" title="añadir ensayo">
        <i class="fa fa-guitar fa-fw fa-lg"></i> Marcar completada</button>
    </div>
  </div>`}async addrehearsal(e){e.stopPropagation(),e.currentTarget.disabled=!0,u.addrehearsal(this.tune.id)?(e.currentTarget.disabled=!0,this.element.classList.add("bg-green-100","text-green-600")):e.currentTarget.disabled=!1}}class Mt extends S{constructor(e,t){super(e,t);o(this,"contentZone");o(this,"createsets",!1);o(this,"numberTunes",20);o(this,"numberSets",8);o(this,"criterialist",[{value:"points",label:"prioridad",selected:!0},{value:"type",label:"tipo"},{value:"prefered_tone",label:"tonalidad"}]);o(this,"sortcriteria","points");o(this,"tunelist",[]);o(this,"tunesets",[]);o(this,"tuneinstances",[]);this.setup()}async setup(){this.attachAt(this.generatehtml(),!1),this.contentZone=this.element.querySelector("main"),this.addListeners(),this.createList()}addListeners(){this.element.querySelector(".createnewlist").addEventListener("click",this.createList.bind(this)),this.element.querySelector(".changesets").addEventListener("click",this.changesets.bind(this)),this.createsets||this.element.querySelector(".tunesorting").addEventListener("change",this.sorter.bind(this))}assignPointsTunes(){const t=l.tunebook.filter(a=>a.status_num>2).map(a=>{const i=new Date-a.last_rehearsalDate,c=l.status.find(d=>d.value==a.status_num);return{...a,points:Math.round(i*c.factor)}});return this.sortTunes(t)}generatehtml(){const e=`<select class="tunesorting text-sm bg-cyan-200 text-cyan-500 p-1 
          rounded-md border-0">
          ${this.criterialist.map(t=>`<option ${t!=null&&t.selected?"selected":""}
      value="${t.value}">${t.label}</option>`).join("")}
          </select>`;return`<section id="${this.name}">
      <header class="pt-6 px-6">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-3xl">Lista para ensayar</h3>
          <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">${this.numberTunes}
          </span></h3>
        </div>
        ${this.createsets?"":e}
        <button class="mb-1 createnewlist bg-blue-400 p-1
        rounded-md text-white text-bold uppercase">
        <i class="fa fa-reload fa-fw fa-lg"></i> Generar Nueva lista</button>
        <button class="mb-1 changesets bg-blue-400 p-1
        rounded-md text-white text-bold uppercase">
        <i class="fa fa-reload fa-fw fa-lg"></i> Generar sets</button>
      </header>
      <main class="p-6"></main>
      </section>`}sortTunes(e){return e.sort((a,r)=>a.points-r.points).reverse()}sorter(e){const t=e.target.value;this.sortcriteria=t,this.tunelist.sort((a,r)=>{const i=this.sortcriteria=="type"?a.tuneref.type:a[this.sortcriteria],c=this.sortcriteria=="type"?r.tuneref.type:r[this.sortcriteria];return i<c?this.sortorder=="ASC"?-1:1:i>c?this.sortorder=="ASC"?1:-1:0}),this.renderList()}changesets(){this.createsets=!this.createsets,this.createList()}createList(){const e=this.assignPointsTunes();if(!this.createsets)this.tunelist=e.slice(0,this.numberTunes),this.renderList();else{for(this.tunelist=e.slice(0,this.numberTunes*2),this.tunelist.forEach(t=>{t.alterations=l.keyAlterations[t.prefered_tone]}),this.tunesets=[];this.tunesets.length<this.numberSets;){const t=this.tunelist.shift(),a=this.createSet(t);this.tunesets.push(a)}this.renderSets()}}createSet(e){const t=[e];for(let a=0;a<2;a++){const r=this.findSimilarTune(e);r&&t.push(r)}return t}findSimilarTune(e){let t=this.tunelist.findIndex(a=>a.tuneref.type===e.tuneref.type&&a.prefered_tone===e.prefered_tone);return t===-1&&(t=this.tunelist.findIndex(a=>a.tuneref.type===e.tuneref.type&&Math.abs(t.alterations-a.alterations)<2)),t===-1&&(t=this.tunelist.findIndex(a=>a.tuneref.type===e.tuneref.type)),t!==-1?this.tunelist.splice(t,1)[0]:!1}renderList(){this.contentZone.innerHTML="",this.tuneinstances=this.tunelist.map(e=>new Le("tune"+e.id,this.contentZone,e))}renderSets(){this.contentZone.innerHTML="",this.tuneinstances=[],this.tunesets.forEach(e=>{this.contentZone.insertAdjacentHTML("beforeend",'<h5 class="mt-4">Set</h5>'),e.forEach(t=>{this.tuneinstances.push(new Le("tune"+t.id,this.contentZone,t))})})}}class Ot extends S{constructor(e,t,a,r){super(e,t);o(this,"tune");o(this,"maxRehear");this.tune=a,this.maxRehear=r,this.setup()}async setup(){this.attachAt(this.generatehtml(),!1),this.addListeners()}addListeners(){this.tune.points<this.maxRehear?this.element.querySelector(".rehearsal").addEventListener("click",this.addrehearsal.bind(this)):this.element.querySelector(".promote").addEventListener("click",this.promote.bind(this)),this.tune.tuneref.ABCsample&&this.element.querySelector(".playabc").addEventListener("click",P.manageabc)}generatehtml(){var r;const e=p.generatelinks((r=this.tune.tuneref)==null?void 0:r.References);return`<div id="tuneoriginal${this.tune.id}" class="tunelist group 
      w-full bg-white
      border-b-2 border-slate200 rounded-md px-6 py-2 flex items-center gap-2">
      <div class="tuneimg flex h-20 w-20 bg-center bg-cover mr-3
      bg-[url('${this.tune.preferred_img_url??`https://picsum.photos/200/200?random=${this.tune.id}`}')]">
      ${this.tune.tuneref.ABCsample?`<span data-abc="${this.tune.tuneref.ABCsample}" data-state="stop"
            class="opacity-0 transition group-hover:opacity-100 playabc
            text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
          <i class="m-auto fa fa-circle-play fa-3x"></i><span>`:""}
      </div>
      <div>         
        <h2 class="tunetitle text-xl font-semibold mr-2">
        ${this.tune.prefered_name}
        <span class="group/item ml-1 text-sm bg-slate-200 rounded-md p-1 px-2 
        font-medium
        uppercase text-slate-500">${this.tune.prefered_tone.substring(0,5)}
        <img class="group-hover/item:visible invisible w-42 fixed inset-0 
        h-auto m-auto border border-slate-400 p-4 bg-white/90 rounded-lg 
        shadow-2xl" src="./img/${p.removeWhiteSpaces(this.tune.prefered_tone.substring(0,5))}.png">
        </span>
        <span>${e.join("")}</span>
        </h2>
        <p class="tuneadditionaldata text-slate-400 font-regular uppercase 
        text-xs mb-2"><span class="font-medium mr-1 text-slate-500">
        ${this.tune.tuneref.type}</span>${this.tune.tuneref.author}</p>
      </div>
      <div class="ml-auto">
          <progress id="file" value="${this.tune.points}" 
          max="${this.maxRehear}">
          ${this.tune.points}</progress>
      </div>
      <div class="flex gap-1 items-center">
        ${this.tune.points>=this.maxRehear?`<button class="promote bg-yellow-400 p-1
        rounded-md text-blue-600 text-bold uppercase" 
        title="marcar como aprendida">
        <i class="fa fa-square-up-right fa-fw fa-lg"></i></button>`:`<button class="rehearsal bg-blue-400 p-1
        rounded-md text-white text-bold uppercase" title="añadir ensayo">
        <i class="fa fa-circle-check fa-fw fa-lg"></i></button>`}
    </div>
  </div>`}async addrehearsal(e){e.stopPropagation(),e.currentTarget instanceof HTMLButtonElement&&(e.currentTarget.disabled=!0,await u.addrehearsal(this.tune.id)?this.element.classList.add("bg-green-100","text-green-600"):e.currentTarget.disabled=!1)}async promote(e){e.stopPropagation(),e.currentTarget instanceof HTMLButtonElement&&(e.currentTarget.disabled=!0,await u.changeStatus(this.tune.id,this.tune.status_num+1)?this.remove():e.currentTarget.disabled=!1)}}class Rt extends S{constructor(e,t){super(e,t);o(this,"contentZone");o(this,"numberTunes",20);o(this,"daysBackwards",21);o(this,"maxRehear",7);o(this,"criterialist",[{value:"points",label:"prioridad",selected:!0},{value:"type",label:"tipo"},{value:"prefered_tone",label:"tonalidad"}]);o(this,"sortcriteria","points");o(this,"tunelist",[]);o(this,"tuneinstances",[]);this.setup()}async setup(){this.attachAt(this.generatehtml(),!1),this.contentZone=this.element.querySelector("main"),this.addListeners(),this.createList()}addListeners(){this.element.querySelector(".createnewlist").addEventListener("click",this.createList.bind(this)),this.element.querySelector(".tunesorting").addEventListener("change",this.sorter.bind(this))}assignPointsTunes(){const t=l.tunebook.filter(a=>a.status_num==2).map(a=>{const r=new Date;r.setDate(r.getDate()-this.daysBackwards);const i=a.last_rehearsals.filter(c=>c>r);return{...a,points:i.length}});return this.sortTunes(t)}generatehtml(){return`<section id="${this.name}">
      <header class="pt-6 px-6">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-3xl">Lista para Aprender</h3>
          <div class="ml-auto border-1 border-slate-300 p-2">
          <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">${this.numberTunes}
          </span>
          <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">${this.daysBackwards}
          </span>
          <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">${this.maxRehear}
          </span>
          </div>
        </div>
         <select class="tunesorting text-sm bg-cyan-200 text-cyan-500 p-1 
          rounded-md border-0">
          ${this.criterialist.map(e=>`<option ${e!=null&&e.selected?"selected":""}
      value="${e.value}">${e.label}</option>`).join("")}
          </select>
        <button class="mb-1 createnewlist bg-blue-400 p-1
        rounded-md text-white text-bold uppercase">
        <i class="fa fa-reload fa-fw fa-lg"></i> Generar Nueva lista</button>
      </header>
      <main class="p-6"></main>
      </section>`}sortTunes(e){return e.sort((a,r)=>r.points!==a.points?r.points-a.points:new Date(r.last_rehearsalDate)-new Date(a.last_rehearsalDate))}sorter(e){const t=e.target.value;this.sortcriteria=t,this.tunelist.sort((a,r)=>{const i=this.sortcriteria=="type"?a.tuneref.type:a[this.sortcriteria],c=this.sortcriteria=="type"?r.tuneref.type:r[this.sortcriteria];return i<c?this.sortorder=="ASC"?-1:1:i>c?this.sortorder=="ASC"?1:-1:0}),this.renderList()}createList(){const e=this.assignPointsTunes();this.tunelist=e.slice(0,this.numberTunes),this.renderList()}renderList(){this.contentZone.innerHTML="",this.tuneinstances=this.tunelist.map(e=>new Ot("tune"+e.id,this.contentZone,e,this.maxRehear))}}const _e=Object.freeze(Object.defineProperty({__proto__:null,Game:jt,Learn:Rt,Login:vt,Menubar:St,Mynotification:b,Rehear:Mt,Setbook:qt,Stats:Dt,Tunebook:At,Tunemanager:Ue,Videos:It},Symbol.toStringTag,{value:"Module"}));function Ct(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Ae=Object.prototype.toString,Ve=function(s){var e=Ae.call(s),t=e==="[object Arguments]";return t||(t=e!=="[object Array]"&&s!==null&&typeof s=="object"&&typeof s.length=="number"&&s.length>=0&&Ae.call(s.callee)==="[object Function]"),t},ce,Ee;function Bt(){if(Ee)return ce;Ee=1;var n;if(!Object.keys){var s=Object.prototype.hasOwnProperty,e=Object.prototype.toString,t=Ve,a=Object.prototype.propertyIsEnumerable,r=!a.call({toString:null},"toString"),i=a.call(function(){},"prototype"),c=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],d=function(y){var f=y.constructor;return f&&f.prototype===y},g={$applicationCache:!0,$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$onmozfullscreenchange:!0,$onmozfullscreenerror:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},$=function(){if(typeof window>"u")return!1;for(var y in window)try{if(!g["$"+y]&&s.call(window,y)&&window[y]!==null&&typeof window[y]=="object")try{d(window[y])}catch{return!0}}catch{return!0}return!1}(),_=function(y){if(typeof window>"u"||!$)return d(y);try{return d(y)}catch{return!1}};n=function(f){var E=f!==null&&typeof f=="object",T=e.call(f)==="[object Function]",I=t(f),j=E&&e.call(f)==="[object String]",U=[];if(!E&&!T&&!I)throw new TypeError("Object.keys called on a non-object");var ft=i&&T;if(j&&f.length>0&&!s.call(f,0))for(var ne=0;ne<f.length;++ne)U.push(String(ne));if(I&&f.length>0)for(var ie=0;ie<f.length;++ie)U.push(String(ie));else for(var oe in f)!(ft&&oe==="prototype")&&s.call(f,oe)&&U.push(String(oe));if(r)for(var gt=_(f),H=0;H<c.length;++H)!(gt&&c[H]==="constructor")&&s.call(f,c[H])&&U.push(c[H]);return U}}return ce=n,ce}var Ft=Array.prototype.slice,Nt=Ve,Te=Object.keys,X=Te?function(s){return Te(s)}:Bt(),qe=Object.keys;X.shim=function(){if(Object.keys){var s=function(){var e=Object.keys(arguments);return e&&e.length===arguments.length}(1,2);s||(Object.keys=function(t){return Nt(t)?qe(Ft.call(t)):qe(t)})}else Object.keys=X;return Object.keys||X};var zt=X,Ut=Error,Ht=EvalError,Gt=RangeError,Vt=ReferenceError,Ke=SyntaxError,W=TypeError,Kt=URIError,Wt=function(){if(typeof Symbol!="function"||typeof Object.getOwnPropertySymbols!="function")return!1;if(typeof Symbol.iterator=="symbol")return!0;var s={},e=Symbol("test"),t=Object(e);if(typeof e=="string"||Object.prototype.toString.call(e)!=="[object Symbol]"||Object.prototype.toString.call(t)!=="[object Symbol]")return!1;var a=42;s[e]=a;for(e in s)return!1;if(typeof Object.keys=="function"&&Object.keys(s).length!==0||typeof Object.getOwnPropertyNames=="function"&&Object.getOwnPropertyNames(s).length!==0)return!1;var r=Object.getOwnPropertySymbols(s);if(r.length!==1||r[0]!==e||!Object.prototype.propertyIsEnumerable.call(s,e))return!1;if(typeof Object.getOwnPropertyDescriptor=="function"){var i=Object.getOwnPropertyDescriptor(s,e);if(i.value!==a||i.enumerable!==!0)return!1}return!0},je=typeof Symbol<"u"&&Symbol,Zt=Wt,Jt=function(){return typeof je!="function"||typeof Symbol!="function"||typeof je("foo")!="symbol"||typeof Symbol("bar")!="symbol"?!1:Zt()},de={__proto__:null,foo:{}},Yt=Object,Qt=function(){return{__proto__:de}.foo===de.foo&&!(de instanceof Yt)},Xt="Function.prototype.bind called on incompatible ",es=Object.prototype.toString,ts=Math.max,ss="[object Function]",Pe=function(s,e){for(var t=[],a=0;a<s.length;a+=1)t[a]=s[a];for(var r=0;r<e.length;r+=1)t[r+s.length]=e[r];return t},as=function(s,e){for(var t=[],a=e,r=0;a<s.length;a+=1,r+=1)t[r]=s[a];return t},rs=function(n,s){for(var e="",t=0;t<n.length;t+=1)e+=n[t],t+1<n.length&&(e+=s);return e},ns=function(s){var e=this;if(typeof e!="function"||es.apply(e)!==ss)throw new TypeError(Xt+e);for(var t=as(arguments,1),a,r=function(){if(this instanceof a){var $=e.apply(this,Pe(t,arguments));return Object($)===$?$:this}return e.apply(s,Pe(t,arguments))},i=ts(0,e.length-t.length),c=[],d=0;d<i;d++)c[d]="$"+d;if(a=Function("binder","return function ("+rs(c,",")+"){ return binder.apply(this,arguments); }")(r),e.prototype){var g=function(){};g.prototype=e.prototype,a.prototype=new g,g.prototype=null}return a},is=ns,ye=Function.prototype.bind||is,os=Function.prototype.call,ls=Object.prototype.hasOwnProperty,cs=ye,We=cs.call(os,ls),m,ds=Ut,us=Ht,hs=Gt,ps=Vt,z=Ke,N=W,ms=Kt,Ze=Function,ue=function(n){try{return Ze('"use strict"; return ('+n+").constructor;")()}catch{}},O=Object.getOwnPropertyDescriptor;if(O)try{O({},"")}catch{O=null}var he=function(){throw new N},fs=O?function(){try{return arguments.callee,he}catch{try{return O(arguments,"callee").get}catch{return he}}}():he,C=Jt(),gs=Qt(),A=Object.getPrototypeOf||(gs?function(n){return n.__proto__}:null),F={},ys=typeof Uint8Array>"u"||!A?m:A(Uint8Array),R={__proto__:null,"%AggregateError%":typeof AggregateError>"u"?m:AggregateError,"%Array%":Array,"%ArrayBuffer%":typeof ArrayBuffer>"u"?m:ArrayBuffer,"%ArrayIteratorPrototype%":C&&A?A([][Symbol.iterator]()):m,"%AsyncFromSyncIteratorPrototype%":m,"%AsyncFunction%":F,"%AsyncGenerator%":F,"%AsyncGeneratorFunction%":F,"%AsyncIteratorPrototype%":F,"%Atomics%":typeof Atomics>"u"?m:Atomics,"%BigInt%":typeof BigInt>"u"?m:BigInt,"%BigInt64Array%":typeof BigInt64Array>"u"?m:BigInt64Array,"%BigUint64Array%":typeof BigUint64Array>"u"?m:BigUint64Array,"%Boolean%":Boolean,"%DataView%":typeof DataView>"u"?m:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":ds,"%eval%":eval,"%EvalError%":us,"%Float32Array%":typeof Float32Array>"u"?m:Float32Array,"%Float64Array%":typeof Float64Array>"u"?m:Float64Array,"%FinalizationRegistry%":typeof FinalizationRegistry>"u"?m:FinalizationRegistry,"%Function%":Ze,"%GeneratorFunction%":F,"%Int8Array%":typeof Int8Array>"u"?m:Int8Array,"%Int16Array%":typeof Int16Array>"u"?m:Int16Array,"%Int32Array%":typeof Int32Array>"u"?m:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":C&&A?A(A([][Symbol.iterator]())):m,"%JSON%":typeof JSON=="object"?JSON:m,"%Map%":typeof Map>"u"?m:Map,"%MapIteratorPrototype%":typeof Map>"u"||!C||!A?m:A(new Map()[Symbol.iterator]()),"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":typeof Promise>"u"?m:Promise,"%Proxy%":typeof Proxy>"u"?m:Proxy,"%RangeError%":hs,"%ReferenceError%":ps,"%Reflect%":typeof Reflect>"u"?m:Reflect,"%RegExp%":RegExp,"%Set%":typeof Set>"u"?m:Set,"%SetIteratorPrototype%":typeof Set>"u"||!C||!A?m:A(new Set()[Symbol.iterator]()),"%SharedArrayBuffer%":typeof SharedArrayBuffer>"u"?m:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":C&&A?A(""[Symbol.iterator]()):m,"%Symbol%":C?Symbol:m,"%SyntaxError%":z,"%ThrowTypeError%":fs,"%TypedArray%":ys,"%TypeError%":N,"%Uint8Array%":typeof Uint8Array>"u"?m:Uint8Array,"%Uint8ClampedArray%":typeof Uint8ClampedArray>"u"?m:Uint8ClampedArray,"%Uint16Array%":typeof Uint16Array>"u"?m:Uint16Array,"%Uint32Array%":typeof Uint32Array>"u"?m:Uint32Array,"%URIError%":ms,"%WeakMap%":typeof WeakMap>"u"?m:WeakMap,"%WeakRef%":typeof WeakRef>"u"?m:WeakRef,"%WeakSet%":typeof WeakSet>"u"?m:WeakSet};if(A)try{null.error}catch(n){var bs=A(A(n));R["%Error.prototype%"]=bs}var vs=function n(s){var e;if(s==="%AsyncFunction%")e=ue("async function () {}");else if(s==="%GeneratorFunction%")e=ue("function* () {}");else if(s==="%AsyncGeneratorFunction%")e=ue("async function* () {}");else if(s==="%AsyncGenerator%"){var t=n("%AsyncGeneratorFunction%");t&&(e=t.prototype)}else if(s==="%AsyncIteratorPrototype%"){var a=n("%AsyncGenerator%");a&&A&&(e=A(a.prototype))}return R[s]=e,e},Ie={__proto__:null,"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},Z=ye,se=We,xs=Z.call(Function.call,Array.prototype.concat),ws=Z.call(Function.apply,Array.prototype.splice),De=Z.call(Function.call,String.prototype.replace),ae=Z.call(Function.call,String.prototype.slice),$s=Z.call(Function.call,RegExp.prototype.exec),Ss=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,ks=/\\(\\)?/g,Ls=function(s){var e=ae(s,0,1),t=ae(s,-1);if(e==="%"&&t!=="%")throw new z("invalid intrinsic syntax, expected closing `%`");if(t==="%"&&e!=="%")throw new z("invalid intrinsic syntax, expected opening `%`");var a=[];return De(s,Ss,function(r,i,c,d){a[a.length]=c?De(d,ks,"$1"):i||r}),a},_s=function(s,e){var t=s,a;if(se(Ie,t)&&(a=Ie[t],t="%"+a[0]+"%"),se(R,t)){var r=R[t];if(r===F&&(r=vs(t)),typeof r>"u"&&!e)throw new N("intrinsic "+s+" exists, but is not available. Please file an issue!");return{alias:a,name:t,value:r}}throw new z("intrinsic "+s+" does not exist!")},J=function(s,e){if(typeof s!="string"||s.length===0)throw new N("intrinsic name must be a non-empty string");if(arguments.length>1&&typeof e!="boolean")throw new N('"allowMissing" argument must be a boolean');if($s(/^%?[^%]*%?$/,s)===null)throw new z("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var t=Ls(s),a=t.length>0?t[0]:"",r=_s("%"+a+"%",e),i=r.name,c=r.value,d=!1,g=r.alias;g&&(a=g[0],ws(t,xs([0,1],g)));for(var $=1,_=!0;$<t.length;$+=1){var y=t[$],f=ae(y,0,1),E=ae(y,-1);if((f==='"'||f==="'"||f==="`"||E==='"'||E==="'"||E==="`")&&f!==E)throw new z("property names with quotes must have matching quotes");if((y==="constructor"||!_)&&(d=!0),a+="."+y,i="%"+a+"%",se(R,i))c=R[i];else if(c!=null){if(!(y in c)){if(!e)throw new N("base intrinsic for "+s+" exists, but the property is not available.");return}if(O&&$+1>=t.length){var T=O(c,y);_=!!T,_&&"get"in T&&!("originalValue"in T.get)?c=T.get:c=c[y]}else _=se(c,y),c=c[y];_&&!d&&(R[i]=c)}}return c},pe,Me;function be(){if(Me)return pe;Me=1;var n=J,s=n("%Object.defineProperty%",!0)||!1;if(s)try{s({},"a",{value:1})}catch{s=!1}return pe=s,pe}var As=J,ee=As("%Object.getOwnPropertyDescriptor%",!0);if(ee)try{ee([],"length")}catch{ee=null}var Je=ee,Oe=be(),Es=Ke,B=W,Re=Je,Ye=function(s,e,t){if(!s||typeof s!="object"&&typeof s!="function")throw new B("`obj` must be an object or a function`");if(typeof e!="string"&&typeof e!="symbol")throw new B("`property` must be a string or a symbol`");if(arguments.length>3&&typeof arguments[3]!="boolean"&&arguments[3]!==null)throw new B("`nonEnumerable`, if provided, must be a boolean or null");if(arguments.length>4&&typeof arguments[4]!="boolean"&&arguments[4]!==null)throw new B("`nonWritable`, if provided, must be a boolean or null");if(arguments.length>5&&typeof arguments[5]!="boolean"&&arguments[5]!==null)throw new B("`nonConfigurable`, if provided, must be a boolean or null");if(arguments.length>6&&typeof arguments[6]!="boolean")throw new B("`loose`, if provided, must be a boolean");var a=arguments.length>3?arguments[3]:null,r=arguments.length>4?arguments[4]:null,i=arguments.length>5?arguments[5]:null,c=arguments.length>6?arguments[6]:!1,d=!!Re&&Re(s,e);if(Oe)Oe(s,e,{configurable:i===null&&d?d.configurable:!i,enumerable:a===null&&d?d.enumerable:!a,value:t,writable:r===null&&d?d.writable:!r});else if(c||!a&&!r&&!i)s[e]=t;else throw new Es("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.")},fe=be(),Qe=function(){return!!fe};Qe.hasArrayLengthDefineBug=function(){if(!fe)return null;try{return fe([],"length",{value:1}).length!==1}catch{return!0}};var Xe=Qe,Ts=zt,qs=typeof Symbol=="function"&&typeof Symbol("foo")=="symbol",js=Object.prototype.toString,Ps=Array.prototype.concat,Ce=Ye,Is=function(n){return typeof n=="function"&&js.call(n)==="[object Function]"},et=Xe(),Ds=function(n,s,e,t){if(s in n){if(t===!0){if(n[s]===e)return}else if(!Is(t)||!t())return}et?Ce(n,s,e,!0):Ce(n,s,e)},tt=function(n,s){var e=arguments.length>2?arguments[2]:{},t=Ts(s);qs&&(t=Ps.call(t,Object.getOwnPropertySymbols(s)));for(var a=0;a<t.length;a+=1)Ds(n,t[a],s[t[a]],e[t[a]])};tt.supportsDescriptors=!!et;var st=tt,at={exports:{}},Ms=J,Be=Ye,Os=Xe(),Fe=Je,Ne=W,Rs=Ms("%Math.floor%"),Cs=function(s,e){if(typeof s!="function")throw new Ne("`fn` is not a function");if(typeof e!="number"||e<0||e>4294967295||Rs(e)!==e)throw new Ne("`length` must be a positive 32-bit integer");var t=arguments.length>2&&!!arguments[2],a=!0,r=!0;if("length"in s&&Fe){var i=Fe(s,"length");i&&!i.configurable&&(a=!1),i&&!i.writable&&(r=!1)}return(a||r||!t)&&(Os?Be(s,"length",e,!0,!0):Be(s,"length",e)),s};(function(n){var s=ye,e=J,t=Cs,a=W,r=e("%Function.prototype.apply%"),i=e("%Function.prototype.call%"),c=e("%Reflect.apply%",!0)||s.call(i,r),d=be(),g=e("%Math.max%");n.exports=function(y){if(typeof y!="function")throw new a("a function is required");var f=c(s,i,arguments);return t(f,1+g(0,y.length-(arguments.length-1)),!0)};var $=function(){return c(s,r,arguments)};d?d(n.exports,"apply",{value:$}):n.exports.apply=$})(at);var rt=at.exports,Bs=W,Fs=function(s){if(s==null)throw new Bs(arguments.length>0&&arguments[1]||"Cannot call method on "+s);return s},nt=J,it=rt,Ns=it(nt("String.prototype.indexOf")),zs=function(s,e){var t=nt(s,!!e);return typeof t=="function"&&Ns(s,".prototype.")>-1?it(t):t},Us=Fs,ot=zs,Hs=ot("Object.prototype.propertyIsEnumerable"),Gs=ot("Array.prototype.push"),lt=function(s){var e=Us(s),t=[];for(var a in e)Hs(e,a)&&Gs(t,[a,e[a]]);return t},Vs=lt,ct=function(){return typeof Object.entries=="function"?Object.entries:Vs},Ks=ct,Ws=st,Zs=function(){var s=Ks();return Ws(Object,{entries:s},{entries:function(){return Object.entries!==s}}),s},Js=st,Ys=rt,Qs=lt,dt=ct,Xs=Zs,ut=Ys(dt(),Object);Js(ut,{getPolyfill:dt,implementation:Qs,shim:Xs});var ea=ut,ve=ea,ht=We,ta=function(s){},ge=String.prototype.replace,pt=String.prototype.split,te="||||",Q=function(n){var s=n%100,e=s%10;return s!==11&&e===1?0:2<=e&&e<=4&&!(s>=12&&s<=14)?1:2},mt={pluralTypes:{arabic:function(n){if(n<3)return n;var s=n%100;return s>=3&&s<=10?3:s>=11?4:5},bosnian_serbian:Q,chinese:function(){return 0},croatian:Q,french:function(n){return n>=2?1:0},german:function(n){return n!==1?1:0},russian:Q,lithuanian:function(n){return n%10===1&&n%100!==11?0:n%10>=2&&n%10<=9&&(n%100<11||n%100>19)?1:2},czech:function(n){return n===1?0:n>=2&&n<=4?1:2},polish:function(n){if(n===1)return 0;var s=n%10;return 2<=s&&s<=4&&(n%100<10||n%100>=20)?1:2},icelandic:function(n){return n%10!==1||n%100===11?1:0},slovenian:function(n){var s=n%100;return s===1?0:s===2?1:s===3||s===4?2:3},romanian:function(n){if(n===1)return 0;var s=n%100;return n===0||s>=2&&s<=19?1:2},ukrainian:Q},pluralTypeToLanguages:{arabic:["ar"],bosnian_serbian:["bs-Latn-BA","bs-Cyrl-BA","srl-RS","sr-RS"],chinese:["id","id-ID","ja","ko","ko-KR","lo","ms","th","th-TH","zh"],croatian:["hr","hr-HR"],german:["fa","da","de","en","es","fi","el","he","hi-IN","hu","hu-HU","it","nl","no","pt","sv","tr"],french:["fr","tl","pt-br"],russian:["ru","ru-RU"],lithuanian:["lt"],czech:["cs","cs-CZ","sk"],polish:["pl"],icelandic:["is","mk"],slovenian:["sl-SL"],romanian:["ro"],ukrainian:["uk","ua"]}};function sa(n){for(var s={},e=ve(n),t=0;t<e.length;t+=1)for(var a=e[t][0],r=e[t][1],i=0;i<r.length;i+=1)s[r[i]]=a;return s}function aa(n,s){var e=sa(n.pluralTypeToLanguages);return e[s]||e[pt.call(s,/-/,1)[0]]||e.en}function ra(n,s,e){return n.pluralTypes[s](e)}function na(){var n={};return function(s,e){var t=n[e];return t&&!s.pluralTypes[t]&&(t=null,n[e]=t),t||(t=aa(s,e),t&&(n[e]=t)),t}}function ze(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ia(n){var s=n&&n.prefix||"%{",e=n&&n.suffix||"}";if(s===te||e===te)throw new RangeError('"'+te+'" token is reserved for pluralization');return new RegExp(ze(s)+"(.*?)"+ze(e),"g")}var oa=na(),la=/%\{(.*?)\}/g;function xe(n,s,e,t,a,r){if(typeof n!="string")throw new TypeError("Polyglot.transformPhrase expects argument #1 to be string");if(s==null)return n;var i=n,c=t||la,d=r||ge,g=typeof s=="number"?{smart_count:s}:s;if(g.smart_count!=null&&n){var $=a||mt,_=pt.call(n,te),y=e||"en",f=oa($,y),E=ra($,f,g.smart_count);i=ge.call(_[E]||_[0],/^[^\S]*|[^\S]*$/g,"")}return i=d.call(i,c,function(T,I){return!ht(g,I)||g[I]==null?T:g[I]}),i}function D(n){var s=n||{};this.phrases={},this.extend(s.phrases||{}),this.currentLocale=s.locale||"en";var e=s.allowMissing?xe:null;this.onMissingKey=typeof s.onMissingKey=="function"?s.onMissingKey:e,this.warn=s.warn||ta,this.replaceImplementation=s.replace||ge,this.tokenRegex=ia(s.interpolation),this.pluralRules=s.pluralRules||mt}D.prototype.locale=function(n){return n&&(this.currentLocale=n),this.currentLocale};D.prototype.extend=function(n,s){for(var e=ve(n||{}),t=0;t<e.length;t+=1){var a=e[t][0],r=e[t][1],i=s?s+"."+a:a;typeof r=="object"?this.extend(r,i):this.phrases[i]=r}};D.prototype.unset=function(n,s){if(typeof n=="string")delete this.phrases[n];else for(var e=ve(n||{}),t=0;t<e.length;t+=1){var a=e[t][0],r=e[t][1],i=s?s+"."+a:a;typeof r=="object"?this.unset(r,i):delete this.phrases[i]}};D.prototype.clear=function(){this.phrases={}};D.prototype.replace=function(n){this.clear(),this.extend(n)};D.prototype.t=function(n,s){var e,t,a=s??{};if(typeof this.phrases[n]=="string")e=this.phrases[n];else if(typeof a._=="string")e=a._;else if(this.onMissingKey){var r=this.onMissingKey;t=r(n,a,this.currentLocale,this.tokenRegex,this.pluralRules,this.replaceImplementation)}else this.warn('Missing translation for key: "'+n+'"'),t=n;return typeof e=="string"&&(t=xe(e,a,this.currentLocale,this.tokenRegex,this.pluralRules,this.replaceImplementation)),t};D.prototype.has=function(n){return ht(this.phrases,n)};D.transformPhrase=function(s,e,t){return xe(s,e,t)};var ca=D;const da=Ct(ca),ua={token:{token_ok:"Valid token, user data retrieved.",token_ko:"The saved token is not valid."},login:{title:"Log In",email:"Email",pass:"Password",login:"Login",new_user:"Do you want to create a new account?",required_mail:"Email is required",required_pass:"Enter password",login_error:"Login error"},menubar:{manager:"tune manager",videos:"videos",suggest:"requests",tunebook:"repertoire",sets:"sets",learn:"learn",practice:"practice",game:"game",stats:"stats",signoff:"sign off"},tunebook:{sorttitle:"name",sortstatus:"status",sortlast:"last practice",sortkey:"key",sortnumber:"practice count",title:"My Repertoire",tunes:"tunes",search:"text search",show:"showing",filtered:"filtered tunes",alltypes:"all types",allkeys:"all keys",allstatus:"all statuses"}},ha={token:{token_ok:"token válido, datos de usuario recuperados.",token_ko:"el token guardado no es válido."},login:{title:"Inicio de Sesión",email:"Correo Electrónico",pass:"Contraseña",login:"Iniciar Sesión",new_user:"¿Desea crear una cuenta nueva?",required_mail:"Email obligatorio",required_pass:"Introduce contraseña",login_error:"Error en login"},menubar:{manager:"temas",videos:"videos",suggest:"peticiones",tunebook:"repertorio",sets:"sets",learn:"aprender",practice:"ensayar",game:"juego",stats:"historial",signoff:"cerrar sesión"},tunebook:{sorttitle:"nombre",sortstatus:"status",sortlast:"último ensayo",sortkey:"tonalidad",sortnumber:"nº de ensayos",title:"Mi repertorio",tunes:"temas",search:"busqueda por texto",show:"mostrando",filtered:"temas filtrados",alltypes:"todos los tipos",allkeys:"todos los tonos",allstatus:"todos los status"}},k=class k{static getinstance(s){if(Object.hasOwn(_e,s)){const e=s==="Menubar"?k.menuelement:k.htmlelement,t=new _e[s](s,e);return s!=="Menubar"&&(k.activeScreen=t),t}}static async getuserdetails(){k.poly=new da({phrases:ua});const s=localStorage.getItem("token");if(s)try{const e=await L.getuser(s);l.user=e,l.user.lang!=="en"&&k.poly.replace(ha),new b("success",k.poly.t("token.token_ok")),k.startapp()}catch{new b("warning",k.poly.t("token.token_ko")),localStorage.removeItem("token"),k.getinstance("Login")}else k.getinstance("Login")}static async startapp(){await k.loadAlltunes(),await k.loadGenericPics(),await k.loadUserTunebook(),await k.loadUserSetbook(),k.getinstance("Menubar")}static async loadGenericPics(){if(l.genericpics=await V.initialize(),l.genericpics&&l.genericpics.length>0)return new b("success",`cargadas ${l.genericpics.length} imagenes genéricas.`),!0;new b("danger","error al cargar fotos genericas.")}static async loadAlltunes(){if(l.tunes=await L.getalltunes(),l.tunes&&l.tunes.length>0)return l.tunes.forEach(s=>{s!=null&&s.other_names?s.other_names.includes(s.main_name)||s.other_names.push(s.main_name):s.other_names=[s.main_name],(!s.sortname||s.sortname.length==0)&&(s.sortname=p.titleforsort(s.main_name))}),new b("success",`cargados ${l.tunes.length} temas.`),!0;new b("danger","error al cargar todos los temas.")}static async loadUserTunebook(){return l.tunebook=await L.gettunebook(),l.tunebook&&l.tunebook.length>0?(l.tunebook.forEach(s=>{s.tuneref=l.tunes.find(e=>e.id===s.tunes_id),p.calcValueforTunes(s)}),new b("success",`cargados ${l.tunebook.length} temas de tu repertorio.`),!0):(new b("info","no tienes nada en tu repertorio."),!0)}static async loadUserSetbook(){if(l.setbook=await L.getsetbook(),l.setbook&&l.setbook.length>0)return new b("success",`cargados ${l.setbook.length} sets de tu repertorio.`),!0;new b("info","no tienes ningun set.")}static async addrehearsal(s){let e=l.tunebook.find(i=>i.id==s);const t=JSON.parse(JSON.stringify(e));Array.isArray(e.last_rehearsals)||(e.last_rehearsals=[]);const a=new Date;return e.last_rehearsalDate=a.valueOf(),e.last_rehearsals.unshift(e.last_rehearsalDate),e.last_rehearsals.length>10&&(e.last_rehearsals=e.last_rehearsals.slice(0,10)),e.rehearsal_days++,await L.edittunebooktune(s,e)?(p.calcValueforTunes(e),new b("success",`añadido nuevo ensayo de ${e.prefered_name}.`),!0):(e=t,new b("danger","error al guardar el ensayo."),!1)}static async changeStatus(s,e){const t=l.tunebook.find(i=>i.id==s);t.status_num=e;const a=await L.edittunebooktune(s,t),r=p.getstatus(e);return a?(new b("success",`cambiado status de ${t.prefered_name} a ${r.label}`),!0):(new b("danger","error al cambiar status."),!1)}};o(k,"htmlelement",document.getElementById("app")),o(k,"menuelement",document.getElementById("menuholder")),o(k,"activeScreen"),o(k,"midiBuffer"),o(k,"player"),o(k,"searchtunes",[]),o(k,"poly");let u=k;u.getuserdetails();
