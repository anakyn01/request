const html = document.documentElement;
//상수html은 html요소를 가져오므니다..
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");
//상수 콘텍스트는 그림을 그릴수 있게 해주는 2d렌더링..
const frameCount = 148;
const currentFrame = index =>  (
     `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
     //주어진 인덱스를 4자리 문자열로 패딩 (0001. 0002)
)

//이미지를 미리로드 해서 스크롤할때 끊김없이 부드러운 애니메이션 되도록..
const preloadImages = () => {
    for(let i =1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
    }
}

//초기 이미지 로딩 및 캔버스 설정
const img = new Image()
img.src = currentFrame(1);
canvas.width = 1158; canvas.height=770;
img.onload = function() {
    context.drawImage(img, 0,0)
}//첫번째 프레임 이미지를 사과공식 사이트기준으로 고정해서 캔바스에 그리기

const updateImage = index => {//새로운 프레임의 이미지를 불러와서 캔바스에 그림
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
}

//스크롤 기반 애니메이션 로직
window.addEventListener('scroll',() => {
    const scrollTop = html.scrollTop; //현재 스크롤 위치
    const maxScrollTop = html.scrollHeight - window.innerHeight;//전체 스크롤 가능한 길이
    const scrollFraction = scrollTop / maxScrollTop; //스크롤의 진행률 0 ~ 1
    const frameIndex = Math.min(
        frameCount - 1, Math.ceil(scrollFraction * frameCount)
    );
    //이미지 갱신
    requestAnimationFrame( ()=> updateImage(frameIndex + 1))
});

preloadImages()
