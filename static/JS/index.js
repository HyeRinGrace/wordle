// 서버에서 정답
//const 정답 = 'APPLE';
//다음 인덱스로 넘어가기 위해 변수 선언
let index= 0;
let attempts= 0; //시도 횟수
let timer;


// 전체를 하나의 함수로 감싸서 
function appStart(){
    const displayGameover = () =>{
        // 다큐멘트에 엘레먼트를 만들 수 있음
        const div = document.createElement("div");
        div.innerText = "게임이 종료됐습니다.";
        //div 스타일 입력 JAVA 스크립트로 조작할 수 있음
        div.style = "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38vw; background-color:yellow; width:200px; height:500px;";
        //div 스타일을 바디에 넣는 작업
        document.body.appendChild(div);
    };

    const nextLine = () => {
        //시도횟수가 6번을 초과하면 gameover(); 불러와서 종료시켜버리기
        if(attempts === 6) return gameover();
        //attempts 를 한줄 늘려주고
        attempts +=1;
        //index가 5값에 있으니 0으로 다시 초기화 시켜준다.
        index = 0;
    };

    const gameover = () => {
        window.removeEventListener("keydown",handlekeydown);
        displayGameover();
        //인터버를 클리어한다.
        clearInterval(timer);
    };

    const handleEnterkey = async() => {
        let 맞은개수 = 0;
        //서버에서 정답을 받아오는 코드
        const 응답 = await fetch("/answer")//await은 서버에 정답을 보내고 응답이 올때까지 기다리는 구문, fetch는 자바스크립에서 서버한테 요청을 보낼 때 사용
        const 정답 = await 응답.json(); //서버에 정답을 보내고 응답을 json이라는 포맷으로 바꿈

       //for 문을 이용하여 index[0][1]부터 단어 하나하나 비교하며 정답과 일치한지를 비교
        for(let i= 0; i<5; i++){
            const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`);
            const 입력글자 = block.innerText;
            const 정답글자 = 정답[i];
            //입력글자와 정답글자가 같으면 백그라운드 컬러 그린색
            if(입력글자 === 정답글자){
                맞은개수 += 1;
                block.style.backgroudcolor = "#6AAA64";
            //includes는 포함이 되어있는지 안되어있는지 비교할 수 있는 값이다.
            }else if (정답글자.includes(입력글자))block.style.backgroudcolor="#white";
            //포함되어있지 않으면 회색배경으로 변환
            else block.style.backgroudcolor = "#787C7E"
            block.style.color = "white";
        }
        //맞은 개수가 5개이면 gameover(); 호출
        if(맞은개수 === 5) gameover();
        else nextLine();
    };

    //backspace 시도 시, index 이전꺼를 삭제해야하기 때문에 index -1을 해줘야한다.
    const handleBackspace = (thisBlock) =>{
        if(index > 0){
            const preBlock = document.querySelector(`.board-block[data-index='${attempts}${index-1}']` );//index-1을 해줘야 index[0]부터 시작됨
                    //index 가 0이 아닐경우에 -1 (이유는 인덱스가 -1이 되버림)
            preBlock.innerText = "";
        }
        if(index !== 0) index -= 1;
    };
  
    //키다운 이벤트 주기, 키 고유값을 이용하여 사용 A = 65
    const handlekeydown = (event) => {        
        // console.log("키가 입력",event.key);    
        const key = event.key.toUpperCase(); // Key의 고유번호 불러오기 이때 key를 변수로 선언 , toUpperCase를 넣어준다면 대문자로 변환됨
        const keyCode = event.keyCode; //key의 고유번호 불러오기 이때 keyCode를 변수로 선언
        // console.log(event.key,event.keyCode);// console에 로그를 남긴다.
        const thisBlock = document.querySelector(
            `.board-block[data-index='${attempts}${index}']`
        );//도큐멘터에 컬럼값을 뽑음 , 백키를 이용해 변수값을 넣어줌 0번째 시도에 0번째 인덱스를 가져와 텍스트 업데이트
        //backspace 눌러서 지우는 작업
        if(event.key === 'Backspace')handleBackspace(); //파라미터로 thisBlock을 전달
        else if(index === 5){ //index가 5일때 엔터키를 누르면 엔터키에 대한 동작이 일어나고
            if(event.key === "Enter")handleEnterkey();
            else return; //인덱스가 [0][5] 인순간 아무것도 안하고 리턴한다.
        }else if(65 <= keyCode && keyCode <= 90){//A가 65 Z가 90 고유 키값 안에서만 입력가능하게 끔 IF 문 대입
            thisBlock.innerText = key; // 키보드값 넣어줌
            index ++; //index를 증가해주세요
            //index += 1;
            //index = index + 1;
        }
    };


    const startTimer = () => {
        const 시작시간 = new Date();

        function setTime(){
            const 현재시간 = new Date();
            const 흐른시간 = new Date(현재시간-시작시간);
            const 분 = 흐른시간.getMinutes().toString().padStart(2,"0");
            const 초 = 흐른시간.getSeconds().toString().padStart(2,"0");
            const timeDiv = document.querySelector("#timer");
            timeDiv.innerText = `${분}:${초}`;
        }

        //주기성 setInterval
        //timer 변수를 set인터벌에다가 저장
        timer = setInterval(setTime, 1000);
    };

    startTimer();
    window.addEventListener("keydown",handlekeydown);

};
// 앱스타트 호출
appStart();