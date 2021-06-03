import React, { useRef, useState } from 'react';
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

const NumberBaseball = () => {

    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
            e.preventDefault();
            if (value === answer.join('')) {
                setResult('홈런');
                setTries((prevTries) => {
                    return [...prevTries, {try: value, result:'홈런!'}];
                });
            } else {
                const answerArray = value.split('').map((v) => parseInt(v));
                let strike = 0;
                let ball = 0;
                if (tries.length >= 9) {
                    setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다.`);
                    alert('게임을 다시 시작합니니다.');
                    setValue('');
                    setAnswer(getNumbers());
                    setTries([]);
                } else {
                    for (let i = 0; i < 4; i += 1) {
                        if(answerArray[i] === answer[i]) {
                            strike += 1;
                        } else if (answer.includes(answerArray[i])) {
                            ball += 1;
                        }
                    }
                    setTries((prevTries) => {
                        return [...prevTries, { try: value, result: `${strike} 스트라이크 ${ball} 볼 입니다.`}];
                    });
                    setValue('');
                    inputRef.current.focus();
                }
            }
        };

    const onChangeInput = (e) => {
            setValue(e.target.value);
        };

    // fruits = [
    //     {fruit: '사과', taste: '맛없다'},
    //     {fruit: '딸기', taste: '맛있다'},
    //     {fruit: '배', taste: '시원하다'},
    //     {fruit: '귤', taste: '달다'},
    //     {fruit: '포도', taste: '시다'},
    // ];

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput} />
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                    return (
                        <Try key={`${i + 1 }차 시도 : `} tryInfo={v} index={i} /> // props
                    );
                })}
            </ul>
        </>
    );
}

export default NumberBaseball; // import NumberBaseball;
// module.exports 호환은 되지만 엄밀히 말하면 다르다.

// export const hello = 'hello'; // import { hello }
// export const bye = 'bye'; // import { hello, bye }

/* common js */
// const React = require('react);
// exports.hello = 'hello';
// module.exports = NumberBaseball;