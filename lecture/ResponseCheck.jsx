import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    // useState -> 값이 바뀌면 return 부분이 다시 rendering
    // useRef -> 값이 바뀌어도 return 부분 rendering 하지 않음
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);

    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if(state === 'waiting') {
            setState('ready');
            setMessage('초록색이되면 클릭하세요');
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 random
        } else if (state === 'ready') {
            clearTimeout(timeout);
            setState('waiting');
            setMessage('성급하시군요. 초록색이 되면 클릭하세요.');
        } else if (state === 'now') {
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요.')
            setResult((prevResult) => {
                return (
                    [...prevResult, endTime.current - startTime.current]
                );
            });
        }
    }

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return (
            (result.length === 0) 
            ? null
            : <>
                <div>평균시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </>
        );
    };

    return (
        <>
            <div
            id="screen"
            className={state}
            onClick={onClickScreen}
            >
                {message}
            </div>
            {/* 즉시실행 함수를 만들어서 함수 내부에서 if문 사용*/}
            {/* {(() => {
                if (result.length === 0) {
                    return null;
                } else {
                    return (
                        <>
                            <div>평균시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
                            <button onClick={onReset}>리셋</button>
                        </>
                    );
                }
            })()} */}
            {/* 즉시실행 함수를 만들어서 함수 내부에서 for문 사용 */}
            {/* {(() => {
                const array = [];
                for(let i = 0; i < tries.length; i++) {
                    array.push(<Try key={`${i + 1 }차 시도 : `} tryInfo={v} index={i} />);
                }
                return array;
            })()} */}

            {renderAverage()}
        </>
    );
}

export default ResponseCheck;