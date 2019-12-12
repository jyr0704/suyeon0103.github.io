// header
	const html = document.querySelector('html');
	const btnGnb = document.querySelectorAll('.gnb > li > a');

	btnGnb.forEach((element) => {
		element.addEventListener('click', () => {
			for (let i = 0; i < btnGnb.length; i++) { // active 전체제거
				btnGnb[i].parentNode.classList.remove('active');
			}
			element.parentNode.classList.add('active'); // 클릭한 곳 active 추가
		});
	});

	window.addEventListener('scroll', () => {
		if( html.scrollTop < 6577 ) {
			for (let i = 0; i < btnGnb.length; i++) { // active 전체제거
				btnGnb[i].parentNode.classList.remove('active');
			}
			btnGnb[0].parentNode.classList.add('active');
		} else if ( html.scrollTop < 10888 ) {
			for (let i = 0; i < btnGnb.length; i++) { // active 전체제거
				btnGnb[i].parentNode.classList.remove('active');
			}
			btnGnb[1].parentNode.classList.add('active');
		} else {
			for (let i = 0; i < btnGnb.length; i++) { // active 전체제거
				btnGnb[i].parentNode.classList.remove('active');
			}
			btnGnb[2].parentNode.classList.add('active');
		}
	});

	function scrollFact() {
		window.scroll({
			behavior: 'smooth',
			top: 0
		});
	};

	function scrollStory() {
		window.scroll({
			behavior: 'smooth',
			top: 6577
		});
	};

	function scrollPeople() {
		window.scroll({
			behavior: 'smooth',
			top: 11110
		});
	};

// main
	// 처음처럼 수상
	const prizeList = document.querySelector('.prize_list');
	const prizePage = prizeList.querySelectorAll('.prize_page');
	const prizeLen = prizePage.length;
	const btnPrize = document.querySelectorAll('.btn_prize');
	let curIndex = 0;
	let curPrize = btnPrize[curIndex];
	curPrize.classList.add('active');

	prizeList.style.transform = `translateX(-${610 * 2}px)`; // ul 초기위치 지정
	prizeList.style.width = `${590 * (prizeLen + 4) + 20 * (prizeLen + 3)}px`; // ul 너비 지정

	// 슬라이드 붙이기
	const prizePage1 = prizeList.firstElementChild.cloneNode(true);
	const prizePage2 = prizeList.children[1].cloneNode(true);
	const prizePage3 = prizeList.children[2].cloneNode(true);
	const prizePage4 = prizeList.children[3].cloneNode(true);

	prizeList.appendChild(prizePage1);
	prizeList.appendChild(prizePage2);
	prizeList.insertBefore(prizePage4, prizeList.firstElementChild);
	prizeList.insertBefore(prizePage3, prizeList.firstElementChild);

	// 다음 페이지로 이동
	const btnPrizeNext = document.querySelector('.btn.prize_next');

	btnPrizeNext.addEventListener('click', () => {
		prizeList.style.transition = '.5s';
		prizeList.style.transform = `translateX(-${610 * (curIndex + 3)}px)`;

		for (let i = 0; i < prizeLen; i++) {
			btnPrize[i].classList.remove('active');
		}; // active 전체 제거

		++curIndex;

		curPrize = btnPrize[curIndex];

		if (curIndex === prizeLen) {
			setTimeout(() => {
				prizeList.style.transition = '0s';
				prizeList.style.transform = `translateX(-${610 * 2}px)`;
			}, 501);
			curIndex = 0;
			curPrize = btnPrize[0];
		};

		curPrize.classList.add('active');
	})
	
	// 이전 페이지로 이동
	const btnPrizePrev = document.querySelector('.btn.prize_prev');

	btnPrizePrev.addEventListener('click', () => {
		prizeList.style.transition = '.5s';
		prizeList.style.transform = `translateX(-${610 * (curIndex + 1)}px)`;

		for (let i = 0; i < prizeLen; i++) {
			btnPrize[i].classList.remove('active');
		}; // active 전체 제거

		--curIndex;
		
		if (curIndex === -1) {
			curPrize = btnPrize[prizeLen - 1];
			curPrize.classList.add('active');
		} else if (curIndex === -2) {
			setTimeout(() => {
				prizeList.style.transition = '0s';
				prizeList.style.transform = `translateX(-${610 * 4}px)`;
			}, 501);
			curIndex = prizeLen - 2;
			curPrize = btnPrize[prizeLen - 2];
			curPrize.classList.add('active');
		} else {
			curPrize = btnPrize[curIndex];
			curPrize.classList.add('active');
		}
	});

	// 버튼 클릭시 슬라이드 이동
	for (let i = 0; i < prizeLen; i++) {
		btnPrize[i].onclick = () => {
			prizeList.style.transition = '.5s';
			prizeList.style.transform = `translateX(-${610 * (i + 2)}px)`; // 클릭한 슬라이드로 이동

			for (let i = 0; i < prizeLen; i++) {
				btnPrize[i].classList.remove('active');
			}; // active 전체 제거

			btnPrize[i].classList.add('active'); // 클릭한 곳 active 추가
			
			curIndex = i; // 흐름이 이어지도록 curIndex 설정
		};
	};

	// 처음처럼 인증
	const certifyList = document.querySelector('.certify_list');
	const certifyPage = certifyList.querySelectorAll('.certify_page');
	const certifyLen = certifyPage.length;
	const btnCertify = document.querySelectorAll('.btn_certify');
	let curIdx = 0;
	let curCertify = btnCertify[curIdx];
	curCertify.classList.add('active');

	certifyList.style.transform = `translateX(-${610 * 2}px)`; // ul 초기위치 지정
	certifyList.style.width = `${590 * (certifyLen + 4) + 20 * (certifyLen + 3)}px`; // ul 너비 지정

	// 슬라이드 붙이기
	const certifyPage1 = certifyList.firstElementChild.cloneNode(true);
	const certifyPage2 = certifyList.children[1].cloneNode(true);
	const certifyPage3 = certifyList.children[2].cloneNode(true);
	const certifyPage4 = certifyList.children[3].cloneNode(true);

	certifyList.appendChild(certifyPage1);
	certifyList.appendChild(certifyPage2);
	certifyList.insertBefore(certifyPage3, certifyList.firstElementChild);
	certifyList.insertBefore(certifyPage4, certifyList.firstElementChild);

	// 다음 페이지로 이동
	const btnCertifyNext = document.querySelector('.btn.certify_next');

	btnCertifyNext.addEventListener('click', () => {
		certifyList.style.transition = '.5s';
		certifyList.style.transform = `translateX(-${610 * (curIdx + 3)}px)`;

		for (let i = 0; i < certifyLen; i++) {
			btnCertify[i].classList.remove('active');
		}; // active 전체 제거

		++curIdx;

		curCertify = btnCertify[curIdx];

		if (curIdx === certifyLen) {
			setTimeout(() => {
				certifyList.style.transition = '0s';
				certifyList.style.transform = `translateX(-${610 * 2}px)`;
			}, 501);
			curIdx = 0;
			curCertify = btnCertify[0];
		};

		curCertify.classList.add('active');
	});
	
	// 이전 페이지로 이동
	const btnCertifyPrev = document.querySelector('.btn.certify_prev');

	btnCertifyPrev.addEventListener('click', () => {
		certifyList.style.transition = '.5s';
		certifyList.style.transform = `translateX(-${610 * (curIdx + 1)}px)`;

		for (let i = 0; i < certifyLen; i++) {
			btnCertify[i].classList.remove('active');
		}; // active 전체 제거

		--curIdx;
		
		if (curIdx === -1) {
			curCertify = btnCertify[certifyLen - 1];
			curCertify.classList.add('active');
		} else if (curIdx === -2) {
			setTimeout(() => {
				certifyList.style.transition = '0s';
				certifyList.style.transform = `translateX(-${610 * 4}px)`;
			}, 501);
			curIdx = certifyLen - 2;
			curCertify = btnCertify[certifyLen - 2];
			curCertify.classList.add('active');
		} else {
			curCertify = btnCertify[curIdx];
			curCertify.classList.add('active');
		}
	});

	// 버튼 클릭시 슬라이드 이동
	for (let i = 0; i < certifyLen; i++) {
		btnCertify[i].onclick = () => {
			certifyList.style.transition = '.5s';
			certifyList.style.transform = `translateX(-${610 * (i + 2)}px)`; // 클릭한 슬라이드로 이동

			for (let i = 0; i < certifyLen; i++) {
				btnCertify[i].classList.remove('active');
			}; // active 전체 제거

			btnCertify[i].classList.add('active'); // 클릭한 곳 active 추가
			
			curIdx = i; // 흐름이 이어지도록 curIndex 설정
		};
	};

	// 처음처럼 & 피플
	const peoplePopupArea = document.querySelector('.people_popup_area');
	const iframes = peoplePopupArea.querySelectorAll('iframe');

	function OpenCol1() {
		html.style.overflow = 'hidden';
		peoplePopupArea.style.display = 'block';
		iframes[0].style.display = 'block';
	};

	function OpenCol2() {
		html.style.overflow = 'hidden';
		peoplePopupArea.style.display = 'block';
		iframes[1].style.display = 'block';
	};

	function OpenCol3() {
		html.style.overflow = 'hidden';
		peoplePopupArea.style.display = 'block';
		iframes[2].style.display = 'block';
	};

	function closePopup() {
		html.style.overflow = 'auto';
		peoplePopupArea.style.display = 'none';
	};

// scroll
	const fact1 = document.querySelector('.fact1');
	const fact1MainArea = fact1.querySelector('.main_area');
	const fact1MainAreaTxt = fact1MainArea.querySelectorAll('.cont_txt > img');
	const fact1MainAreaImg = fact1MainArea.querySelectorAll('.cont_img > img');
	const fact1_1 = fact1.querySelector('.fact1_1');
	const fact1_2 = fact1.querySelector('.fact1_2');
	const fact2 = document.querySelector('.fact2');
	const fact2MainArea = fact2.querySelector('.main_area');
	const fact2MainAreaTxt = fact2MainArea.querySelectorAll('.cont_txt > img');
	const fact2MainAreaRight = fact2MainArea.querySelector('.cont_txt_right');
	const fact2GraphBg = fact2.querySelector('.bg_graph');
	const fact3 = document.querySelector('.fact3');
	const fact3MainAreaTxt = fact3.querySelectorAll('.cont_txt > img');
	const fact3_1 = fact3.querySelector('.fact3_1');
	const fact3NewsList = fact3.querySelectorAll('.fact3_news_area > li');

	const story = document.querySelector('.story');
	const storyVideo = story.querySelector('.video_area');
	const storyTxt = story.querySelector('.inner > img');
	const storyContTxt = story.querySelector('.cont_txt');
	const brandTxt = story.querySelector('.brand_area > .inner > img');
	const brandContTxt = story.querySelector('.brand_area .cont_txt');
	const prizeTxt = story.querySelector('.prize_area > .inner > img');
	const prizeSlide = story.querySelector('.prize_slide_area');
	const certifyTxt = story.querySelector('.certify_area > .inner > img');
	const certifySlide = story.querySelector('.certify_slide_area');

	const people = document.querySelector('.people');
	const peopleTxt = people.querySelector('.inner > img');
	const peopleCol1 = people.querySelector('.col1');
	const peopleCol2 = people.querySelector('.col2');
	const peopleCol3 = people.querySelector('.col3');

	// 로드 시 애니메이션
	window.addEventListener('load', () => {
		fact1MainAreaTxt[0].style.transition = '.5s ease';
		fact1MainAreaTxt[0].style.transform = 'translateX(0)';
		fact1MainAreaTxt[1].style.transition = '.5s ease .4s';
		fact1MainAreaTxt[1].style.transform = 'translateX(0)';
		fact1MainAreaTxt[2].style.transition = '.5s ease .8s';
		fact1MainAreaTxt[2].style.transform = 'translateX(0)';

		fact1MainAreaImg[2].style.transition = '.2s ease 2s';
		fact1MainAreaImg[2].style.opacity = '1';
		fact1MainAreaImg[1].style.transition = '.2s ease 2.3s';
		fact1MainAreaImg[1].style.opacity = '1';
		fact1MainAreaImg[0].style.transition = '.2s ease 2.6s';
		fact1MainAreaImg[0].style.opacity = '1';
		fact1MainAreaImg[3].style.transition = '1s cubic-bezier(0.38, 0.9, 0.7, 1.1) 3s';
		fact1MainAreaImg[3].style.opacity = '1';
		fact1MainAreaImg[3].style.transform = 'translateX(0)';
	})

	// 스크롤 애니메이션
	window.addEventListener('scroll', () => {
		let scrollValue = html.scrollTop;

		// FACT CHECK
		if ( scrollValue > 350 ) {
			fact1_1.style.transform = 'translateY(0)';
			fact1_1.style.opacity = '1';
		} else {
			fact1_1.style.transform = 'translateY(100px)';
			fact1_1.style.opacity = '0';
		}

		if ( scrollValue > 1228 ) {
			fact1_2.style.transition = '.7s ease';
			fact1_2.style.transform = 'translateY(0)';
			fact1_2.style.opacity = '1';
		} else {
			fact1_2.style.transform = 'translateY(100px)';
			fact1_2.style.opacity = '0';
		}

		if ( scrollValue > 1764 ) {
			fact1_2.querySelector('.col.left').style.transform = 'translateX(0)';
			fact1_2.querySelector('.col.left').style.opacity = '1';
			fact1_2.querySelector('.col.right').style.transform = 'translateX(0)';
			fact1_2.querySelector('.col.right').style.opacity = '1';
		} else {
			fact1_2.querySelector('.col.left').style.transform = 'translateX(-100px)';
			fact1_2.querySelector('.col.left').style.opacity = '0';
			fact1_2.querySelector('.col.right').style.transform = 'translateX(100px)';
			fact1_2.querySelector('.col.right').style.opacity = '0';
		}

		if ( scrollValue > 2548 ) {
			fact2MainAreaTxt[0].style.transform = 'translateX(0)';
			fact2MainAreaTxt[1].style.transform = 'translateX(0)';
			fact2MainAreaTxt[2].style.transform = 'translateX(0)';
			fact2MainAreaTxt[3].style.transform = 'translateX(0)';
			fact2MainAreaRight.style.transform = 'translateY(0)';
			fact2MainAreaRight.style.opacity = '1';
		} else if ( scrollValue < 2216 ) {
			fact2MainAreaTxt[0].style.transform = 'translateX(-999px)';
			fact2MainAreaTxt[1].style.transform = 'translateX(-999px)';
			fact2MainAreaTxt[2].style.transform = 'translateX(-999px)';
			fact2MainAreaTxt[3].style.transform = 'translateX(-999px)';
			fact2MainAreaRight.style.transform = 'translateY(100px)';
			fact2MainAreaRight.style.opacity = '0';
		}
		if ( scrollValue > 3548 ) {
			fact2GraphBg.style.width = '100%';
		} else if ( scrollValue < 3184 ) {
			fact2GraphBg.style.width = '0';
		}

		if ( scrollValue > 4192 ) {
			fact3MainAreaTxt[0].style.transform = 'translateX(0)';
			fact3MainAreaTxt[1].style.transform = 'translateX(0)';
			fact3MainAreaTxt[2].style.transform = 'translateX(0)';
			fact3MainAreaTxt[3].style.transform = 'translateX(0)';
		} else if ( scrollValue < 3820 ) {
			fact3MainAreaTxt[0].style.transform = 'translateX(-999px)';
			fact3MainAreaTxt[1].style.transform = 'translateX(-999px)';
			fact3MainAreaTxt[2].style.transform = 'translateX(-999px)';
			fact3MainAreaTxt[3].style.transform = 'translateX(-999px)';
		}

		if ( scrollValue > 4504 ) {
			fact3_1.style.transform = 'translateY(0)';
			fact3_1.style.opacity = '1';
		} else {
			fact3_1.style.transform = 'translateY(100px)';
			fact3_1.style.opacity = '0';
		}

		if ( scrollValue > 5052 ) {
			fact3NewsList[0].style.transform = 'translateY(0)';
			fact3NewsList[0].style.opacity = '1';
			fact3NewsList[1].style.transform = 'translateY(0)';
			fact3NewsList[1].style.opacity = '1';
		} else {
			fact3NewsList[0].style.transform = 'translateY(100px)';
			fact3NewsList[0].style.opacity = '0';
			fact3NewsList[1].style.transform = 'translateY(100px)';
			fact3NewsList[1].style.opacity = '0';
		}

		// STORY
		if ( scrollValue > 6100 ) {
			storyVideo.style.transform = 'translateY(0)';
			storyVideo.style.opacity = '1';
		} else {
			storyVideo.style.transform = 'translateY(100px)';
			storyVideo.style.opacity = '0';
		}

		if ( scrollValue > 6858 ) {
			storyTxt.style.transform = 'translateX(0)';
			storyTxt.style.opacity = '1';
		} else {
			storyTxt.style.transform = 'translateX(100px)';
			storyTxt.style.opacity = '0';
		}
		if ( scrollValue > 7014 ) {
			storyContTxt.style.transform = 'translateY(0)';
			storyContTxt.style.opacity = '1';
		} else {
			storyContTxt.style.transform = 'translateY(100px)';
			storyContTxt.style.opacity = '0';
		}

		if ( scrollValue > 7912 ) {
			brandTxt.style.transform = 'translateX(0)';
			brandTxt.style.opacity = '1';
		} else {
			brandTxt.style.transform = 'translateX(100px)';
			brandTxt.style.opacity = '0';
		}
		if ( scrollValue > 8096 ) {
			brandContTxt.style.transform = 'translateY(0)';
			brandContTxt.style.opacity = '1';
		} else {
			brandContTxt.style.transform = 'translateY(100px)';
			brandContTxt.style.opacity = '0';
		}

		if ( scrollValue > 8820 ) {
			prizeTxt.style.transform = 'translateX(0)';
			prizeTxt.style.opacity = '1';
		} else {
			prizeTxt.style.transform = 'translateX(100px)';
			prizeTxt.style.opacity = '0';
		}
		if ( scrollValue > 9036 ) {
			prizeSlide.style.transform = 'translateY(0)';
			prizeSlide.style.opacity = '1';
		} else {
			prizeSlide.style.transform = 'translateY(100px)';
			prizeSlide.style.opacity = '0';
		}

		if ( scrollValue > 9616 ) {
			certifyTxt.style.transform = 'translateX(0)';
			certifyTxt.style.opacity = '1';
		} else {
			certifyTxt.style.transform = 'translateX(100px)';
			certifyTxt.style.opacity = '0';
		}
		if ( scrollValue > 9828 ) {
			certifySlide.style.transform = 'translateY(0)';
			certifySlide.style.opacity = '1';
		} else {
			certifySlide.style.transform = 'translateY(100px)';
			certifySlide.style.opacity = '0';
		}

		// PEOPLE
		if ( scrollValue > 10608 ) {
			peopleTxt.style.transform = 'translateX(0)';
			peopleTxt.style.opacity = '1';
		} else {
			peopleTxt.style.transform = 'translateX(100px)';
			peopleTxt.style.opacity = '0';
		}
		if (scrollValue > 10784 ) {
			peopleCol1.style.transform = 'translateY(0)';
			peopleCol1.style.opacity = '1';
		} else {
			peopleCol1.style.transform = 'translateY(100px)';
			peopleCol1.style.opacity = '0';
		}
		if (scrollValue > 11548 ) {
			peopleCol2.style.transform = 'translateY(0)';
			peopleCol2.style.opacity = '1';
		} else {
			peopleCol2.style.transform = 'translateY(100px)';
			peopleCol2.style.opacity = '0';
		}
		if (scrollValue > 12348 ) {
			peopleCol3.style.transform = 'translateY(0)';
			peopleCol3.style.opacity = '1';
		} else {
			peopleCol3.style.transform = 'translateY(100px)';
			peopleCol3.style.opacity = '0';
		}
	})

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