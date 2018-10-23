$(function(){
	//顶上的小三角效果
$('.main-right .jiuxian').mouseenter(function(){
	$(this).find('.myjiu').css({'transform':'rotate(180deg)','margin-left':'0px','margin-top':'10px'});
	$(this).find('.jiuxiantop').css({'background':'#fff'});
	$(this).find('.mydropdowm').show();
});

//小三角下滑部分
$('.main-right .jiuxian').mouseleave(function(){
	$(this).find('.myjiu').css({'transform':'rotate(0deg)','margin-left':'5px','margin-top':'2px'});
	$(this).find('.jiuxiantop').css({'background':'#f2f2f2'});
	$(this).find('.mydropdowm').hide();
});

//左侧导航
$('.div3 .left-menu').mouseenter(function(){
	$(this).css({'background':'#eee'});
	//$(this).find('span').css({'color':'#b61d1d'});
	//$('.div3 li').not($(this)).css({'background':'#b61d1d'});
	$(this).find('.right').show();
	$('.right').not($(this).find('.right')).hide();
});

$('.div3 .left-menu').mouseleave(function () {
    $(this).find('.right').hide();
    $(this).css({'background':'#fff'});
    //$(this).find('span').css({'color':'#fff'});
});

//幻灯片设计
(function(){
	
//第一步
$(".navppt .paging").show();
$(".navppt .paging a:first").addClass("active");
//幻灯片右侧随机出现3个广告
var num=$('.navppt .paging a:first').attr('rel');//得到rel标签的值1,2,3,
var arr=[1,2,3,4,5,6,7,8,9];             //一共9张广告图片
var imgs=arr.slice((num-1)*3,num*3);     //截取3张广告图片
for(var i=0;i<imgs.length;i++){               
	$('.'+imgs[i]).show();           //显示3张图片
}
//get size of the image, how many images there are, then determin the size of the image reel.
var imageWidth = $(".navppt .window").width();
var imageSum = $(".navppt .image_reel img").size();
var imageReelWidth = imageWidth * imageSum;

//adjust the image reel to its new size
$(".navppt .image_reel").css({'width':imageReelWidth});

//第二步
//paging and slider function
var rotate = function(end){
	if(end){
		var triggerID = imageSum - 1;//get number of times to slide
		var image_reelPosition = triggerID * imageWidth; //determines the distance the image reel needs to slide
		$(".navppt .paging a").removeClass('active');//remove all active class
		$active.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".navppt .image_reel").animate({
			left: -image_reelPosition}, 1000,function(){
				$(this).css({'left':'0px'});
		});
     }else{
     	var triggerID = $active.attr("rel") - 1;//get number of times to slide
     	var image_reelPosition = triggerID * imageWidth;//determines the distance the image reel needs to slide
     	$(".navppt .paging a").removeClass('active');//remove all active class
		$active.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".navppt .image_reel").animate({
			left: -image_reelPosition
			}, 1000);
     }
     
    var act=$('.navppt .paging a.active').attr('rel');
    var imgs=arr.slice((act-1)*3,act*3);          //截取3张广告图片
    for(i=0;i<imgs.length;i++){
	    $('.'+imgs[i]).show();
    }
     
};



//rotation and timing event
var rotateSwitch = function(){
	play = setInterval(function(){  //set timer - this will repeat itself every 7 seconds
		
		$('.navppt .img').hide();//清除右边的3个广告
		
		$active = $('.navppt .paging a.active').next();//move to the next paging
		var rel=$('.navppt .paging a.active').attr('rel');
		//document.title=rel;
		if(rel==3){  //if paging reaches the end...
			$active = $('.navppt .paging a:first');//go back to the first
			var end=true;
		}else{
			var end=false;
		}
		rotate(end);//trigger the paging and alider function
	},2000); //timer speed in milliseconds (7 seconds)
};
rotateSwitch();

//第三步
//on hover
$(".navppt .image_reel a").hover(function(){
	clearInterval(play);//stop the rotation
},function(){
	rotateSwitch();//resume rotation timer
});

//on click
$(".navppt .paging a").click(function(){
	$('.navppt .img').hide();//清除右边的3个广告
	$active = $(this);//activate the clicked paging
	var act=$(this).attr('rel');
    var imgs=arr.slice((act-1)*3,act*3);          //截取3张广告图片
    for(i=0;i<imgs.length;i++){
	    $('.'+imgs[i]).show();
    }
	//reset timer
	clearInterval(play); //stop the rotation
	rotate(false);       //trigger rotation immediately
	rotateSwitch();      //resume rotation timer
	return false;        //prevent browser jump to link anchor
});
	
})();


    //知识点：方便用于调试的方法
    // console.log({'name':'user1','age':'123'});
    // console.log([1,2,3,4]);
       
       
//标签特卖广场
    $('.indexTabBoxBottom .indexTabCon').first().show();//第一个显示
	$('.indexTabBoxTop ul li').mouseenter(function(){
			$(this).addClass('active');//当鼠标移入时，给当前目标添加active标签
			$('.indexTabBoxTop ul li').not($(this)).removeClass('active');//其余的目标移除active标签
		    idx=$(this).index('.indexTabBoxTop ul li');//判断鼠标当前划中的li是当前ul下的所有li的第几个li
		    $('.indexTabBoxBottom .indexTabCon').eq(idx).show();//显示当前判断的li下的内容
		    $('.indexTabBoxBottom .indexTabCon').not($('.indexTabBoxBottom .indexTabCon').eq(idx)).hide();//除了当前下的li其余的li都隐藏
	});
		
	$('.indexTabRight .indexTabNewCon').first().show();
	$('.indexTabRight .indexTabNewNav ul li').mouseenter(function(){
			$(this).addClass('active');//当鼠标移入时，给当前目标添加active标签
			$('.indexTabRight .indexTabNewNav ul li').not($(this)).removeClass('active');//其余的目标移除active标签
		    idx=$(this).index('.indexTabRight .indexTabNewNav ul li');//判断鼠标当前划中的li是当前ul下的所有li的第几个li
		    $('.indexTabRight .indexTabNewCon').eq(idx).show();//显示当前判断的li下的内容
		    $('.indexTabRight .indexTabNewCon').not($('.indexTabRight .indexTabNewCon').eq(idx)).hide();//除了当前下的li其余的li都隐藏
	});       
       
       
// //商品特卖幻灯片设计第1个ppt
(function(){
	//幻灯片设计
//第一步
$(".indexTuanBox .paging").show();
$(".indexTuanBox .paging a:first").addClass("active");
//get size of the image, how many images there are, then determin the size of the image reel.
var imageWidth = $(".indexTuanBox .window").width();
var imageSum = $(".indexTuanBox .image_reel img").size();
var imageReelWidth = imageWidth * imageSum;

//adjust the image reel to its new size
$(".indexTuanBox .image_reel").css({'width':imageReelWidth});
//第二步
//paging and slider function
var rotate = function(end){
	if(end){
		var triggerID = imageSum - 1;//get number of times to slide
		var image_reelPosition = triggerID * imageWidth; //determines the distance the image reel needs to slide
		$(".indexTuanBox .paging a").removeClass('active');//remove all active class
		$active2.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".indexTuanBox .image_reel").animate({
			left: -image_reelPosition}, 500,function(){
				$(this).css({'left':'0px'});
		});
     }else{
     	var triggerID = $active2.attr("rel") - 1;//get number of times to slide
     	var image_reelPosition = triggerID * imageWidth;//determines the distance the image reel needs to slide
     	$(".indexTuanBox .paging a").removeClass('active');//remove all active class
		$active2.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".indexTuanBox .image_reel").animate({
			left: -image_reelPosition
			}, 500);
     }    
};
//rotation and timing event
var rotateSwitch = function(){
	play2 = setInterval(function(){  //set timer - this will repeat itself every 7 seconds
		
		$active2 = $('.indexTuanBox .paging a.active').next();//move to the next paging
		var rel=$('.indexTuanBox .paging a.active').attr('rel');
		// document.title=rel;
		if(rel==3){  //if paging reaches the end...
			$active2 = $('.indexTuanBox .paging a:first');//go back to the first
			var end=true;
		}else{
			var end=false;
		}
		rotate(end);//trigger the paging and alider function
	},2000); //timer speed in milliseconds (7 seconds)
};
rotateSwitch();
//第三步
//on hover
$(".indexTuanBox .image_reel a").hover(function(){
	clearInterval(play2);//stop the rotation
},function(){
	rotateSwitch();//resume rotation timer
});

//on click
$(".indexTuanBox .paging a").click(function(){
	
	$active2 = $(this);//activate the clicked paging
	//reset timer
	clearInterval(play2); //stop the rotation
	rotate(false);       //trigger rotation immediately
	rotateSwitch();      //resume rotation timer
	return false;        //prevent browser jump to link anchor
});
})();


// //商品特卖幻灯片设计第2个ppt
(function(){
//幻灯片设计
//第一步
$(".indexAdFocus .paging").show();
$(".indexAdFocus .paging a:first").addClass("active");
//get size of the image, how many images there are, then determin the size of the image reel.
var imageWidth = $(".indexAdFocus .window").width();
var imageSum = $(".indexAdFocus .image_reel img").size();
var imageReelWidth = imageWidth * imageSum;

//adjust the image reel to its new size
$(".indexAdFocus .image_reel").css({'width':imageReelWidth});
//第二步
//paging and slider function
var rotate = function(end){
	if(end){
		var triggerID = imageSum - 1;//get number of times to slide
		var image_reelPosition = triggerID * imageWidth; //determines the distance the image reel needs to slide
		$(".indexAdFocus .paging a").removeClass('active');//remove all active class
		$active3.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".indexAdFocus .image_reel").animate({
			left: -image_reelPosition}, 500,function(){
				$(this).css({'left':'0px'});
		});
     }else{
     	var triggerID = $active3.attr("rel") - 1;//get number of times to slide
     	var image_reelPosition = triggerID * imageWidth;//determines the distance the image reel needs to slide
     	$(".indexAdFocus .paging a").removeClass('active');//remove all active class
		$active3.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".indexAdFocus .image_reel").animate({
			left: -image_reelPosition
			}, 500);
     }    
};
//rotation and timing event
var rotateSwitch = function(){
	play3 = setInterval(function(){  //set timer - this will repeat itself every 7 seconds
		
		$active3 = $('.indexAdFocus .paging a.active').next();//move to the next paging
		var rel=$('.indexAdFocus .paging a.active').attr('rel');
		// document.title=rel;
		if(rel==3){  //if paging reaches the end...
			$active3 = $('.indexAdFocus .paging a:first');//go back to the first
			var end=true;
		}else{
			var end=false;
		}
		rotate(end);//trigger the paging and alider function
	},2000); //timer speed in milliseconds (7 seconds)
};
rotateSwitch();
//第三步
//on hover
$(".indexAdFocus .image_reel a").hover(function(){
	clearInterval(play3);//stop the rotation
},function(){
	rotateSwitch();//resume rotation timer
});

//on click
$(".indexAdFocus .paging a").click(function(){
	$active3 = $(this);//activate the clicked paging
	//reset timer
	clearInterval(play3); //stop the rotation
	rotate(false);       //trigger rotation immediately
	rotateSwitch();      //resume rotation timer
	return false;        //prevent browser jump to link anchor
});

})();


//优惠推荐下方的滚动效果
s=0;
v=-1200;
//控制指示灯
function setLight(){
	n=s/v;
	$('.indexRaceBox .titleBox .rightMNavBox span').eq(n).addClass('active');
	$('.indexRaceBox .titleBox .rightMNavBox span').not($('.indexRaceBox .titleBox .rightMNavBox span').eq(n)).removeClass('active');
}
$('.raceRight').click(function(){
	s+=v;
	if(s<=-2400){
		s=-2400;
	}
	//设置指示灯
	setLight();
	// $('.raceBox').css({'left':'-1200px'});
	$('.raceBox').stop().animate({
		'left':s+'px'
	},500);
});

$('.raceLeft').click(function(){
	s-=v;
	if(s>=0){
		s=0;
	}
	//设置指示灯
	setLight();
	// $('.raceBox').css({'left':'-1200px'});
	$('.raceBox').stop().animate({
		'left':s+'px'
	},500);
});

//优惠推荐右面的三个小方块
$('.indexRaceBox .titleBox .rightMNavBox span').click(function(){
	$(this).addClass('active');
	$('.indexRaceBox .titleBox .rightMNavBox span').not($(this)).removeClass('active');
    
    idx=$(this).index('.indexRaceBox .titleBox .rightMNavBox span');
    s=idx*v;
    $('.raceBox').stop().animate({
		'left':s+'px'
	},500);
});

////////优惠推荐秒表
    	(function start(){
    		setInterval (function(){
    			var now = new Date();
    			var end = new Date(now.getYear()+1900,12-1,11);  //特价时间需要手动修改
    			var time = end.getTime()-now.getTime();
    			var str = getTimeTxt(time);
    			var i = 1;
    			for (var i=1; i <=18; i++) {
				  document.getElementById('temaishijian'+i).innerHTML='剩余：'+ str;
				};
    		},1000);
    	})();
    	function getTimeTxt(time){
    		time /=1000;
    		var days = time/(24*60*60);
    		var hour =time%(24*60*60)/(60*60);
    		var min = time%(24*60*60)%(60*60)/60;
    		var sec = time%(24*60*60)%(60*60)%60;
    		var str ='';
    		if(days>0)
    		str+=Math.floor(days)+"天";
    		if(hour>0)
    		str+=Math.floor(hour)+"时";
    		if(min>0)
    		str+=Math.floor(min)+"分";
    		str +=Math.floor(sec)+'秒';
    		return str;
    	}

// 白酒馆的左侧ppt
(function(){
//幻灯片设计
//第一步
$(".whiteWineJS .paging").show();
$(".whiteWineJS .paging a:first").addClass("active");
//get size of the image, how many images there are, then determin the size of the image reel.
var imageWidth = $(".whiteWineJS .window").width();
var imageSum = $(".whiteWineJS .image_reel img").size();
var imageReelWidth = imageWidth * imageSum;

//adjust the image reel to its new size
$(".whiteWine .image_reel").css({'width':imageReelWidth});
//第二步
//paging and slider function
var rotate = function(end){
	if(end){
		var triggerID = imageSum - 1;//get number of times to slide
		var image_reelPosition = triggerID * imageWidth; //determines the distance the image reel needs to slide
		$(".whiteWineJS .paging a").removeClass('active');//remove all active class
		$active4.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".whiteWineJS .image_reel").animate({
			left: -image_reelPosition}, 500,function(){
				$(this).css({'left':'0px'});
		});
     }else{
     	var triggerID = $active4.attr("rel") - 1;//get number of times to slide
     	var image_reelPosition = triggerID * imageWidth;//determines the distance the image reel needs to slide
     	$(".whiteWineJS .paging a").removeClass('active');//remove all active class
		$active4.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".whiteWineJS .image_reel").animate({
			left: -image_reelPosition
			}, 500);
     }    
};
//rotation and timing event
var rotateSwitch = function(){
	play4 = setInterval(function(){  //set timer - this will repeat itself every 7 seconds
		
		$active4 = $('.whiteWineJS .paging a.active').next();//move to the next paging
		var rel=$('.whiteWineJS .paging a.active').attr('rel');
		// document.title=rel;
		if(rel==3){  //if paging reaches the end...
			$active4 = $('.whiteWineJS .paging a:first');//go back to the first
			var end=true;
		}else{
			var end=false;
		}
		rotate(end);//trigger the paging and alider function
	},2000); //timer speed in milliseconds (7 seconds)
};
rotateSwitch();
//第三步
//on hover
$(".whiteWineJS .image_reel a").hover(function(){
	clearInterval(play4);//stop the rotation
},function(){
	rotateSwitch();//resume rotation timer
});

//on click
$(".whiteWineJS .paging a").click(function(){
	
	$active4 = $(this);//activate the clicked paging
	//reset timer
	clearInterval(play4); //stop the rotation
	rotate(false);       //trigger rotation immediately
	rotateSwitch();      //resume rotation timer
	return false;        //prevent browser jump to link anchor
});
})();   

//本周热销商品
    $('.whiteWine .topTenWrap .bottom .topTenCon').first().show();//第一个显示
	$('.topTenWrap .topTenBox .top .right ul li').mouseenter(function(){
			$(this).addClass('active');//当鼠标移入时，给当前目标添加active标签
			$('.topTenWrap .topTenBox .top .right ul li').not($(this)).removeClass('active');//其余的目标移除active标签
		    idxstar=$(this).index('.topTenWrap .topTenBox .top .right ul li');//判断鼠标当前划中的li是当前ul下的所有li的第几个li
		    $('.whiteWine .topTenWrap .bottom .topTenCon').eq(idxstar).show();//显示当前判断的li下的内容
		    $('.whiteWine .topTenWrap .bottom .topTenCon').not($('.whiteWine .topTenWrap .bottom .topTenCon').eq(idxstar)).hide();//除了当前下的li其余的li都隐藏
	});
		
//葡萄酒馆ppt
(function(){
//幻灯片设计
//第一步
$(".redWineJS .paging").show();
$(".redWineJS .paging a:first").addClass("active");
//get size of the image, how many images there are, then determin the size of the image reel.
var imageWidth = $(".redWineJS .window").width();
var imageSum = $(".redWineJS .image_reel img").size();
var imageReelWidth = imageWidth * imageSum;

//adjust the image reel to its new size
$(".redWineJS .image_reel").css({'width':imageReelWidth});
//第二步
//paging and slider function
var rotate = function(end){
	if(end){
		var triggerID = imageSum - 1;//get number of times to slide
		var image_reelPosition = triggerID * imageWidth; //determines the distance the image reel needs to slide
		$(".redWineJS .paging a").removeClass('active');//remove all active class
		$active5.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".redWineJS .image_reel").animate({
			left: -image_reelPosition}, 500,function(){
				$(this).css({'left':'0px'});
		});
     }else{
     	var triggerID = $active4.attr("rel") - 1;//get number of times to slide
     	var image_reelPosition = triggerID * imageWidth;//determines the distance the image reel needs to slide
     	$(".redWineJS .paging a").removeClass('active');//remove all active class
		$active5.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".redWineJS .image_reel").animate({
			left: -image_reelPosition
			}, 500);
     }    
};
//rotation and timing event
var rotateSwitch = function(){
	play5 = setInterval(function(){  //set timer - this will repeat itself every 7 seconds
		
		$active5 = $('.redWineJS .paging a.active').next();//move to the next paging
		var rel=$('.redWineJS .paging a.active').attr('rel');
		// document.title=rel;
		if(rel==3){  //if paging reaches the end...
			$active5 = $('.redWineJS .paging a:first');//go back to the first
			var end=true;
		}else{
			var end=false;
		}
		rotate(end);//trigger the paging and alider function
	},2000); //timer speed in milliseconds (7 seconds)
};
rotateSwitch();
//第三步
//on hover
$(".redWineJS .image_reel a").hover(function(){
	clearInterval(play5);//stop the rotation
},function(){
	rotateSwitch();//resume rotation timer
});

//on click
$(".redWineJS .paging a").click(function(){
	
	$active5 = $(this);//activate the clicked paging
	//reset timer
	clearInterval(play5); //stop the rotation
	rotate(false);       //trigger rotation immediately
	rotateSwitch();      //resume rotation timer
	return false;        //prevent browser jump to link anchor
});
})();   

//洋酒馆ppt
(function(){
//幻灯片设计
//第一步
$(".foreignWineJS .paging").show();
$(".foreignWineJS .paging a:first").addClass("active");
//get size of the image, how many images there are, then determin the size of the image reel.
var imageWidth = $(".foreignWineJS .window").width();
var imageSum = $(".foreignWineJS .image_reel img").size();
var imageReelWidth = imageWidth * imageSum;

//adjust the image reel to its new size
$(".foreignWineJS .image_reel").css({'width':imageReelWidth});
//第二步
//paging and slider function
var rotate = function(end){
	if(end){
		var triggerID = imageSum - 1;//get number of times to slide
		var image_reelPosition = triggerID * imageWidth; //determines the distance the image reel needs to slide
		$(".foreignWineJS .paging a").removeClass('active');//remove all active class
		$active6.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".foreignWineJS .image_reel").animate({
			left: -image_reelPosition}, 500,function(){
				$(this).css({'left':'0px'});
		});
     }else{
     	var triggerID = $active4.attr("rel") - 1;//get number of times to slide
     	var image_reelPosition = triggerID * imageWidth;//determines the distance the image reel needs to slide
     	$(".foreignWineJS .paging a").removeClass('active');//remove all active class
		$active6.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".foreignWineJS .image_reel").animate({
			left: -image_reelPosition
			}, 500);
     }    
};
//rotation and timing event
var rotateSwitch = function(){
	play6 = setInterval(function(){  //set timer - this will repeat itself every 7 seconds
		
		$active6 = $('.foreignWineJS .paging a.active').next();//move to the next paging
		var rel=$('.foreignWineJS .paging a.active').attr('rel');
		// document.title=rel;
		if(rel==3){  //if paging reaches the end...
			$active6 = $('.foreignWineJS .paging a:first');//go back to the first
			var end=true;
		}else{
			var end=false;
		}
		rotate(end);//trigger the paging and alider function
	},2000); //timer speed in milliseconds (7 seconds)
};
rotateSwitch();
//第三步
//on hover
$(".foreignWineJS .image_reel a").hover(function(){
	clearInterval(play6);//stop the rotation
},function(){
	rotateSwitch();//resume rotation timer
});

//on click
$(".foreignWineJS .paging a").click(function(){
	
	$active6 = $(this);//activate the clicked paging
	//reset timer
	clearInterval(play6); //stop the rotation
	rotate(false);       //trigger rotation immediately
	rotateSwitch();      //resume rotation timer
	return false;        //prevent browser jump to link anchor
});
})();   

//养生酒馆ppt
(function(){
//幻灯片设计
//第一步
$(".healthWineJS .paging").show();
$(".healthWineJS .paging a:first").addClass("active");
//get size of the image, how many images there are, then determin the size of the image reel.
var imageWidth = $(".healthWineJS .window").width();
var imageSum = $(".healthWineJS .image_reel img").size();
var imageReelWidth = imageWidth * imageSum;

//adjust the image reel to its new size
$(".healthWineJS .image_reel").css({'width':imageReelWidth});
//第二步
//paging and slider function
var rotate = function(end){
	if(end){
		var triggerID = imageSum - 1;//get number of times to slide
		var image_reelPosition = triggerID * imageWidth; //determines the distance the image reel needs to slide
		$(".healthWineJS .paging a").removeClass('active');//remove all active class
		$active7.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".healthWineJS .image_reel").animate({
			left: -image_reelPosition}, 500,function(){
				$(this).css({'left':'0px'});
		});
     }else{
     	var triggerID = $active4.attr("rel") - 1;//get number of times to slide
     	var image_reelPosition = triggerID * imageWidth;//determines the distance the image reel needs to slide
     	$(".healthWineJS .paging a").removeClass('active');//remove all active class
		$active7.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".healthWineJS .image_reel").animate({
			left: -image_reelPosition
			}, 500);
     }    
};
//rotation and timing event
var rotateSwitch = function(){
	play7 = setInterval(function(){  //set timer - this will repeat itself every 7 seconds
		
		$active7 = $('.healthWineJS .paging a.active').next();//move to the next paging
		var rel=$('.healthWineJS .paging a.active').attr('rel');
		// document.title=rel;
		if(rel==3){  //if paging reaches the end...
			$active7 = $('.healthWineJS .paging a:first');//go back to the first
			var end=true;
		}else{
			var end=false;
		}
		rotate(end);//trigger the paging and alider function
	},2000); //timer speed in milliseconds (7 seconds)
};
rotateSwitch();
//第三步
//on hover
$(".healthWineJS .image_reel a").hover(function(){
	clearInterval(play7);//stop the rotation
},function(){
	rotateSwitch();//resume rotation timer
});

//on click
$(".healthWineJS .paging a").click(function(){
	
	$active7 = $(this);//activate the clicked paging
	//reset timer
	clearInterval(play7); //stop the rotation
	rotate(false);       //trigger rotation immediately
	rotateSwitch();      //resume rotation timer
	return false;        //prevent browser jump to link anchor
});
})(); 

//食品和酒ppt
(function(){
//幻灯片设计
//第一步
$(".foodAndWineJS .paging").show();
$(".foodAndWineJS .paging a:first").addClass("active");
//get size of the image, how many images there are, then determin the size of the image reel.
var imageWidth = $(".foodAndWineJS .window").width();
var imageSum = $(".foodAndWineJS .image_reel img").size();
var imageReelWidth = imageWidth * imageSum;

//adjust the image reel to its new size
$(".foodAndWineJS .image_reel").css({'width':imageReelWidth});
//第二步
//paging and slider function
var rotate = function(end){
	if(end){
		var triggerID = imageSum - 1;//get number of times to slide
		var image_reelPosition = triggerID * imageWidth; //determines the distance the image reel needs to slide
		$(".foodAndWineJS .paging a").removeClass('active');//remove all active class
		$active8.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".foodAndWineJS .image_reel").animate({
			left: -image_reelPosition}, 500,function(){
				$(this).css({'left':'0px'});
		});
     }else{
     	var triggerID = $active4.attr("rel") - 1;//get number of times to slide
     	var image_reelPosition = triggerID * imageWidth;//determines the distance the image reel needs to slide
     	$(".foodAndWineJS .paging a").removeClass('active');//remove all active class
		$active8.addClass('active');//add active class (the $action is declared in the rotateSwitch function)
		//slider animation
		$(".foodAndWineJS .image_reel").animate({
			left: -image_reelPosition
			}, 500);
     }    
};
//rotation and timing event
var rotateSwitch = function(){
	play8 = setInterval(function(){  //set timer - this will repeat itself every 7 seconds
		
		$active8 = $('.foodAndWineJS .paging a.active').next();//move to the next paging
		var rel=$('.foodAndWineJS .paging a.active').attr('rel');
		// document.title=rel;
		if(rel==3){  //if paging reaches the end...
			$active8 = $('.foodAndWineJS .paging a:first');//go back to the first
			var end=true;
		}else{
			var end=false;
		}
		rotate(end);//trigger the paging and alider function
	},2000); //timer speed in milliseconds (7 seconds)
};
rotateSwitch();
//第三步
//on hover
$(".foodAndWineJS .image_reel a").hover(function(){
	clearInterval(play8);//stop the rotation
},function(){
	rotateSwitch();//resume rotation timer
});

//on click
$(".foodAndWineJS .paging a").click(function(){
	
	$active8 = $(this);//activate the clicked paging
	//reset timer
	clearInterval(play8); //stop the rotation
	rotate(false);       //trigger rotation immediately
	rotateSwitch();      //resume rotation timer
	return false;        //prevent browser jump to link anchor
});
})(); 
//官方推荐下方的小滑块
$('.contentThree .titleBox li').mouseenter(function(){
	l=$(this).position().left;   //获取对象的距离左侧位置
	// $('.contentThree .titleSlider').css({'left':l+'px'});
	$('.contentThree .titleSlider').animate({
		'left':l+'px'
	},100);
});

//官方推荐中品牌商品图片的滑动效果
$('.contentThree .logoBox ul li img').hover(
	function(){
		$(this).stop().animate({
			'left':'-100px'
		},500);
	},
	function(){
		$(this).stop().animate({
			'left':'0px'
		},500);
	}
);

//官方推荐中的品牌图标标签效果
$('.contentThree .logoBox .slider').first().show();
$('.contentThree .titleBox li').mouseenter(function(){
	which=$(this).index('.contentThree .titleBox li');
	$('.contentThree .logoBox .slider').eq(which).show();
	$('.contentThree .logoBox .slider').not($('.contentThree .logoBox .slider').eq(which)).hide();
});

//官方推荐中的第一套图标左右控制
$('.contentThree .logoBox .controlRight').click(function(){
	$('.contentThree .logoBox .slider .one').animate({
		'left':'-1200px'
	});
});

$('.contentThree .logoBox .controlLeft').click(function(){
	$('.contentThree .logoBox .slider .one').animate({
		'left':'0px'
	},200);
});

//鼠标移到酒仙微信，出现微信二维码
$('.footer .footer-bottom p.p3 a').mouseenter(function(){
	$('.footer .footer-bottom .weixin').show();
});
//鼠标移出酒仙微信，隐藏微信二维码
$('.footer .footer-bottom p.p3 a').mouseleave(function(){
	$('.footer .footer-bottom .weixin').hide();
});

//回到顶部
sw=$(window).height();
$('.returnTop').css({'height':sw+'px'});


//整个窗口右侧的侧边导航栏
$('.rightsbc1').mouseenter(function(){
	x=$(this).position().left+35;
	y=$(this).position().top;
	// document.title=x+'-'+y; 
	$('.sidebarUser').show().css({'top':y+'px','right':x+'px'});
});
$('.rightsbc1').mouseleave(function(){ 
	$('.sidebarUser').hide();
});

//整个窗口右侧的侧边导航栏
$('.rightsbc2').mouseenter(function(){
	x=$(this).position().left+35;
	y=$(this).position().top;
	// document.title=x+'-'+y; 
	$('.sidebarUser2').show().css({'top':y+'px','right':x+'px'});
});
$('.rightsbc2').mouseleave(function(){ 
	$('.sidebarUser2').hide();
});

//窗口右侧反馈
$('.returnTop .rightSlidebarBot .fankui ').mouseenter(function(){
	$(this).find('i').css({'background-position':'3px -203px'});
	x=$(this).position().left+35;
	y=$(this).position().top;
	$(this).find('.fankui-left').show().css({'top':y+'px','right':x+'px'});
});
$('.returnTop .rightSlidebarBot .fankui ').mouseleave(function(){
	$(this).find('i').css({'background-position':'3px -186px'});
	$(this).find('.fankui-left').hide();
});
//窗口右侧微信
$('.returnTop .rightSlidebarBot .weixin ').mouseenter(function(){
	$(this).find('i').css({'background-position':'-19px -203px'});
	x=$(this).position().left+35;
	y=$(this).position().top;
	$(this).find('.weixin-left').show().css({'top':y+'px','right':x+'px'});
});
$('.returnTop .rightSlidebarBot .weixin ').mouseleave(function(){
	$(this).find('i').css({'background-position':'-19px -186px'});
	$(this).find('.weixin-left').hide();	
});
//窗口右侧返回顶部
$('.returnTop .rightSlidebarBot .rtop ').mouseenter(function(){
	$(this).find('i').css({'background-position':'-40px -203px'});
});
$('.returnTop .rightSlidebarBot .rtop ').mouseleave(function(){
	$(this).find('i').css({'background-position':'-40px -186px'});
});
//窗口右侧缓缓回到顶部
$('.returnTop .rightSlidebarBot .rtop ').click(function(){
	// $(window).scrollTop(0);
	s=$(window).scrollTop();
	v=100;
	timeobj=setInterval(function(){
		s-=v;
		if(s<=0){
			s=0;
			clearInterval(timeobj);
		}
		$(window).scrollTop(s);
	},10);
});

//左侧滚动监听

$('.leftnav .floorBack').mouseenter(function(){
	$(this).find('i').css({'background-position':'-95px -190px'});
});
$('.leftnav .floorBack').mouseleave(function(){
	$(this).find('i').css({'background-position':'-74px -190px'});
});
//左侧滚动监听缓缓回到顶部
$('.leftnav .floorBack').click(function(){
	s=$(window).scrollTop();
	v=100;
	timeobj=setInterval(function(){
		s-=v;
		if(s<=0){
			s=0;
			clearInterval(timeobj);
			$('.leftnav').hide();
		}
		$(window).scrollTop(s);
	},10);
});

//左侧滚动监听floor1
floor1Name=$('.leftnav .floor1').find('a').attr('name');
$('.leftnav .floor1').find('a').html(floor1Name).css({'display':'block'});
$('.leftnav .floor1').find('i').hide();

$('.leftnav .floor1').mouseenter(function(){
	floor1Name2=$('.leftnav .floor1').find('a').attr('name2');
    $(this).find('a').html(floor1Name2).css({'display':'block'}).animate({
    	'width':'60px'
    },500);
    $(this).find('i').hide();
});
$('.leftnav .floor1').mouseleave(function(){
    $(this).find('a').animate({
    	'width':'30px'
    },200,function(){
    	$(this).hide();
    	//$('.leftnav .floor1').find('i').show();
    	$('.leftnav .floor1').find('a').html(floor1Name).css({'display':'block'});
        myscroll();
    });
   
});

$('.leftnav .floor1').click(function(){
	f=$(this).find('a').attr('name');
	t=$('#'+f).offset().top;      //--floor1的高度--
	t2=$('#'+f).offset().top-200;  
    s=$(document).scrollTop();   //--获取已经滚动的高--
	 v=20;
	 if(s>t){
	 	timeobj=setInterval(function(){
	 		s-=v;
		 if(s-t<=0){
		 	s=t;
			clearInterval(timeobj);
		 }
		 $(window).scrollTop(s-200);
	 },1);
	 }
	 else
	 {
	 	timeobj=setInterval(function(){
	 		s+=v;
		 if(s-t>=0){
		 	s=t;
			clearInterval(timeobj);
		 }
		 $(window).scrollTop(s-200);
	 },1);
	 }
	 
});

//左侧滚动监听floor2
$('.leftnav .floor2').mouseenter(function(){
	floor1Name2=$('.leftnav .floor2').find('a').attr('name2');
    $(this).find('a').html(floor1Name2).css({'display':'block'}).animate({
    	'width':'60px'
    },500);
    $(this).find('i').hide();
});
$('.leftnav .floor2').mouseleave(function(){
    $(this).find('a').animate({
    	'width':'30px'
    },200,function(){
    	$(this).hide();
    	$('.leftnav .floor2').find('i').show();
        myscroll();
    });
  
});
$('.leftnav .floor2').click(function(){
	f=$(this).find('a').attr('name');
	t=$('#'+f).offset().top-200;
	$(window).scrollTop(t);
});
//左侧滚动监听floor3
$('.leftnav .floor3').mouseenter(function(){
    floor1Name2=$('.leftnav .floor3').find('a').attr('name2');
    $(this).find('a').html(floor1Name2).css({'display':'block'}).animate({
    	'width':'60px'
    },500);
    $(this).find('i').hide();
});
$('.leftnav .floor3').mouseleave(function(){
    $(this).find('a').animate({
    	'width':'30px'
    },200,function(){
    	$(this).hide();
    	$('.leftnav .floor3').find('i').show();
        myscroll();
    });
   
});
$('.leftnav .floor3').click(function(){
	f=$(this).find('a').attr('name');
	t=$('#'+f).offset().top-200;
	$(window).scrollTop(t);
});
//左侧滚动监听floor4
$('.leftnav .floor4').mouseenter(function(){
   floor1Name2=$('.leftnav .floor4').find('a').attr('name2');
    $(this).find('a').html(floor1Name2).css({'display':'block'}).animate({
    	'width':'60px'
    },500);
    $(this).find('i').hide();
});
$('.leftnav .floor4').mouseleave(function(){
    $(this).find('a').animate({
    	'width':'30px'
    },200,function(){
    	$(this).hide();
    	$('.leftnav .floor4').find('i').show();
        myscroll();
    });
    
});
$('.leftnav .floor4').click(function(){
	f=$(this).find('a').attr('name');
	t=$('#'+f).offset().top-200;
	$(window).scrollTop(t);
});
//左侧滚动监听floor5
$('.leftnav .floor5').mouseenter(function(){
    floor1Name2=$('.leftnav .floor5').find('a').attr('name2');
    $(this).find('a').html(floor1Name2).css({'display':'block'}).animate({
    	'width':'60px'
    },500);
    $(this).find('i').hide();
});
$('.leftnav .floor5').mouseleave(function(){
    $(this).find('a').animate({
    	'width':'30px'
    },200,function(){
    	$(this).hide();
    	$('.leftnav .floor5').find('i').show();
    	 myscroll();
    });
   
});
$('.leftnav .floor5').click(function(){
	f=$(this).find('a').attr('name');
	t=$('#'+f).offset().top-200;
	$(window).scrollTop(t);
});

//左侧滚动监听开始
$(window).scroll(function(){

	myscroll();
});
function myscroll(){
	st=$(window).scrollTop()+201;   //为了使楼层对齐，前面加200，这里加201  ^…^
	firstTop=$('.comTitle .newIndexIcon').first().offset().top;
	if(st<firstTop){
		$('.leftnav').hide();
	}else{
		$('.comTitle .newIndexIcon').each(function(){
		ot=$(this).offset().top;
		if(st>=ot){
			$('.leftnav').show();
			fname=$(this).attr('id');
			$('.leftnav a[name='+fname+']').html(fname).css({'display':'block'});
			$('.leftnav a[name='+fname+']').next('i').hide();
			$('.leftnav .leftnavA').not($('.leftnav a[name='+fname+']')).each(function(){
				fname2=$(this).attr('name2');
				$(this).html(fname2).hide();
				$(this).next().show();
			});
		}
	});
}		
};
});

