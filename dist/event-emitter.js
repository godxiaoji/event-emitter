!function(root,factory){"function"==typeof define&&define.amd?define([],factory):"object"==typeof module&&module.exports?module.exports=factory():root.EventEmitter=factory()}("undefined"!=typeof self?self:this,function(){"use strict";function isArray(value){return value&&value instanceof Array}function isNumeric(value){return null!=value&&!isNaN(parseFloat(value))&&isFinite(value)}function getNamespace(eventName){var arr=(eventName||"").split(".");return{eventName:arr[0],namespace:arr[1]||null}}var EventEmitter=function(){this.events={},this.guid=0,this.maxListeners=EventEmitter.defaultMaxListeners};return EventEmitter.defaultMaxListeners=10,EventEmitter.prototype={on:function(eventName,listener,times,index){var namespace=getNamespace(eventName);eventName=namespace.eventName,namespace=namespace.namespace;var text,listenerCount=this.listenerCount(eventName);listenerCount>=this.maxListeners&&(text="Failed to add listener: "+(listenerCount+1)+" request listeners added. Use emitter.setMaxListeners() to increase limit.",console&&console.warn&&console.warn(text)),isArray(this.events[eventName])||(this.events[eventName]=[]);var handler={namespace:namespace,uid:++this.guid,times:isNumeric(times)&&0!=times?parseInt(times):-1,listener:listener};return isNumeric(index)?this.events[eventName].splice(parseInt(index),0,handler):this.events[eventName].push(handler),this.emit("newListener",eventName,listener),this},once:function(eventName,listener){return this.on(eventName,listener,1)},prependListener:function(eventName,listener){return this.on(eventName,listener,-1,0)},prependOnceListener:function(eventName,listener){return this.on(eventName,listener,1,0)},removeListener:function(eventName,listener){var namespace=getNamespace(eventName);eventName=namespace.eventName,namespace=namespace.namespace;var list=this.events[eventName];if(isArray(list))if(listener||namespace)for(var item,i=list.length-1;0<=i;i--)listener!==(item=list[i]).listener&&namespace!==item.namespace&&namespace!=="listenerGuid"+item.uid||list.splice(i,1);else list=[];return list&&list[0]||delete this.events[eventName],this},removeAllListeners:function(eventNames){isArray(eventNames)||(eventNames=this.eventNames());for(var i=0,len=eventNames.length;i<len;i++)this.removeListener(eventNames[i])},emit:function(eventName){var namespace=getNamespace(eventName);if(eventName=namespace.eventName,namespace=namespace.namespace,isArray(this.events[eventName]))for(var item,params=[].slice.call(arguments,1),list=this.events[eventName],i=0,len=list.length;i<len;i++)item=list[i],null!==namespace&&namespace!==item.namespace||(item.listener.apply(this,params),1===item.times?(this.removeListener(eventName+".listenerGuid"+item.uid),i--,len--):1<item.times&&item.times--);return this},listenerCount:function(eventName){return isArray(this.events[eventName])?this.events[eventName].length:0},getMaxListeners:function(){return this.maxListeners},setMaxListeners:function(n){return isNumeric(n)&&(this.maxListeners=parseInt(n)),this},eventNames:function(){var i,names=[];for(i in this.events)this.events.hasOwnProperty(i)&&names.push(i);return names},listeners:function(eventName){var listeners=[];if(isArray(this.events[eventName]))for(var list=this.events[eventName],i=0,len=list.length;i<len;i++)listeners.push(list[i].listener);return listeners}},EventEmitter.prototype.addListener=EventEmitter.prototype.on,EventEmitter});