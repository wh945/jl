/**
 * Created by wenhong on 2016/12/13.
 */
var sc = document.getElementsByClassName('swiper-container')[0];
var sw = sc.getElementsByClassName('swiper-wrapper')[0];
var slide3 = sw.getElementsByClassName('slide3')[0];
var bbb = slide3.getElementsByClassName('bbb')[0];
var imgs = bbb.getElementsByTagName('img');

(function () {
    for (var i=0;i<imgs.length;i++){
        (function (i) {
            var curImg = imgs[i];
            if (i==0){
                utils.css(curImg,'zIndex',1);
                animate(curImg,{opacity:1},500);
                utils.css(curImg,'display','block');
            }
        })(i);
    }
})();
var timer=window.setInterval(autoMove,3000);
var step=0;
function autoMove(){
    step++;
    if(step==imgs.length){
        step=0;
    }
    setImg();
}
function setImg(){
    for(var i= 0;i<imgs.length;i++){
        var curImg=imgs[i];
        if(i==step){
            utils.css(curImg,'display','block');
            utils.css(curImg,"zIndex",1);
            var siblings=utils.siblings(curImg);
            for(var j=0;j<siblings.length;j++){
                utils.css(siblings[j],'display','none');
            }
            animate(curImg,{opacity:1},300,function(){

            }  );
        }else{
            utils.css(curImg,"zIndex",0);
        }
    }
}
