// 초기 선언
const slideListArea = document.querySelector('.slide_list_area');
const slideList = slideListArea.querySelector('ul.slide_list');
const slidePage = slideList.querySelectorAll('.slide_page');
const slideLen = slidePage.length; // 슬라이드 총 길이
const btnSlideArea = slideListArea.querySelector('.btn_slide_area');
const btnSlide = btnSlideArea.querySelectorAll('.btn_slide');
const btnPlay = btnSlideArea.querySelector('.btn.play');
const btnStop = btnSlideArea.querySelector('.btn.stop');
const btnSlideAreaVertical = slideListArea.querySelector('.btn_slide_area_vertical');
const btnSlideVertical = btnSlideAreaVertical.querySelectorAll('.btn_slide_vertical');
const btnPlayVertical = btnSlideAreaVertical.querySelector('.btn.play_vertical');
const btnStopVertical = btnSlideAreaVertical.querySelector('.btn.stop_vertical');
const btnNext = slideListArea.querySelector('.btn.next');
const btnNextVertical = slideListArea.querySelector('.btn.next_vertical');
const btnPrev = slideListArea.querySelector('.btn.prev');
const btnPrevVertical = slideListArea.querySelector('.btn.prev_vertical');
let curIndex = 0;
let click = true;
let curBtn = btnSlide[curIndex]; // 활성화 버튼 선언
let curBtnVertical = btnSlideVertical[curIndex]; // 활성화 버튼 선언
let curSlide = slidePage[curIndex]; // 활성화 슬라이드 선언
let setting; // clear를 위한 전역함수 선언
let settingVertical; // clear를 위한 전역함수 선언

// setting으로 받을 값 선언
const btnDirectHori = document.querySelector('.direction.hori');
const btnDirectVerti = document.querySelector('.direction.verti');
let slideWidth = 1000; // 슬라이드 가로넓이 초기값
let slideHeight = 400; // 슬라이드 세로높이 초기값
let playSpeed = 3; // 속도 초기값
const loops = document.getElementsByName('loop');
let loop_value = 'infinite'; // 초기값 무한루프
const mouses = document.getElementsByName('mouse');
let mouse_value = 'ignore'; // 초기값 이벤트없음

// 초기 setting
btnStop.style.display = 'none';
btnStopVertical.style.display = 'none';
btnSlideArea.style.display = 'none';
btnSlideAreaVertical.style.display = 'none';
btnNext.style.display = 'none';
btnNextVertical.style.display = 'none';
btnPrev.style.display = 'none';
btnPrevVertical.style.display = 'none';

slideListArea.style.width = `${slideWidth}px`; // area 가로넓이 지정
slideListArea.style.height = `${slideHeight}px`; // area 세로높이 지정
slideList.style.width = `${slideWidth * (slideLen + 2)}px`; // ul 가로넓이 지정
slideList.style.transform = `translate(-${slideWidth}px, 0)`; // 초기 ul 위치
slidePage.forEach((element) => {
	element.style.width = `${slideWidth}px`;
}); // li 가로넓이 지정

curBtn.classList.add('active');
curBtnVertical.classList.add('active');
curSlide.classList.add('active');

// 슬라이드 양 끝에 슬라이드 복제하기
const slidePageFirst = slideList.firstElementChild.cloneNode(true);
const slidePageLast = slideList.lastElementChild.cloneNode(true);
slideList.appendChild(slidePageFirst);
slideList.insertBefore(slidePageLast, slideList.firstElementChild);

slideList.lastElementChild.classList.remove('active'); // 복제된 슬라이드로부터 따라온 active 제거

// 슬라이드의 가로넓이
function slideWidthSetting() {
	slideWidth = document.getElementById('slide_width').value; // 입력된 값 선언

	// setting
	slideListArea.style.width = `${slideWidth}px`; // area 가로넓이 지정
	slideList.style.width = `${slideWidth * (slideLen + 2)}px`; // ul 가로넓이 지정
	slideList.style.transform = `translate(-${slideWidth}px, 0)`; // 초기 ul 위치
	slidePage.forEach((element) => {
		element.style.width = `${slideWidth}px`;
	}); // li 가로넓이 지정
	slideList.firstElementChild.style.width = `${slideWidth}px`; // 복제된 슬라이드 설정
	slideList.lastElementChild.style.width = `${slideWidth}px`; // 복제된 슬라이드 설정
}

// 슬라이드의 세로높이
function slideHeightSetting() {
	slideHeight = document.getElementById('slide_height').value; // 입력된 값 선언

	// setting
	slideListArea.style.height = `${slideHeight}px`; // area 세로높이 지정
	slidePage.forEach((element) => {
		element.style.height = `${slideHeight}px`;
	}); // li 세로높이 지정
	slideList.firstElementChild.style.height = `${slideHeight}px`; // 복제된 슬라이드 설정
	slideList.lastElementChild.style.height = `${slideHeight}px`; // 복제된 슬라이드 설정
}

// 슬라이드 초기화함수
function slideIniSetting() {
	clearInterval(setting);
	btnStop.style.display = 'none';
	btnPlay.style.display = 'block';

	clearInterval(settingVertical);
	btnStopVertical.style.display = 'none';
	btnPlayVertical.style.display = 'block';

	curIndex = 0;
	curSlide = slidePage[0];

	if (btnDirectHori.style.borderColor === 'black') { // 수평방향
		curBtn = btnSlide[0];
		slideList.style.transform = `translate(-${slideWidth}px, 0)`;

		for (let i = 0; i < slideLen; i++) {
			btnSlide[i].classList.remove('active');
			slidePage[i].classList.remove('active');
		}; // active 전체 제거
		curBtn.classList.add('active');
	} else { // 수직방향
		curBtnVertical = btnSlideVertical[0];
		slideList.style.transform = `translate(0, -${slideHeight}px)`;

		for (let i = 0; i < slideLen; i++) {
			btnSlideVertical[i].classList.remove('active');
			slidePage[i].classList.remove('active');
		}; // active 전체 제거
		curBtnVertical.classList.add('active');
	}
	curSlide.classList.add('active');
}

// 자동재생 시 속도 함수
function playSpeedSetting() {
	playSpeed = document.getElementById('play_speed').value; // 입력된 값 선언

	// setting
	clearInterval(setting);
	btnStop.style.display = 'none';
	btnPlay.style.display = 'block';

	clearInterval(settingVertical);
	btnStopVertical.style.display = 'none';
	btnPlayVertical.style.display = 'block';
}

// 자동재생 시 횟수 함수
function playLoopSetting() {
	// 입력된 값 선언
	for (let i = 0; i < loops.length; i++) {
		if (loops[i].checked) {
			loop_value = loops[i].value;
		}
	}

	// setting
	slideIniSetting();
}

// 마우스를 올릴 경우
function mouseEventSetting() {
	// 입력된 값 선언
	for (let i = 0; i < mouses.length; i++) {
		if (mouses[i].checked) {
			mouse_value = mouses[i].value;
		}
	}

	// setting
	slideIniSetting();
}

function mouseEnterStop() {
	clearInterval(setting);
}

function mouseLeavePlay() {
	autoPlay();
}

function mouseEnterStopVerti() {
	clearInterval(settingVertical);
}

function mouseLeavePlayVerti() {
	autoPlayVertical();
}

// 자동재생 설정 - 수평방향
function autoPlay() {
	if (loop_value === 'infinite') { // 무한루프
		setting = setInterval(() => {
			for (let i = 0; i < slideLen; i++) {
				btnSlide[i].classList.remove('active');
				slidePage[i].classList.remove('active');
			}; // active 전체 제거

			slideList.style.transition = '.5s';
			slideList.style.transform = `translate(-${slideWidth * (curIndex + 2)}px, 0)`;
			
			curBtn.classList.remove('active'); // 지나간 슬라이드
			curSlide.classList.remove('active'); // 지나간 슬라이드

			++curIndex;

			curBtn = btnSlide[curIndex];
			curSlide = slidePage[curIndex];					

			if (curIndex === slideLen) {
				setTimeout(() => {
					slideList.style.transition = '0s';
					slideList.style.transform = `translate(-${slideWidth}px, 0)`;
				}, 501);
				curIndex = 0;
				curBtn = btnSlide[0];
				curSlide = slidePage[0];
			};

			curBtn.classList.add('active');
			curSlide.classList.add('active');

			if (mouse_value === 'pause') { // 마우스를 올릴 경우 일시정지
				slideListArea.addEventListener('mouseenter', mouseEnterStop);
				slideListArea.addEventListener('mouseleave', mouseLeavePlay);
			}
		}, playSpeed * 1000);
	} else { // 1회만 재생
		if (curIndex === slideLen - 1) { // 1회 재생 완료 후 다시 재생시 위치 초기화
			slideList.style.transform = `translate(-${slideWidth}px, 0)`;
			curIndex = 0;
			curBtn = btnSlide[0];
			curSlide = slidePage[0];

			for (let i = 0; i < slideLen; i++) {
				btnSlide[i].classList.remove('active');
				slidePage[i].classList.remove('active');
			}; // active 전체 제거

			curBtn.classList.add('active');
			curSlide.classList.add('active');
		}
		
		setting = setInterval(() => {
			for (let i = 0; i < slideLen; i++) {
				btnSlide[i].classList.remove('active');
				slidePage[i].classList.remove('active');
			}; // active 전체 제거

			slideList.style.transition = '.5s';
			slideList.style.transform = `translate(-${slideWidth * (curIndex + 2)}px, 0)`;
			
			curBtn.classList.remove('active'); // 지나간 슬라이드
			curSlide.classList.remove('active'); // 지나간 슬라이드

			++curIndex;

			curBtn = btnSlide[curIndex];
			curSlide = slidePage[curIndex];					

			if (curIndex === slideLen - 1) {
				clearInterval(setting); // 자동재생 중지

				btnStop.style.display = 'none';
				btnPlay.style.display = 'block';
			};

			curBtn.classList.add('active');
			curSlide.classList.add('active');

			if (mouse_value === 'pause') { // 마우스를 올릴 경우 일시정지
				slideListArea.addEventListener('mouseenter', mouseEnterStop);
				slideListArea.addEventListener('mouseleave', mouseLeavePlay);
			}
		}, playSpeed * 1000);
	}
};

// 자동재생 재시작을 위한 선언 - 수평방향
let rePlaySet; // clear를 위한 전역함수 선언

function rePlay() {
	rePlaySet = setTimeout(() => {
		autoPlay(); 
	}, (playSpeed * 1000) - 1000);
};

// 자동재생 설정 - 수직방향
function autoPlayVertical() {
	if (loop_value === 'infinite') { // 무한루프
		settingVertical = setInterval(() => {
			for (let i = 0; i < slideLen; i++) {
				btnSlideVertical[i].classList.remove('active');
				slidePage[i].classList.remove('active');
			}; // active 전체 제거

			slideList.style.transition = '.5s';
			slideList.style.transform = `translate(0, -${slideHeight * (curIndex + 2)}px)`;
			
			curBtnVertical.classList.remove('active'); // 지나간 슬라이드
			curSlide.classList.remove('active'); // 지나간 슬라이드

			++curIndex;

			curBtnVertical = btnSlideVertical[curIndex];
			curSlide = slidePage[curIndex];					

			if (curIndex === slideLen) {
				setTimeout(() => {
					slideList.style.transition = '0s';
					slideList.style.transform = `translate(0, -${slideHeight}px)`;
				}, 501);
				curIndex = 0;
				curBtnVertical = btnSlideVertical[0];
				curSlide = slidePage[0];
			};

			curBtnVertical.classList.add('active');
			curSlide.classList.add('active');

			if (mouse_value === 'pause') { // 마우스를 올릴 경우 일시정지
				slideListArea.addEventListener('mouseenter', mouseEnterStopVerti);
				slideListArea.addEventListener('mouseleave', mouseLeavePlayVerti);
			}
		}, playSpeed * 1000);
	} else { // 1회만 재생
		if (curIndex === slideLen - 1) { // 1회 재생 완료 후 다시 재생시 위치 초기화
			slideList.style.transform = `translate(0, -${slideHeight}px)`;

			curIndex = 0;
			curBtnVertical = btnSlideVertical[0];
			curSlide = slidePage[0];

			for (let i = 0; i < slideLen; i++) {
				btnSlideVertical[i].classList.remove('active');
				slidePage[i].classList.remove('active');
			}; // active 전체 제거

			curBtnVertical.classList.add('active');
			curSlide.classList.add('active');
		}

		settingVertical = setInterval(() => {
			for (let i = 0; i < slideLen; i++) {
				btnSlideVertical[i].classList.remove('active');
				slidePage[i].classList.remove('active');
			}; // active 전체 제거

			slideList.style.transition = '.5s';
			slideList.style.transform = `translate(0, -${slideHeight * (curIndex + 2)}px)`;
			
			curBtnVertical.classList.remove('active'); // 지나간 슬라이드
			curSlide.classList.remove('active'); // 지나간 슬라이드

			++curIndex;

			curBtnVertical = btnSlideVertical[curIndex];
			curSlide = slidePage[curIndex];					

			if (curIndex === slideLen - 1) {
				clearInterval(settingVertical); // 자동재생 중지

				btnStopVertical.style.display = 'none';
				btnPlayVertical.style.display = 'block';
			};

			curBtnVertical.classList.add('active');
			curSlide.classList.add('active');

			if (mouse_value === 'pause') { // 마우스를 올릴 경우 일시정지
				slideListArea.addEventListener('mouseenter', mouseEnterStopVerti);
				slideListArea.addEventListener('mouseleave', mouseLeavePlayVerti);
			}
		}, playSpeed * 1000);
	}
};

// 자동재생 재시작을 위한 선언 - 수직방향
let rePlaySetVertical; // clear를 위한 전역함수 선언

function rePlayVertical() {
	rePlaySetVertical = setTimeout(() => {
		autoPlayVertical(); 
	}, (playSpeed * 1000) - 1000);
};

// 다음 페이지로 이동 - 수평방향
function nextPage() {
	slideList.style.transition = '.5s';
	slideList.style.transform = `translate(-${slideWidth * (curIndex + 2)}px, 0)`;

	for (let i = 0; i < slideLen; i++) {
		btnSlide[i].classList.remove('active');
		slidePage[i].classList.remove('active');
	}; // active 전체 제거

	++curIndex;

	curBtn = btnSlide[curIndex];
	curSlide = slidePage[curIndex];			

	if (curIndex === slideLen) {
		setTimeout(() => {
			slideList.style.transition = '0s';
			slideList.style.transform = `translate(-${slideWidth}px, 0)`;
		}, 501);
		curIndex = 0;
		curBtn = btnSlide[0];
		curSlide = slidePage[0];
	};

	curBtn.classList.add('active');
	curSlide.classList.add('active');
};

// 다음 페이지로 이동 - 수직방향
function nextPageVertical() {
	slideList.style.transition = '.5s';
	slideList.style.transform = `translate(0, -${slideHeight * (curIndex + 2)}px)`;

	for (let i = 0; i < slideLen; i++) {
		btnSlideVertical[i].classList.remove('active');
		slidePage[i].classList.remove('active');
	}; // active 전체 제거

	++curIndex;

	curBtnVertical = btnSlideVertical[curIndex];
	curSlide = slidePage[curIndex];			

	if (curIndex === slideLen) {
		setTimeout(() => {
			slideList.style.transition = '0s';
			slideList.style.transform = `translate(0, -${slideHeight}px)`;
		}, 501);
		curIndex = 0;
		curBtnVertical = btnSlideVertical[0];
		curSlide = slidePage[0];
	};

	curBtnVertical.classList.add('active');
	curSlide.classList.add('active');
};

// 이전 페이지로 이동 - 수평방향
function prevPage() {
	slideList.style.transition = '.5s';
	slideList.style.transform = `translate(-${slideWidth * curIndex}px, 0)`;

	for (let i = 0; i < slideLen; i++) {
		btnSlide[i].classList.remove('active');
		slidePage[i].classList.remove('active');
	}; // active 전체 제거

	--curIndex;

	curBtn = btnSlide[curIndex];
	curSlide = slidePage[curIndex];

	if (curIndex === -1) {
		setTimeout(() => {
			slideList.style.transition = '0s';
			slideList.style.transform = `translate(-${slideWidth * slideLen}px, 0)`;
		}, 501);
		curIndex = slideLen - 1;
		curBtn = btnSlide[slideLen - 1];
		curSlide = slidePage[slideLen - 1];
	};

	curBtn.classList.add('active');
	curSlide.classList.add('active');
};

// 이전 페이지로 이동 - 수직방향
function prevPageVertical() {
	slideList.style.transition = '.5s';
	slideList.style.transform = `translate(0, -${slideHeight * curIndex}px)`;

	for (let i = 0; i < slideLen; i++) {
		btnSlideVertical[i].classList.remove('active');
		slidePage[i].classList.remove('active');
	}; // active 전체 제거

	--curIndex;

	curBtnVertical = btnSlideVertical[curIndex];
	curSlide = slidePage[curIndex];

	if (curIndex === -1) {
		setTimeout(() => {
			slideList.style.transition = '0s';
			slideList.style.transform = `translate(0, -${slideHeight * slideLen}px)`;
		},501);
		curIndex = slideLen - 1;
		curBtnVertical = btnSlideVertical[slideLen - 1];
		curSlide = slidePage[slideLen - 1];
	};

	curBtnVertical.classList.add('active');
	curSlide.classList.add('active');
};

// 수평방향 클릭
function horizontalSetting() {
	// setting
	clearInterval(setting);
	clearInterval(settingVertical);

	for (let i = 0; i < slideLen; i++) {
		btnSlide[i].classList.remove('active');
		slidePage[i].classList.remove('active');
	}; // active 전체 제거

	btnDirectHori.style.border = '2px solid black';
	btnDirectVerti.style.border = '1px solid #d8d8d8';
	btnSlideArea.style.display = 'block';
	btnSlideAreaVertical.style.display = 'none';
	btnStop.style.display = 'none';
	btnPlay.style.display = 'block';
	btnNext.style.display = 'block';
	btnNextVertical.style.display = 'none';
	btnPrev.style.display = 'block';
	btnPrevVertical.style.display = 'none';
	
	curIndex = 0;
	curBtn = btnSlide[0].classList.add('active');
	curSlide = slidePage[0].classList.add('active');
	curBtn = btnSlide[curIndex]
	curSlide = slidePage[curIndex]

	slideList.style.transform = `translate(-${slideWidth}px, 0)`;
	slideList.style.width = `${slideWidth * (slideLen + 2)}px`;

	slidePage.forEach((element) => {
		element.style.cssFloat = 'left';
	}); // float 설정
	slideList.firstElementChild.style.cssFloat = 'left'; // 복제된 슬라이드 설정
	slideList.lastElementChild.style.cssFloat = 'left'; // 복제된 슬라이드 설정

	// 자동재생 시작 & 중지
	btnPlay.addEventListener('click', () => {
		btnStop.style.display = 'block';
		btnPlay.style.display = 'none';
		autoPlay();
	});

	btnStop.addEventListener('click', () => {
		btnStop.style.display = 'none';
		btnPlay.style.display = 'block';
		clearInterval(setting);
	});

	// 다음버튼 클릭
	btnNext.addEventListener('click', () => {
		if ( btnStop.style.display === 'none' ) { // 자동재생이 멈춰있을 경우
			if (click) {
				nextPage();

				click = !click;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click = true;
				}, 500);
			}	
		} else { // 자동재생이 실행중일 경우
			if (click) {
				clearInterval(setting); // 자동재생 중지
				clearTimeout(rePlaySet); // 자동재생 재시작 중지
				
				nextPage();

				setTimeout(() => {
					// 1초 딜레이 (재시작과 중지가 동시에 일어나 무산되지 않도록)
				}, 1000);

				rePlay(); // 1초 뒤 자동재생 재시작

				click = !click;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click = true;
				}, 500)
			}
		} 		
	});
	
	// 이전버튼 클릭
	btnPrev.addEventListener('click', () => {
		if ( btnStop.style.display === 'none' ) { // 자동재생이 멈춰있을 경우
			if (click) {
				prevPage();

				click = !click;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click = true;
				}, 500);
			}
		} else { // 자동재생이 실행중일 경우
			if (click) {
				clearInterval(setting); // 자동재생 중지
				clearTimeout(rePlaySet); // 자동재생 재시작 중지
				
				prevPage();

				setTimeout(() => {
					// 1초 딜레이 (재시작과 중지가 동시에 일어나 무산되지 않도록)
				}, 1000);

				rePlay(); // 1초 뒤 자동재생 재시작

				click = !click;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click = true;
				}, 500)
			}
		}
	});

	// 버튼 클릭시 슬라이드 이동
	for (let i = 0; i < slideLen; i++) {
		btnSlide[i].onclick = () => {
			if ( btnStop.style.display === 'none' ) { // 자동재생이 멈춰있을 경우
				slideList.style.transition = '.5s';
				slideList.style.transform = `translate(-${slideWidth * (i + 1)}px, 0)`; // 클릭한 슬라이드로 이동

				for (let i = 0; i < slideLen; i++) {
					btnSlide[i].classList.remove('active');
					slidePage[i].classList.remove('active');
				}; // active 전체 제거

				btnSlide[i].classList.add('active'); // 클릭한 곳 active 추가
				slidePage[i].classList.add('active'); // 클릭한 곳 active 추가

				curIndex = i; // 흐름이 이어지도록 curIndex 설정
			} else { // 자동재생이 실행중일 경우
				slideList.style.transition = '.5s';
				slideList.style.transform = `translate(-${slideWidth * (i + 1)}px, 0)`; // 클릭한 슬라이드로 이동
				
				clearInterval(setting); // 자동재생 중지
				curBtn.classList.remove('active'); // 자동재생되던 곳 active 제거
				curSlide.classList.remove('active'); // 자동재생되던 곳 active 제거
				btnSlide[i].classList.add('active'); // 클릭한 곳 active 추가
				slidePage[i].classList.add('active'); // 클릭한 곳 active 추가

				curIndex = i; // 흐름이 이어지도록 curIndex 설정
				
				setTimeout(() => {
					btnSlide[i].classList.remove('active'); 
					slidePage[i].classList.remove('active');
				}, playSpeed * 1000); // n초 뒤 클릭한 곳 active 제거
				
				autoPlay(); // 자동재생 다시 실행
			}
		}
	}
}

// 수직방향 클릭
function verticalSetting() {
	// setting
	clearInterval(setting);
	clearInterval(settingVertical);

	for (let i = 0; i < slideLen; i++) {
		btnSlideVertical[i].classList.remove('active');
		slidePage[i].classList.remove('active');
	}; // active 전체 제거

	btnDirectHori.style.border = '1px solid #d8d8d8';
	btnDirectVerti.style.border = '2px solid black';
	btnSlideArea.style.display = 'none';
	btnSlideAreaVertical.style.display = 'block';
	btnStopVertical.style.display = 'none';
	btnPlayVertical.style.display = 'block';
	btnNext.style.display = 'none';
	btnNextVertical.style.display = 'block';
	btnPrev.style.display = 'none';
	btnPrevVertical.style.display = 'block';

	curIndex = 0;
	curBtnVertical = btnSlideVertical[0].classList.add('active');
	curSlide = slidePage[0].classList.add('active');
	curBtnVertical = btnSlideVertical[curIndex];
	curSlide = slidePage[curIndex];
	
	slideList.style.transform = `translate(0, -${slideHeight}px)`;
	slideList.style.width = 'auto';

	slidePage.forEach((element) => {
		element.style.cssFloat = 'none';
	}); // float 해제
	slideList.firstElementChild.style.cssFloat = 'none'; // 복제된 슬라이드 설정
	slideList.lastElementChild.style.cssFloat = 'none'; // 복제된 슬라이드 설정

	// 자동재생 시작 & 중지
	btnPlayVertical.addEventListener('click', () => {
		btnStopVertical.style.display = 'block';
		btnPlayVertical.style.display = 'none';
		autoPlayVertical();
	});

	btnStopVertical.addEventListener('click', () => {
		btnStopVertical.style.display = 'none';
		btnPlayVertical.style.display = 'block';
		clearInterval(settingVertical);
	});

	// 다음버튼 클릭
	btnNextVertical.addEventListener('click', () => {
		if ( btnStopVertical.style.display === 'none' ) { // 자동재생이 멈춰있을 경우
			if (click) {
				nextPageVertical();

				click = !click;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click = true;
				}, 500);
			}	
		} else { // 자동재생이 실행중일 경우
			if (click) {
				clearInterval(settingVertical); // 자동재생 중지
				clearTimeout(rePlaySetVertical); // 자동재생 재시작 중지
				
				nextPageVertical();

				setTimeout(() => {
					// 1초 딜레이 (재시작과 중지가 동시에 일어나 무산되지 않도록)
				}, 1000);

				rePlayVertical(); // 1초 뒤 자동재생 재시작

				click = !click;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click = true;
				}, 500)
			}
		} 		
	});

	// 이전버튼 클릭
	btnPrevVertical.addEventListener('click', () => {
		if ( btnStopVertical.style.display === 'none' ) { // 자동재생이 멈춰있을 경우
			if (click) {
				prevPageVertical();

				click = !click;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click = true;
				}, 500);
			}
		} else { // 자동재생이 실행중일 경우
			if (click) {
				clearInterval(settingVertical); // 자동재생 중지
				clearTimeout(rePlaySetVertical); // 자동재생 재시작 중지
				
				prevPageVertical();

				setTimeout(() => {
					// 1초 딜레이 (재시작과 중지가 동시에 일어나 무산되지 않도록)
				}, 1000);

				rePlayVertical(); // 1초 뒤 자동재생 재시작

				click = !click;

				// transition(.5s) 완료 후 클릭이 또 가능하도록
				setTimeout(() => {
					click = true;
				}, 500)
			}
		}
	});

	// 버튼 클릭시 슬라이드 이동
	for (let i = 0; i < slideLen; i++) {
		btnSlideVertical[i].onclick = () => {
			if ( btnStopVertical.style.display === 'none' ) { // 자동재생이 멈춰있을 경우
				slideList.style.transition = '.5s';
				slideList.style.transform = `translate(0, -${slideHeight * (i + 1)}px)`; // 클릭한 슬라이드로 이동

				for (let i = 0; i < slideLen; i++) {
					btnSlideVertical[i].classList.remove('active');
					slidePage[i].classList.remove('active');
				}; // active 전체 제거

				btnSlideVertical[i].classList.add('active'); // 클릭한 곳 active 추가
				slidePage[i].classList.add('active'); // 클릭한 곳 active 추가

				curIndex = i; // 흐름이 이어지도록 curIndex 설정
			} else { // 자동재생이 실행중일 경우
				slideList.style.transition = '.5s';
				slideList.style.transform = `translate(0, -${slideHeight * (i + 1)}px)`; // 클릭한 슬라이드로 이동
				
				clearInterval(settingVertical); // 자동재생 중지
				curBtnVertical.classList.remove('active'); // 자동재생되던 곳 active 제거
				curSlide.classList.remove('active'); // 자동재생되던 곳 active 제거
				btnSlideVertical[i].classList.add('active'); // 클릭한 곳 active 추가
				slidePage[i].classList.add('active'); // 클릭한 곳 active 추가

				curIndex = i; // 흐름이 이어지도록 curIndex 설정
				
				setTimeout(() => {
					btnSlideVertical[i].classList.remove('active'); 
					slidePage[i].classList.remove('active');
				}, playSpeed * 1000); // n초 뒤 클릭한 곳 active 제거
				
				autoPlayVertical(); // 자동재생 다시 실행
			}
		}
	}
}