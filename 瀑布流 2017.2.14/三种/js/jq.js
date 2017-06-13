$(window).on('load', function () {
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    waterfall();
        $(window).on('scroll', function () {
            if(chekScrollSlide()){
                $.each(dataInt.data,function(key,value){
                    var $obox=$('<div>').addClass('box').appendTo('#main');
                    var $pic=$('<div>').addClass('pic').appendTo($obox);
                    $('<img>').attr('src','images/'+$(value).attr('src')).appendTo($pic);



                waterfall();
                })
                
            }
            // console.log(chekScrollSlide());

        });
});
function waterfall() {
    var oParent=$('#main');
    var boxs =$('.box');
    var boxW =boxs.eq(0).outerWidth();
    //console.log(boxW);
    var cols= Math.floor($(window).width()/boxW);
    oParent.width(boxW*cols).css('margin','0 auto');
    var Arr=[];
    $(boxs).each(function (index, element) {
        // element == this
        var h=boxs.eq(index).outerHeight();
        if (index<cols) {
            Arr[index]=h;
            //console.log(h);

        } else {
            var minH=Math.min.apply(null,Arr);
            var minHindex=$.inArray(minH,Arr);
            $(element).css({
                'position':'absolute',
                'top':minH+'px',
                'left':minHindex*boxW+'px'
            })
            Arr[minHindex]+=boxs.eq(index).outerHeight();

            
        }
        
    });
    console.log(Arr);
    


    
}

function chekScrollSlide() {
    var $lastBox=$('.box').last();
    var $lastBoxDis= $lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
     var scrollTop =$(window).scrollTop();
   // var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
    var documentH=$(window).height();
    console.log(screenTop);
  
        return($lastBoxDis<scrollTop+documentH)?true:false;
}
