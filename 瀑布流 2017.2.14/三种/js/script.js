/* 
 * @Author: anchen
 * @Date:   2017-02-14 18:58:45
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-02-14 19:04:00
 */

window.onload = function () {
        //var dataInt ={"data":[{"src":"9.jpg"},{"src":"2.jpg"},{"src":"1.jpg"}]};
        var dataInt = {
                'data': [{
                        'src': '1.jpg'
                }, {
                        'src': '2.jpg'
                }, {
                        'src': '3.jpg'
                }, {
                        'src': '4.jpg'
                }]
        };
        waterfall('main', 'box');
        window.onscroll = function () {
                console.log(checkScrollSlide());
                if (checkScrollSlide()) {
                        //解析Json数据
                        // var onParent= document.getElementById('main');
                        // for(var i=0;i<dataInt.length;i++){
                        //         var oBox=document.createElement('div');
                        //         oBox.className="box";
                        //         onParent.appendChild(oBox);
                        //         var oPic=document.createElement('div');
                        //         oPic.className='Pic';
                        //         oBox.appendChild(oPic);
                        //         var oImg=document.createElement('img');
                        //         oImg.src="./images/"+dataInt.data[i].src;
                        //         // console.log(dataInt.data[i].src)
                        //         oPic.appendChild(oImg);


                        // }

                        //   var oParent=document.getElementById('main');
                        var oParent = document.getElementById("main");
                        for (var i = 0; i < dataInt.data.length; i++) {

                                var oBox = document.createElement('div');
                                //  var oPin=document.createElement('div'); 
                                oBox.className = 'box';
                                oParent.appendChild(oBox);
                                var oPic = document.createElement('div');
                                oPic.className = 'pic';
                                oBox.appendChild(oPic);
                                var oImg = document.createElement('img');
                                oImg.src = "images/" + dataInt.data[i].src;
                                
                                console.log(oPic);
                                oPic.appendChild(oImg);

                        }
                       waterfall('main', 'box');


                };
                // checkScrollSlide();
        }
}

function waterfall(parent, box) {
        //将main下的所有class为box的元素取出来
        var onParent = document.getElementById(parent);
        var oBoxs = getClass(onParent, box);
        //console.log(oBoxs.length);
        //计算整个页面的列数（页面宽/box的款）;
        var oBoxW = oBoxs[0].offsetWidth; //获取属性的宽包含padding但是不包含margin
        //floor 向下取整，document.documentElement.clientWidth
        var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
        //设置main宽
        onParent.style.cssText = "width:" + oBoxs * cols + "px;margin: 0 auto";
        var hArr = []; //存放每一列的高度的数组
        for (var i = 0; i < oBoxs.length; i++) {
                if (i < cols) {
                        hArr.push(oBoxs[i].offsetHeight);

                } else {
                        var minH = Math.min.apply(null, hArr);
                        //console.log(minH);
                        var index = getMinHIdenx(hArr, minH); //最小的位置
                        oBoxs[i].style.position = "absolute";
                        oBoxs[i].style.top = minH + "px";
                        // oBoxs[i].style.left = oBoxW * index + "px";
                        oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
                        hArr[index] += oBoxs[i].offsetHeight;
                }

        }
        //  console.log(hArr);
}
///这里可以用document.getelementsByClassName() 但是在IE中不是很友好
//根据class 获取元素
function getClass(parent, className) {
        var boxarr = new Array();
        var oElements = document.getElementsByTagName("*");
        for (var i = 0; i < oElements.length; i++) {
                if (oElements[i].className == className) {
                        boxarr.push(oElements[i]);

                }

        }
        return boxarr;
}


function getMinHIdenx(arr, val) {
        for (var i in arr) {
                if (arr[i] == val) {
                        return i;

                }
        }

}

//判断是否加载
function checkScrollSlide() {
        var onParent = document.getElementById('main');
        var oBoxs = getClass(onParent, 'box');
        var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop+ Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
       // var scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //滚动距离
          va 
        var documentheight = document.body.clientHeight || document.documentElement.clientHeight; //求显示器可视距离
        console.log(scrollTop+documentheight);
       // console.log(lastBoxH);
        return (lastBoxH <scrollTop + documentheight) ? true : false;


}