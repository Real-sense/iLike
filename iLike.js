/*========
Подключение jQuery
=========*/
(function () {
    var e = document.createElement('script');
    e.src = '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js';
    document.getElementById('system_msg').appendChild(e);
}());

/*========
Модуль iLike
=========*/
var iLike = (function($){
	return {
		init : function(){
			iLike.checkNews();
		},
		getRandom: function(min, max){//случайное число
			return parseInt(Math.random() * (max - min) + min);
		},
		checkNews: function(){//Проверка новостей
			var
				newPost = $('#feed_new_posts'),
				$time = iLike.getRandom(45000, 59000);

			console.log('start time');
			console.log($time);

			iLike.getPosts.idx = 0;//обнуляем статичный элемент индекса функции

			if( newPost.css('display') !== 'none' ){//если есть новые новости
				newPost.click();
				console.log('go');
				iLike.getPosts();
			}else{
				console.log('empty');
				iLike.getPosts();
			}
		},
		getPosts: function(){
			var
				likeBox = $('#feed_rows'),//бокс новостей
				likeRows = likeBox.children('.feed_row'),//все новости
				likeRowsLength = likeRows.length;//общая длина новостей

			iLike.getPosts.idx = (iLike.getPosts.idx || 0) + 1;//статичный элемент индекса функции
			console.log(iLike.getPosts.idx+'not visible');
			console.log(likeRowsLength);

			if(iLike.getPosts.idx === (likeRowsLength + 1) ){//если пройдены все посты
				console.log('complete, check new');
				setTimeout(function(){
					iLike.checkNews();//запускам проверку новостей
				}, 59000);
			}

			if (iLike.getPosts.idx <= likeRowsLength) {
				//my_like has
				var
					jthis = likeRows.eq(iLike.getPosts.idx - 1),//текущий блок новости
					likeBlock = jthis.find('.post_like.fl_r'),//кнопка лайка
					hasLike = likeBlock.children('.post_like_icon'),//иконка с отметкой лайка
					promoted = jthis.find('.wall_text_name_explain_promoted_post');//рекламная запись

				console.log(iLike.getPosts.idx);

				if(likeBlock.length){//если не рекламный блок
					console.log('not commercial');
					if(promoted.length){
						console.log('promoted');
						if(iLike.getPosts.idx === likeRowsLength ){//если этой последний блок
							console.log('last');
							setTimeout(function(){
								iLike.checkNews();//запускам проверку новостей
							}, 59000);
						}else{
							iLike.getPosts();//вызываем работу цикла getPosts дальше
						}
					}else{
						if( hasLike.hasClass('my_like') === false ){//если не был лайк
							iLike.like(likeBlock, iLike.getRandom(23000, 59000), iLike.getPosts);//ставим лайк
							console.log('notLike');
						}else{//если был лайк
							console.log('hasLike');
							iLike.getPosts();//вызываем работу цикла getPosts дальше
						}
					}
					
				}else{//рекламный блок
					console.log('commercial');
					if(iLike.getPosts.idx === likeRowsLength ){//если этой последний блок
						setTimeout(function(){
							iLike.checkNews();//запускам проверку новостей
						}, 59000);
						console.log('last');
					}else{
						iLike.getPosts();//вызываем работу цикла getPosts дальше
					}
				}
			}
		},
		like: function(block, $time, callback){//ставим лайк
			setTimeout(function(){
				block.click();
				console.log('click');
				callback();//вызываем работу цикла getPosts дальше
			}, $time);
		}
	}
})(jQuery);

/*========
Инициализация модуля
=========*/
iLike.init();
