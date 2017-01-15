(function(){
    //callback:�ص����������˶������յ�֮��Ҫִ�еĺ���
    function animate(ele,target,duration,animateEffect,callback){
        //��������е��β�ȫ����װ��һ�������
        // Ȼ��ʹ�õ�ʱ��ֱ��ͨ���������������ȡ����ô�����Ͳ����в�����˳�����⣬��ô�ڵ��ú�����ʵ�ε�ʱ�����е��������ֱ���д�ԡ�Ϊ�˷�ֹд����ô�ڴ�����Ҫ�û���||дһ��Ĭ��ֵ
        duration=duration||2000;
        var interval=10;
        var time=0;
        var begin={};
        var change={};
        var effect={
            Linear:function(t,b,c,d){
                return b+t/d*c;
            }
        };//�������������Ƕ���Ч��
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
        //ele.timer&&window.clearInterval(ele.timer);//ǰ������������ʱ��ִ�к���Ĵ���
        if(ele.timer){
            window.clearInterval(ele.timer);
        }
        ele.timer=window.setInterval(function(){
            time+=interval;
            if(time>=duration){
                window.clearInterval(ele.timer);
                utils.css(ele,target);
                if(typeof callback=='function'){
                    callback.call(ele);//callback�����е�this��window
                    //�ѻص������е�this�޸ĳ��˶����Ǹ�Ԫ�أ�ele��
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
    window.animate=animate;//�����˽�к���animate��ӵ�window��animate�����ϣ�����������¶�ӿ�
})();
