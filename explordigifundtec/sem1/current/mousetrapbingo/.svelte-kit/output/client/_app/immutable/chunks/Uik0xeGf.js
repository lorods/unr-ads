import{U as Yi,b as Vu,h as Me,e as Wr,V as Nu,a as nf,g as S,r as sf,W as rf,c as Wc,i as Qr,j as $r,X as Ou,Y as of,Z as Qc,_ as Gs,a0 as Ut,a1 as so,a2 as af,a3 as cf,y as lf,a4 as uf,a5 as qa,a6 as hf,a7 as df,m as ff,a8 as Yc,a9 as mf,D as pf,aa as xu,ab as ku,ac as Xo,ad as gf,ae as _f,af as yf,ag as vf,ah as pa,ai as Mu,aj as Lu,ak as Ef,al as If,am as Jc,an as Xc,ao as Tf,ap as Af,aq as wf,ar as Sf,as as bf,at as Rf,au as Cf,av as Df,aw as Fu,F as $u,u as Bu,ax as qu,ay as Pf,A as Vf,K as nt,l as Zo,O as st,J as Nf,I as $,M as G,R as le,Q as rt,N as U,az as Or,s as re,G as Zc}from"./DvVQD3gv.js";import{a as de,f as Ce,t as Tn,c as el}from"./D-T-BJi9.js";import{o as Of}from"./RzfZt-WM.js";import{d as xf,a as ot,e as kf,s as te}from"./-lnI0AcK.js";import{i as it,b as Mf}from"./Ca8c0X5-.js";function tl(n,e){return e}function Lf(n,e,t){for(var s=[],r=e.length,o,a=e.length,l=0;l<r;l++){let g=e[l];ku(g,()=>{if(o){if(o.pending.delete(g),o.done.add(g),o.pending.size===0){var _=n.outrogroups;ga(n,qa(o.done)),_.delete(o),_.size===0&&(n.outrogroups=null)}}else a-=1},!1)}if(a===0){var h=s.length===0&&t!==null&&n.pending.size===0;if(h){var d=t,m=d.parentNode;_f(m),m.append(d),n.items.clear()}ga(n,e,!h)}else o={pending:new Set(e),done:new Set},(n.outrogroups??(n.outrogroups=new Set)).add(o)}function ga(n,e,t=!0){var s;if(n.pending.size>0){s=new Set;for(const a of n.pending.values())for(const l of a)s.add(n.items.get(l).e)}for(var r=0;r<e.length;r++){var o=e[r];if(s!=null&&s.has(o)){o.f|=Ut;const a=document.createDocumentFragment();yf(o,a)}else vf(e[r],t)}}var nl;function js(n,e,t,s,r,o=null){var a=n,l=new Map,h=(e&Mu)!==0;if(h){var d=n;a=Me?Wr(Nu(d)):d.appendChild(Yi())}Me&&nf();var m=null,g=lf(()=>{var M=t();return uf(M)?M:M==null?[]:qa(M)}),_=new Map,R=!0;function D(M){if((N.effect.f&pf)===0){N.pending.delete(M);var L=S(g);N.fallback=m,Ff(N,L,a,e,s),m!==null&&(L.length===0?(m.f&Ut)===0?xu(m):(m.f^=Ut,Br(m,null,a)):ku(m,()=>{m=null}))}}function k(M){N.pending.delete(M)}var A=Vu(()=>{var M=S(g),L=M.length;let B=!1;if(Me){var J=sf(a)===rf;J!==(L===0)&&(a=Wc(),Wr(a),Qr(!1),B=!0)}for(var Q=new Set,T=Gs,p=cf(),v=0;v<L;v+=1){Me&&$r.nodeType===Ou&&$r.data===of&&(a=$r,B=!0,Qr(!1));var I=M[v],E=s(I,v),w=R?null:l.get(E);w?(w.v&&Qc(w.v,I),w.i&&Qc(w.i,v),p&&T.unskip_effect(w.e)):(w=$f(l,R?a:nl??(nl=Yi()),I,E,v,r,e,t),R||(w.e.f|=Ut),l.set(E,w)),Q.add(E)}if(L===0&&o&&!m&&(R?m=so(()=>o(a)):(m=so(()=>o(nl??(nl=Yi()))),m.f|=Ut)),L>Q.size&&af(),Me&&L>0&&Wr(Wc()),!R)if(_.set(T,Q),p){for(const[y,xe]of l)Q.has(y)||T.skip_effect(xe.e);T.oncommit(D),T.ondiscard(k)}else D(T);B&&Qr(!0),S(g)}),N={effect:A,items:l,pending:_,outrogroups:null,fallback:m};R=!1,Me&&(a=$r)}function xr(n){for(;n!==null&&(n.f&gf)===0;)n=n.next;return n}function Ff(n,e,t,s,r){var I,E,w,y,xe,Fe,Vt,je,gt;var o=(s&Ef)!==0,a=e.length,l=n.items,h=xr(n.effect.first),d,m=null,g,_=[],R=[],D,k,A,N;if(o)for(N=0;N<a;N+=1)D=e[N],k=r(D,N),A=l.get(k).e,(A.f&Ut)===0&&((E=(I=A.nodes)==null?void 0:I.a)==null||E.measure(),(g??(g=new Set)).add(A));for(N=0;N<a;N+=1){if(D=e[N],k=r(D,N),A=l.get(k).e,n.outrogroups!==null)for(const et of n.outrogroups)et.pending.delete(A),et.done.delete(A);if((A.f&Xo)!==0&&(xu(A),o&&((y=(w=A.nodes)==null?void 0:w.a)==null||y.unfix(),(g??(g=new Set)).delete(A))),(A.f&Ut)!==0)if(A.f^=Ut,A===h)Br(A,null,t);else{var M=m?m.next:h;A===n.effect.last&&(n.effect.last=A.prev),A.prev&&(A.prev.next=A.next),A.next&&(A.next.prev=A.prev),An(n,m,A),An(n,A,M),Br(A,M,t),m=A,_=[],R=[],h=xr(m.next);continue}if(A!==h){if(d!==void 0&&d.has(A)){if(_.length<R.length){var L=R[0],B;m=L.prev;var J=_[0],Q=_[_.length-1];for(B=0;B<_.length;B+=1)Br(_[B],L,t);for(B=0;B<R.length;B+=1)d.delete(R[B]);An(n,J.prev,Q.next),An(n,m,J),An(n,Q,L),h=L,m=Q,N-=1,_=[],R=[]}else d.delete(A),Br(A,h,t),An(n,A.prev,A.next),An(n,A,m===null?n.effect.first:m.next),An(n,m,A),m=A;continue}for(_=[],R=[];h!==null&&h!==A;)(d??(d=new Set)).add(h),R.push(h),h=xr(h.next);if(h===null)continue}(A.f&Ut)===0&&_.push(A),m=A,h=xr(A.next)}if(n.outrogroups!==null){for(const et of n.outrogroups)et.pending.size===0&&(ga(n,qa(et.done)),(xe=n.outrogroups)==null||xe.delete(et));n.outrogroups.size===0&&(n.outrogroups=null)}if(h!==null||d!==void 0){var T=[];if(d!==void 0)for(A of d)(A.f&Xo)===0&&T.push(A);for(;h!==null;)(h.f&Xo)===0&&h!==n.fallback&&T.push(h),h=xr(h.next);var p=T.length;if(p>0){var v=(s&Mu)!==0&&a===0?t:null;if(o){for(N=0;N<p;N+=1)(Vt=(Fe=T[N].nodes)==null?void 0:Fe.a)==null||Vt.measure();for(N=0;N<p;N+=1)(gt=(je=T[N].nodes)==null?void 0:je.a)==null||gt.fix()}Lf(n,T,v)}}o&&Lu(()=>{var et,Un;if(g!==void 0)for(A of g)(Un=(et=A.nodes)==null?void 0:et.a)==null||Un.apply()})}function $f(n,e,t,s,r,o,a,l){var h=(a&hf)!==0?(a&df)===0?ff(t,!1,!1):Yc(t):null,d=(a&mf)!==0?Yc(r):null;return{v:h,i:d,e:so(()=>(o(e,h??t,d??r,l),()=>{n.delete(s)}))}}function Br(n,e,t){if(n.nodes)for(var s=n.nodes.start,r=n.nodes.end,o=e&&(e.f&Ut)===0?e.nodes.start:t;s!==null;){var a=pa(s);if(o.before(s),s===r)return;s=a}}function An(n,e,t){e===null?n.effect.first=t:e.next=t,t===null?n.effect.last=e:t.prev=e}function qE(n,e){let t=null,s=Me;var r;if(Me){t=$r;for(var o=Nu(document.head);o!==null&&(o.nodeType!==Ou||o.data!==n);)o=pa(o);if(o===null)Qr(!1);else{var a=pa(o);o.remove(),Wr(a)}}Me||(r=document.head.appendChild(Yi()));try{Vu(()=>{var l=so(()=>e(r));l.f|=If,Me||(l.nodes===null?l.nodes={start:r,end:r,a:null,t:null}:l.nodes.end=r)})}finally{s&&(Qr(!0),Wr(t))}}function Bf(n,e,t){var s=n==null?"":""+n;return s=s?s+" "+e:e,s===""?null:s}function qf(n,e){return n==null?null:String(n)}function It(n,e,t,s,r,o){var a=n[Jc];if(Me||a!==t||a===void 0){var l=Bf(t,s);(!Me||l!==n.getAttribute("class"))&&(l==null?n.removeAttribute("class"):n.className=l),n[Jc]=t}return o}function Uf(n,e,t,s){var r=n[Xc];if(Me||r!==e){var o=qf(e);(!Me||o!==n.getAttribute("style"))&&(o==null?n.removeAttribute("style"):n.style.cssText=o),n[Xc]=e}return s}const jf=Symbol("is custom element"),zf=Symbol("is html"),Hf=Df?"link":"LINK";function wn(n){if(Me){var e=!1,t=()=>{if(!e){if(e=!0,n.hasAttribute("value")){var s=n.value;cs(n,"value",null),n.value=s}if(n.hasAttribute("checked")){var r=n.checked;cs(n,"checked",null),n.checked=r}}};n[Tf]=t,Lu(t),Af()}}function cs(n,e,t,s){var r=Gf(n);if(!(Me&&(r[e]=n.getAttribute(e),e==="src"||e==="srcset"||e==="href"&&n.nodeName===Hf))){var o=r[e];o!==(r[e]=t)&&(e==="loading"&&(n[Rf]=t),t==null?n.removeAttribute(e):typeof t!="string"&&Kf(n).has(e)?n[e]=t:Me&&(typeof t=="number"||typeof t=="boolean")&&o===String(t)||n.setAttribute(e,t))}}function Gf(n){var e;return n[e=wf]??(n[e]={[jf]:n.nodeName.includes("-"),[zf]:n.namespaceURI===Sf})}var sl=new Map;function Kf(n){var e=n.getAttribute("is")||n.nodeName,t=sl.get(e);if(t)return t;sl.set(e,t=new Set);for(var s,r=n,o=Element.prototype;o!==r;){s=Cf(r);for(var a in s)s[a].set&&a!=="innerHTML"&&a!=="textContent"&&a!=="innerText"&&t.add(a);r=bf(r)}return t}function kr(n,e,t=e){var s=new WeakSet;Fu(n,"input",async r=>{var o=r?n.defaultValue:n.value;if(o=ta(n)?na(o):o,t(o),Gs!==null&&s.add(Gs),await $u(),o!==(o=e())){var a=n.selectionStart,l=n.selectionEnd,h=n.value.length;if(n.value=o??"",l!==null){var d=n.value.length;a===l&&l===h&&d>h?(n.selectionStart=d,n.selectionEnd=d):(n.selectionStart=a,n.selectionEnd=Math.min(l,d))}}}),(Me&&n.defaultValue!==n.value||Bu(e)==null&&n.value)&&(t(ta(n)?na(n.value):n.value),Gs!==null&&s.add(Gs)),qu(()=>{var r=e();if(n===document.activeElement){var o=Gs;if(s.has(o))return}ta(n)&&r===na(n.value)||n.type==="date"&&!r&&!n.value||r!==n.value&&(n.value=r??"")})}function ea(n,e,t=e){Fu(n,"change",s=>{var r=s?n.defaultChecked:n.checked;t(r)}),(Me&&n.defaultChecked!==n.checked||Bu(e)==null)&&t(n.checked),qu(()=>{var s=e();n.checked=!!s})}function ta(n){var e=n.type;return e==="number"||e==="range"}function na(n){return n===""?null:+n}Pf();const at=Object.freeze([{id:0,alias:"leftoutofbounds",guireptext:"Carrinho saiu da área delimitada permitida pela lateral esquerda (referência: vetor direção carrinho visto de cima [↑]).",cardexcludes:[]},{id:1,alias:"rightoutofbounds",guireptext:"Carrinho saiu da área delimitada permitida pela lateral direita (referência: vetor direção carrinho visto de cima [↑]).",cardexcludes:[]},{id:2,alias:"hitleftpillar",guireptext:"Carrinho bateu em pilar da esquerda.",cardexcludes:[]},{id:3,alias:"hitrightpillar",guireptext:"Carrinho bateu em pilar da direita.",cardexcludes:[]},{id:4,alias:"hitproduction",guireptext:"Carrinho bateu na produção do evento.",cardexcludes:[]},{id:5,alias:"sheddebris",guireptext:"Carrinho soltou detritos na trajetória.",cardexcludes:[]},{id:6,alias:"equaldistances",guireptext:"Pelo menos duas distâncias iguais foram percorridas.",cardexcludes:[7]},{id:7,alias:"noequaldistances",guireptext:"Nenhuma distância percorrida se repetiu alguma vez.",cardexcludes:[6]},{id:8,alias:"championbesttime",guireptext:"O carrinho campeão fez o melhor tempo geral.",cardexcludes:[]},{id:9,alias:"besttimeinfinal",guireptext:"O melhor tempo geral saiu durante a final.",cardexcludes:[10]},{id:10,alias:"besttimeinfirstround",guireptext:"O melhor tempo geral saiu durante a primeira rodada classificatória.",cardexcludes:[9]},{id:11,alias:"finaldiffunder1m",guireptext:"A diferença na final foi de menos de 1 metro.",cardexcludes:[12]},{id:12,alias:"finaldiffover1m",guireptext:"A diferença na final foi de mais de 1 metro.",cardexcludes:[11]},{id:13,alias:"highertotaldistanc",guireptext:"A distância total percorrida durante o evento foi de mais de 1550 metros.",cardexcludes:[14]},{id:14,alias:"lowertotaldistanc",guireptext:"A distância total percorrida durante o evento foi de menos de 1550 metros.",cardexcludes:[13]},{id:15,alias:"unintendedtrigger",guireptext:"A ratoeira se desarmou sozinha ou sem que a equipe quisesse.",cardexcludes:[]},{id:16,alias:"stringfailure",guireptext:"O barbante arrebentou ou enroscou no eixo durante o trajeto.",cardexcludes:[]},{id:17,alias:"firstroundleaderchampion",guireptext:"O líder ao fim da primeira rodada classificatória terminou como campeão geral.",cardexcludes:[]},{id:18,alias:"leadchangedlastchance",guireptext:"A liderança geral mudou de mãos durante a final.",cardexcludes:[]},{id:19,alias:"consistentimprovement",guireptext:"Pelo menos um carrinho melhorou sua marca em todas as rodadas que disputou.",cardexcludes:[]}]),lt=at.length,ue=10,Wf=lt-ue;function rl(n,e){return typeof e!="number"?n:n.replace(/\bx metros\b/g,`${e} metros`)}function Uu(n,e=at){const t=new Set(n),s=new Map(e.map(o=>[o.id,o])),r=[];for(const o of t){const a=s.get(o);if(a)for(const l of a.cardexcludes)t.has(l)&&o<l&&r.push([o,l])}return{valid:r.length===0,conflicts:r}}function Ui(n=ue,e=at){const t=[...e];for(let o=t.length-1;o>0;o-=1){const a=Math.floor(Math.random()*(o+1));[t[o],t[a]]=[t[a],t[o]]}const s=[],r=new Set;for(const o of t){if(s.length>=n)break;if(!r.has(o.id)){s.push(o.id);for(const a of o.cardexcludes??[])r.add(a)}}if(s.length!==n)throw new Error(`Não foi possível gerar uma cartela válida com ${n} itens a partir do catálogo.`);return s.sort((o,a)=>o-a)}const Qf=()=>{};var il={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ju=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let r=n.charCodeAt(s);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},Yf=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const r=n[t++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const o=n[t++];e[s++]=String.fromCharCode((r&31)<<6|o&63)}else if(r>239&&r<365){const o=n[t++],a=n[t++],l=n[t++],h=((r&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;e[s++]=String.fromCharCode(55296+(h>>10)),e[s++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],a=n[t++];e[s++]=String.fromCharCode((r&15)<<12|(o&63)<<6|a&63)}}return e.join("")},zu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<n.length;r+=3){const o=n[r],a=r+1<n.length,l=a?n[r+1]:0,h=r+2<n.length,d=h?n[r+2]:0,m=o>>2,g=(o&3)<<4|l>>4;let _=(l&15)<<2|d>>6,R=d&63;h||(R=64,a||(_=64)),s.push(t[m],t[g],t[_],t[R])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ju(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Yf(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<n.length;){const o=t[n.charAt(r++)],l=r<n.length?t[n.charAt(r)]:0;++r;const d=r<n.length?t[n.charAt(r)]:64;++r;const g=r<n.length?t[n.charAt(r)]:64;if(++r,o==null||l==null||d==null||g==null)throw new Jf;const _=o<<2|l>>4;if(s.push(_),d!==64){const R=l<<4&240|d>>2;if(s.push(R),g!==64){const D=d<<6&192|g;s.push(D)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Jf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Xf=function(n){const e=ju(n);return zu.encodeByteArray(e,!0)},ro=function(n){return Xf(n).replace(/\./g,"")},Zf=function(n){try{return zu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function em(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tm=()=>em().__FIREBASE_DEFAULTS__,nm=()=>{if(typeof process>"u"||typeof il>"u")return;const n=il.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},sm=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Zf(n[1]);return e&&JSON.parse(e)},Ua=()=>{try{return Qf()||tm()||nm()||sm()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},rm=n=>{var e,t;return(t=(e=Ua())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},im=n=>{const e=rm(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},Hu=()=>{var n;return(n=Ua())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class om{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ja(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function am(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cm(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",r=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[ro(JSON.stringify(t)),ro(JSON.stringify(a)),""].join(".")}const Yr={};function lm(){const n={prod:[],emulator:[]};for(const e of Object.keys(Yr))Yr[e]?n.emulator.push(e):n.prod.push(e);return n}function um(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let ol=!1;function hm(n,e){if(typeof window>"u"||typeof document>"u"||!ja(window.location.host)||Yr[n]===e||Yr[n]||ol)return;Yr[n]=e;function t(_){return`__firebase__banner__${_}`}const s="__firebase__banner",o=lm().prod.length>0;function a(){const _=document.getElementById(s);_&&_.remove()}function l(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function h(_,R){_.setAttribute("width","24"),_.setAttribute("id",R),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function d(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{ol=!0,a()},_}function m(_,R){_.setAttribute("id",R),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function g(){const _=um(s),R=t("text"),D=document.getElementById(R)||document.createElement("span"),k=t("learnmore"),A=document.getElementById(k)||document.createElement("a"),N=t("preprendIcon"),M=document.getElementById(N)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const L=_.element;l(L),m(A,k);const B=d();h(M,N),L.append(M,D,A,B),document.body.appendChild(L)}o?(D.innerText="Preview backend disconnected.",M.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(M.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,D.innerText="Preview backend running in this workspace."),D.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",g):g()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dm(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function fm(){var n;const e=(n=Ua())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function mm(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function pm(){return!fm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Gu(){try{return typeof indexedDB=="object"}catch{return!1}}function Ku(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{var o;e(((o=r.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}function gm(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _m="FirebaseError";class Fn extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=_m,Object.setPrototypeOf(this,Fn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,vo.prototype.create)}}class vo{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},r=`${this.service}/${e}`,o=this.errors[e],a=o?ym(o,s):"Error",l=`${this.serviceName}: ${a} (${r}).`;return new Fn(r,l,s)}}function ym(n,e){return n.replace(vm,(t,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const vm=/\{\$([^}]+)}/g;function io(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const r of t){if(!s.includes(r))return!1;const o=n[r],a=e[r];if(al(o)&&al(a)){if(!io(o,a))return!1}else if(o!==a)return!1}for(const r of s)if(!t.includes(r))return!1;return!0}function al(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Em=1e3,Im=2,Tm=14400*1e3,Am=.5;function cl(n,e=Em,t=Im){const s=e*Math.pow(t,n),r=Math.round(Am*s*(Math.random()-.5)*2);return Math.min(Tm,s+r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(n){return n&&n._delegate?n._delegate:n}class an{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const as="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new om;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(o){if(r)return null;throw o}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(bm(e))try{this.getOrInitializeService({instanceIdentifier:as})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:r});s.resolve(o)}catch{}}}}clearInstance(e=as){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=as){return this.instances.has(e)}getOptions(e=as){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);s===l&&a.resolve(r)}return r}onInit(e,t){var s;const r=this.normalizeInstanceIdentifier(t),o=(s=this.onInitCallbacks.get(r))!==null&&s!==void 0?s:new Set;o.add(e),this.onInitCallbacks.set(r,o);const a=this.instances.get(r);return a&&e(a,r),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const r of s)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Sm(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=as){return this.component?this.component.multipleInstances?e:as:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Sm(n){return n===as?void 0:n}function bm(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new wm(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ae;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ae||(ae={}));const Cm={debug:ae.DEBUG,verbose:ae.VERBOSE,info:ae.INFO,warn:ae.WARN,error:ae.ERROR,silent:ae.SILENT},Dm=ae.INFO,Pm={[ae.DEBUG]:"log",[ae.VERBOSE]:"log",[ae.INFO]:"info",[ae.WARN]:"warn",[ae.ERROR]:"error"},Vm=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),r=Pm[e];if(r)console[r](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class za{constructor(e){this.name=e,this._logLevel=Dm,this._logHandler=Vm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ae))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Cm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ae.DEBUG,...e),this._logHandler(this,ae.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ae.VERBOSE,...e),this._logHandler(this,ae.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ae.INFO,...e),this._logHandler(this,ae.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ae.WARN,...e),this._logHandler(this,ae.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ae.ERROR,...e),this._logHandler(this,ae.ERROR,...e)}}const Nm=(n,e)=>e.some(t=>n instanceof t);let ll,ul;function Om(){return ll||(ll=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function xm(){return ul||(ul=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Wu=new WeakMap,_a=new WeakMap,Qu=new WeakMap,sa=new WeakMap,Ha=new WeakMap;function km(n){const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(bn(n.result)),r()},a=()=>{s(n.error),r()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Wu.set(t,n)}).catch(()=>{}),Ha.set(e,n),e}function Mm(n){if(_a.has(n))return;const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),r()},a=()=>{s(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});_a.set(n,e)}let ya={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return _a.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Qu.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return bn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Lm(n){ya=n(ya)}function Fm(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(ra(this),e,...t);return Qu.set(s,e.sort?e.sort():[e]),bn(s)}:xm().includes(n)?function(...e){return n.apply(ra(this),e),bn(Wu.get(this))}:function(...e){return bn(n.apply(ra(this),e))}}function $m(n){return typeof n=="function"?Fm(n):(n instanceof IDBTransaction&&Mm(n),Nm(n,Om())?new Proxy(n,ya):n)}function bn(n){if(n instanceof IDBRequest)return km(n);if(sa.has(n))return sa.get(n);const e=$m(n);return e!==n&&(sa.set(n,e),Ha.set(e,n)),e}const ra=n=>Ha.get(n);function Yu(n,e,{blocked:t,upgrade:s,blocking:r,terminated:o}={}){const a=indexedDB.open(n,e),l=bn(a);return s&&a.addEventListener("upgradeneeded",h=>{s(bn(a.result),h.oldVersion,h.newVersion,bn(a.transaction),h)}),t&&a.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),l.then(h=>{o&&h.addEventListener("close",()=>o()),r&&h.addEventListener("versionchange",d=>r(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const Bm=["get","getKey","getAll","getAllKeys","count"],qm=["put","add","delete","clear"],ia=new Map;function hl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ia.get(e))return ia.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,r=qm.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Bm.includes(t)))return;const o=async function(a,...l){const h=this.transaction(a,r?"readwrite":"readonly");let d=h.store;return s&&(d=d.index(l.shift())),(await Promise.all([d[t](...l),r&&h.done]))[0]};return ia.set(e,o),o}Lm(n=>({...n,get:(e,t,s)=>hl(e,t)||n.get(e,t,s),has:(e,t)=>!!hl(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(jm(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function jm(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const va="@firebase/app",dl="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn=new za("@firebase/app"),zm="@firebase/app-compat",Hm="@firebase/analytics-compat",Gm="@firebase/analytics",Km="@firebase/app-check-compat",Wm="@firebase/app-check",Qm="@firebase/auth",Ym="@firebase/auth-compat",Jm="@firebase/database",Xm="@firebase/data-connect",Zm="@firebase/database-compat",ep="@firebase/functions",tp="@firebase/functions-compat",np="@firebase/installations",sp="@firebase/installations-compat",rp="@firebase/messaging",ip="@firebase/messaging-compat",op="@firebase/performance",ap="@firebase/performance-compat",cp="@firebase/remote-config",lp="@firebase/remote-config-compat",up="@firebase/storage",hp="@firebase/storage-compat",dp="@firebase/firestore",fp="@firebase/ai",mp="@firebase/firestore-compat",pp="firebase",gp="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea="[DEFAULT]",_p={[va]:"fire-core",[zm]:"fire-core-compat",[Gm]:"fire-analytics",[Hm]:"fire-analytics-compat",[Wm]:"fire-app-check",[Km]:"fire-app-check-compat",[Qm]:"fire-auth",[Ym]:"fire-auth-compat",[Jm]:"fire-rtdb",[Xm]:"fire-data-connect",[Zm]:"fire-rtdb-compat",[ep]:"fire-fn",[tp]:"fire-fn-compat",[np]:"fire-iid",[sp]:"fire-iid-compat",[rp]:"fire-fcm",[ip]:"fire-fcm-compat",[op]:"fire-perf",[ap]:"fire-perf-compat",[cp]:"fire-rc",[lp]:"fire-rc-compat",[up]:"fire-gcs",[hp]:"fire-gcs-compat",[dp]:"fire-fst",[mp]:"fire-fst-compat",[fp]:"fire-vertex","fire-js":"fire-js",[pp]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const si=new Map,yp=new Map,Ia=new Map;function fl(n,e){try{n.container.addComponent(e)}catch(t){cn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Pn(n){const e=n.name;if(Ia.has(e))return cn.debug(`There were multiple attempts to register component ${e}.`),!1;Ia.set(e,n);for(const t of si.values())fl(t,n);for(const t of yp.values())fl(t,n);return!0}function Ga(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function vp(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ep={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Rn=new vo("app","Firebase",Ep);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip{constructor(e,t,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new an("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Rn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tp=gp;function Ju(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s=Object.assign({name:Ea,automaticDataCollectionEnabled:!0},e),r=s.name;if(typeof r!="string"||!r)throw Rn.create("bad-app-name",{appName:String(r)});if(t||(t=Hu()),!t)throw Rn.create("no-options");const o=si.get(r);if(o){if(io(t,o.options)&&io(s,o.config))return o;throw Rn.create("duplicate-app",{appName:r})}const a=new Rm(r);for(const h of Ia.values())a.addComponent(h);const l=new Ip(t,s,a);return si.set(r,l),l}function Xu(n=Ea){const e=si.get(n);if(!e&&n===Ea&&Hu())return Ju();if(!e)throw Rn.create("no-app",{appName:n});return e}function Ap(){return Array.from(si.values())}function jt(n,e,t){var s;let r=(s=_p[n])!==null&&s!==void 0?s:n;t&&(r+=`-${t}`);const o=r.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const l=[`Unable to register library "${r}" with version "${e}":`];o&&l.push(`library name "${r}" contains illegal characters (whitespace or "/")`),o&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),cn.warn(l.join(" "));return}Pn(new an(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wp="firebase-heartbeat-database",Sp=1,ri="firebase-heartbeat-store";let oa=null;function Zu(){return oa||(oa=Yu(wp,Sp,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ri)}catch(t){console.warn(t)}}}}).catch(n=>{throw Rn.create("idb-open",{originalErrorMessage:n.message})})),oa}async function bp(n){try{const t=(await Zu()).transaction(ri),s=await t.objectStore(ri).get(eh(n));return await t.done,s}catch(e){if(e instanceof Fn)cn.warn(e.message);else{const t=Rn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});cn.warn(t.message)}}}async function ml(n,e){try{const s=(await Zu()).transaction(ri,"readwrite");await s.objectStore(ri).put(e,eh(n)),await s.done}catch(t){if(t instanceof Fn)cn.warn(t.message);else{const s=Rn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});cn.warn(s.message)}}}function eh(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rp=1024,Cp=30;class Dp{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Vp(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=pl();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:r}),this._heartbeatsCache.heartbeats.length>Cp){const a=Np(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){cn.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=pl(),{heartbeatsToSend:s,unsentEntries:r}=Pp(this._heartbeatsCache.heartbeats),o=ro(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return cn.warn(t),""}}}function pl(){return new Date().toISOString().substring(0,10)}function Pp(n,e=Rp){const t=[];let s=n.slice();for(const r of n){const o=t.find(a=>a.agent===r.agent);if(o){if(o.dates.push(r.date),gl(t)>e){o.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),gl(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class Vp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Gu()?Ku().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await bp(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return ml(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return ml(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function gl(n){return ro(JSON.stringify({version:2,heartbeats:n})).length}function Np(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Op(n){Pn(new an("platform-logger",e=>new Um(e),"PRIVATE")),Pn(new an("heartbeat",e=>new Dp(e),"PRIVATE")),jt(va,dl,n),jt(va,dl,"esm2017"),jt("fire-js","")}Op("");var _l=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Cn,th;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,p){function v(){}v.prototype=p.prototype,T.D=p.prototype,T.prototype=new v,T.prototype.constructor=T,T.C=function(I,E,w){for(var y=Array(arguments.length-2),xe=2;xe<arguments.length;xe++)y[xe-2]=arguments[xe];return p.prototype[E].apply(I,y)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(s,t),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(T,p,v){v||(v=0);var I=Array(16);if(typeof p=="string")for(var E=0;16>E;++E)I[E]=p.charCodeAt(v++)|p.charCodeAt(v++)<<8|p.charCodeAt(v++)<<16|p.charCodeAt(v++)<<24;else for(E=0;16>E;++E)I[E]=p[v++]|p[v++]<<8|p[v++]<<16|p[v++]<<24;p=T.g[0],v=T.g[1],E=T.g[2];var w=T.g[3],y=p+(w^v&(E^w))+I[0]+3614090360&4294967295;p=v+(y<<7&4294967295|y>>>25),y=w+(E^p&(v^E))+I[1]+3905402710&4294967295,w=p+(y<<12&4294967295|y>>>20),y=E+(v^w&(p^v))+I[2]+606105819&4294967295,E=w+(y<<17&4294967295|y>>>15),y=v+(p^E&(w^p))+I[3]+3250441966&4294967295,v=E+(y<<22&4294967295|y>>>10),y=p+(w^v&(E^w))+I[4]+4118548399&4294967295,p=v+(y<<7&4294967295|y>>>25),y=w+(E^p&(v^E))+I[5]+1200080426&4294967295,w=p+(y<<12&4294967295|y>>>20),y=E+(v^w&(p^v))+I[6]+2821735955&4294967295,E=w+(y<<17&4294967295|y>>>15),y=v+(p^E&(w^p))+I[7]+4249261313&4294967295,v=E+(y<<22&4294967295|y>>>10),y=p+(w^v&(E^w))+I[8]+1770035416&4294967295,p=v+(y<<7&4294967295|y>>>25),y=w+(E^p&(v^E))+I[9]+2336552879&4294967295,w=p+(y<<12&4294967295|y>>>20),y=E+(v^w&(p^v))+I[10]+4294925233&4294967295,E=w+(y<<17&4294967295|y>>>15),y=v+(p^E&(w^p))+I[11]+2304563134&4294967295,v=E+(y<<22&4294967295|y>>>10),y=p+(w^v&(E^w))+I[12]+1804603682&4294967295,p=v+(y<<7&4294967295|y>>>25),y=w+(E^p&(v^E))+I[13]+4254626195&4294967295,w=p+(y<<12&4294967295|y>>>20),y=E+(v^w&(p^v))+I[14]+2792965006&4294967295,E=w+(y<<17&4294967295|y>>>15),y=v+(p^E&(w^p))+I[15]+1236535329&4294967295,v=E+(y<<22&4294967295|y>>>10),y=p+(E^w&(v^E))+I[1]+4129170786&4294967295,p=v+(y<<5&4294967295|y>>>27),y=w+(v^E&(p^v))+I[6]+3225465664&4294967295,w=p+(y<<9&4294967295|y>>>23),y=E+(p^v&(w^p))+I[11]+643717713&4294967295,E=w+(y<<14&4294967295|y>>>18),y=v+(w^p&(E^w))+I[0]+3921069994&4294967295,v=E+(y<<20&4294967295|y>>>12),y=p+(E^w&(v^E))+I[5]+3593408605&4294967295,p=v+(y<<5&4294967295|y>>>27),y=w+(v^E&(p^v))+I[10]+38016083&4294967295,w=p+(y<<9&4294967295|y>>>23),y=E+(p^v&(w^p))+I[15]+3634488961&4294967295,E=w+(y<<14&4294967295|y>>>18),y=v+(w^p&(E^w))+I[4]+3889429448&4294967295,v=E+(y<<20&4294967295|y>>>12),y=p+(E^w&(v^E))+I[9]+568446438&4294967295,p=v+(y<<5&4294967295|y>>>27),y=w+(v^E&(p^v))+I[14]+3275163606&4294967295,w=p+(y<<9&4294967295|y>>>23),y=E+(p^v&(w^p))+I[3]+4107603335&4294967295,E=w+(y<<14&4294967295|y>>>18),y=v+(w^p&(E^w))+I[8]+1163531501&4294967295,v=E+(y<<20&4294967295|y>>>12),y=p+(E^w&(v^E))+I[13]+2850285829&4294967295,p=v+(y<<5&4294967295|y>>>27),y=w+(v^E&(p^v))+I[2]+4243563512&4294967295,w=p+(y<<9&4294967295|y>>>23),y=E+(p^v&(w^p))+I[7]+1735328473&4294967295,E=w+(y<<14&4294967295|y>>>18),y=v+(w^p&(E^w))+I[12]+2368359562&4294967295,v=E+(y<<20&4294967295|y>>>12),y=p+(v^E^w)+I[5]+4294588738&4294967295,p=v+(y<<4&4294967295|y>>>28),y=w+(p^v^E)+I[8]+2272392833&4294967295,w=p+(y<<11&4294967295|y>>>21),y=E+(w^p^v)+I[11]+1839030562&4294967295,E=w+(y<<16&4294967295|y>>>16),y=v+(E^w^p)+I[14]+4259657740&4294967295,v=E+(y<<23&4294967295|y>>>9),y=p+(v^E^w)+I[1]+2763975236&4294967295,p=v+(y<<4&4294967295|y>>>28),y=w+(p^v^E)+I[4]+1272893353&4294967295,w=p+(y<<11&4294967295|y>>>21),y=E+(w^p^v)+I[7]+4139469664&4294967295,E=w+(y<<16&4294967295|y>>>16),y=v+(E^w^p)+I[10]+3200236656&4294967295,v=E+(y<<23&4294967295|y>>>9),y=p+(v^E^w)+I[13]+681279174&4294967295,p=v+(y<<4&4294967295|y>>>28),y=w+(p^v^E)+I[0]+3936430074&4294967295,w=p+(y<<11&4294967295|y>>>21),y=E+(w^p^v)+I[3]+3572445317&4294967295,E=w+(y<<16&4294967295|y>>>16),y=v+(E^w^p)+I[6]+76029189&4294967295,v=E+(y<<23&4294967295|y>>>9),y=p+(v^E^w)+I[9]+3654602809&4294967295,p=v+(y<<4&4294967295|y>>>28),y=w+(p^v^E)+I[12]+3873151461&4294967295,w=p+(y<<11&4294967295|y>>>21),y=E+(w^p^v)+I[15]+530742520&4294967295,E=w+(y<<16&4294967295|y>>>16),y=v+(E^w^p)+I[2]+3299628645&4294967295,v=E+(y<<23&4294967295|y>>>9),y=p+(E^(v|~w))+I[0]+4096336452&4294967295,p=v+(y<<6&4294967295|y>>>26),y=w+(v^(p|~E))+I[7]+1126891415&4294967295,w=p+(y<<10&4294967295|y>>>22),y=E+(p^(w|~v))+I[14]+2878612391&4294967295,E=w+(y<<15&4294967295|y>>>17),y=v+(w^(E|~p))+I[5]+4237533241&4294967295,v=E+(y<<21&4294967295|y>>>11),y=p+(E^(v|~w))+I[12]+1700485571&4294967295,p=v+(y<<6&4294967295|y>>>26),y=w+(v^(p|~E))+I[3]+2399980690&4294967295,w=p+(y<<10&4294967295|y>>>22),y=E+(p^(w|~v))+I[10]+4293915773&4294967295,E=w+(y<<15&4294967295|y>>>17),y=v+(w^(E|~p))+I[1]+2240044497&4294967295,v=E+(y<<21&4294967295|y>>>11),y=p+(E^(v|~w))+I[8]+1873313359&4294967295,p=v+(y<<6&4294967295|y>>>26),y=w+(v^(p|~E))+I[15]+4264355552&4294967295,w=p+(y<<10&4294967295|y>>>22),y=E+(p^(w|~v))+I[6]+2734768916&4294967295,E=w+(y<<15&4294967295|y>>>17),y=v+(w^(E|~p))+I[13]+1309151649&4294967295,v=E+(y<<21&4294967295|y>>>11),y=p+(E^(v|~w))+I[4]+4149444226&4294967295,p=v+(y<<6&4294967295|y>>>26),y=w+(v^(p|~E))+I[11]+3174756917&4294967295,w=p+(y<<10&4294967295|y>>>22),y=E+(p^(w|~v))+I[2]+718787259&4294967295,E=w+(y<<15&4294967295|y>>>17),y=v+(w^(E|~p))+I[9]+3951481745&4294967295,T.g[0]=T.g[0]+p&4294967295,T.g[1]=T.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+w&4294967295}s.prototype.u=function(T,p){p===void 0&&(p=T.length);for(var v=p-this.blockSize,I=this.B,E=this.h,w=0;w<p;){if(E==0)for(;w<=v;)r(this,T,w),w+=this.blockSize;if(typeof T=="string"){for(;w<p;)if(I[E++]=T.charCodeAt(w++),E==this.blockSize){r(this,I),E=0;break}}else for(;w<p;)if(I[E++]=T[w++],E==this.blockSize){r(this,I),E=0;break}}this.h=E,this.o+=p},s.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var p=1;p<T.length-8;++p)T[p]=0;var v=8*this.o;for(p=T.length-8;p<T.length;++p)T[p]=v&255,v/=256;for(this.u(T),T=Array(16),p=v=0;4>p;++p)for(var I=0;32>I;I+=8)T[v++]=this.g[p]>>>I&255;return T};function o(T,p){var v=l;return Object.prototype.hasOwnProperty.call(v,T)?v[T]:v[T]=p(T)}function a(T,p){this.h=p;for(var v=[],I=!0,E=T.length-1;0<=E;E--){var w=T[E]|0;I&&w==p||(v[E]=w,I=!1)}this.g=v}var l={};function h(T){return-128<=T&&128>T?o(T,function(p){return new a([p|0],0>p?-1:0)}):new a([T|0],0>T?-1:0)}function d(T){if(isNaN(T)||!isFinite(T))return g;if(0>T)return A(d(-T));for(var p=[],v=1,I=0;T>=v;I++)p[I]=T/v|0,v*=4294967296;return new a(p,0)}function m(T,p){if(T.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(T.charAt(0)=="-")return A(m(T.substring(1),p));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=d(Math.pow(p,8)),I=g,E=0;E<T.length;E+=8){var w=Math.min(8,T.length-E),y=parseInt(T.substring(E,E+w),p);8>w?(w=d(Math.pow(p,w)),I=I.j(w).add(d(y))):(I=I.j(v),I=I.add(d(y)))}return I}var g=h(0),_=h(1),R=h(16777216);n=a.prototype,n.m=function(){if(k(this))return-A(this).m();for(var T=0,p=1,v=0;v<this.g.length;v++){var I=this.i(v);T+=(0<=I?I:4294967296+I)*p,p*=4294967296}return T},n.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(D(this))return"0";if(k(this))return"-"+A(this).toString(T);for(var p=d(Math.pow(T,6)),v=this,I="";;){var E=B(v,p).g;v=N(v,E.j(p));var w=((0<v.g.length?v.g[0]:v.h)>>>0).toString(T);if(v=E,D(v))return w+I;for(;6>w.length;)w="0"+w;I=w+I}},n.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function D(T){if(T.h!=0)return!1;for(var p=0;p<T.g.length;p++)if(T.g[p]!=0)return!1;return!0}function k(T){return T.h==-1}n.l=function(T){return T=N(this,T),k(T)?-1:D(T)?0:1};function A(T){for(var p=T.g.length,v=[],I=0;I<p;I++)v[I]=~T.g[I];return new a(v,~T.h).add(_)}n.abs=function(){return k(this)?A(this):this},n.add=function(T){for(var p=Math.max(this.g.length,T.g.length),v=[],I=0,E=0;E<=p;E++){var w=I+(this.i(E)&65535)+(T.i(E)&65535),y=(w>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);I=y>>>16,w&=65535,y&=65535,v[E]=y<<16|w}return new a(v,v[v.length-1]&-2147483648?-1:0)};function N(T,p){return T.add(A(p))}n.j=function(T){if(D(this)||D(T))return g;if(k(this))return k(T)?A(this).j(A(T)):A(A(this).j(T));if(k(T))return A(this.j(A(T)));if(0>this.l(R)&&0>T.l(R))return d(this.m()*T.m());for(var p=this.g.length+T.g.length,v=[],I=0;I<2*p;I++)v[I]=0;for(I=0;I<this.g.length;I++)for(var E=0;E<T.g.length;E++){var w=this.i(I)>>>16,y=this.i(I)&65535,xe=T.i(E)>>>16,Fe=T.i(E)&65535;v[2*I+2*E]+=y*Fe,M(v,2*I+2*E),v[2*I+2*E+1]+=w*Fe,M(v,2*I+2*E+1),v[2*I+2*E+1]+=y*xe,M(v,2*I+2*E+1),v[2*I+2*E+2]+=w*xe,M(v,2*I+2*E+2)}for(I=0;I<p;I++)v[I]=v[2*I+1]<<16|v[2*I];for(I=p;I<2*p;I++)v[I]=0;return new a(v,0)};function M(T,p){for(;(T[p]&65535)!=T[p];)T[p+1]+=T[p]>>>16,T[p]&=65535,p++}function L(T,p){this.g=T,this.h=p}function B(T,p){if(D(p))throw Error("division by zero");if(D(T))return new L(g,g);if(k(T))return p=B(A(T),p),new L(A(p.g),A(p.h));if(k(p))return p=B(T,A(p)),new L(A(p.g),p.h);if(30<T.g.length){if(k(T)||k(p))throw Error("slowDivide_ only works with positive integers.");for(var v=_,I=p;0>=I.l(T);)v=J(v),I=J(I);var E=Q(v,1),w=Q(I,1);for(I=Q(I,2),v=Q(v,2);!D(I);){var y=w.add(I);0>=y.l(T)&&(E=E.add(v),w=y),I=Q(I,1),v=Q(v,1)}return p=N(T,E.j(p)),new L(E,p)}for(E=g;0<=T.l(p);){for(v=Math.max(1,Math.floor(T.m()/p.m())),I=Math.ceil(Math.log(v)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),w=d(v),y=w.j(p);k(y)||0<y.l(T);)v-=I,w=d(v),y=w.j(p);D(w)&&(w=_),E=E.add(w),T=N(T,y)}return new L(E,T)}n.A=function(T){return B(this,T).h},n.and=function(T){for(var p=Math.max(this.g.length,T.g.length),v=[],I=0;I<p;I++)v[I]=this.i(I)&T.i(I);return new a(v,this.h&T.h)},n.or=function(T){for(var p=Math.max(this.g.length,T.g.length),v=[],I=0;I<p;I++)v[I]=this.i(I)|T.i(I);return new a(v,this.h|T.h)},n.xor=function(T){for(var p=Math.max(this.g.length,T.g.length),v=[],I=0;I<p;I++)v[I]=this.i(I)^T.i(I);return new a(v,this.h^T.h)};function J(T){for(var p=T.g.length+1,v=[],I=0;I<p;I++)v[I]=T.i(I)<<1|T.i(I-1)>>>31;return new a(v,T.h)}function Q(T,p){var v=p>>5;p%=32;for(var I=T.g.length-v,E=[],w=0;w<I;w++)E[w]=0<p?T.i(w+v)>>>p|T.i(w+v+1)<<32-p:T.i(w+v);return new a(E,T.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,th=s,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,Cn=a}).apply(typeof _l<"u"?_l:typeof self<"u"?self:typeof window<"u"?window:{});var ji=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var nh,qr,sh,Ji,Ta,rh,ih,oh;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,c,u){return i==Array.prototype||i==Object.prototype||(i[c]=u.value),i};function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof ji=="object"&&ji];for(var c=0;c<i.length;++c){var u=i[c];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var s=t(this);function r(i,c){if(c)e:{var u=s;i=i.split(".");for(var f=0;f<i.length-1;f++){var b=i[f];if(!(b in u))break e;u=u[b]}i=i[i.length-1],f=u[i],c=c(f),c!=f&&c!=null&&e(u,i,{configurable:!0,writable:!0,value:c})}}function o(i,c){i instanceof String&&(i+="");var u=0,f=!1,b={next:function(){if(!f&&u<i.length){var V=u++;return{value:c(V,i[V]),done:!1}}return f=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}r("Array.prototype.values",function(i){return i||function(){return o(this,function(c,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function h(i){var c=typeof i;return c=c!="object"?c:i?Array.isArray(i)?"array":c:"null",c=="array"||c=="object"&&typeof i.length=="number"}function d(i){var c=typeof i;return c=="object"&&i!=null||c=="function"}function m(i,c,u){return i.call.apply(i.bind,arguments)}function g(i,c,u){if(!i)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,f),i.apply(c,b)}}return function(){return i.apply(c,arguments)}}function _(i,c,u){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:g,_.apply(null,arguments)}function R(i,c){var u=Array.prototype.slice.call(arguments,1);return function(){var f=u.slice();return f.push.apply(f,arguments),i.apply(this,f)}}function D(i,c){function u(){}u.prototype=c.prototype,i.aa=c.prototype,i.prototype=new u,i.prototype.constructor=i,i.Qb=function(f,b,V){for(var F=Array(arguments.length-2),ve=2;ve<arguments.length;ve++)F[ve-2]=arguments[ve];return c.prototype[b].apply(f,F)}}function k(i){const c=i.length;if(0<c){const u=Array(c);for(let f=0;f<c;f++)u[f]=i[f];return u}return[]}function A(i,c){for(let u=1;u<arguments.length;u++){const f=arguments[u];if(h(f)){const b=i.length||0,V=f.length||0;i.length=b+V;for(let F=0;F<V;F++)i[b+F]=f[F]}else i.push(f)}}class N{constructor(c,u){this.i=c,this.j=u,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function M(i){return/^[\s\xa0]*$/.test(i)}function L(){var i=l.navigator;return i&&(i=i.userAgent)?i:""}function B(i){return B[" "](i),i}B[" "]=function(){};var J=L().indexOf("Gecko")!=-1&&!(L().toLowerCase().indexOf("webkit")!=-1&&L().indexOf("Edge")==-1)&&!(L().indexOf("Trident")!=-1||L().indexOf("MSIE")!=-1)&&L().indexOf("Edge")==-1;function Q(i,c,u){for(const f in i)c.call(u,i[f],f,i)}function T(i,c){for(const u in i)c.call(void 0,i[u],u,i)}function p(i){const c={};for(const u in i)c[u]=i[u];return c}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(i,c){let u,f;for(let b=1;b<arguments.length;b++){f=arguments[b];for(u in f)i[u]=f[u];for(let V=0;V<v.length;V++)u=v[V],Object.prototype.hasOwnProperty.call(f,u)&&(i[u]=f[u])}}function E(i){var c=1;i=i.split(":");const u=[];for(;0<c&&i.length;)u.push(i.shift()),c--;return i.length&&u.push(i.join(":")),u}function w(i){l.setTimeout(()=>{throw i},0)}function y(){var i=et;let c=null;return i.g&&(c=i.g,i.g=i.g.next,i.g||(i.h=null),c.next=null),c}class xe{constructor(){this.h=this.g=null}add(c,u){const f=Fe.get();f.set(c,u),this.h?this.h.next=f:this.g=f,this.h=f}}var Fe=new N(()=>new Vt,i=>i.reset());class Vt{constructor(){this.next=this.g=this.h=null}set(c,u){this.h=c,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let je,gt=!1,et=new xe,Un=()=>{const i=l.Promise.resolve(void 0);je=()=>{i.then(Fo)}};var Fo=()=>{for(var i;i=y();){try{i.h.call(i.g)}catch(u){w(u)}var c=Fe;c.j(i),100>c.h&&(c.h++,i.next=c.g,c.g=i)}gt=!1};function St(){this.s=this.s,this.C=this.C}St.prototype.s=!1,St.prototype.ma=function(){this.s||(this.s=!0,this.N())},St.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function $e(i,c){this.type=i,this.g=this.target=c,this.defaultPrevented=!1}$e.prototype.h=function(){this.defaultPrevented=!0};var cr=(function(){if(!l.addEventListener||!Object.defineProperty)return!1;var i=!1,c=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const u=()=>{};l.addEventListener("test",u,c),l.removeEventListener("test",u,c)}catch{}return i})();function Qt(i,c){if($e.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var u=this.type=i.type,f=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=c,c=i.relatedTarget){if(J){e:{try{B(c.nodeName);var b=!0;break e}catch{}b=!1}b||(c=null)}}else u=="mouseover"?c=i.fromElement:u=="mouseout"&&(c=i.toElement);this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:Ii[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&Qt.aa.h.call(this)}}D(Qt,$e);var Ii={2:"touch",3:"pen",4:"mouse"};Qt.prototype.h=function(){Qt.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var Yt="closure_listenable_"+(1e6*Math.random()|0),$o=0;function Bo(i,c,u,f,b){this.listener=i,this.proxy=null,this.src=c,this.type=u,this.capture=!!f,this.ha=b,this.key=++$o,this.da=this.fa=!1}function Es(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function hn(i){this.src=i,this.g={},this.h=0}hn.prototype.add=function(i,c,u,f,b){var V=i.toString();i=this.g[V],i||(i=this.g[V]=[],this.h++);var F=ur(i,c,f,b);return-1<F?(c=i[F],u||(c.fa=!1)):(c=new Bo(c,this.src,V,!!f,b),c.fa=u,i.push(c)),c};function lr(i,c){var u=c.type;if(u in i.g){var f=i.g[u],b=Array.prototype.indexOf.call(f,c,void 0),V;(V=0<=b)&&Array.prototype.splice.call(f,b,1),V&&(Es(c),i.g[u].length==0&&(delete i.g[u],i.h--))}}function ur(i,c,u,f){for(var b=0;b<i.length;++b){var V=i[b];if(!V.da&&V.listener==c&&V.capture==!!u&&V.ha==f)return b}return-1}var hr="closure_lm_"+(1e6*Math.random()|0),dr={};function Ti(i,c,u,f,b){if(Array.isArray(c)){for(var V=0;V<c.length;V++)Ti(i,c[V],u,f,b);return null}return u=wi(u),i&&i[Yt]?i.K(c,u,d(f)?!!f.capture:!1,b):Ai(i,c,u,!1,f,b)}function Ai(i,c,u,f,b,V){if(!c)throw Error("Invalid event type");var F=d(b)?!!b.capture:!!b,ve=jn(i);if(ve||(i[hr]=ve=new hn(i)),u=ve.add(c,u,f,F,V),u.proxy)return u;if(f=qo(),u.proxy=f,f.src=i,f.listener=u,i.addEventListener)cr||(b=F),b===void 0&&(b=!1),i.addEventListener(c.toString(),f,b);else if(i.attachEvent)i.attachEvent(Is(c.toString()),f);else if(i.addListener&&i.removeListener)i.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return u}function qo(){function i(u){return c.call(i.src,i.listener,u)}const c=pr;return i}function fr(i,c,u,f,b){if(Array.isArray(c))for(var V=0;V<c.length;V++)fr(i,c[V],u,f,b);else f=d(f)?!!f.capture:!!f,u=wi(u),i&&i[Yt]?(i=i.i,c=String(c).toString(),c in i.g&&(V=i.g[c],u=ur(V,u,f,b),-1<u&&(Es(V[u]),Array.prototype.splice.call(V,u,1),V.length==0&&(delete i.g[c],i.h--)))):i&&(i=jn(i))&&(c=i.g[c.toString()],i=-1,c&&(i=ur(c,u,f,b)),(u=-1<i?c[i]:null)&&mr(u))}function mr(i){if(typeof i!="number"&&i&&!i.da){var c=i.src;if(c&&c[Yt])lr(c.i,i);else{var u=i.type,f=i.proxy;c.removeEventListener?c.removeEventListener(u,f,i.capture):c.detachEvent?c.detachEvent(Is(u),f):c.addListener&&c.removeListener&&c.removeListener(f),(u=jn(c))?(lr(u,i),u.h==0&&(u.src=null,c[hr]=null)):Es(i)}}}function Is(i){return i in dr?dr[i]:dr[i]="on"+i}function pr(i,c){if(i.da)i=!0;else{c=new Qt(c,this);var u=i.listener,f=i.ha||i.src;i.fa&&mr(i),i=u.call(f,c)}return i}function jn(i){return i=i[hr],i instanceof hn?i:null}var Ts="__closure_events_fn_"+(1e9*Math.random()>>>0);function wi(i){return typeof i=="function"?i:(i[Ts]||(i[Ts]=function(c){return i.handleEvent(c)}),i[Ts])}function Be(){St.call(this),this.i=new hn(this),this.M=this,this.F=null}D(Be,St),Be.prototype[Yt]=!0,Be.prototype.removeEventListener=function(i,c,u,f){fr(this,i,c,u,f)};function qe(i,c){var u,f=i.F;if(f)for(u=[];f;f=f.F)u.push(f);if(i=i.M,f=c.type||c,typeof c=="string")c=new $e(c,i);else if(c instanceof $e)c.target=c.target||i;else{var b=c;c=new $e(f,i),I(c,b)}if(b=!0,u)for(var V=u.length-1;0<=V;V--){var F=c.g=u[V];b=dn(F,f,!0,c)&&b}if(F=c.g=i,b=dn(F,f,!0,c)&&b,b=dn(F,f,!1,c)&&b,u)for(V=0;V<u.length;V++)F=c.g=u[V],b=dn(F,f,!1,c)&&b}Be.prototype.N=function(){if(Be.aa.N.call(this),this.i){var i=this.i,c;for(c in i.g){for(var u=i.g[c],f=0;f<u.length;f++)Es(u[f]);delete i.g[c],i.h--}}this.F=null},Be.prototype.K=function(i,c,u,f){return this.i.add(String(i),c,!1,u,f)},Be.prototype.L=function(i,c,u,f){return this.i.add(String(i),c,!0,u,f)};function dn(i,c,u,f){if(c=i.i.g[String(c)],!c)return!0;c=c.concat();for(var b=!0,V=0;V<c.length;++V){var F=c[V];if(F&&!F.da&&F.capture==u){var ve=F.listener,He=F.ha||F.src;F.fa&&lr(i.i,F),b=ve.call(He,f)!==!1&&b}}return b&&!f.defaultPrevented}function As(i,c,u){if(typeof i=="function")u&&(i=_(i,u));else if(i&&typeof i.handleEvent=="function")i=_(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(i,c||0)}function ws(i){i.g=As(()=>{i.g=null,i.i&&(i.i=!1,ws(i))},i.l);const c=i.h;i.h=null,i.m.apply(null,c)}class Si extends St{constructor(c,u){super(),this.m=c,this.l=u,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:ws(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function zn(i){St.call(this),this.h=i,this.g={}}D(zn,St);var bi=[];function Ss(i){Q(i.g,function(c,u){this.g.hasOwnProperty(u)&&mr(c)},i),i.g={}}zn.prototype.N=function(){zn.aa.N.call(this),Ss(this)},zn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Hn=l.JSON.stringify,gr=l.JSON.parse,_r=class{stringify(i){return l.JSON.stringify(i,void 0)}parse(i){return l.JSON.parse(i,void 0)}};function Gn(){}Gn.prototype.h=null;function yr(i){return i.h||(i.h=i.i())}function vr(){}var Jt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Er(){$e.call(this,"d")}D(Er,$e);function Ir(){$e.call(this,"c")}D(Ir,$e);var bt={},Ri=null;function bs(){return Ri=Ri||new Be}bt.La="serverreachability";function Rs(i){$e.call(this,bt.La,i)}D(Rs,$e);function Kn(i){const c=bs();qe(c,new Rs(c))}bt.STAT_EVENT="statevent";function Ci(i,c){$e.call(this,bt.STAT_EVENT,i),this.stat=c}D(Ci,$e);function ke(i){const c=bs();qe(c,new Ci(c,i))}bt.Ma="timingevent";function Di(i,c){$e.call(this,bt.Ma,i),this.size=c}D(Di,$e);function Wn(i,c){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){i()},c)}function Xt(){this.g=!0}Xt.prototype.xa=function(){this.g=!1};function Uo(i,c,u,f,b,V){i.info(function(){if(i.g)if(V)for(var F="",ve=V.split("&"),He=0;He<ve.length;He++){var he=ve[He].split("=");if(1<he.length){var Qe=he[0];he=he[1];var Ye=Qe.split("_");F=2<=Ye.length&&Ye[1]=="type"?F+(Qe+"="+he+"&"):F+(Qe+"=redacted&")}}else F=null;else F=V;return"XMLHTTP REQ ("+f+") [attempt "+b+"]: "+c+`
`+u+`
`+F})}function jo(i,c,u,f,b,V,F){i.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+b+"]: "+c+`
`+u+`
`+V+" "+F})}function Zt(i,c,u,f){i.info(function(){return"XMLHTTP TEXT ("+c+"): "+Ho(i,u)+(f?" "+f:"")})}function zo(i,c){i.info(function(){return"TIMEOUT: "+c})}Xt.prototype.info=function(){};function Ho(i,c){if(!i.g)return c;if(!c)return null;try{var u=JSON.parse(c);if(u){for(i=0;i<u.length;i++)if(Array.isArray(u[i])){var f=u[i];if(!(2>f.length)){var b=f[1];if(Array.isArray(b)&&!(1>b.length)){var V=b[0];if(V!="noop"&&V!="stop"&&V!="close")for(var F=1;F<b.length;F++)b[F]=""}}}}return Hn(u)}catch{return c}}var fn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Cs={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Qn;function Yn(){}D(Yn,Gn),Yn.prototype.g=function(){return new XMLHttpRequest},Yn.prototype.i=function(){return{}},Qn=new Yn;function Nt(i,c,u,f){this.j=i,this.i=c,this.l=u,this.R=f||1,this.U=new zn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Pi}function Pi(){this.i=null,this.g="",this.h=!1}var Tr={},Jn={};function Ds(i,c,u){i.L=1,i.v=pn(Rt(c)),i.m=u,i.P=!0,Ps(i,null)}function Ps(i,c){i.F=Date.now(),Vs(i),i.A=Rt(i.v);var u=i.A,f=i.R;Array.isArray(f)||(f=[String(f)]),C(u.i,"t",f),i.C=0,u=i.j.J,i.h=new Pi,i.g=zc(i.j,u?c:null,!i.m),0<i.O&&(i.M=new Si(_(i.Y,i,i.g),i.O)),c=i.U,u=i.g,f=i.ca;var b="readystatechange";Array.isArray(b)||(b&&(bi[0]=b.toString()),b=bi);for(var V=0;V<b.length;V++){var F=Ti(u,b[V],f||c.handleEvent,!1,c.h||c);if(!F)break;c.g[F.key]=F}c=i.H?p(i.H):{},i.m?(i.u||(i.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,c)):(i.u="GET",i.g.ea(i.A,i.u,null,c)),Kn(),Uo(i.i,i.u,i.A,i.l,i.R,i.m)}Nt.prototype.ca=function(i){i=i.target;const c=this.M;c&&De(i)==3?c.j():this.Y(i)},Nt.prototype.Y=function(i){try{if(i==this.g)e:{const Ye=De(this.g);var c=this.g.Ba();const Us=this.g.Z();if(!(3>Ye)&&(Ye!=3||this.g&&(this.h.h||this.g.oa()||$s(this.g)))){this.J||Ye!=4||c==7||(c==8||0>=Us?Kn(3):Kn(2)),Xn(this);var u=this.g.Z();this.X=u;t:if(Ar(this)){var f=$s(this.g);i="";var b=f.length,V=De(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ot(this),mn(this);var F="";break t}this.h.i=new l.TextDecoder}for(c=0;c<b;c++)this.h.h=!0,i+=this.h.i.decode(f[c],{stream:!(V&&c==b-1)});f.length=0,this.h.g+=i,this.C=0,F=this.h.g}else F=this.g.oa();if(this.o=u==200,jo(this.i,this.u,this.A,this.l,this.R,Ye,u),this.o){if(this.T&&!this.K){t:{if(this.g){var ve,He=this.g;if((ve=He.g?He.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!M(ve)){var he=ve;break t}}he=null}if(u=he)Zt(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Zn(this,u);else{this.o=!1,this.s=3,ke(12),Ot(this),mn(this);break e}}if(this.P){u=!0;let Ct;for(;!this.J&&this.C<F.length;)if(Ct=wr(this,F),Ct==Jn){Ye==4&&(this.s=4,ke(14),u=!1),Zt(this.i,this.l,null,"[Incomplete Response]");break}else if(Ct==Tr){this.s=4,ke(15),Zt(this.i,this.l,F,"[Invalid Chunk]"),u=!1;break}else Zt(this.i,this.l,Ct,null),Zn(this,Ct);if(Ar(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ye!=4||F.length!=0||this.h.h||(this.s=1,ke(16),u=!1),this.o=this.o&&u,!u)Zt(this.i,this.l,F,"[Invalid Chunked Response]"),Ot(this),mn(this);else if(0<F.length&&!this.W){this.W=!0;var Qe=this.j;Qe.g==this&&Qe.ba&&!Qe.M&&(Qe.j.info("Great, no buffering proxy detected. Bytes received: "+F.length),Yo(Qe),Qe.M=!0,ke(11))}}else Zt(this.i,this.l,F,null),Zn(this,F);Ye==4&&Ot(this),this.o&&!this.J&&(Ye==4?Bc(this.j,this):(this.o=!1,Vs(this)))}else Vr(this.g),u==400&&0<F.indexOf("Unknown SID")?(this.s=3,ke(12)):(this.s=0,ke(13)),Ot(this),mn(this)}}}catch{}finally{}};function Ar(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function wr(i,c){var u=i.C,f=c.indexOf(`
`,u);return f==-1?Jn:(u=Number(c.substring(u,f)),isNaN(u)?Tr:(f+=1,f+u>c.length?Jn:(c=c.slice(f,f+u),i.C=f+u,c)))}Nt.prototype.cancel=function(){this.J=!0,Ot(this)};function Vs(i){i.S=Date.now()+i.I,Ns(i,i.I)}function Ns(i,c){if(i.B!=null)throw Error("WatchDog timer not null");i.B=Wn(_(i.ba,i),c)}function Xn(i){i.B&&(l.clearTimeout(i.B),i.B=null)}Nt.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(zo(this.i,this.A),this.L!=2&&(Kn(),ke(17)),Ot(this),this.s=2,mn(this)):Ns(this,this.S-i)};function mn(i){i.j.G==0||i.J||Bc(i.j,i)}function Ot(i){Xn(i);var c=i.M;c&&typeof c.ma=="function"&&c.ma(),i.M=null,Ss(i.U),i.g&&(c=i.g,i.g=null,c.abort(),c.ma())}function Zn(i,c){try{var u=i.j;if(u.G!=0&&(u.g==i||es(u.h,i))){if(!i.K&&es(u.h,i)&&u.G==3){try{var f=u.Da.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var b=f;if(b[0]==0){e:if(!u.u){if(u.g)if(u.g.F+3e3<i.F)$i(u),In(u);else break e;Nr(u),ke(18)}}else u.za=b[1],0<u.za-u.T&&37500>b[2]&&u.F&&u.v==0&&!u.C&&(u.C=Wn(_(u.Za,u),6e3));if(1>=Sr(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else is(u,11)}else if((i.K||u.g==i)&&$i(u),!M(c))for(b=u.Da.g.parse(c),c=0;c<b.length;c++){let he=b[c];if(u.T=he[0],he=he[1],u.G==2)if(he[0]=="c"){u.K=he[1],u.ia=he[2];const Qe=he[3];Qe!=null&&(u.la=Qe,u.j.info("VER="+u.la));const Ye=he[4];Ye!=null&&(u.Aa=Ye,u.j.info("SVER="+u.Aa));const Us=he[5];Us!=null&&typeof Us=="number"&&0<Us&&(f=1.5*Us,u.L=f,u.j.info("backChannelRequestTimeoutMs_="+f)),f=u;const Ct=i.g;if(Ct){const qi=Ct.g?Ct.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(qi){var V=f.h;V.g||qi.indexOf("spdy")==-1&&qi.indexOf("quic")==-1&&qi.indexOf("h2")==-1||(V.j=V.l,V.g=new Set,V.h&&(Os(V,V.h),V.h=null))}if(f.D){const Jo=Ct.g?Ct.g.getResponseHeader("X-HTTP-Session-Id"):null;Jo&&(f.ya=Jo,ge(f.I,f.D,Jo))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-i.F,u.j.info("Handshake RTT: "+u.R+"ms")),f=u;var F=i;if(f.qa=jc(f,f.J?f.ia:null,f.W),F.K){br(f.h,F);var ve=F,He=f.L;He&&(ve.I=He),ve.B&&(Xn(ve),Vs(ve)),f.g=F}else rs(f);0<u.i.length&&ns(u)}else he[0]!="stop"&&he[0]!="close"||is(u,7);else u.G==3&&(he[0]=="stop"||he[0]=="close"?he[0]=="stop"?is(u,7):ye(u):he[0]!="noop"&&u.l&&u.l.ta(he),u.v=0)}}Kn(4)}catch{}}var Go=class{constructor(i,c){this.g=i,this.map=c}};function Vi(i){this.l=i||10,l.PerformanceNavigationTiming?(i=l.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ni(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Sr(i){return i.h?1:i.g?i.g.size:0}function es(i,c){return i.h?i.h==c:i.g?i.g.has(c):!1}function Os(i,c){i.g?i.g.add(c):i.h=c}function br(i,c){i.h&&i.h==c?i.h=null:i.g&&i.g.has(c)&&i.g.delete(c)}Vi.prototype.cancel=function(){if(this.i=xs(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function xs(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let c=i.i;for(const u of i.g.values())c=c.concat(u.D);return c}return k(i.i)}function Rr(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(h(i)){for(var c=[],u=i.length,f=0;f<u;f++)c.push(i[f]);return c}c=[],u=0;for(f in i)c[u++]=i[f];return c}function Cr(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(h(i)||typeof i=="string"){var c=[];i=i.length;for(var u=0;u<i;u++)c.push(u);return c}c=[],u=0;for(const f in i)c[u++]=f;return c}}}function Dr(i,c){if(i.forEach&&typeof i.forEach=="function")i.forEach(c,void 0);else if(h(i)||typeof i=="string")Array.prototype.forEach.call(i,c,void 0);else for(var u=Cr(i),f=Rr(i),b=f.length,V=0;V<b;V++)c.call(void 0,f[V],u&&u[V],i)}var Oi=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function xi(i,c){if(i){i=i.split("&");for(var u=0;u<i.length;u++){var f=i[u].indexOf("="),b=null;if(0<=f){var V=i[u].substring(0,f);b=i[u].substring(f+1)}else V=i[u];c(V,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function en(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof en){this.h=i.h,ks(this,i.j),this.o=i.o,this.g=i.g,ts(this,i.s),this.l=i.l;var c=i.i,u=new yn;u.i=c.i,c.g&&(u.g=new Map(c.g),u.h=c.h),Ms(this,u),this.m=i.m}else i&&(c=String(i).match(Oi))?(this.h=!1,ks(this,c[1]||"",!0),this.o=gn(c[2]||""),this.g=gn(c[3]||"",!0),ts(this,c[4]),this.l=gn(c[5]||"",!0),Ms(this,c[6]||"",!0),this.m=gn(c[7]||"")):(this.h=!1,this.i=new yn(null,this.h))}en.prototype.toString=function(){var i=[],c=this.j;c&&i.push(_n(c,Ls,!0),":");var u=this.g;return(u||c=="file")&&(i.push("//"),(c=this.o)&&i.push(_n(c,Ls,!0),"@"),i.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&i.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&i.push("/"),i.push(_n(u,u.charAt(0)=="/"?Ko:Pr,!0))),(u=this.i.toString())&&i.push("?",u),(u=this.m)&&i.push("#",_n(u,Qo)),i.join("")};function Rt(i){return new en(i)}function ks(i,c,u){i.j=u?gn(c,!0):c,i.j&&(i.j=i.j.replace(/:$/,""))}function ts(i,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);i.s=c}else i.s=null}function Ms(i,c,u){c instanceof yn?(i.i=c,z(i.i,i.h)):(u||(c=_n(c,Wo)),i.i=new yn(c,i.h))}function ge(i,c,u){i.i.set(c,u)}function pn(i){return ge(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function gn(i,c){return i?c?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function _n(i,c,u){return typeof i=="string"?(i=encodeURI(i).replace(c,ki),u&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function ki(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Ls=/[#\/\?@]/g,Pr=/[#\?:]/g,Ko=/[#\?]/g,Wo=/[#\?@]/g,Qo=/#/g;function yn(i,c){this.h=this.g=null,this.i=i||null,this.j=!!c}function xt(i){i.g||(i.g=new Map,i.h=0,i.i&&xi(i.i,function(c,u){i.add(decodeURIComponent(c.replace(/\+/g," ")),u)}))}n=yn.prototype,n.add=function(i,c){xt(this),this.i=null,i=P(this,i);var u=this.g.get(i);return u||this.g.set(i,u=[]),u.push(c),this.h+=1,this};function Fs(i,c){xt(i),c=P(i,c),i.g.has(c)&&(i.i=null,i.h-=i.g.get(c).length,i.g.delete(c))}function Mi(i,c){return xt(i),c=P(i,c),i.g.has(c)}n.forEach=function(i,c){xt(this),this.g.forEach(function(u,f){u.forEach(function(b){i.call(c,b,f,this)},this)},this)},n.na=function(){xt(this);const i=Array.from(this.g.values()),c=Array.from(this.g.keys()),u=[];for(let f=0;f<c.length;f++){const b=i[f];for(let V=0;V<b.length;V++)u.push(c[f])}return u},n.V=function(i){xt(this);let c=[];if(typeof i=="string")Mi(this,i)&&(c=c.concat(this.g.get(P(this,i))));else{i=Array.from(this.g.values());for(let u=0;u<i.length;u++)c=c.concat(i[u])}return c},n.set=function(i,c){return xt(this),this.i=null,i=P(this,i),Mi(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[c]),this.h+=1,this},n.get=function(i,c){return i?(i=this.V(i),0<i.length?String(i[0]):c):c};function C(i,c,u){Fs(i,c),0<u.length&&(i.i=null,i.g.set(P(i,c),k(u)),i.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],c=Array.from(this.g.keys());for(var u=0;u<c.length;u++){var f=c[u];const V=encodeURIComponent(String(f)),F=this.V(f);for(f=0;f<F.length;f++){var b=V;F[f]!==""&&(b+="="+encodeURIComponent(String(F[f]))),i.push(b)}}return this.i=i.join("&")};function P(i,c){return c=String(c),i.j&&(c=c.toLowerCase()),c}function z(i,c){c&&!i.j&&(xt(i),i.i=null,i.g.forEach(function(u,f){var b=f.toLowerCase();f!=b&&(Fs(this,f),C(this,b,u))},i)),i.j=c}function H(i,c){const u=new Xt;if(l.Image){const f=new Image;f.onload=R(fe,u,"TestLoadImage: loaded",!0,c,f),f.onerror=R(fe,u,"TestLoadImage: error",!1,c,f),f.onabort=R(fe,u,"TestLoadImage: abort",!1,c,f),f.ontimeout=R(fe,u,"TestLoadImage: timeout",!1,c,f),l.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=i}else c(!1)}function se(i,c){const u=new Xt,f=new AbortController,b=setTimeout(()=>{f.abort(),fe(u,"TestPingServer: timeout",!1,c)},1e4);fetch(i,{signal:f.signal}).then(V=>{clearTimeout(b),V.ok?fe(u,"TestPingServer: ok",!0,c):fe(u,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(b),fe(u,"TestPingServer: error",!1,c)})}function fe(i,c,u,f,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),f(u)}catch{}}function we(){this.g=new _r}function Ae(i,c,u){const f=u||"";try{Dr(i,function(b,V){let F=b;d(b)&&(F=Hn(b)),c.push(f+V+"="+encodeURIComponent(F))})}catch(b){throw c.push(f+"type="+encodeURIComponent("_badmap")),b}}function tt(i){this.l=i.Ub||null,this.j=i.eb||!1}D(tt,Gn),tt.prototype.g=function(){return new ze(this.l,this.j)},tt.prototype.i=(function(i){return function(){return i}})({});function ze(i,c){Be.call(this),this.D=i,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(ze,Be),n=ze.prototype,n.open=function(i,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=c,this.readyState=1,vt(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(c.body=i),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,yt(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,vt(this)),this.g&&(this.readyState=3,vt(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;_t(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function _t(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var c=i.value?i.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!i.done}))&&(this.response=this.responseText+=c)}i.done?yt(this):vt(this),this.readyState==3&&_t(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,yt(this))},n.Qa=function(i){this.g&&(this.response=i,yt(this))},n.ga=function(){this.g&&yt(this)};function yt(i){i.readyState=4,i.l=null,i.j=null,i.v=null,vt(i)}n.setRequestHeader=function(i,c){this.u.append(i,c)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],c=this.h.entries();for(var u=c.next();!u.done;)u=u.value,i.push(u[0]+": "+u[1]),u=c.next();return i.join(`\r
`)};function vt(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(ze.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function kt(i){let c="";return Q(i,function(u,f){c+=f,c+=":",c+=u,c+=`\r
`}),c}function Mt(i,c,u){e:{for(f in u){var f=!1;break e}f=!0}f||(u=kt(u),typeof i=="string"?u!=null&&encodeURIComponent(String(u)):ge(i,c,u))}function _e(i){Be.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(_e,Be);var vn=/^https?$/i,En=["POST","PUT"];n=_e.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,c,u,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);c=c?c.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Qn.g(),this.v=this.o?yr(this.o):yr(Qn),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(c,String(i),!0),this.B=!1}catch(V){Lt(this,V);return}if(i=u||"",u=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var b in f)u.set(b,f[b]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const V of f.keys())u.set(V,f.get(V));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(u.keys()).find(V=>V.toLowerCase()=="content-type"),b=l.FormData&&i instanceof l.FormData,!(0<=Array.prototype.indexOf.call(En,c,void 0))||f||b||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[V,F]of u)this.g.setRequestHeader(V,F);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{tn(this),this.u=!0,this.g.send(i),this.u=!1}catch(V){Lt(this,V)}};function Lt(i,c){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=c,i.m=5,dt(i),Ft(i)}function dt(i){i.A||(i.A=!0,qe(i,"complete"),qe(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,qe(this,"complete"),qe(this,"abort"),Ft(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ft(this,!0)),_e.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Et(this):this.bb())},n.bb=function(){Et(this)};function Et(i){if(i.h&&typeof a<"u"&&(!i.v[1]||De(i)!=4||i.Z()!=2)){if(i.u&&De(i)==4)As(i.Ea,0,i);else if(qe(i,"readystatechange"),De(i)==4){i.h=!1;try{const F=i.Z();e:switch(F){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var u;if(!(u=c)){var f;if(f=F===0){var b=String(i.D).match(Oi)[1]||null;!b&&l.self&&l.self.location&&(b=l.self.location.protocol.slice(0,-1)),f=!vn.test(b?b.toLowerCase():"")}u=f}if(u)qe(i,"complete"),qe(i,"success");else{i.m=6;try{var V=2<De(i)?i.g.statusText:""}catch{V=""}i.l=V+" ["+i.Z()+"]",dt(i)}}finally{Ft(i)}}}}function Ft(i,c){if(i.g){tn(i);const u=i.g,f=i.v[0]?()=>{}:null;i.g=null,i.v=null,c||qe(i,"ready");try{u.onreadystatechange=f}catch{}}}function tn(i){i.I&&(l.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function De(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<De(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var c=this.g.responseText;return i&&c.indexOf(i)==0&&(c=c.substring(i.length)),gr(c)}};function $s(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Vr(i){const c={};i=(i.g&&2<=De(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<i.length;f++){if(M(i[f]))continue;var u=E(i[f]);const b=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const V=c[b]||[];c[b]=V,V.push(u)}T(c,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function nn(i,c,u){return u&&u.internalChannelParams&&u.internalChannelParams[i]||c}function ce(i){this.Aa=0,this.i=[],this.j=new Xt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=nn("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=nn("baseRetryDelayMs",5e3,i),this.cb=nn("retryDelaySeedMs",1e4,i),this.Wa=nn("forwardChannelMaxRetries",2,i),this.wa=nn("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new Vi(i&&i.concurrentRequestLimit),this.Da=new we,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=ce.prototype,n.la=8,n.G=1,n.connect=function(i,c,u,f){ke(0),this.W=i,this.H=c||{},u&&f!==void 0&&(this.H.OSID=u,this.H.OAID=f),this.F=this.X,this.I=jc(this,null,this.W),ns(this)};function ye(i){if(sn(i),i.G==3){var c=i.U++,u=Rt(i.I);if(ge(u,"SID",i.K),ge(u,"RID",c),ge(u,"TYPE","terminate"),ss(i,u),c=new Nt(i,i.j,c),c.L=2,c.v=pn(Rt(u)),u=!1,l.navigator&&l.navigator.sendBeacon)try{u=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!u&&l.Image&&(new Image().src=c.v,u=!0),u||(c.g=zc(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Vs(c)}Uc(i)}function In(i){i.g&&(Yo(i),i.g.cancel(),i.g=null)}function sn(i){In(i),i.u&&(l.clearTimeout(i.u),i.u=null),$i(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&l.clearTimeout(i.s),i.s=null)}function ns(i){if(!Ni(i.h)&&!i.s){i.s=!0;var c=i.Ga;je||Un(),gt||(je(),gt=!0),et.add(c,i),i.B=0}}function Li(i,c){return Sr(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=c.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=Wn(_(i.Ga,i,c),qc(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const b=new Nt(this,this.j,i);let V=this.o;if(this.S&&(V?(V=p(V),I(V,this.S)):V=this.S),this.m!==null||this.O||(b.H=V,V=null),this.P)e:{for(var c=0,u=0;u<this.i.length;u++){t:{var f=this.i[u];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,4096<c){c=u;break e}if(c===4096||u===this.i.length-1){c=u+1;break e}}c=1e3}else c=1e3;c=Bs(this,b,c),u=Rt(this.I),ge(u,"RID",i),ge(u,"CVER",22),this.D&&ge(u,"X-HTTP-Session-Id",this.D),ss(this,u),V&&(this.O?c="headers="+encodeURIComponent(String(kt(V)))+"&"+c:this.m&&Mt(u,this.m,V)),Os(this.h,b),this.Ua&&ge(u,"TYPE","init"),this.P?(ge(u,"$req",c),ge(u,"SID","null"),b.T=!0,Ds(b,u,null)):Ds(b,u,c),this.G=2}}else this.G==3&&(i?Fi(this,i):this.i.length==0||Ni(this.h)||Fi(this))};function Fi(i,c){var u;c?u=c.l:u=i.U++;const f=Rt(i.I);ge(f,"SID",i.K),ge(f,"RID",u),ge(f,"AID",i.T),ss(i,f),i.m&&i.o&&Mt(f,i.m,i.o),u=new Nt(i,i.j,u,i.B+1),i.m===null&&(u.H=i.o),c&&(i.i=c.D.concat(i.i)),c=Bs(i,u,1e3),u.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),Os(i.h,u),Ds(u,f,c)}function ss(i,c){i.H&&Q(i.H,function(u,f){ge(c,f,u)}),i.l&&Dr({},function(u,f){ge(c,f,u)})}function Bs(i,c,u){u=Math.min(i.i.length,u);var f=i.l?_(i.l.Na,i.l,i):null;e:{var b=i.i;let V=-1;for(;;){const F=["count="+u];V==-1?0<u?(V=b[0].g,F.push("ofs="+V)):V=0:F.push("ofs="+V);let ve=!0;for(let He=0;He<u;He++){let he=b[He].g;const Qe=b[He].map;if(he-=V,0>he)V=Math.max(0,b[He].g-100),ve=!1;else try{Ae(Qe,F,"req"+he+"_")}catch{f&&f(Qe)}}if(ve){f=F.join("&");break e}}}return i=i.i.splice(0,u),c.D=i,f}function rs(i){if(!i.g&&!i.u){i.Y=1;var c=i.Fa;je||Un(),gt||(je(),gt=!0),et.add(c,i),i.v=0}}function Nr(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=Wn(_(i.Fa,i),qc(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,$c(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=Wn(_(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ke(10),In(this),$c(this))};function Yo(i){i.A!=null&&(l.clearTimeout(i.A),i.A=null)}function $c(i){i.g=new Nt(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var c=Rt(i.qa);ge(c,"RID","rpc"),ge(c,"SID",i.K),ge(c,"AID",i.T),ge(c,"CI",i.F?"0":"1"),!i.F&&i.ja&&ge(c,"TO",i.ja),ge(c,"TYPE","xmlhttp"),ss(i,c),i.m&&i.o&&Mt(c,i.m,i.o),i.L&&(i.g.I=i.L);var u=i.g;i=i.ia,u.L=1,u.v=pn(Rt(c)),u.m=null,u.P=!0,Ps(u,i)}n.Za=function(){this.C!=null&&(this.C=null,In(this),Nr(this),ke(19))};function $i(i){i.C!=null&&(l.clearTimeout(i.C),i.C=null)}function Bc(i,c){var u=null;if(i.g==c){$i(i),Yo(i),i.g=null;var f=2}else if(es(i.h,c))u=c.D,br(i.h,c),f=1;else return;if(i.G!=0){if(c.o)if(f==1){u=c.m?c.m.length:0,c=Date.now()-c.F;var b=i.B;f=bs(),qe(f,new Di(f,u)),ns(i)}else rs(i);else if(b=c.s,b==3||b==0&&0<c.X||!(f==1&&Li(i,c)||f==2&&Nr(i)))switch(u&&0<u.length&&(c=i.h,c.i=c.i.concat(u)),b){case 1:is(i,5);break;case 4:is(i,10);break;case 3:is(i,6);break;default:is(i,2)}}}function qc(i,c){let u=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(u*=2),u*c}function is(i,c){if(i.j.info("Error code "+c),c==2){var u=_(i.fb,i),f=i.Xa;const b=!f;f=new en(f||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||ks(f,"https"),pn(f),b?H(f.toString(),u):se(f.toString(),u)}else ke(2);i.G=0,i.l&&i.l.sa(c),Uc(i),sn(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),ke(2)):(this.j.info("Failed to ping google.com"),ke(1))};function Uc(i){if(i.G=0,i.ka=[],i.l){const c=xs(i.h);(c.length!=0||i.i.length!=0)&&(A(i.ka,c),A(i.ka,i.i),i.h.i.length=0,k(i.i),i.i.length=0),i.l.ra()}}function jc(i,c,u){var f=u instanceof en?Rt(u):new en(u);if(f.g!="")c&&(f.g=c+"."+f.g),ts(f,f.s);else{var b=l.location;f=b.protocol,c=c?c+"."+b.hostname:b.hostname,b=+b.port;var V=new en(null);f&&ks(V,f),c&&(V.g=c),b&&ts(V,b),u&&(V.l=u),f=V}return u=i.D,c=i.ya,u&&c&&ge(f,u,c),ge(f,"VER",i.la),ss(i,f),f}function zc(i,c,u){if(c&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=i.Ca&&!i.pa?new _e(new tt({eb:u})):new _e(i.pa),c.Ha(i.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Hc(){}n=Hc.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Bi(){}Bi.prototype.g=function(i,c){return new ft(i,c)};function ft(i,c){Be.call(this),this.g=new ce(c),this.l=i,this.h=c&&c.messageUrlParams||null,i=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(i?i["X-WebChannel-Content-Type"]=c.messageContentType:i={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(i?i["X-WebChannel-Client-Profile"]=c.va:i={"X-WebChannel-Client-Profile":c.va}),this.g.S=i,(i=c&&c.Sb)&&!M(i)&&(this.g.m=i),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!M(c)&&(this.g.D=c,i=this.h,i!==null&&c in i&&(i=this.h,c in i&&delete i[c])),this.j=new qs(this)}D(ft,Be),ft.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ft.prototype.close=function(){ye(this.g)},ft.prototype.o=function(i){var c=this.g;if(typeof i=="string"){var u={};u.__data__=i,i=u}else this.u&&(u={},u.__data__=Hn(i),i=u);c.i.push(new Go(c.Ya++,i)),c.G==3&&ns(c)},ft.prototype.N=function(){this.g.l=null,delete this.j,ye(this.g),delete this.g,ft.aa.N.call(this)};function Gc(i){Er.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var c=i.__sm__;if(c){e:{for(const u in c){i=u;break e}i=void 0}(this.i=i)&&(i=this.i,c=c!==null&&i in c?c[i]:void 0),this.data=c}else this.data=i}D(Gc,Er);function Kc(){Ir.call(this),this.status=1}D(Kc,Ir);function qs(i){this.g=i}D(qs,Hc),qs.prototype.ua=function(){qe(this.g,"a")},qs.prototype.ta=function(i){qe(this.g,new Gc(i))},qs.prototype.sa=function(i){qe(this.g,new Kc)},qs.prototype.ra=function(){qe(this.g,"b")},Bi.prototype.createWebChannel=Bi.prototype.g,ft.prototype.send=ft.prototype.o,ft.prototype.open=ft.prototype.m,ft.prototype.close=ft.prototype.close,oh=function(){return new Bi},ih=function(){return bs()},rh=bt,Ta={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},fn.NO_ERROR=0,fn.TIMEOUT=8,fn.HTTP_ERROR=6,Ji=fn,Cs.COMPLETE="complete",sh=Cs,vr.EventType=Jt,Jt.OPEN="a",Jt.CLOSE="b",Jt.ERROR="c",Jt.MESSAGE="d",Be.prototype.listen=Be.prototype.K,qr=vr,_e.prototype.listenOnce=_e.prototype.L,_e.prototype.getLastError=_e.prototype.Ka,_e.prototype.getLastErrorCode=_e.prototype.Ba,_e.prototype.getStatus=_e.prototype.Z,_e.prototype.getResponseJson=_e.prototype.Oa,_e.prototype.getResponseText=_e.prototype.oa,_e.prototype.send=_e.prototype.ea,_e.prototype.setWithCredentials=_e.prototype.Ha,nh=_e}).apply(typeof ji<"u"?ji:typeof self<"u"?self:typeof window<"u"?window:{});const yl="@firebase/firestore",vl="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Xe.UNAUTHENTICATED=new Xe(null),Xe.GOOGLE_CREDENTIALS=new Xe("google-credentials-uid"),Xe.FIRST_PARTY=new Xe("first-party-uid"),Xe.MOCK_USER=new Xe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sr="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fs=new za("@firebase/firestore");function Ks(){return fs.logLevel}function j(n,...e){if(fs.logLevel<=ae.DEBUG){const t=e.map(Ka);fs.debug(`Firestore (${sr}): ${n}`,...t)}}function ln(n,...e){if(fs.logLevel<=ae.ERROR){const t=e.map(Ka);fs.error(`Firestore (${sr}): ${n}`,...t)}}function Vn(n,...e){if(fs.logLevel<=ae.WARN){const t=e.map(Ka);fs.warn(`Firestore (${sr}): ${n}`,...t)}}function Ka(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(n,e,t){let s="Unexpected state";typeof e=="string"?s=e:t=e,ah(n,s,t)}function ah(n,e,t){let s=`FIRESTORE (${sr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{s+=" CONTEXT: "+JSON.stringify(t)}catch{s+=" CONTEXT: "+t}throw ln(s),new Error(s)}function pe(n,e,t,s){let r="Unexpected state";typeof t=="string"?r=t:s=t,n||ah(e,r,s)}function Z(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class q extends Fn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ch{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class xp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Xe.UNAUTHENTICATED)))}shutdown(){}}class kp{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class Mp{constructor(e){this.t=e,this.currentUser=Xe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){pe(this.o===void 0,42304);let s=this.i;const r=h=>this.i!==s?(s=this.i,t(h)):Promise.resolve();let o=new on;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new on,e.enqueueRetryable((()=>r(this.currentUser)))};const a=()=>{const h=o;e.enqueueRetryable((async()=>{await h.promise,await r(this.currentUser)}))},l=h=>{j("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((h=>l(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?l(h):(j("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new on)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((s=>this.i!==e?(j("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(pe(typeof s.accessToken=="string",31837,{l:s}),new ch(s.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return pe(e===null||typeof e=="string",2055,{h:e}),new Xe(e)}}class Lp{constructor(e,t,s){this.P=e,this.T=t,this.I=s,this.type="FirstParty",this.user=Xe.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Fp{constructor(e,t,s){this.P=e,this.T=t,this.I=s}getToken(){return Promise.resolve(new Lp(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Xe.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class El{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class $p{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,vp(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){pe(this.o===void 0,3512);const s=o=>{o.error!=null&&j("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,j("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable((()=>s(o)))};const r=o=>{j("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>r(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?r(o):j("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new El(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(pe(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new El(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bp(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let s=0;s<n;s++)t[s]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lh(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const r=Bp(40);for(let o=0;o<r.length;++o)s.length<20&&r[o]<t&&(s+=e.charAt(r[o]%62))}return s}}function ee(n,e){return n<e?-1:n>e?1:0}function Aa(n,e){let t=0;for(;t<n.length&&t<e.length;){const s=n.codePointAt(t),r=e.codePointAt(t);if(s!==r){if(s<128&&r<128)return ee(s,r);{const o=lh(),a=qp(o.encode(Il(n,t)),o.encode(Il(e,t)));return a!==0?a:ee(s,r)}}t+=s>65535?2:1}return ee(n.length,e.length)}function Il(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function qp(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return ee(n[t],e[t]);return ee(n.length,e.length)}function Xs(n,e,t){return n.length===e.length&&n.every(((s,r)=>t(s,e[r])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tl="__name__";class Bt{constructor(e,t,s){t===void 0?t=0:t>e.length&&Y(637,{offset:t,range:e.length}),s===void 0?s=e.length-t:s>e.length-t&&Y(1746,{length:s,range:e.length-t}),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return Bt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Bt?e.forEach((s=>{t.push(s)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let r=0;r<s;r++){const o=Bt.compareSegments(e.get(r),t.get(r));if(o!==0)return o}return ee(e.length,t.length)}static compareSegments(e,t){const s=Bt.isNumericId(e),r=Bt.isNumericId(t);return s&&!r?-1:!s&&r?1:s&&r?Bt.extractNumericId(e).compare(Bt.extractNumericId(t)):Aa(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Cn.fromString(e.substring(4,e.length-2))}}class Ee extends Bt{construct(e,t,s){return new Ee(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new q(O.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter((r=>r.length>0)))}return new Ee(t)}static emptyPath(){return new Ee([])}}const Up=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ke extends Bt{construct(e,t,s){return new Ke(e,t,s)}static isValidIdentifier(e){return Up.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ke.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Tl}static keyField(){return new Ke([Tl])}static fromServerFormat(e){const t=[];let s="",r=0;const o=()=>{if(s.length===0)throw new q(O.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""};let a=!1;for(;r<e.length;){const l=e[r];if(l==="\\"){if(r+1===e.length)throw new q(O.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[r+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new q(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=h,r+=2}else l==="`"?(a=!a,r++):l!=="."||a?(s+=l,r++):(o(),r++)}if(o(),a)throw new q(O.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ke(t)}static emptyPath(){return new Ke([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e){this.path=e}static fromPath(e){return new W(Ee.fromString(e))}static fromName(e){return new W(Ee.fromString(e).popFirst(5))}static empty(){return new W(Ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ee.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new W(new Ee(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uh(n,e,t){if(!t)throw new q(O.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function jp(n,e,t,s){if(e===!0&&s===!0)throw new q(O.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Al(n){if(!W.isDocumentKey(n))throw new q(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function wl(n){if(W.isDocumentKey(n))throw new q(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function hh(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Eo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(s){return s.constructor?s.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":Y(12329,{type:typeof n})}function Dt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new q(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Eo(n);throw new q(O.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(n,e){const t={typeString:n};return e&&(t.value=e),t}function fi(n,e){if(!hh(n))throw new q(O.INVALID_ARGUMENT,"JSON must be an object");let t;for(const s in e)if(e[s]){const r=e[s].typeString,o="value"in e[s]?{value:e[s].value}:void 0;if(!(s in n)){t=`JSON missing required field: '${s}'`;break}const a=n[s];if(r&&typeof a!==r){t=`JSON field '${s}' must be a ${r}.`;break}if(o!==void 0&&a!==o.value){t=`Expected '${s}' field to equal '${o.value}'`;break}}if(t)throw new q(O.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sl=-62135596800,bl=1e6;class Ie{static now(){return Ie.fromMillis(Date.now())}static fromDate(e){return Ie.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor((e-1e3*t)*bl);return new Ie(t,s)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new q(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new q(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Sl)throw new q(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new q(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/bl}_compareTo(e){return this.seconds===e.seconds?ee(this.nanoseconds,e.nanoseconds):ee(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ie._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(fi(e,Ie._jsonSchema))return new Ie(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Sl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ie._jsonSchemaVersion="firestore/timestamp/1.0",Ie._jsonSchema={type:Oe("string",Ie._jsonSchemaVersion),seconds:Oe("number"),nanoseconds:Oe("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{static fromTimestamp(e){return new X(e)}static min(){return new X(new Ie(0,0))}static max(){return new X(new Ie(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ii=-1;function zp(n,e){const t=n.toTimestamp().seconds,s=n.toTimestamp().nanoseconds+1,r=X.fromTimestamp(s===1e9?new Ie(t+1,0):new Ie(t,s));return new Nn(r,W.empty(),e)}function Hp(n){return new Nn(n.readTime,n.key,ii)}class Nn{constructor(e,t,s){this.readTime=e,this.documentKey=t,this.largestBatchId=s}static min(){return new Nn(X.min(),W.empty(),ii)}static max(){return new Nn(X.max(),W.empty(),ii)}}function Gp(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=W.comparator(n.documentKey,e.documentKey),t!==0?t:ee(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kp="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Wp{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rr(n){if(n.code!==O.FAILED_PRECONDITION||n.message!==Kp)throw n;j("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Y(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new x(((s,r)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(s,r)},this.catchCallback=o=>{this.wrapFailure(t,o).next(s,r)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof x?t:x.resolve(t)}catch(t){return x.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):x.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):x.reject(t)}static resolve(e){return new x(((t,s)=>{t(e)}))}static reject(e){return new x(((t,s)=>{s(e)}))}static waitFor(e){return new x(((t,s)=>{let r=0,o=0,a=!1;e.forEach((l=>{++r,l.next((()=>{++o,a&&o===r&&t()}),(h=>s(h)))})),a=!0,o===r&&t()}))}static or(e){let t=x.resolve(!1);for(const s of e)t=t.next((r=>r?x.resolve(r):s()));return t}static forEach(e,t){const s=[];return e.forEach(((r,o)=>{s.push(t.call(this,r,o))})),this.waitFor(s)}static mapArray(e,t){return new x(((s,r)=>{const o=e.length,a=new Array(o);let l=0;for(let h=0;h<o;h++){const d=h;t(e[d]).next((m=>{a[d]=m,++l,l===o&&s(a)}),(m=>r(m)))}}))}static doWhile(e,t){return new x(((s,r)=>{const o=()=>{e()===!0?t().next((()=>{o()}),r):s()};o()}))}}function Qp(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ir(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=s=>this._e(s),this.ae=s=>t.writeSequenceNumber(s))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}Io.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa=-1;function To(n){return n==null}function oo(n){return n===0&&1/n==-1/0}function Yp(n){return typeof n=="number"&&Number.isInteger(n)&&!oo(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh="";function Jp(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Rl(e)),e=Xp(n.get(t),e);return Rl(e)}function Xp(n,e){let t=e;const s=n.length;for(let r=0;r<s;r++){const o=n.charAt(r);switch(o){case"\0":t+="";break;case dh:t+="";break;default:t+=o}}return t}function Rl(n){return n+dh+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function $n(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function fh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e,t){this.comparator=e,this.root=t||Ge.EMPTY}insert(e,t){return new Te(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ge.BLACK,null,null))}remove(e){return new Te(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ge.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const s=this.comparator(e,t.key);if(s===0)return t.value;s<0?t=t.left:s>0&&(t=t.right)}return null}indexOf(e){let t=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(e,s.key);if(r===0)return t+s.left.size;r<0?s=s.left:(t+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,s)=>(e(t,s),!1)))}toString(){const e=[];return this.inorderTraversal(((t,s)=>(e.push(`${t}:${s}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new zi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new zi(this.root,e,this.comparator,!1)}getReverseIterator(){return new zi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new zi(this.root,e,this.comparator,!0)}}class zi{constructor(e,t,s,r){this.isReverse=r,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?s(e.key,t):1,t&&r&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ge{constructor(e,t,s,r,o){this.key=e,this.value=t,this.color=s??Ge.RED,this.left=r??Ge.EMPTY,this.right=o??Ge.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,s,r,o){return new Ge(e??this.key,t??this.value,s??this.color,r??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let r=this;const o=s(e,r.key);return r=o<0?r.copy(null,null,null,r.left.insert(e,t,s),null):o===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Ge.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let s,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),t(e,r.key)===0){if(r.right.isEmpty())return Ge.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ge.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ge.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Y(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Y(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw Y(27949);return e+(this.isRed()?0:1)}}Ge.EMPTY=null,Ge.RED=!0,Ge.BLACK=!1;Ge.EMPTY=new class{constructor(){this.size=0}get key(){throw Y(57766)}get value(){throw Y(16141)}get color(){throw Y(16727)}get left(){throw Y(29726)}get right(){throw Y(36894)}copy(e,t,s,r,o){return this}insert(e,t,s){return new Ge(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.comparator=e,this.data=new Te(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,s)=>(e(t),!1)))}forEachInRange(e,t){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let s;for(s=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Dl(this.data.getIterator())}getIteratorFrom(e){return new Dl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((s=>{t=t.add(s)})),t}isEqual(e){if(!(e instanceof Le)||this.size!==e.size)return!1;const t=this.data.getIterator(),s=e.data.getIterator();for(;t.hasNext();){const r=t.getNext().key,o=s.getNext().key;if(this.comparator(r,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Le(this.comparator);return t.data=e,t}}class Dl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e){this.fields=e,e.sort(Ke.comparator)}static empty(){return new mt([])}unionWith(e){let t=new Le(Ke.comparator);for(const s of this.fields)t=t.add(s);for(const s of e)t=t.add(s);return new mt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Xs(this.fields,e.fields,((t,s)=>t.isEqual(s)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(r){try{return atob(r)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new mh("Invalid base64 string: "+o):o}})(e);return new We(t)}static fromUint8Array(e){const t=(function(r){let o="";for(let a=0;a<r.length;++a)o+=String.fromCharCode(r[a]);return o})(e);return new We(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const s=new Uint8Array(t.length);for(let r=0;r<t.length;r++)s[r]=t.charCodeAt(r);return s})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ee(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}We.EMPTY_BYTE_STRING=new We("");const Zp=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function On(n){if(pe(!!n,39018),typeof n=="string"){let e=0;const t=Zp.exec(n);if(pe(!!t,46558,{timestamp:n}),t[1]){let r=t[1];r=(r+"000000000").substr(0,9),e=Number(r)}const s=new Date(n);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:be(n.seconds),nanos:be(n.nanos)}}function be(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function xn(n){return typeof n=="string"?We.fromBase64String(n):We.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ph="server_timestamp",gh="__type__",_h="__previous_value__",yh="__local_write_time__";function Ya(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[gh])===null||t===void 0?void 0:t.stringValue)===ph}function Ao(n){const e=n.mapValue.fields[_h];return Ya(e)?Ao(e):e}function oi(n){const e=On(n.mapValue.fields[yh].timestampValue);return new Ie(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg{constructor(e,t,s,r,o,a,l,h,d,m){this.databaseId=e,this.appId=t,this.persistenceKey=s,this.host=r,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=d,this.isUsingEmulator=m}}const ao="(default)";class ai{constructor(e,t){this.projectId=e,this.database=t||ao}static empty(){return new ai("","")}get isDefaultDatabase(){return this.database===ao}isEqual(e){return e instanceof ai&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vh="__type__",tg="__max__",Hi={mapValue:{}},Eh="__vector__",co="value";function kn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ya(n)?4:sg(n)?9007199254740991:ng(n)?10:11:Y(28295,{value:n})}function Wt(n,e){if(n===e)return!0;const t=kn(n);if(t!==kn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return oi(n).isEqual(oi(e));case 3:return(function(r,o){if(typeof r.timestampValue=="string"&&typeof o.timestampValue=="string"&&r.timestampValue.length===o.timestampValue.length)return r.timestampValue===o.timestampValue;const a=On(r.timestampValue),l=On(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(r,o){return xn(r.bytesValue).isEqual(xn(o.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(r,o){return be(r.geoPointValue.latitude)===be(o.geoPointValue.latitude)&&be(r.geoPointValue.longitude)===be(o.geoPointValue.longitude)})(n,e);case 2:return(function(r,o){if("integerValue"in r&&"integerValue"in o)return be(r.integerValue)===be(o.integerValue);if("doubleValue"in r&&"doubleValue"in o){const a=be(r.doubleValue),l=be(o.doubleValue);return a===l?oo(a)===oo(l):isNaN(a)&&isNaN(l)}return!1})(n,e);case 9:return Xs(n.arrayValue.values||[],e.arrayValue.values||[],Wt);case 10:case 11:return(function(r,o){const a=r.mapValue.fields||{},l=o.mapValue.fields||{};if(Cl(a)!==Cl(l))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!Wt(a[h],l[h])))return!1;return!0})(n,e);default:return Y(52216,{left:n})}}function ci(n,e){return(n.values||[]).find((t=>Wt(t,e)))!==void 0}function Zs(n,e){if(n===e)return 0;const t=kn(n),s=kn(e);if(t!==s)return ee(t,s);switch(t){case 0:case 9007199254740991:return 0;case 1:return ee(n.booleanValue,e.booleanValue);case 2:return(function(o,a){const l=be(o.integerValue||o.doubleValue),h=be(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1})(n,e);case 3:return Pl(n.timestampValue,e.timestampValue);case 4:return Pl(oi(n),oi(e));case 5:return Aa(n.stringValue,e.stringValue);case 6:return(function(o,a){const l=xn(o),h=xn(a);return l.compareTo(h)})(n.bytesValue,e.bytesValue);case 7:return(function(o,a){const l=o.split("/"),h=a.split("/");for(let d=0;d<l.length&&d<h.length;d++){const m=ee(l[d],h[d]);if(m!==0)return m}return ee(l.length,h.length)})(n.referenceValue,e.referenceValue);case 8:return(function(o,a){const l=ee(be(o.latitude),be(a.latitude));return l!==0?l:ee(be(o.longitude),be(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Vl(n.arrayValue,e.arrayValue);case 10:return(function(o,a){var l,h,d,m;const g=o.fields||{},_=a.fields||{},R=(l=g[co])===null||l===void 0?void 0:l.arrayValue,D=(h=_[co])===null||h===void 0?void 0:h.arrayValue,k=ee(((d=R==null?void 0:R.values)===null||d===void 0?void 0:d.length)||0,((m=D==null?void 0:D.values)===null||m===void 0?void 0:m.length)||0);return k!==0?k:Vl(R,D)})(n.mapValue,e.mapValue);case 11:return(function(o,a){if(o===Hi.mapValue&&a===Hi.mapValue)return 0;if(o===Hi.mapValue)return 1;if(a===Hi.mapValue)return-1;const l=o.fields||{},h=Object.keys(l),d=a.fields||{},m=Object.keys(d);h.sort(),m.sort();for(let g=0;g<h.length&&g<m.length;++g){const _=Aa(h[g],m[g]);if(_!==0)return _;const R=Zs(l[h[g]],d[m[g]]);if(R!==0)return R}return ee(h.length,m.length)})(n.mapValue,e.mapValue);default:throw Y(23264,{le:t})}}function Pl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ee(n,e);const t=On(n),s=On(e),r=ee(t.seconds,s.seconds);return r!==0?r:ee(t.nanos,s.nanos)}function Vl(n,e){const t=n.values||[],s=e.values||[];for(let r=0;r<t.length&&r<s.length;++r){const o=Zs(t[r],s[r]);if(o)return o}return ee(t.length,s.length)}function er(n){return wa(n)}function wa(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const s=On(t);return`time(${s.seconds},${s.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return xn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return W.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let s="[",r=!0;for(const o of t.values||[])r?r=!1:s+=",",s+=wa(o);return s+"]"})(n.arrayValue):"mapValue"in n?(function(t){const s=Object.keys(t.fields||{}).sort();let r="{",o=!0;for(const a of s)o?o=!1:r+=",",r+=`${a}:${wa(t.fields[a])}`;return r+"}"})(n.mapValue):Y(61005,{value:n})}function Xi(n){switch(kn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ao(n);return e?16+Xi(e):16;case 5:return 2*n.stringValue.length;case 6:return xn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(s){return(s.values||[]).reduce(((r,o)=>r+Xi(o)),0)})(n.arrayValue);case 10:case 11:return(function(s){let r=0;return $n(s.fields,((o,a)=>{r+=o.length+Xi(a)})),r})(n.mapValue);default:throw Y(13486,{value:n})}}function Nl(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Sa(n){return!!n&&"integerValue"in n}function Ja(n){return!!n&&"arrayValue"in n}function Ol(n){return!!n&&"nullValue"in n}function xl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Zi(n){return!!n&&"mapValue"in n}function ng(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[vh])===null||t===void 0?void 0:t.stringValue)===Eh}function Jr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return $n(n.mapValue.fields,((t,s)=>e.mapValue.fields[t]=Jr(s))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Jr(n.arrayValue.values[t]);return e}return Object.assign({},n)}function sg(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===tg}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this.value=e}static empty(){return new ut({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let s=0;s<e.length-1;++s)if(t=(t.mapValue.fields||{})[e.get(s)],!Zi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Jr(t)}setAll(e){let t=Ke.emptyPath(),s={},r=[];e.forEach(((a,l)=>{if(!t.isImmediateParentOf(l)){const h=this.getFieldsMap(t);this.applyChanges(h,s,r),s={},r=[],t=l.popLast()}a?s[l.lastSegment()]=Jr(a):r.push(l.lastSegment())}));const o=this.getFieldsMap(t);this.applyChanges(o,s,r)}delete(e){const t=this.field(e.popLast());Zi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Wt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let s=0;s<e.length;++s){let r=t.mapValue.fields[e.get(s)];Zi(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(s)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,s){$n(t,((r,o)=>e[r]=o));for(const r of s)delete e[r]}clone(){return new ut(Jr(this.value))}}function Ih(n){const e=[];return $n(n.fields,((t,s)=>{const r=new Ke([t]);if(Zi(s)){const o=Ih(s.mapValue).fields;if(o.length===0)e.push(r);else for(const a of o)e.push(r.child(a))}else e.push(r)})),new mt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e,t,s,r,o,a,l){this.key=e,this.documentType=t,this.version=s,this.readTime=r,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(e){return new Ze(e,0,X.min(),X.min(),X.min(),ut.empty(),0)}static newFoundDocument(e,t,s,r){return new Ze(e,1,t,X.min(),s,r,0)}static newNoDocument(e,t){return new Ze(e,2,t,X.min(),X.min(),ut.empty(),0)}static newUnknownDocument(e,t){return new Ze(e,3,t,X.min(),X.min(),ut.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(X.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ut.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ut.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=X.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ze&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ze(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo{constructor(e,t){this.position=e,this.inclusive=t}}function kl(n,e,t){let s=0;for(let r=0;r<n.position.length;r++){const o=e[r],a=n.position[r];if(o.field.isKeyField()?s=W.comparator(W.fromName(a.referenceValue),t.key):s=Zs(a,t.data.field(o.field)),o.dir==="desc"&&(s*=-1),s!==0)break}return s}function Ml(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Wt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(e,t="asc"){this.field=e,this.dir=t}}function rg(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{}class Ne extends Th{constructor(e,t,s){super(),this.field=e,this.op=t,this.value=s}static create(e,t,s){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,s):new og(e,t,s):t==="array-contains"?new lg(e,s):t==="in"?new ug(e,s):t==="not-in"?new hg(e,s):t==="array-contains-any"?new dg(e,s):new Ne(e,t,s)}static createKeyFieldInFilter(e,t,s){return t==="in"?new ag(e,s):new cg(e,s)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Zs(t,this.value)):t!==null&&kn(this.value)===kn(t)&&this.matchesComparison(Zs(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Y(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Pt extends Th{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new Pt(e,t)}matches(e){return Ah(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function Ah(n){return n.op==="and"}function wh(n){return ig(n)&&Ah(n)}function ig(n){for(const e of n.filters)if(e instanceof Pt)return!1;return!0}function ba(n){if(n instanceof Ne)return n.field.canonicalString()+n.op.toString()+er(n.value);if(wh(n))return n.filters.map((e=>ba(e))).join(",");{const e=n.filters.map((t=>ba(t))).join(",");return`${n.op}(${e})`}}function Sh(n,e){return n instanceof Ne?(function(s,r){return r instanceof Ne&&s.op===r.op&&s.field.isEqual(r.field)&&Wt(s.value,r.value)})(n,e):n instanceof Pt?(function(s,r){return r instanceof Pt&&s.op===r.op&&s.filters.length===r.filters.length?s.filters.reduce(((o,a,l)=>o&&Sh(a,r.filters[l])),!0):!1})(n,e):void Y(19439)}function bh(n){return n instanceof Ne?(function(t){return`${t.field.canonicalString()} ${t.op} ${er(t.value)}`})(n):n instanceof Pt?(function(t){return t.op.toString()+" {"+t.getFilters().map(bh).join(" ,")+"}"})(n):"Filter"}class og extends Ne{constructor(e,t,s){super(e,t,s),this.key=W.fromName(s.referenceValue)}matches(e){const t=W.comparator(e.key,this.key);return this.matchesComparison(t)}}class ag extends Ne{constructor(e,t){super(e,"in",t),this.keys=Rh("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class cg extends Ne{constructor(e,t){super(e,"not-in",t),this.keys=Rh("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Rh(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map((s=>W.fromName(s.referenceValue)))}class lg extends Ne{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ja(t)&&ci(t.arrayValue,this.value)}}class ug extends Ne{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ci(this.value.arrayValue,t)}}class hg extends Ne{constructor(e,t){super(e,"not-in",t)}matches(e){if(ci(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ci(this.value.arrayValue,t)}}class dg extends Ne{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ja(t)||!t.arrayValue.values)&&t.arrayValue.values.some((s=>ci(this.value.arrayValue,s)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{constructor(e,t=null,s=[],r=[],o=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=s,this.filters=r,this.limit=o,this.startAt=a,this.endAt=l,this.Pe=null}}function Ll(n,e=null,t=[],s=[],r=null,o=null,a=null){return new fg(n,e,t,s,r,o,a)}function Xa(n){const e=Z(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((s=>ba(s))).join(","),t+="|ob:",t+=e.orderBy.map((s=>(function(o){return o.field.canonicalString()+o.dir})(s))).join(","),To(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((s=>er(s))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((s=>er(s))).join(",")),e.Pe=t}return e.Pe}function Za(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!rg(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Sh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Ml(n.startAt,e.startAt)&&Ml(n.endAt,e.endAt)}function Ra(n){return W.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(e,t=null,s=[],r=[],o=null,a="F",l=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=r,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function mg(n,e,t,s,r,o,a,l){return new or(n,e,t,s,r,o,a,l)}function wo(n){return new or(n)}function Fl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Ch(n){return n.collectionGroup!==null}function Xr(n){const e=Z(n);if(e.Te===null){e.Te=[];const t=new Set;for(const o of e.explicitOrderBy)e.Te.push(o),t.add(o.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new Le(Ke.comparator);return a.filters.forEach((h=>{h.getFlattenedFilters().forEach((d=>{d.isInequality()&&(l=l.add(d.field))}))})),l})(e).forEach((o=>{t.has(o.canonicalString())||o.isKeyField()||e.Te.push(new li(o,s))})),t.has(Ke.keyField().canonicalString())||e.Te.push(new li(Ke.keyField(),s))}return e.Te}function zt(n){const e=Z(n);return e.Ie||(e.Ie=pg(e,Xr(n))),e.Ie}function pg(n,e){if(n.limitType==="F")return Ll(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((r=>{const o=r.dir==="desc"?"asc":"desc";return new li(r.field,o)}));const t=n.endAt?new lo(n.endAt.position,n.endAt.inclusive):null,s=n.startAt?new lo(n.startAt.position,n.startAt.inclusive):null;return Ll(n.path,n.collectionGroup,e,n.filters,n.limit,t,s)}}function Ca(n,e){const t=n.filters.concat([e]);return new or(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Da(n,e,t){return new or(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function So(n,e){return Za(zt(n),zt(e))&&n.limitType===e.limitType}function Dh(n){return`${Xa(zt(n))}|lt:${n.limitType}`}function Ws(n){return`Query(target=${(function(t){let s=t.path.canonicalString();return t.collectionGroup!==null&&(s+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(s+=`, filters: [${t.filters.map((r=>bh(r))).join(", ")}]`),To(t.limit)||(s+=", limit: "+t.limit),t.orderBy.length>0&&(s+=`, orderBy: [${t.orderBy.map((r=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(r))).join(", ")}]`),t.startAt&&(s+=", startAt: ",s+=t.startAt.inclusive?"b:":"a:",s+=t.startAt.position.map((r=>er(r))).join(",")),t.endAt&&(s+=", endAt: ",s+=t.endAt.inclusive?"a:":"b:",s+=t.endAt.position.map((r=>er(r))).join(",")),`Target(${s})`})(zt(n))}; limitType=${n.limitType})`}function bo(n,e){return e.isFoundDocument()&&(function(s,r){const o=r.key.path;return s.collectionGroup!==null?r.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(o):W.isDocumentKey(s.path)?s.path.isEqual(o):s.path.isImmediateParentOf(o)})(n,e)&&(function(s,r){for(const o of Xr(s))if(!o.field.isKeyField()&&r.data.field(o.field)===null)return!1;return!0})(n,e)&&(function(s,r){for(const o of s.filters)if(!o.matches(r))return!1;return!0})(n,e)&&(function(s,r){return!(s.startAt&&!(function(a,l,h){const d=kl(a,l,h);return a.inclusive?d<=0:d<0})(s.startAt,Xr(s),r)||s.endAt&&!(function(a,l,h){const d=kl(a,l,h);return a.inclusive?d>=0:d>0})(s.endAt,Xr(s),r))})(n,e)}function gg(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Ph(n){return(e,t)=>{let s=!1;for(const r of Xr(n)){const o=_g(r,e,t);if(o!==0)return o;s=s||r.field.isKeyField()}return 0}}function _g(n,e,t){const s=n.field.isKeyField()?W.comparator(e.key,t.key):(function(o,a,l){const h=a.data.field(o),d=l.data.field(o);return h!==null&&d!==null?Zs(h,d):Y(42886)})(n.field,e,t);switch(n.dir){case"asc":return s;case"desc":return-1*s;default:return Y(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s!==void 0){for(const[r,o]of s)if(this.equalsFn(r,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const s=this.mapKeyFn(e),r=this.inner[s];if(r===void 0)return this.inner[s]=[[e,t]],void this.innerSize++;for(let o=0;o<r.length;o++)if(this.equalsFn(r[o][0],e))return void(r[o]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return s.length===1?delete this.inner[t]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(e){$n(this.inner,((t,s)=>{for(const[r,o]of s)e(r,o)}))}isEmpty(){return fh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yg=new Te(W.comparator);function un(){return yg}const Vh=new Te(W.comparator);function Ur(...n){let e=Vh;for(const t of n)e=e.insert(t.key,t);return e}function Nh(n){let e=Vh;return n.forEach(((t,s)=>e=e.insert(t,s.overlayedDocument))),e}function ls(){return Zr()}function Oh(){return Zr()}function Zr(){return new ys((n=>n.toString()),((n,e)=>n.isEqual(e)))}const vg=new Te(W.comparator),Eg=new Le(W.comparator);function ne(...n){let e=Eg;for(const t of n)e=e.add(t);return e}const Ig=new Le(ee);function Tg(){return Ig}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ec(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:oo(e)?"-0":e}}function xh(n){return{integerValue:""+n}}function Ag(n,e){return Yp(e)?xh(e):ec(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(){this._=void 0}}function wg(n,e,t){return n instanceof ui?(function(r,o){const a={fields:{[gh]:{stringValue:ph},[yh]:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return o&&Ya(o)&&(o=Ao(o)),o&&(a.fields[_h]=o),{mapValue:a}})(t,e):n instanceof hi?Mh(n,e):n instanceof di?Lh(n,e):(function(r,o){const a=kh(r,o),l=$l(a)+$l(r.Ee);return Sa(a)&&Sa(r.Ee)?xh(l):ec(r.serializer,l)})(n,e)}function Sg(n,e,t){return n instanceof hi?Mh(n,e):n instanceof di?Lh(n,e):t}function kh(n,e){return n instanceof uo?(function(s){return Sa(s)||(function(o){return!!o&&"doubleValue"in o})(s)})(e)?e:{integerValue:0}:null}class ui extends Ro{}class hi extends Ro{constructor(e){super(),this.elements=e}}function Mh(n,e){const t=Fh(e);for(const s of n.elements)t.some((r=>Wt(r,s)))||t.push(s);return{arrayValue:{values:t}}}class di extends Ro{constructor(e){super(),this.elements=e}}function Lh(n,e){let t=Fh(e);for(const s of n.elements)t=t.filter((r=>!Wt(r,s)));return{arrayValue:{values:t}}}class uo extends Ro{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function $l(n){return be(n.integerValue||n.doubleValue)}function Fh(n){return Ja(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bg{constructor(e,t){this.field=e,this.transform=t}}function Rg(n,e){return n.field.isEqual(e.field)&&(function(s,r){return s instanceof hi&&r instanceof hi||s instanceof di&&r instanceof di?Xs(s.elements,r.elements,Wt):s instanceof uo&&r instanceof uo?Wt(s.Ee,r.Ee):s instanceof ui&&r instanceof ui})(n.transform,e.transform)}class Cg{constructor(e,t){this.version=e,this.transformResults=t}}class At{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new At}static exists(e){return new At(void 0,e)}static updateTime(e){return new At(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function eo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Co{}function $h(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new tc(n.key,At.none()):new mi(n.key,n.data,At.none());{const t=n.data,s=ut.empty();let r=new Le(Ke.comparator);for(let o of e.fields)if(!r.has(o)){let a=t.field(o);a===null&&o.length>1&&(o=o.popLast(),a=t.field(o)),a===null?s.delete(o):s.set(o,a),r=r.add(o)}return new Bn(n.key,s,new mt(r.toArray()),At.none())}}function Dg(n,e,t){n instanceof mi?(function(r,o,a){const l=r.value.clone(),h=ql(r.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(n,e,t):n instanceof Bn?(function(r,o,a){if(!eo(r.precondition,o))return void o.convertToUnknownDocument(a.version);const l=ql(r.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Bh(r)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()})(n,e,t):(function(r,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function ei(n,e,t,s){return n instanceof mi?(function(o,a,l,h){if(!eo(o.precondition,a))return l;const d=o.value.clone(),m=Ul(o.fieldTransforms,h,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(n,e,t,s):n instanceof Bn?(function(o,a,l,h){if(!eo(o.precondition,a))return l;const d=Ul(o.fieldTransforms,h,a),m=a.data;return m.setAll(Bh(o)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((g=>g.field)))})(n,e,t,s):(function(o,a,l){return eo(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l})(n,e,t)}function Pg(n,e){let t=null;for(const s of n.fieldTransforms){const r=e.data.field(s.field),o=kh(s.transform,r||null);o!=null&&(t===null&&(t=ut.empty()),t.set(s.field,o))}return t||null}function Bl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(s,r){return s===void 0&&r===void 0||!(!s||!r)&&Xs(s,r,((o,a)=>Rg(o,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class mi extends Co{constructor(e,t,s,r=[]){super(),this.key=e,this.value=t,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Bn extends Co{constructor(e,t,s,r,o=[]){super(),this.key=e,this.data=t,this.fieldMask=s,this.precondition=r,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Bh(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const s=n.data.field(t);e.set(t,s)}})),e}function ql(n,e,t){const s=new Map;pe(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let r=0;r<t.length;r++){const o=n[r],a=o.transform,l=e.data.field(o.field);s.set(o.field,Sg(a,l,t[r]))}return s}function Ul(n,e,t){const s=new Map;for(const r of n){const o=r.transform,a=t.data.field(r.field);s.set(r.field,wg(o,a,e))}return s}class tc extends Co{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Vg extends Co{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ng{constructor(e,t,s,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(e,t){const s=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const o=this.mutations[r];o.key.isEqual(e.key)&&Dg(o,e,s[r])}}applyToLocalView(e,t){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(t=ei(s,e,t,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(t=ei(s,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const s=Oh();return this.mutations.forEach((r=>{const o=e.get(r.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=t.has(r.key)?null:l;const h=$h(a,l);h!==null&&s.set(r.key,h),a.isValidDocument()||a.convertToNoDocument(X.min())})),s}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),ne())}isEqual(e){return this.batchId===e.batchId&&Xs(this.mutations,e.mutations,((t,s)=>Bl(t,s)))&&Xs(this.baseMutations,e.baseMutations,((t,s)=>Bl(t,s)))}}class nc{constructor(e,t,s,r){this.batch=e,this.commitVersion=t,this.mutationResults=s,this.docVersions=r}static from(e,t,s){pe(e.mutations.length===s.length,58842,{Ve:e.mutations.length,me:s.length});let r=(function(){return vg})();const o=e.mutations;for(let a=0;a<o.length;a++)r=r.insert(o[a].key,s[a].version);return new nc(e,t,s,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Og{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ve,ie;function kg(n){switch(n){case O.OK:return Y(64938);case O.CANCELLED:case O.UNKNOWN:case O.DEADLINE_EXCEEDED:case O.RESOURCE_EXHAUSTED:case O.INTERNAL:case O.UNAVAILABLE:case O.UNAUTHENTICATED:return!1;case O.INVALID_ARGUMENT:case O.NOT_FOUND:case O.ALREADY_EXISTS:case O.PERMISSION_DENIED:case O.FAILED_PRECONDITION:case O.ABORTED:case O.OUT_OF_RANGE:case O.UNIMPLEMENTED:case O.DATA_LOSS:return!0;default:return Y(15467,{code:n})}}function qh(n){if(n===void 0)return ln("GRPC error has no .code"),O.UNKNOWN;switch(n){case Ve.OK:return O.OK;case Ve.CANCELLED:return O.CANCELLED;case Ve.UNKNOWN:return O.UNKNOWN;case Ve.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case Ve.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case Ve.INTERNAL:return O.INTERNAL;case Ve.UNAVAILABLE:return O.UNAVAILABLE;case Ve.UNAUTHENTICATED:return O.UNAUTHENTICATED;case Ve.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case Ve.NOT_FOUND:return O.NOT_FOUND;case Ve.ALREADY_EXISTS:return O.ALREADY_EXISTS;case Ve.PERMISSION_DENIED:return O.PERMISSION_DENIED;case Ve.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case Ve.ABORTED:return O.ABORTED;case Ve.OUT_OF_RANGE:return O.OUT_OF_RANGE;case Ve.UNIMPLEMENTED:return O.UNIMPLEMENTED;case Ve.DATA_LOSS:return O.DATA_LOSS;default:return Y(39323,{code:n})}}(ie=Ve||(Ve={}))[ie.OK=0]="OK",ie[ie.CANCELLED=1]="CANCELLED",ie[ie.UNKNOWN=2]="UNKNOWN",ie[ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ie[ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ie[ie.NOT_FOUND=5]="NOT_FOUND",ie[ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",ie[ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",ie[ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",ie[ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ie[ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ie[ie.ABORTED=10]="ABORTED",ie[ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",ie[ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",ie[ie.INTERNAL=13]="INTERNAL",ie[ie.UNAVAILABLE=14]="UNAVAILABLE",ie[ie.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mg=new Cn([4294967295,4294967295],0);function jl(n){const e=lh().encode(n),t=new th;return t.update(e),new Uint8Array(t.digest())}function zl(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),o=e.getUint32(12,!0);return[new Cn([t,s],0),new Cn([r,o],0)]}class sc{constructor(e,t,s){if(this.bitmap=e,this.padding=t,this.hashCount=s,t<0||t>=8)throw new jr(`Invalid padding: ${t}`);if(s<0)throw new jr(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new jr(`Invalid hash count: ${s}`);if(e.length===0&&t!==0)throw new jr(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=Cn.fromNumber(this.fe)}pe(e,t,s){let r=e.add(t.multiply(Cn.fromNumber(s)));return r.compare(Mg)===1&&(r=new Cn([r.getBits(0),r.getBits(1)],0)),r.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=jl(e),[s,r]=zl(t);for(let o=0;o<this.hashCount;o++){const a=this.pe(s,r,o);if(!this.ye(a))return!1}return!0}static create(e,t,s){const r=e%8==0?0:8-e%8,o=new Uint8Array(Math.ceil(e/8)),a=new sc(o,r,t);return s.forEach((l=>a.insert(l))),a}insert(e){if(this.fe===0)return;const t=jl(e),[s,r]=zl(t);for(let o=0;o<this.hashCount;o++){const a=this.pe(s,r,o);this.we(a)}}we(e){const t=Math.floor(e/8),s=e%8;this.bitmap[t]|=1<<s}}class jr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{constructor(e,t,s,r,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,s){const r=new Map;return r.set(e,pi.createSynthesizedTargetChangeForCurrentChange(e,t,s)),new Do(X.min(),r,new Te(ee),un(),ne())}}class pi{constructor(e,t,s,r,o){this.resumeToken=e,this.current=t,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(e,t,s){return new pi(s,t,ne(),ne(),ne())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e,t,s,r){this.Se=e,this.removedTargetIds=t,this.key=s,this.be=r}}class Uh{constructor(e,t){this.targetId=e,this.De=t}}class jh{constructor(e,t,s=We.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=s,this.cause=r}}class Hl{constructor(){this.ve=0,this.Ce=Gl(),this.Fe=We.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=ne(),t=ne(),s=ne();return this.Ce.forEach(((r,o)=>{switch(o){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:s=s.add(r);break;default:Y(38017,{changeType:o})}})),new pi(this.Fe,this.Me,e,t,s)}ke(){this.xe=!1,this.Ce=Gl()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,pe(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class Lg{constructor(e){this.We=e,this.Ge=new Map,this.ze=un(),this.je=Gi(),this.Je=Gi(),this.He=new Te(ee)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,(t=>{const s=this.tt(t);switch(e.state){case 0:this.nt(t)&&s.Be(e.resumeToken);break;case 1:s.Ue(),s.Oe||s.ke(),s.Be(e.resumeToken);break;case 2:s.Ue(),s.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(s.Ke(),s.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),s.Be(e.resumeToken));break;default:Y(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach(((s,r)=>{this.nt(r)&&t(r)}))}it(e){const t=e.targetId,s=e.De.count,r=this.st(t);if(r){const o=r.target;if(Ra(o))if(s===0){const a=new W(o.path);this.Xe(t,a,Ze.newNoDocument(a,X.min()))}else pe(s===1,20013,{expectedCount:s});else{const a=this.ot(t);if(a!==s){const l=this._t(e),h=l?this.ut(l,e,a):1;if(h!==0){this.rt(t);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,d)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:s="",padding:r=0},hashCount:o=0}=t;let a,l;try{a=xn(s).toUint8Array()}catch(h){if(h instanceof mh)return Vn("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new sc(a,r,o)}catch(h){return Vn(h instanceof jr?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.fe===0?null:l}ut(e,t,s){return t.De.count===s-this.ht(e,t.targetId)?0:2}ht(e,t){const s=this.We.getRemoteKeysForTarget(t);let r=0;return s.forEach((o=>{const a=this.We.lt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;e.mightContain(l)||(this.Xe(t,o,null),r++)})),r}Pt(e){const t=new Map;this.Ge.forEach(((o,a)=>{const l=this.st(a);if(l){if(o.current&&Ra(l.target)){const h=new W(l.target.path);this.Tt(h).has(a)||this.It(a,h)||this.Xe(a,h,Ze.newNoDocument(h,e))}o.Ne&&(t.set(a,o.Le()),o.ke())}}));let s=ne();this.Je.forEach(((o,a)=>{let l=!0;a.forEachWhile((h=>{const d=this.st(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(s=s.add(o))})),this.ze.forEach(((o,a)=>a.setReadTime(e)));const r=new Do(e,t,this.He,this.ze,s);return this.ze=un(),this.je=Gi(),this.Je=Gi(),this.He=new Te(ee),r}Ze(e,t){if(!this.nt(e))return;const s=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,s),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,s){if(!this.nt(e))return;const r=this.tt(e);this.It(e,t)?r.qe(t,1):r.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),s&&(this.ze=this.ze.insert(t,s))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new Hl,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new Le(ee),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new Le(ee),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||j("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new Hl),this.We.getRemoteKeysForTarget(e).forEach((t=>{this.Xe(e,t,null)}))}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function Gi(){return new Te(W.comparator)}function Gl(){return new Te(W.comparator)}const Fg={asc:"ASCENDING",desc:"DESCENDING"},$g={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Bg={and:"AND",or:"OR"};class qg{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Pa(n,e){return n.useProto3Json||To(e)?e:{value:e}}function ho(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function zh(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Ug(n,e){return ho(n,e.toTimestamp())}function Ht(n){return pe(!!n,49232),X.fromTimestamp((function(t){const s=On(t);return new Ie(s.seconds,s.nanos)})(n))}function rc(n,e){return Va(n,e).canonicalString()}function Va(n,e){const t=(function(r){return new Ee(["projects",r.projectId,"databases",r.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Hh(n){const e=Ee.fromString(n);return pe(Yh(e),10190,{key:e.toString()}),e}function Na(n,e){return rc(n.databaseId,e.path)}function aa(n,e){const t=Hh(e);if(t.get(1)!==n.databaseId.projectId)throw new q(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new q(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new W(Kh(t))}function Gh(n,e){return rc(n.databaseId,e)}function jg(n){const e=Hh(n);return e.length===4?Ee.emptyPath():Kh(e)}function Oa(n){return new Ee(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Kh(n){return pe(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Kl(n,e,t){return{name:Na(n,e),fields:t.value.mapValue.fields}}function zg(n,e){let t;if("targetChange"in e){e.targetChange;const s=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:Y(39313,{state:d})})(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],o=(function(d,m){return d.useProto3Json?(pe(m===void 0||typeof m=="string",58123),We.fromBase64String(m||"")):(pe(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),We.fromUint8Array(m||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&(function(d){const m=d.code===void 0?O.UNKNOWN:qh(d.code);return new q(m,d.message||"")})(a);t=new jh(s,r,o,l||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=aa(n,s.document.name),o=Ht(s.document.updateTime),a=s.document.createTime?Ht(s.document.createTime):X.min(),l=new ut({mapValue:{fields:s.document.fields}}),h=Ze.newFoundDocument(r,o,a,l),d=s.targetIds||[],m=s.removedTargetIds||[];t=new to(d,m,h.key,h)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=aa(n,s.document),o=s.readTime?Ht(s.readTime):X.min(),a=Ze.newNoDocument(r,o),l=s.removedTargetIds||[];t=new to([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=aa(n,s.document),o=s.removedTargetIds||[];t=new to([],o,r,null)}else{if(!("filter"in e))return Y(11601,{At:e});{e.filter;const s=e.filter;s.targetId;const{count:r=0,unchangedNames:o}=s,a=new xg(r,o),l=s.targetId;t=new Uh(l,a)}}return t}function Hg(n,e){let t;if(e instanceof mi)t={update:Kl(n,e.key,e.value)};else if(e instanceof tc)t={delete:Na(n,e.key)};else if(e instanceof Bn)t={update:Kl(n,e.key,e.data),updateMask:e_(e.fieldMask)};else{if(!(e instanceof Vg))return Y(16599,{Rt:e.type});t={verify:Na(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((s=>(function(o,a){const l=a.transform;if(l instanceof ui)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof hi)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof di)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof uo)return{fieldPath:a.field.canonicalString(),increment:l.Ee};throw Y(20930,{transform:a.transform})})(0,s)))),e.precondition.isNone||(t.currentDocument=(function(r,o){return o.updateTime!==void 0?{updateTime:Ug(r,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:Y(27497)})(n,e.precondition)),t}function Gg(n,e){return n&&n.length>0?(pe(e!==void 0,14353),n.map((t=>(function(r,o){let a=r.updateTime?Ht(r.updateTime):Ht(o);return a.isEqual(X.min())&&(a=Ht(o)),new Cg(a,r.transformResults||[])})(t,e)))):[]}function Kg(n,e){return{documents:[Gh(n,e.path)]}}function Wg(n,e){const t={structuredQuery:{}},s=e.path;let r;e.collectionGroup!==null?(r=s,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=s.popLast(),t.structuredQuery.from=[{collectionId:s.lastSegment()}]),t.parent=Gh(n,r);const o=(function(d){if(d.length!==0)return Qh(Pt.create(d,"and"))})(e.filters);o&&(t.structuredQuery.where=o);const a=(function(d){if(d.length!==0)return d.map((m=>(function(_){return{field:Qs(_.field),direction:Jg(_.dir)}})(m)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=Pa(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(e.endAt)),{Vt:t,parent:r}}function Qg(n){let e=jg(n.parent);const t=n.structuredQuery,s=t.from?t.from.length:0;let r=null;if(s>0){pe(s===1,65062);const m=t.from[0];m.allDescendants?r=m.collectionId:e=e.child(m.collectionId)}let o=[];t.where&&(o=(function(g){const _=Wh(g);return _ instanceof Pt&&wh(_)?_.getFilters():[_]})(t.where));let a=[];t.orderBy&&(a=(function(g){return g.map((_=>(function(D){return new li(Ys(D.field),(function(A){switch(A){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(D.direction))})(_)))})(t.orderBy));let l=null;t.limit&&(l=(function(g){let _;return _=typeof g=="object"?g.value:g,To(_)?null:_})(t.limit));let h=null;t.startAt&&(h=(function(g){const _=!!g.before,R=g.values||[];return new lo(R,_)})(t.startAt));let d=null;return t.endAt&&(d=(function(g){const _=!g.before,R=g.values||[];return new lo(R,_)})(t.endAt)),mg(e,r,a,o,l,"F",h,d)}function Yg(n,e){const t=(function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Y(28987,{purpose:r})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Wh(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const s=Ys(t.unaryFilter.field);return Ne.create(s,"==",{doubleValue:NaN});case"IS_NULL":const r=Ys(t.unaryFilter.field);return Ne.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ys(t.unaryFilter.field);return Ne.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ys(t.unaryFilter.field);return Ne.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Y(61313);default:return Y(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Ne.create(Ys(t.fieldFilter.field),(function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Y(58110);default:return Y(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Pt.create(t.compositeFilter.filters.map((s=>Wh(s))),(function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return Y(1026)}})(t.compositeFilter.op))})(n):Y(30097,{filter:n})}function Jg(n){return Fg[n]}function Xg(n){return $g[n]}function Zg(n){return Bg[n]}function Qs(n){return{fieldPath:n.canonicalString()}}function Ys(n){return Ke.fromServerFormat(n.fieldPath)}function Qh(n){return n instanceof Ne?(function(t){if(t.op==="=="){if(xl(t.value))return{unaryFilter:{field:Qs(t.field),op:"IS_NAN"}};if(Ol(t.value))return{unaryFilter:{field:Qs(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(xl(t.value))return{unaryFilter:{field:Qs(t.field),op:"IS_NOT_NAN"}};if(Ol(t.value))return{unaryFilter:{field:Qs(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Qs(t.field),op:Xg(t.op),value:t.value}}})(n):n instanceof Pt?(function(t){const s=t.getFilters().map((r=>Qh(r)));return s.length===1?s[0]:{compositeFilter:{op:Zg(t.op),filters:s}}})(n):Y(54877,{filter:n})}function e_(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Yh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e,t,s,r,o=X.min(),a=X.min(),l=We.EMPTY_BYTE_STRING,h=null){this.target=e,this.targetId=t,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(e){return new Sn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Sn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Sn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Sn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{constructor(e){this.gt=e}}function n_(n){const e=Qg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Da(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s_{constructor(){this.Dn=new r_}addToCollectionParentIndex(e,t){return this.Dn.add(t),x.resolve()}getCollectionParents(e,t){return x.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return x.resolve()}deleteFieldIndex(e,t){return x.resolve()}deleteAllFieldIndexes(e){return x.resolve()}createTargetIndexes(e,t){return x.resolve()}getDocumentsMatchingTarget(e,t){return x.resolve(null)}getIndexType(e,t){return x.resolve(0)}getFieldIndexes(e,t){return x.resolve([])}getNextCollectionGroupToUpdate(e){return x.resolve(null)}getMinOffset(e,t){return x.resolve(Nn.min())}getMinOffsetFromCollectionGroup(e,t){return x.resolve(Nn.min())}updateCollectionGroup(e,t,s){return x.resolve()}updateIndexEntries(e,t){return x.resolve()}}class r_{constructor(){this.index={}}add(e){const t=e.lastSegment(),s=e.popLast(),r=this.index[t]||new Le(Ee.comparator),o=!r.has(s);return this.index[t]=r.add(s),o}has(e){const t=e.lastSegment(),s=e.popLast(),r=this.index[t];return r&&r.has(s)}getEntries(e){return(this.index[e]||new Le(Ee.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Jh=41943040;class ct{static withCacheSize(e){return new ct(e,ct.DEFAULT_COLLECTION_PERCENTILE,ct.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ct.DEFAULT_COLLECTION_PERCENTILE=10,ct.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ct.DEFAULT=new ct(Jh,ct.DEFAULT_COLLECTION_PERCENTILE,ct.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ct.DISABLED=new ct(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new tr(0)}static ur(){return new tr(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ql="LruGarbageCollector",i_=1048576;function Yl([n,e],[t,s]){const r=ee(n,t);return r===0?ee(e,s):r}class o_{constructor(e){this.Tr=e,this.buffer=new Le(Yl),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const s=this.buffer.last();Yl(t,s)<0&&(this.buffer=this.buffer.delete(s).add(t))}}get maxValue(){return this.buffer.last()[0]}}class a_{constructor(e,t,s){this.garbageCollector=e,this.asyncQueue=t,this.localStore=s,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){j(Ql,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ir(t)?j(Ql,"Ignoring IndexedDB error during garbage collection: ",t):await rr(t)}await this.Rr(3e5)}))}}class c_{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next((s=>Math.floor(t/100*s)))}nthSequenceNumber(e,t){if(t===0)return x.resolve(Io.ue);const s=new o_(t);return this.Vr.forEachTarget(e,(r=>s.Er(r.sequenceNumber))).next((()=>this.Vr.gr(e,(r=>s.Er(r))))).next((()=>s.maxValue))}removeTargets(e,t,s){return this.Vr.removeTargets(e,t,s)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(j("LruGarbageCollector","Garbage collection skipped; disabled"),x.resolve(Wl)):this.getCacheSize(e).next((s=>s<this.params.cacheSizeCollectionThreshold?(j("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Wl):this.pr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let s,r,o,a,l,h,d;const m=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((g=>(g>this.params.maximumSequenceNumbersToCollect?(j("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),r=this.params.maximumSequenceNumbersToCollect):r=g,a=Date.now(),this.nthSequenceNumber(e,r)))).next((g=>(s=g,l=Date.now(),this.removeTargets(e,s,t)))).next((g=>(o=g,h=Date.now(),this.removeOrphanedDocuments(e,s)))).next((g=>(d=Date.now(),Ks()<=ae.DEBUG&&j("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${r} in `+(l-a)+`ms
	Removed ${o} targets in `+(h-l)+`ms
	Removed ${g} documents in `+(d-h)+`ms
Total Duration: ${d-m}ms`),x.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:o,documentsRemoved:g}))))}}function l_(n,e){return new c_(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u_{constructor(){this.changes=new ys((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ze.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const s=this.changes.get(t);return s!==void 0?x.resolve(s):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h_{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d_{constructor(e,t,s,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=s,this.indexManager=r}getDocument(e,t){let s=null;return this.documentOverlayCache.getOverlay(e,t).next((r=>(s=r,this.remoteDocumentCache.getEntry(e,t)))).next((r=>(s!==null&&ei(s.mutation,r,mt.empty(),Ie.now()),r)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((s=>this.getLocalViewOfDocuments(e,s,ne()).next((()=>s))))}getLocalViewOfDocuments(e,t,s=ne()){const r=ls();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,s).next((o=>{let a=Ur();return o.forEach(((l,h)=>{a=a.insert(l,h.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const s=ls();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,ne())))}populateOverlays(e,t,s){const r=[];return s.forEach((o=>{t.has(o)||r.push(o)})),this.documentOverlayCache.getOverlays(e,r).next((o=>{o.forEach(((a,l)=>{t.set(a,l)}))}))}computeViews(e,t,s,r){let o=un();const a=Zr(),l=(function(){return Zr()})();return t.forEach(((h,d)=>{const m=s.get(d.key);r.has(d.key)&&(m===void 0||m.mutation instanceof Bn)?o=o.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),ei(m.mutation,d,m.mutation.getFieldMask(),Ie.now())):a.set(d.key,mt.empty())})),this.recalculateAndSaveOverlays(e,o).next((h=>(h.forEach(((d,m)=>a.set(d,m))),t.forEach(((d,m)=>{var g;return l.set(d,new h_(m,(g=a.get(d))!==null&&g!==void 0?g:null))})),l)))}recalculateAndSaveOverlays(e,t){const s=Zr();let r=new Te(((a,l)=>a-l)),o=ne();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const l of a)l.keys().forEach((h=>{const d=t.get(h);if(d===null)return;let m=s.get(h)||mt.empty();m=l.applyToLocalView(d,m),s.set(h,m);const g=(r.get(l.batchId)||ne()).add(h);r=r.insert(l.batchId,g)}))})).next((()=>{const a=[],l=r.getReverseIterator();for(;l.hasNext();){const h=l.getNext(),d=h.key,m=h.value,g=Oh();m.forEach((_=>{if(!o.has(_)){const R=$h(t.get(_),s.get(_));R!==null&&g.set(_,R),o=o.add(_)}})),a.push(this.documentOverlayCache.saveOverlays(e,d,g))}return x.waitFor(a)})).next((()=>s))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((s=>this.recalculateAndSaveOverlays(e,s)))}getDocumentsMatchingQuery(e,t,s,r){return(function(a){return W.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ch(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,s,r):this.getDocumentsMatchingCollectionQuery(e,t,s,r)}getNextDocuments(e,t,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,s,r).next((o=>{const a=r-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,s.largestBatchId,r-o.size):x.resolve(ls());let l=ii,h=o;return a.next((d=>x.forEach(d,((m,g)=>(l<g.largestBatchId&&(l=g.largestBatchId),o.get(m)?x.resolve():this.remoteDocumentCache.getEntry(e,m).next((_=>{h=h.insert(m,_)}))))).next((()=>this.populateOverlays(e,d,o))).next((()=>this.computeViews(e,h,d,ne()))).next((m=>({batchId:l,changes:Nh(m)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new W(t)).next((s=>{let r=Ur();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r}))}getDocumentsMatchingCollectionGroupQuery(e,t,s,r){const o=t.collectionGroup;let a=Ur();return this.indexManager.getCollectionParents(e,o).next((l=>x.forEach(l,(h=>{const d=(function(g,_){return new or(_,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)})(t,h.child(o));return this.getDocumentsMatchingCollectionQuery(e,d,s,r).next((m=>{m.forEach(((g,_)=>{a=a.insert(g,_)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,s,r){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,s.largestBatchId).next((a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,s,o,r)))).next((a=>{o.forEach(((h,d)=>{const m=d.getKey();a.get(m)===null&&(a=a.insert(m,Ze.newInvalidDocument(m)))}));let l=Ur();return a.forEach(((h,d)=>{const m=o.get(h);m!==void 0&&ei(m.mutation,d,mt.empty(),Ie.now()),bo(t,d)&&(l=l.insert(h,d))})),l}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f_{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return x.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,(function(r){return{id:r.id,version:r.version,createTime:Ht(r.createTime)}})(t)),x.resolve()}getNamedQuery(e,t){return x.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,(function(r){return{name:r.name,query:n_(r.bundledQuery),readTime:Ht(r.readTime)}})(t)),x.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m_{constructor(){this.overlays=new Te(W.comparator),this.kr=new Map}getOverlay(e,t){return x.resolve(this.overlays.get(t))}getOverlays(e,t){const s=ls();return x.forEach(t,(r=>this.getOverlay(e,r).next((o=>{o!==null&&s.set(r,o)})))).next((()=>s))}saveOverlays(e,t,s){return s.forEach(((r,o)=>{this.wt(e,t,o)})),x.resolve()}removeOverlaysForBatchId(e,t,s){const r=this.kr.get(s);return r!==void 0&&(r.forEach((o=>this.overlays=this.overlays.remove(o))),this.kr.delete(s)),x.resolve()}getOverlaysForCollection(e,t,s){const r=ls(),o=t.length+1,a=new W(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const h=l.getNext().value,d=h.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>s&&r.set(h.getKey(),h)}return x.resolve(r)}getOverlaysForCollectionGroup(e,t,s,r){let o=new Te(((d,m)=>d-m));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>s){let m=o.get(d.largestBatchId);m===null&&(m=ls(),o=o.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const l=ls(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((d,m)=>l.set(d,m))),!(l.size()>=r)););return x.resolve(l)}wt(e,t,s){const r=this.overlays.get(s.key);if(r!==null){const a=this.kr.get(r.largestBatchId).delete(s.key);this.kr.set(r.largestBatchId,a)}this.overlays=this.overlays.insert(s.key,new Og(t,s));let o=this.kr.get(t);o===void 0&&(o=ne(),this.kr.set(t,o)),this.kr.set(t,o.add(s.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p_{constructor(){this.sessionToken=We.EMPTY_BYTE_STRING}getSessionToken(e){return x.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,x.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(){this.qr=new Le(Ue.Qr),this.$r=new Le(Ue.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const s=new Ue(e,t);this.qr=this.qr.add(s),this.$r=this.$r.add(s)}Kr(e,t){e.forEach((s=>this.addReference(s,t)))}removeReference(e,t){this.Wr(new Ue(e,t))}Gr(e,t){e.forEach((s=>this.removeReference(s,t)))}zr(e){const t=new W(new Ee([])),s=new Ue(t,e),r=new Ue(t,e+1),o=[];return this.$r.forEachInRange([s,r],(a=>{this.Wr(a),o.push(a.key)})),o}jr(){this.qr.forEach((e=>this.Wr(e)))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new W(new Ee([])),s=new Ue(t,e),r=new Ue(t,e+1);let o=ne();return this.$r.forEachInRange([s,r],(a=>{o=o.add(a.key)})),o}containsKey(e){const t=new Ue(e,0),s=this.qr.firstAfterOrEqual(t);return s!==null&&e.isEqual(s.key)}}class Ue{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return W.comparator(e.key,t.key)||ee(e.Hr,t.Hr)}static Ur(e,t){return ee(e.Hr,t.Hr)||W.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g_{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new Le(Ue.Qr)}checkEmpty(e){return x.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,s,r){const o=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Ng(o,t,s,r);this.mutationQueue.push(a);for(const l of r)this.Yr=this.Yr.add(new Ue(l.key,o)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return x.resolve(a)}lookupMutationBatch(e,t){return x.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const s=t+1,r=this.Xr(s),o=r<0?0:r;return x.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return x.resolve(this.mutationQueue.length===0?Qa:this.er-1)}getAllMutationBatches(e){return x.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const s=new Ue(t,0),r=new Ue(t,Number.POSITIVE_INFINITY),o=[];return this.Yr.forEachInRange([s,r],(a=>{const l=this.Zr(a.Hr);o.push(l)})),x.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let s=new Le(ee);return t.forEach((r=>{const o=new Ue(r,0),a=new Ue(r,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([o,a],(l=>{s=s.add(l.Hr)}))})),x.resolve(this.ei(s))}getAllMutationBatchesAffectingQuery(e,t){const s=t.path,r=s.length+1;let o=s;W.isDocumentKey(o)||(o=o.child(""));const a=new Ue(new W(o),0);let l=new Le(ee);return this.Yr.forEachWhile((h=>{const d=h.key.path;return!!s.isPrefixOf(d)&&(d.length===r&&(l=l.add(h.Hr)),!0)}),a),x.resolve(this.ei(l))}ei(e){const t=[];return e.forEach((s=>{const r=this.Zr(s);r!==null&&t.push(r)})),t}removeMutationBatch(e,t){pe(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.Yr;return x.forEach(t.mutations,(r=>{const o=new Ue(r.key,t.batchId);return s=s.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)})).next((()=>{this.Yr=s}))}rr(e){}containsKey(e,t){const s=new Ue(t,0),r=this.Yr.firstAfterOrEqual(s);return x.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,x.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class __{constructor(e){this.ni=e,this.docs=(function(){return new Te(W.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const s=t.key,r=this.docs.get(s),o=r?r.size:0,a=this.ni(t);return this.docs=this.docs.insert(s,{document:t.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const s=this.docs.get(t);return x.resolve(s?s.document.mutableCopy():Ze.newInvalidDocument(t))}getEntries(e,t){let s=un();return t.forEach((r=>{const o=this.docs.get(r);s=s.insert(r,o?o.document.mutableCopy():Ze.newInvalidDocument(r))})),x.resolve(s)}getDocumentsMatchingQuery(e,t,s,r){let o=un();const a=t.path,l=new W(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:d,value:{document:m}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Gp(Hp(m),s)<=0||(r.has(m.key)||bo(t,m))&&(o=o.insert(m.key,m.mutableCopy()))}return x.resolve(o)}getAllFromCollectionGroup(e,t,s,r){Y(9500)}ri(e,t){return x.forEach(this.docs,(s=>t(s)))}newChangeBuffer(e){return new y_(this)}getSize(e){return x.resolve(this.size)}}class y_ extends u_{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach(((s,r)=>{r.isValidDocument()?t.push(this.Or.addEntry(e,r)):this.Or.removeEntry(s)})),x.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v_{constructor(e){this.persistence=e,this.ii=new ys((t=>Xa(t)),Za),this.lastRemoteSnapshotVersion=X.min(),this.highestTargetId=0,this.si=0,this.oi=new ic,this.targetCount=0,this._i=tr.ar()}forEachTarget(e,t){return this.ii.forEach(((s,r)=>t(r))),x.resolve()}getLastRemoteSnapshotVersion(e){return x.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return x.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),x.resolve(this.highestTargetId)}setTargetsMetadata(e,t,s){return s&&(this.lastRemoteSnapshotVersion=s),t>this.si&&(this.si=t),x.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new tr(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,x.resolve()}updateTargetData(e,t){return this.hr(t),x.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,x.resolve()}removeTargets(e,t,s){let r=0;const o=[];return this.ii.forEach(((a,l)=>{l.sequenceNumber<=t&&s.get(l.targetId)===null&&(this.ii.delete(a),o.push(this.removeMatchingKeysForTargetId(e,l.targetId)),r++)})),x.waitFor(o).next((()=>r))}getTargetCount(e){return x.resolve(this.targetCount)}getTargetData(e,t){const s=this.ii.get(t)||null;return x.resolve(s)}addMatchingKeys(e,t,s){return this.oi.Kr(t,s),x.resolve()}removeMatchingKeys(e,t,s){this.oi.Gr(t,s);const r=this.persistence.referenceDelegate,o=[];return r&&t.forEach((a=>{o.push(r.markPotentiallyOrphaned(e,a))})),x.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),x.resolve()}getMatchingKeysForTargetId(e,t){const s=this.oi.Jr(t);return x.resolve(s)}containsKey(e,t){return x.resolve(this.oi.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(e,t){this.ai={},this.overlays={},this.ui=new Io(0),this.ci=!1,this.ci=!0,this.li=new p_,this.referenceDelegate=e(this),this.hi=new v_(this),this.indexManager=new s_,this.remoteDocumentCache=(function(r){return new __(r)})((s=>this.referenceDelegate.Pi(s))),this.serializer=new t_(t),this.Ti=new f_(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new m_,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let s=this.ai[e.toKey()];return s||(s=new g_(t,this.referenceDelegate),this.ai[e.toKey()]=s),s}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,s){j("MemoryPersistence","Starting transaction:",e);const r=new E_(this.ui.next());return this.referenceDelegate.Ii(),s(r).next((o=>this.referenceDelegate.di(r).next((()=>o)))).toPromise().then((o=>(r.raiseOnCommittedEvent(),o)))}Ei(e,t){return x.or(Object.values(this.ai).map((s=>()=>s.containsKey(e,t))))}}class E_ extends Wp{constructor(e){super(),this.currentSequenceNumber=e}}class oc{constructor(e){this.persistence=e,this.Ai=new ic,this.Ri=null}static Vi(e){return new oc(e)}get mi(){if(this.Ri)return this.Ri;throw Y(60996)}addReference(e,t,s){return this.Ai.addReference(s,t),this.mi.delete(s.toString()),x.resolve()}removeReference(e,t,s){return this.Ai.removeReference(s,t),this.mi.add(s.toString()),x.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),x.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach((r=>this.mi.add(r.toString())));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,t.targetId).next((r=>{r.forEach((o=>this.mi.add(o.toString())))})).next((()=>s.removeTargetData(e,t)))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return x.forEach(this.mi,(s=>{const r=W.fromPath(s);return this.fi(e,r).next((o=>{o||t.removeEntry(r,X.min())}))})).next((()=>(this.Ri=null,t.apply(e))))}updateLimboDocument(e,t){return this.fi(e,t).next((s=>{s?this.mi.delete(t.toString()):this.mi.add(t.toString())}))}Pi(e){return 0}fi(e,t){return x.or([()=>x.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class fo{constructor(e,t){this.persistence=e,this.gi=new ys((s=>Jp(s.path)),((s,r)=>s.isEqual(r))),this.garbageCollector=l_(this,t)}static Vi(e,t){return new fo(e,t)}Ii(){}di(e){return x.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next((s=>t.next((r=>s+r))))}yr(e){let t=0;return this.gr(e,(s=>{t++})).next((()=>t))}gr(e,t){return x.forEach(this.gi,((s,r)=>this.Sr(e,s,r).next((o=>o?x.resolve():t(r)))))}removeTargets(e,t,s){return this.persistence.getTargetCache().removeTargets(e,t,s)}removeOrphanedDocuments(e,t){let s=0;const r=this.persistence.getRemoteDocumentCache(),o=r.newChangeBuffer();return r.ri(e,(a=>this.Sr(e,a,t).next((l=>{l||(s++,o.removeEntry(a,X.min()))})))).next((()=>o.apply(e))).next((()=>s))}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),x.resolve()}removeTarget(e,t){const s=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,s)}addReference(e,t,s){return this.gi.set(s,e.currentSequenceNumber),x.resolve()}removeReference(e,t,s){return this.gi.set(s,e.currentSequenceNumber),x.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),x.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Xi(e.data.value)),t}Sr(e,t,s){return x.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const r=this.gi.get(t);return x.resolve(r!==void 0&&r>s)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e,t,s,r){this.targetId=e,this.fromCache=t,this.Is=s,this.ds=r}static Es(e,t){let s=ne(),r=ne();for(const o of t.docChanges)switch(o.type){case 0:s=s.add(o.doc.key);break;case 1:r=r.add(o.doc.key)}return new ac(e,t.fromCache,s,r)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I_{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=(function(){return pm()?8:Qp(dm())>0?6:4})()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,s,r){const o={result:null};return this.ps(e,t).next((a=>{o.result=a})).next((()=>{if(!o.result)return this.ys(e,t,r,s).next((a=>{o.result=a}))})).next((()=>{if(o.result)return;const a=new I_;return this.ws(e,t,a).next((l=>{if(o.result=l,this.Rs)return this.Ss(e,t,a,l.size)}))})).next((()=>o.result))}Ss(e,t,s,r){return s.documentReadCount<this.Vs?(Ks()<=ae.DEBUG&&j("QueryEngine","SDK will not create cache indexes for query:",Ws(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),x.resolve()):(Ks()<=ae.DEBUG&&j("QueryEngine","Query:",Ws(t),"scans",s.documentReadCount,"local documents and returns",r,"documents as results."),s.documentReadCount>this.fs*r?(Ks()<=ae.DEBUG&&j("QueryEngine","The SDK decides to create cache indexes for query:",Ws(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,zt(t))):x.resolve())}ps(e,t){if(Fl(t))return x.resolve(null);let s=zt(t);return this.indexManager.getIndexType(e,s).next((r=>r===0?null:(t.limit!==null&&r===1&&(t=Da(t,null,"F"),s=zt(t)),this.indexManager.getDocumentsMatchingTarget(e,s).next((o=>{const a=ne(...o);return this.gs.getDocuments(e,a).next((l=>this.indexManager.getMinOffset(e,s).next((h=>{const d=this.bs(t,l);return this.Ds(t,d,a,h.readTime)?this.ps(e,Da(t,null,"F")):this.vs(e,d,t,h)}))))})))))}ys(e,t,s,r){return Fl(t)||r.isEqual(X.min())?x.resolve(null):this.gs.getDocuments(e,s).next((o=>{const a=this.bs(t,o);return this.Ds(t,a,s,r)?x.resolve(null):(Ks()<=ae.DEBUG&&j("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Ws(t)),this.vs(e,a,t,zp(r,ii)).next((l=>l)))}))}bs(e,t){let s=new Le(Ph(e));return t.forEach(((r,o)=>{bo(e,o)&&(s=s.add(o))})),s}Ds(e,t,s,r){if(e.limit===null)return!1;if(s.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(r)>0)}ws(e,t,s){return Ks()<=ae.DEBUG&&j("QueryEngine","Using full collection scan to execute query:",Ws(t)),this.gs.getDocumentsMatchingQuery(e,t,Nn.min(),s)}vs(e,t,s,r){return this.gs.getDocumentsMatchingQuery(e,s,r).next((o=>(t.forEach((a=>{o=o.insert(a.key,a)})),o)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc="LocalStore",A_=3e8;class w_{constructor(e,t,s,r){this.persistence=e,this.Cs=t,this.serializer=r,this.Fs=new Te(ee),this.Ms=new ys((o=>Xa(o)),Za),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(s)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new d_(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Fs)))}}function S_(n,e,t,s){return new w_(n,e,t,s)}async function Zh(n,e){const t=Z(n);return await t.persistence.runTransaction("Handle user change","readonly",(s=>{let r;return t.mutationQueue.getAllMutationBatches(s).next((o=>(r=o,t.Ns(e),t.mutationQueue.getAllMutationBatches(s)))).next((o=>{const a=[],l=[];let h=ne();for(const d of r){a.push(d.batchId);for(const m of d.mutations)h=h.add(m.key)}for(const d of o){l.push(d.batchId);for(const m of d.mutations)h=h.add(m.key)}return t.localDocuments.getDocuments(s,h).next((d=>({Bs:d,removedBatchIds:a,addedBatchIds:l})))}))}))}function b_(n,e){const t=Z(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(s=>{const r=e.batch.keys(),o=t.Os.newChangeBuffer({trackRemovals:!0});return(function(l,h,d,m){const g=d.batch,_=g.keys();let R=x.resolve();return _.forEach((D=>{R=R.next((()=>m.getEntry(h,D))).next((k=>{const A=d.docVersions.get(D);pe(A!==null,48541),k.version.compareTo(A)<0&&(g.applyToRemoteDocument(k,d),k.isValidDocument()&&(k.setReadTime(d.commitVersion),m.addEntry(k)))}))})),R.next((()=>l.mutationQueue.removeMutationBatch(h,g)))})(t,s,e,o).next((()=>o.apply(s))).next((()=>t.mutationQueue.performConsistencyCheck(s))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(s,r,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,(function(l){let h=ne();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(h=h.add(l.batch.mutations[d].key));return h})(e)))).next((()=>t.localDocuments.getDocuments(s,r)))}))}function ed(n){const e=Z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.hi.getLastRemoteSnapshotVersion(t)))}function R_(n,e){const t=Z(n),s=e.snapshotVersion;let r=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(o=>{const a=t.Os.newChangeBuffer({trackRemovals:!0});r=t.Fs;const l=[];e.targetChanges.forEach(((m,g)=>{const _=r.get(g);if(!_)return;l.push(t.hi.removeMatchingKeys(o,m.removedDocuments,g).next((()=>t.hi.addMatchingKeys(o,m.addedDocuments,g))));let R=_.withSequenceNumber(o.currentSequenceNumber);e.targetMismatches.get(g)!==null?R=R.withResumeToken(We.EMPTY_BYTE_STRING,X.min()).withLastLimboFreeSnapshotVersion(X.min()):m.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(m.resumeToken,s)),r=r.insert(g,R),(function(k,A,N){return k.resumeToken.approximateByteSize()===0||A.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=A_?!0:N.addedDocuments.size+N.modifiedDocuments.size+N.removedDocuments.size>0})(_,R,m)&&l.push(t.hi.updateTargetData(o,R))}));let h=un(),d=ne();if(e.documentUpdates.forEach((m=>{e.resolvedLimboDocuments.has(m)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(o,m))})),l.push(C_(o,a,e.documentUpdates).next((m=>{h=m.Ls,d=m.ks}))),!s.isEqual(X.min())){const m=t.hi.getLastRemoteSnapshotVersion(o).next((g=>t.hi.setTargetsMetadata(o,o.currentSequenceNumber,s)));l.push(m)}return x.waitFor(l).next((()=>a.apply(o))).next((()=>t.localDocuments.getLocalViewOfDocuments(o,h,d))).next((()=>h))})).then((o=>(t.Fs=r,o)))}function C_(n,e,t){let s=ne(),r=ne();return t.forEach((o=>s=s.add(o))),e.getEntries(n,s).next((o=>{let a=un();return t.forEach(((l,h)=>{const d=o.get(l);h.isFoundDocument()!==d.isFoundDocument()&&(r=r.add(l)),h.isNoDocument()&&h.version.isEqual(X.min())?(e.removeEntry(l,h.readTime),a=a.insert(l,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(h),a=a.insert(l,h)):j(cc,"Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",h.version)})),{Ls:a,ks:r}}))}function D_(n,e){const t=Z(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(s=>(e===void 0&&(e=Qa),t.mutationQueue.getNextMutationBatchAfterBatchId(s,e))))}function P_(n,e){const t=Z(n);return t.persistence.runTransaction("Allocate target","readwrite",(s=>{let r;return t.hi.getTargetData(s,e).next((o=>o?(r=o,x.resolve(r)):t.hi.allocateTargetId(s).next((a=>(r=new Sn(e,a,"TargetPurposeListen",s.currentSequenceNumber),t.hi.addTargetData(s,r).next((()=>r)))))))})).then((s=>{const r=t.Fs.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(s.targetId,s),t.Ms.set(e,s.targetId)),s}))}async function xa(n,e,t){const s=Z(n),r=s.Fs.get(e),o=t?"readwrite":"readwrite-primary";try{t||await s.persistence.runTransaction("Release target",o,(a=>s.persistence.referenceDelegate.removeTarget(a,r)))}catch(a){if(!ir(a))throw a;j(cc,`Failed to update sequence numbers for target ${e}: ${a}`)}s.Fs=s.Fs.remove(e),s.Ms.delete(r.target)}function Jl(n,e,t){const s=Z(n);let r=X.min(),o=ne();return s.persistence.runTransaction("Execute query","readwrite",(a=>(function(h,d,m){const g=Z(h),_=g.Ms.get(m);return _!==void 0?x.resolve(g.Fs.get(_)):g.hi.getTargetData(d,m)})(s,a,zt(e)).next((l=>{if(l)return r=l.lastLimboFreeSnapshotVersion,s.hi.getMatchingKeysForTargetId(a,l.targetId).next((h=>{o=h}))})).next((()=>s.Cs.getDocumentsMatchingQuery(a,e,t?r:X.min(),t?o:ne()))).next((l=>(V_(s,gg(e),l),{documents:l,qs:o})))))}function V_(n,e,t){let s=n.xs.get(e)||X.min();t.forEach(((r,o)=>{o.readTime.compareTo(s)>0&&(s=o.readTime)})),n.xs.set(e,s)}class Xl{constructor(){this.activeTargetIds=Tg()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class N_{constructor(){this.Fo=new Xl,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,s){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,s){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new Xl,Promise.resolve()}handleUserChange(e,t,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{xo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl="ConnectivityMonitor";class eu{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){j(Zl,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){j(Zl,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ki=null;function ka(){return Ki===null?Ki=(function(){return 268435456+Math.round(2147483648*Math.random())})():Ki++,"0x"+Ki.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ca="RestConnection",x_={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class k_{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${s}/databases/${r}`,this.Ko=this.databaseId.database===ao?`project_id=${s}`:`project_id=${s}&database_id=${r}`}Wo(e,t,s,r,o){const a=ka(),l=this.Go(e,t.toUriEncodedString());j(ca,`Sending RPC '${e}' ${a}:`,l,s);const h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(h,r,o);const{host:d}=new URL(l),m=ja(d);return this.jo(e,l,h,s,m).then((g=>(j(ca,`Received RPC '${e}' ${a}: `,g),g)),(g=>{throw Vn(ca,`RPC '${e}' ${a} failed with error: `,g,"url: ",l,"request:",s),g}))}Jo(e,t,s,r,o,a){return this.Wo(e,t,s,r,o)}zo(e,t,s){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+sr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((r,o)=>e[o]=r)),s&&s.headers.forEach(((r,o)=>e[o]=r))}Go(e,t){const s=x_[e];return`${this.$o}/v1/${t}:${s}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je="WebChannelConnection";class L_ extends k_{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,s,r,o){const a=ka();return new Promise(((l,h)=>{const d=new nh;d.setWithCredentials(!0),d.listenOnce(sh.COMPLETE,(()=>{try{switch(d.getLastErrorCode()){case Ji.NO_ERROR:const g=d.getResponseJson();j(Je,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(g)),l(g);break;case Ji.TIMEOUT:j(Je,`RPC '${e}' ${a} timed out`),h(new q(O.DEADLINE_EXCEEDED,"Request time out"));break;case Ji.HTTP_ERROR:const _=d.getStatus();if(j(Je,`RPC '${e}' ${a} failed with status:`,_,"response text:",d.getResponseText()),_>0){let R=d.getResponseJson();Array.isArray(R)&&(R=R[0]);const D=R==null?void 0:R.error;if(D&&D.status&&D.message){const k=(function(N){const M=N.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(M)>=0?M:O.UNKNOWN})(D.status);h(new q(k,D.message))}else h(new q(O.UNKNOWN,"Server responded with status "+d.getStatus()))}else h(new q(O.UNAVAILABLE,"Connection failed."));break;default:Y(9055,{c_:e,streamId:a,l_:d.getLastErrorCode(),h_:d.getLastError()})}}finally{j(Je,`RPC '${e}' ${a} completed.`)}}));const m=JSON.stringify(r);j(Je,`RPC '${e}' ${a} sending request:`,r),d.send(t,"POST",m,s,15)}))}P_(e,t,s){const r=ka(),o=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=oh(),l=ih(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(h.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(h.useFetchStreams=!0),this.zo(h.initMessageHeaders,t,s),h.encodeInitMessageHeaders=!0;const m=o.join("");j(Je,`Creating RPC '${e}' stream ${r}: ${m}`,h);const g=a.createWebChannel(m,h);this.T_(g);let _=!1,R=!1;const D=new M_({Ho:A=>{R?j(Je,`Not sending because RPC '${e}' stream ${r} is closed:`,A):(_||(j(Je,`Opening RPC '${e}' stream ${r} transport.`),g.open(),_=!0),j(Je,`RPC '${e}' stream ${r} sending:`,A),g.send(A))},Yo:()=>g.close()}),k=(A,N,M)=>{A.listen(N,(L=>{try{M(L)}catch(B){setTimeout((()=>{throw B}),0)}}))};return k(g,qr.EventType.OPEN,(()=>{R||(j(Je,`RPC '${e}' stream ${r} transport opened.`),D.s_())})),k(g,qr.EventType.CLOSE,(()=>{R||(R=!0,j(Je,`RPC '${e}' stream ${r} transport closed`),D.__(),this.I_(g))})),k(g,qr.EventType.ERROR,(A=>{R||(R=!0,Vn(Je,`RPC '${e}' stream ${r} transport errored. Name:`,A.name,"Message:",A.message),D.__(new q(O.UNAVAILABLE,"The operation could not be completed")))})),k(g,qr.EventType.MESSAGE,(A=>{var N;if(!R){const M=A.data[0];pe(!!M,16349);const L=M,B=(L==null?void 0:L.error)||((N=L[0])===null||N===void 0?void 0:N.error);if(B){j(Je,`RPC '${e}' stream ${r} received error:`,B);const J=B.status;let Q=(function(v){const I=Ve[v];if(I!==void 0)return qh(I)})(J),T=B.message;Q===void 0&&(Q=O.INTERNAL,T="Unknown error status: "+J+" with message "+B.message),R=!0,D.__(new q(Q,T)),g.close()}else j(Je,`RPC '${e}' stream ${r} received:`,M),D.a_(M)}})),k(l,rh.STAT_EVENT,(A=>{A.stat===Ta.PROXY?j(Je,`RPC '${e}' stream ${r} detected buffering proxy`):A.stat===Ta.NOPROXY&&j(Je,`RPC '${e}' stream ${r} detected no buffering proxy`)})),setTimeout((()=>{D.o_()}),0),D}terminate(){this.u_.forEach((e=>e.close())),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter((t=>t===e))}}function la(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(n){return new qg(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td{constructor(e,t,s=1e3,r=1.5,o=6e4){this.Fi=e,this.timerId=t,this.d_=s,this.E_=r,this.A_=o,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),s=Math.max(0,Date.now()-this.m_),r=Math.max(0,t-s);r>0&&j("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,r,(()=>(this.m_=Date.now(),e()))),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tu="PersistentStream";class nd{constructor(e,t,s,r,o,a,l,h){this.Fi=e,this.w_=s,this.S_=r,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new td(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,(()=>this.L_())))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===O.RESOURCE_EXHAUSTED?(ln(t.toString()),ln("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([s,r])=>{this.b_===t&&this.W_(s,r)}),(s=>{e((()=>{const r=new q(O.UNKNOWN,"Fetching auth token failed: "+s.message);return this.G_(r)}))}))}W_(e,t){const s=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo((()=>{s((()=>this.listener.Zo()))})),this.stream.e_((()=>{s((()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,(()=>(this.x_()&&(this.state=3),Promise.resolve()))),this.listener.e_())))})),this.stream.n_((r=>{s((()=>this.G_(r)))})),this.stream.onMessage((r=>{s((()=>++this.C_==1?this.j_(r):this.onNext(r)))}))}O_(){this.state=5,this.F_.g_((async()=>{this.state=0,this.start()}))}G_(e){return j(tu,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget((()=>this.b_===e?t():(j(tu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class F_ extends nd{constructor(e,t,s,r,o,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,s,r,a),this.serializer=o}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=zg(this.serializer,e),s=(function(o){if(!("targetChange"in o))return X.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?X.min():a.readTime?Ht(a.readTime):X.min()})(e);return this.listener.J_(t,s)}H_(e){const t={};t.database=Oa(this.serializer),t.addTarget=(function(o,a){let l;const h=a.target;if(l=Ra(h)?{documents:Kg(o,h)}:{query:Wg(o,h).Vt},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=zh(o,a.resumeToken);const d=Pa(o,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(X.min())>0){l.readTime=ho(o,a.snapshotVersion.toTimestamp());const d=Pa(o,a.expectedCount);d!==null&&(l.expectedCount=d)}return l})(this.serializer,e);const s=Yg(this.serializer,e);s&&(t.labels=s),this.k_(t)}Y_(e){const t={};t.database=Oa(this.serializer),t.removeTarget=e,this.k_(t)}}class $_ extends nd{constructor(e,t,s,r,o,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,s,r,a),this.serializer=o}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return pe(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,pe(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){pe(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=Gg(e.writeResults,e.commitTime),s=Ht(e.commitTime);return this.listener.ta(s,t)}na(){const e={};e.database=Oa(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map((s=>Hg(this.serializer,s)))};this.k_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B_{}class q_ extends B_{constructor(e,t,s,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=s,this.serializer=r,this.ra=!1}ia(){if(this.ra)throw new q(O.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,s,r){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Wo(e,Va(t,s),r,o,a))).catch((o=>{throw o.name==="FirebaseError"?(o.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new q(O.UNKNOWN,o.toString())}))}Jo(e,t,s,r,o){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,l])=>this.connection.Jo(e,Va(t,s),r,a,l,o))).catch((a=>{throw a.name==="FirebaseError"?(a.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new q(O.UNKNOWN,a.toString())}))}terminate(){this.ra=!0,this.connection.terminate()}}class U_{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve()))))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(ln(t),this._a=!1):j("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ms="RemoteStore";class j_{constructor(e,t,s,r,o){this.localStore=e,this.datastore=t,this.asyncQueue=s,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=o,this.Ea.xo((a=>{s.enqueueAndForget((async()=>{vs(this)&&(j(ms,"Restarting streams for network reachability change."),await(async function(h){const d=Z(h);d.Ia.add(4),await gi(d),d.Aa.set("Unknown"),d.Ia.delete(4),await Vo(d)})(this))}))})),this.Aa=new U_(s,r)}}async function Vo(n){if(vs(n))for(const e of n.da)await e(!0)}async function gi(n){for(const e of n.da)await e(!1)}function sd(n,e){const t=Z(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),dc(t)?hc(t):ar(t).x_()&&uc(t,e))}function lc(n,e){const t=Z(n),s=ar(t);t.Ta.delete(e),s.x_()&&rd(t,e),t.Ta.size===0&&(s.x_()?s.B_():vs(t)&&t.Aa.set("Unknown"))}function uc(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(X.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ar(n).H_(e)}function rd(n,e){n.Ra.$e(e),ar(n).Y_(e)}function hc(n){n.Ra=new Lg({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),ar(n).start(),n.Aa.aa()}function dc(n){return vs(n)&&!ar(n).M_()&&n.Ta.size>0}function vs(n){return Z(n).Ia.size===0}function id(n){n.Ra=void 0}async function z_(n){n.Aa.set("Online")}async function H_(n){n.Ta.forEach(((e,t)=>{uc(n,e)}))}async function G_(n,e){id(n),dc(n)?(n.Aa.la(e),hc(n)):n.Aa.set("Unknown")}async function K_(n,e,t){if(n.Aa.set("Online"),e instanceof jh&&e.state===2&&e.cause)try{await(async function(r,o){const a=o.cause;for(const l of o.targetIds)r.Ta.has(l)&&(await r.remoteSyncer.rejectListen(l,a),r.Ta.delete(l),r.Ra.removeTarget(l))})(n,e)}catch(s){j(ms,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),await mo(n,s)}else if(e instanceof to?n.Ra.Ye(e):e instanceof Uh?n.Ra.it(e):n.Ra.et(e),!t.isEqual(X.min()))try{const s=await ed(n.localStore);t.compareTo(s)>=0&&await(function(o,a){const l=o.Ra.Pt(a);return l.targetChanges.forEach(((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.Ta.get(d);m&&o.Ta.set(d,m.withResumeToken(h.resumeToken,a))}})),l.targetMismatches.forEach(((h,d)=>{const m=o.Ta.get(h);if(!m)return;o.Ta.set(h,m.withResumeToken(We.EMPTY_BYTE_STRING,m.snapshotVersion)),rd(o,h);const g=new Sn(m.target,h,d,m.sequenceNumber);uc(o,g)})),o.remoteSyncer.applyRemoteEvent(l)})(n,t)}catch(s){j(ms,"Failed to raise snapshot:",s),await mo(n,s)}}async function mo(n,e,t){if(!ir(e))throw e;n.Ia.add(1),await gi(n),n.Aa.set("Offline"),t||(t=()=>ed(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{j(ms,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await Vo(n)}))}function od(n,e){return e().catch((t=>mo(n,t,e)))}async function No(n){const e=Z(n),t=Mn(e);let s=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Qa;for(;W_(e);)try{const r=await D_(e.localStore,s);if(r===null){e.Pa.length===0&&t.B_();break}s=r.batchId,Q_(e,r)}catch(r){await mo(e,r)}ad(e)&&cd(e)}function W_(n){return vs(n)&&n.Pa.length<10}function Q_(n,e){n.Pa.push(e);const t=Mn(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function ad(n){return vs(n)&&!Mn(n).M_()&&n.Pa.length>0}function cd(n){Mn(n).start()}async function Y_(n){Mn(n).na()}async function J_(n){const e=Mn(n);for(const t of n.Pa)e.X_(t.mutations)}async function X_(n,e,t){const s=n.Pa.shift(),r=nc.from(s,e,t);await od(n,(()=>n.remoteSyncer.applySuccessfulWrite(r))),await No(n)}async function Z_(n,e){e&&Mn(n).Z_&&await(async function(s,r){if((function(a){return kg(a)&&a!==O.ABORTED})(r.code)){const o=s.Pa.shift();Mn(s).N_(),await od(s,(()=>s.remoteSyncer.rejectFailedWrite(o.batchId,r))),await No(s)}})(n,e),ad(n)&&cd(n)}async function nu(n,e){const t=Z(n);t.asyncQueue.verifyOperationInProgress(),j(ms,"RemoteStore received new credentials");const s=vs(t);t.Ia.add(3),await gi(t),s&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Vo(t)}async function ey(n,e){const t=Z(n);e?(t.Ia.delete(2),await Vo(t)):e||(t.Ia.add(2),await gi(t),t.Aa.set("Unknown"))}function ar(n){return n.Va||(n.Va=(function(t,s,r){const o=Z(t);return o.ia(),new F_(s,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,r)})(n.datastore,n.asyncQueue,{Zo:z_.bind(null,n),e_:H_.bind(null,n),n_:G_.bind(null,n),J_:K_.bind(null,n)}),n.da.push((async e=>{e?(n.Va.N_(),dc(n)?hc(n):n.Aa.set("Unknown")):(await n.Va.stop(),id(n))}))),n.Va}function Mn(n){return n.ma||(n.ma=(function(t,s,r){const o=Z(t);return o.ia(),new $_(s,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,r)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:Y_.bind(null,n),n_:Z_.bind(null,n),ea:J_.bind(null,n),ta:X_.bind(null,n)}),n.da.push((async e=>{e?(n.ma.N_(),await No(n)):(await n.ma.stop(),n.Pa.length>0&&(j(ms,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))}))),n.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(e,t,s,r,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=r,this.removalCallback=o,this.deferred=new on,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,s,r,o){const a=Date.now()+s,l=new fc(e,t,a,r,o);return l.start(s),l}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new q(O.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function mc(n,e){if(ln("AsyncQueue",`${e}: ${n}`),ir(n))return new q(O.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{static emptySet(e){return new Js(e.comparator)}constructor(e){this.comparator=e?(t,s)=>e(t,s)||W.comparator(t.key,s.key):(t,s)=>W.comparator(t.key,s.key),this.keyedMap=Ur(),this.sortedSet=new Te(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,s)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Js)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;t.hasNext();){const r=t.getNext().key,o=s.getNext().key;if(!r.isEqual(o))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const s=new Js;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=t,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(){this.fa=new Te(W.comparator)}track(e){const t=e.doc.key,s=this.fa.get(t);s?e.type!==0&&s.type===3?this.fa=this.fa.insert(t,e):e.type===3&&s.type!==1?this.fa=this.fa.insert(t,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.fa=this.fa.remove(t):e.type===1&&s.type===2?this.fa=this.fa.insert(t,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):Y(63341,{At:e,ga:s}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal(((t,s)=>{e.push(s)})),e}}class nr{constructor(e,t,s,r,o,a,l,h,d){this.query=e,this.docs=t,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(e,t,s,r,o){const a=[];return t.forEach((l=>{a.push({type:0,doc:l})})),new nr(e,t,Js.emptySet(t),a,s,r,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&So(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,s=e.docChanges;if(t.length!==s.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==s[r].type||!t[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ty{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some((e=>e.ba()))}}class ny{constructor(){this.queries=ru(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,s){const r=Z(t),o=r.queries;r.queries=ru(),o.forEach(((a,l)=>{for(const h of l.wa)h.onError(s)}))})(this,new q(O.ABORTED,"Firestore shutting down"))}}function ru(){return new ys((n=>Dh(n)),So)}async function pc(n,e){const t=Z(n);let s=3;const r=e.query;let o=t.queries.get(r);o?!o.Sa()&&e.ba()&&(s=2):(o=new ty,s=e.ba()?0:1);try{switch(s){case 0:o.ya=await t.onListen(r,!0);break;case 1:o.ya=await t.onListen(r,!1);break;case 2:await t.onFirstRemoteStoreListen(r)}}catch(a){const l=mc(a,`Initialization of query '${Ws(e.query)}' failed`);return void e.onError(l)}t.queries.set(r,o),o.wa.push(e),e.va(t.onlineState),o.ya&&e.Ca(o.ya)&&_c(t)}async function gc(n,e){const t=Z(n),s=e.query;let r=3;const o=t.queries.get(s);if(o){const a=o.wa.indexOf(e);a>=0&&(o.wa.splice(a,1),o.wa.length===0?r=e.ba()?0:1:!o.Sa()&&e.ba()&&(r=2))}switch(r){case 0:return t.queries.delete(s),t.onUnlisten(s,!0);case 1:return t.queries.delete(s),t.onUnlisten(s,!1);case 2:return t.onLastRemoteStoreUnlisten(s);default:return}}function sy(n,e){const t=Z(n);let s=!1;for(const r of e){const o=r.query,a=t.queries.get(o);if(a){for(const l of a.wa)l.Ca(r)&&(s=!0);a.ya=r}}s&&_c(t)}function ry(n,e,t){const s=Z(n),r=s.queries.get(e);if(r)for(const o of r.wa)o.onError(t);s.queries.delete(e)}function _c(n){n.Da.forEach((e=>{e.next()}))}var Ma,iu;(iu=Ma||(Ma={})).Fa="default",iu.Cache="cache";class yc{constructor(e,t,s){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=s||{}}Ca(e){if(!this.options.includeMetadataChanges){const s=[];for(const r of e.docChanges)r.type!==3&&s.push(r);e=new nr(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const s=t!=="Offline";return(!this.options.ka||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=nr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==Ma.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{constructor(e){this.key=e}}class ud{constructor(e){this.key=e}}class iy{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=ne(),this.mutatedKeys=ne(),this.Xa=Ph(e),this.eu=new Js(this.Xa)}get tu(){return this.Ha}nu(e,t){const s=t?t.ru:new su,r=t?t.eu:this.eu;let o=t?t.mutatedKeys:this.mutatedKeys,a=r,l=!1;const h=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,d=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal(((m,g)=>{const _=r.get(m),R=bo(this.query,g)?g:null,D=!!_&&this.mutatedKeys.has(_.key),k=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let A=!1;_&&R?_.data.isEqual(R.data)?D!==k&&(s.track({type:3,doc:R}),A=!0):this.iu(_,R)||(s.track({type:2,doc:R}),A=!0,(h&&this.Xa(R,h)>0||d&&this.Xa(R,d)<0)&&(l=!0)):!_&&R?(s.track({type:0,doc:R}),A=!0):_&&!R&&(s.track({type:1,doc:_}),A=!0,(h||d)&&(l=!0)),A&&(R?(a=a.add(R),o=k?o.add(m):o.delete(m)):(a=a.delete(m),o=o.delete(m)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),o=o.delete(m.key),s.track({type:1,doc:m})}return{eu:a,ru:s,Ds:l,mutatedKeys:o}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,s,r){const o=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const a=e.ru.pa();a.sort(((m,g)=>(function(R,D){const k=A=>{switch(A){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Y(20277,{At:A})}};return k(R)-k(D)})(m.type,g.type)||this.Xa(m.doc,g.doc))),this.su(s),r=r!=null&&r;const l=t&&!r?this.ou():[],h=this.Za.size===0&&this.current&&!r?1:0,d=h!==this.Ya;return this.Ya=h,a.length!==0||d?{snapshot:new nr(this.query,e.eu,o,a,e.mutatedKeys,h===0,d,!1,!!s&&s.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new su,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach((t=>this.Ha=this.Ha.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ha=this.Ha.delete(t))),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=ne(),this.eu.forEach((s=>{this.au(s.key)&&(this.Za=this.Za.add(s.key))}));const t=[];return e.forEach((s=>{this.Za.has(s)||t.push(new ud(s))})),this.Za.forEach((s=>{e.has(s)||t.push(new ld(s))})),t}uu(e){this.Ha=e.qs,this.Za=ne();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return nr.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const vc="SyncEngine";class oy{constructor(e,t,s){this.query=e,this.targetId=t,this.view=s}}class ay{constructor(e){this.key=e,this.lu=!1}}class cy{constructor(e,t,s,r,o,a){this.localStore=e,this.remoteStore=t,this.eventManager=s,this.sharedClientState=r,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new ys((l=>Dh(l)),So),this.Tu=new Map,this.Iu=new Set,this.du=new Te(W.comparator),this.Eu=new Map,this.Au=new ic,this.Ru={},this.Vu=new Map,this.mu=tr.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function ly(n,e,t=!0){const s=gd(n);let r;const o=s.Pu.get(e);return o?(s.sharedClientState.addLocalQueryTarget(o.targetId),r=o.view.cu()):r=await hd(s,e,t,!0),r}async function uy(n,e){const t=gd(n);await hd(t,e,!0,!1)}async function hd(n,e,t,s){const r=await P_(n.localStore,zt(e)),o=r.targetId,a=n.sharedClientState.addLocalQueryTarget(o,t);let l;return s&&(l=await hy(n,e,o,a==="current",r.resumeToken)),n.isPrimaryClient&&t&&sd(n.remoteStore,r),l}async function hy(n,e,t,s,r){n.gu=(g,_,R)=>(async function(k,A,N,M){let L=A.view.nu(N);L.Ds&&(L=await Jl(k.localStore,A.query,!1).then((({documents:T})=>A.view.nu(T,L))));const B=M&&M.targetChanges.get(A.targetId),J=M&&M.targetMismatches.get(A.targetId)!=null,Q=A.view.applyChanges(L,k.isPrimaryClient,B,J);return au(k,A.targetId,Q._u),Q.snapshot})(n,g,_,R);const o=await Jl(n.localStore,e,!0),a=new iy(e,o.qs),l=a.nu(o.documents),h=pi.createSynthesizedTargetChangeForCurrentChange(t,s&&n.onlineState!=="Offline",r),d=a.applyChanges(l,n.isPrimaryClient,h);au(n,t,d._u);const m=new oy(e,t,a);return n.Pu.set(e,m),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),d.snapshot}async function dy(n,e,t){const s=Z(n),r=s.Pu.get(e),o=s.Tu.get(r.targetId);if(o.length>1)return s.Tu.set(r.targetId,o.filter((a=>!So(a,e)))),void s.Pu.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(r.targetId),s.sharedClientState.isActiveQueryTarget(r.targetId)||await xa(s.localStore,r.targetId,!1).then((()=>{s.sharedClientState.clearQueryState(r.targetId),t&&lc(s.remoteStore,r.targetId),La(s,r.targetId)})).catch(rr)):(La(s,r.targetId),await xa(s.localStore,r.targetId,!0))}async function fy(n,e){const t=Z(n),s=t.Pu.get(e),r=t.Tu.get(s.targetId);t.isPrimaryClient&&r.length===1&&(t.sharedClientState.removeLocalQueryTarget(s.targetId),lc(t.remoteStore,s.targetId))}async function my(n,e,t){const s=Iy(n);try{const r=await(function(a,l){const h=Z(a),d=Ie.now(),m=l.reduce(((R,D)=>R.add(D.key)),ne());let g,_;return h.persistence.runTransaction("Locally write mutations","readwrite",(R=>{let D=un(),k=ne();return h.Os.getEntries(R,m).next((A=>{D=A,D.forEach(((N,M)=>{M.isValidDocument()||(k=k.add(N))}))})).next((()=>h.localDocuments.getOverlayedDocuments(R,D))).next((A=>{g=A;const N=[];for(const M of l){const L=Pg(M,g.get(M.key).overlayedDocument);L!=null&&N.push(new Bn(M.key,L,Ih(L.value.mapValue),At.exists(!0)))}return h.mutationQueue.addMutationBatch(R,d,N,l)})).next((A=>{_=A;const N=A.applyToLocalDocumentSet(g,k);return h.documentOverlayCache.saveOverlays(R,A.batchId,N)}))})).then((()=>({batchId:_.batchId,changes:Nh(g)})))})(s.localStore,e);s.sharedClientState.addPendingMutation(r.batchId),(function(a,l,h){let d=a.Ru[a.currentUser.toKey()];d||(d=new Te(ee)),d=d.insert(l,h),a.Ru[a.currentUser.toKey()]=d})(s,r.batchId,t),await _i(s,r.changes),await No(s.remoteStore)}catch(r){const o=mc(r,"Failed to persist write");t.reject(o)}}async function dd(n,e){const t=Z(n);try{const s=await R_(t.localStore,e);e.targetChanges.forEach(((r,o)=>{const a=t.Eu.get(o);a&&(pe(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1,22616),r.addedDocuments.size>0?a.lu=!0:r.modifiedDocuments.size>0?pe(a.lu,14607):r.removedDocuments.size>0&&(pe(a.lu,42227),a.lu=!1))})),await _i(t,s,e)}catch(s){await rr(s)}}function ou(n,e,t){const s=Z(n);if(s.isPrimaryClient&&t===0||!s.isPrimaryClient&&t===1){const r=[];s.Pu.forEach(((o,a)=>{const l=a.view.va(e);l.snapshot&&r.push(l.snapshot)})),(function(a,l){const h=Z(a);h.onlineState=l;let d=!1;h.queries.forEach(((m,g)=>{for(const _ of g.wa)_.va(l)&&(d=!0)})),d&&_c(h)})(s.eventManager,e),r.length&&s.hu.J_(r),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function py(n,e,t){const s=Z(n);s.sharedClientState.updateQueryState(e,"rejected",t);const r=s.Eu.get(e),o=r&&r.key;if(o){let a=new Te(W.comparator);a=a.insert(o,Ze.newNoDocument(o,X.min()));const l=ne().add(o),h=new Do(X.min(),new Map,new Te(ee),a,l);await dd(s,h),s.du=s.du.remove(o),s.Eu.delete(e),Ec(s)}else await xa(s.localStore,e,!1).then((()=>La(s,e,t))).catch(rr)}async function gy(n,e){const t=Z(n),s=e.batch.batchId;try{const r=await b_(t.localStore,e);md(t,s,null),fd(t,s),t.sharedClientState.updateMutationState(s,"acknowledged"),await _i(t,r)}catch(r){await rr(r)}}async function _y(n,e,t){const s=Z(n);try{const r=await(function(a,l){const h=Z(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let m;return h.mutationQueue.lookupMutationBatch(d,l).next((g=>(pe(g!==null,37113),m=g.keys(),h.mutationQueue.removeMutationBatch(d,g)))).next((()=>h.mutationQueue.performConsistencyCheck(d))).next((()=>h.documentOverlayCache.removeOverlaysForBatchId(d,m,l))).next((()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m))).next((()=>h.localDocuments.getDocuments(d,m)))}))})(s.localStore,e);md(s,e,t),fd(s,e),s.sharedClientState.updateMutationState(e,"rejected",t),await _i(s,r)}catch(r){await rr(r)}}function fd(n,e){(n.Vu.get(e)||[]).forEach((t=>{t.resolve()})),n.Vu.delete(e)}function md(n,e,t){const s=Z(n);let r=s.Ru[s.currentUser.toKey()];if(r){const o=r.get(e);o&&(t?o.reject(t):o.resolve(),r=r.remove(e)),s.Ru[s.currentUser.toKey()]=r}}function La(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const s of n.Tu.get(e))n.Pu.delete(s),t&&n.hu.pu(s,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach((s=>{n.Au.containsKey(s)||pd(n,s)}))}function pd(n,e){n.Iu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(lc(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),Ec(n))}function au(n,e,t){for(const s of t)s instanceof ld?(n.Au.addReference(s.key,e),yy(n,s)):s instanceof ud?(j(vc,"Document no longer in limbo: "+s.key),n.Au.removeReference(s.key,e),n.Au.containsKey(s.key)||pd(n,s.key)):Y(19791,{yu:s})}function yy(n,e){const t=e.key,s=t.path.canonicalString();n.du.get(t)||n.Iu.has(s)||(j(vc,"New document in limbo: "+t),n.Iu.add(s),Ec(n))}function Ec(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new W(Ee.fromString(e)),s=n.mu.next();n.Eu.set(s,new ay(t)),n.du=n.du.insert(t,s),sd(n.remoteStore,new Sn(zt(wo(t.path)),s,"TargetPurposeLimboResolution",Io.ue))}}async function _i(n,e,t){const s=Z(n),r=[],o=[],a=[];s.Pu.isEmpty()||(s.Pu.forEach(((l,h)=>{a.push(s.gu(h,e,t).then((d=>{var m;if((d||t)&&s.isPrimaryClient){const g=d?!d.fromCache:(m=t==null?void 0:t.targetChanges.get(h.targetId))===null||m===void 0?void 0:m.current;s.sharedClientState.updateQueryState(h.targetId,g?"current":"not-current")}if(d){r.push(d);const g=ac.Es(h.targetId,d);o.push(g)}})))})),await Promise.all(a),s.hu.J_(r),await(async function(h,d){const m=Z(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",(g=>x.forEach(d,(_=>x.forEach(_.Is,(R=>m.persistence.referenceDelegate.addReference(g,_.targetId,R))).next((()=>x.forEach(_.ds,(R=>m.persistence.referenceDelegate.removeReference(g,_.targetId,R)))))))))}catch(g){if(!ir(g))throw g;j(cc,"Failed to update sequence numbers: "+g)}for(const g of d){const _=g.targetId;if(!g.fromCache){const R=m.Fs.get(_),D=R.snapshotVersion,k=R.withLastLimboFreeSnapshotVersion(D);m.Fs=m.Fs.insert(_,k)}}})(s.localStore,o))}async function vy(n,e){const t=Z(n);if(!t.currentUser.isEqual(e)){j(vc,"User change. New user:",e.toKey());const s=await Zh(t.localStore,e);t.currentUser=e,(function(o,a){o.Vu.forEach((l=>{l.forEach((h=>{h.reject(new q(O.CANCELLED,a))}))})),o.Vu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await _i(t,s.Bs)}}function Ey(n,e){const t=Z(n),s=t.Eu.get(e);if(s&&s.lu)return ne().add(s.key);{let r=ne();const o=t.Tu.get(e);if(!o)return r;for(const a of o){const l=t.Pu.get(a);r=r.unionWith(l.view.tu)}return r}}function gd(n){const e=Z(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=dd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ey.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=py.bind(null,e),e.hu.J_=sy.bind(null,e.eventManager),e.hu.pu=ry.bind(null,e.eventManager),e}function Iy(n){const e=Z(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=gy.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=_y.bind(null,e),e}class po{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Po(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return S_(this.persistence,new T_,e.initialUser,this.serializer)}Du(e){return new Xh(oc.Vi,this.serializer)}bu(e){return new N_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}po.provider={build:()=>new po};class Ty extends po{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){pe(this.persistence.referenceDelegate instanceof fo,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new a_(s,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?ct.withCacheSize(this.cacheSizeBytes):ct.DEFAULT;return new Xh((s=>fo.Vi(s,t)),this.serializer)}}class Fa{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>ou(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=vy.bind(null,this.syncEngine),await ey(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new ny})()}createDatastore(e){const t=Po(e.databaseInfo.databaseId),s=(function(o){return new L_(o)})(e.databaseInfo);return(function(o,a,l,h){return new q_(o,a,l,h)})(e.authCredentials,e.appCheckCredentials,s,t)}createRemoteStore(e){return(function(s,r,o,a,l){return new j_(s,r,o,a,l)})(this.localStore,this.datastore,e.asyncQueue,(t=>ou(this.syncEngine,t,0)),(function(){return eu.C()?new eu:new O_})())}createSyncEngine(e,t){return(function(r,o,a,l,h,d,m){const g=new cy(r,o,a,l,h,d);return m&&(g.fu=!0),g})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(r){const o=Z(r);j(ms,"RemoteStore shutting down."),o.Ia.add(5),await gi(o),o.Ea.shutdown(),o.Aa.set("Unknown")})(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Fa.provider={build:()=>new Fa};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ic{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):ln("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ln="FirestoreClient";class Ay{constructor(e,t,s,r,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=s,this.databaseInfo=r,this.user=Xe.UNAUTHENTICATED,this.clientId=Wa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(s,(async a=>{j(Ln,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(s,(a=>(j(Ln,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new on;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const s=mc(t,"Failed to shutdown persistence");e.reject(s)}})),e.promise}}async function ua(n,e){n.asyncQueue.verifyOperationInProgress(),j(Ln,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let s=t.initialUser;n.setCredentialChangeListener((async r=>{s.isEqual(r)||(await Zh(e.localStore,r),s=r)})),e.persistence.setDatabaseDeletedListener((()=>{Vn("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then((()=>{j("Terminating Firestore due to IndexedDb database deletion completed successfully")})).catch((r=>{Vn("Terminating Firestore due to IndexedDb database deletion failed",r)}))})),n._offlineComponents=e}async function cu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await wy(n);j(Ln,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((s=>nu(e.remoteStore,s))),n.setAppCheckTokenChangeListener(((s,r)=>nu(e.remoteStore,r))),n._onlineComponents=e}async function wy(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){j(Ln,"Using user provided OfflineComponentProvider");try{await ua(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(r){return r.name==="FirebaseError"?r.code===O.FAILED_PRECONDITION||r.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11})(t))throw t;Vn("Error using user provided cache. Falling back to memory cache: "+t),await ua(n,new po)}}else j(Ln,"Using default OfflineComponentProvider"),await ua(n,new Ty(void 0));return n._offlineComponents}async function _d(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(j(Ln,"Using user provided OnlineComponentProvider"),await cu(n,n._uninitializedComponentsProvider._online)):(j(Ln,"Using default OnlineComponentProvider"),await cu(n,new Fa))),n._onlineComponents}function Sy(n){return _d(n).then((e=>e.syncEngine))}async function go(n){const e=await _d(n),t=e.eventManager;return t.onListen=ly.bind(null,e.syncEngine),t.onUnlisten=dy.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=uy.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=fy.bind(null,e.syncEngine),t}function by(n,e,t={}){const s=new on;return n.asyncQueue.enqueueAndForget((async()=>(function(o,a,l,h,d){const m=new Ic({next:_=>{m.Ou(),a.enqueueAndForget((()=>gc(o,g)));const R=_.docs.has(l);!R&&_.fromCache?d.reject(new q(O.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&_.fromCache&&h&&h.source==="server"?d.reject(new q(O.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(_)},error:_=>d.reject(_)}),g=new yc(wo(l.path),m,{includeMetadataChanges:!0,ka:!0});return pc(o,g)})(await go(n),n.asyncQueue,e,t,s))),s.promise}function Ry(n,e,t={}){const s=new on;return n.asyncQueue.enqueueAndForget((async()=>(function(o,a,l,h,d){const m=new Ic({next:_=>{m.Ou(),a.enqueueAndForget((()=>gc(o,g))),_.fromCache&&h.source==="server"?d.reject(new q(O.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(_)},error:_=>d.reject(_)}),g=new yc(l,m,{includeMetadataChanges:!0,ka:!0});return pc(o,g)})(await go(n),n.asyncQueue,e,t,s))),s.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yd(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lu=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vd="firestore.googleapis.com",uu=!0;class hu{constructor(e){var t,s;if(e.host===void 0){if(e.ssl!==void 0)throw new q(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=vd,this.ssl=uu}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:uu;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Jh;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<i_)throw new q(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}jp("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=yd((s=e.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),(function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new q(O.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new q(O.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new q(O.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(s,r){return s.timeoutSeconds===r.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Oo{constructor(e,t,s,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new hu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new q(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new q(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new hu(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(s){if(!s)return new xp;switch(s.type){case"firstParty":return new Fp(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new q(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const s=lu.get(t);s&&(j("ComponentProvider","Removing Datastore"),lu.delete(t),s.terminate())})(this),Promise.resolve()}}function Cy(n,e,t,s={}){var r;n=Dt(n,Oo);const o=ja(e),a=n._getSettings(),l=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),h=`${e}:${t}`;o&&(am(`https://${h}`),hm("Firestore",!0)),a.host!==vd&&a.host!==h&&Vn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const d=Object.assign(Object.assign({},a),{host:h,ssl:o,emulatorOptions:s});if(!io(d,l)&&(n._setSettings(d),s.mockUserToken)){let m,g;if(typeof s.mockUserToken=="string")m=s.mockUserToken,g=Xe.MOCK_USER;else{m=cm(s.mockUserToken,(r=n._app)===null||r===void 0?void 0:r.options.projectId);const _=s.mockUserToken.sub||s.mockUserToken.user_id;if(!_)throw new q(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new Xe(_)}n._authCredentials=new kp(new ch(m,g))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new qn(this.firestore,e,this._query)}}class Re{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Dn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Re(this.firestore,e,this._key)}toJSON(){return{type:Re._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,s){if(fi(t,Re._jsonSchema))return new Re(e,s||null,new W(Ee.fromString(t.referencePath)))}}Re._jsonSchemaVersion="firestore/documentReference/1.0",Re._jsonSchema={type:Oe("string",Re._jsonSchemaVersion),referencePath:Oe("string")};class Dn extends qn{constructor(e,t,s){super(e,t,wo(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Re(this.firestore,null,new W(e))}withConverter(e){return new Dn(this.firestore,e,this._path)}}function Wi(n,e,...t){if(n=pt(n),uh("collection","path",e),n instanceof Oo){const s=Ee.fromString(e,...t);return wl(s),new Dn(n,null,s)}{if(!(n instanceof Re||n instanceof Dn))throw new q(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(Ee.fromString(e,...t));return wl(s),new Dn(n.firestore,null,s)}}function Mr(n,e,...t){if(n=pt(n),arguments.length===1&&(e=Wa.newId()),uh("doc","path",e),n instanceof Oo){const s=Ee.fromString(e,...t);return Al(s),new Re(n,null,new W(s))}{if(!(n instanceof Re||n instanceof Dn))throw new q(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(Ee.fromString(e,...t));return Al(s),new Re(n.firestore,n instanceof Dn?n.converter:null,new W(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du="AsyncQueue";class fu{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new td(this,"async_queue_retry"),this.oc=()=>{const s=la();s&&j(du,"Visibility state changed to "+s.visibilityState),this.F_.y_()},this._c=e;const t=la();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=la();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise((()=>{}));const t=new on;return this.uc((()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Zu.push(e),this.cc())))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!ir(e))throw e;j(du,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_((()=>this.cc()))}}uc(e){const t=this._c.then((()=>(this.nc=!0,e().catch((s=>{throw this.tc=s,this.nc=!1,ln("INTERNAL UNHANDLED ERROR: ",mu(s)),s})).then((s=>(this.nc=!1,s))))));return this._c=t,t}enqueueAfterDelay(e,t,s){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const r=fc.createAndSchedule(this,e,t,s,(o=>this.lc(o)));return this.ec.push(r),r}ac(){this.tc&&Y(47125,{hc:mu(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then((()=>{this.ec.sort(((t,s)=>t.targetTimeMs-s.targetTimeMs));for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()}))}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function mu(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pu(n){return(function(t,s){if(typeof t!="object"||t===null)return!1;const r=t;for(const o of s)if(o in r&&typeof r[o]=="function")return!0;return!1})(n,["next","error","complete"])}class ps extends Oo{constructor(e,t,s,r){super(e,t,s,r),this.type="firestore",this._queue=new fu,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new fu(e),this._firestoreClient=void 0,await e}}}function Dy(n,e){const t=typeof n=="object"?n:Xu(),s=typeof n=="string"?n:ao,r=Ga(t,"firestore").getImmediate({identifier:s});if(!r._initialized){const o=im("firestore");o&&Cy(r,...o)}return r}function yi(n){if(n._terminated)throw new q(O.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Py(n),n._firestoreClient}function Py(n){var e,t,s;const r=n._freezeSettings(),o=(function(l,h,d,m){return new eg(l,h,d,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,yd(m.experimentalLongPollingOptions),m.useFetchStreams,m.isUsingEmulator)})(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,r);n._componentsProvider||!((t=r.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((s=r.localCache)===null||s===void 0)&&s._onlineComponentProvider)&&(n._componentsProvider={_offline:r.localCache._offlineComponentProvider,_online:r.localCache._onlineComponentProvider}),n._firestoreClient=new Ay(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&(function(l){const h=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(h),_online:h}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Tt(We.fromBase64String(e))}catch(t){throw new q(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Tt(We.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Tt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(fi(e,Tt._jsonSchema))return Tt.fromBase64String(e.bytes)}}Tt._jsonSchemaVersion="firestore/bytes/1.0",Tt._jsonSchema={type:Oe("string",Tt._jsonSchemaVersion),bytes:Oe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new q(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ke(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new q(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new q(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ee(this._lat,e._lat)||ee(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Gt._jsonSchemaVersion}}static fromJSON(e){if(fi(e,Gt._jsonSchema))return new Gt(e.latitude,e.longitude)}}Gt._jsonSchemaVersion="firestore/geoPoint/1.0",Gt._jsonSchema={type:Oe("string",Gt._jsonSchemaVersion),latitude:Oe("number"),longitude:Oe("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(s,r){if(s.length!==r.length)return!1;for(let o=0;o<s.length;++o)if(s[o]!==r[o])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Kt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(fi(e,Kt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Kt(e.vectorValues);throw new q(O.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Kt._jsonSchemaVersion="firestore/vectorValue/1.0",Kt._jsonSchema={type:Oe("string",Kt._jsonSchemaVersion),vectorValues:Oe("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vy=/^__.*__$/;class Ny{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return this.fieldMask!==null?new Bn(e,this.data,this.fieldMask,t,this.fieldTransforms):new mi(e,this.data,t,this.fieldTransforms)}}class Ed{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return new Bn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Id(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Y(40011,{Ec:n})}}class Tc{constructor(e,t,s,r,o,a){this.settings=e,this.databaseId=t,this.serializer=s,this.ignoreUndefinedProperties=r,o===void 0&&this.Ac(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new Tc(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const s=(t=this.path)===null||t===void 0?void 0:t.child(e),r=this.Rc({path:s,mc:!1});return r.fc(e),r}gc(e){var t;const s=(t=this.path)===null||t===void 0?void 0:t.child(e),r=this.Rc({path:s,mc:!1});return r.Ac(),r}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return _o(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(Id(this.Ec)&&Vy.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class Oy{constructor(e,t,s){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=s||Po(e)}Dc(e,t,s,r=!1){return new Tc({Ec:e,methodName:t,bc:s,path:Ke.emptyPath(),mc:!1,Sc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ac(n){const e=n._freezeSettings(),t=Po(n._databaseId);return new Oy(n._databaseId,!!e.ignoreUndefinedProperties,t)}function xy(n,e,t,s,r,o={}){const a=n.Dc(o.merge||o.mergeFields?2:0,e,t,r);Sc("Data must be an object, but it was:",a,s);const l=wd(s,a);let h,d;if(o.merge)h=new mt(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const m=[];for(const g of o.mergeFields){const _=$a(e,g,t);if(!a.contains(_))throw new q(O.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);bd(m,_)||m.push(_)}h=new mt(m),d=a.fieldTransforms.filter((g=>h.covers(g.field)))}else h=null,d=a.fieldTransforms;return new Ny(new ut(l),h,d)}class ko extends xo{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ko}}class wc extends xo{_toFieldTransform(e){return new bg(e.path,new ui)}isEqual(e){return e instanceof wc}}function Td(n,e,t,s){const r=n.Dc(1,e,t);Sc("Data must be an object, but it was:",r,s);const o=[],a=ut.empty();$n(s,((h,d)=>{const m=bc(e,h,t);d=pt(d);const g=r.gc(m);if(d instanceof ko)o.push(m);else{const _=Ei(d,g);_!=null&&(o.push(m),a.set(m,_))}}));const l=new mt(o);return new Ed(a,l,r.fieldTransforms)}function Ad(n,e,t,s,r,o){const a=n.Dc(1,e,t),l=[$a(e,s,t)],h=[r];if(o.length%2!=0)throw new q(O.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<o.length;_+=2)l.push($a(e,o[_])),h.push(o[_+1]);const d=[],m=ut.empty();for(let _=l.length-1;_>=0;--_)if(!bd(d,l[_])){const R=l[_];let D=h[_];D=pt(D);const k=a.gc(R);if(D instanceof ko)d.push(R);else{const A=Ei(D,k);A!=null&&(d.push(R),m.set(R,A))}}const g=new mt(d);return new Ed(m,g,a.fieldTransforms)}function ky(n,e,t,s=!1){return Ei(t,n.Dc(s?4:3,e))}function Ei(n,e){if(Sd(n=pt(n)))return Sc("Unsupported field value:",e,n),wd(n,e);if(n instanceof xo)return(function(s,r){if(!Id(r.Ec))throw r.wc(`${s._methodName}() can only be used with update() and set()`);if(!r.path)throw r.wc(`${s._methodName}() is not currently supported inside arrays`);const o=s._toFieldTransform(r);o&&r.fieldTransforms.push(o)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return(function(s,r){const o=[];let a=0;for(const l of s){let h=Ei(l,r.yc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}})(n,e)}return(function(s,r){if((s=pt(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return Ag(r.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const o=Ie.fromDate(s);return{timestampValue:ho(r.serializer,o)}}if(s instanceof Ie){const o=new Ie(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:ho(r.serializer,o)}}if(s instanceof Gt)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Tt)return{bytesValue:zh(r.serializer,s._byteString)};if(s instanceof Re){const o=r.databaseId,a=s.firestore._databaseId;if(!a.isEqual(o))throw r.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:rc(s.firestore._databaseId||r.databaseId,s._key.path)}}if(s instanceof Kt)return(function(a,l){return{mapValue:{fields:{[vh]:{stringValue:Eh},[co]:{arrayValue:{values:a.toArray().map((d=>{if(typeof d!="number")throw l.wc("VectorValues must only contain numeric values.");return ec(l.serializer,d)}))}}}}}})(s,r);throw r.wc(`Unsupported field value: ${Eo(s)}`)})(n,e)}function wd(n,e){const t={};return fh(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):$n(n,((s,r)=>{const o=Ei(r,e.Vc(s));o!=null&&(t[s]=o)})),{mapValue:{fields:t}}}function Sd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ie||n instanceof Gt||n instanceof Tt||n instanceof Re||n instanceof xo||n instanceof Kt)}function Sc(n,e,t){if(!Sd(t)||!hh(t)){const s=Eo(t);throw s==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+s)}}function $a(n,e,t){if((e=pt(e))instanceof vi)return e._internalPath;if(typeof e=="string")return bc(n,e);throw _o("Field path arguments must be of type string or ",n,!1,void 0,t)}const My=new RegExp("[~\\*/\\[\\]]");function bc(n,e,t){if(e.search(My)>=0)throw _o(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new vi(...e.split("."))._internalPath}catch{throw _o(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function _o(n,e,t,s,r){const o=s&&!s.isEmpty(),a=r!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${s}`),a&&(h+=` in document ${r}`),h+=")"),new q(O.INVALID_ARGUMENT,l+n+h)}function bd(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rd{constructor(e,t,s,r,o){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=r,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Re(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Ly(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Rc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Ly extends Rd{data(){return super.data()}}function Rc(n,e){return typeof e=="string"?bc(n,e):e instanceof vi?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cd(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new q(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Cc{}class Dd extends Cc{}function Fy(n,e,...t){let s=[];e instanceof Cc&&s.push(e),s=s.concat(t),(function(o){const a=o.filter((h=>h instanceof Pc)).length,l=o.filter((h=>h instanceof Dc)).length;if(a>1||a>0&&l>0)throw new q(O.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(s);for(const r of s)n=r._apply(n);return n}class Dc extends Dd{constructor(e,t,s){super(),this._field=e,this._op=t,this._value=s,this.type="where"}static _create(e,t,s){return new Dc(e,t,s)}_apply(e){const t=this._parse(e);return Pd(e._query,t),new qn(e.firestore,e.converter,Ca(e._query,t))}_parse(e){const t=Ac(e.firestore);return(function(o,a,l,h,d,m,g){let _;if(d.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new q(O.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){_u(g,m);const D=[];for(const k of g)D.push(gu(h,o,k));_={arrayValue:{values:D}}}else _=gu(h,o,g)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||_u(g,m),_=ky(l,a,g,m==="in"||m==="not-in");return Ne.create(d,m,_)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class Pc extends Cc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Pc(e,t)}_parse(e){const t=this._queryConstraints.map((s=>s._parse(e))).filter((s=>s.getFilters().length>0));return t.length===1?t[0]:Pt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(r,o){let a=r;const l=o.getFlattenedFilters();for(const h of l)Pd(a,h),a=Ca(a,h)})(e._query,t),new qn(e.firestore,e.converter,Ca(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Vc extends Dd{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Vc(e,t)}_apply(e){const t=(function(r,o,a){if(r.startAt!==null)throw new q(O.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new q(O.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new li(o,a)})(e._query,this._field,this._direction);return new qn(e.firestore,e.converter,(function(r,o){const a=r.explicitOrderBy.concat([o]);return new or(r.path,r.collectionGroup,a,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)})(e._query,t))}}function $y(n,e="asc"){const t=e,s=Rc("orderBy",n);return Vc._create(s,t)}function gu(n,e,t){if(typeof(t=pt(t))=="string"){if(t==="")throw new q(O.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ch(e)&&t.indexOf("/")!==-1)throw new q(O.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const s=e.path.child(Ee.fromString(t));if(!W.isDocumentKey(s))throw new q(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return Nl(n,new W(s))}if(t instanceof Re)return Nl(n,t._key);throw new q(O.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Eo(t)}.`)}function _u(n,e){if(!Array.isArray(n)||n.length===0)throw new q(O.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Pd(n,e){const t=(function(r,o){for(const a of r)for(const l of a.getFlattenedFilters())if(o.indexOf(l.op)>=0)return l.op;return null})(n.filters,(function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new q(O.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new q(O.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class By{convertValue(e,t="none"){switch(kn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return be(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(xn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw Y(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const s={};return $n(e,((r,o)=>{s[r]=this.convertValue(o,t)})),s}convertVectorValue(e){var t,s,r;const o=(r=(s=(t=e.fields)===null||t===void 0?void 0:t[co].arrayValue)===null||s===void 0?void 0:s.values)===null||r===void 0?void 0:r.map((a=>be(a.doubleValue)));return new Kt(o)}convertGeoPoint(e){return new Gt(be(e.latitude),be(e.longitude))}convertArray(e,t){return(e.values||[]).map((s=>this.convertValue(s,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const s=Ao(e);return s==null?null:this.convertValue(s,t);case"estimate":return this.convertTimestamp(oi(e));default:return null}}convertTimestamp(e){const t=On(e);return new Ie(t.seconds,t.nanos)}convertDocumentKey(e,t){const s=Ee.fromString(e);pe(Yh(s),9688,{name:e});const r=new ai(s.get(1),s.get(3)),o=new W(s.popFirst(5));return r.isEqual(t)||ln(`Document ${o} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qy(n,e,t){let s;return s=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,s}class zr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class hs extends Rd{constructor(e,t,s,r,o,a){super(e,t,s,r,a),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new no(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const s=this._document.data.field(Rc("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new q(O.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=hs._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}hs._jsonSchemaVersion="firestore/documentSnapshot/1.0",hs._jsonSchema={type:Oe("string",hs._jsonSchemaVersion),bundleSource:Oe("string","DocumentSnapshot"),bundleName:Oe("string"),bundle:Oe("string")};class no extends hs{data(e={}){return super.data(e)}}class ds{constructor(e,t,s,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new zr(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((s=>{e.call(t,new no(this._firestore,this._userDataWriter,s.key,s,new zr(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new q(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(r,o){if(r._snapshot.oldDocs.isEmpty()){let a=0;return r._snapshot.docChanges.map((l=>{const h=new no(r._firestore,r._userDataWriter,l.doc.key,l.doc,new zr(r._snapshot.mutatedKeys.has(l.doc.key),r._snapshot.fromCache),r.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}}))}{let a=r._snapshot.oldDocs;return r._snapshot.docChanges.filter((l=>o||l.type!==3)).map((l=>{const h=new no(r._firestore,r._userDataWriter,l.doc.key,l.doc,new zr(r._snapshot.mutatedKeys.has(l.doc.key),r._snapshot.fromCache),r.query.converter);let d=-1,m=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),m=a.indexOf(l.doc.key)),{type:Uy(l.type),doc:h,oldIndex:d,newIndex:m}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new q(O.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=ds._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Wa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],s=[],r=[];return this.docs.forEach((o=>{o._document!==null&&(t.push(o._document),s.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),r.push(o.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Uy(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Y(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zs(n){n=Dt(n,Re);const e=Dt(n.firestore,ps);return by(yi(e),n._key).then((t=>Nd(e,n,t)))}ds._jsonSchemaVersion="firestore/querySnapshot/1.0",ds._jsonSchema={type:Oe("string",ds._jsonSchemaVersion),bundleSource:Oe("string","QuerySnapshot"),bundleName:Oe("string"),bundle:Oe("string")};class Nc extends By{constructor(e){super(),this.firestore=e}convertBytes(e){return new Tt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Re(this.firestore,null,t)}}function os(n){n=Dt(n,qn);const e=Dt(n.firestore,ps),t=yi(e),s=new Nc(e);return Cd(n._query),Ry(t,n._query).then((r=>new ds(e,s,n,r)))}function yu(n,e,t,...s){n=Dt(n,Re);const r=Dt(n.firestore,ps),o=Ac(r);let a;return a=typeof(e=pt(e))=="string"||e instanceof vi?Ad(o,"updateDoc",n._key,e,t,s):Td(o,"updateDoc",n._key,e),Vd(r,[a.toMutation(n._key,At.exists(!0))])}function Lr(n,...e){var t,s,r;n=pt(n);let o={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||pu(e[a])||(o=e[a++]);const l={includeMetadataChanges:o.includeMetadataChanges,source:o.source};if(pu(e[a])){const g=e[a];e[a]=(t=g.next)===null||t===void 0?void 0:t.bind(g),e[a+1]=(s=g.error)===null||s===void 0?void 0:s.bind(g),e[a+2]=(r=g.complete)===null||r===void 0?void 0:r.bind(g)}let h,d,m;if(n instanceof Re)d=Dt(n.firestore,ps),m=wo(n._key.path),h={next:g=>{e[a]&&e[a](Nd(d,n,g))},error:e[a+1],complete:e[a+2]};else{const g=Dt(n,qn);d=Dt(g.firestore,ps),m=g._query;const _=new Nc(d);h={next:R=>{e[a]&&e[a](new ds(d,_,g,R))},error:e[a+1],complete:e[a+2]},Cd(n._query)}return(function(_,R,D,k){const A=new Ic(k),N=new yc(R,A,D);return _.asyncQueue.enqueueAndForget((async()=>pc(await go(_),N))),()=>{A.Ou(),_.asyncQueue.enqueueAndForget((async()=>gc(await go(_),N)))}})(yi(d),m,l,h)}function Vd(n,e){return(function(s,r){const o=new on;return s.asyncQueue.enqueueAndForget((async()=>my(await Sy(s),r,o))),o.promise})(yi(n),e)}function Nd(n,e,t){const s=t.docs.get(e._key),r=new Nc(n);return new hs(n,r,e._key,s,new zr(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Ac(e)}set(e,t,s){this._verifyNotCommitted();const r=ha(e,this._firestore),o=qy(r.converter,t,s),a=xy(this._dataReader,"WriteBatch.set",r._key,o,r.converter!==null,s);return this._mutations.push(a.toMutation(r._key,At.none())),this}update(e,t,s,...r){this._verifyNotCommitted();const o=ha(e,this._firestore);let a;return a=typeof(t=pt(t))=="string"||t instanceof vi?Ad(this._dataReader,"WriteBatch.update",o._key,t,s,r):Td(this._dataReader,"WriteBatch.update",o._key,t),this._mutations.push(a.toMutation(o._key,At.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=ha(e,this._firestore);return this._mutations=this._mutations.concat(new tc(t._key,At.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new q(O.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function ha(n,e){if((n=pt(n)).firestore!==e)throw new q(O.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function Hs(){return new wc("serverTimestamp")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qi(n){return yi(n=Dt(n,ps)),new jy(n,(e=>Vd(n,e)))}(function(e,t=!0){(function(r){sr=r})(Tp),Pn(new an("firestore",((s,{instanceIdentifier:r,options:o})=>{const a=s.getProvider("app").getImmediate(),l=new ps(new Mp(s.getProvider("auth-internal")),new $p(a,s.getProvider("app-check-internal")),(function(d,m){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new q(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ai(d.options.projectId,m)})(a,r),a);return o=Object.assign({useFetchStreams:t},o),l._setSettings(o),l}),"PUBLIC").setMultipleInstances(!0)),jt(yl,vl,e),jt(yl,vl,"esm2017")})();var zy="firebase",Hy="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */jt(zy,Hy,"app");const Od="@firebase/installations",Oc="0.6.18";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xd=1e4,kd=`w:${Oc}`,Md="FIS_v2",Gy="https://firebaseinstallations.googleapis.com/v1",Ky=3600*1e3,Wy="installations",Qy="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yy={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},gs=new vo(Wy,Qy,Yy);function Ld(n){return n instanceof Fn&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fd({projectId:n}){return`${Gy}/projects/${n}/installations`}function $d(n){return{token:n.token,requestStatus:2,expiresIn:Xy(n.expiresIn),creationTime:Date.now()}}async function Bd(n,e){const s=(await e.json()).error;return gs.create("request-failed",{requestName:n,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function qd({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function Jy(n,{refreshToken:e}){const t=qd(n);return t.append("Authorization",Zy(e)),t}async function Ud(n){const e=await n();return e.status>=500&&e.status<600?n():e}function Xy(n){return Number(n.replace("s","000"))}function Zy(n){return`${Md} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ev({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const s=Fd(n),r=qd(n),o=e.getImmediate({optional:!0});if(o){const d=await o.getHeartbeatsHeader();d&&r.append("x-firebase-client",d)}const a={fid:t,authVersion:Md,appId:n.appId,sdkVersion:kd},l={method:"POST",headers:r,body:JSON.stringify(a)},h=await Ud(()=>fetch(s,l));if(h.ok){const d=await h.json();return{fid:d.fid||t,registrationStatus:2,refreshToken:d.refreshToken,authToken:$d(d.authToken)}}else throw await Bd("Create Installation",h)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jd(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tv(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nv=/^[cdef][\w-]{21}$/,Ba="";function sv(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=rv(n);return nv.test(t)?t:Ba}catch{return Ba}}function rv(n){return tv(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mo(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zd=new Map;function Hd(n,e){const t=Mo(n);Gd(t,e),iv(t,e)}function Gd(n,e){const t=zd.get(n);if(t)for(const s of t)s(e)}function iv(n,e){const t=ov();t&&t.postMessage({key:n,fid:e}),av()}let us=null;function ov(){return!us&&"BroadcastChannel"in self&&(us=new BroadcastChannel("[Firebase] FID Change"),us.onmessage=n=>{Gd(n.data.key,n.data.fid)}),us}function av(){zd.size===0&&us&&(us.close(),us=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cv="firebase-installations-database",lv=1,_s="firebase-installations-store";let da=null;function xc(){return da||(da=Yu(cv,lv,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(_s)}}})),da}async function yo(n,e){const t=Mo(n),r=(await xc()).transaction(_s,"readwrite"),o=r.objectStore(_s),a=await o.get(t);return await o.put(e,t),await r.done,(!a||a.fid!==e.fid)&&Hd(n,e.fid),e}async function Kd(n){const e=Mo(n),s=(await xc()).transaction(_s,"readwrite");await s.objectStore(_s).delete(e),await s.done}async function Lo(n,e){const t=Mo(n),r=(await xc()).transaction(_s,"readwrite"),o=r.objectStore(_s),a=await o.get(t),l=e(a);return l===void 0?await o.delete(t):await o.put(l,t),await r.done,l&&(!a||a.fid!==l.fid)&&Hd(n,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kc(n){let e;const t=await Lo(n.appConfig,s=>{const r=uv(s),o=hv(n,r);return e=o.registrationPromise,o.installationEntry});return t.fid===Ba?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function uv(n){const e=n||{fid:sv(),registrationStatus:0};return Wd(e)}function hv(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const r=Promise.reject(gs.create("app-offline"));return{installationEntry:e,registrationPromise:r}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=dv(n,t);return{installationEntry:t,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:fv(n)}:{installationEntry:e}}async function dv(n,e){try{const t=await ev(n,e);return yo(n.appConfig,t)}catch(t){throw Ld(t)&&t.customData.serverCode===409?await Kd(n.appConfig):await yo(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function fv(n){let e=await vu(n.appConfig);for(;e.registrationStatus===1;)await jd(100),e=await vu(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:s}=await kc(n);return s||t}return e}function vu(n){return Lo(n,e=>{if(!e)throw gs.create("installation-not-found");return Wd(e)})}function Wd(n){return mv(n)?{fid:n.fid,registrationStatus:0}:n}function mv(n){return n.registrationStatus===1&&n.registrationTime+xd<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pv({appConfig:n,heartbeatServiceProvider:e},t){const s=gv(n,t),r=Jy(n,t),o=e.getImmediate({optional:!0});if(o){const d=await o.getHeartbeatsHeader();d&&r.append("x-firebase-client",d)}const a={installation:{sdkVersion:kd,appId:n.appId}},l={method:"POST",headers:r,body:JSON.stringify(a)},h=await Ud(()=>fetch(s,l));if(h.ok){const d=await h.json();return $d(d)}else throw await Bd("Generate Auth Token",h)}function gv(n,{fid:e}){return`${Fd(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mc(n,e=!1){let t;const s=await Lo(n.appConfig,o=>{if(!Qd(o))throw gs.create("not-registered");const a=o.authToken;if(!e&&vv(a))return o;if(a.requestStatus===1)return t=_v(n,e),o;{if(!navigator.onLine)throw gs.create("app-offline");const l=Iv(o);return t=yv(n,l),l}});return t?await t:s.authToken}async function _v(n,e){let t=await Eu(n.appConfig);for(;t.authToken.requestStatus===1;)await jd(100),t=await Eu(n.appConfig);const s=t.authToken;return s.requestStatus===0?Mc(n,e):s}function Eu(n){return Lo(n,e=>{if(!Qd(e))throw gs.create("not-registered");const t=e.authToken;return Tv(t)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function yv(n,e){try{const t=await pv(n,e),s=Object.assign(Object.assign({},e),{authToken:t});return await yo(n.appConfig,s),t}catch(t){if(Ld(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await Kd(n.appConfig);else{const s=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await yo(n.appConfig,s)}throw t}}function Qd(n){return n!==void 0&&n.registrationStatus===2}function vv(n){return n.requestStatus===2&&!Ev(n)}function Ev(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+Ky}function Iv(n){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},n),{authToken:e})}function Tv(n){return n.requestStatus===1&&n.requestTime+xd<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Av(n){const e=n,{installationEntry:t,registrationPromise:s}=await kc(e);return s?s.catch(console.error):Mc(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wv(n,e=!1){const t=n;return await Sv(t),(await Mc(t,e)).token}async function Sv(n){const{registrationPromise:e}=await kc(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bv(n){if(!n||!n.options)throw fa("App Configuration");if(!n.name)throw fa("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw fa(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function fa(n){return gs.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yd="installations",Rv="installations-internal",Cv=n=>{const e=n.getProvider("app").getImmediate(),t=bv(e),s=Ga(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},Dv=n=>{const e=n.getProvider("app").getImmediate(),t=Ga(e,Yd).getImmediate();return{getId:()=>Av(t),getToken:r=>wv(t,r)}};function Pv(){Pn(new an(Yd,Cv,"PUBLIC")),Pn(new an(Rv,Dv,"PRIVATE"))}Pv();jt(Od,Oc);jt(Od,Oc,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iu="analytics",Vv="firebase_id",Nv="origin",Ov=60*1e3,xv="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Lc="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht=new za("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kv={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},wt=new vo("analytics","Analytics",kv);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mv(n){if(!n.startsWith(Lc)){const e=wt.create("invalid-gtag-resource",{gtagURL:n});return ht.warn(e.message),""}return n}function Jd(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function Lv(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function Fv(n,e){const t=Lv("firebase-js-sdk-policy",{createScriptURL:Mv}),s=document.createElement("script"),r=`${Lc}?l=${n}&id=${e}`;s.src=t?t==null?void 0:t.createScriptURL(r):r,s.async=!0,document.head.appendChild(s)}function $v(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function Bv(n,e,t,s,r,o){const a=s[r];try{if(a)await e[a];else{const h=(await Jd(t)).find(d=>d.measurementId===r);h&&await e[h.appId]}}catch(l){ht.error(l)}n("config",r,o)}async function qv(n,e,t,s,r){try{let o=[];if(r&&r.send_to){let a=r.send_to;Array.isArray(a)||(a=[a]);const l=await Jd(t);for(const h of a){const d=l.find(g=>g.measurementId===h),m=d&&e[d.appId];if(m)o.push(m);else{o=[];break}}}o.length===0&&(o=Object.values(e)),await Promise.all(o),n("event",s,r||{})}catch(o){ht.error(o)}}function Uv(n,e,t,s){async function r(o,...a){try{if(o==="event"){const[l,h]=a;await qv(n,e,t,l,h)}else if(o==="config"){const[l,h]=a;await Bv(n,e,t,s,l,h)}else if(o==="consent"){const[l,h]=a;n("consent",l,h)}else if(o==="get"){const[l,h,d]=a;n("get",l,h,d)}else if(o==="set"){const[l]=a;n("set",l)}else n(o,...a)}catch(l){ht.error(l)}}return r}function jv(n,e,t,s,r){let o=function(...a){window[s].push(arguments)};return window[r]&&typeof window[r]=="function"&&(o=window[r]),window[r]=Uv(o,n,e,t),{gtagCore:o,wrappedGtag:window[r]}}function zv(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(Lc)&&t.src.includes(n))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hv=30,Gv=1e3;class Kv{constructor(e={},t=Gv){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Xd=new Kv;function Wv(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function Qv(n){var e;const{appId:t,apiKey:s}=n,r={method:"GET",headers:Wv(s)},o=xv.replace("{app-id}",t),a=await fetch(o,r);if(a.status!==200&&a.status!==304){let l="";try{const h=await a.json();!((e=h.error)===null||e===void 0)&&e.message&&(l=h.error.message)}catch{}throw wt.create("config-fetch-failed",{httpStatus:a.status,responseMessage:l})}return a.json()}async function Yv(n,e=Xd,t){const{appId:s,apiKey:r,measurementId:o}=n.options;if(!s)throw wt.create("no-app-id");if(!r){if(o)return{measurementId:o,appId:s};throw wt.create("no-api-key")}const a=e.getThrottleMetadata(s)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new Zv;return setTimeout(async()=>{l.abort()},Ov),Zd({appId:s,apiKey:r,measurementId:o},a,l,e)}async function Zd(n,{throttleEndTimeMillis:e,backoffCount:t},s,r=Xd){var o;const{appId:a,measurementId:l}=n;try{await Jv(s,e)}catch(h){if(l)return ht.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${h==null?void 0:h.message}]`),{appId:a,measurementId:l};throw h}try{const h=await Qv(n);return r.deleteThrottleMetadata(a),h}catch(h){const d=h;if(!Xv(d)){if(r.deleteThrottleMetadata(a),l)return ht.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${d==null?void 0:d.message}]`),{appId:a,measurementId:l};throw h}const m=Number((o=d==null?void 0:d.customData)===null||o===void 0?void 0:o.httpStatus)===503?cl(t,r.intervalMillis,Hv):cl(t,r.intervalMillis),g={throttleEndTimeMillis:Date.now()+m,backoffCount:t+1};return r.setThrottleMetadata(a,g),ht.debug(`Calling attemptFetch again in ${m} millis`),Zd(n,g,s,r)}}function Jv(n,e){return new Promise((t,s)=>{const r=Math.max(e-Date.now(),0),o=setTimeout(t,r);n.addEventListener(()=>{clearTimeout(o),s(wt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Xv(n){if(!(n instanceof Fn)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class Zv{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function eE(n,e,t,s,r){if(r&&r.global){n("event",t,s);return}else{const o=await e,a=Object.assign(Object.assign({},s),{send_to:o});n("event",t,a)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tE(){if(Gu())try{await Ku()}catch(n){return ht.warn(wt.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return ht.warn(wt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function nE(n,e,t,s,r,o,a){var l;const h=Yv(n);h.then(R=>{t[R.measurementId]=R.appId,n.options.measurementId&&R.measurementId!==n.options.measurementId&&ht.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${R.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(R=>ht.error(R)),e.push(h);const d=tE().then(R=>{if(R)return s.getId()}),[m,g]=await Promise.all([h,d]);zv(o)||Fv(o,m.measurementId),r("js",new Date);const _=(l=a==null?void 0:a.config)!==null&&l!==void 0?l:{};return _[Nv]="firebase",_.update=!0,g!=null&&(_[Vv]=g),r("config",m.measurementId,_),m.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(e){this.app=e}_delete(){return delete ti[this.app.options.appId],Promise.resolve()}}let ti={},Tu=[];const Au={};let ma="dataLayer",rE="gtag",wu,ef,Su=!1;function iE(){const n=[];if(mm()&&n.push("This is a browser extension environment."),gm()||n.push("Cookies are not available."),n.length>0){const e=n.map((s,r)=>`(${r+1}) ${s}`).join(" "),t=wt.create("invalid-analytics-context",{errorInfo:e});ht.warn(t.message)}}function oE(n,e,t){iE();const s=n.options.appId;if(!s)throw wt.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)ht.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw wt.create("no-api-key");if(ti[s]!=null)throw wt.create("already-exists",{id:s});if(!Su){$v(ma);const{wrappedGtag:o,gtagCore:a}=jv(ti,Tu,Au,ma,rE);ef=o,wu=a,Su=!0}return ti[s]=nE(n,Tu,Au,e,wu,ma,t),new sE(n)}function aE(n,e,t,s){n=pt(n),eE(ef,ti[n.app.options.appId],e,t,s).catch(r=>ht.error(r))}const bu="@firebase/analytics",Ru="0.10.17";function cE(){Pn(new an(Iu,(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();return oE(s,r,t)},"PUBLIC")),Pn(new an("analytics-internal",n,"PRIVATE")),jt(bu,Ru),jt(bu,Ru,"esm2017");function n(e){try{const t=e.getProvider(Iu).getImmediate();return{logEvent:(s,r,o)=>aE(t,s,r,o)}}catch(t){throw wt.create("interop-component-reg-failed",{reason:t})}}}cE();const Cu={},qt=typeof import.meta<"u"&&Cu?Cu:{},Hr=!!(qt.VITE_FIREBASE_API_KEY&&qt.VITE_FIREBASE_PROJECT_ID),tf={apiKey:qt.VITE_FIREBASE_API_KEY||"demo-api-key",authDomain:qt.VITE_FIREBASE_AUTH_DOMAIN||"demo-mousetrapbingo.firebaseapp.com",projectId:qt.VITE_FIREBASE_PROJECT_ID||"demo-mousetrapbingo",storageBucket:qt.VITE_FIREBASE_STORAGE_BUCKET||"demo-mousetrapbingo.appspot.com",messagingSenderId:qt.VITE_FIREBASE_MESSAGING_SENDER_ID||"000000000000",appId:qt.VITE_FIREBASE_APP_ID||"1:000000000000:web:000000000000"};qt.VITE_FIREBASE_MEASUREMENT_ID&&(tf.measurementId=qt.VITE_FIREBASE_MEASUREMENT_ID);const lE=Ap().length?Xu():Ju(tf),Du=Dy(lE),Se="bingo",Gr="default",Pe=Object.freeze({CARDING:"carding",RESULTS:"results",SCORES:"scores",LOGS:"logs"}),oe=Object.freeze({LOBBY:"lobby",LIVE:"live",FINISHED:"finished"}),me=Object.freeze({NOT_IN_BOARD:-1,UNMARKED:0,MATCHED:1}),K=Object.freeze({SESSION_STARTED:"session_started",DB_INITIALIZED:"db_initialized",PLAYER_INITIALIZED:"player_initialized",CARDS_INITIALIZED:"cards_initialized",EVENT_OCCURRED:"event_occurred",SUBCOLLECTIONS_UPDATED:"subcollections_updated",BOARD_COMPLETED:"board_completed",SESSION_FINISHED:"session_finished"}),$t=Object.freeze({[K.SESSION_STARTED]:"Sessão iniciada",[K.DB_INITIALIZED]:"DB inicializada",[K.PLAYER_INITIALIZED]:"Jogadores inicializados",[K.CARDS_INITIALIZED]:"Cartelas inicializadas",[K.EVENT_OCCURRED]:"Ocorrência prevista em cartela",[K.SUBCOLLECTIONS_UPDATED]:"Atualização de subcoleções e documentos",[K.BOARD_COMPLETED]:"Fechamento de cartela",[K.SESSION_FINISHED]:"Encerramento de sessão"}),ni=new Map,Kr=new Map;let Pu=0;function Fc(n){return`mousetrapbingo_state_${n}`}function rn(n){if(!ni.has(n)){let e=null;if(typeof window<"u"&&window.localStorage)try{const t=window.localStorage.getItem(Fc(n));if(t){const s=JSON.parse(t);e={session:s.session??null,carding:new Map(s.carding??[]),results:new Map(s.results??[]),scores:new Map(s.scores??[]),logs:Array.isArray(s.logs)?s.logs:[]}}}catch{}ni.set(n,e??{session:null,carding:new Map,results:new Map,scores:new Map,logs:[]})}return ni.get(n)}function uE(n){const e=ni.get(n);if(!e)return;if(typeof window<"u"&&window.localStorage)try{const s=JSON.stringify({session:e.session,carding:Array.from(e.carding.entries()),results:Array.from(e.results.entries()),scores:Array.from(e.scores.entries()),logs:e.logs});window.localStorage.setItem(Fc(n),s)}catch{}const t=Kr.get(n);if(t)for(const s of t)s()}function hE({sessionId:n,type:e,message:t,details:s={},createdAt:r=null}){const o=new Date;Pu+=1;const a=o.getTime(),l=o.toISOString(),h=Pu;return{id:`log_${a}_${String(h).padStart(4,"0")}`,sessionId:n,type:e,label:$t[e]??e,message:t,details:s,timestampIso:l,timestampMs:a,seq:h,createdAt:r??l}}function Fr(n){return[...n].sort((e,t)=>{const s=(e.timestampMs??0)-(t.timestampMs??0);return s!==0?s:(e.seq??0)-(t.seq??0)})}function dE(n,e=Wf){if(!Array.isArray(n)||n.length!==lt)return{valid:!1,notInBoardCount:0,selectedCount:0,expectedNotInBoardCount:e,totalCards:lt,hasInvalidStates:!0,reason:`cardStates deve ser um array de ${lt} posições (recebido: ${Array.isArray(n)?n.length:typeof n}).`};const t=new Set([me.NOT_IN_BOARD,me.UNMARKED,me.MATCHED]);let s=0,r=0,o=!1;for(const h of n)t.has(h)?h===me.NOT_IN_BOARD?s+=1:r+=1:o=!0;if(o)return{valid:!1,notInBoardCount:s,selectedCount:r,expectedNotInBoardCount:e,totalCards:lt,hasInvalidStates:!0,reason:"cardStates contém valores de estado inválidos (permitidos: -1, 0, 1)."};const a=s===e,l=lt-e;return{valid:a,notInBoardCount:s,selectedCount:r,expectedNotInBoardCount:e,totalCards:lt,hasInvalidStates:!1,reason:a?null:`cardStates inválido: esperadas exatamente ${e} ocorrências de ${me.NOT_IN_BOARD} (${l} itens na cartela), mas foram encontradas ${s} (${r} itens assinalados).`}}class fE{constructor({db:e=Du,sessionId:t=Gr,useLocalFallback:s}={}){this.db=e,this.sessionId=t,this.useLocalFallback=typeof s=="boolean"?s:!Hr&&e===Du}get sessionRef(){return Mr(this.db,Se,this.sessionId)}get cardingColRef(){return Wi(this.db,Se,this.sessionId,Pe.CARDING)}get resultsColRef(){return Wi(this.db,Se,this.sessionId,Pe.RESULTS)}get scoresColRef(){return Wi(this.db,Se,this.sessionId,Pe.SCORES)}get logsColRef(){return Wi(this.db,Se,this.sessionId,Pe.LOGS)}cardDocRef(e){return Mr(this.cardingColRef,`card_${e}`)}resultDocRef(e){return Mr(this.resultsColRef,e)}scoreDocRef(e){return Mr(this.scoresColRef,e)}logDocRef(e){return Mr(this.logsColRef,e)}async _recordLogs(e,t=null,s=null){const r=rn(this.sessionId),o=e.map(a=>hE({sessionId:this.sessionId,type:a.type,message:a.message,details:a.details??{},createdAt:this.useLocalFallback?null:s??Hs()}));if(r.logs.push(...o.map(a=>({...a,createdAt:a.timestampIso}))),!this.useLocalFallback)if(t)for(const a of o)t.set(this.logDocRef(a.id),a);else try{const a=Qi(this.db);for(const l of o)a.set(this.logDocRef(l.id),l);await a.commit()}catch{}return uE(this.sessionId),o}async init({thresholdDistanceMeters:e=1550,overwrite:t=!1}={}){if(this.useLocalFallback){const a=rn(this.sessionId);if(!t&&a.session)return{initialized:!1,sessionId:this.sessionId,data:a.session};const l=new Date().toISOString(),h={sessionId:this.sessionId,thresholdDistanceMeters:e,status:oe.LOBBY,occurringEventIds:[],createdAt:l,updatedAt:l};a.session=h,a.carding.clear(),t&&(a.results.clear(),a.scores.clear());for(const d of at)a.carding.set(d.id,{id:d.id,alias:d.alias,guireptext:rl(d.guireptext,e),cardexcludes:[...d.cardexcludes]});return await this._recordLogs([{type:K.DB_INITIALIZED,message:`DB inicializada: sessão 'bingo/${this.sessionId}' configurada com status '${oe.LOBBY}' (limiar: ${e}m).`,details:{path:`${Se}/${this.sessionId}`,status:oe.LOBBY,thresholdDistanceMeters:e,overwrite:t}},{type:K.CARDS_INITIALIZED,message:`Cartelas inicializadas (catálogo): ${at.length} cartas-evento registradas em 'bingo/${this.sessionId}/${Pe.CARDING}' (card_0 a card_19).`,details:{subcollection:`${Se}/${this.sessionId}/${Pe.CARDING}`,cardsCount:at.length}},{type:K.SUBCOLLECTIONS_UPDATED,message:`Atualização de subcoleções e documentos: documento 'bingo/${this.sessionId}' e 20 documentos em '${Pe.CARDING}' sincronizados.`,details:{updatedCollections:[`${Se}/${this.sessionId}`,`${Se}/${this.sessionId}/${Pe.CARDING}`]}}]),{initialized:!0,sessionId:this.sessionId,data:h}}if(!t){const a=await zs(this.sessionRef);if(a.exists())return{initialized:!1,sessionId:this.sessionId,data:a.data()}}const s=Qi(this.db),r=Hs(),o={sessionId:this.sessionId,thresholdDistanceMeters:e,status:oe.LOBBY,occurringEventIds:[],createdAt:r,updatedAt:r};s.set(this.sessionRef,o);for(const a of at)s.set(this.cardDocRef(a.id),{id:a.id,alias:a.id!==void 0?a.alias:"",guireptext:rl(a.guireptext,e),cardexcludes:[...a.cardexcludes]});return await this._recordLogs([{type:K.DB_INITIALIZED,message:`DB inicializada: sessão 'bingo/${this.sessionId}' configurada com status '${oe.LOBBY}' (limiar: ${e}m).`,details:{path:`${Se}/${this.sessionId}`,status:oe.LOBBY,thresholdDistanceMeters:e,overwrite:t}},{type:K.CARDS_INITIALIZED,message:`Cartelas inicializadas (catálogo): ${at.length} cartas-evento registradas em 'bingo/${this.sessionId}/${Pe.CARDING}' (card_0 a card_19).`,details:{subcollection:`${Se}/${this.sessionId}/${Pe.CARDING}`,cardsCount:at.length}},{type:K.SUBCOLLECTIONS_UPDATED,message:`Atualização de subcoleções e documentos: documento 'bingo/${this.sessionId}' e 20 documentos em '${Pe.CARDING}' sincronizados.`,details:{updatedCollections:[`${Se}/${this.sessionId}`,`${Se}/${this.sessionId}/${Pe.CARDING}`]}}],s,r),await s.commit(),{initialized:!0,sessionId:this.sessionId,data:o}}async initPlayer({playerId:e,playerName:t,selectedCardIds:s}){var M;if(!Array.isArray(s))throw new TypeError("selectedCardIds deve ser um array de IDs de cartas.");const r=new Set(s);if(r.size!==s.length)throw new Error("Seleção de cartela inválida; existem IDs de cartas duplicados.");const o=Array.from({length:lt},(L,B)=>r.has(B)?me.UNMARKED:me.NOT_IN_BOARD),a=dE(o);if(!a.valid)throw new Error(`Inicialização de results/${e} inválida: ${a.reason}`);const l=Uu(s);if(!l.valid){const L=l.conflicts.map(([B,J])=>`${B} vs ${J}`).join(", ");throw new Error(`Seleção de cartela inválida; conflitos em cardexcludes: ${L}`)}const h=[...s].sort((L,B)=>L-B);if(this.useLocalFallback){const L=rn(this.sessionId),B=new Set(((M=L.session)==null?void 0:M.occurringEventIds)??[]),J=o.map((E,w)=>E===me.NOT_IN_BOARD?me.NOT_IN_BOARD:B.has(w)?me.MATCHED:me.UNMARKED),Q=J.reduce((E,w,y)=>(w===me.MATCHED&&E.push(y),E),[]),T=new Date().toISOString(),p={playerId:e,playerName:t,cardStates:J,updatedAt:T},v={playerId:e,playerName:t,eventsMatchedSoFar:Q.length,matchedCardIds:Q,updatedAt:T};L.results.set(e,p),L.scores.set(e,v);const I=[{type:K.PLAYER_INITIALIZED,message:`Jogador inicializado: '${t}' (ID: ${e}) registrado na sessão '${this.sessionId}'.`,details:{playerId:e,playerName:t}},{type:K.CARDS_INITIALIZED,message:`Cartela inicializada para '${t}' (${e}): 10 itens selecionados [${h.join(", ")}] e 10 posições fora da cartela (-1).`,details:{playerId:e,playerName:t,selectedCardIds:h,cardStates:J}},{type:K.SUBCOLLECTIONS_UPDATED,message:`Documentos 'bingo/${this.sessionId}/results/${e}' e 'bingo/${this.sessionId}/scores/${e}' gravados (${Q.length}/${ue} acertos iniciais).`,details:{updatedDocs:[`${Se}/${this.sessionId}/${Pe.RESULTS}/${e}`,`${Se}/${this.sessionId}/${Pe.SCORES}/${e}`],eventsMatchedSoFar:Q.length,matchedCardIds:Q}}];return L.session&&Q.length>=ue&&(L.session={...L.session,status:oe.FINISHED,updatedAt:T},I.push({type:K.BOARD_COMPLETED,message:`Fechamento de cartela registrado! Jogador '${t}' (${e}) completou os ${ue} itens da cartela.`,details:{winners:[{playerId:e,playerName:t,eventsMatchedSoFar:Q.length}]}},{type:K.SESSION_FINISHED,message:`Encerramento de sessão: 'bingo/${this.sessionId}' encerrada automaticamente após fechamento de cartela por '${t}'.`,details:{reason:"board_completed",status:oe.FINISHED,playerId:e,playerName:t}})),await this._recordLogs(I),{result:p,score:v}}const d=await zs(this.sessionRef),m=new Set(d.exists()?d.data().occurringEventIds??[]:[]),g=o.map((L,B)=>L===me.NOT_IN_BOARD?me.NOT_IN_BOARD:m.has(B)?me.MATCHED:me.UNMARKED),_=g.reduce((L,B,J)=>(B===me.MATCHED&&L.push(J),L),[]),R=Hs(),D=Qi(this.db),k={playerId:e,playerName:t,cardStates:g,updatedAt:R},A={playerId:e,playerName:t,eventsMatchedSoFar:_.length,matchedCardIds:_,updatedAt:R};D.set(this.resultDocRef(e),k),D.set(this.scoreDocRef(e),A);const N=[{type:K.PLAYER_INITIALIZED,message:`Jogador inicializado: '${t}' (ID: ${e}) registrado na sessão '${this.sessionId}'.`,details:{playerId:e,playerName:t}},{type:K.CARDS_INITIALIZED,message:`Cartela inicializada para '${t}' (${e}): 10 itens selecionados [${h.join(", ")}] e 10 posições fora da cartela (-1).`,details:{playerId:e,playerName:t,selectedCardIds:h,cardStates:g}},{type:K.SUBCOLLECTIONS_UPDATED,message:`Documentos 'bingo/${this.sessionId}/results/${e}' e 'bingo/${this.sessionId}/scores/${e}' gravados (${_.length}/${ue} acertos iniciais).`,details:{updatedDocs:[`${Se}/${this.sessionId}/${Pe.RESULTS}/${e}`,`${Se}/${this.sessionId}/${Pe.SCORES}/${e}`],eventsMatchedSoFar:_.length,matchedCardIds:_}}];return d.exists()&&_.length>=ue&&(D.update(this.sessionRef,{status:oe.FINISHED,updatedAt:R}),N.push({type:K.BOARD_COMPLETED,message:`Fechamento de cartela registrado! Jogador '${t}' (${e}) completou os ${ue} itens da cartela.`,details:{winners:[{playerId:e,playerName:t,eventsMatchedSoFar:_.length}]}},{type:K.SESSION_FINISHED,message:`Encerramento de sessão: 'bingo/${this.sessionId}' encerrada automaticamente após fechamento de cartela por '${t}'.`,details:{reason:"board_completed",status:oe.FINISHED,playerId:e,playerName:t}})),await this._recordLogs(N,D,R),await D.commit(),{result:k,score:A}}async updateSessionStatus(e,t={}){const s=new Set(Object.values(oe));if(!s.has(e))throw new RangeError(`Status de sessão inválido: '${e}'. Esperado um de: ${Array.from(s).join(", ")}.`);if(this.useLocalFallback){const h=rn(this.sessionId);if(!h.session)throw new Error(`Sessão '${this.sessionId}' não encontrada. Chame init() antes.`);const d=h.session.status,m=new Date().toISOString();h.session={...h.session,status:e,updatedAt:m};const g=[];return e===oe.LIVE?g.push({type:K.SESSION_STARTED,message:`Sessão '${this.sessionId}' iniciada manualmente pelo administrador (status: '${d}' → '${e}').`,details:{previousStatus:d,status:e,reason:t.reason??"manual_admin"}}):e===oe.FINISHED&&g.push({type:K.SESSION_FINISHED,message:`Encerramento de sessão: torneio '${this.sessionId}' encerrado manualmente pelo administrador (status: '${d}' → '${e}').`,details:{previousStatus:d,status:e,reason:t.reason??"manual_admin"}}),g.push({type:K.SUBCOLLECTIONS_UPDATED,message:`Documento 'bingo/${this.sessionId}' atualizado (status: '${d}' → '${e}').`,details:{updatedDocs:[`${Se}/${this.sessionId}`],previousStatus:d,status:e}}),await this._recordLogs(g),{sessionId:this.sessionId,status:e}}const r=await zs(this.sessionRef);if(!r.exists())throw new Error(`Sessão '${this.sessionId}' não encontrada. Chame init() antes.`);const o=r.data().status,a=Hs();await yu(this.sessionRef,{status:e,updatedAt:a});const l=[];return e===oe.LIVE?l.push({type:K.SESSION_STARTED,message:`Sessão '${this.sessionId}' iniciada manualmente pelo administrador (status: '${o}' → '${e}').`,details:{previousStatus:o,status:e,reason:t.reason??"manual_admin"}}):e===oe.FINISHED&&l.push({type:K.SESSION_FINISHED,message:`Encerramento de sessão: torneio '${this.sessionId}' encerrado manualmente pelo administrador (status: '${o}' → '${e}').`,details:{previousStatus:o,status:e,reason:t.reason??"manual_admin"}}),l.push({type:K.SUBCOLLECTIONS_UPDATED,message:`Documento 'bingo/${this.sessionId}' atualizado (status: '${o}' → '${e}').`,details:{updatedDocs:[`${Se}/${this.sessionId}`],previousStatus:o,status:e}}),await this._recordLogs(l,null,a),{sessionId:this.sessionId,status:e}}async startSession(){if(this.useLocalFallback){const d=rn(this.sessionId);if(!d.session)throw new Error(`Sessão '${this.sessionId}' não encontrada. Chame init() antes.`);const g=(await this.getLeaderboard()).filter(N=>N.eventsMatchedSoFar>=ue),_=g.length>0,R=d.session.status,D=_?oe.FINISHED:oe.LIVE,k=new Date().toISOString();d.session={...d.session,status:D,updatedAt:k};const A=[{type:K.SESSION_STARTED,message:`Sessão '${this.sessionId}' iniciada manualmente pelo administrador (status: '${R}' → '${D}').`,details:{previousStatus:R,status:D,hasCompletedBoard:_}},{type:K.SUBCOLLECTIONS_UPDATED,message:`Documento 'bingo/${this.sessionId}' atualizado com status '${D}'.`,details:{updatedDocs:[`${Se}/${this.sessionId}`],previousStatus:R,status:D}}];return _&&A.push({type:K.BOARD_COMPLETED,message:`Fechamento de cartela constatado ao iniciar sessão: ${g.map(N=>`${N.playerName} (${N.playerId})`).join(", ")}.`,details:{winners:g}},{type:K.SESSION_FINISHED,message:`Encerramento de sessão: 'bingo/${this.sessionId}' definido como '${oe.FINISHED}' pois já há cartela concluída.`,details:{reason:"board_already_completed",winners:g}}),await this._recordLogs(A),{sessionId:this.sessionId,status:D}}const[e,t]=await Promise.all([zs(this.sessionRef),this.getLeaderboard()]);if(!e.exists())throw new Error(`Sessão '${this.sessionId}' não encontrada. Chame init() antes.`);const s=e.data().status,r=t.filter(d=>d.eventsMatchedSoFar>=ue),o=r.length>0,a=o?oe.FINISHED:oe.LIVE,l=Hs();await yu(this.sessionRef,{status:a,updatedAt:l});const h=[{type:K.SESSION_STARTED,message:`Sessão '${this.sessionId}' iniciada manualmente pelo administrador (status: '${s}' → '${a}').`,details:{previousStatus:s,status:a,hasCompletedBoard:o}},{type:K.SUBCOLLECTIONS_UPDATED,message:`Documento 'bingo/${this.sessionId}' atualizado com status '${a}'.`,details:{updatedDocs:[`${Se}/${this.sessionId}`],previousStatus:s,status:a}}];return o&&h.push({type:K.BOARD_COMPLETED,message:`Fechamento de cartela constatado ao iniciar sessão: ${r.map(d=>`${d.playerName} (${d.playerId})`).join(", ")}.`,details:{winners:r}},{type:K.SESSION_FINISHED,message:`Encerramento de sessão: 'bingo/${this.sessionId}' definido como '${oe.FINISHED}' pois já há cartela concluída.`,details:{reason:"board_already_completed",winners:r}}),await this._recordLogs(h,null,l),{sessionId:this.sessionId,status:a}}async finishSession(){return this.updateSessionStatus(oe.FINISHED,{reason:"manual_admin_finish"})}async recordOccurringEvent(e){if(!Number.isInteger(e)||e<0||e>=lt)throw new RangeError(`cardId inválido: ${e}. Esperado inteiro entre 0 e ${lt-1}.`);const t=at.find(A=>A.id===e)??{alias:`card_${e}`,guireptext:`Carta #${e}`};if(this.useLocalFallback){const A=rn(this.sessionId);if(!A.session)throw new Error(`Sessão '${this.sessionId}' não encontrada. Chame init() antes.`);const N=A.session,M=new Set(N.occurringEventIds??[]);M.add(e);const L=Array.from(M).sort((E,w)=>E-w),B=new Date().toISOString();let J=!1;const Q=[],T=[],p=A.results.size;for(const[E,w]of A.results.entries()){const y=Array.isArray(w.cardStates)?[...w.cardStates]:Array(lt).fill(me.NOT_IN_BOARD),xe=y[e]!==me.NOT_IN_BOARD;xe&&(y[e]=me.MATCHED);const Fe=[];for(let je=0;je<y.length;je+=1)y[je]===me.MATCHED&&Fe.push(je);const Vt=w.playerName??E;xe&&Q.push({playerId:E,playerName:Vt,eventsMatchedSoFar:Fe.length}),Fe.length>=ue&&(J=!0,T.push({playerId:E,playerName:Vt,eventsMatchedSoFar:Fe.length,matchedCardIds:Fe})),A.results.set(E,{...w,cardStates:y,updatedAt:B}),A.scores.set(E,{playerId:E,playerName:Vt,eventsMatchedSoFar:Fe.length,matchedCardIds:Fe,updatedAt:B})}const v=J||N.status===oe.FINISHED?oe.FINISHED:oe.LIVE;A.session={...N,occurringEventIds:L,status:v,updatedAt:B};const I=[{type:K.EVENT_OCCURRED,message:`Ocorrência prevista registrada: Carta #${e} (${t.alias}) — "${t.guireptext}"`,details:{cardId:e,alias:t.alias,guireptext:t.guireptext,occurringEventIds:L}},{type:K.SUBCOLLECTIONS_UPDATED,message:`Subcoleções e documentos atualizados: 'bingo/${this.sessionId}.occurringEventIds' (${L.length} evento(s)), '${Pe.RESULTS}' (${p} doc(s)) e '${Pe.SCORES}' (${p} doc(s)). Cartelas impactadas pela carta #${e}: ${Q.length}/${p}.`,details:{cardId:e,occurringEventIds:L,totalPlayers:p,playersMatchedThisCard:Q,status:v}}];if(T.length>0){const E=T.map(w=>`${w.playerName} (${w.playerId})`).join(", ");I.push({type:K.BOARD_COMPLETED,message:`Fechamento de cartela (${ue}/${ue}) por: ${E}!`,details:{triggerCardId:e,winners:T}},{type:K.SESSION_FINISHED,message:`Encerramento de sessão: 'bingo/${this.sessionId}' encerrada automaticamente após fechamento de cartela por ${E}.`,details:{reason:"board_completed",triggerCardId:e,status:v,winners:T}})}return await this._recordLogs(I),{occurringEventIds:L,status:v}}const[s,r]=await Promise.all([zs(this.sessionRef),os(this.resultsColRef)]);if(!s.exists())throw new Error(`Sessão '${this.sessionId}' não encontrada. Chame init() antes.`);const o=s.data(),a=new Set(o.occurringEventIds??[]);a.add(e);const l=Array.from(a).sort((A,N)=>A-N),h=Hs(),d=Qi(this.db);let m=!1;const g=[],_=[],R=r.docs.length;for(const A of r.docs){const N=A.data(),M=Array.isArray(N.cardStates)?[...N.cardStates]:Array(lt).fill(me.NOT_IN_BOARD),L=M[e]!==me.NOT_IN_BOARD;L&&(M[e]=me.MATCHED);const B=[];for(let Q=0;Q<M.length;Q+=1)M[Q]===me.MATCHED&&B.push(Q);const J=N.playerName??A.id;L&&g.push({playerId:A.id,playerName:J,eventsMatchedSoFar:B.length}),B.length>=ue&&(m=!0,_.push({playerId:A.id,playerName:J,eventsMatchedSoFar:B.length,matchedCardIds:B})),d.update(A.ref,{cardStates:M,updatedAt:h}),d.set(this.scoreDocRef(A.id),{playerId:A.id,playerName:J,eventsMatchedSoFar:B.length,matchedCardIds:B,updatedAt:h},{merge:!0})}const D=m||o.status===oe.FINISHED?oe.FINISHED:oe.LIVE;d.update(this.sessionRef,{occurringEventIds:l,status:D,updatedAt:h});const k=[{type:K.EVENT_OCCURRED,message:`Ocorrência prevista registrada: Carta #${e} (${t.alias}) — "${t.guireptext}"`,details:{cardId:e,alias:t.alias,guireptext:t.guireptext,occurringEventIds:l}},{type:K.SUBCOLLECTIONS_UPDATED,message:`Subcoleções e documentos atualizados: 'bingo/${this.sessionId}.occurringEventIds' (${l.length} evento(s)), '${Pe.RESULTS}' (${R} doc(s)) e '${Pe.SCORES}' (${R} doc(s)). Cartelas impactadas pela carta #${e}: ${g.length}/${R}.`,details:{cardId:e,occurringEventIds:l,totalPlayers:R,playersMatchedThisCard:g,status:D}}];if(_.length>0){const A=_.map(N=>`${N.playerName} (${N.playerId})`).join(", ");k.push({type:K.BOARD_COMPLETED,message:`Fechamento de cartela (${ue}/${ue}) por: ${A}!`,details:{triggerCardId:e,winners:_}},{type:K.SESSION_FINISHED,message:`Encerramento de sessão: 'bingo/${this.sessionId}' encerrada automaticamente após fechamento de cartela por ${A}.`,details:{reason:"board_completed",triggerCardId:e,status:D,winners:_}})}return await this._recordLogs(k,d,h),await d.commit(),{occurringEventIds:l,status:D}}async getLeaderboard(){if(this.useLocalFallback){const s=rn(this.sessionId);return Array.from(s.scores.values()).sort((r,o)=>o.eventsMatchedSoFar-r.eventsMatchedSoFar)}const e=Fy(this.scoresColRef,$y("eventsMatchedSoFar","desc"));return(await os(e)).docs.map(s=>s.data())}async getWinners(){const e=await this.getLeaderboard();if(e.length===0)return{maxScore:0,winners:[]};const t=e[0].eventsMatchedSoFar,s=e.filter(r=>r.eventsMatchedSoFar===t);return{maxScore:t,winners:s}}async getLogs(){if(this.useLocalFallback){const s=rn(this.sessionId);return Fr(s.logs)}const t=(await os(this.logsColRef)).docs.map(s=>s.data());return Fr(t)}async getSessionSnapshot(){if(this.useLocalFallback){const D=rn(this.sessionId),k=D.carding.size>0?Array.from(D.carding.values()).sort((J,Q)=>J.id-Q.id):at.map(J=>({...J,cardexcludes:[...J.cardexcludes]})),A=Array.from(D.results.values()),N=Array.from(D.scores.values()).sort((J,Q)=>Q.eventsMatchedSoFar-J.eventsMatchedSoFar),M=N.length>0?N[0].eventsMatchedSoFar:0,L=M>0?N.filter(J=>J.eventsMatchedSoFar===M):[],B=N.filter(J=>J.eventsMatchedSoFar>=ue);return{initialized:!!D.session,sessionId:this.sessionId,persistenceMode:"local",session:D.session,cards:k,results:A,leaderboard:N,winners:L,completedPlayers:B,logs:Fr(D.logs)}}const[e,t,s,r,o]=await Promise.all([zs(this.sessionRef),os(this.cardingColRef),os(this.resultsColRef),os(this.scoresColRef),os(this.logsColRef)]),a=e.exists()?e.data():null,l=t.docs.length>0?t.docs.map(D=>D.data()).sort((D,k)=>D.id-k.id):at.map(D=>({...D,cardexcludes:[...D.cardexcludes]})),h=s.docs.map(D=>D.data()),d=r.docs.map(D=>D.data()).sort((D,k)=>k.eventsMatchedSoFar-D.eventsMatchedSoFar),m=d.length>0?d[0].eventsMatchedSoFar:0,g=m>0?d.filter(D=>D.eventsMatchedSoFar===m):[],_=d.filter(D=>D.eventsMatchedSoFar>=ue),R=Fr(o.docs.map(D=>D.data()));return{initialized:e.exists(),sessionId:this.sessionId,persistenceMode:"firestore",session:a,cards:l,results:h,leaderboard:d,winners:g,completedPlayers:_,logs:R}}subscribe(e,t){if(this.useLocalFallback){const A=()=>{this.getSessionSnapshot().then(e).catch(M=>t==null?void 0:t(M))};Kr.has(this.sessionId)||Kr.set(this.sessionId,new Set),Kr.get(this.sessionId).add(A);const N=M=>{M.key===Fc(this.sessionId)&&(ni.delete(this.sessionId),A())};return typeof window<"u"&&window.addEventListener("storage",N),A(),()=>{var M;(M=Kr.get(this.sessionId))==null||M.delete(A),typeof window<"u"&&window.removeEventListener("storage",N)}}let s=null,r=!1,o=at.map(A=>({...A,cardexcludes:[...A.cardexcludes]})),a=[],l=[],h=[];const d=()=>{const A=l.length>0?l[0].eventsMatchedSoFar:0,N=A>0?l.filter(L=>L.eventsMatchedSoFar===A):[],M=l.filter(L=>L.eventsMatchedSoFar>=ue);e({initialized:r,sessionId:this.sessionId,persistenceMode:"firestore",session:s,cards:o,results:a,leaderboard:l,winners:N,completedPlayers:M,logs:h})},m=A=>{t&&t(A)},g=Lr(this.sessionRef,A=>{r=A.exists(),s=A.exists()?A.data():null,d()},m),_=Lr(this.cardingColRef,A=>{A.docs.length>0&&(o=A.docs.map(N=>N.data()).sort((N,M)=>N.id-M.id)),d()},m),R=Lr(this.resultsColRef,A=>{a=A.docs.map(N=>N.data()),d()},m),D=Lr(this.scoresColRef,A=>{l=A.docs.map(N=>N.data()).sort((N,M)=>M.eventsMatchedSoFar-N.eventsMatchedSoFar),d()},m),k=Lr(this.logsColRef,A=>{h=Fr(A.docs.map(N=>N.data())),d()},m);return()=>{g(),_(),R(),D(),k()}}}function mE(n){return new fE(n)}var pE=Ce('<div role="status"><span> </span> <button type="button" class="alert-close svelte-m7mmqe">✕</button></div>'),gE=Ce('<div class="bingo-banner svelte-m7mmqe"><div class="bingo-icon svelte-m7mmqe">🏆</div> <div><strong> </strong> <p class="svelte-m7mmqe"> </p></div></div>'),_E=Ce('<label class="checkbox-inline svelte-m7mmqe"><input type="checkbox"/> <span>Forçar modo local</span></label>'),yE=Ce('<button type="button"><span> </span> <span class="chip-count svelte-m7mmqe"> </span></button>'),vE=Ce(`<div class="empty-log-state svelte-m7mmqe"><p>Nenhuma operação registrada para o filtro selecionado.</p> <small>Clique em <strong>"Inicializar DB & Catálogo"</strong> ou <strong>"Iniciar Torneio Manualmente"</strong> acima para registrar as primeiras operações
						com timestamp.</small></div>`),EE=Ce('<details class="log-details svelte-m7mmqe"><summary class="svelte-m7mmqe">Inspecionar metadados / documentos atualizados</summary> <pre class="svelte-m7mmqe"> </pre></details>'),IE=Ce('<article><div class="log-meta svelte-m7mmqe"><span class="log-seq svelte-m7mmqe"> </span> <time class="log-timestamp svelte-m7mmqe"> </time> <span> </span></div> <div class="log-body"><p class="log-message svelte-m7mmqe"> </p> <!></div></article>'),TE=Ce('<span class="excludes-tag svelte-m7mmqe" title="Mutuamente exclusiva com a(s) carta(s) indicada(s)"> </span>'),AE=Ce('<span class="occurred-status svelte-m7mmqe">✓ Ocorrência já registrada na sessão</span>'),wE=Ce('<span class="conflict-warning-text svelte-m7mmqe">⚠️ Conflita com evento mutuamente exclusivo já ocorrido</span>'),SE=Ce('<span class="pending-status svelte-m7mmqe">Aguardando ocorrência</span>'),bE=Ce('<div><div class="catalog-card-top svelte-m7mmqe"><div class="catalog-card-id-group svelte-m7mmqe"><span class="card-id-pill svelte-m7mmqe"> </span> <code class="card-alias svelte-m7mmqe"> </code> <!></div> <span class="players-holding-pill svelte-m7mmqe" title="Jogadores com este evento na cartela"> </span></div> <p class="catalog-card-text svelte-m7mmqe"> </p> <div class="catalog-card-footer svelte-m7mmqe"><!> <button type="button"><!></button></div></div>'),RE=Ce(`<div class="empty-box svelte-m7mmqe"><p>Nenhum jogador inicializado nesta sessão ainda.</p> <small>Use o botão <strong>"+ Gerar 3 Equipes de Teste"</strong> ou o formulário abaixo para
							inicializar jogadores e cartelas.</small></div>`),CE=Ce('<span class="bingo-pill svelte-m7mmqe">🏆 BINGO FECHADO!</span>'),DE=Ce("<span> </span>"),PE=Ce('<div class="board-states-strip svelte-m7mmqe"></div>'),VE=Ce('<div><div class="player-score-header svelte-m7mmqe"><div class="player-rank-info svelte-m7mmqe"><span class="rank-badge svelte-m7mmqe"> </span> <div><strong> </strong> <code class="player-id-code svelte-m7mmqe"> </code></div></div> <div class="score-counter-group svelte-m7mmqe"><!> <span class="score-fraction svelte-m7mmqe"> </span></div></div> <div class="progress-bar-track svelte-m7mmqe"><div></div></div> <!></div>'),NE=Ce('<div class="leaderboard-list svelte-m7mmqe"></div>'),OE=Ce('<div class="validation-error svelte-m7mmqe">Conflito de exclusão mútua (<code>cardexcludes</code> </div>'),xE=Ce('<button type="button"><span class="mini-id svelte-m7mmqe"> </span> <span class="mini-alias svelte-m7mmqe"> </span></button>'),kE=Ce(`<div class="admin-shell svelte-m7mmqe"><header class="topbar svelte-m7mmqe"><div class="brand svelte-m7mmqe"><div class="brand-badge svelte-m7mmqe">🏁 ADMIN</div> <div><h1 class="svelte-m7mmqe">Mousetrap Racing Bingo — Painel de Administração do Torneio</h1> <p class="subtitle svelte-m7mmqe">Controle manual de sessão, catálogo de ocorrências, estado das subcoleções e auditoria
					contínua de operações com timestamps.</p></div></div> <div class="status-cluster svelte-m7mmqe"><div><span class="dot svelte-m7mmqe"></span> <!></div> <div><!></div></div></header> <!> <!> <section class="card-panel control-panel svelte-m7mmqe" aria-labelledby="heading-controls"><div class="panel-header svelte-m7mmqe"><div><h2 id="heading-controls" class="svelte-m7mmqe">1. Controle Manual da Sessão e Inicialização do Banco</h2> <p class="panel-desc svelte-m7mmqe">Inicie ou encerre o torneio manualmente e gerencie o ciclo de vida do documento <code> </code>.</p></div> <div class="session-config-inline svelte-m7mmqe"><label class="svelte-m7mmqe"><span>Sessão (<code>sessionId</code>)</span> <input type="text" placeholder="default" class="svelte-m7mmqe"/></label> <label class="svelte-m7mmqe"><span>Limiar distância (m)</span> <input type="number" min="1" step="10" class="svelte-m7mmqe"/></label> <!></div></div> <div class="manual-actions-grid svelte-m7mmqe"><button type="button" class="btn btn-secondary svelte-m7mmqe">🗄️ Inicializar DB & Catálogo</button> <button type="button" class="btn btn-start svelte-m7mmqe">▶ Iniciar Torneio Manualmente (LIVE)</button> <button type="button" class="btn btn-finish svelte-m7mmqe">⏹ Encerrar Torneio Manualmente (FINISHED)</button> <button type="button" class="btn btn-outline svelte-m7mmqe">↺ Retornar ao Lobby</button> <button type="button" class="btn btn-danger-outline svelte-m7mmqe">♻️ Reinicializar DB (Sobrescrever)</button></div> <div class="metrics-strip svelte-m7mmqe"><div class="metric-box svelte-m7mmqe"><span class="metric-label svelte-m7mmqe">Documento da Sessão</span> <strong class="metric-value svelte-m7mmqe"> </strong></div> <div class="metric-box svelte-m7mmqe"><span class="metric-label svelte-m7mmqe">Status Atual</span> <strong class="metric-value svelte-m7mmqe"> </strong></div> <div class="metric-box svelte-m7mmqe"><span class="metric-label svelte-m7mmqe">Cartas no Catálogo (carding)</span> <strong class="metric-value svelte-m7mmqe"> </strong></div> <div class="metric-box svelte-m7mmqe"><span class="metric-label svelte-m7mmqe">Jogadores / Cartelas (results & scores)</span> <strong class="metric-value svelte-m7mmqe"> </strong></div> <div class="metric-box svelte-m7mmqe"><span class="metric-label svelte-m7mmqe">Ocorrências Registradas</span> <strong class="metric-value svelte-m7mmqe"> </strong></div> <div class="metric-box svelte-m7mmqe"><span class="metric-label svelte-m7mmqe">Operações no Log</span> <strong class="metric-value svelte-m7mmqe"> </strong></div></div></section> <section class="card-panel log-panel svelte-m7mmqe" aria-labelledby="heading-logs"><div class="panel-header svelte-m7mmqe"><div><h2 id="heading-logs" class="svelte-m7mmqe">2. Visualização Contínua do Log de Operações Realizadas (com Timestamps)</h2> <p class="panel-desc svelte-m7mmqe">Monitoramento em tempo real da subcoleção <code> </code> cobrindo
					todas as operações do torneio.</p></div> <div class="log-toolbar-actions svelte-m7mmqe"><label class="checkbox-inline svelte-m7mmqe"><input type="checkbox"/> <span>Mais recentes no topo</span></label> <label class="checkbox-inline svelte-m7mmqe"><input type="checkbox"/> <span>Auto-scroll</span></label> <button type="button" class="btn btn-sm btn-outline svelte-m7mmqe"> </button></div></div> <div class="log-filters svelte-m7mmqe"><div class="category-chips svelte-m7mmqe" role="tablist" aria-label="Filtrar logs por categoria de operação"></div> <div class="log-search svelte-m7mmqe"><input type="search" placeholder="Filtrar logs por texto, ID de carta, jogador ou documento..." class="svelte-m7mmqe"/></div></div> <div class="log-stream svelte-m7mmqe" aria-live="polite"><!></div></section> <div class="two-col-grid svelte-m7mmqe"><section class="card-panel svelte-m7mmqe" aria-labelledby="heading-cards"><div class="panel-header svelte-m7mmqe"><div><h2 id="heading-cards" class="svelte-m7mmqe">3. Catálogo de Ocorrências do Bingo (<code>carding</code>)</h2> <p class="panel-desc svelte-m7mmqe">Registre ocorrências previstas durante a competição de carrinhos-ratoeira. O registro
						atualiza automaticamente <code>occurringEventIds</code>, <code>results</code> e <code>scores</code>.</p></div></div> <div class="cards-catalog-list svelte-m7mmqe"></div></section> <div class="right-column-stack svelte-m7mmqe"><section class="card-panel svelte-m7mmqe" aria-labelledby="heading-leaderboard"><div class="panel-header svelte-m7mmqe"><div><h2 id="heading-leaderboard" class="svelte-m7mmqe">4. Placar e Cartelas dos Jogadores (<code>scores</code> & <code>results</code>)</h2> <p class="panel-desc svelte-m7mmqe">Acompanhamento em tempo real das subcoleções <code>scores</code> e <code>results</code> </p></div> <button type="button" class="btn btn-sm btn-secondary svelte-m7mmqe">+ Gerar 3 Equipes de Teste</button></div> <!></section> <section class="card-panel svelte-m7mmqe" aria-labelledby="heading-init-player"><div class="panel-header svelte-m7mmqe"><div><h2 id="heading-init-player" class="svelte-m7mmqe">5. Inicializar Jogador e Cartela (<code>initPlayer</code>)</h2> <p class="panel-desc svelte-m7mmqe">Cria documentos sincronizados em <code>results/&#123;playerId&#125;</code> (20 posições:
							10 na cartela e 10 iguais a <code>-1</code>) e <code>scores/&#123;playerId&#125;</code>.</p></div></div> <form class="init-player-form svelte-m7mmqe"><div class="form-row svelte-m7mmqe"><label class="svelte-m7mmqe"><span>ID do Jogador (<code>playerId</code>)</span> <input type="text" required="" placeholder="equipe_01" class="svelte-m7mmqe"/></label> <label class="svelte-m7mmqe"><span>Nome da Equipe / Jogador</span> <input type="text" required="" placeholder="Equipe Ratoeira Turbo" class="svelte-m7mmqe"/></label></div> <div class="board-selector-header svelte-m7mmqe"><span>Cartas selecionadas para a cartela: <strong> </strong></span> <button type="button" class="btn btn-sm btn-outline svelte-m7mmqe">🎲 Sortear 10 Cartas Válidas</button></div> <!> <div class="mini-cards-grid svelte-m7mmqe"></div> <button type="submit" class="btn btn-primary btn-full svelte-m7mmqe">➕ Inicializar Jogador e Cartela no Banco</button></form></section></div></div></div>`);function jE(n,e){Vf(e,!0);let t=nt(Zo(Gr)),s=nt(1550),r=nt(!Hr),o=nt(Zo({initialized:!1,sessionId:Gr,persistenceMode:Hr?"firestore":"local",session:null,cards:at.map(C=>({...C,cardexcludes:[...C.cardexcludes]})),results:[],leaderboard:[],winners:[],completedPlayers:[],logs:[]})),a=nt(""),l=nt(""),h=nt("info"),d=nt("all"),m=nt(""),g=nt(!0),_=nt(!0),R=nt(null),D=nt("equipe_01"),k=nt("Equipe Ratoeira Turbo"),A=nt(Zo(Ui(ue))),N=null,M=null;const L=[{type:"all",label:"Todas as operações"},{type:K.DB_INITIALIZED,label:$t[K.DB_INITIALIZED]},{type:K.CARDS_INITIALIZED,label:$t[K.CARDS_INITIALIZED]},{type:K.PLAYER_INITIALIZED,label:$t[K.PLAYER_INITIALIZED]},{type:K.SESSION_STARTED,label:$t[K.SESSION_STARTED]},{type:K.EVENT_OCCURRED,label:$t[K.EVENT_OCCURRED]},{type:K.SUBCOLLECTIONS_UPDATED,label:$t[K.SUBCOLLECTIONS_UPDATED]},{type:K.BOARD_COMPLETED,label:$t[K.BOARD_COMPLETED]},{type:K.SESSION_FINISHED,label:$t[K.SESSION_FINISHED]}];function B(C,P="info"){re(l,C,!0),re(h,P,!0)}function J(){M&&(M(),M=null);const C=(S(t)||Gr).trim()||Gr;N=mE({sessionId:C,useLocalFallback:S(r)||!Hr}),M=N.subscribe(async P=>{const z=S(o).logs.length;re(o,P,!0),S(_)&&S(R)&&P.logs.length>z&&(await $u(),!S(g)&&S(R)?S(R).scrollTop=S(R).scrollHeight:S(g)&&S(R)&&(S(R).scrollTop=0))},P=>{B(`Erro no listener Firestore (${P.message}). Alternando para modo local de contingência.`,"error"),S(r)||(re(r,!0),J())})}Of(()=>(J(),()=>{M&&M()}));async function Q(C=!1){if(N){re(a,C?"reinit_db":"init_db",!0);try{const P=await N.init({thresholdDistanceMeters:Number(S(s))||1550,overwrite:C});P.initialized?B(C?`Banco e catálogo reinicializados para a sessão '${P.sessionId}'.`:`Banco e subcoleção 'carding' inicializados na sessão '${P.sessionId}'.`,"success"):B(`A sessão '${P.sessionId}' já estava inicializada. Use "Reinicializar DB" para sobrescrever.`,"info")}catch(P){B(`Falha ao inicializar DB: ${P.message}`,"error")}finally{re(a,"")}}}async function T(){if(N){re(a,"start_session");try{S(o).initialized||await N.init({thresholdDistanceMeters:Number(S(s))||1550,overwrite:!1});const C=await N.startSession();B(`Torneio iniciado manualmente! Status atual da sessão '${C.sessionId}': ${C.status.toUpperCase()}.`,"success")}catch(C){B(`Erro ao iniciar sessão: ${C.message}`,"error")}finally{re(a,"")}}}async function p(){if(N){re(a,"finish_session");try{const C=await N.finishSession();B(`Torneio encerrado manualmente pelo administrador! Status: ${C.status.toUpperCase()}.`,"success")}catch(C){B(`Erro ao encerrar sessão: ${C.message}`,"error")}finally{re(a,"")}}}async function v(){if(N){re(a,"lobby_session");try{const C=await N.updateSessionStatus(oe.LOBBY,{reason:"manual_admin_reopen_lobby"});B(`Sessão '${C.sessionId}' retornada ao estado LOBBY.`,"info")}catch(C){B(`Erro ao alterar status para lobby: ${C.message}`,"error")}finally{re(a,"")}}}async function I(C){if(N){re(a,`event_${C}`);try{S(o).initialized||await N.init({thresholdDistanceMeters:Number(S(s))||1550,overwrite:!1});const P=await N.recordOccurringEvent(C),z=S(o).cards.find(H=>H.id===C);B(`Ocorrência #${C} (${(z==null?void 0:z.alias)??C}) registrada! Status da sessão: ${P.status.toUpperCase()}.`,"success")}catch(P){B(`Erro ao registrar ocorrência #${C}: ${P.message}`,"error")}finally{re(a,"")}}}function E(C){const P=new Set(S(A));if(P.has(C))P.delete(C);else{if(P.size>=ue){B(`Cada cartela deve conter exatamente ${ue} itens. Desmarque um item antes de selecionar outro.`,"info");return}P.add(C)}re(A,Array.from(P).sort((z,H)=>z-H),!0)}function w(){re(A,Ui(ue,S(o).cards),!0)}async function y(C){if(C==null||C.preventDefault(),!N)return;const P=S(D).trim(),z=S(k).trim();if(!P||!z){B("Informe o ID e o nome do jogador/equipe.","error");return}re(a,"init_player");try{S(o).initialized||await N.init({thresholdDistanceMeters:Number(S(s))||1550,overwrite:!1}),await N.initPlayer({playerId:P,playerName:z,selectedCardIds:S(A)}),B(`Jogador '${z}' (${P}) e sua cartela de 10 itens foram inicializados com sucesso!`,"success");const H=S(o).results.length+1;re(D,`equipe_${String(H+1).padStart(2,"0")}`),re(k,`Equipe Ratoeira #${H+1}`),re(A,Ui(ue,S(o).cards),!0)}catch(H){B(`Erro ao inicializar jogador: ${H.message}`,"error")}finally{re(a,"")}}async function xe(){if(N){re(a,"seed_demo_players");try{S(o).initialized||await N.init({thresholdDistanceMeters:Number(S(s))||1550,overwrite:!1});const C=[{playerId:"alfa_racing",playerName:"Alfa Mousetrap Racing"},{playerId:"torque_rato",playerName:"Torque de Ratoeira"},{playerId:"vetor_delta",playerName:"Vetor Delta Engenharia"}];for(const P of C){const z=Ui(ue,S(o).cards);await N.initPlayer({playerId:P.playerId,playerName:P.playerName,selectedCardIds:z})}B("3 jogadores/cartelas de demonstração inicializados nas subcoleções results e scores!","success")}catch(C){B(`Erro ao inicializar jogadores de demonstração: ${C.message}`,"error")}finally{re(a,"")}}}function Fe(C){const P=C==null?void 0:C.timestampMs,z=C==null?void 0:C.timestampIso,H=P?new Date(P):z?new Date(z):null;if(!H||Number.isNaN(H.getTime()))return"Timestamp pendente";const se=String(H.getDate()).padStart(2,"0"),fe=String(H.getMonth()+1).padStart(2,"0"),we=H.getFullYear(),Ae=String(H.getHours()).padStart(2,"0"),tt=String(H.getMinutes()).padStart(2,"0"),ze=String(H.getSeconds()).padStart(2,"0"),_t=String(H.getMilliseconds()).padStart(3,"0");return`${se}/${fe}/${we} ${Ae}:${tt}:${ze}.${_t}`}function Vt(){if(typeof window>"u")return;const C=JSON.stringify(S(o).logs,null,2),P=new Blob([C],{type:"application/json"}),z=URL.createObjectURL(P),H=document.createElement("a");H.href=z,H.download=`mousetrapbingo-logs-${S(o).sessionId}-${Date.now()}.json`,H.click(),URL.revokeObjectURL(z)}let je=rt(()=>Uu(S(A),S(o).cards)),gt=rt(()=>{var C;return new Set(((C=S(o).session)==null?void 0:C.occurringEventIds)??[])}),et=rt(()=>{const C=new Set;for(const P of S(o).cards)if(S(gt).has(P.id))for(const z of P.cardexcludes??[])C.add(z);return C}),Un=rt(()=>{const C=new Map;for(const P of S(o).cards)C.set(P.id,0);for(const P of S(o).results)Array.isArray(P.cardStates)&&P.cardStates.forEach((z,H)=>{z!==me.NOT_IN_BOARD&&C.set(H,(C.get(H)??0)+1)});return C}),Fo=rt(()=>{const C={all:S(o).logs.length};for(const P of L)P.type!=="all"&&(C[P.type]=0);for(const P of S(o).logs)C[P.type]=(C[P.type]??0)+1;return C}),St=rt(()=>{const C=S(m).trim().toLowerCase(),P=S(o).logs.filter(z=>S(d)!=="all"&&z.type!==S(d)?!1:C?`${z.label} ${z.message} ${JSON.stringify(z.details??{})}`.toLowerCase().includes(C):!0);return S(g)?[...P].reverse():P}),$e=rt(()=>{const C=new Map;for(const P of S(o).results)C.set(P.playerId,P);return C});var cr=kE(),Qt=G(cr),Ii=$(G(Qt),2),Yt=G(Ii),$o=$(G(Yt),2);{var Bo=C=>{var P=Tn("Firestore Conectado");de(C,P)},Es=C=>{var P=Tn("Modo Local (Fallback / localStorage)");de(C,P)};it($o,C=>{S(o).persistenceMode==="firestore"?C(Bo):C(Es,-1)})}U(Yt);var hn=$(Yt,2),lr=G(hn);{var ur=C=>{var P=Tn("SESSÃO NÃO INICIALIZADA");de(C,P)},hr=C=>{var P=Tn("● TORNEIO EM ANDAMENTO (LIVE)");de(C,P)},dr=C=>{var P=Tn("■ TORNEIO ENCERRADO (FINISHED)");de(C,P)},Ti=C=>{var P=Tn("◐ AGUARDANDO NO LOBBY");de(C,P)};it(lr,C=>{var P,z;S(o).initialized?((P=S(o).session)==null?void 0:P.status)===oe.LIVE?C(hr,1):((z=S(o).session)==null?void 0:z.status)===oe.FINISHED?C(dr,2):C(Ti,-1):C(ur)})}U(hn),U(Ii),U(Qt);var Ai=$(Qt,2);{var qo=C=>{var P=pE(),z=G(P),H=le(z,!0),se=$(z,2);U(P),st(()=>{It(P,1,`alert alert-${S(h)??""}`,"svelte-m7mmqe"),te(H,S(l))}),ot("click",se,()=>re(l,"")),de(C,P)};it(Ai,C=>{S(l)&&C(qo)})}var fr=$(Ai,2);{var mr=C=>{var P=gE(),z=$(G(P),2),H=G(z),se=le(H),fe=$(H,2),we=le(fe);U(z),U(P),st(Ae=>{te(se,`FECHAMENTO DE CARTELA REGISTRADO (${ue}/${ue} ITENS)!`),te(we,`Vencedor(es) com cartela fechada:
					${Ae??""}`)},[()=>S(o).completedPlayers.map(Ae=>`${Ae.playerName} (${Ae.playerId})`).join(", ")]),de(C,P)};it(fr,C=>{S(o).completedPlayers.length>0&&C(mr)})}var Is=$(fr,2),pr=G(Is),jn=G(pr),Ts=$(G(jn),2),wi=$(G(Ts)),Be=le(wi);Or(),U(Ts),U(jn);var qe=$(jn,2),dn=G(qe),As=$(G(dn),2);wn(As),U(dn);var ws=$(dn,2),Si=$(G(ws),2);wn(Si),U(ws);var zn=$(ws,2);{var bi=C=>{var P=_E(),z=G(P);wn(z),Or(2),U(P),ot("change",z,J),ea(z,()=>S(r),H=>re(r,H)),de(C,P)};it(zn,C=>{Hr&&C(bi)})}U(qe),U(pr);var Ss=$(pr,2),Hn=G(Ss),gr=$(Hn,2),_r=$(gr,2),Gn=$(_r,2),yr=$(Gn,2);U(Ss);var vr=$(Ss,2),Jt=G(vr),Er=$(G(Jt),2),Ir=le(Er);U(Jt);var bt=$(Jt,2),Ri=$(G(bt),2),bs=le(Ri,!0);U(bt);var Rs=$(bt,2),Kn=$(G(Rs),2),Ci=le(Kn);U(Rs);var ke=$(Rs,2),Di=$(G(ke),2),Wn=le(Di,!0);U(ke);var Xt=$(ke,2),Uo=$(G(Xt),2),jo=le(Uo);U(Xt);var Zt=$(Xt,2),zo=$(G(Zt),2),Ho=le(zo,!0);U(Zt),U(vr),U(Is);var fn=$(Is,2),Cs=G(fn),Qn=G(Cs),Yn=$(G(Qn),2),Nt=$(G(Yn)),Pi=le(Nt);Or(),U(Yn),U(Qn);var Tr=$(Qn,2),Jn=G(Tr),Ds=G(Jn);wn(Ds),Or(2),U(Jn);var Ps=$(Jn,2),Ar=G(Ps);wn(Ar),Or(2),U(Ps);var wr=$(Ps,2),Vs=le(wr);U(Tr),U(Cs);var Ns=$(Cs,2),Xn=G(Ns);js(Xn,21,()=>L,tl,(C,P)=>{var z=yE(),H=G(z),se=le(H,!0),fe=$(H,2),we=le(fe,!0);U(z),st(()=>{It(z,1,`chip ${S(d)===S(P).type?"active":""} chip-${S(P).type??""}`,"svelte-m7mmqe"),te(se,S(P).label),te(we,S(Fo)[S(P).type]??0)}),ot("click",z,()=>re(d,S(P).type,!0)),de(C,z)}),U(Xn);var mn=$(Xn,2),Ot=G(mn);wn(Ot),U(mn),U(Ns);var Zn=$(Ns,2),Go=G(Zn);{var Vi=C=>{var P=vE();de(C,P)},Ni=C=>{var P=el(),z=Zc(P);js(z,17,()=>S(St),H=>H.id,(H,se)=>{var fe=IE(),we=G(fe),Ae=G(we),tt=le(Ae),ze=$(Ae,2),_t=le(ze),yt=$(ze,2),vt=le(yt,!0);U(we);var kt=$(we,2),Mt=G(kt),_e=le(Mt,!0),vn=$(Mt,2);{var En=dt=>{var Et=EE(),Ft=$(G(Et),2),tn=le(Ft,!0);U(Et),st(De=>te(tn,De),[()=>JSON.stringify(S(se).details,null,2)]),de(dt,Et)},Lt=rt(()=>S(se).details&&Object.keys(S(se).details).length>0);it(vn,dt=>{S(Lt)&&dt(En)})}U(kt),U(fe),st((dt,Et)=>{It(fe,1,`log-entry log-type-${S(se).type??""}`,"svelte-m7mmqe"),te(tt,`#${dt??""}`),cs(ze,"datetime",S(se).timestampIso),cs(ze,"title",S(se).timestampIso),te(_t,`🕒 ${Et??""}`),It(yt,1,`log-badge badge-${S(se).type??""}`,"svelte-m7mmqe"),te(vt,S(se).label??$t[S(se).type]??S(se).type),te(_e,S(se).message)},[()=>String(S(se).seq??0).padStart(3,"0"),()=>Fe(S(se))]),de(H,fe)}),de(C,P)};it(Go,C=>{S(St).length===0?C(Vi):C(Ni,-1)})}U(Zn),Mf(Zn,C=>re(R,C),()=>S(R)),U(fn);var Sr=$(fn,2),es=G(Sr),Os=$(G(es),2);js(Os,21,()=>S(o).cards,C=>C.id,(C,P)=>{const z=rt(()=>S(gt).has(S(P).id)),H=rt(()=>S(et).has(S(P).id)),se=rt(()=>S(Un).get(S(P).id)??0);var fe=bE(),we=G(fe),Ae=G(we),tt=G(Ae),ze=le(tt),_t=$(tt,2),yt=le(_t,!0),vt=$(_t,2);{var kt=ce=>{var ye=TE(),In=le(ye);st(sn=>te(In,`Exclui: #${sn??""}`),[()=>S(P).cardexcludes.join(", #")]),de(ce,ye)};it(vt,ce=>{var ye;((ye=S(P).cardexcludes)==null?void 0:ye.length)>0&&ce(kt)})}U(Ae);var Mt=$(Ae,2),_e=le(Mt);U(we);var vn=$(we,2),En=le(vn,!0),Lt=$(vn,2),dt=G(Lt);{var Et=ce=>{var ye=AE();de(ce,ye)},Ft=ce=>{var ye=wE();de(ce,ye)},tn=ce=>{var ye=SE();de(ce,ye)};it(dt,ce=>{S(z)?ce(Et):S(H)?ce(Ft,1):ce(tn,-1)})}var De=$(dt,2),$s=G(De);{var Vr=ce=>{var ye=Tn();st(()=>te(ye,`Re-sincronizar Ocorrência #${S(P).id??""}`)),de(ce,ye)},nn=ce=>{var ye=Tn();st(()=>te(ye,`⚡ Registrar Ocorrência #${S(P).id??""}`)),de(ce,ye)};it($s,ce=>{S(z)?ce(Vr):ce(nn,-1)})}U(De),U(Lt),U(fe),st(()=>{It(fe,1,`catalog-card-item ${S(z)?"occurred":""} ${S(H)&&!S(z)?"excluded-warning":""}`,"svelte-m7mmqe"),te(ze,`#${S(P).id??""}`),te(yt,S(P).alias),te(_e,`👥 ${S(se)??""} cartela(s)`),te(En,S(P).guireptext),It(De,1,`btn btn-sm ${S(z)?"btn-outline":"btn-primary"}`,"svelte-m7mmqe"),De.disabled=S(a)!==""}),ot("click",De,()=>I(S(P).id)),de(C,fe)}),U(Os),U(es);var br=$(es,2),xs=G(br),Rr=G(xs),Cr=G(Rr),Dr=$(G(Cr),2),Oi=$(G(Dr),4);U(Dr),U(Cr);var xi=$(Cr,2);U(Rr);var en=$(Rr,2);{var Rt=C=>{var P=RE();de(C,P)},ks=C=>{var P=NE();js(P,23,()=>S(o).leaderboard,z=>z.playerId,(z,H,se)=>{const fe=rt(()=>S($e).get(S(H).playerId)),we=rt(()=>S(H).eventsMatchedSoFar>=ue);var Ae=VE(),tt=G(Ae),ze=G(tt),_t=G(ze),yt=le(_t),vt=$(_t,2),kt=G(vt),Mt=le(kt,!0),_e=$(kt,2),vn=le(_e,!0);U(vt),U(ze);var En=$(ze,2),Lt=G(En);{var dt=ce=>{var ye=CE();de(ce,ye)};it(Lt,ce=>{S(we)&&ce(dt)})}var Et=$(Lt,2),Ft=le(Et);U(En),U(tt);var tn=$(tt,2),De=le(tn),$s=$(tn,2);{var Vr=ce=>{var ye=PE();js(ye,21,()=>S(fe).cardStates,tl,(In,sn,ns)=>{var Li=el(),Fi=Zc(Li);{var ss=Bs=>{var rs=DE(),Nr=le(rs);st(()=>{It(rs,1,`board-chip ${S(sn)===me.MATCHED?"chip-matched":"chip-unmarked"}`,"svelte-m7mmqe"),cs(rs,"title",`Carta #${ns}: ${S(sn)===me.MATCHED?"Ocorrida/Marcada (1)":"Na cartela, aguardando (0)"}`),te(Nr,`#${ns} ${S(sn)===me.MATCHED?"✓":""}`)}),de(Bs,rs)};it(Fi,Bs=>{S(sn)!==me.NOT_IN_BOARD&&Bs(ss)})}de(In,Li)}),U(ye),st(()=>cs(ye,"title",`Estado das 20 cartas em results/${S(H).playerId??""}.cardStates`)),de(ce,ye)},nn=rt(()=>S(fe)&&Array.isArray(S(fe).cardStates));it($s,ce=>{S(nn)&&ce(Vr)})}U(Ae),st(ce=>{It(Ae,1,`player-score-card ${S(we)?"player-bingo":""}`,"svelte-m7mmqe"),te(yt,`#${S(se)+1}`),te(Mt,S(H).playerName),te(vn,S(H).playerId),te(Ft,`${S(H).eventsMatchedSoFar??""} / ${ue}`),It(De,1,`progress-bar-fill ${S(we)?"fill-bingo":""}`,"svelte-m7mmqe"),Uf(De,`width: ${ce??""}%`)},[()=>Math.min(100,Math.round(S(H).eventsMatchedSoFar/ue*100))]),de(z,Ae)}),U(P),de(C,P)};it(en,C=>{S(o).leaderboard.length===0?C(Rt):C(ks,-1)})}U(xs);var ts=$(xs,2),Ms=$(G(ts),2),ge=G(Ms),pn=G(ge),gn=$(G(pn),2);wn(gn),U(pn);var _n=$(pn,2),ki=$(G(_n),2);wn(ki),U(_n),U(ge);var Ls=$(ge,2),Pr=G(Ls),Ko=$(G(Pr)),Wo=le(Ko);U(Pr);var Qo=$(Pr,2);U(Ls);var yn=$(Ls,2);{var xt=C=>{var P=OE(),z=$(G(P),2);U(P),st(H=>te(z,`) entre as cartas:
							${H??""}`),[()=>S(je).conflicts.map(([H,se])=>`#${H} vs #${se}`).join(", ")]),de(C,P)};it(yn,C=>{S(je).valid||C(xt)})}var Fs=$(yn,2);js(Fs,21,()=>S(o).cards,C=>C.id,(C,P)=>{const z=rt(()=>S(A).includes(S(P).id));var H=xE(),se=G(H),fe=le(se),we=$(se,2),Ae=le(we,!0);U(H),st(()=>{It(H,1,`mini-card-btn ${S(z)?"selected":""}`,"svelte-m7mmqe"),cs(H,"title",S(P).guireptext),te(fe,`#${S(P).id??""}`),te(Ae,S(P).alias)}),ot("click",H,()=>E(S(P).id)),de(C,H)}),U(Fs);var Mi=$(Fs,2);U(Ms),U(ts),U(br),U(Sr),U(cr),st(C=>{var P,z,H,se;It(Yt,1,`persistence-pill ${S(o).persistenceMode==="firestore"?"firestore":"local"}`,"svelte-m7mmqe"),It(hn,1,`session-status-badge status-${(S(o).initialized?((P=S(o).session)==null?void 0:P.status)??"lobby":"uninitialized")??""}`,"svelte-m7mmqe"),te(Be,`bingo/${S(o).sessionId??""}`),Hn.disabled=S(a)!=="",gr.disabled=S(a)!==""||((z=S(o).session)==null?void 0:z.status)===oe.LIVE,_r.disabled=S(a)!==""||!S(o).initialized||((H=S(o).session)==null?void 0:H.status)===oe.FINISHED,Gn.disabled=S(a)!==""||!S(o).initialized||((se=S(o).session)==null?void 0:se.status)===oe.LOBBY,yr.disabled=S(a)!=="",te(Ir,`bingo/${S(o).sessionId??""}`),te(bs,C),te(Ci,`${S(o).cards.length??""} / ${lt??""}`),te(Wn,S(o).results.length),te(jo,`${S(gt).size??""} / ${lt??""}`),te(Ho,S(o).logs.length),te(Pi,`bingo/${S(o).sessionId??""}/logs`),wr.disabled=S(o).logs.length===0,te(Vs,`⬇ Exportar JSON (${S(o).logs.length??""})`),te(Oi,` (fechamento com ${ue} acertos).`),xi.disabled=S(a)!=="",te(Wo,`${S(A).length??""} / ${ue}`),Mi.disabled=S(a)!==""||S(A).length!==ue||!S(je).valid},[()=>{var C,P;return((P=(C=S(o).session)==null?void 0:C.status)==null?void 0:P.toUpperCase())??"NÃO CRIADO"}]),ot("change",As,J),kr(As,()=>S(t),C=>re(t,C)),kr(Si,()=>S(s),C=>re(s,C)),ot("click",Hn,()=>Q(!1)),ot("click",gr,T),ot("click",_r,p),ot("click",Gn,v),ot("click",yr,()=>Q(!0)),ea(Ds,()=>S(g),C=>re(g,C)),ea(Ar,()=>S(_),C=>re(_,C)),ot("click",wr,Vt),kr(Ot,()=>S(m),C=>re(m,C)),ot("click",xi,xe),kf("submit",Ms,y),kr(gn,()=>S(D),C=>re(D,C)),kr(ki,()=>S(k),C=>re(k,C)),ot("click",Qo,w),de(n,cr),Nf()}xf(["click","change"]);export{jE as T,qE as h};
