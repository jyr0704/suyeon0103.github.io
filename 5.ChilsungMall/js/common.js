// header
	// 전체 카테고리
	const btnCategory = document.querySelector('.btn_category');
	const categoryMap = document.querySelector('.category_map');
	const bgCategoryMap = document.querySelector('.bg_category_map');
	const btnClose = bgCategoryMap.querySelector('.btn_close');

	btnCategory.addEventListener('click', () => {
		btnCategory.classList.toggle('active');
		categoryMap.classList.toggle('active');
		bgCategoryMap.classList.toggle('active');
	});
	btnClose.addEventListener('click', () => {
		btnCategory.classList.remove('active');
		categoryMap.classList.remove('active');
		bgCategoryMap.classList.remove('active');
	});

	// search wrap
	const html = document.querySelector('html');
	const searchBox = html.querySelector('.search_box');
	const searchWrap = html.querySelector('.search_wrap');
	const bgBlack = searchWrap.querySelector('.bg_black');
	const btnWrapClose = searchWrap.querySelector('.btn_wrap_close');
	
	searchBox.addEventListener('focus', () => {
		searchWrap.classList.add('active');
		html.style.overflow = 'hidden';
	});
	btnWrapClose.addEventListener('click', () => {
		searchWrap.classList.remove('active');
		html.style.overflow = 'visible'
	});
	bgBlack.addEventListener('click', () => {
		searchWrap.classList.remove('active');
		html.style.overflow = 'visible'
	});

// main
	// 최상단 슬라이드
	const slideList = html.querySelector('.slide_list'); // ul
	const slidePage = slideList.children; // li
	const slideLen = slidePage.length;
	const slidePageCurrent = html.querySelector('.main_slide_area .slide_page_current'); // 현재 페이지 수
	let curIndex = 0;
	let click = true;

	slideList.style.width = `${(940 + 70) * (slideLen + 4)}px`; // ul 너비 지정
	slideList.style.transform = 'translateX(-2020px)'; // ul 초기위치 지정

	// 슬라이드 복제, 붙이기
	const slidePageFirst = slideList.firstElementChild.cloneNode(true);
	const slidePageSecond = slideList.children[1].cloneNode(true);
	const slidePageLast = slideList.lastElementChild.cloneNode(true);
	const slidePageBeforeLast = slideList.children[slideLen - 2].cloneNode(true);
	slideList.appendChild(slidePageFirst);
	slideList.appendChild(slidePageSecond);
	slideList.insertBefore(slidePageLast, slideList.firstElementChild);
	slideList.insertBefore(slidePageBeforeLast, slidePageLast);
	
	// 페이지 로드되면 자동재생
	let setting; // clear를 위한 전역함수 선언

	function autoPlay() {
		setting = setInterval(() => {
			slideList.style.transition = '.5s';
			slideList.style.transform = `translateX(-${1010 * (curIndex + 3)}px`;

			curIndex++;

			slidePageCurrent.textContent = curIndex + 1;		

			if (curIndex === slideLen) {
				setTimeout(() => {
					slideList.style.transition = '0s';
					slideList.style.transform = 'translateX(-2020px)';
				},501);
				curIndex = 0;
				slidePageCurrent.textContent = curIndex + 1;
			};
		}, 5000);
	};

	document.addEventListener("DOMContentLoaded", () => {
		autoPlay();
	});

	// 버튼선언
	const btnSlidePrev = html.querySelector('.main_slide_area .btn_slide_prev');
	const btnSlideNext = html.querySelector('.main_slide_area .btn_slide_next');
	const btnSlidePlay = html.querySelector('.main_slide_area .btn_slide_play');
	const btnSlideStop = html.querySelector('.main_slide_area .btn_slide_stop');

	// 정지버튼 클릭시 자동재생 중지
	btnSlideStop.addEventListener('click', () => {
		btnSlideStop.style.display = 'none';
		btnSlidePlay.style.display = 'inline-block';
		clearInterval(setting);
	});

	// 재생버튼 클릭시 자동재생	
	btnSlidePlay.addEventListener('click', () => {
		btnSlidePlay.style.display = 'none';
		btnSlideStop.style.display = 'inline-block';
		autoPlay();
	});

	// 다음 페이지로 이동
	function nextSlide() {
		slideList.style.transition = '.5s';
		slideList.style.transform = `translateX(-${1010 * (curIndex + 3)}px`;

		curIndex++;

		slidePageCurrent.textContent = curIndex + 1;		

		if (curIndex === slideLen) {
			setTimeout(() => {
				slideList.style.transition = '0s';
				slideList.style.transform = 'translateX(-2020px)';
			}, 501);
			curIndex = 0;
			slidePageCurrent.textContent = curIndex + 1;
		};
	};

	// 다음버튼 클릭
	btnSlideNext.addEventListener('click', () => {
		if ( btnSlideStop.style.display === 'none' ) { // 자동재생이 멈춰있을 경우
			if (click) {
				nextSlide();

				click = !click;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click = true;
				}, 500);
			}	
		} else { // 자동재생이 실행중일 경우
			if (click) {
				clearInterval(setting); // 자동재생 중지
				
				nextSlide();

				autoPlay();

				click = !click;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click = true;
				},500)
			}
		} 		
	});

	// 이전 페이지로 이동
	function prevSlide() {
		slideList.style.transition = '.5s';
		slideList.style.transform = `translateX(-${1010 * (curIndex + 1)}px`;

		curIndex--;

		slidePageCurrent.textContent = curIndex + 1;

		if (curIndex === -1) {
			setTimeout(() => {
				slideList.style.transition = '0s';
				slideList.style.transform = `translateX(-${1010 * (slideLen + 1)}px`;
			}, 501);
			curIndex = slideLen - 1;
			slidePageCurrent.textContent = curIndex + 1;
		};
	};

	// 이전버튼 클릭
	btnSlidePrev.addEventListener('click', () => {
		if ( btnSlideStop.style.display === 'none' ) { // 자동재생이 멈춰있을 경우
			if (click) {
				prevSlide();

				click = !click;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click = true;
				}, 500);
			}
		} else { // 자동재생이 실행중일 경우
			if (click) {
				clearInterval(setting); // 자동재생 중지
				
				prevSlide();

				autoPlay();

				click = !click;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click = true;
				}, 500)
			}
		}
	});

	// 인기상품 슬라이드
	const productSlide = html.querySelector('.product_slide'); // ul
	const productPage = productSlide.children; // li
	const pageLen = productPage.length;
	const productPageCurrent = html.querySelector('.product_slide_area .slide_page_current'); // 현재 페이지 수
	let curIdx = 0;
	let click2 = true;

	productSlide.style.width = 575 * (pageLen + 2) + 'px'; // ul 너비 지정
	productSlide.style.transform = 'translateX(-575px)'; // ul 초기위치 지정
	
	// 슬라이드 양 끝에 슬라이드 복제하기
	const productPageFirst = productSlide.firstElementChild.cloneNode(true);
	const productPageLast = productSlide.lastElementChild.cloneNode(true);
	productSlide.appendChild(productPageFirst);
	productSlide.insertBefore(productPageLast, productSlide.firstElementChild);

	// 페이지 로드되면 자동재생	
	let setting2; // clear를 위한 전역함수 선언

	function autoPlay2() {
		setting2 = setInterval(() => {
			productSlide.style.transition = '.5s'
			productSlide.style.transform = `translateX(-${575 * (curIdx + 2)}px`;
			
			++curIdx;

			productPageCurrent.textContent = curIdx + 1;
			
			if (curIdx === pageLen) {
				setTimeout(() => {
					productSlide.style.transition = '0s';
					productSlide.style.transform = 'translateX(-575px)';
				},501);
				curIdx = 0;
				productPageCurrent.textContent = curIdx + 1;
			};
		}, 5000);
	};

	document.addEventListener("DOMContentLoaded", () => {
		autoPlay2();
	});

	// 버튼선언
	const btnProductPrev = html.querySelector('.product_slide_area .btn_slide_prev');
	const btnProductNext = html.querySelector('.product_slide_area .btn_slide_next');
	const btnProductPlay = html.querySelector('.product_slide_area .btn_slide_play');
	const btnProductStop = html.querySelector('.product_slide_area .btn_slide_stop');

	// 정지버튼 클릭시 자동재생 중지
	btnProductStop.addEventListener('click', () => {
		btnProductStop.style.display = 'none';
		btnProductPlay.style.display = 'inline-block';
		clearInterval(setting2);
	});

	// 재생버튼 클릭시 자동재생	
	btnProductPlay.addEventListener('click', () => {
		btnProductPlay.style.display = 'none';
		btnProductStop.style.display = 'inline-block';
		autoPlay2();
	});

	// 다음 페이지로 이동
	function nextProduct() {
		productSlide.style.transition = '.5s';
		productSlide.style.transform = `translateX(-${575 * (curIdx + 2)}px`;

		++curIdx;

		productPageCurrent.textContent = curIdx + 1;			

		if (curIdx === pageLen) {
			setTimeout(() => {
				productSlide.style.transition = '0s';
				productSlide.style.transform = 'translateX(-575px)';
			}, 501);
			curIdx = 0;
			productPageCurrent.textContent = curIdx + 1;
		};
	};

	// 다음버튼 클릭
	btnProductNext.addEventListener('click', () => {
		if ( btnProductStop.style.display === 'none' ) { // 자동재생이 멈춰있을 경우
			if (click2) {
				nextProduct();

				click2 = !click2;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click2 = true;
				}, 500);
			}	
		} else { // 자동재생이 실행중일 경우
			if (click2) {
				clearInterval(setting2); // 자동재생 중지
				
				nextProduct();

				autoPlay2();

				click2 = !click2;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click2 = true;
				}, 500)
			}
		} 		
	});

	// 이전 페이지로 이동
	function prevProduct() {
		productSlide.style.transition = '.5s';
		productSlide.style.transform = `translateX(-${575 * curIdx}px`;

		--curIdx;

		productPageCurrent.textContent = curIdx + 1;

		if (curIdx === -1) {
			setTimeout(() => {
				productSlide.style.transition = '0s';
				productSlide.style.transform = `translateX(-${575 * pageLen}px`;
			}, 501);
			curIdx = pageLen - 1;
			productPageCurrent.textContent = curIdx + 1;
		};
	};

	// 이전버튼 클릭
	btnProductPrev.addEventListener('click', () => {
		if ( btnProductStop.style.display === 'none' ) { // 자동재생이 멈춰있을 경우
			if (click2) {
				prevProduct();

				click2 = !click2;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click2 = true;
				}, 500);
			}
		} else { // 자동재생이 실행중일 경우
			if (click2) {
				clearInterval(setting2); // 자동재생 중지
				
				prevProduct();

				autoPlay2();

				click2 = !click2;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click2 = true;
				}, 500);
			}
		}
	});

	// 오른쪽 사이드바
	const mainSideBar = html.querySelector('.main_side_bar');
	const btnMainTop = mainSideBar.querySelector('.btn_main_top');

	window.addEventListener('scroll', () => {
		if (html.scrollTop > 790) {
			mainSideBar.classList.add('fixed');
		} else {
			mainSideBar.classList.remove('fixed');
		}
	});

	btnMainTop.addEventListener('click', () => { // 탑버튼 클릭시
		window.scroll({
			behavior: 'smooth',
			top: 0
		});
	});

	// 탑버튼
	const btnTop = html.querySelector('.btn_top');

	window.addEventListener('scroll', () => { // 스크롤 노출설정
		if (html.scrollTop < 1) {
			btnTop.classList.remove('fixed');
		} else {
			btnTop.classList.add('fixed');

			if (html.scrollTop > 5770) {
				btnTop.classList.remove('fixed');
			}
		}
	});

	btnTop.addEventListener('click', () => { // 클릭시
		window.scroll({
			behavior: 'smooth',
			top: 0
		});
	});

// footer
	// FAMILY SITE
	const btnFamily = html.querySelector('.btn_family');
	const familyList = html.querySelector('.family_list');

	btnFamily.addEventListener('click', () => {
		familyList.classList.toggle('active');

		html.addEventListener('click', function(e) {
			if ( !closeCheck(e.target) ) { // false일 경우 active 제거
				familyList.classList.remove('active');

				this.removeEventListener('click', arguments.callee);
			}

			function closeCheck(click) { // 다른 곳 클릭시 false 반환
				while (click.className !== 'wrap') {
					if (click.className === 'family_site') {
						return true;
					}
					click = click.parentNode;
				}
				return false;
			}
		});
	});