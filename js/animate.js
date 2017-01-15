(function(){
    //callback:回调函数，当运动到达终点之后，要执行的函数
    function animate(ele,target,duration,animateEffect,callback){
        //如果把所有的形参全部封装到一个对象里，
        // 然后使用的时候直接通过对象的属性来获取，那么这样就不会有参数的顺序问题，那么在调用函数传实参的时候所有的属性名字必须写对。为了防止写错，那么在代码需要用或者||写一个默认值
        duration=duration||2000;
        var interval=10;
        var time=0;
        var begin={};
        var change={};
        var effect={
            Linear:function(t,b,c,d){
                return b+t/d*c;
            }
        };//这个对象里面就是动画效果
        //var defaultEffect=zhufengEffect.Linear;
        if(typeof animateEffect=='number'){
            switch (animateEffect){
                case 1:defaultEffect=zhufengEffect.Back.easeInOut;
                    break;
                case 2:defaultEffect=zhufengEffect.Bounce.easeInOut;
                    break;
            }
        }else if(animateEffect instanceof Array){
            defaultEffect=zhufengEffect[animateEffect[0]][animateEffect[1]];
        }else if(typeof animateEffect=="function"){
           callback=animateEffect;
        }
        for(var key in target){
            begin[key]=utils.css(ele,key);
            change[key]=target[key]-begin[key];
        }
        //ele.timer&&window.clearInterval(ele.timer);//前面条件成立的时候执行后面的代码
        if(ele.timer){
            window.clearInterval(ele.timer);
        }
        ele.timer=window.setInterval(function(){
            time+=interval;
            if(time>=duration){
                window.clearInterval(ele.timer);
                utils.css(ele,target);
                if(typeof callback=='function'){
                    callback.call(ele);//callback函数中的this是window
                    //把回调函数中的this修改成运动的那个元素（ele）
                }
                return;
            }
            for(var key in change){
                if(change[key]){
                    var val=effect.Linear(time,begin[key],change[key],duration);
                    utils.css(ele,key,val);
                }
            }
        },interval)
    }
    window.animate=animate;//把这个私有函数animate添加到window的animate属性上，这是主动暴露接口
})();
