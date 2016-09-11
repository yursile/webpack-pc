import "../css/index.less"


$(".c_next,.c_prev").on("mouseenter",function(){
	$(this).css("opacity","1")	
});


$(".c_next,.c_prev").on("mouseout",function(){
	$(this).css("opacity","0.5")	
});




class Slide{
	// isAuto = true;

	constructor(ele,isAuto=false,interval=5000){
		this.ele = ele;
		this.interval = interval;
		this.isAuto = isAuto;
		this.activeIndex = 0;
		if(isAuto){
			this.timer = this.autoPlay();
		}


	}

	prev(){

		if(this.isAuto&&!this.delay){
			clearInterval(this.timer);
			this.timer = null;
			this.delay = setTimeout(()=>{this.timer = this.autoPlay();clearTimeout(this.delay);this.delay=null},this.interval);
			// this.timer = this.autoPlay();
		}

		this.ele.css({
			"transform":"translate(0)",
			// "-moz-transform":"translate(0)",
			// "-ms-transform":"translate(0)",
			// "-webkit-transform":"translate(0)",
			// "-o-transform":"translate(0)",
			"transition":"0.5s linear all",
			// "-o-transition":"0.5s linear all",
			// "-moz-transition":"0.5s linear all",
			// "-ms-transition":"0.5s linear all",
			// "-webkit-transition":"0.5s linear all"
		})
		this.activeIndex = 0;
		
	}

	next(){
		if(this.isAuto&&!this.delay){
			clearInterval(this.timer);
			this.timer = null;
			this.delay = setTimeout(()=>{this.timer = this.autoPlay();clearTimeout(this.delay);this.delay=null},this.interval);
			// this.timer = this.autoPlay();
		}
		this.ele.css({
			"transform":"translate(-50%)",
			// "-moz-transform":"translate(-50%)",
			// "-ms-transform":"translate(-50%)",
			// "-webkit-transform":"translate(0)",
			// "-o-transform":"translate(-50%)",
			"transition":"0.5s linear all",
			// "-o-transition":"0.5s linear all",
			// "-moz-transition":"0.5s linear all",
			// "-ms-transition":"0.5s linear all",
			// "-webkit-transition":"0.5s linear all"
		});
		this.activeIndex = 1;
	}

	autoPlay(){
		return setInterval(()=>{
			if(this.activeIndex===0){
				this.next();
			}else{
				this.prev();
			}
		},this.interval);
	}

}

var UL = $(".carousel ul");
var slider = new Slide(UL,true);

$(".c_next").on("click",function(){
	slider.next();
});
$(".c_prev").on("click",function(){
	slider.prev();
});



//listen scroll

var ScrollListener = {
	/**
	 * ele  :  fn
	 * @type {Array}
	 */
	eles:[],

	add:function(ele,fn){
		this.eles.push({ele,fn});
		return this;
	},
	listen:function(){
		var _windowHeight = $(window).height();
		var _half = Math.floor(_windowHeight/2)-300;
		$(window).on("scroll",function(){
			this.eles.forEach(function(v,k){
				if(($(v.ele).offset().top - $(window).scrollTop()+_half ) < _windowHeight){
					v.fn();
					this.remove(k);
		    	}
			}.bind(this));		    
		}.bind(this));
	},
	remove:function(i){
		this.eles.splice(i,1);
	}
}


ScrollListener.add($(".procedure_d"),function(){
	$(".procedure_d").addClass("active");
})
.add($(".award1"),function(){
	$(".award1").addClass("fadeInUp")
})
.add($(".award2"),function(){
	$(".award2").addClass("fadeInUp")
})
.add($(".require_box"),function(){
	$(".require_box").addClass("fadeInUp")
})

ScrollListener.listen();



// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());


setTimeout(function(){
	var v = new Vivus('newl', {duration: 3000,start:"manual",onReady:function(){
		$("#newl").show();
	}});
	var t=0;

	function render(){
		t+=0.005
		v.setFrameProgress(t);
		requestAnimationFrame(render);
	}
	render();
},1000);


	

