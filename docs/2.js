(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"/lUR":function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var i=n("fXoL"),o=n("3lYi"),c=n("ofXK"),s=n("X0JU");function r(e,t){if(1&e&&(i.Qb(0,"span",6),i.zc(1),i.Pb()),2&e){const e=i.bc(2);i.Db("mr-8",!e.copyable),i.gc("title",e.copyable?e.api.urlForCopy:e.api.url),i.zb(1),i.Bc(" ",e.copyable?e.api.urlForCopy:e.api.url," ")}}function a(e,t){if(1&e&&(i.Qb(0,"span",4),i.yc(1,r,2,4,"span",5),i.Pb()),2&e){const e=i.bc();i.zb(1),i.gc("appCopy",e.copyable)("appCopyValue",e.api.urlForCopy)("appCopyTitle","api-copy-url")}}function p(e,t){if(1&e&&(i.Qb(0,"span",9),i.zc(1),i.Pb()),2&e){const e=i.bc(2);i.gc("title",e.api.description),i.zb(1),i.Bc(" ",e.api.description," ")}}function b(e,t){if(1&e&&(i.Qb(0,"span",7),i.yc(1,p,2,2,"span",8),i.Pb()),2&e){const e=i.bc();i.zb(1),i.gc("appCopy",e.copyable)("appCopyValue",e.api.description)("appCopyTitle","api-copy-description")}}let l=(()=>{class e{constructor(){this.showMethod=!0,this.showUrl=!0,this.showDescription=!0,this.twoLine=!1,this.copyable=!0}get className(){return this.twoLine?"two-line align-center":""}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=i.Fb({type:e,selectors:[["app-api-info"]],hostVars:2,hostBindings:function(e,t){2&e&&i.Bb(t.className)},inputs:{api:"api",showMethod:"showMethod",showUrl:"showUrl",showDescription:"showDescription",twoLine:"twoLine",copyable:"copyable"},decls:4,vars:7,consts:[[1,"method","mr-10",3,"deprecated","method","showMethod"],[1,"flex-1","inline-flex","api-info"],["class","api-url inline-flex align-center","style","min-width: 0",4,"ngIf"],["class","api-description inline-flex align-center","style","min-width: 0",4,"ngIf"],[1,"api-url","inline-flex","align-center",2,"min-width","0"],["class","mx-1 code f-16 title text-ellipsis",3,"title","mr-8",4,"appCopy","appCopyValue","appCopyTitle"],[1,"mx-1","code","f-16","title","text-ellipsis",3,"title"],[1,"api-description","inline-flex","align-center",2,"min-width","0"],["class","sub-title text-ellipsis",3,"title",4,"appCopy","appCopyValue","appCopyTitle"],[1,"sub-title","text-ellipsis",3,"title"]],template:function(e,t){1&e&&(i.Mb(0,"app-api-method",0),i.Qb(1,"div",1),i.yc(2,a,2,3,"span",2),i.yc(3,b,2,3,"span",3),i.Pb()),2&e&&(i.gc("deprecated",t.api.deprecated)("method",t.api.method)("showMethod",t.showMethod),i.zb(1),i.Db("deprecated",t.api.deprecated),i.zb(1),i.gc("ngIf",t.showUrl),i.zb(1),i.gc("ngIf",t.showDescription))},directives:[o.a,c.l,s.a],styles:[".flex[_ngcontent-%COMP%]{display:flex}.inline-flex[_ngcontent-%COMP%]{display:inline-flex!important}.justify-center[_ngcontent-%COMP%]{justify-content:center}.justify-end[_ngcontent-%COMP%]{justify-content:flex-end}.justify-start[_ngcontent-%COMP%]{justify-content:flex-start}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.justify-around[_ngcontent-%COMP%]{justify-content:space-around}.align-flex-end[_ngcontent-%COMP%]{align-items:flex-end}.align-center[_ngcontent-%COMP%]{align-items:center}.align-start[_ngcontent-%COMP%]{align-items:flex-start}.flex-column[_ngcontent-%COMP%]{flex-direction:column}.xy-center[_ngcontent-%COMP%]{align-items:center}.x-center[_ngcontent-%COMP%], .xy-center[_ngcontent-%COMP%]{display:flex;justify-content:center}.y-center[_ngcontent-%COMP%]{display:flex;align-items:center}.flex-1[_ngcontent-%COMP%]{flex:1;min-width:0}.flex-1-h[_ngcontent-%COMP%]{flex:1;min-height:0}[_nghost-%COMP%]{flex:1;min-width:0;display:inline-flex!important;align-items:center;margin-right:10px}[_nghost-%COMP%]   .method[_ngcontent-%COMP%]{flex-shrink:0}.two-line[_nghost-%COMP%]   .api-info[_ngcontent-%COMP%]{flex-direction:column}"]}),e})()},"3lYi":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var i=n("fXoL"),o=n("ofXK"),c=n("bTqV");const s=function(e){return{white:!0,"f-12":!0,"inline-flex":!0,"align-center":!0,"justify-center":!0,method:!0,deprecated:e}};function r(e,t){if(1&e&&(i.Qb(0,"button",1),i.zc(1),i.cc(2,"uppercase"),i.Pb()),2&e){const e=i.bc();i.Bb(e.method),i.gc("ngClass",i.ic(6,s,e.deprecated)),i.zb(1),i.Bc(" ",i.dc(2,4,e.method),"\n")}}let a=(()=>{class e{constructor(){this.deprecated=!1,this.showMethod=!0}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=i.Fb({type:e,selectors:[["app-api-method"]],inputs:{deprecated:"deprecated",showMethod:"showMethod",method:"method"},decls:1,vars:1,consts:[["mat-flat-button","","class","white f-12 inline-flex align-center justify-center method",3,"ngClass","class",4,"ngIf"],["mat-flat-button","",1,"white","f-12","inline-flex","align-center","justify-center","method",3,"ngClass"]],template:function(e,t){1&e&&i.yc(0,r,3,8,"button",0),2&e&&i.gc("ngIf",t.showMethod)},directives:[o.l,c.b,o.j],pipes:[o.r],styles:["button.method[_ngcontent-%COMP%]{width:60px;height:27px;border-radius:0;line-height:27px}"]}),e})()},"5KXc":function(e,t,n){"use strict";n.r(t),n.d(t,"ApiModule",(function(){return be}));var i=n("ADsi"),o=n("/lUR"),c=n("3lYi"),s=n("Osn4"),r=n("RUS2"),a=n("tyNb"),p=n("fXoL"),b=n("7EHt"),l=n("KhHu"),d=n("ZLBh"),u=n("ofXK"),h=n("fHU7"),f=n("1jcm"),g=n("bTqV"),m=n("kmnG"),y=n("qFsG"),P=n("3Pt+"),x=n("QibW");function v(e,t){if(1&e){const e=p.Rb();p.Qb(0,"button",5),p.Xb("click",(function(){return p.oc(e),p.bc().save()})),p.zc(1," \u4fdd\u5b58 "),p.Pb()}}function Q(e,t){if(1&e){const e=p.Rb();p.Qb(0,"button",28),p.Xb("click",(function(){return p.oc(e),p.bc(5).addCookie()})),p.zc(1," \u6dfb\u52a0 "),p.Pb()}}function z(e,t){if(1&e){const e=p.Rb();p.Qb(0,"button",29),p.Xb("click",(function(){p.oc(e);const t=p.bc().index;return p.bc(4).removeCookie(t)})),p.zc(1," \u79fb\u9664 "),p.Pb()}}function k(e,t){if(1&e&&(p.Qb(0,"div",22),p.Qb(1,"mat-form-field"),p.Qb(2,"input",23),p.Xb("ngModelChange",(function(e){return t.$implicit.key=e})),p.Pb(),p.Pb(),p.Qb(3,"mat-form-field",24),p.Qb(4,"input",25),p.Xb("ngModelChange",(function(e){return t.$implicit.value=e})),p.Pb(),p.Pb(),p.yc(5,Q,2,0,"button",26),p.yc(6,z,2,0,"button",27),p.Pb()),2&e){const e=t.$implicit,n=t.index;p.zb(2),p.gc("ngModel",e.key),p.zb(2),p.gc("ngModel",e.value),p.zb(1),p.gc("ngIf",0===n),p.zb(1),p.gc("ngIf",0!==n)}}function C(e,t){if(1&e&&(p.Qb(0,"div"),p.yc(1,k,7,4,"div",21),p.Pb()),2&e){const e=p.bc(3);p.zb(1),p.gc("ngForOf",e.auth.cookie)}}function I(e,t){if(1&e){const e=p.Rb();p.Qb(0,"div"),p.Qb(1,"mat-form-field",11),p.Qb(2,"input",30),p.Xb("ngModelChange",(function(t){return p.oc(e),p.bc(3).auth.token=t})),p.Pb(),p.Pb(),p.Pb()}if(2&e){const e=p.bc(3);p.zb(2),p.gc("ngModel",e.auth.token)}}function M(e,t){1&e&&(p.Qb(0,"div"),p.Qb(1,"mat-form-field",11),p.Mb(2,"input",31),p.Pb(),p.Pb())}function w(e,t){if(1&e){const e=p.Rb();p.Ob(0),p.Qb(1,"div",10),p.zc(2,"\u4ee5\u4e0b\u914d\u7f6e\u53ea\u9488\u5bf9\u5f53\u524d Project\uff1a"),p.Pb(),p.Qb(3,"div"),p.Qb(4,"mat-form-field",11),p.Qb(5,"label",12),p.zc(6,"API \u8f6c\u53d1\u5730\u5740"),p.Pb(),p.Qb(7,"input",13),p.Xb("ngModelChange",(function(t){return p.oc(e),p.bc(2).auth.apiUrl=t})),p.Pb(),p.Pb(),p.Pb(),p.Qb(8,"mat-radio-group",14),p.Xb("ngModelChange",(function(t){return p.oc(e),p.bc(2).auth.kind=t})),p.Qb(9,"label",15),p.zc(10,"\u9274\u6743\u65b9\u5f0f\uff1a"),p.Pb(),p.Qb(11,"mat-radio-button",16),p.zc(12," Cookie "),p.Pb(),p.Qb(13,"mat-radio-button",17),p.zc(14," Token "),p.Pb(),p.Qb(15,"mat-radio-button",18),p.Qb(16,"span",19),p.zc(17,"\u5176\u5b83"),p.Pb(),p.Pb(),p.Pb(),p.Qb(18,"div",20),p.yc(19,C,2,1,"div",9),p.yc(20,I,3,1,"div",9),p.yc(21,M,3,0,"div",9),p.Pb(),p.Nb()}if(2&e){const e=p.bc(2);p.zb(7),p.gc("ngModel",e.auth.apiUrl),p.zb(1),p.gc("ngModel",e.auth.kind),p.zb(11),p.gc("ngIf","cookie"===e.auth.kind),p.zb(1),p.gc("ngIf","token"===e.auth.kind),p.zb(1),p.gc("ngIf","other"===e.auth.kind)}}function O(e,t){if(1&e){const e=p.Rb();p.Qb(0,"div",6),p.Qb(1,"mat-slide-toggle",7),p.Xb("change",(function(t){return p.oc(e),p.bc().toggleProxy(t)})),p.Qb(2,"span",8),p.zc(3,"\u4f7f\u7528\u4ee3\u7406\uff08\u5168\u5c40\uff09"),p.Pb(),p.Pb(),p.yc(4,w,22,5,"ng-container",9),p.Pb()}if(2&e){const e=p.bc();p.zb(1),p.gc("checked",e.useProxy),p.zb(3),p.gc("ngIf",e.useProxy)}}let _=(()=>{class e{constructor(e){this.store=e,this.showSetting=!1,this.useProxy=!1,this.auth={kind:"cookie",apiUrl:"",token:"",cookie:[{key:"",value:""}]}}ngOnInit(){this.store.getData$().subscribe(e=>this.setAuthData(e))}setAuthData(e){this.useProxy=e.useProxy||!1;const t=this.store.getCurPorject();t.auth&&(this.auth=t.auth)}addCookie(){this.auth.cookie.push({key:"",value:""})}removeCookie(e){this.auth.cookie.splice(e,1)}toggleSetting(e){this.showSetting=e.checked}toggleProxy(e){this.useProxy=e.checked}save(){this.store.setProjectAuth(this.auth,this.useProxy)}}return e.\u0275fac=function(t){return new(t||e)(p.Lb(d.g))},e.\u0275cmp=p.Fb({type:e,selectors:[["app-api-auth"]],decls:6,vars:3,consts:[[1,"mb-16"],["color","primary",1,"proxy-setting","mr-8",3,"checked","change"],["tr","api-request-config"],["mat-flat-button","","color","primary","class","outlined","tr","save",3,"click",4,"ngIf"],["class","auth-setting",4,"ngIf"],["mat-flat-button","","color","primary","tr","save",1,"outlined",3,"click"],[1,"auth-setting"],["color","primary",1,"mb-16",3,"checked","change"],["tr","api-request-use-proxy"],[4,"ngIf"],["tr","api-auth-tip"],[1,"full-width"],["tr","api-proxy-url",1,"mb-8"],["matInput","","type","url",3,"ngModel","ngModelChange"],[1,"flex","y-center",3,"ngModel","ngModelChange"],["tr","api-auth-kind"],["color","primary","value","cookie"],["color","primary","value","token",1,"mx-20"],["color","primary","value","other"],["tr","other"],[1,"mt-10"],["class","cookie-item",4,"ngFor","ngForOf"],[1,"cookie-item"],["matInput","","placeholder","Key",3,"ngModel","ngModelChange"],[1,"mx-10","cookie-input"],["matInput","","placeholder","Value",3,"ngModel","ngModelChange"],["mat-stroked-button","","color","primary","class","outlined mr-8","tr","add",3,"click",4,"ngIf"],["mat-stroked-button","","color","warn","class","outlined","tr","remove",3,"click",4,"ngIf"],["mat-stroked-button","","color","primary","tr","add",1,"outlined","mr-8",3,"click"],["mat-stroked-button","","color","warn","tr","remove",1,"outlined",3,"click"],["matInput","",3,"ngModel","ngModelChange"],["matInput","","value","TODO","disabled",""]],template:function(e,t){1&e&&(p.Qb(0,"div",0),p.Qb(1,"mat-slide-toggle",1),p.Xb("change",(function(e){return t.toggleSetting(e)})),p.Qb(2,"span",2),p.zc(3,"\u8bf7\u6c42\u8bbe\u7f6e"),p.Pb(),p.Pb(),p.yc(4,v,2,0,"button",3),p.Pb(),p.yc(5,O,5,2,"div",4)),2&e&&(p.zb(1),p.gc("checked",t.showSetting),p.zb(3),p.gc("ngIf",t.showSetting),p.zb(1),p.gc("ngIf",t.showSetting))},directives:[f.a,h.a,u.l,g.b,m.b,y.a,P.b,P.h,P.j,x.b,x.a,u.k],styles:[".auth-setting[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:inline-block}.cookie-input[_ngcontent-%COMP%]{width:360px}.full-width[_ngcontent-%COMP%]{width:550px}"]}),e})();var S=n("NOzg"),X=n("X0JU"),F=n("f0Cb"),j=n("2izT"),T=n("3q25");let q=(()=>{class e{constructor(e,t){this.idService=e,this.copyService=t,this.closeMenu=new p.n,this.removeQuestion=!1,this.showSample=!1,this.fixed=!1,this.noQuestionCode="",this.mockCode="",this.codeString="",this.typeID=this.idService.genID()}set code(e){!this.code&&e?(this._code=e,this.codeString=e):this.resize=!!e}get code(){return this._code}keyEvent(e){switch(e.key){case"Escape":this.close()}}ngOnInit(){}removeCodeQuestion(e){e.checked&&!this.noQuestionCode&&(this.noQuestionCode=this.code.replace(/\?:/gi,":")),this.removeQuestion=e.checked,this.codeString=e.checked?this.noQuestionCode:this.code}getMockCode(e){this.showSample=e.checked,this.mockCode||(this.mockCode="// TODO"),this.codeString=e.checked?this.mockCode:this.removeQuestion?this.noQuestionCode:this.code}copy(){this.copyService.copy(this.codeString,!1),this.fixed||this.close()}close(){this.closeMenu.emit()}useFoarmatCode(e){e!==this.code&&(this._code=e)}fixedPopover(e){this.fixed=e.checked}}return e.\u0275fac=function(t){return new(t||e)(p.Lb(d.c),p.Lb(d.a))},e.\u0275cmp=p.Fb({type:e,selectors:[["app-api-type-hover"]],hostBindings:function(e,t){1&e&&p.Xb("keyup",(function(e){return t.keyEvent(e)}),!1,p.nc)},inputs:{code:"code"},outputs:{closeMenu:"closeMenu"},decls:18,vars:8,consts:[[3,"id","value","minimap","resize","format"],[1,"justify-between","y-center","py-8"],[1,"left","pl-16"],["color","primary",1,"remove-question",3,"checked","disabled","change"],["tr","api-type-remove-partial"],["color","primary",1,"mx-16","show-sample",3,"checked","change"],["tr","api-type-example"],["color","primary",1,"fixed-popover",3,"checked","change"],["tr","fixed"],[1,"right"],["mat-button","","color","primary","tr","copy",1,"copy-code",3,"click"],["mat-button","","tr","close-esc",1,"close",3,"click"]],template:function(e,t){1&e&&(p.Qb(0,"div"),p.Qb(1,"app-editor",0),p.Xb("format",(function(e){return t.useFoarmatCode(e)})),p.Pb(),p.Qb(2,"div",1),p.Qb(3,"div",2),p.Qb(4,"mat-slide-toggle",3),p.Xb("change",(function(e){return t.removeCodeQuestion(e)})),p.Qb(5,"span",4),p.zc(6,"Partial<T> \u8f6c T"),p.Pb(),p.Pb(),p.Qb(7,"mat-slide-toggle",5),p.Xb("change",(function(e){return t.getMockCode(e)})),p.Qb(8,"span",6),p.zc(9,"\u793a\u4f8b"),p.Pb(),p.Pb(),p.Qb(10,"mat-slide-toggle",7),p.Xb("change",(function(e){return t.fixedPopover(e)})),p.Qb(11,"span",8),p.zc(12,"\u7f6e\u9876"),p.Pb(),p.Pb(),p.Pb(),p.Qb(13,"div",9),p.Qb(14,"button",10),p.Xb("click",(function(){return t.copy()})),p.zc(15," \u590d\u5236 "),p.Pb(),p.Qb(16,"button",11),p.Xb("click",(function(){return t.close()})),p.zc(17," \u5173\u95ed\uff08ESC\uff09 "),p.Pb(),p.Pb(),p.Pb(),p.Pb()),2&e&&(p.zb(1),p.gc("id",t.typeID)("value",t.codeString)("minimap",!1)("resize",t.resize),p.zb(3),p.gc("checked",t.removeQuestion)("disabled",t.showSample),p.zb(3),p.gc("checked",t.showSample),p.zb(3),p.gc("checked",t.fixed))},directives:[T.a,f.a,h.a,g.b],styles:[""]}),e})();function D(e,t){if(1&e&&(p.Qb(0,"pre",6),p.zc(1),p.Pb()),2&e){const e=p.bc(2);p.zb(1),p.Ac(e.displayText)}}function L(e,t){if(1&e&&(p.Qb(0,"span",7),p.zc(1),p.Pb()),2&e){const e=p.bc(2);p.zb(1),p.Ac(e.displayText)}}function R(e,t){if(1&e){const e=p.Rb();p.Qb(0,"app-hover-menu",8,9),p.Xb("opened",(function(){return p.oc(e),p.bc(2).lazyGetType()})),p.Qb(2,"a",10),p.zc(3),p.Pb(),p.Qb(4,"app-api-type-hover",11,12),p.Xb("closeMenu",(function(){return p.oc(e),p.lc(1).close()})),p.Pb(),p.Pb()}if(2&e){const e=p.lc(1),t=p.lc(5),n=p.bc(2);p.gc("fixed",t.fixed),p.zb(3),p.Ac(n.type),p.zb(1),p.gc("code",e.open?n.code:"")}}function A(e,t){if(1&e&&(p.Qb(0,"span",2),p.yc(1,D,2,1,"pre",3),p.yc(2,L,2,1,"span",4),p.yc(3,R,6,3,"app-hover-menu",5),p.Pb()),2&e){const e=p.bc();p.Bb(e.parameterID),p.zb(1),p.gc("ngIf",e.enumType),p.zb(1),p.gc("ngIf",!e.enumType),p.zb(1),p.gc("ngIf",e.refType)}}let U=(()=>{class e{constructor(e,t,n){this.typeService=e,this.idService=t,this.store=n,this.type="",this.refType=!1,this.enumType=!1,this.openOnHover=!0,this.code="",this.parameterID=this.idService.genID()}get displayText(){return this.parameter.display?this.parameter.display+(this.type?": "+(this.refType?"":this.type):""):""}ngOnInit(){this.type=this.typeService.getType(this.parameter),this.enumType=this.type.includes("|"),this.refType=this.typeService.refType}lazyGetType(){if(this.refType&&!this.code){const t=this.store.getCurProjectId();try{this.code=this.typeService.getExports(t,this.type)}catch(e){this.code="// \u89e3\u6790\u5931\u8d25\n"}}}}return e.\u0275fac=function(t){return new(t||e)(p.Lb(d.i),p.Lb(d.c),p.Lb(d.g))},e.\u0275cmp=p.Fb({type:e,selectors:[["app-api-type"]],inputs:{parameter:"parameter"},decls:2,vars:2,consts:[[1,"inline-flex","align-start"],["class","type-container inline-flex align-center",3,"class",4,"appCopy","appCopySelector"],[1,"type-container","inline-flex","align-center"],["class","ma-0 enum-type code f-14",4,"ngIf"],["class","type-display",4,"ngIf"],["menuClass","api-type-hover-panel hidden-x hidden-y",3,"fixed","opened",4,"ngIf"],[1,"ma-0","enum-type","code","f-14"],[1,"type-display"],["menuClass","api-type-hover-panel hidden-x hidden-y",3,"fixed","opened"],["menu",""],["trigger","",1,"ref-type-name"],["menuContent","",3,"code","closeMenu"],["typeHover",""]],template:function(e,t){1&e&&(p.Qb(0,"div",0),p.yc(1,A,4,5,"span",1),p.Pb()),2&e&&(p.zb(1),p.gc("appCopy",!(!t.displayText&&!t.refType))("appCopySelector",t.parameterID))},directives:[X.a,u.l,j.a,q],styles:[".white[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]{display:flex;overflow:hidden}.ref-type-name[_ngcontent-%COMP%]{color:#1976d2;cursor:pointer;word-break:break-all}  .api-type-hover-panel{min-width:550px;max-width:none!important}  .api-type-hover-panel .mat-menu-content{padding:0}"]}),e})();function B(e,t){1&e&&(p.Qb(0,"span"),p.Qb(1,"span",13),p.zc(2,"\u5b57\u6bb5\u540d"),p.Pb(),p.Pb())}function H(e,t){1&e&&(p.Qb(0,"tr",4),p.Qb(1,"td",10),p.Mb(2,"mat-divider"),p.Pb(),p.Pb())}function N(e,t){if(1&e&&(p.Ob(0),p.Qb(1,"tr",14),p.Qb(2,"td",15),p.Mb(3,"app-api-type",16),p.Qb(4,"div",17),p.zc(5),p.Pb(),p.Pb(),p.Qb(6,"td",18),p.Qb(7,"div",19),p.zc(8),p.Pb(),p.Pb(),p.Pb(),p.yc(9,H,3,0,"tr",20),p.Nb()),2&e){const e=t.$implicit,n=t.last,i=p.bc();p.zb(3),p.Bb(i.copyItemClass),p.gc("parameter",e),p.zb(2),p.Bc(" (",e.in,") "),p.zb(3),p.Ac(e.description),p.zb(1),p.gc("ngIf",!n)}}function $(e,t){1&e&&(p.Qb(0,"tr",21),p.Qb(1,"td",22),p.zc(2," \u6ca1\u6709\u53c2\u6570 "),p.Pb(),p.Pb())}let E=(()=>{class e{constructor(e){this.idService=e,this.parameters=[],this.hadParameters=!0,this.copyItemClass=this.idService.genID()}ngOnInit(){this.hadParameters=this.parameters&&0!==this.parameters.length}}return e.\u0275fac=function(t){return new(t||e)(p.Lb(d.c))},e.\u0275cmp=p.Fb({type:e,selectors:[["app-api-parameter"]],inputs:{parameters:"parameters"},decls:18,vars:5,consts:[[1,"y-center","justify-between","mb-10","header"],["tr","api-request-parameters",1,"f-16"],[1,"flex-1","border"],[1,"f-14"],[1,"no-hover"],[1,"pa-8","text-left",2,"width","70%"],[1,"parameter-fields","inline-flex","align-center"],[4,"appCopy","appCopySelector","appCopyTitle"],["tr","description",1,"pa-8","text-left"],[1,"code"],["colspan","2"],[4,"ngFor","ngForOf"],["class","no-data",4,"ngIf"],["tr","api-field-name"],[1,"parameter-item"],[1,"pa-8",2,"width","50%"],[1,"parameter-type",3,"parameter"],[1,"parameter-in","text--disabled","text-ellipsis"],[1,"pa-8",2,"vertical-align","top"],[1,"description"],["class","no-hover",4,"ngIf"],[1,"no-data"],["colspan","2","tr","api-no-parameters",1,"pa-8","text-center","text--disabled"]],template:function(e,t){1&e&&(p.Qb(0,"div",0),p.Qb(1,"span",1),p.zc(2,"\u8bf7\u6c42\u53c2\u6570"),p.Pb(),p.Pb(),p.Qb(3,"div",2),p.Qb(4,"table",3),p.Qb(5,"thead"),p.Qb(6,"tr",4),p.Qb(7,"th",5),p.Qb(8,"div",6),p.yc(9,B,3,0,"span",7),p.Pb(),p.Pb(),p.Qb(10,"th",8),p.zc(11,"\u63cf\u8ff0"),p.Pb(),p.Pb(),p.Pb(),p.Qb(12,"tbody",9),p.Qb(13,"tr",4),p.Qb(14,"td",10),p.Mb(15,"mat-divider"),p.Pb(),p.Pb(),p.yc(16,N,10,6,"ng-container",11),p.yc(17,$,3,0,"tr",12),p.Pb(),p.Pb(),p.Pb()),2&e&&(p.zb(9),p.gc("appCopy",t.hadParameters)("appCopySelector",t.copyItemClass)("appCopyTitle","api-copy-all-fileds"),p.zb(7),p.gc("ngForOf",t.parameters),p.zb(1),p.gc("ngIf",!t.hadParameters))},directives:[h.a,X.a,F.a,u.k,u.l,U],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column}.header[_ngcontent-%COMP%]{min-height:28px}.description[_ngcontent-%COMP%]{word-break:break-all}"]}),e})();function V(e,t){if(1&e&&(p.Ob(0),p.Qb(1,"tr",4),p.Qb(2,"td",9),p.Mb(3,"mat-divider"),p.Pb(),p.Pb(),p.Qb(4,"tr",24),p.Qb(5,"td",25),p.Qb(6,"div",26),p.zc(7),p.Pb(),p.Pb(),p.Qb(8,"td",13),p.Qb(9,"div",27),p.zc(10),p.Pb(),p.Pb(),p.Qb(11,"td",13),p.Qb(12,"div",28),p.zc(13),p.Pb(),p.Pb(),p.Pb(),p.Nb()),2&e){const e=t.$implicit,n=p.bc(3);p.zb(7),p.Ac(e.key),p.zb(3),p.Bc(" ",e.value.description," "),p.zb(3),p.Bc(" ",n.types[e.value.type]," ")}}function K(e,t){if(1&e&&(p.Ob(0),p.Qb(1,"tr",4),p.Qb(2,"td",9),p.Mb(3,"mat-divider"),p.Pb(),p.Pb(),p.Qb(4,"tr",4),p.Qb(5,"td",19),p.Qb(6,"table",20),p.Qb(7,"thead"),p.Qb(8,"tr",4),p.Qb(9,"th",21),p.zc(10," \u54cd\u5e94\u5934 "),p.Pb(),p.Qb(11,"th",22),p.zc(12,"\u63cf\u8ff0"),p.Pb(),p.Qb(13,"th",23),p.zc(14,"\u7c7b\u578b"),p.Pb(),p.Pb(),p.Pb(),p.Qb(15,"tbody"),p.yc(16,V,14,3,"ng-container",10),p.cc(17,"keyvalue"),p.Pb(),p.Pb(),p.Pb(),p.Pb(),p.Nb()),2&e){const e=p.bc().$implicit;p.zb(4),p.Bb("header"+e.key),p.zb(12),p.gc("ngForOf",p.dc(17,3,e.value.headers))}}function Y(e,t){1&e&&(p.Qb(0,"tr",4),p.Qb(1,"td",9),p.Mb(2,"mat-divider"),p.Pb(),p.Pb())}function J(e,t){if(1&e&&(p.Ob(0),p.Qb(1,"tr",12),p.Qb(2,"td",13),p.Qb(3,"div",14),p.zc(4),p.Pb(),p.Pb(),p.Qb(5,"td",13),p.Mb(6,"app-api-type",15),p.Pb(),p.Qb(7,"td",13),p.Qb(8,"div",16),p.zc(9),p.Pb(),p.Pb(),p.Pb(),p.yc(10,K,18,5,"ng-container",17),p.yc(11,Y,3,0,"tr",18),p.Nb()),2&e){const e=t.$implicit,n=t.last;p.zb(4),p.Ac(e.key),p.zb(2),p.gc("parameter",e.value),p.zb(3),p.Ac(e.value.description),p.zb(1),p.gc("ngIf",e.value.headers),p.zb(1),p.gc("ngIf",!n)}}function G(e,t){1&e&&(p.Qb(0,"tr",29),p.Qb(1,"td",30),p.zc(2," \u6682\u65e0\u6570\u636e "),p.Pb(),p.Pb())}let Z=(()=>{class e{constructor(){this.responses={},this.produce="application/json",this.produces=[],this.types=l.d}get responsesEmpty(){return!this.responses||0===Object.keys(this.responses).length}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=p.Fb({type:e,selectors:[["app-api-response"]],inputs:{responses:"responses",produce:"produce",produces:"produces"},decls:20,vars:4,consts:[[1,"y-center","justify-between","mb-10","header"],["tr","api-response",1,"f-16"],[1,"flex-1","border"],[1,"f-14"],[1,"no-hover"],["tr","api-response-code",1,"pa-8","text-left",2,"width","20%"],["tr","api-response-result",1,"pa-8","text-left"],["tr","description",1,"pa-8","text-left",2,"width","30%"],[1,"code"],["colspan","3"],[4,"ngFor","ngForOf"],["class","no-data",4,"ngIf"],[1,"response-item"],[1,"pa-8"],[1,"response-key"],[3,"parameter"],[1,"description"],[4,"ngIf"],["class","no-hover",4,"ngIf"],["colspan","3",1,"px-16"],[1,"response-headers",2,"border","0"],["tr","api-response-header",1,"pa-8","text-left"],["tr","description",1,"pa-8","text-left"],["tr","type",1,"pa-8","text-left"],[1,"response-header-item"],[1,"pa-8",2,"min-width","150px"],[1,"header-key"],[1,"header-description"],[1,"header-type"],[1,"no-data"],["colspan","3","tr","no-data",1,"pa-8","text-center","text--disabled"]],template:function(e,t){1&e&&(p.Qb(0,"div",0),p.Qb(1,"span",1),p.zc(2,"\u54cd\u5e94\u4f53"),p.Pb(),p.Pb(),p.Qb(3,"div",2),p.Qb(4,"table",3),p.Qb(5,"thead"),p.Qb(6,"tr",4),p.Qb(7,"th",5),p.zc(8," \u54cd\u5e94\u7801 "),p.Pb(),p.Qb(9,"th",6),p.zc(10,"\u7ed3\u679c"),p.Pb(),p.Qb(11,"th",7),p.zc(12,"\u63cf\u8ff0"),p.Pb(),p.Pb(),p.Pb(),p.Qb(13,"tbody",8),p.Qb(14,"tr",4),p.Qb(15,"td",9),p.Mb(16,"mat-divider"),p.Pb(),p.Pb(),p.yc(17,J,12,5,"ng-container",10),p.cc(18,"keyvalue"),p.yc(19,G,3,0,"tr",11),p.Pb(),p.Pb(),p.Pb()),2&e&&(p.zb(17),p.gc("ngForOf",p.dc(18,2,t.responses)),p.zb(2),p.gc("ngIf",t.responsesEmpty))},directives:[h.a,F.a,u.k,u.l,U],pipes:[u.f],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column}.header[_ngcontent-%COMP%]{min-height:28px}.description[_ngcontent-%COMP%]{word-break:break-all}"]}),e})();function W(e,t){1&e&&(p.Qb(0,"div",4),p.Qb(1,"p",5),p.zc(2,"\u6682\u65e0\u6570\u636e"),p.Pb(),p.Qb(3,"p",6),p.zc(4,"1\u3001\u53ef\u70b9\u51fb\u5de6\u4fa7\u52a0\u53f7\u3002"),p.Pb(),p.Qb(5,"p",7),p.zc(6,"2\u3001\u6216\u5de6\u4e0a\u65b9\u5730\u5740\u680f\u3002"),p.Pb(),p.Qb(7,"p",8),p.zc(8,"3\u3001\u6216\u62d6\u66f3\u6587\u4ef6\u5230\u6b64\u5904\u3002"),p.Pb(),p.Qb(9,"p",9),p.zc(10,"\u5bfc\u5165 API\uff08\u4ec5\u652f\u6301 .json \u6587\u4ef6\uff09"),p.Pb(),p.Pb())}function ee(e,t){if(1&e){const e=p.Rb();p.Qb(0,"div"),p.Qb(1,"button",12),p.Xb("click",(function(){return p.oc(e),p.bc(2).accordion.openAll()})),p.zc(2," \u5c55\u5f00\u5168\u90e8 "),p.Pb(),p.Qb(3,"button",13),p.Xb("click",(function(){return p.oc(e),p.bc(2).accordion.closeAll()})),p.zc(4," \u6536\u8d77\u5168\u90e8 "),p.Pb(),p.Pb()}}function te(e,t){if(1&e&&(p.Qb(0,"div",10),p.Mb(1,"app-api-auth"),p.yc(2,ee,5,0,"div",11),p.Pb()),2&e){const e=p.bc();p.zb(2),p.gc("ngIf",e.apiItems.length)}}function ne(e,t){if(1&e&&(p.Qb(0,"div",20),p.Mb(1,"app-api-parameter",21),p.Mb(2,"app-api-response",22),p.Pb()),2&e){const e=p.bc().$implicit;p.zb(1),p.gc("parameters",e.parameters),p.zb(1),p.gc("responses",e.responses)("produces",e.produces)("produce",e.__produce)}}const ie=function(e){return{"api-item":!0,"my-10":!0,deprecated:e}};function oe(e,t){if(1&e){const e=p.Rb();p.Qb(0,"mat-expansion-panel",14),p.Xb("expandedChange",(function(n){p.oc(e);const i=t.index;return p.bc().expandeds[i]=n}))("click",(function(){p.oc(e);const n=t.index;return p.bc().updateUrl(n)})),p.Qb(1,"mat-expansion-panel-header",15),p.Xb("mousedown",(function(){return p.oc(e),p.bc().recordStart()}))("mouseup",(function(){p.oc(e);const n=t.index;return p.bc().shouldAvoidSelect(n)})),p.Qb(2,"div",16),p.Mb(3,"app-api-info",17),p.Mb(4,"app-api-request",18),p.Pb(),p.Pb(),p.yc(5,ne,3,4,"ng-template",19),p.Pb()}if(2&e){const e=t.$implicit,n=t.index,i=p.bc();p.Bb(e.__info.method),p.gc("id",i.ID_PREFIX+n)("ngClass",p.ic(9,ie,e.deprecated))("expanded",i.expandeds[n]),p.zb(1),p.Db("actived",n===i.activedIndex),p.zb(2),p.gc("api",e.__info),p.zb(1),p.gc("apiItem",e)}}let ce=(()=>{class e{constructor(e,t){this.store=e,this.scroll=t,this.apiItems=[],this.expandeds=[],this.ID_PREFIX=l.a}ngOnInit(){this.store.getData$().subscribe(e=>{this.apiItems=e.apiItems,this.expandeds=e.expandeds,this.expandeds[e.index.apiIndex]=!0,this.activedIndex=e.index.apiIndex,this.scroll.tick_then(()=>{this.scroll.to(this.ID_PREFIX+this.activedIndex)})})}recordStart(){this.start=+new Date}shouldAvoidSelect(e){+new Date-this.start>200&&(this.expandeds[e]=!this.expandeds[e])}updateUrl(e){this.store.updateUrl(e)}}return e.\u0275fac=function(t){return new(t||e)(p.Lb(d.g),p.Lb(d.f))},e.\u0275cmp=p.Fb({type:e,selectors:[["app-api-list"]],viewQuery:function(e,t){if(1&e&&p.Cc(b.a,!0),2&e){let e;p.kc(e=p.Yb())&&(t.accordion=e.first)}},decls:4,vars:3,consts:[["class","no-data f-16 mt-32 text-center",4,"ngIf"],["class","api-items flex justify-between mb-16",4,"ngIf"],["multi","","hideToggle",""],[3,"id","ngClass","class","expanded","expandedChange","click",4,"ngFor","ngForOf"],[1,"no-data","f-16","mt-32","text-center"],["tr","no-data",1,"my-32"],["tr","project-import-tip-1"],["tr","project-import-tip-2"],["tr","project-import-tip-3"],["tr","project-import-tip",1,"mt-32"],[1,"api-items","flex","justify-between","mb-16"],[4,"ngIf"],["mat-stroked-button","","color","primary","tr","expand-all",1,"outlined","expand-all","mr-10",3,"click"],["mat-stroked-button","","color","primary","tr","close-all",1,"outlined","close-all",3,"click"],[3,"id","ngClass","expanded","expandedChange","click"],["expandedHeight","48px",1,"px-16",3,"mousedown","mouseup"],[1,"y-center","justify-between","flex-1"],[1,"flex-1",3,"api"],[3,"apiItem"],["matExpansionPanelContent",""],[1,"api-detail","flex"],[1,"px-10","flex-1",3,"parameters"],[1,"px-10","flex-1",3,"responses","produces","produce"]],template:function(e,t){1&e&&(p.yc(0,W,11,0,"div",0),p.yc(1,te,3,1,"div",1),p.Qb(2,"mat-accordion",2),p.yc(3,oe,6,11,"mat-expansion-panel",3),p.Pb()),2&e&&(p.gc("ngIf",!t.apiItems.length),p.zb(1),p.gc("ngIf",t.apiItems.length),p.zb(2),p.gc("ngForOf",t.apiItems))},directives:[u.l,b.a,u.k,h.a,_,g.b,b.c,u.j,b.e,o.a,S.a,b.d,E,Z],styles:["[_nghost-%COMP%]     .mat-expansion-panel-body{padding:0!important}.api-detail[_ngcontent-%COMP%]{padding:10px 8px 20px}app-api-request[_ngcontent-%COMP%]{flex-shrink:0}"]}),e})();const se=[{path:"",component:(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=p.Fb({type:e,selectors:[["app-api"]],decls:1,vars:0,template:function(e,t){1&e&&p.Mb(0,"app-api-list")},directives:[ce],styles:[""]}),e})()}];let re=(()=>{class e{}return e.\u0275mod=p.Jb({type:e}),e.\u0275inj=p.Ib({factory:function(t){return new(t||e)},imports:[[a.a.forChild(se)],a.a]}),e})();var ae=n("0IaG"),pe=n("NFeN");let be=(()=>{class e{}return e.\u0275mod=p.Jb({type:e}),e.\u0275inj=p.Ib({factory:function(t){return new(t||e)},imports:[[i.a,re]]}),e})();p.rc(s.a,[u.l,ae.d,o.a,u.k,P.b,P.h,P.j,r.a,c.a,h.a,g.b,ae.c,pe.a,T.a],[])},NOzg:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var i=n("fXoL"),o=n("rSzY"),c=n("ZLBh"),s=n("bTqV"),r=n("6g6n"),a=n("fHU7"),p=n("ofXK"),b=n("RUS2");function l(e,t){if(1&e&&i.Mb(0,"app-api-request-history",3),2&e){const e=i.bc();i.gc("apiItem",e.apiItem)}}let d=(()=>{class e{constructor(e,t){this.dialogService=e,this.store=t,this.showHistory=!0}ngOnInit(){}request(){const e=this.apiItem||this.store.getApiItem(this.apiId);this.dialogService.openRequestDialog(e)}}return e.\u0275fac=function(t){return new(t||e)(i.Lb(o.a),i.Lb(c.g))},e.\u0275cmp=i.Fb({type:e,selectors:[["app-api-request"]],inputs:{apiId:"apiId",apiItem:"apiItem",showHistory:"showHistory"},decls:4,vars:1,consts:[[1,"api-action"],["mat-stroked-button","","color","primary","appStopClick","","tr","api-try-it-out",1,"outlined","px-12",3,"click"],[3,"apiItem",4,"ngIf"],[3,"apiItem"]],template:function(e,t){1&e&&(i.Qb(0,"div",0),i.Qb(1,"button",1),i.Xb("click",(function(){return t.request()})),i.zc(2," \u53d1\u8d77\u8bf7\u6c42 "),i.Pb(),i.yc(3,l,1,1,"app-api-request-history",2),i.Pb()),2&e&&(i.zb(3),i.gc("ngIf",t.showHistory))},directives:[s.b,r.a,a.a,p.l,b.a],styles:[""]}),e})()},RUS2:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var i=n("fXoL"),o=n("ZLBh"),c=n("rSzY"),s=n("bTqV"),r=n("6g6n"),a=n("fHU7"),p=n("STbY"),b=n("NFeN"),l=n("ofXK");function d(e,t){1&e&&(i.Qb(0,"div",7),i.zc(1," \u6682\u65e0\u8bb0\u5f55 "),i.Pb())}function u(e,t){if(1&e){const e=i.Rb();i.Qb(0,"div",8),i.Xb("click",(function(){i.oc(e);const n=t.$implicit;return i.bc(2).request(n)})),i.Qb(1,"span",9),i.zc(2),i.Pb(),i.Mb(3,"span"),i.Qb(4,"span",10),i.zc(5),i.Pb(),i.Pb()}if(2&e){const e=t.$implicit;i.zb(2),i.Ac(e.name),i.zb(3),i.Bc(" ",e.url," ")}}function h(e,t){if(1&e&&(i.yc(0,d,2,0,"div",5),i.yc(1,u,6,2,"div",6)),2&e){const e=i.bc();i.gc("ngIf",e.empty),i.zb(1),i.gc("ngForOf",e.historys)}}let f=(()=>{class e{constructor(e,t){this.historyService=e,this.dialogService=t,this.outlined=!0,this.fromRequest=!1,this.selectHistory=new i.n,this.historys=[],this.empty=!0}ngOnInit(){}getHistory(){this.historys=this.apiItem?this.historyService.get(this.apiItem.__id):[],this.empty=0===this.historys.length}request(e){this.fromRequest?this.selectHistory.emit(e):this.dialogService.openRequestDialog(this.apiItem,e)}}return e.\u0275fac=function(t){return new(t||e)(i.Lb(o.b),i.Lb(c.a))},e.\u0275cmp=i.Fb({type:e,selectors:[["app-api-request-history"]],inputs:{apiItem:"apiItem",outlined:"outlined",fromRequest:"fromRequest"},outputs:{selectHistory:"selectHistory"},decls:6,vars:3,consts:[["mat-stroked-button","","color","primary","appStopClick","","title","\u9009\u62e9\u5386\u53f2\u8bb0\u5f55","tr","api-select-request-histroy|title",1,"outlined","px-2","history",3,"matMenuTriggerFor","menuOpened"],[1,"f-21"],[1,"api-request-hisotry-panel","scroll-y","hidden-x"],["historyRef","matMenu"],["matMenuContent",""],["class","no-historys sub-title text-center","tr","api-no-request-histroy",4,"ngIf"],["class","px-10 code history-item",3,"click",4,"ngFor","ngForOf"],["tr","api-no-request-histroy",1,"no-historys","sub-title","text-center"],[1,"px-10","code","history-item",3,"click"],[1,"title"],[1,"url"]],template:function(e,t){if(1&e&&(i.Qb(0,"button",0),i.Xb("menuOpened",(function(){return t.getHistory()})),i.Qb(1,"mat-icon",1),i.zc(2,"history"),i.Pb(),i.Pb(),i.Qb(3,"mat-menu",2,3),i.yc(5,h,2,2,"ng-template",4),i.Pb()),2&e){const e=i.lc(4);i.Db("no-outlined",!t.outlined),i.gc("matMenuTriggerFor",e)}},directives:[s.b,r.a,a.a,p.e,b.a,p.a,p.b,l.l,l.k],styles:[".white[_ngcontent-%COMP%]{color:#fff}.history[_ngcontent-%COMP%]{margin-left:-1px}.history.no-outlined[_ngcontent-%COMP%]{border-color:transparent!important}  .api-request-hisotry-panel{max-width:none!important;min-height:0}  .api-request-hisotry-panel app-api-search{position:relative;left:auto}  .api-request-hisotry-panel .no-historys,   .api-request-hisotry-panel app-api-search .search-container{padding:0 10px}.history-item[_ngcontent-%COMP%]{cursor:pointer}.history-item[_ngcontent-%COMP%]:hover{background:rgba(63,81,181,.15)}"]}),e})()}}]);