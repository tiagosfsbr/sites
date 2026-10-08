(function(){
var c=Object.assign({lowBandwidth:true,slowConnectionTypes:['slow-2g','2g','3g'],minDownlinkMbps:1.5,respectSaveData:true,respectReducedData:true},window.VIDEO_CONFIG),n=navigator.connection||navigator.mozConnection||navigator.webkitConnection,slow=false;
if(c.lowBandwidth){
if(n){
if(c.respectSaveData&&n.saveData)slow=true;
if(c.slowConnectionTypes.indexOf(n.effectiveType)>-1)slow=true;
if(n.downlink&&n.downlink<c.minDownlinkMbps)slow=true;
}
if(c.respectReducedData&&window.matchMedia&&matchMedia('(prefers-reduced-data: reduce)').matches)slow=true;
}
window.videoLite=function(){
var v=document.getElementById('scrollVideo');
if(v){v.pause();v.removeAttribute('src');while(v.firstChild)v.removeChild(v.firstChild);v.load();v.remove()}
document.body.classList.add('scroll-video-ready','video-lite');
};
if(slow)window.videoLite();
else document.body.classList.add('scroll-video-ready');
})();
