```ts
	refreshEnd= false;
	times=0;//加载次数
	oriSpeed=300
    var swiper = new Swiper('.swiper-container',{
		speed: oriSpeed,
		slidesPerView: 'auto',
		freeMode: true,
        direction: 'vertical',
		setWrapperSize: true,
		scrollbar: {
            el: '.swiper-scrollbar',
        },
		on:{
			//下拉释放刷新
			touchEnd: function(){
				swiper=this
				refreshText=swiper.$el.find('.refresh')
                if(this.translate>100){
	                swiper.setTransition(this.params.speed);
                    swiper.setTranslate(100);
		            swiper.touchEventsData.isTouched=false;//跳过touchEnd事件后面的跳转(4.0.5)
		            refreshText.html('刷新中')
					
		            swiper.allowTouchMove=false;
					setTimeout(function(){//模仿AJAX
						swiper.removeAllSlides();
						for(i=0;i<20;i++){
						swiper.appendSlide('<div class="swiper-slide">New Slide'+(i+1)+'</div>');
						refreshText.html('刷新完成');
						refreshEnd=true;
						swiper.allowTouchMove=true;
						}
					},1000)
					
                 }
				 
            },
			touchStart: function(){
				if(refreshEnd==true){
                    this.$el.find('.refresh').html('释放刷新');
					refreshEnd=false;
				}
            },
			
			//加载更多
			momentumBounce: function(){//非正式反弹回调函数，上拉释放加载更多可参考上例
				swiper=this
				//slidesheight=0;
				//for(h=0;h<swiper.slides.length;h++){
				//	slidesheight+=swiper.slides[h].offsetHeight;
				//}
				//endTranslate=this.height-slidesheight-20
				//if(this.translate < endTranslate){}
				if(swiper.translate<-100){
		
					swiper.allowTouchMove=false;//禁止触摸
					swiper.params.virtualTranslate=true;//定住不给回弹
                    setTimeout(function(){//模仿AJAX
					    for(m=0;m<20;m++){
					        swiper.appendSlide('<div class="swiper-slide">moreSlide'+(times*20+m+1)+'</div>');	
						}
						swiper.params.virtualTranslate=false;
						swiper.allowTouchMove= true;
						times++
				    },1000)
					
				}
			},
		}
	});
```