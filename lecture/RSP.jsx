import React, { useState, useRef, useEffect } from 'react';

const rspCoords = {
    rock: '0',
    scissor: '-142px',
    paper: '-284px',
};

const scores = {
    rock: 1,
    scissor: 0,
    paper: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

const RSP = () => {
    const [result, setResult] = useState();
    const [score, setScore] = useState(0);
    const [imgCoord, setImgCoord] = useState(rspCoords.rock);
    const interval = useRef();

    useEffect(() => { // componentDidMount, componentDidUpdate 역할 (1:1 대응은 아님)
        interval.current = setInterval(changeHand, 100);
        return () => { // componentWillUnmount 역할
        clearInterval(interval.current);
        };
    }, [imgCoord]); // 배열에 넣은 값이 바뀔때 useEffect가 실행된다 (ex. imgCoord)

    const changeHand = () => {
        if (imgCoord === rspCoords.rock) {
            setImgCoord(rspCoords.scissor);
        } else if (imgCoord === rspCoords.scissor) {
            setImgCoord(rspCoords.paper);
        } else if (imgCoord === rspCoords.paper) {
            setImgCoord(rspCoords.rock);
        }
    };

    const onClickBtn = (choice) => (e) => {
        e.preventDefault();
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다.');
        } else if ([1, -2].includes(diff)) {
            setResult('이겼습니다');
            setScore((prevScore) => {
                return prevScore + 1;
            });
        } else {
            setResult('졌습니다');
            setScore((prevScore) => {
                return prevScore - 1;
            });
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 1000);
    };

    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn(('rock'))}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn(('scissor'))}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn(('paper'))}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}

export default RSP;