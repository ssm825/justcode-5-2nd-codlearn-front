# Team Project _ Codlearn

![codlearn_banner](https://user-images.githubusercontent.com/105163878/192190733-bd8e62e5-74d1-4d00-98dc-0f72fa9c4e9f.jpg)

<br/>

## ◽ 프로젝트 사이트 기능 구현 영상

[Codlearn Youtube](https://www.youtube.com/watch?v=UUrEelIEzPA)

<br/>

## ◽ Introduction

- 온라인 교육 전용 플랫폼 **인프런**을 모티브로 한 팀 프로젝트
 - 개발 기간 | 2022-07-11 ~ 2022-07-29
 - 개발 인원 | 총 6명
   - FE : 김신혜, 서수민, 성민규, 유광현
   - BE : 김보경, 김지은

<br/>

## ◽ GitHub repository

- [Front-end-repo](https://github.com/wecode-bootcamp-korea/justcode-5-2nd-codlearn-front)
- [Back-end-repo](https://github.com/wecode-bootcamp-korea/justcode-5-2nd-codlearn-back)


<br/>

## ◽ DB modeling

![Codlearn db 자료 구조](https://user-images.githubusercontent.com/105163878/192192738-6fe1e1be-42c3-4afb-a67e-238a74013823.JPG)


<br/>

## ◽ Technlogies

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styledComponents&logoColor=white">
<br>
<img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

<br/>

## ◽ 구현 기능

### Front-end

| 이름   | 구현 기능 |
| ------ | ------ |
| 김신혜 | 회원가입 / 로그인 & 소셜 로그인 모달 |
| **서수민** | **메인 페이지 / Dash Board 페이지** | 
| 성민규 | Header & Footer / Carts 페이지 |
| 유광현 | Courses 페이지 / Detail 페이지 |

<br/>

> 메인 페이지

- 메인 페이지 상단의 **carousel slider** 구현
  - `setInterval()`을 활용하여 `transform` 속성으로 애니메이션 효과를 주어 
    자동/수동으로 조작이 가능한 무한 루프 슬라이더 구현
    
```javascript
useEffect(() => {
    const timer = setInterval(() => {
      if (slideIndex < slidelength - 1) {
        setSlideIndex(prev => prev + 1);
        sliderContainerRef.current.style.transition = 'transform 0.5s ease-in';
        sliderContainerRef.current.style.transform = `translateX(-${
          slideIndex * 100
        }vw)`;
      }
    }, 2000);
    if (slideIndex >= slidelength - 1) {
      setTimeout(() => {
        sliderContainerRef.current.style.transition = 'transform 0s';
        sliderContainerRef.current.style.transform = `translateX(-0vw)`;
        setSlideIndex(1);
      }, 300);
    }

    return () => {
      clearInterval(timer);
      clearTimeout();
    };
  }, [slideIndex, slidelength]);
  
 ```
- fetch 함수와 useRef를 활용한 **검색 바** 구현
  - Loading 컴포넌트를 만들어 검색 시, data fetch 딜레이 동안 로딩 이미지 구현
  - 검색 바 input의 focus와 마우스 click 이벤트를 활용하여 다양한 CSS Style 적용

```javascript
const searchApi = async () => {
    setLoading(true);
    let timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    try {
      const response = await fetch(`${BASE_URL}?s=${inputText}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      });
      const result = await response.json();
      setSearch(result.searchData);

      return () => {
        clearTimeout(timer);
      };
    } catch (err) {
      console.log(err.message);
    }
  };
 ```
- **Swiperjs** 라이브러리 이용 및 css 커스터마이즈 슬라이드 구현
```javascript
<StyleSwiper
  slidesPerView={5}
  spaceBetween={10}
  slidesPerGroup={5}
  loop={false}
  loopFillGroupWithBlank={true}
  navigation={{
    prevEl: navigationPrevFreeRef.current,
    nextEl: navigationNextFreeRef.current,
  }}
  onBeforeInit={swiper => {
    swiper.params.navigation.prevEl = navigationPrevFreeRef.current;
    swiper.params.navigation.nextEl = navigationNextFreeRef.current;
  }}
  slidesOffsetBefore={0}
  slidesOffsetAfter={0}
  modules={[Navigation]}
  className="mySwiper"
>
```

<br/>

> Dash Board 페이지
  - JWT와 로컬 스토리지를 사용한 **마이 페이지** 구현
    - `props.children`을 사용하여 컴포넌트의 재사용성을 높임
 ```javascript
 const token = localStorage.getItem('token');

  const boardApi = async () => {
    setIsLogin(true);
    const response = await axios.get(`${BASE_URL}/dashboard`, {
      headers: {
        Authorization: token,
      },
    });
    setUserData(response.data);
  };

  useEffect(() => {
    boardApi();
  }, []);
 ```

<br/>

### Back-end

| 이름   | 구현 기능 |
| ------ | ------ |
| 김보경 | 메인 검색 / 필터링 API </br> Courses 검색 / 필터링 API </br> Nav 검색 API </br> 로그인 / 소셜 로그인 API, Token |
| 김지은 | Dash Board 사용자 / 수강 중인 강의 / 좋아요 API </br> Carts 사용자 / 강의 / 카트 API </br> 로그인 / 소셜 로그인 API , Token |

<br/>

## ◽ Reference
이 프로젝트는 기존 사이트를 참조하여 학습 목적으로 만들었습니다. <br>
실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제 될 수 있습니다.
