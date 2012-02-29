/**
 * Copyright (c) 2007-2011, Kaazing Corporation. All rights reserved.
 * 
 * Licensed under the Kaazing Corporation Developer Agreement (2010-02-22), see:
 * 
 *   http://www.kaazing.com/license
 */

var browser=null;
if(typeof(ActiveXObject)!="undefined"){browser="ie"
}else{if(Object.prototype.toString.call(window.opera)=="[object Opera]"){browser="opera"
}else{if(navigator.vendor.indexOf("Apple")!=-1){browser="safari"
}else{if(navigator.vendor.indexOf("Google")!=-1){if(navigator.userAgent.indexOf("Android")!=-1){browser="android"
}else{browser="chrome"
}}else{if(navigator.product=="Gecko"&&window.find&&!navigator.savePreferences){browser="firefox"
}else{throw new Error("couldn't detect browser")
}}}}}switch(browser){case"ie":(function(){if(document.createEvent===undefined){var a=function(){};
a.prototype.initEvent=function(h,i,g){this.type=h;
this.bubbles=i;
this.cancelable=g
};
document.createEvent=function(g){if(g!="Events"){throw new Error("Unsupported event name: "+g)
}return new a()
}
}document._w_3_c_d_o_m_e_v_e_n_t_s_createElement=document.createElement;
document.createElement=function(g){var i=this._w_3_c_d_o_m_e_v_e_n_t_s_createElement(g);
if(i.addEventListener===undefined){var h={};
i.addEventListener=function(k,l,j){i.attachEvent("on"+k,l);
return e(h,k,l,j)
};
i.removeEventListener=function(k,l,j){return d(h,k,l,j)
};
i.dispatchEvent=function(j){return f(h,j)
}
}return i
};
if(window.addEventListener===undefined){var b=document.createElement("div");
var c=(typeof(postMessage)==="undefined");
window.addEventListener=function(h,i,g){if(c&&h=="message"){b.addEventListener(h,i,g)
}else{window.attachEvent("on"+h,i)
}};
window.removeEventListener=function(h,i,g){if(c&&h=="message"){b.removeEventListener(h,i,g)
}else{window.detachEvent("on"+h,i)
}};
window.dispatchEvent=function(g){if(c&&g.type=="message"){b.dispatchEvent(g)
}else{window.fireEvent("on"+g.type,g)
}}
}function e(i,h,k,g){if(g){throw new Error("Not implemented")
}var j=i[h]||{};
i[h]=j;
j[k]=k
}function d(i,h,k,g){if(g){throw new Error("Not implemented")
}var j=i[h]||{};
delete j[k]
}function f(i,k){var g=k.type;
var j=i[g]||{};
for(var h in j){if(typeof(j[h])=="function"){try{j[h](k)
}catch(l){}}}}})();
break;
case"chrome":case"android":case"safari":if(typeof(window.postMessage)==="undefined"&&typeof(window.dispatchEvent)==="undefined"&&typeof(document.dispatchEvent)==="function"){window.dispatchEvent=function(a){document.dispatchEvent(a)
};
var addEventListener0=window.addEventListener;
window.addEventListener=function(b,c,a){if(b==="message"){document.addEventListener(b,c,a)
}else{addEventListener0.call(window,b,c,a)
}};
var removeEventListener0=window.removeEventListener;
window.removeEventListener=function(b,c,a){if(b==="message"){document.removeEventListener(b,c,a)
}else{removeEventListener0.call(window,b,c,a)
}}
}break;
case"opera":var addEventListener0=window.addEventListener;
window.addEventListener=function(b,d,a){var c=d;
if(b==="message"){c=function(f){if(f.origin===undefined&&f.uri!==undefined){var e=new URI(f.uri);
delete e.path;
delete e.query;
delete e.fragment;
f.origin=e.toString()
}return d(f)
};
d._$=c
}addEventListener0.call(window,b,c,a)
};
var removeEventListener0=window.removeEventListener;
window.removeEventListener=function(b,d,a){var c=d;
if(b==="message"){c=d._$
}removeEventListener0.call(window,b,c,a)
};
break
}function URI(h){h=h||"";
var b=0;
var e=h.indexOf("://");
if(e!=-1){this.scheme=h.slice(0,e);
b=e+3;
var d=h.indexOf("/",b);
if(d==-1){d=h.length;
h+="/"
}var f=h.slice(b,d);
this.authority=f;
b=d;
this.host=f;
var c=f.indexOf(":");
if(c!=-1){this.host=f.slice(0,c);
this.port=parseInt(f.slice(c+1),10);
if(isNaN(this.port)){throw new Error("Invalid URI syntax")
}}}var g=h.indexOf("?",b);
if(g!=-1){this.path=h.slice(b,g);
b=g+1
}var a=h.indexOf("#",b);
if(a!=-1){if(g!=-1){this.query=h.slice(b,a)
}else{this.path=h.slice(b,a)
}b=a+1;
this.fragment=h.slice(b)
}else{if(g!=-1){this.query=h.slice(b)
}else{this.path=h.slice(b)
}}}(function(){var a=URI.prototype;
a.toString=function(){var e=[];
var d=this.scheme;
if(d!==undefined){e.push(d);
e.push("://");
e.push(this.host);
var c=this.port;
if(c!==undefined){e.push(":");
e.push(c.toString())
}}if(this.path!==undefined){e.push(this.path)
}if(this.query!==undefined){e.push("?");
e.push(this.query)
}if(this.fragment!==undefined){e.push("#");
e.push(this.fragment)
}return e.join("")
};
var b={http:80,ws:80,https:443,wss:443}
})();
(function(){Base64={};
Base64.encode=function(g){var f=[];
var h;
var e;
var d;
while(g.length){switch(g.length){case 1:h=g.shift();
f.push(c[(h>>2)&63]);
f.push(c[((h<<4)&48)]);
f.push("=");
f.push("=");
break;
case 2:h=g.shift();
e=g.shift();
f.push(c[(h>>2)&63]);
f.push(c[((h<<4)&48)|((e>>4)&15)]);
f.push(c[(e<<2)&60]);
f.push("=");
break;
default:h=g.shift();
e=g.shift();
d=g.shift();
f.push(c[(h>>2)&63]);
f.push(c[((h<<4)&48)|((e>>4)&15)]);
f.push(c[((e<<2)&60)|((d>>6)&3)]);
f.push(c[d&63]);
break
}}return f.join("")
};
Base64.decode=function(j){if(j.length===0){return[]
}if(j.length%4!==0){throw new Error("Invalid base64 string (must be quads)")
}var o=[];
for(var d=0;
d<j.length;
d+=4){var l=j.charAt(d);
var h=j.charAt(d+1);
var f=j.charAt(d+2);
var e=j.charAt(d+3);
var n=a[l];
var m=a[h];
var k=a[f];
var g=a[e];
o.push(((n<<2)&252)|((m>>4)&3));
if(f!="="){o.push(((m<<4)&240)|((k>>2)&15));
if(e!="="){o.push(((k<<6)&192)|(g&63))
}}}return o
};
var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
var a={"=":0};
for(var b=0;
b<c.length;
b++){a[c[b]]=b
}if(typeof(window.btoa)==="undefined"){window.btoa=function(f){var d=f.split("");
for(var e=0;
e<d.length;
e++){d[e]=(d[e]).charCodeAt()
}return Base64.encode(d)
};
window.atob=function(d){var e=Base64.decode(d);
for(var f=0;
f<e.length;
f++){e[f]=String.fromCharCode(e[f])
}return e.join("")
}
}})();
var postMessage0=(function(){var g=new URI((browser=="ie")?document.URL:location.href);
var u={http:80,https:443};
if(g.port==null){g.port=u[g.scheme];
g.authority=g.host+":"+g.port
}var y=g.scheme+"://"+g.authority;
var s="/.kr";
if(typeof(postMessage)!=="undefined"){return function(D,C,i){if(typeof(C)!="string"){throw new Error("Unsupported type. Messages must be strings")
}switch(browser){case"ie":case"opera":case"firefox":setTimeout(function(){D.postMessage(C,i)
},0);
break;
default:D.postMessage(C,i);
break
}}
}else{function v(i){this.sourceToken=d(Math.floor(Math.random()*(Math.pow(2,32)-1)),8);
this.iframe=i;
this.bridged=false;
this.lastWrite=0;
this.lastRead=0;
this.lastReadIndex=2;
this.lastSyn=0;
this.lastAck=0;
this.queue=[];
this.escapedFragments=[]
}var w=v.prototype;
w.attach=function(H,C,D,i,G,F){this.target=H;
this.targetOrigin=C;
this.targetToken=D;
this.reader=i;
this.writer=G;
this.writerURL=F;
try{this._lastHash=i.location.hash;
this.poll=e
}catch(E){this._lastDocumentURL=i.document.URL;
this.poll=c
}if(H==parent){b(this,true)
}};
w.detach=function(){this.poll=function(){};
delete this.target;
delete this.targetOrigin;
delete this.reader;
delete this.lastFragment;
delete this.writer;
delete this.writerURL
};
w.poll=function(){};
function e(){var i=this.reader.location.hash;
if(this._lastHash!=i){l(this,i.substring(1));
this._lastHash=i
}}function c(){var C=this.reader.document.URL;
if(this._lastDocumentURL!=C){var i=C.indexOf("#");
if(i!=-1){l(this,C.substring(i+1));
this._lastDocumentURL=C
}}}w.post=function(F,E,i){p(this,F);
var H=1000;
var C=escape(E);
var G=[];
while(C.length>H){var D=C.substring(0,H);
C=C.substring(H);
G.push(D)
}G.push(C);
this.queue.push([i,G]);
if(this.writer!=null&&this.lastAck>=this.lastSyn){b(this,false)
}};
function p(N,M){if(N.lastWrite<1&&!N.bridged){if(M.parent==window){var C=N.iframe.src;
var G=C.split("#");
var Q=null;
var R=document.getElementsByTagName("meta");
for(var H=0;
H<R.length;
H++){if(R[H].name=="kaazing:resources"){alert('kaazing:resources is no longer supported. Please refer to the Administrator\'s Guide section entitled "Configuring a Web Server to Integrate with Kaazing Gateway"')
}}var E=y;
var K=E.toString()+s+"?.kr=xsp&.kv=10.05";
if(Q){var J=new URI(E.toString());
var G=Q.split(":");
J.host=G.shift();
if(G.length){J.port=G.shift()
}K=J.toString()+s+"?.kr=xsp&.kv=10.05"
}for(var H=0;
H<R.length;
H++){if(R[H].name=="kaazing:postMessageBridgeURL"){var F=R[H].content;
var L=new URI(F);
var D=new URI(location.toString());
if(!L.authority){L.host=D.host;
L.port=D.port;
L.scheme=D.scheme;
if(F.indexOf("/")!=0){var P=D.path.split("/");
P.pop();
P.push(F);
L.path=P.join("/")
}}n.BridgeURL=L.toString()
}}if(n.BridgeURL){K=n.BridgeURL
}var O=["I",E,N.sourceToken,escape(K)];
if(G.length>1){var I=G[1];
O.push(escape(I))
}G[1]=O.join("!");
setTimeout(function(){M.location.replace(G.join("#"))
},200);
N.bridged=true
}}}function q(D,C){var i=D.writerURL+"#"+C;
D.writer.location.replace(i)
}function x(i){return parseInt(i,16)
}function d(D,i){var C=D.toString(16);
var E=[];
i-=C.length;
while(i-->0){E.push("0")
}E.push(C);
return E.join("")
}function b(I,J){var G=I.queue;
var M=I.lastRead;
if((G.length>0||J)&&I.lastSyn>I.lastAck){var D=I.lastFrames;
var C=I.lastReadIndex;
if(x(D[C])!=M){D[C]=d(M,8);
q(I,D.join(""))
}}else{if(G.length>0){var K=G.shift();
var E=K[0];
if(E=="*"||E==I.targetOrigin){I.lastWrite++;
var L=K[1];
var F=L.shift();
var H=3;
var D=[I.targetToken,d(I.lastWrite,8),d(M,8),"F",d(F.length,4),F];
var C=2;
if(L.length>0){D[H]="f";
I.queue.unshift(K)
}if(I.resendAck){var i=[I.targetToken,d(I.lastWrite-1,8),d(M,8),"a"];
D=i.concat(D);
C+=i.length
}q(I,D.join(""));
I.lastFrames=D;
I.lastReadIndex=C;
I.lastSyn=I.lastWrite;
I.resendAck=false
}}else{if(J){I.lastWrite++;
var D=[I.targetToken,d(I.lastWrite,8),d(M,8),"a"];
var C=2;
if(I.resendAck){var i=[I.targetToken,d(I.lastWrite-1,8),d(M,8),"a"];
D=i.concat(D);
C+=i.length
}q(I,D.join(""));
I.lastFrames=D;
I.lastReadIndex=C;
I.resendAck=true
}}}}function l(F,I){var i=I.substring(0,8);
var L=x(I.substring(8,16));
var E=x(I.substring(16,24));
var G=I.charAt(24);
if(i!=F.sourceToken){throw new Error("postMessage emulation tampering detected")
}var J=F.lastRead;
var H=J+1;
if(L==H){F.lastRead=H
}if(L==H||L==J){F.lastAck=E
}if(L==H||(L==J&&G=="a")){switch(G){case"f":var D=I.substr(29,x(I.substring(25,29)));
F.escapedFragments.push(D);
b(F,true);
break;
case"F":var C=I.substr(29,x(I.substring(25,29)));
if(F.escapedFragments!==undefined){F.escapedFragments.push(C);
C=F.escapedFragments.join("");
F.escapedFragments=[]
}var K=unescape(C);
B(K,F.target,F.targetOrigin);
b(F,true);
break;
case"a":if(I.length>25){l(F,I.substring(25))
}else{b(F,false)
}break;
default:throw new Error("unknown postMessage emulation payload type: "+G)
}}}function B(D,E,C){var i=document.createEvent("Events");
i.initEvent("message",false,true);
i.data=D;
i.origin=C;
i.source=E;
dispatchEvent(i)
}var k={};
var A=[];
function f(){for(var E=0,C=A.length;
E<C;
E++){var D=A[E];
D.poll()
}setTimeout(f,20)
}function o(F){if(F==parent){return k.parent
}else{if(F.parent==window){var E=document.getElementsByTagName("iframe");
for(var C=0;
C<E.length;
C++){var D=E[C];
if(F==D.contentWindow){return m(D)
}}}else{throw new Error("Generic peer postMessage not yet implemented")
}}}function m(D){var C=D._name;
if(C===undefined){C="iframe$"+String(Math.random()).substring(2);
D._name=C
}var i=k[C];
if(i===undefined){i=new v(D);
k[C]=i
}return i
}function n(E,D,i){if(typeof(D)!="string"){throw new Error("Unsupported type. Messages must be strings")
}if(E==window){if(i=="*"||i==y){B(D,window,y)
}}else{var C=o(E);
C.post(E,D,i)
}}n.attach=function(H,C,E,i,G,F){var D=o(H);
D.attach(H,C,E,i,G,F);
A.push(D)
};
var a=function(D){var E=new URI((browser=="ie")?document.URL:location.href);
var F;
var R={http:80,https:443};
if(E.port==null){E.port=R[E.scheme];
E.authority=E.host+":"+E.port
}var I=unescape(E.fragment||"");
if(I.length>0){var C=I.split(",");
var N=C.shift();
var i=C.shift();
var T=C.shift();
var K=E.scheme+"://"+document.domain+":"+E.port;
var Q=E.scheme+"://"+E.authority;
var G=N+"/.kr?.kr=xsc&.kv=10.05";
var M=document.location.toString().split("#")[0];
var J=G+"#"+escape([K,i,escape(M)].join(","));
if(typeof(ActiveXObject)!="undefined"){F=new ActiveXObject("htmlfile");
F.open();
try{F.parentWindow.opener=window
}catch(P){if(D){F.domain=D
}F.parentWindow.opener=window
}F.write("<html>");
F.write("<body>");
if(D){F.write("<script>CollectGarbage();document.domain='"+D+"';<\/script>")
}F.write('<iframe src="'+G+'"></iframe>');
F.write("</body>");
F.write("</html>");
F.close();
var H=F.body.lastChild;
var O=F.parentWindow;
var U=parent;
var L=U.parent.postMessage0;
if(typeof(L)!="undefined"){H.onload=function(){var V=H.contentWindow;
V.location.replace(J);
L.attach(U,N,T,O,V,G)
}
}}else{var H=document.createElement("iframe");
H.src=J;
document.body.appendChild(H);
var O=window;
var S=H.contentWindow;
var U=parent;
var L=U.parent.postMessage0;
if(typeof(L)!="undefined"){L.attach(U,N,T,O,S,G)
}}}window.onunload=function(){try{var W=window.parent.parent.postMessage0;
if(typeof(W)!="undefined"){W.detach(U)
}}catch(V){}if(typeof(F)!=="undefined"){F.parentWindow.opener=null;
F.open();
F.close();
F=null;
CollectGarbage()
}}
};
n.__init__=function(C,D){var i=a.toString();
C.URI=URI;
C.browser=browser;
if(!D){D=""
}C.setTimeout("("+i+")('"+D+"')",0)
};
n.bridgeURL=false;
n.detach=function(E){var C=o(E);
for(var D=0;
D<A.length;
D++){if(A[D]==C){A.splice(D,1)
}}C.detach()
};
if(window!=top){k.parent=new v();
function h(){var F=new URI((browser=="ie")?document.URL:location.href);
var J=F.fragment||"";
if(document.body!=null&&J.length>0&&J.charAt(0)=="I"){var N=unescape(J);
var G=N.split("!");
if(G.shift()=="I"){var i=G.shift();
var E=G.shift();
var K=unescape(G.shift());
var H=y;
if(i==H){try{parent.location.hash
}catch(C){document.domain=document.domain
}}var I=G.shift()||"";
switch(browser){case"firefox":location.replace([location.href.split("#")[0],I].join("#"));
break;
default:location.hash=I;
break
}var D=o(parent);
D.targetToken=E;
var O=D.sourceToken;
var M=K+"#"+escape([H,E,O].join(","));
var L;
L=document.createElement("iframe");
L.src=M;
L.style.position="absolute";
L.style.left="-10px";
L.style.top="10px";
L.style.visibility="hidden";
L.style.width="0px";
L.style.height="0px";
document.body.appendChild(L);
return
}}setTimeout(h,20)
}h()
}var j=document.getElementsByTagName("meta");
for(var t=0;
t<j.length;
t++){if(j[t].name==="kaazing:postMessage"){if("immediate"==j[t].content){var r=function(){var F=document.getElementsByTagName("iframe");
for(var D=0;
D<F.length;
D++){var E=F[D];
if(E.style.KaaPostMessage=="immediate"){E.style.KaaPostMessage="none";
var C=m(E);
p(C,E.contentWindow)
}}setTimeout(r,20)
};
setTimeout(r,20)
}break
}}for(var t=0;
t<j.length;
t++){if(j[t].name==="kaazing:postMessagePrefix"){var z=j[t].content;
if(z!=null&&z.length>0){if(z.charAt(0)!="/"){z="/"+z
}s=z
}}}setTimeout(f,20);
return n
}})();
var XMLHttpRequest0=(function(){var e=new URI((browser=="ie")?document.URL:location.href);
var g={http:80,https:443};
if(e.port==null){e.port=g[e.scheme];
e.authority=e.host+":"+e.port
}var b={};
var a={};
var c=0;
function n(){if(browser=="firefox"&&typeof(Object.getPrototypeOf)=="function"){var o=new XMLHttpRequest();
o.withCredentials=true;
return o
}}var h=n.prototype;
h.readyState=0;
h.responseText="";
h.status=0;
h.statusText="";
h.timeout=0;
h.onreadystatechange;
h.onerror;
h.onload;
h.onprogress;
h.open=function(t,o,q){if(!q){throw new Error("Asynchronous is required for cross-origin XMLHttpRequest emulation")
}switch(this.readyState){case 0:case 4:break;
default:throw new Error("Invalid ready state")
}if(o.indexOf(".kv=")==-1){o+=((o.indexOf("?")==-1)?"?":"&")+".kv=10.05"
}else{o=o.replace(/\.kv=[^&]*(.*)/,".kv=10.05$1")
}var s=l(this);
var p=j(this,o);
p.attach(s);
this._pipe=p;
this._requestHeaders=[];
this._method=t;
this._location=o;
this._responseHeaders=null;
this.readyState=1;
this.status=0;
this.statusText="";
this.responseText="";
var r=this;
setTimeout(function(){r.readyState=1;
m(r)
},0)
};
h.setRequestHeader=function(o,p){if(this.readyState!==1){throw new Error("Invalid ready state")
}this._requestHeaders.push([o,p])
};
h.send=function(p){if(this.readyState!==1){throw new Error("Invalid ready state")
}var o=this;
setTimeout(function(){o.readyState=2;
m(o)
},0);
k(this,p)
};
h.abort=function(){var o=this._pipe;
if(o!==undefined){o.post(["a",this._id].join(""));
o.detach(this._id)
}};
h.getResponseHeader=function(o){if(this.status==0){throw new Error("Invalid ready state")
}var p=this._responseHeaders;
return p[o]
};
h.getAllResponseHeaders=function(){if(this.status==0){throw new Error("Invalid ready state")
}return null
};
function m(o){if(typeof(o.onreadystatechange)!=="undefined"){o.onreadystatechange()
}switch(o.readyState){case 3:if(typeof(o.onprogress)!=="undefined"){o.onprogress()
}break;
case 4:if(o.status<100||o.status>=500){if(typeof(o.onerror)!=="undefined"){o.onerror()
}}else{if(typeof(o.onprogress)!=="undefined"){o.onprogress()
}if(typeof(o.onload)!=="undefined"){o.onload()
}}break
}}function l(o){var p=i(c++,8);
a[p]=o;
o._id=p;
return p
}function k(r,t){if(typeof(t)!=="string"){t=""
}var o=r._method.substring(0,10);
var u=r._location;
var q=r._requestHeaders;
var s=i(r.timeout,4);
var v=(r.onprogress!==undefined)?"t":"f";
var x=["s",r._id,o.length,o,i(u.length,4),u,i(q.length,4)];
for(var p=0;
p<q.length;
p++){var w=q[p];
x.push(i(w[0].length,4));
x.push(w[0]);
x.push(i(w[1].length,4));
x.push(w[1])
}x.push(i(t.length,8),t,i(s,4),v);
r._pipe.post(x.join(""))
}function j(v,y){var p=new URI(y);
var q=(p.scheme!=null&&p.authority!=null);
var x=q?p.scheme:e.scheme;
var B=q?p.authority:e.authority;
if(B!=null&&p.port==null){B=p.host+":"+g[x]
}var t=x+"://"+B;
var r=b[t];
if(r!==undefined){if(!("iframe" in r&&"contentWindow" in r.iframe&&typeof r.iframe.contentWindow=="object")){r=b[t]=undefined
}}if(r===undefined){var s=document.createElement("iframe");
s.style.position="absolute";
s.style.left="-10px";
s.style.top="10px";
s.style.visibility="hidden";
s.style.width="0px";
s.style.height="0px";
var A=new URI(t);
A.query=".kr=xs&.kv=10.05";
A.path="/";
s.src=A.toString();
function z(C){this.buffer.push(C)
}function u(D){var C=this.attached[D];
if(C===undefined){C={};
this.attached[D]=C
}if(C.timerID!==undefined){clearTimeout(C.timerID);
delete C.timerID
}}function w(E){var C=this.attached[E];
if(C!==undefined&&C.timerID===undefined){var D=this;
C.timerID=setTimeout(function(){delete D.attached[E];
var F=a[E];
if(F._pipe==r){delete a[E];
delete F._id;
delete F._pipe
}postMessage0(r.iframe.contentWindow,["d",E].join(""),r.targetOrigin)
},10000)
}}r={targetOrigin:t,iframe:s,buffer:[],post:z,attach:u,detach:w,attached:{count:0}};
b[t]=r;
function o(){var C=s.contentWindow;
if(!C){setTimeout(o,20)
}else{postMessage0(C,"I",t)
}}r.handshakeID=setTimeout(function(){b[t]=undefined;
r.post=function(C){v.readyState=4;
v.status=0;
m(v)
};
if(r.buffer.length>0){r.post()
}},30000);
document.body.appendChild(s);
o()
}return r
}function d(D){var I=D.origin;
var E={http:":80",https:":443"};
var y=I.split(":");
if(y.length===2){I+=E[y[0]]
}var C=b[I];
if(C!==undefined&&C.iframe!==undefined&&D.source==C.iframe.contentWindow){if(D.data=="I"){clearTimeout(C.handshakeID);
var x;
while((x=C.buffer.shift())!==undefined){postMessage0(C.iframe.contentWindow,x,C.targetOrigin)
}C.post=function(M){postMessage0(C.iframe.contentWindow,M,C.targetOrigin)
}
}else{var x=D.data;
if(x.length>=9){var J=0;
var p=x.substring(J,J+=1);
var z=x.substring(J,J+=8);
var r=a[z];
if(r!==undefined){switch(p){case"r":var q={};
var G=f(x.substring(J,J+=2));
for(var F=0;
F<G;
F++){var u=f(x.substring(J,J+=4));
var t=x.substring(J,J+=u);
var s=f(x.substring(J,J+=4));
var A=x.substring(J,J+=s);
q[t]=A
}var B=f(x.substring(J,J+=4));
var L=f(x.substring(J,J+=2));
var H=x.substring(J,J+=L);
switch(B){case 301:case 302:case 307:var w=q.Location;
var z=l(r);
var C=j(r,w);
C.attach(z);
r._pipe=C;
r._method="GET";
r._location=w;
r._redirect=true;
break;
default:r._responseHeaders=q;
r.status=B;
r.statusText=H;
break
}break;
case"p":var o=parseInt(x.substring(J,J+=1));
if(r._id===z){r.readyState=o;
var K=f(x.substring(J,J+=8));
var v=x.substring(J,J+=K);
if(v.length>0){r.responseText+=v
}m(r)
}else{if(r._redirect){r._redirect=false;
k(r,"")
}}if(o==4){C.detach(z)
}break;
case"e":if(r._id===z){r.status=0;
r.statusText="";
r.readyState=4;
m(r)
}C.detach(z);
break;
case"t":if(r._id===z){r.status=0;
r.statusText="";
r.readyState=4;
if(typeof(r.ontimeout)!=="undefined"){r.ontimeout()
}}C.detach(z);
break
}}}}}else{}}function f(o){return parseInt(o,16)
}function i(q,o){var p=q.toString(16);
var r=[];
o-=p.length;
while(o-->0){r.push("0")
}r.push(p);
return r.join("")
}window.addEventListener("message",d,false);
return n
})();
ByteOrder=function(){};
(function(){var g=ByteOrder.prototype;
g.toString=function(){throw new Error("Abstract")
};
var d=function(m){return(m&255)
};
var i=function(m){return(m&128)?(m|-256):m
};
var c=function(m){return[((m>>8)&255),(m&255)]
};
var l=function(m,n){return(i(m)<<8)|(n&255)
};
var b=function(m,n){return((m&255)<<8)|(n&255)
};
var e=function(m,n,o){return((m&255)<<16)|((n&255)<<8)|(o&255)
};
var j=function(m){return[((m>>16)&255),((m>>8)&255),(m&255)]
};
var k=function(m,n,o){return((m&255)<<16)|((n&255)<<8)|(o&255)
};
var f=function(m){return[((m>>24)&255),((m>>16)&255),((m>>8)&255),(m&255)]
};
var h=function(p,m,n,o){return(i(p)<<24)|((m&255)<<16)|((n&255)<<8)|(o&255)
};
var a=function(r,m,o,q){var n=b(r,m);
var p=b(o,q);
return(n*65536+p)
};
ByteOrder.BIG_ENDIAN=(function(){var n=function(){};
n.prototype=new ByteOrder();
var m=n.prototype;
m._toUnsignedByte=d;
m._toByte=i;
m._fromShort=c;
m._toShort=l;
m._toUnsignedShort=b;
m._toUnsignedMediumInt=e;
m._fromMediumInt=j;
m._toMediumInt=k;
m._fromInt=f;
m._toInt=h;
m._toUnsignedInt=a;
m.toString=function(){return"<ByteOrder.BIG_ENDIAN>"
};
return new n()
})();
ByteOrder.LITTLE_ENDIAN=(function(){var n=function(){};
n.prototype=new ByteOrder();
var m=n.prototype;
m._toByte=i;
m._toUnsignedByte=d;
m._fromShort=function(o){return c(o).reverse()
};
m._toShort=function(o,p){return l(p,o)
};
m._toUnsignedShort=function(o,p){return b(p,o)
};
m._toUnsignedMediumInt=function(o,p,q){return e(q,p,o)
};
m._fromMediumInt=function(o){return j(o).reverse()
};
m._toMediumInt=function(r,s,t,o,p,q){return k(q,p,o,t,s,r)
};
m._fromInt=function(o){return f(o).reverse()
};
m._toInt=function(r,o,p,q){return h(q,p,o,r)
};
m._toUnsignedInt=function(r,o,p,q){return a(q,p,o,r)
};
m.toString=function(){return"<ByteOrder.LITTLE_ENDIAN>"
};
return new n()
})()
})();
function ByteBuffer(a){this.array=a||[];
this._mark=-1;
this.limit=this.capacity=this.array.length;
this.order=ByteOrder.BIG_ENDIAN
}(function(){ByteBuffer.allocate=function(f){var g=new ByteBuffer();
g.capacity=f;
g.limit=f;
return g
};
ByteBuffer.wrap=function(f){return new ByteBuffer(f)
};
var a=ByteBuffer.prototype;
a.autoExpand=true;
a.capacity=0;
a.position=0;
a.limit=0;
a.order=ByteOrder.BIG_ENDIAN;
a.array=[];
a.mark=function(){this._mark=this.position;
return this
};
a.reset=function(){var f=this._mark;
if(f<0){throw new Error("Invalid mark")
}this.position=f;
return this
};
a.compact=function(){this.array.splice(0,this.position);
this.limit-=this.position;
this.position=0;
return this
};
a.duplicate=function(){var f=new ByteBuffer(this.array);
f.position=this.position;
f.limit=this.limit;
f.capacity=this.capacity;
return f
};
a.fill=function(f){d(this,f);
while(f-->0){this.put(0)
}return this
};
a.fillWith=function(f,g){d(this,g);
while(g-->0){this.put(f)
}return this
};
a.indexOf=function(f){var g=this.limit;
var j=this.array;
for(var h=this.position;
h<g;
h++){if(j[h]==f){return h
}}return -1
};
a.put=function(f){d(this,1);
this.putAt(this.position++,f);
return this
};
a.putAt=function(g,f){b(this,g,1);
this.array[g]=this.order._toUnsignedByte(f);
return this
};
a.putUnsigned=function(f){d(this,1);
this.putUnsignedAt(this.position,f&255);
this.position+=1;
return this
};
a.putUnsignedAt=function(g,f){b(this,g,1);
this.putAt(g,f&255);
return this
};
a.putShort=function(f){d(this,2);
this.putShortAt(this.position,f);
this.position+=2;
return this
};
a.putShortAt=function(g,f){b(this,g,2);
this.putBytesAt(g,this.order._fromShort(f));
return this
};
a.putUnsignedShort=function(f){d(this,2);
this.putUnsignedShortAt(this.position,f&65535);
this.position+=2;
return this
};
a.putUnsignedShortAt=function(g,f){b(this,g,2);
this.putShortAt(g,f&65535);
return this
};
a.putMediumInt=function(f){d(this,3);
this.putMediumIntAt(this.position,f);
this.position+=3;
return this
};
a.putMediumIntAt=function(g,f){this.putBytesAt(g,this.order._fromMediumInt(f));
return this
};
a.putInt=function(f){d(this,4);
this.putIntAt(this.position,f);
this.position+=4;
return this
};
a.putIntAt=function(g,f){b(this,g,4);
this.putBytesAt(g,this.order._fromInt(f));
return this
};
a.putUnsignedInt=function(f){d(this,4);
this.putUnsignedIntAt(this.position,f&4294967295);
this.position+=4;
return this
};
a.putUnsignedIntAt=function(g,f){b(this,g,4);
this.putIntAt(g,f&4294967295);
return this
};
a.putString=function(f,g){g.encode(f,this);
return this
};
a.putPrefixedString=function(g,h,i){if(typeof(i)==="undefined"||typeof(i.encode)==="undefined"){throw new Error("ByteBuffer.putPrefixedString: character set parameter missing")
}if(g===0){return this
}d(this,g);
var f=h.length;
switch(g){case 1:this.put(f);
break;
case 2:this.putShort(f);
break;
case 4:this.putInt(f);
break
}i.encode(h,this);
return this
};
a.putBytes=function(f){d(this,f.length);
this.putBytesAt(this.position,f);
this.position+=f.length;
return this
};
a.putBytesAt=function(l,h){b(this,l,h.length);
for(var i=0,g=l,f=h.length;
i<f;
i++,g++){this.putAt(g,h[i])
}return this
};
a.putBuffer=function(f){this.putBytes(f.array.slice(f.position,f.limit));
return this
};
a.putBufferAt=function(g,f){this.putBytesAt(g,f.array.slice(f.position,f.limit));
return this
};
a.get=function(){e(this,1);
return this.getAt(this.position++)
};
a.getAt=function(f){c(this,f,1);
return this.order._toByte(this.array[f])
};
a.getUnsigned=function(){e(this,1);
var f=this.getUnsignedAt(this.position);
this.position+=1;
return f
};
a.getUnsignedAt=function(f){c(this,f,1);
return this.order._toUnsignedByte(this.array[f])
};
a.getBytes=function(h){e(this,h);
var f=new Array();
for(var g=0;
g<h;
g++){f.push(this.order._toByte(this.array[g+this.position]))
}this.position+=h;
return f
};
a.getBytesAt=function(g,j){c(this,g,j);
var f=new Array();
this.position=g;
for(var h=0;
h<j;
h++){f.push(this.order._toByte(this.array[h+this.position]))
}this.position+=j;
return f
};
a.getShort=function(){e(this,2);
var f=this.getShortAt(this.position);
this.position+=2;
return f
};
a.getShortAt=function(f){c(this,f,2);
var g=this.array;
return this.order._toShort(g[f++],g[f++])
};
a.getUnsignedShort=function(){e(this,2);
var f=this.getUnsignedShortAt(this.position);
this.position+=2;
return f
};
a.getUnsignedShortAt=function(f){c(this,f,2);
var g=this.array;
return this.order._toUnsignedShort(g[f++],g[f++])
};
a.getUnsignedMediumInt=function(){var f=this.array;
return this.order._toUnsignedMediumInt(f[this.position++],f[this.position++],f[this.position++])
};
a.getMediumInt=function(){var f=this.getMediumIntAt(this.position);
this.position+=3;
return f
};
a.getMediumIntAt=function(f){var g=this.array;
return this.order._toMediumInt(g[f++],g[f++],g[f++])
};
a.getInt=function(){e(this,4);
var f=this.getIntAt(this.position);
this.position+=4;
return f
};
a.getIntAt=function(f){c(this,f,4);
var g=this.array;
return this.order._toInt(g[f++],g[f++],g[f++],g[f++])
};
a.getUnsignedInt=function(){e(this,4);
var f=this.getUnsignedIntAt(this.position);
this.position+=4;
return f
};
a.getUnsignedIntAt=function(f){c(this,f,4);
var g=this.array;
return this.order._toUnsignedInt(g[f++],g[f++],g[f++],g[f++]);
return val
};
a.getPrefixedString=function(g,h){var f=0;
switch(g||2){case 1:f=this.getUnsigned();
break;
case 2:f=this.getUnsignedShort();
break;
case 4:f=this.getInt();
break
}if(f===0){return""
}var i=this.limit;
try{this.limit=this.position+f;
return h.decode(this)
}finally{this.limit=i
}};
a.getString=function(g){var f=this.position;
var h=this.limit;
var i=this.array;
while(f<h&&i[f]!==0){f++
}try{this.limit=f;
return g.decode(this)
}finally{if(f!=h){this.limit=h;
this.position=f+1
}}};
a.slice=function(){return new ByteBuffer(this.array.slice(this.position,this.limit))
};
a.flip=function(){this.limit=this.position;
this.position=0;
this._mark=-1;
return this
};
a.rewind=function(){this.position=0;
this._mark=-1;
return this
};
a.clear=function(){this.position=0;
this.limit=this.capacity;
this._mark=-1;
return this
};
a.remaining=function(){return(this.limit-this.position)
};
a.hasRemaining=function(){return(this.limit>this.position)
};
a.skip=function(f){this.position+=f;
return this
};
a.getHexDump=function(){var l=this.array;
var k=this.position;
var f=this.limit;
if(k==f){return"empty"
}var j=[];
for(var g=k;
g<f;
g++){var h=(l[g]||0).toString(16);
if(h.length==1){h="0"+h
}j.push(h)
}return j.join(" ")
};
a.toString=a.getHexDump;
a.expand=function(f){return this.expandAt(this.position,f)
};
a.expandAt=function(g,h){var f=g+h;
if(f>this.capacity){this.capacity=f
}if(f>this.limit){this.limit=f
}return this
};
function d(g,f){if(g.autoExpand){g.expand(f)
}return g
}function e(h,g){var f=h.position+g;
if(f>h.limit){throw new Error("Buffer underflow")
}return h
}function c(i,g,h){var f=g+h;
if(g<0||f>i.limit){throw new Error("Index out of bounds")
}return i
}function b(i,g,h){var f=g+h;
if(g<0||f>i.limit){throw new Error("Index out of bounds")
}return i
}})();
function Charset(){}(function(){var a=Charset.prototype;
a.decode=function(b){};
a.encode=function(b){};
Charset.UTF8=(function(){function d(){}d.prototype=new Charset();
var c=d.prototype;
c.decode=function(h){var g=[];
while(h.hasRemaining()){var i=h.remaining();
var f=h.getUnsigned();
var j=b(f);
if(i<j){h.skip(-1);
break
}var e=null;
switch(j){case 1:e=f;
break;
case 2:e=((f&31)<<6)|(h.getUnsigned()&63);
break;
case 3:e=((f&15)<<12)|((h.getUnsigned()&63)<<6)|(h.getUnsigned()&63);
break;
case 4:e=((f&7)<<18)|((h.getUnsigned()&63)<<12)|((h.getUnsigned()&63)<<6)|(h.getUnsigned()&63);
break
}g.push(e)
}return String.fromCharCode.apply(null,g)
};
c.encode=function(h,f){for(var g=0;
g<h.length;
g++){var e=h.charCodeAt(g);
if(e<128){f.put(e)
}else{if(e<2048){f.put((e>>6)|192);
f.put((e&63)|128)
}else{if(e<65536){f.put((e>>12)|224);
f.put(((e>>6)&63)|128);
f.put((e&63)|128)
}else{if(e<1114112){f.put((e>>18)|240);
f.put(((e>>12)&63)|128);
f.put(((e>>6)&63)|128);
f.put((e&63)|128)
}else{throw new Error("Invalid UTF-8 string")
}}}}}};
function b(e){if((e&128)===0){return 1
}if((e&32)===0){return 2
}if((e&16)===0){return 3
}if((e&8)===0){return 4
}throw new Error("Invalid UTF-8 bytes")
}return new d()
})()
})();
(function(){var y="StompJms";
var o=function(D){this._name=D;
this._level=o.Level.INFO
};
(function(){o.Level={OFF:8,SEVERE:7,WARNING:6,INFO:5,CONFIG:4,FINE:3,FINER:2,FINEST:1,ALL:0};
var J;
var L=document.getElementsByTagName("meta");
for(var G=0;
G<L.length;
G++){if(L[G].name==="kaazing:logging"){J=L[G].content;
break
}}o._logConf={};
if(J){var I=J.split(",");
for(var G=0;
G<I.length;
G++){var E=I[G].split("=");
o._logConf[E[0]]=E[1]
}}var D={};
o.getLogger=function(N){var M=D[N];
if(M===undefined){M=new o(N);
D[N]=M
}return M
};
var H=o.prototype;
H.setLevel=function(M){if(M&&M>=o.Level.ALL&&M<=o.Level.OFF){this._level=M
}};
H.isLoggable=function(O){for(var N in o._logConf){if(this._name.match(N)){var M=o._logConf[N];
if(M){return(o.Level[M]<=O)
}}}return(this._level<=O)
};
var K=function(){};
var F={};
F[o.Level.OFF]=K;
F[o.Level.SEVERE]=(window.console)?(console.error||console.log||K):K;
F[o.Level.WARNING]=(window.console)?(console.warn||console.log||K):K;
F[o.Level.INFO]=(window.console)?(console.info||console.log||K):K;
F[o.Level.CONFIG]=(window.console)?(console.info||console.log||K):K;
F[o.Level.FINE]=(window.console)?(console.debug||console.log||K):K;
F[o.Level.FINER]=(window.console)?(console.debug||console.log||K):K;
F[o.Level.FINEST]=(window.console)?(console.debug||console.log||K):K;
F[o.Level.ALL]=(window.console)?(console.log||K):K;
H.config=function(N,M){this.log(o.Level.CONFIG,N,M)
};
H.entering=function(O,M,P){if(this.isLoggable(o.Level.FINER)){if(browser=="chrome"||browser=="safari"){O=console
}var N=F[o.Level.FINER];
if(P){if(typeof(N)=="object"){N("ENTRY "+M,P)
}else{N.call(O,"ENTRY "+M,P)
}}else{if(typeof(N)=="object"){N("ENTRY "+M)
}else{N.call(O,"ENTRY "+M)
}}}};
H.exiting=function(P,M,O){if(this.isLoggable(o.Level.FINER)){var N=F[o.Level.FINER];
if(browser=="chrome"||browser=="safari"){P=console
}if(O){if(typeof(N)=="object"){N("RETURN "+M,O)
}else{N.call(P,"RETURN "+M,O)
}}else{if(typeof(N)=="object"){N("RETURN "+M)
}else{N.call(P,"RETURN "+M)
}}}};
H.fine=function(N,M){this.log(o.Level.FINE,N,M)
};
H.finer=function(N,M){this.log(o.Level.FINER,N,M)
};
H.finest=function(N,M){this.log(o.Level.FINEST,N,M)
};
H.info=function(N,M){this.log(o.Level.INFO,N,M)
};
H.log=function(P,O,N){if(this.isLoggable(P)){var M=F[P];
if(browser=="chrome"||browser=="safari"){O=console
}if(typeof(M)=="object"){M(N)
}else{M.call(O,N)
}}};
H.severe=function(N,M){this.log(o.Level.SEVERE,N,M)
};
H.warning=function(N,M){this.log(o.Level.WARNING,N,M)
}
})();
var c=o.getLogger("com.kaazing.gateway.client.loader.Utils");
var m=function(G){c.entering(this,"Utils.getMetaValue",G);
var E=document.getElementsByTagName("meta");
for(var F=0;
F<E.length;
F++){if(E[F].name===G){var D=E[F].content;
c.exiting(this,"Utils.getMetaValue",D);
return D
}}c.exiting(this,"Utils.getMetaValue")
};
var h=function(F){c.entering(this,"Utils.arrayCopy",F);
var D=[];
for(var E=0;
E<F.length;
E++){D.push(F[E])
}return D
};
var t=function(H,G){c.entering(this,"Utils.arrayFilter",{array:H,callback:G});
var D=[];
for(var F=0;
F<H.length;
F++){var E=H[F];
if(G(E)){D.push(H[F])
}}return D
};
var d=function(F,D){c.entering(this,"Utils.indexOf",{array:F,searchElement:D});
for(var E=0;
E<F.length;
E++){if(F[E]==D){c.exiting(this,"Utils.indexOf",E);
return E
}}c.exiting(this,"Utils.indexOf",-1);
return -1
};
var p=function(H){c.entering(this,"Utils.decodeByteString",H);
var D=[];
for(var G=0;
G<H.length;
G++){D.push(H.charCodeAt(G)&255)
}var F=new ByteBuffer(D);
var E=F.getString(Charset.UTF8);
c.exiting(this,"Utils.decodeByteString",E);
return E
};
var s=String.fromCharCode(127);
var A=String.fromCharCode(0);
var n="\n";
var C=function(F){c.entering(this,"Utils.encodeEscapedByte",F);
var D=[];
while(F.remaining()){var H=F.getUnsigned();
var G=String.fromCharCode(H);
switch(G){case s:D.push(s);
D.push(s);
break;
case A:D.push(s);
D.push("0");
break;
case n:D.push(s);
D.push("n");
break;
default:D.push(G)
}}var E=D.join("");
c.exiting(this,"Utils.encodeEscapedBytes",E);
return E
};
var z=function(E,F){c.entering(this,"Utils.encodeByteString",{buf:E,requiresEscaping:F});
if(F){return C(E)
}else{var D=[];
while(E.remaining()){var H=E.getUnsigned();
D.push(String.fromCharCode(H))
}var G=D.join("");
c.exiting(this,"Utils.encodeByteString",G);
return G
}};
var B=o.getLogger("com.kaazing.gateway.client.loader.WebSocketNativeProxy");
var b=window.WebSocket;
var a=function(D,G){B.entering(this,"WebSocketNativeProxy.<init>",{location:D,protocol:G});
if(typeof(b)==="undefined"){r(this);
return
}if(D.indexOf("javascript:")==0){D=D.substr("javascript:".length)
}var E=D.indexOf("?");
if(E!=-1){D+="&.kl=Y"
}else{D+="?.kl=Y"
}this._balanced=false;
this._sendQueue=[];
try{if(G){this._delegate=new b(D,G)
}else{this._delegate=new b(D)
}}catch(F){B.severe(this,"WebSocketNativeProxy.<init> "+F);
r(this);
return
}l(this)
};
var w=a.prototype;
w.onerror=function(){};
w.onmessage=function(){};
w.onopen=function(){};
w.onclose=function(){};
w.close=function(){B.entering(this,"WebSocketNativeProxy.close");
this._delegate.close()
};
w.send=function(D){B.entering(this,"WebSocketNativeProxy.send",D);
if(this._balanced==true){j(this,D)
}else{this._sendQueue.push(D)
}};
function j(E,D){B.entering(this,"WebSocketNativeProxy.doSend",D);
if(typeof(D)=="string"){E._delegate.send(D)
}else{if(D.constructor==ByteBuffer){var F=z(D);
E._delegate.send(F)
}else{B.severe(this,"WebSocketNativeProxy.doSend called with unkown type "+typeof(D));
throw new Error("Cannot call send() with that type")
}}}function r(E,D){B.entering(this,"WebSocketNativeProxy.doError",D);
setTimeout(function(){if(E.onerror){E.onerror(D)
}},0)
}function i(I,H){B.entering(this,"WebSocketNativeProxy.messageHandler",H);
if(I._balanced==true){I.onmessage(H)
}else{if(H.data.match("^\uf0ff")=="\uf0ff"){var F=H.data.substring(1);
if(F.match("^R")=="R"){var E=F.substring(1);
if(E&&E!=""){B.finest(this,"WebSocketNativeProxy.messageHandler: redirectLoc = "+E);
var G=E.indexOf("?");
if(G!=-1){E+="&.kl=Y"
}else{E+="?.kl=Y"
}q(I);
I.close();
I._delegate=new b(E);
l(I)
}else{B.warning(this,"WebSocketNativeProxy.messageHandler: No balancees");
I.close()
}}else{if(F.match("^N$")=="N"){B.finest(this,"WebSocketNativeProxy.messageHandler: Not balancer - service gateway");
I._balanced=true;
var D;
while(D=I._sendQueue.shift()){j(I,D)
}}else{B.warning(this,"WebSocketNativeProxy.messageHandler: Unknown balancer control frame command "+data);
I._balanced=true;
I.onmessage(H)
}}}else{B.warning(this,"WebSocketNativeProxy.messageHandler: Unknown balancer control frame "+data);
I._balanced=true;
I.onmessage(H)
}}}function f(E,D){B.entering(this,"WebSocketNativeProxy.closeHandler",D);
E.onclose(D)
}function k(E,D){B.entering(this,"WebSocketNativeProxy.errorHandler",D);
E.onerror(D)
}function v(E,D){B.entering(this,"WebSocketNativeProxy.openHandler",D);
E.onopen(D)
}function l(E){B.entering(this,"WebSocketNativeProxy.bindHandlers");
var D=E._delegate;
D.onopen=function(F){v(E,F)
};
D.onmessage=function(F){i(E,F)
};
D.onclose=function(F){f(E,F)
};
D.onerror=function(F){k(E,F)
}
}function q(E){B.entering(this,"WebSocketNativeProxy.unbindHandlers");
var D=E._delegate;
D.onmessage=undefined;
D.onclose=undefined;
D.onopen=undefined;
D.onerror=undefined
}var u=o.getLogger("com.kaazing.gateway.client.loader.ByteSocketNativeProxy");
var e=function(D,F){u.entering(this,"ByteSocketNativeProxy.<init>",{location:D,protocol:F});
var E;
if(D.indexOf("?")==-1){E="?"
}else{E="&"
}D=D+E+"encoding=utf8";
u.finest(this,"ByteSocketNativeProxy.<init>: location = "+D);
return new a(D,F)
};
var g=(function(){var G=o.getLogger("com.kaazing.gateway.client.loader.WebSocketEmulatedFlashProxy");
var H=function(J){G.entering(this,"WebSocketNativeProxy.<init>",J);
this.URL=J;
var L=this;
try{E(L,J)
}catch(K){G.severe(this,"WebSocketNativeProxy.<init> "+K);
F(L,K)
}this.constructor=H;
G.exiting(this,"WebSocketNativeProxy.<init>")
};
var D=H.prototype;
H._flashBridge={};
H._flashBridge.readyWaitQueue=[];
H._flashBridge.failWaitQueue=[];
H._flashBridge.flashHasLoaded=false;
H._flashBridge.flashHasFailed=false;
D.URL="";
D.readyState=0;
D.bufferedAmount=0;
D.onopen=function(){};
D.onmessage=function(J){};
D.onclose=function(){};
D.onerror=function(){};
D.send=function(L){G.entering(this,"WebSocketEmulatedFlashProxy.send",L);
switch(this.readyState){case 0:G.severe(this,"WebSocketEmulatedFlashProxy.send: readyState is 0");
throw new Error("INVALID_STATE_ERR");
break;
case 1:if(L===null){G.severe(this,"WebSocketEmulatedFlashProxy.send: Data is null");
throw new Error("data is null")
}if(typeof(L)=="string"){H._flashBridge.sendText(this._instanceId,L)
}else{if(typeof(L.array)=="object"){var M;
var K=[];
var J;
while(L.remaining()){J=L.get();
K.push(String.fromCharCode(J))
}var M=K.join("");
H._flashBridge.sendByteString(this._instanceId,M);
return
}else{G.severe(this,"WebSocketEmulatedFlashProxy.send: Data is on invalid type "+typeof(L));
throw new Error("Invalid type")
}}I(this);
return true;
break;
case 2:return false;
break;
default:G.severe(this,"WebSocketEmulatedFlashProxy.send: Invalid readyState "+this.readyState);
throw new Error("INVALID_STATE_ERR")
}};
D.close=function(){G.entering(this,"WebSocketEmulatedFlashProxy.close");
switch(this.readyState){case 1:case 2:H._flashBridge.disconnect(this._instanceId);
break
}};
D.disconnect=D.close;
var I=function(J){G.entering(this,"WebSocketEmulatedFlashProxy.updateBufferedAmount");
J.bufferedAmount=H._flashBridge.getBufferedAmount(J._instanceId);
if(J.bufferedAmount!=0){setTimeout(function(){I(J)
},1000)
}};
var E=function(L,K){G.entering(this,"WebSocketEmulatedFlashProxy.registerWebSocket",K);
var J=function(O,N){N[O]=L;
L._instanceId=O
};
var M=function(){F(L)
};
H._flashBridge.registerWebSocketEmulated(K,J,M)
};
function F(K,J){G.entering(this,"WebSocketEmulatedFlashProxy.doError",J);
setTimeout(function(){if(K.onerror){K.onerror(J)
}},0)
}return H
})();
var x=(function(){var H=o.getLogger("com.kaazing.gateway.client.loader.WebSocketNativeFlashProxy");
var E=function(J){H.entering(this,"WebSocketNativeFlashProxy.<init>",J);
this.URL=J;
var L=this;
try{F(L,J)
}catch(K){H.severe(this,"WebSocketNativeFlashProxy.<init>: Error: "+K);
G(L,K)
}this.constructor=E;
H.exiting(this,"WebSocketNativeFlashProxy.<init>")
};
var D=E.prototype;
g._flashBridge={};
g._flashBridge.readyWaitQueue=[];
g._flashBridge.failWaitQueue=[];
g._flashBridge.flashHasLoaded=false;
g._flashBridge.flashHasFailed=false;
D.URL="";
D.readyState=0;
D.bufferedAmount=0;
D.onopen=function(){};
D.onmessage=function(J){};
D.onclose=function(){};
D.onerror=function(){};
D.send=function(L){H.entering(this,"WebSocketNativeFlashProxy.send",L);
switch(this.readyState){case 0:H.severe(this,"WebSocketNativeFlashProxy.send: Error: Invalid readyState 0");
throw new Error("INVALID_STATE_ERR");
break;
case 1:if(L===null){H.severe(this,"WebSocketNativeFlashProxy.send: Error: Data is null");
throw new Error("data is null")
}if(typeof(L)=="string"){g._flashBridge.sendText(this._instanceId,L)
}else{if(typeof(L.array)=="object"){var M;
var K=[];
var J;
while(L.remaining()){J=L.get();
K.push(String.fromCharCode(J))
}var M=K.join("");
g._flashBridge.sendByteString(this._instanceId,M);
return
}else{H.severe(this,"WebSocketNativeFlashProxy.send: Error: Invalid data type "+typeof(L));
throw new Error("Invalid type")
}}I(this);
return true;
break;
case 2:return false;
break;
default:H.severe(this,"WebSocketNativeFlashProxy.send: Error: Invalid readyState");
throw new Error("INVALID_STATE_ERR")
}};
D.close=function(){H.entering(this,"WebSocketNativeFlashProxy.close");
switch(this.readyState){case 1:case 2:g._flashBridge.disconnect(this._instanceId);
break
}};
D.disconnect=D.close;
var I=function(J){H.entering(this,"WebSocketNativeFlashProxy.updateBufferedAmount");
J.bufferedAmount=g._flashBridge.getBufferedAmount(J._instanceId);
if(J.bufferedAmount!=0){setTimeout(function(){I(J)
},1000)
}};
var F=function(L,K){H.entering(this,"WebSocketNativeFlashProxy.registerWebSocket",K);
var J=function(O,N){N[O]=L;
L._instanceId=O
};
var M=function(){G(L)
};
g._flashBridge.registerWebSocketRtmp(K,J,M)
};
function G(K,J){H.entering(this,"WebSocketNativeFlashProxy.doError",J);
setTimeout(function(){if(K.onerror){K.onerror(J)
}},0)
}return E
})();
(function(){var E=o.getLogger("com.kaazing.gateway.client.loader.FlashBridge");
var D={};
g._flashBridge.registerWebSocketEmulated=function(G,J,H){E.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketEmulated",{location:G,callback:J,errback:H});
var I=function(){var K=g._flashBridge.doRegisterWebSocketEmulated(G);
J(K,D)
};
if(g._flashBridge.flashHasLoaded){if(g._flashBridge.flashHasFailed){H()
}else{I()
}}else{this.readyWaitQueue.push(I);
this.failWaitQueue.push(H)
}E.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketEmulated")
};
g._flashBridge.doRegisterWebSocketEmulated=function(G,I){E.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketEmulated",{location:G,protocol:I});
var H=g._flashBridge.elt.registerWebSocketEmulated(G,I);
E.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketEmulated",H);
return H
};
g._flashBridge.registerWebSocketRtmp=function(G,J,H){E.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketRtmp",{location:G,callback:J,errback:H});
var I=function(){var K=g._flashBridge.doRegisterWebSocketRtmp(G);
J(K,D)
};
if(g._flashBridge.flashHasLoaded){if(g._flashBridge.flashHasFailed){H()
}else{I()
}}else{this.readyWaitQueue.push(I);
this.failWaitQueue.push(H)
}E.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketEmulated")
};
g._flashBridge.doRegisterWebSocketRtmp=function(G,I){E.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketRtmp",{location:G,protocol:I});
var H=g._flashBridge.elt.registerWebSocketRtmp(G,I);
E.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketRtmp",H);
return H
};
g._flashBridge.onready=function(){E.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.onready");
var H=g._flashBridge.readyWaitQueue;
for(var G=0;
G<H.length;
G++){var I=H[G];
I()
}E.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.onready")
};
g._flashBridge.onfail=function(){E.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.onfail");
var I=g._flashBridge.failWaitQueue;
for(var H=0;
H<I.length;
H++){var G=I[H];
G()
}E.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.onfail")
};
g._flashBridge.doOpen=function(G){E.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.doOpen",G);
D[G].readyState=1;
D[G].onopen();
F();
E.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.doOpen")
};
g._flashBridge.doClose=function(G){E.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.doClose",G);
D[G].readyState=2;
D[G].onclose();
E.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.doClose")
};
g._flashBridge.doError=function(G){E.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.doError",G);
D[G].onerror();
E.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.doError")
};
g._flashBridge.doMessage=function(H,I){E.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.doMessage",{key:H,data:I});
var G=D[H];
if(G.readyState==1){var J;
try{J=document.createEvent("Events");
J.initEvent("message",true,true)
}catch(K){E.error(this,"WebSocketEmulatedFlashProxy._flashBridge.doMessage "+K);
J={type:"message",bubbles:true,cancelable:true}
}J.data=unescape(I);
J.decoder=p;
J.origin=document.domain;
J.source=null;
G.onmessage(J)
}E.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.doMessage")
};
var F=function(){E.entering(this,"WebSocketEmulatedFlashProxy.killLoadingBar");
if(browser==="firefox"){var G=document.createElement("iframe");
G.style.display="none";
document.body.appendChild(G);
document.body.removeChild(G)
}};
g._flashBridge.sendText=function(G,H){E.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.sendText",{key:G,message:H});
this.elt.wsSend(G,escape(H));
setTimeout(F,200)
};
g._flashBridge.sendByteString=function(G,H){E.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.sendByteString",{key:G,message:H});
this.elt.wsSendByteString(G,escape(H));
setTimeout(F,200)
};
g._flashBridge.disconnect=function(G){E.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.disconnect",G);
this.elt.wsDisconnect(G)
};
g._flashBridge.getBufferedAmount=function(H){E.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.getBufferedAmount",H);
var G=this.elt.getBufferedAmount(H);
E.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.getBufferedAmount",G);
return G
}
})();
(function(){var D=function(S){var U=this;
var N=3000;
var R="Loader";
var I=false;
var Q=-1;
U.elt=null;
var O=function(){var Z=new RegExp(".*"+S+".*.js$");
var V=document.getElementsByTagName("script");
for(var X=0;
X<V.length;
X++){if(V[X].src){var W=(V[X].src).match(Z);
if(W){W=W.pop();
var Y=W.split("/");
Y.pop();
if(Y.length>0){return Y.join("/")+"/"
}else{return""
}}}}};
var P=O();
var M=P+"Loader.swf?.kv=10.05";
U.loader=function(){var X="flash";
var V=document.getElementsByTagName("meta");
for(var W=0;
W<V.length;
W++){if(V[W].name==="kaazing:upgrade"){X=V[W].content
}}if(X!="flash"||!J([9,0,115])){H()
}else{Q=setTimeout(H,N);
K()
}};
U.clearFlashTimer=function(){clearTimeout(Q);
Q="cleared";
setTimeout(function(){T(U.elt.handshake(S))
},0)
};
var T=function(V){if(V){g._flashBridge.flashHasLoaded=true;
g._flashBridge.elt=U.elt;
g._flashBridge.onready()
}else{H()
}window.___Loader=undefined
};
var H=function(){g._flashBridge.flashHasLoaded=true;
g._flashBridge.flashHasFailed=true;
g._flashBridge.onfail()
};
var L=function(){var W=null;
if(typeof(ActiveXObject)!="undefined"){try{I=true;
var Y=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
var V=Y.GetVariable("$version");
var Z=V.split(" ")[1].split(",");
W=[];
for(var X=0;
X<Z.length;
X++){W[X]=parseInt(Z[X])
}}catch(ab){I=false
}}if(typeof navigator.plugins!="undefined"){if(typeof navigator.plugins["Shockwave Flash"]!="undefined"){var V=navigator.plugins["Shockwave Flash"].description;
V=V.replace(/\s*r/g,".");
var Z=V.split(" ")[2].split(".");
W=[];
for(var X=0;
X<Z.length;
X++){W[X]=parseInt(Z[X])
}}}var aa=navigator.userAgent;
if(W!==null&&W[0]===10&&W[1]===0&&aa.indexOf("Windows NT 6.0")!==-1){W=null
}return W
};
var J=function(X){var V=L();
if(V==null){return false
}for(var W=0;
W<Math.max(V.length,X.length);
W++){var Y=V[W]-X[W];
if(Y!=0){return(Y>0)?true:false
}}return true
};
var K=function(){if(I){var V=document.createElement("div");
document.body.appendChild(V);
V.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" height="0" width="0" id="'+R+'"><param name="movie" value="'+M+'"></param></object>';
U.elt=document.getElementById(R)
}else{var V=document.createElement("object");
V.setAttribute("type","application/x-shockwave-flash");
V.setAttribute("width",0);
V.setAttribute("height",0);
V.setAttribute("id",R);
V.setAttribute("data",M);
document.body.appendChild(V);
U.elt=V
}};
U.attachToOnload=function(V){if(window.addEventListener){window.addEventListener("load",V,true)
}else{if(window.attachEvent){window.attachEvent("onload",V)
}else{onload=V
}}};
if(document.readyState==="complete"){U.loader()
}else{U.attachToOnload(U.loader)
}};
var G={};
(function(){var K=o.getLogger("com.kaazing.gateway.client.html5.Windows1252");
var M={8364:128,129:129,8218:130,402:131,8222:132,8230:133,8224:134,8225:135,710:136,8240:137,352:138,8249:139,338:140,141:141,381:142,143:143,144:144,8216:145,8217:146,8220:147,8221:148,8226:149,8211:150,8212:151,732:152,8482:153,353:154,8250:155,339:156,157:157,382:158,376:159};
var J={128:8364,129:129,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,141:141,142:381,143:143,144:144,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,157:157,158:382,159:376};
G.toCharCode=function(Q){if(Q<128||(Q>159&&Q<256)){return Q
}else{var P=J[Q];
if(typeof(P)=="undefined"){K.severe(this,"Windows1252.toCharCode: Error: Could not find "+Q);
throw new Error("could not find: "+Q)
}return P
}};
G.fromCharCode=function(Q){if(Q<128||(Q>159&&Q<256)){return Q
}else{var P=M[Q];
if(typeof(P)=="undefined"){K.severe(this,"Windows1252.fromCharCode: Error: Could not find "+Q);
throw new Error("could not find: "+Q)
}return P
}};
var N=String.fromCharCode(127);
var L=String.fromCharCode(0);
var O="\n";
var I=function(R){K.entering(this,"Windows1252.escapedToArray",R);
var P=[];
for(var Q=0;
Q<R.length;
Q++){var T=G.fromCharCode(R.charCodeAt(Q));
if(T==127){Q++;
if(Q==R.length){P.hasRemainder=true;
break
}var S=G.fromCharCode(R.charCodeAt(Q));
switch(S){case 127:P.push(127);
break;
case 48:P.push(0);
break;
case 110:P.push(10);
break;
case 114:P.push(13);
break;
default:K.severe(this,"Windows1252.escapedToArray: Error: Escaping format error");
throw new Error("Escaping format error")
}}else{P.push(T)
}}return P
};
var H=function(Q){K.entering(this,"Windows1252.toEscapedByteString",Q);
var P=[];
while(Q.remaining()){var S=Q.getUnsigned();
var R=String.fromCharCode(G.toCharCode(S));
switch(R){case N:P.push(N);
P.push(N);
break;
case L:P.push(N);
P.push("0");
break;
case O:P.push(N);
P.push("n");
break;
default:P.push(R)
}}return P.join("")
};
G.toArray=function(R,S){K.entering(this,"Windows1252.toArray",{s:R,escaped:S});
if(S){return I(R)
}else{var P=[];
for(var Q=0;
Q<R.length;
Q++){P.push(G.fromCharCode(R.charCodeAt(Q)))
}return P
}};
G.toByteString=function(Q,R){K.entering(this,"Windows1252.toByteString",{buf:Q,escaped:R});
if(R){return H(Q)
}else{var P=[];
while(Q.remaining()){var S=Q.getUnsigned();
P.push(String.fromCharCode(G.toCharCode(S)))
}return P.join("")
}}
})();
var E=(function(){var U=o.getLogger("com.kaazing.gateway.client.html5.WebSocketEmulatedBinaryDownstream");
var M=function(Y){U.entering(this,"WebSocketEmulatedBinaryDownstream.<init>",Y);
this.reconnectImmediately=false;
this.retry=3000;
if(browser=="opera"||browser=="ie"){this.requiresEscaping=true
}if(Y.indexOf(".kv="==-1)){Y+=((Y.indexOf("?")==-1)?"?":"&")+".kv=10.05"
}else{Y=Y.replace(/\.kv=[^&]*(.*)/,".kv=10.05$1")
}var ab=new URI(Y);
var Z={http:80,https:443};
if(ab.port==null){ab.port=Z[ab.scheme];
ab.authority=ab.host+":"+ab.port
}this.origin=ab.scheme+"://"+ab.authority;
this.location=Y;
this.xhr=null;
this.reconnectTimer=null;
var aa=this;
setTimeout(function(){X(aa)
},0);
U.exiting(this,"WebSocketEmulatedBinaryDownstream.<init>")
};
w=M.prototype;
var I=0;
var J=255;
var W=1;
var L=128;
var O=127;
var S=3000;
w.readyState=0;
function X(ab){U.entering(this,"WebSocketEmulatedBinaryDownstream.connect");
if(ab.reconnectTimer!==null){ab.reconnectTimer=null
}ab.buf=new ByteBuffer();
var aa=new URI(ab.location);
var Z=[];
if(ab.location.indexOf("&.kb=")===-1&&ab.location.indexOf("?.kb=")===-1){Z.push(".kb=512")
}switch(browser){case"ie":Z.push(".kns=1");
break;
case"safari":Z.push(".kp=256");
break;
case"firefox":Z.push(".kp=1025");
Z.push(String(Math.random()).substring(2));
break;
case"android":Z.push(".kp=4096");
Z.push(".kbp=4096");
break
}Z.push(".kc=text/plain;charset=windows-1252");
if(Z.length>0){if(aa.query===undefined){aa.query=Z.join("&")
}else{aa.query+="&"+Z.join("&")
}}var ac=ab.xhr=new XMLHttpRequest0();
var Y={xhr:ac,position:0};
ab.nextMessageAt=0;
if(ab.location.indexOf(".ki=p")==-1||ab.location.indexOf("https://")==0){ac.onprogress=function(){setTimeout(function(){H(ab,Y)
},0)
}
}ac.onload=function(){H(ab,Y);
if(ab.xhr==Y.xhr&&ab.readyState!=2){ab.xhr.onerror=function(){};
ab.xhr.ontimeout=function(){};
ab.xhr.onreadystatechange=function(){};
if(ab.reconnectImmediately){ab.reconnectImmediately=false;
X(ab)
}else{N(ab)
}}};
ac.onreadystatechange=function(){U.entering(this,"WebSocketEmulatedBinaryDownstream.connect.xhr.onreadystatechange");
if(!ab.reconnectImmediately&&ac.readyStateChange>3){ab.readyState=1;
Q(ab);
ac.onreadystatechange=function(){}
}};
ac.ontimeout=function(){U.entering(this,"WebSocketEmulatedBinaryDownstream.connect.xhr.ontimeout");
V(ab)
};
ac.onerror=function(){U.entering(this,"WebSocketEmulatedBinaryDownstream.connect.xhr.onerror");
V(ab)
};
ac.open("GET",aa.toString(),true);
ac.send("");
if(ab.location.indexOf("&.ki=p")==-1){setTimeout(function(){if(ac.readyState<3&&ab.readyState<2){ab.location+="&.ki=p";
X(ab)
}},S)
}}w.disconnect=function(){U.entering(this,"WebSocketEmulatedBinaryDownstream.disconnect");
if(this.readyState!==2){T(this)
}};
function T(Y){U.entering(this,"WebSocketEmulatedBinaryDownstream._disconnect");
if(Y.reconnectTimer!==null){clearTimeout(Y.reconnectTimer);
Y.reconnectTimer=null
}if(Y.xhr!==null){Y.xhr.onprogress=function(){};
Y.xhr.onload=function(){};
Y.xhr.onerror=function(){};
Y.xhr.abort()
}Y.lineQueue=[];
Y.lastEventId=null;
Y.location=null;
Y.readyState=2
}function H(ai,Z){var ah=Z.xhr.responseText;
var ad=ah.slice(Z.position);
Z.position=ah.length;
var ab=ai.buf;
var an=G.toArray(ad,ai.requiresEscaping);
if(an.hasRemainder){Z.position--
}ab.position=ab.limit;
ab.putBytes(an);
ab.position=ai.nextMessageAt;
ab.mark();
parse:while(true){if(!ab.hasRemaining()){break
}var aj=ab.getUnsigned();
switch(aj&128){case I:var am=ab.indexOf(J);
if(am==-1){break parse
}var ac=ab.array.slice(ab.position,am);
var ae=new ByteBuffer(ac);
var Y=am-ab.position;
ab.skip(Y+1);
ab.mark();
if(aj==W){K(ai,ae)
}else{R(ai,ae)
}break;
case L:var aa=0;
var af=false;
while(ab.hasRemaining()){var ak=ab.getUnsigned();
aa=aa<<7;
aa|=(ak&127);
if((ak&128)!=128){af=true;
break
}}if(!af){break parse
}if(ab.remaining()<aa){break parse
}var ag=ab.array.slice(ab.position,ab.position+aa);
var al=new ByteBuffer(ag);
ab.skip(aa);
ab.mark();
P(ai,al);
break;
default:throw new Error("Emulation protocol error. Unknown frame type: "+aj)
}}ab.reset();
ab.compact();
nextMessageAt=ab.position
}function K(Z,Y){while(Y.remaining()){var aa=String.fromCharCode(Y.getUnsigned());
switch(aa){case"0":break;
case"1":Z.reconnectImmediately=true;
break;
default:throw new Error("Protocol decode error. Unknown command: "+aa)
}}}function P(aa,Y){var Z=document.createEvent("Events");
Z.initEvent("message",true,true);
Z.lastEventId=aa.lastEventId;
Z.data=z(Y);
Z.decoder=p;
Z.origin=aa.origin;
if(Z.source!==null){Z.source=null
}if(typeof(aa.onmessage)==="function"){aa.onmessage(Z)
}}function R(Y){var Z=document.createEvent("Events");
Z.initEvent("message",true,true);
Z.lastEventId=$this.lastEventId;
Z.data=Y;
Z.origin=$this.origin;
if(Z.source!==null){Z.source=null
}if(typeof($this.onmessage)==="function"){$this.onmessage(Z)
}}function Q(Y){if(typeof(Y.onopen)==="function"){Y.onopen()
}}function V(Y){if(Y.readyState!=2){Y.disconnect();
N(Y)
}}function N(Z){var Y=document.createEvent("Events");
Y.initEvent("error",true,true);
if(typeof(Z.onerror)==="function"){Z.onerror(Y)
}}return M
})();
var F=(function(){var M=o.getLogger("com.kaazing.gateway.client.html5.WebSocketEmulatedBinary");
var Q=function(X,Y){M.entering(this,"WebSocketEmulatedBinary.<init>",{location:X,subprotocol:Y});
this.URL=X;
if(X.indexOf(".kv=")==-1){X+=((X.indexOf("?")==-1)?"?":"&")+".kv=10.05"
}else{X=X.replace(/\.kv=[^&]*(.*)/,".kv=10.05$1")
}if(browser=="opera"||browser=="ie"){M.config(this,"WebSocketEmulatedBinary.<init>: browser is "+browser);
this.requiresEscaping=true
}this._sendQueue=[];
W(this);
M.exiting(this,"WebSocketEmulatedBinary.<init>")
};
w=Q.prototype;
w.readyState=0;
w.bufferedAmount=0;
w.URL="";
w.onopen=function(){};
w.onerror=function(){};
w.onmessage=function(X){};
w.onclose=function(){};
var L=128;
var H=0;
var I=255;
var V=1;
var J=[V,48,49,I];
var R=[V,48,50,I];
w.send=function(Y){M.entering(this,"WebSocketEmulatedBinary.send",{data:Y});
switch(this.readyState){case 0:M.severe(this,"WebSocketEmulatedBinary.send: Error: readyState is 0");
throw new Error("INVALID_STATE_ERR");
case 1:if(Y===null){M.severe(this,"WebSocketEmulatedBinary.send: Error: data is null");
throw new Error("data is null")
}var X=new ByteBuffer();
if(typeof Y=="string"){M.finest(this,"WebSocketEmulatedBinary.send: Data is string");
X.put(H);
X.putString(Y,Charset.UTF8);
X.put(I)
}else{if(Y.constructor==ByteBuffer){M.finest(this,"WebSocketEmulatedBinary.send: Data is ByteBuffer");
X.put(L);
K(X,Y.remaining());
X.putBuffer(Y)
}else{M.severe(this,"WebSocketEmulatedBinary.send: Error: Invalid type for send");
throw new Error("Invalid type for send")
}}X.flip();
P(this,X);
return true;
case 2:return false;
default:M.severe(this,"WebSocketEmulatedBinary.send: Error: invalid readyState");
throw new Error("INVALID_STATE_ERR")
}M.exiting(this,"WebSocketEmulatedBinary.send")
};
w.close=function(){M.entering(this,"WebSocketEmulatedBinary.close");
switch(this.readyState){case 1:P(this,new ByteBuffer(R));
U(this);
break
}};
function P(Y,X){M.entering(this,"WebSocketEmulatedBinary.doSend",X);
Y.bufferedAmount+=X.remaining();
Y._sendQueue.push(X);
if(!Y._writeSuspended){T(Y)
}}function T(aa){M.entering(this,"WebSocketEmulatedBinary.doFlush");
var Y=aa._sendQueue;
var Z=Y.length;
aa._writeSuspended=(Z>0);
if(Z>0){var ab=new XMLHttpRequest0();
ab.open("POST",aa._upstream,true);
ab.onreadystatechange=function(){if(ab.readyState==4){M.finest(this,"WebSocketEmulatedBinary.doFlush: xhr.status="+ab.status);
switch(ab.status){case 200:setTimeout(function(){T(aa)
},0);
break;
default:U(aa);
break
}}};
var X=new ByteBuffer();
while(Y.length){X.putBuffer(Y.shift())
}X.putBytes(J);
X.flip();
if(ab.sendAsBinary){M.finest(this,"WebSocketEmulatedBinary.doFlush: xhr.sendAsBinary");
ab.setRequestHeader("Content-Type","application/octet-stream");
ab.sendAsBinary(z(X))
}else{ab.setRequestHeader("Content-Type","text/plain; charset=utf-8");
ab.send(z(X,aa.requiresEscaping))
}}aa.bufferedAmount=0
}var W=function(ac){M.entering(this,"WebSocketEmulatedBinary.connect");
var X=new URI(ac.URL);
X.scheme=X.scheme.replace("ws","http");
var ab=ac.requiresEscaping?"/;e/cte":"/;e/ct";
X.path=X.path.replace(/[\/]?$/,ab);
var ad=X.toString();
var aa=ad.indexOf("?");
if(aa==-1){ad+="?"
}else{ad+="&"
}ad+=".kn="+String(Math.random()).substring(2);
M.finest(this,"WebSocketEmulatedBinary.connect: Connecting to "+ad);
var Y=new XMLHttpRequest0();
var Z=false;
Y.open("GET",ad,true);
Y.onreadystatechange=function(){switch(Y.readyState){case 2:timer=setTimeout(function(){if(!Z){O(ac)
}},5000);
break;
case 4:Z=true;
if(ac.readyState<2){if(Y.status==201){var ae=Y.responseText.split("\n");
ac._upstream=ae[0];
var af=ae[1];
ac._downstream=new E(af);
N(ac,ac._downstream);
S(ac)
}else{O(ac)
}}break
}};
Y.send(null);
M.exiting(this,"WebSocketEmulatedBinary.connect")
};
var N=function(Y,X){M.entering(this,"WebSocketEmulatedBinary.bindHandlers");
X.onmessage=function(Z){switch(Z.type){case"message":if(Y.readyState==1){Y.onmessage(Z)
}break
}};
X.onerror=function(){X.disconnect();
U(Y)
}
};
var K=function(X,Y){M.entering(this,"WebSocketEmulatedBinary.encodeLength",{buf:X,length:Y});
var ab=0;
var Z=0;
do{Z<<=8;
Z|=(Y&127);
Y>>=7;
ab++
}while(Y>0);
do{var aa=Z&255;
Z>>=8;
if(ab!=1){aa|=128
}X.put(aa)
}while(--ab>0)
};
var S=function(X){M.entering(this,"WebSocketEmulatedBinary.doOpen");
X.readyState=1;
X.onopen()
};
var O=function(X){if(X.readyState<2){M.entering(this,"WebSocketEmulatedBinary.doError");
X.readyState=2;
X.onerror()
}};
var U=function(X){M.entering(this,"WebSocketEmulatedBinary.doClose");
switch(X.readyState){case 0:case 2:break;
case 1:X.readyState=2;
X.onclose();
break;
default:}};
return Q
})();
(function(){var U=o.getLogger("com.kaazing.gateway.client.loader.WebSocket");
var S="javascript:ws";
var J="javascript:wss";
var Q="javascript:wse";
var ab="javascript:wse+ssl";
var V="flash:wse";
var L="flash:wse+ssl";
var K="flash:wsr";
var M="flash:wsr+ssl";
var R={};
R[S]=a;
R[J]=a;
R[Q]=F;
R[ab]=F;
R[V]=g;
R[L]=g;
R[K]=x;
R[M]=x;
window.WebSocket=function(af,ai){U.entering(this,"WebSocket.<init>",{url:af,subprotocol:ai});
var ak=new URI(af);
if(ak.port===undefined){var am=ak.scheme;
ak.port=((am.indexOf("wss")==-1)&&(am.indexOf("ssl")==-1))?80:443
}af=ak.toString();
this.URL=ak.toString();
this.readyState=0;
this._subprotocol=ai;
var ah=Z(af);
var aj=ah.shift();
this._urlRemainder=ah.shift();
if(aj=="ws"||aj=="wse"||aj=="wss"||aj=="wse+ssl"){var ae=m("kaazing:WebSocketConnectionStrategies");
var ag=null;
if(ae){ag=ae.split(" ")
}if(!ag){if(aj=="ws"){this._connectionStrategies=t(WebSocket.connectionStrategies,function(an){return !(an.match("wss")||an.match("ssl"))
})
}else{if(aj=="wss"){this._connectionStrategies=t(WebSocket.connectionStrategies,function(an){return(an.match("wss")||an.match("ssl"))
})
}else{if(aj.match("wse")){var al=function(an){return an.match("wse")
};
this._connectionStrategies=t(WebSocket.connectionStrategies,al)
}}}}}else{if(R[aj]){this._connectionStrategies=[aj]
}else{U.severe(this,"WebSocket.<init>: Error: Unsupported composite scheme: "+aj);
throw new Error("Unsupported composite scheme: "+aj)
}}this.URL=af.replace("flash:","").replace("javascript:","").replace("wse+ssl:","wss:").replace("wse:","ws:").replace("wsr+ssl:","wss:").replace("wsr:","ws:");
H(this);
U.exiting(this,"WebSocket.<init>")
};
function N(){switch(browser){case"android":case"opera":return[S,Q,J,ab];
case"ie":var ae=navigator.appVersion;
if(ae.indexOf("MSIE 6.0")>=0||ae.indexOf("MSIE 7.0")>=0){return[S,V,Q,J,L,ab]
}else{return[S,Q,V,J,ab,L]
}case"firefox":case"chrome":case"safari":default:return[S,Q,V,J,ab,L]
}}window.WebSocket.connectionStrategies=N();
window.WebSocket.__impls__=R;
var ad=WebSocket.prototype;
function Z(af){var ah=af.split("://");
var ae=ah.shift();
var ag=ah.shift();
return[ae,ag]
}ad.send=function(ae){U.entering(this,"WebSocket.send",ae);
switch(this.readyState){case 0:U.severe(this,"WebSocket.send: Error: readyState is 0");
throw new Error("INVALID_STATE_ERR");
case 1:if(ae===null){U.severe(this,"WebSocket.send: Error: data is null");
throw new Error("data is null")
}this._delegate.send(ae);
Y(this);
return true;
case 2:return false;
default:U.severe(this,"WebSocket.send: Error: Invalid readyState "+readyState);
throw new Error("INVALID_STATE_ERR")
}};
var Y=function(ae){ae.bufferedAmount=ae._delegate.bufferedAmount;
if(ae.bufferedAmount!=0){setTimeout(function(){Y(ae)
},1000)
}};
ad.postMessage=ad.send;
ad.disconnect=ad.close;
ad.close=function(){U.entering(this,"WebSocket.close");
switch(this.readyState){case 1:case 2:this._delegate.close();
break
}};
function aa(af,ae){U.entering(this,"WebSocket.initDelegate",ae);
if(typeof(af._subprotocol)!=="undefined"){af._delegate=new ae(af.URL,af._subprotocol)
}else{af._delegate=new ae(af.URL)
}P(af)
}function H(af){U.entering(this,"WebSocket.fallback: "+ag);
var ag=af._connectionStrategies.shift();
var ae=R[ag];
if(ae){aa(af,ae)
}else{W(af)
}}function T(ag,ae){U.entering(this,"WebSocket.doOpen");
if(ag.readyState<1){ag.readyState=1;
if(typeof(ag.onopen)!=="undefined"){if(!ae){try{ae=document.createEvent("Events");
ae.initEvent("open",true,true)
}catch(ah){ae={type:"open",bubbles:true,cancelable:true}
}}try{ag.onopen(ae)
}catch(af){U.severe(this,"WebSocket.onopen: Error thrown from application")
}}}}function W(af,ae){U.entering(this,"WebSocket.doClose");
if(af.readyState<2){af.readyState=2;
if(typeof(af.onclose)!=="undefined"){setTimeout(function(){if(!ae){try{ae=document.createEvent("Events");
ae.initEvent("close",true,true)
}catch(ah){ae={type:"close",bubbles:true,cancelable:true}
}}try{af.onclose(ae)
}catch(ag){U.severe(this,"WebSocket.onclose: Error thrown from application")
}},0)
}}}function O(af,ae){U.entering(this,"WebSocket.errorHandler",ae);
X(af);
H(af)
}function ac(ag,af){U.entering(this,"WebSocket.openHandler",af);
switch(ag.readyState){case 0:T(ag,af);
break;
case 1:case 2:var ae=(af?" from "+af.target:"");
U.severe(this,"WebSocket.openHandler: Error: Invalid readyState for open event"+ae);
throw new Error("Invalid readyState for open event"+ae);
default:U.severe(this,"WebSocket.openHandler: Error: Invalid readyState "+ag.readyState);
throw new Error("Socket has invalid readyState: "+ag.readyState)
}}function I(ag,af){U.entering(this,"WebSocket.closeHandler",af);
switch(ag.readyState){case 0:X(ag);
H(ag);
break;
case 1:W(ag,af);
break;
case 2:var ae=(af?" from "+af.target:"");
U.severe(this,"WebSocket.closeHandler: Error: Invalid readyState for close event"+ae);
throw new Error("Invalid readyState for close event"+ae);
break;
default:U.severe(this,"WebSocket.closeHandler: Error: Invalid readyState "+ag.readyState);
throw new Error("Socket has invalid readyState: "+ag.readyState)
}}function P(af){U.entering(this,"WebSocket.bindHandlers");
var ae=af._delegate;
ae.onmessage=function(ah){if(ah.decoder){var ag;
try{ag=document.createEvent("Events");
ag.initEvent("message",true,true)
}catch(ai){ag={type:"message",bubbles:true,cancelable:true}
}ag.data=ah.decoder(ah.data);
ag.origin=ah.origin;
ag.source=af;
af.onmessage(ag)
}else{af.onmessage(ah)
}};
ae.onclose=function(ag){I(af,ag)
};
ae.onopen=function(ag){ac(af,ag)
};
ae.onerror=function(ag){O(af,ag)
}
}function X(af){U.entering(this,"WebSocket.unbindHandlers");
var ae=af._delegate;
if(ae){ae.onerror=undefined;
ae.onmessage=undefined;
ae.onclose=undefined;
ae.onopen=undefined
}}}());
(function(){var V=o.getLogger("com.kaazing.gateway.client.loader.ByteSocket");
var S="javascript:ws";
var J="javascript:wss";
var Q="javascript:wse";
var aa="javascript:wse+ssl";
var T="flash:wse";
var L="flash:wse+ssl";
var K="flash:wsr";
var M="flash:wsr+ssl";
var R={};
R[S]=e;
R[J]=e;
R[Q]=F;
R[aa]=F;
R[T]=g;
R[L]=g;
R[K]=x;
R[M]=x;
window.ByteSocket=function(ae,ah){V.entering(this,"ByteSocket.<init>",{url:ae,subprotocol:ah});
var aj=new URI(ae);
if(aj.port===undefined){var al=aj.scheme;
aj.port=((al.indexOf("wss")==-1)&&(al.indexOf("ssl")==-1))?80:443
}ae=aj.toString();
this.URL=aj.toString();
this.readyState=0;
this._subprotocol=ah;
var ag=Y(ae);
var ai=ag.shift();
this._urlRemainder=ag.shift();
if(ai=="ws"||ai=="wse"||ai=="wss"||ai=="wse+ssl"){var ad=m("kaazing:ByteSocketConnectionStrategies");
var af=null;
if(ad){af=ad.split(" ")
}if(!af){if(ai=="ws"){this._connectionStrategies=t(ByteSocket.connectionStrategies,function(am){return !(am.match("wss")||am.match("ssl"))
})
}else{if(ai=="wss"){this._connectionStrategies=t(ByteSocket.connectionStrategies,function(am){return(am.match("wss")||am.match("ssl"))
})
}else{if(ai.match("wse")){var ak=function(am){return am.match("wse")
};
this._connectionStrategies=t(ByteSocket.connectionStrategies,ak)
}}}}}else{if(R[ai]){this._connectionStrategies=[ai]
}else{V.severe(this,"ByteSocket.<init>: Error: Unsupported composite scheme: "+ai);
throw new Error("Unsupported composite scheme: "+ai)
}}this.URL=ae.replace("flash:","").replace("javascript:","").replace("wse+ssl:","wss:").replace("wse:","ws:").replace("wsr+ssl:","wss:").replace("wsr:","ws:");
H(this);
V.exiting(this,"ByteSocket.<init>")
};
function N(){switch(browser){case"android":case"opera":return[S,Q,J,aa];
case"ie":var ad=navigator.appVersion;
if(ad.indexOf("MSIE 6.0")>=0||ad.indexOf("MSIE 7.0")>=0){return[S,T,Q,J,L,aa]
}else{return[S,Q,T,J,aa,L]
}case"firefox":case"chrome":case"safari":default:return[S,Q,T,J,aa,L]
}}window.ByteSocket.connectionStrategies=N();
window.ByteSocket.__impls__=R;
var ac=ByteSocket.prototype;
function Y(ae){var ag=ae.split("://");
var ad=ag.shift();
var af=ag.shift();
return[ad,af]
}ac.send=function(ad){V.entering(this,"ByteSocket.send",ad);
if(ad.constructor!=window.ByteBuffer){throw new Error("ByteSocket.send must be called with a ByteBuffer argument")
}switch(this.readyState){case 0:V.severe(this,"ByteSocket.send: Error: readyState is 0");
throw new Error("INVALID_STATE_ERR");
case 1:if(ad===null){V.severe(this,"ByteSocket.send: Error: data is null");
throw new Error("data is null")
}this._delegate.send(ad);
X(this);
return true;
case 2:return false;
default:V.severe(this,"ByteSocket.send: Error: Invalid readyState "+readyState);
throw new Error("INVALID_STATE_ERR")
}};
var X=function(ad){ad.bufferedAmount=ad._delegate.bufferedAmount;
if(ad.bufferedAmount!=0){setTimeout(function(){X(ad)
},1000)
}};
ac.postMessage=ac.send;
ac.disconnect=ac.close;
ac.close=function(){V.entering(this,"ByteSocket.close");
switch(this.readyState){case 1:case 2:this._delegate.close();
break
}};
function Z(ae,ad){V.entering(this,"ByteSocket.initDelegate",ad);
if(typeof(ae._subprotocol)!=="undefined"){ae._delegate=new ad(ae.URL,ae._subprotocol)
}else{ae._delegate=new ad(ae.URL)
}P(ae)
}function H(ae){V.entering(this,"ByteSocket.fallback: "+af);
var af=ae._connectionStrategies.shift();
var ad=R[af];
if(ad){Z(ae,ad)
}else{U(ae)
}}function U(ad){V.entering(this,"ByteSocket.doClose");
if(typeof(ad.onclose)!=="undefined"){ad.onclose()
}}function O(ae,ad){V.entering(this,"ByteSocket.errorHandler",ad);
W(ae);
H(ae)
}function ab(af,ae){V.entering(this,"ByteSocket.openHandler",ae);
switch(af.readyState){case 0:af.readyState=1;
af.onopen(ae);
break;
case 1:case 2:var ad=(ae?" from "+ae.target:"");
V.severe(this,"ByteSocket.openHandler: Error: Invalid readyState for open event"+ad);
throw new Error("Invalid readyState for open event"+ad);
break;
default:V.severe(this,"ByteSocket.openHandler: Error: Invalid readyState "+af.readyState);
throw new Error("Socket has invalid readyState: "+af.readyState)
}}function I(af,ae){V.entering(this,"ByteSocket.closeHandler",ae);
switch(af.readyState){case 0:W(af);
H(af);
break;
case 1:af.readyState=2;
setTimeout(function(){U(af)
},0);
break;
case 2:var ad=(ae?" from "+ae.target:"");
V.severe(this,"ByteSocket.closeHandler: Error: Invalid readyState for close event"+ad);
throw new Error("Invalid readyState for close event"+ad);
break;
default:V.severe(this,"ByteSocket.closeHandler: Error: Invalid readyState "+af.readyState);
throw new Error("Socket has invalid readyState: "+af.readyState)
}}function P(ae){V.entering(this,"ByteSocket.bindHandlers");
var ad=ae._delegate;
ad.onmessage=function(ai){var af=[];
for(var ag=0;
ag<ai.data.length;
ag++){af.push(ai.data.charCodeAt(ag)&255)
}var ah;
try{ah=document.createEvent("Events");
ah.initEvent("message",true,true)
}catch(aj){ah={type:"message",bubbles:true,cancelable:true}
}ah.data=new ByteBuffer(af);
ah.origin=ai.origin;
ah.source=ae;
ae.onmessage(ah)
};
ad.onclose=function(af){I(ae,af)
};
ad.onopen=function(af){ab(ae,af)
};
ad.onerror=function(af){O(ae,af)
}
}function W(ae){V.entering(this,"ByteSocket.unbindHandlers");
var ad=ae._delegate;
if(ad){ad.onerror=undefined;
ad.onmessage=undefined;
ad.onclose=undefined;
ad.onopen=undefined
}}}());
window.___Loader=new D(y)
})()
})();
function StompConnectionFactory(a){var b=this;
this.createConnection=function(){var c=null;
var h=arguments.length;
var g=this;
var j;
var e=null;
var i=null;
var k=false;
var d={};
if(h==1){j=arguments[0];
e=null;
i=null
}else{if(h==3){e=arguments[0];
i=arguments[1];
j=arguments[2]
}else{throw new Error("Wrong number of arguments to StompConnectionFactory.createConnection()")
}}function f(m){if(typeof StompConnectionFactory.init=="function"){if(!k){k=true;
StompConnectionFactory.init(g,a)
}var l=StompConnectionFactory.createConnection(g,e,i,function(){if(l.value!==undefined){d.value=l.value
}else{if(l.exception!==undefined){d.exception=l.exception
}}d.getValue=function(){return l.getValue()
};
m()
})
}else{setTimeout(function(){f(m)
},100)
}}f(j);
return d
}
}function StompJms(){var I="",Nb="\n--><\/script>",hb='" for "gwt:onLoadErrorFn"',fb='" for "gwt:onPropertyErrorFn"',Cb='"<script src=\\"',S='"><\/script>',U="#",Mb=");",Db='.cache.js\\"></scr" + "ipt>"',W="/",vb="1960F6E8E7F1D69B4A6528B872E82E30",wb="4982CAAB7A0735926AE504B1C4E536EF",xb="8680B3CE58B68A71D275A06E9C9B8A55",R='<script id="',Eb="<script><!--\n",cb="=",V="?",yb="B99DFE3A548A08BBF856736C8A4E5AC9",eb='Bad handler "',zb="C91FE1C92513CFB3E9809DC33E822964",sb="Cross-site hosted mode not yet implemented. See issue ",Ab="DOMContentLoaded",T="SCRIPT",J="StompJms",Q="__gwt_marker_StompJms",X="base",M="begin",L="bootstrap",Z="clear.cache.gif",bb="content",Lb="document.write(",P="end",Hb='evtGroup: "loadExternalRefs", millis:(new Date()).getTime(),',Jb='evtGroup: "moduleStartup", millis:(new Date()).getTime(),',pb="gecko",qb="gecko1_8",N="gwt.hybrid",gb="gwt:onLoadErrorFn",db="gwt:onPropertyErrorFn",ab="gwt:property",tb="http://code.google.com/p/google-web-toolkit/issues/detail?id=2079",ob="ie6",nb="ie8",Y="img",Bb="loadExternalRefs",$="meta",Gb='moduleName:"StompJms", sessionId:$sessionId, subSystem:"startup",',O="moduleStartup",mb="msie",_="name",jb="opera",lb="safari",ub="selectingPermutation",K="startup",Ib='type: "end"});',Kb='type: "moduleRequested"});',rb="unknown",ib="user.agent",kb="webkit",Fb="window.__gwtStatsEvent && window.__gwtStatsEvent({";
var k=window,l=document,m=k.__gwtStatsEvent?function(a){return k.__gwtStatsEvent(a)
}:null,n,o,p=I,q={},r=[],s=[],t=[],u,v;
m&&m({moduleName:J,sessionId:$sessionId,subSystem:K,evtGroup:L,millis:(new Date).getTime(),type:M});
if(!k.__gwt_stylesLoaded){k.__gwt_stylesLoaded={}
}if(!k.__gwt_scriptsLoaded){k.__gwt_scriptsLoaded={}
}function w(){try{return k.external&&(k.external.gwtOnLoad&&k.location.search.indexOf(N)==-1)
}catch(a){return false
}}function x(){if(n&&o){n(u,J,p);
m&&m({moduleName:J,sessionId:$sessionId,subSystem:K,evtGroup:O,millis:(new Date).getTime(),type:P})
}}function y(){var e,f=Q,g;
l.write(R+f+S);
g=l.getElementById(f);
e=g&&g.previousSibling;
while(e&&e.tagName!=T){e=e.previousSibling
}function h(a){var b=a.lastIndexOf(U);
if(b==-1){b=a.length
}var c=a.indexOf(V);
if(c==-1){c=a.length
}var d=a.lastIndexOf(W,Math.min(c,b));
return d>=0?a.substring(0,d+1):I
}if(e&&e.src){p=h(e.src)
}if(p==I){var i=l.getElementsByTagName(X);
if(i.length>0){p=i[i.length-1].href
}else{p=h(l.location.href)
}}else{if(p.match(/^\w+:\/\//)){}else{var j=l.createElement(Y);
j.src=p+Z;
p=h(j.src)
}}if(g){g.parentNode.removeChild(g)
}}function z(){var b=document.getElementsByTagName($);
for(var c=0,d=b.length;
c<d;
++c){var e=b[c],f=e.getAttribute(_),g;
if(f){if(f==ab){g=e.getAttribute(bb);
if(g){var h,i=g.indexOf(cb);
if(i>=0){f=g.substring(0,i);
h=g.substring(i+1)
}else{f=g;
h=I
}q[f]=h
}}else{if(f==db){g=e.getAttribute(bb);
if(g){try{v=eval(g)
}catch(a){alert(eb+g+fb)
}}}else{if(f==gb){g=e.getAttribute(bb);
if(g){try{u=eval(g)
}catch(a){alert(eb+g+hb)
}}}}}}}}function C(a,b){var c=t;
for(var d=0,e=a.length-1;
d<e;
++d){c=c[a[d]]||(c[a[d]]=[])
}c[a[e]]=b
}function D(a){var b=s[a](),c=r[a];
if(b in c){return b
}var d=[];
for(var e in c){d[c[e]]=e
}if(v){v(a,d,b)
}throw null
}s[ib]=function(){var b=navigator.userAgent.toLowerCase();
var c=function(a){return parseInt(a[1])*1000+parseInt(a[2])
};
if(b.indexOf(jb)!=-1){return jb
}else{if(b.indexOf(kb)!=-1){return lb
}else{if(b.indexOf(mb)!=-1){if(document.documentMode>=8){return nb
}else{var d=/msie ([0-9]+)\.([0-9]+)/.exec(b);
if(d&&d.length==3){var e=c(d);
if(e>=6000){return ob
}}}}else{if(b.indexOf(pb)!=-1){var d=/rv:([0-9]+)\.([0-9]+)/.exec(b);
if(d&&d.length==3){if(c(d)>=1008){return qb
}}return pb
}}}}return rb
};
r[ib]={gecko:0,gecko1_8:1,ie6:2,ie8:3,opera:4,safari:5};
StompJms.onScriptLoad=function(a){StompJms=null;
n=a;
x()
};
if(w()){alert(sb+tb);
return
}y();
z();
m&&m({moduleName:J,sessionId:$sessionId,subSystem:K,evtGroup:L,millis:(new Date).getTime(),type:ub});
var E;
try{C([lb],vb);
C([nb],wb);
C([jb],xb);
C([ob],yb);
C([pb],zb);
C([qb],zb);
E=t[D(ib)]
}catch(a){return
}var F;
function G(){if(!o){o=true;
x();
if(l.removeEventListener){l.removeEventListener(Ab,G,false)
}if(F){clearInterval(F)
}}}if(l.addEventListener){l.addEventListener(Ab,function(){G()
},false)
}var F=setInterval(function(){if(/loaded|complete/.test(l.readyState)){G()
}},50);
m&&m({moduleName:J,sessionId:$sessionId,subSystem:K,evtGroup:L,millis:(new Date).getTime(),type:P});
m&&m({moduleName:J,sessionId:$sessionId,subSystem:K,evtGroup:Bb,millis:(new Date).getTime(),type:M});
var H=Cb+p+E+Db;
l.write(Eb+Fb+Gb+Hb+Ib+Fb+Gb+Jb+Kb+Lb+H+Mb+Nb)
}StompJms();