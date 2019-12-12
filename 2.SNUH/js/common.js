// header
	// 언어선택
	const lang = document.querySelector('.header_util > .lang > a');
	const langBox = document.querySelector('.lang_box');
	const langClose = langBox.querySelector('.lang_close');
	
	lang.addEventListener('click', () => {
		langBox.style.display = 'block';
	});
	langClose.addEventListener('click', () => {
		langBox.style.display = 'none';
	});

	// 전체메뉴 열고닫기
	const menuMap = document.querySelector('.menu_map');

	menuMap.addEventListener('click', () => {
		menuMap.classList.toggle('active');
	});

	// 전체검색 열고닫기
	const btnSearch= document.querySelector('.header.inner > .btn_search');
	const searchWrap = document.querySelector('.search_wrap');
	const btnSearchClose = searchWrap.querySelector('.btn_search_close');

	btnSearch.addEventListener('click', () => {
		searchWrap.style.display = 'block';
	});
	btnSearchClose.addEventListener('click', () => {
		searchWrap.style.display = 'none';
	});

	// 스크롤 내릴시 헤더 변경
	const html = document.querySelector('html');
	const header = html.querySelector('header');

	window.addEventListener('scroll', () => {
		if (html.scrollTop > 60) {
			header.classList.add('scroll');
		}
		else {
			header.classList.remove('scroll');
		}
	});

// main
	// 최상단 슬라이드
	const slideList = document.querySelector('ul.slide_list');
	const slideCont = slideList.querySelectorAll('.slide_cont');
	const contLen = slideCont.length; // li 길이
	const slideContWidth = 100 / (contLen + 2); // li 너비 계산
	const btnSlide = document.querySelectorAll('.btn_slide');
	let curIdx = 0;
	let curBtn = btnSlide[curIdx];
	curBtn.classList.add('active');

	slideList.style.width = `${100 * (contLen + 2)}%`; // ul 너비 지정
	slideCont.forEach((element) => {
		element.style.width = `${slideContWidth}%`;
	}); // li 너비 지정

	// 슬라이드 양 끝에 슬라이드 복제하기
	const slideContFirst = slideList.firstElementChild.cloneNode(true);
	const slideContLast = slideList.lastElementChild.cloneNode(true);
	slideList.appendChild(slideContFirst);
	slideList.insertBefore(slideContLast, slideList.firstElementChild);

	// 페이지 로드되면 자동재생
	let setting; // clear를 위한 전역함수 선언

	function autoPlay() {
		setting = setInterval(() => {
			for (let i = 0; i < contLen; i++) {
				btnSlide[i].classList.remove('active');
			}; // active 전체 제거

			slideList.style.transition = '.5s';
			slideList.style.transform = `translateX(-${slideContWidth * (curIdx + 2)}%`;
			
			curBtn.classList.remove('active');
			curBtn = btnSlide[++curIdx];				

			if(curIdx === contLen) {
				setTimeout(() => {
					slideList.style.transition = '0s';
					slideList.style.transform = `translateX(-${slideContWidth}%`;
				},501);
				curIdx = 0;
				curBtn = btnSlide[0];
			};

			curBtn.classList.add('active');
		},5000);
	};

	document.addEventListener("DOMContentLoaded", () => {
		autoPlay();
	});

	// 자동재생 정지 & 다시재생
	const btnPlay = document.querySelector('.btn.play');
	const btnStop = document.querySelector('.btn.stop');

	btnStop.addEventListener('click', () => {
		btnStop.style.display = 'none';
		btnPlay.style.display = 'block';
		clearInterval(setting);
	});

	btnPlay.addEventListener('click', () => {
		btnStop.style.display = 'block';
		btnPlay.style.display = 'none';
		autoPlay();
	});

	// 버튼 클릭시 슬라이드 이동
	for (let i = 0; i < contLen; i++) {
		btnSlide[i].onclick = () => {
			btnStop.style.display = 'none';
			btnPlay.style.display = 'block';
			clearInterval(setting); // 자동재생 중지

			slideList.style.transition = '.5s';
			slideList.style.transform = `translateX(-${slideContWidth * (i + 1)}%`; // 클릭한 슬라이드로 이동

			for (let i = 0; i < contLen; i++) {
				btnSlide[i].classList.remove('active');
			}; // active 전체 제거

			btnSlide[i].classList.add('active'); // 클릭한 곳 active 추가

			curIdx = i; // 흐름이 이어지도록 curIndex 설정	
		}
	}

	// 다음버튼 클릭
	const btnNext = document.querySelector('.btn.next');

	btnNext.addEventListener('click', () => {
		btnStop.style.display = 'none';
		btnPlay.style.display = 'block';
		clearInterval(setting); // 자동재생 중지
		
		slideList.style.transition = '.5s';
		slideList.style.transform = `translateX(-${slideContWidth * (curIdx + 2)}%`;

		curBtn.classList.remove('active');
		curBtn = btnSlide[++curIdx];

		if(curIdx === contLen) {
			setTimeout(() => {
				slideList.style.transition = '0s';
				slideList.style.transform = `translateX(-${slideContWidth}%`;
			},501);
			curIdx = 0;
			curBtn = btnSlide[0];
		};

		curBtn.classList.add('active');
	});

	// 이전버튼 클릭
	const btnPrev = document.querySelector('.btn.prev');

	btnPrev.addEventListener('click', () => {
		btnStop.style.display = 'none';
		btnPlay.style.display = 'block';
		clearInterval(setting); // 자동재생 중지

		slideList.style.transition = '.5s';
		slideList.style.transform = `translateX(-${slideContWidth * curIdx}%`;

		for (let i = 0; i < contLen; i++) {
			btnSlide[i].classList.remove('active');
		}; // active 전체 제거

		curBtn = btnSlide[--curIdx];

		if (curIdx === -1) {
			setTimeout(() => {
				slideList.style.transition = '0s';
				slideList.style.transform = `translateX(-${slideContWidth * contLen}%`;
			},501);
			curIdx = contLen - 1;
			curBtn = btnSlide[contLen - 1];
		};

		curBtn.classList.add('active');
	});

	// 핫이슈 슬라이드
	const slideIssue = document.querySelector('ul.slide_issue');
	const slideIssueLi = slideIssue.querySelectorAll('ul.slide_issue > li');
	const slideLen = slideIssueLi.length;
	const pageNum = document.querySelector('.page_num > em');
	let curIndex = 0;

	slideIssue.style.width = `${480 * (slideLen + 2)}px`; // ul 너비 지정

	// 슬라이드 양 끝에 슬라이드 복제하기
	const slideIssueLiFirst = slideIssue.firstElementChild.cloneNode(true);
	const slideIssueLiLast = slideIssue.lastElementChild.cloneNode(true);
	slideIssue.appendChild(slideIssueLiFirst);
	slideIssue.insertBefore(slideIssueLiLast, slideIssue.firstElementChild);

	// 버튼선언
	const pageNext = document.querySelector('.page_next');
	const pagePrev = document.querySelector('.page_prev');
	const pagePlay = document.querySelector('.page_play');
	const pageStop = document.querySelector('.page_stop');

	// 다음버튼 클릭
	pageNext.addEventListener('click', () => {
		pageStop.style.display = 'none';
		pagePlay.style.display = 'block';
		clearInterval(setting2); // 자동재생 중지
		
		slideIssue.style.transition = 'all 1s ease-in-out'
		slideIssue.style.transform = `translateX(-${480 * (curIndex + 2)}px`;

		curIndex++;

		pageNum.textContent = curIndex + 1;

		if (curIndex === slideLen) {
			setTimeout(() => {
				slideIssue.style.transition = '0s';
				slideIssue.style.transform = 'translateX(-480px)';
			},1001);
			curIndex = 0;
			pageNum.textContent = curIndex + 1;
		};
	});

	// 이전버튼 클릭
	pagePrev.addEventListener('click', () => {
		pageStop.style.display = 'none';
		pagePlay.style.display = 'block';
		clearInterval(setting2); // 자동재생 중지

		slideIssue.style.transition = 'all 1s ease-in-out'
		slideIssue.style.transform = `translateX(-${480 * curIndex}px`;

		curIndex--;

		pageNum.textContent = curIndex + 1;

		if (curIndex === -1) {
			setTimeout(() => {
				slideIssue.style.transition = '0s';
				slideIssue.style.transform = 'translateX(-2880px)';
			},1001);
			curIndex = slideLen - 1;
			pageNum.textContent = curIndex + 1;
		};
	});

	// 재생버튼 클릭시 자동재생	
	let setting2; // clear를 위한 전역함수 선언

	function autoPlay2() {
		setting2 = setInterval(() => {
			slideIssue.style.transition = 'all 1s ease-in-out'
			slideIssue.style.transform = `translateX(-${480 * (curIndex + 2)}px`;
			
			++curIndex;

			pageNum.textContent = curIndex + 1		
			
			if(curIndex === slideLen) {
				setTimeout(() => {
					slideIssue.style.transition = '0s';
					slideIssue.style.transform = 'translateX(-480px)';
				},1001);
				curIndex = 0;
				pageNum.textContent = curIndex + 1
			};
		}, 5000);
	};
	pagePlay.addEventListener('click', () => {
		pagePlay.style.display = 'none';
		pageStop.style.display = 'block';
		autoPlay2();
	});

	// 정지버튼 클릭시 자동재생 중지
	pageStop.addEventListener('click', () => {
		pageStop.style.display = 'none';
		pagePlay.style.display = 'block';
		clearInterval(setting2);
	});

// footer
	const footerTop = document.querySelector('.footer_top');
	const footerSub = footerTop.querySelector('ul.footer_sub');
	const btnListClose = footerTop.querySelector('.btn_list_close');

	footerSub.addEventListener('click', () => {
		footerTop.classList.add('active');
	});
	btnListClose.addEventListener('click', () => {
		footerTop.classList.remove('active');
	});