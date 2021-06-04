import React, { Component } from 'react';


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

// 클래스의 경우 -> constructor -> render-> ref -> componentDidMount ->
//  setState/props 바뀔때 -> shouldComponentUpdate(true) -> reRender -> componentDidUpdate
// 부모가 나를 없앴을때 -> componentWillUnmount -> 소멸
class RSP  extends Component {
    state = {
        result: '',
        score: 0,
        imgCoord: '0',
    };

    interval;

    componentDidMount() { // component가 첫 렌더링 된 직후 (rerendering때는 실행되지 않음)
                            // -> 비동기 요청을 많이 함
        // const { imgCoord } = this.state; // 여기에 선언하면 비동기 함수 내부에서 참조 하면 closure 문제 발생
        this.interval = setInterval(this.changeHand, 100);
    };

    componentDidUpdate() {  // 리렌더링 된 후

    };

    componentWillUnmount() {    // component가 제거 되기 직전 (부모가 자식 component를 제거시)
                                // 완료되지 않은 비동기 요청 정리를 많이 함
        clearInterval(this.interval);
    };

    onClickBtn = (choice) => (e) => {
        e.preventDefault();
        const { imgCoord } = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '비겼습니다.',
            });
        } else if ([1, -2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다.',
                    score: prevState.score + 1,
                }
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다..',
                    score: prevState.score - 1,
                }
            });
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000);
    };

    changeHand = () => {
        const { imgCoord } = this.state; // 따라서 비동기 함수 내부에 선언
        if (imgCoord === rspCoords.rock) {
            this.setState({
                imgCoord: rspCoords.scissor,
            });
        } else if (imgCoord === rspCoords.scissor) {
            this.setState({
                imgCoord: rspCoords.paper,
            });
        } else if (imgCoord === rspCoords.paper) {
            this.setState({
                imgCoord: rspCoords.rock,
            });
        }
    };

    render () {
        const { result, score, imgCoord } = this.state;
        return (
            <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div>
                <button id="rock" className="btn" onClick={this.onClickBtn(('rock'))}>바위</button>
                <button id="scissor" className="btn" onClick={this.onClickBtn(('scissor'))}>가위</button>
                <button id="paper" className="btn" onClick={this.onClickBtn(('paper'))}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;