    $(function () {
        var $li = $(".circle li");//获取.circlet里面的所有li，放到$li这个变量里面
        var len = $li.length-1;
        var _index = 0;//li的索引
        var $img = $(".focus .lunbo li");//同上
        var $btn1 = $(".arrow_l");

        var $btn2 = $(".arrow_f");
        var timer = null;

        //  alert(typeof timer); timer是一个对象

        $li.hover(function(){
            $(this).addClass("current");//指向li添加样式
        },function(){
            $(this).removeClass("current");//指向li删除样式
        });

        //点击事件
        $li.click(function(){
            _index = $(this).index();
            // 获取li的下标，改变样式
            $li.eq(_index).addClass("current").siblings().removeClass("current");
            // 获取图片的下标，实现淡入淡出
            $img.eq(_index).fadeIn().siblings().fadeOut();
            play();
        });

        //封装函数
        function play(){
            //获取li的下标，改变样式
            $li.eq(_index).addClass("current").siblings().removeClass("current");
            //获取图片的下标，实现淡入淡出
            $img.eq(_index).fadeIn(500).siblings().fadeOut(500);
        }

        //两边耳朵的点击事件
        $btn2.click(function(){
            var index = $(this).index();

                _index++;
                if (_index > len) {
                    _index = 0;
                }

                play();

        });
        $btn1.click(function(){
            var index = $(this).index();

            _index--;
            if(_index < 0){
                _index = len;
            }
            play();
        });

        //定时轮播
        function auto(){
            //把定时器放进timer这个对象里面
            timer = setInterval(function(){
                _index++;
                if(_index > len){
                    _index = 0;
                }
                play();
            },2000);
        }
        auto();

        //当我移上d_main的时候停止轮播
        $(".focus").hover(function(){
            clearInterval(timer);
        },function(){
            //移开重新调用播放
            auto();
        });
        //当我移上两边耳朵的时候停止轮播
        $(".arrow_l .arrow_f").hover(function(){
            clearInterval(timer);
        },function(){
            //移开重新调用播放
            auto();
        });


      //  console.log (document.window.scrollTop);
        /*固定导航*/
        $(window).scroll(function () {
          //console.log($(window).scrollTop());
           var oll = $(window).scrollTop();
           if (oll<=45){
               $(".daohang").addClass("current").siblings().removeClass("current");
           }else if(oll>=45&&oll<=493){
               $(".lunbo").addClass("current").siblings().removeClass("current");
           }else if(oll>=493&&oll<=643){
               $(".tuijian").addClass("current").siblings().removeClass("current");
           }else if(oll>=643&&oll<=1039) {
               $(".dianqi").addClass("current").siblings().removeClass("current");
           }else if(oll>=1039&&oll<=1388) {
               $(".shouji").addClass("current").siblings().removeClass("current");
           }else {
               $(".lianxi").addClass("current").siblings().removeClass("current");
           }

        });

    });
