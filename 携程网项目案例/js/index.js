window.addEventListener('load',function () {
    //获取元素
    var ofocus = document.querySelector('.focus');
    var oul = ofocus.children[0];
    var ol = ofocus.children[1];
    //获取ofocus 的宽度
    var w = ofocus.offsetWidth;

    //2 利用多少秒定时器轮播
    var index = 0;
    var timer = setInterval(function () {
         index++;
         var translatex = -index *w;
            oul.style.transition = 'all .2s';
            oul.style.transform = 'translateX('+translatex+'px)';
    },2000);
    //等着我们过度完成之后,再去判断
    oul.addEventListener('transitionend',function () {
        if(index >=3){

            index =0;
            //去掉过度效果,迅速回到第一张
            oul.style.transition = 'none';
            var translatex = -index *w;
            oul.style.transform = 'translateX('+translatex+'px)';
        }else if(index <0){
            index = 2;
            //去掉过度效果,迅速回到第一张
            oul.style.transition = 'none';
            var translatex = -index *w;
            oul.style.transform = 'translateX('+translatex+'px)';
        }

        // 3.小圆点跟随变化
        ol.querySelector('.current').classList.remove('current')

        ol.children[index].classList.add('current');
    });

    // 4.手指移动
    //touchstart      获取手指的初始坐标.同时获取盒子的原来位置
    //touchmove    计算手指的滑动距离,并且移动盒子
    //touchend
    var startX = 0;  //获取手指的初始坐标
    var flag=false;

    oul.addEventListener('touchstart',function (e){
        startX = e.targetTouches[0].pageX;
        //手指触摸的时候就停止定时器
        clearInterval(timer);
    });
    //移动手指 touchmove :计算手指的滑动距离,并且移动盒子
   oul.addEventListener('touchmove',function (e) {
        //计算移动距离
        moveX = e.targetTouches[0].pageX -startX;
        //移动盒子: 盒子原来的位置+手指移动的距离
        var translatex =  -index*w +moveX;
        //手指拖动不需要动画效果,因此要去掉
        oul.transition = 'none';
        oul.style.transform = 'translateX('+translatex+'px)';
        flag =true;  //如果用户触摸就是true
        e.preventDefault();
    });


   //
   oul.addEventListener('touchend',function (e) {
      if(flag){
          //如果移动距离大于50像素我们就播放上一张或者下一张
          if(Math.abs(moveX)>50){
              //如果是右滑就是 播放上一张 movex是正值
              if(moveX >0){
                  index--;

              }else{
                  //如果是左滑就是 播放上一张 movex是正值
                  index++;
              }

              var translatex = -index *w;
              oul.style.transition = 'all .3s';
              oul.style.transform = 'translateX('+translatex+'px)';

          }else {
              //(2)如果移动距离小于50像素我们就回弹
              var translatex = -index *w;
              oul.style.transition = 'all 1s';
              oul.style.transform = 'translateX('+translatex+'px)';

          }
      }
       //手指离开就重新开启定时器
       clearInterval(timer);
       timer = setInterval(function () {
           index++;
           var translatex = -index *w;
           oul.style.transition = 'all .2s';
           oul.style.transform = 'translateX('+translatex+'px)';
       },2000);
   });


   //返回顶部模块
   var goBack =document.querySelector('.goback');
   window.addEventListener("scroll", function () {
       //console.log(window.pageYOffset);
       if(window.pageYOffset>=110){
           goBack.style.display = 'block';

       }else {
           goBack.style.display = 'none';
       }

   });
    goBack.addEventListener("click", function () {
        window.scroll(0,0);


    })


});