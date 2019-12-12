// header
	// 언어선택
	const html = document.querySelector('html');
	const lang = html.querySelector('ul.lang');
	const liActive = lang.querySelector('ul.lang > li.active');

	liActive.addEventListener('click', () => {
		lang.classList.toggle('active');
	});

	// 모바일 메뉴
	const btnMenuMo = html.querySelector('.btn_menu_mo');
	const menuMoArea = html.querySelector('.menu_mo_area');

	btnMenuMo.addEventListener('click', () => {
		html.classList.toggle('hidden');
		btnMenuMo.classList.toggle('active');
		menuMoArea.classList.toggle('active');
	});

// main
	// 최상단 슬라이드
	const mainSlide = document.querySelector('ul.main_slide');
	const slidePage = mainSlide.querySelectorAll('.slide_page');
	const slideLen = slidePage.length; // li 길이
	const slidePageWidth = 100 / (slideLen + 2); // li 너비 계산
	const btnSlide = document.querySelectorAll('.btn_slide');
	let curIndex = 0;
	let curBtn = btnSlide[curIndex]; // 활성화 버튼 선언
	curBtn.classList.add('active');
	let curSlide = slidePage[curIndex]; // 활성화 슬라이드내부 선언
	curSlide.classList.add('active');

	mainSlide.style.width = `${100 * (slideLen + 2)}%`; // ul 너비 지정
	mainSlide.style.transform = `translateX(-${100 / (slideLen + 2)}%`; // ul 초기위치 지정
	slidePage.forEach((element) => {
		element.style.width = `${slidePageWidth}%`;
	}); // li 너비 지정

	// 슬라이드 양 끝에 슬라이드 복제하기
	const slidePageFirst = mainSlide.firstElementChild.cloneNode(true);
	const slidePageLast = mainSlide.lastElementChild.cloneNode(true);
	mainSlide.appendChild(slidePageFirst);
	mainSlide.insertBefore(slidePageLast, mainSlide.firstElementChild);

	mainSlide.lastElementChild.classList.remove('active'); // 복제된 슬라이드로부터 따라온 active 제거

	// 페이지 로드되면 자동재생
	let setting; // clear를 위한 전역함수 선언

	function autoPlay() {
		setting = setInterval(() => {
			mainSlide.style.transition = '.5s';
			mainSlide.style.transform = `translateX(-${slidePageWidth * (curIndex + 2)}%`;
			
			curBtn.classList.remove('active'); // 지나간 슬라이드
			curSlide.classList.remove('active'); // 지나간 슬라이드

			++curIndex;

			curBtn = btnSlide[curIndex];
			curSlide = slidePage[curIndex];				

			if(curIndex === slideLen) {
				setTimeout(() => {
					mainSlide.style.transition = '0s';
					mainSlide.style.transform = `translateX(-${slidePageWidth}%`;
				},501);
				curIndex = 0;
				curBtn = btnSlide[0];
				curSlide = slidePage[0];
			};

			curBtn.classList.add('active');
			curSlide.classList.add('active');
		}, 5000);
	};

	document.addEventListener("DOMContentLoaded", () => {
		autoPlay();
	});

	// 버튼 클릭시 슬라이드 이동
	for (let i = 0; i < slideLen; i++) {
		btnSlide[i].onclick = () => {
			mainSlide.style.transition = '.5s';
			mainSlide.style.transform = `translateX(-${slidePageWidth * (i + 1)}%`; // 클릭한 슬라이드로 이동

			clearInterval(setting); // 자동재생 중지

			curBtn.classList.remove('active'); // 자동재생되던 active 제거
			curSlide.classList.remove('active'); // 자동재생되던 active 제거
			btnSlide[i].classList.add('active'); // 클릭한 곳 active 추가
			slidePage[i].classList.add('active'); // 클릭한 곳 active 추가

			curIndex = i; // 흐름이 이어지도록 curIndex 설정	

			setTimeout(() => {
				btnSlide[i].classList.remove('active'); 
				slidePage[i].classList.remove('active');
			}, 5000); // 5초 뒤 클릭한 곳 active 제거
			
			autoPlay(); // 자동재생 다시 실행
		}
	}

	// 자동재생 재시작을 위한 선언
	let rePlaySet; // clear를 위한 전역함수 선언

	function rePlay() {
		rePlaySet = setTimeout(function() {
			autoPlay(); 
		}, 3000);
	};

	// 다음 페이지로 이동
	function nextPage() {
		mainSlide.style.transition = '.5s';
		mainSlide.style.transform = `translateX(-${slidePageWidth * (curIndex + 2)}%`;

		curBtn.classList.remove('active'); // 지나간 슬라이드
		curSlide.classList.remove('active'); // 지나간 슬라이드

		++curIndex;

		curBtn = btnSlide[curIndex];
		curSlide = slidePage[curIndex];			

		if (curIndex === slideLen) {
			setTimeout(() => {
				mainSlide.style.transition = '0s';
				mainSlide.style.transform = `translateX(-${slidePageWidth}%`;
			},501);
			curIndex = 0;
			curBtn = btnSlide[0];
			curSlide = slidePage[0];
		};

		curBtn.classList.add('active');
		curSlide.classList.add('active');
	};

	// 다음버튼 클릭
	const btnPageNext = document.querySelector('.btn_page.next');
	let click = true;

	btnPageNext.addEventListener('click', () => {
		if (click) {
			clearInterval(setting); // 자동재생 중지
			clearTimeout(rePlaySet); // 자동재생 재시작 중지
			
			nextPage();

			setTimeout(() => {
				// 2초 딜레이 (재시작과 중지가 동시에 일어나 무산되지 않도록)
			}, 2000);

			rePlay(); // 2초 뒤 자동재생 재시작

			click = !click;

			// transition(.5s) 완료 후 클릭이 또 가능하도록
			setTimeout(() => {
				click = true;
			}, 500)
		}
	});

	// 이전 페이지로 이동
	function prevPage() {
		mainSlide.style.transition = '.5s';
		mainSlide.style.transform = `translateX(-${slidePageWidth * curIndex}%`;

		for (let i = 0; i < slideLen; i++) {
			btnSlide[i].classList.remove('active');
			slidePage[i].classList.remove('active');
		}; // active 전체 제거

		--curIndex;

		curBtn = btnSlide[curIndex];
		curSlide = slidePage[curIndex];

		if(curIndex === -1) {
			setTimeout(() => {
				mainSlide.style.transition = '0s';
				mainSlide.style.transform = `translateX(-${slidePageWidth * slideLen}%`;
			}, 501);
			curIndex = slideLen - 1;
			curBtn = btnSlide[slideLen - 1];
			curSlide = slidePage[slideLen - 1];
		};

		curBtn.classList.add('active');
		curSlide.classList.add('active');
	};

	// 이전버튼 클릭
	const btnPagePrev = document.querySelector('.btn_page.prev');

	btnPagePrev.addEventListener('click', () => {
		if (click) {
			clearInterval(setting); // 자동재생 중지
			clearTimeout(rePlaySet); // 자동재생 재시작 중지
			
			prevPage();

			setTimeout(() => {
				// 2초 딜레이 (재시작과 중지가 동시에 일어나 무산되지 않도록)
			}, 2000);

			rePlay(); // 2초 뒤 자동재생 재시작

			click = !click;

			// transition(.5s) 완료 후 클릭이 또 가능하도록
			setTimeout(() => {
				click = true;
			},500)
		}
	});

	// 굿피플 캠페인
	const progressBar = document.querySelectorAll('.progress_bar');

	window.addEventListener('scroll', () => {
		if (html.scrollTop > 860) {
			progressBar[0].style.width = '29%';
			progressBar[1].style.width = '46%';
			progressBar[2].style.width = '76%';
		}
	});

	// 캠페인 후기
	const reviewList = document.querySelector('ul.review_list');
	const listPage = reviewList.querySelectorAll('ul.review_list > li');
	const pageLen = listPage.length; // li 길이
	const listPageWidth = 100 / (pageLen + 2); // li 너비 계산
	let curIdx = 0;

	reviewList.style.width = `${100 * (pageLen + 2)}%`; // ul 너비 지정
	reviewList.style.transform = `translateX(-${listPageWidth}%`; // ul 초기위치 지정
	listPage.forEach((element) => {
		element.style.width = `${listPageWidth}%`;
	}); // li 너비 지정

	// 슬라이드 양 끝에 슬라이드 복제하기
	const listPageFirst = reviewList.firstElementChild.cloneNode(true);
	const listPageLast = reviewList.lastElementChild.cloneNode(true);
	reviewList.appendChild(listPageFirst);
	reviewList.insertBefore(listPageLast, reviewList.firstElementChild);

	// 다음버튼 클릭
	const btnReviewNext = document.querySelector('.btn_review.next');

	btnReviewNext.addEventListener('click', () => {
		reviewList.style.transition = '1s'
		reviewList.style.transform = `translateX(-${listPageWidth * (curIdx + 2)}%`;

		curIdx++;

		if (curIdx === pageLen) {
			setTimeout(() => {
				reviewList.style.transition = '0s';
				reviewList.style.transform = `translateX(-${listPageWidth}%`;
			}, 1001);
			curIdx = 0;
		};
	});

	// 이전버튼 클릭
	const btnReviewPrev = document.querySelector('.btn_review.prev');

	btnReviewPrev.addEventListener('click', () => {
		reviewList.style.transition = '1s'
		reviewList.style.transform = `translateX(-${listPageWidth * curIdx}%`;

		curIdx--;

		if (curIdx === -1) {
			setTimeout(() => {
				reviewList.style.transition = '0s';
				reviewList.style.transform = `translateX(-${listPageWidth * pageLen}%`;
			}, 1001);
			curIdx = pageLen - 1;
		};
	});

// footer
	// 사이트맵
	const sitemap = document.querySelector('.sitemap');
	const btnSitemap = sitemap.querySelector('.btn_sitemap');

	btnSitemap.addEventListener('click', () => {
		sitemap.classList.toggle('active');
	});

	// 패밀리 사이트
	const familyDropdown = document.querySelector('.family_dropdown');
	const btnFamily = familyDropdown.querySelector('.btn_family');
	
	btnFamily.addEventListener('click', () => {
		familyDropdown.classList.toggle('active');
	});

	// 하단 고정메뉴
	const fixArea = document.querySelector('.fix_area');
	const btnFix = fixArea.querySelector('.btn_fix');

	btnFix.addEventListener('click', () => {
		fixArea.classList.toggle('active');
	});