// header
	// gnb 호버 시 lnb출력
	const gnb = document.querySelector('ul.gnb');
	const bgLnb = document.querySelector('.bg_lnb');

	gnb.addEventListener('mouseenter', () => {
		gnb.classList.add('hover');
		bgLnb.classList.add('active');
	});
	gnb.addEventListener('mouseleave', () => {
		gnb.classList.remove('hover');
		bgLnb.classList.remove('active');
	});

	// 스크롤에 따른 헤더변화
	const html = document.querySelector('html');
	const headerMain = html.querySelector('.header.main');
	let lastScroll = 0;

	window.addEventListener('scroll', () => {
		let scrollValue = html.scrollTop;

		if (scrollValue > 112) {
			if (scrollValue > lastScroll) {
				headerMain.style.display = 'block';
				headerMain.classList.add('fix');
			} else {
				headerMain.style.display = 'none';
			}
		} else {
			headerMain.style.display = 'block';
			headerMain.classList.remove('fix');
		}

		lastScroll = scrollValue;
	});

	// 사이트맵 열고 닫기
	const menuM = document.querySelector('.menu_m');
	const sitemap = menuM.querySelector('.sitemap');
	
	menuM.addEventListener('click', () => {
		menuM.classList.toggle('active');
	});

// main
	// 최상단 슬라이드
	const slideList = document.querySelector('ul.slide_list');
	const slideBlock = document.querySelectorAll('.slide_block');
	const slideLen = slideBlock.length; // li 길이
	const slideBlockWidth = 100 / (slideLen + 1); // li 너비 계산
	const btnSlide = document.querySelectorAll('.btn_slide');
	let curIndex = 0;
	let curBtn = btnSlide[curIndex];
	curBtn.classList.add('active');

	slideList.style.width = `${100 * (slideLen + 1)}%`; // ul 너비 지정
	slideBlock.forEach((element) => {
		element.style.width = `${slideBlockWidth}%`;
	}); // li 너비 지정

	// 마지막 슬라이드 뒤에 첫번째 슬라이드 붙이기
	const slideBlockFirst = slideList.firstElementChild.cloneNode(true);
	slideList.appendChild(slideBlockFirst);

	// 페이지 로드되면 자동재생
	let setting; // clear를 위한 전역함수 선언

	function autoPlay() {
		setting = setInterval(() => {
			slideList.style.transition = '.5s';
			slideList.style.transform = `translateX(-${slideBlockWidth * (curIndex + 1)}%`;
			
			curBtn.classList.remove('active');
			curBtn = btnSlide[++curIndex];				
			
			if(curIndex === slideLen) {
				setTimeout(() => {
					slideList.style.transition = '0s';
					slideList.style.transform = 'translateX(0)';
				}, 501);
				curIndex = 0;
				curBtn = btnSlide[0];
			};

			curBtn.classList.add('active');
		}, 5000);
	};

	document.addEventListener("DOMContentLoaded", () => {
		autoPlay();
	});

	// 자동재생 정지 & 다시재생
	const btnAutoPause = document.querySelector('.btn_auto.pause');
	const btnAutoPlay = document.querySelector('.btn_auto.play');

	btnAutoPause.addEventListener('click', () => {
		btnAutoPause.style.display = 'none';
		btnAutoPlay.style.display = 'block';
		clearInterval(setting);
	});

	btnAutoPlay.addEventListener('click', () => {
		btnAutoPause.style.display = 'block';
		btnAutoPlay.style.display = 'none';
		autoPlay();
	});

	// 버튼 클릭시 슬라이드 이동
	for (let i = 0; i < slideLen; i++){
		btnSlide[i].onclick = () => {
			if ( btnAutoPlay.style.display === 'block' ) {
				slideList.style.transition = '.5s';
				slideList.style.transform = `translateX(-${slideBlockWidth * i}%`; // 클릭한 슬라이드로 이동
			
				clearInterval(setting); // 자동재생 중지

				for (let i = 0; i < slideLen; i++) {
					btnSlide[i].classList.remove('active');
				}; // active 전체 제거

				btnSlide[i].classList.add('active'); // 클릭한 곳 active 추가

				curIndex = i; // 흐름이 이어지도록 curIndex 설정
			} // 자동재생이 멈춰있을 경우

			else {
				slideList.style.transition = '.5s';
				slideList.style.transform = `translateX(-${slideBlockWidth * i}%`; // 클릭한 슬라이드로 이동
				
				clearInterval(setting); // 자동재생 중지
				curBtn.classList.remove('active'); // 자동재생되던 곳 active 제거
				btnSlide[i].classList.add('active'); // 클릭한 곳 active 추가
				
				curIndex = i; // 흐름이 이어지도록 curIndex 설정
				
				setTimeout(() => {
					btnSlide[i].classList.remove('active'); 
				},5000); // 3초 뒤 클릭한 곳 active 제거
				
				autoPlay(); // 자동재생 다시 실행
			} // 자동재생이 실행중일 경우	
		}
	};

// footer
	// 인포 열고닫기
	const footerInfoM = document.querySelector('.footer_info_m');
	const btnInfo = footerInfoM.querySelector('.btn_info');
	
	btnInfo.addEventListener('click', () => {
		footerInfoM.classList.toggle('active');
	});