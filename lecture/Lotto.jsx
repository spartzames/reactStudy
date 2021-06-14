import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []); // useMemo: 복잡한 함수 결과값을 기억, useRef: 일반 값을 기억
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(()=> {
        console.log('useEffect');
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {      // useEffect의 return 은 componentWillUnmount 동작
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); // inputs가 빈배열이면 componentDidMount와 동일
                                    // -> winBalls.length === 0 으로 하게되면 최초 page loading시에 winBalls의 length가 0이기 때문에 중복호출이 된다.
                                    // -> class와 hooks의 useEffect 사용 부분이 완전히 일치하지 않을 수 있다
                // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 수행

    const onClickRedo = useCallback(() => {
        setWinNumbers(getWinNumbers());
        console.log(winNumbers);
        setWinBalls([]);


        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]); // useCallback은 hooks reloading(page reloading) 시에 함수가 재 선언 되지 않게 기억해둔다.
                    // 함수 내에 바뀌어야 하는 값(state)이 있다면 inputs에 꼭 넣어주어야 한다.

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} onClick={onClickRedo} />} {/*자식 component에 함수를 props로 전달시에는 꼭 useCallback을 사용!!!*/}
            {redo && <button onClick={onClickRedo}>한번더</button>}
        </>
    );
};
export default Lotto;