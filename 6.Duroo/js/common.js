// header
	// search wrap
	const btnSearch = document.querySelector('.btn_search');
	const searchWrap = document.querySelector('.search_wrap');
	const btnClose = document.querySelector('.btn_close');

	btnSearch.addEventListener('click', () => {
		searchWrap.style.display = 'block';
		btnClose.style.display = 'block';

		btnClose.addEventListener('click', () => {
			searchWrap.style.display = 'none';
			btnClose.style.display = 'none';
		});
	});

	// site list
	const nav = document.querySelector('nav');
	const btnList = document.querySelector('.btn_list');
	const siteListWrap = document.querySelector('.site_list_wrap');
	const siteListLis = document.querySelectorAll('.site_list > li');
	const siteListLiA = document.querySelectorAll('.site_list > li > a');
	
	btnList.addEventListener('click', () => {
		nav.classList.add('none');
		siteListWrap.style.display = 'block';
		btnClose.style.display = 'block';

		if ( window.innerWidth < 768 ) {
			for (let i = 0; i < siteListLiA.length - 1; i++) {
				siteListLiA[i].href = 'javascript:;'
				siteListLiA[i].onclick = () => {
					siteListLis[i].classList.toggle('active');
				}
			}
		}

		btnClose.addEventListener('click', () => {
			nav.classList.remove('none');
			siteListWrap.style.display = 'none';
			btnClose.style.display = 'none';
		});
	});

// main
	// 최상단 슬라이드
	const slideList = document.querySelector('.slide_list');
	const slidePage = slideList.querySelectorAll('.slide_page');
	const slideLen = slidePage.length;
	const slidePageWidth = 100 / (slideLen + 1); // li 너비 계산
	const btnSlide = document.querySelectorAll('.btn_slide');
	let curIndex = 0;
	let curBtn = btnSlide[curIndex];
	curBtn.classList.add('active');

	slideList.style.width = `${100 * (slideLen + 1)}%`; // ul 너비 지정
	slidePage.forEach((element) => {
		element.style.width = `${slidePageWidth}%`;
	}); // li 너비 지정

	// 마지막 슬라이드 뒤에 첫번째 슬라이드 붙이기
	const slidePageFirst = slideList.firstElementChild.cloneNode(true);
	slideList.appendChild(slidePageFirst);

	// 페이지 로드되면 자동재생
	let setting; // clear를 위한 전역함수 선언

	function autoPlay() {
		setting = setInterval(() => {
			slideList.style.transition = '.5s';
			slideList.style.transform = `translateX(-${slidePageWidth * (curIndex + 1)}%`;
			
			curBtn.classList.remove('active');

			curBtn = btnSlide[++curIndex];				
			
			if(curIndex === slideLen) {
				setTimeout(() => {
					slideList.style.transition = '0s';
					slideList.style.transform = 'translateX(0)';
				},501);
				curIndex = 0;
				curBtn = btnSlide[0];
			};

			curBtn.classList.add('active');
		}, 7000);
	};

	document.addEventListener("DOMContentLoaded", () => {
		autoPlay();
	});

	// 버튼 클릭시 슬라이드 이동
	for (let i = 0; i < slideLen; i++) {
		btnSlide[i].onclick = () => {
			slideList.style.transition = '.5s';
			slideList.style.transform = `translateX(-${slidePageWidth * i}%`; // 클릭한 슬라이드로 이동
			
			clearInterval(setting); // 자동재생 중지

			curBtn.classList.remove('active'); // 자동재생되던 곳 active 제거
			btnSlide[i].classList.add('active'); // 클릭한 곳 active 추가
			
			curIndex = i; // 흐름이 이어지도록 curIndex 설정
			
			setTimeout(() => {
				btnSlide[i].classList.remove('active'); 
			}, 7000); // 7초 뒤 클릭한 곳 active 제거
			
			autoPlay(); // 자동재생 다시 실행
		}
	}

	// 함께하는 사람들
	const peopleList = document.querySelector('.people_list');
	const peopleInfo = document.querySelectorAll('.people_info');
	const peopleInfoWidth = 25 / 4;
	const peopleLen = peopleInfo.length;
	const btnPeopleNext = document.querySelector('.btn_people_next');
	const btnPeoplePrev = document.querySelector('.btn_people_prev');
	let curIdx = 0;
	let click = true;

	// 슬라이드 붙이기
	const peopleInfoFirst = peopleList.firstElementChild.cloneNode(true);
	const peopleInfoFirst2 = peopleList.children[1].cloneNode(true);
	const peopleInfoFirst3 = peopleList.children[2].cloneNode(true);
	const peopleInfoFirst4 = peopleList.children[3].cloneNode(true);
	const peopleInfoLast = peopleList.lastElementChild.cloneNode(true);
	const peopleInfoLast2 = peopleList.children[6].cloneNode(true);
	const peopleInfoLast3 = peopleList.children[5].cloneNode(true);
	const peopleInfoLast4 = peopleList.children[4].cloneNode(true);
	peopleList.appendChild(peopleInfoFirst);
	peopleList.appendChild(peopleInfoFirst2);
	peopleList.appendChild(peopleInfoFirst3);
	peopleList.appendChild(peopleInfoFirst4);
	peopleList.insertBefore(peopleInfoLast, peopleList.firstElementChild);
	peopleList.insertBefore(peopleInfoLast2, peopleList.firstElementChild);
	peopleList.insertBefore(peopleInfoLast3, peopleList.firstElementChild);
	peopleList.insertBefore(peopleInfoLast4, peopleList.firstElementChild);

	peopleList.style.transform = `translateX(-${peopleInfoWidth * 4}%` // ul 초기위치 지정

	peopleInfo.forEach((element) => { // li 너비 지정
		element.style.width = `${peopleInfoWidth}%`;
	})

	// 붙인 슬라이드 너비 지정
	peopleInfoFirst.style.width = `${peopleInfoWidth}%`;
	peopleInfoFirst2.style.width = `${peopleInfoWidth}%`;
	peopleInfoFirst3.style.width = `${peopleInfoWidth}%`;
	peopleInfoFirst4.style.width = `${peopleInfoWidth}%`;
	peopleInfoLast.style.width = `${peopleInfoWidth}%`;
	peopleInfoLast2.style.width = `${peopleInfoWidth}%`;
	peopleInfoLast3.style.width = `${peopleInfoWidth}%`;
	peopleInfoLast4.style.width = `${peopleInfoWidth}%`;

	// 초기실행
	if ( window.innerWidth < 1280) {
		peopleList.style.width = `${50 * (peopleLen + 8)}%`; // ul 너비 지정
	} else {
		peopleList.style.width = `${25 * (peopleLen + 8)}%`; // ul 너비 지정
	}

	// window 넓이
	window.addEventListener('resize', () => {
		winSize = window.innerWidth;

		if ( winSize < 1280) {
			peopleList.style.width = `${50 * (peopleLen + 8)}%`; // ul 너비 지정
		} else {
			peopleList.style.width = `${25 * (peopleLen + 8)}%`; // ul 너비 지정
		}
	})

	// 페이지 로드되면 자동재생
	let settingPeople; // clear를 위한 전역함수 선언

	function autoPlayPeople() {
		settingPeople = setInterval(() => {
			peopleList.style.transition = '.7s';
			peopleList.style.transform = `translateX(-${peopleInfoWidth * (curIdx + 5)}%`;
			
			++curIdx;				
			
			if (curIdx === peopleLen) {
				setTimeout(() => {
					peopleList.style.transition = '0s';
					peopleList.style.transform = `translateX(-${peopleInfoWidth * 4}%`;
				}, 701);
				curIdx = 0;
			};
		}, 5000);
	};

	document.addEventListener("DOMContentLoaded", () => {
		autoPlayPeople();
	});

	// 다음 페이지로 이동
	function nextPeople() {
		peopleList.style.transition = '.7s';
		peopleList.style.transform = `translateX(-${peopleInfoWidth * (curIdx + 5)}%`;

		++curIdx;		

		if (curIdx === peopleLen) {
			setTimeout(() => {
				peopleList.style.transition = '0s';
				peopleList.style.transform = `translateX(-${peopleInfoWidth * 4}%`;
			}, 701);
			curIdx = 0;
		};
	};

	// 다음버튼 클릭
	btnPeopleNext.addEventListener('click', () => {
		if (click) {
			clearInterval(settingPeople); // 자동재생 중지
			
			nextPeople();

			autoPlayPeople();

			click = !click;

			// transition(.7s) 완료 후 클릭이 또 가능하도록
			setTimeout(() => {
				click = true;
			}, 700)
		}		
	});

	// 이전 페이지로 이동
	function prevPeople() {
		peopleList.style.transition = '.7s';
		peopleList.style.transform = `translateX(-${peopleInfoWidth * (curIdx + 3)}%`;

		--curIdx;

		if (curIdx === -4) {
			setTimeout(() => {
				peopleList.style.transition = '0s';
				peopleList.style.transform = `translateX(-${peopleInfoWidth * peopleLen}%`;
			}, 701);
			curIdx = peopleLen / 2;
		};
	};

	// 이전버튼 클릭
	btnPeoplePrev.addEventListener('click', () => {
		if (click) {
			clearInterval(settingPeople); // 자동재생 중지
			
			prevPeople();

			autoPlayPeople();

			click = !click;

			// transition(.7s) 완료 후 클릭이 또 가능하도록
			setTimeout(() => {
				click = true;
			}, 700)
		}
	});

// footer
	// 면책공고
	const footerPopupImmunity = document.querySelector('.footer_popup.immunity');
	const btnFooterClose = document.querySelector('.btn_footer_close');

	function immunity() {
		footerPopupImmunity.style.display = 'block';
	};
	function immunityClose() {
		footerPopupImmunity.style.display = 'none';
	};

	// 웹접근성안내
	const footerPopupAccesibility = document.querySelector('.footer_popup.accesibility');

	function accesibility() {
		footerPopupAccesibility.style.display = 'block';
	};
	function accesibilityClose() {
		footerPopupAccesibility.style.display = 'none';
	};