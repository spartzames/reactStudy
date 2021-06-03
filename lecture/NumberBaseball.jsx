import React, { Component } from 'react';
import Try from './Try';

function getNumbers () { // 숫자 네개를 중복없이 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4; i+= 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
};

class NumberBaseball extends Component {

    state = {
        result: '',
        value: '',
        answer: getNumbers(), // ex: [1,3,5,7]
        tries: [],
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.value === this.state.answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런',
                    tries: [...prevState.tries, {try: this.state.value, result:'홈런!'}], // 옛날 배열 복사해놓고 새로운 배열로 넣어줘야 react에서 서로 다름을 인식
                    // react는 참조가 같으면 바뀐것을 인지하지 못한다. ex) this.state.tries.push(1); 바뀐것을 인지못함
                }
            });
        } else {
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) {
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')} 였습니다.`
                });
                alert('게임을 다시 시작합니니다.');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if(answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, { try: this.state.value, result: `${strike} 스트라이크 ${ball} 볼 입니다.`}],
                    }
                });
            }
        }
    };

    onChangeInput = (e) => {

        this.setState({
            value: e.target.value,
        });
    };

    // fruits = [
    //     {fruit: '사과', taste: '맛없다'},
    //     {fruit: '딸기', taste: '맛있다'},
    //     {fruit: '배', taste: '시원하다'},
    //     {fruit: '귤', taste: '달다'},
    //     {fruit: '포도', taste: '시다'},
    // ];

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => {
                        return (
                            <Try key={`${i + 1 }차 시도 : `} tryInfo={v} index={i} /> // props
                        );
                    })}
                </ul>
            </>
        );
    }

}

export default NumberBaseball; // import NumberBaseball;
// module.exports 호환은 되지만 엄밀히 말하면 다르다.

// export const hello = 'hello'; // import { hello }
// export const bye = 'bye'; // import { hello, bye }

/* common js */
// const React = require('react);
// exports.hello = 'hello';
// module.exports = NumberBaseball;