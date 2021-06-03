import React, { PureComponent, memo, useState } from 'react';

// class Try extends PureComponent {
    // constructor(props) {
    //     super(props);
    //     //다른 정밀한 동작이 필요하면 함수구조가 필요
    //     const filtered = this.props.filter(() => {
    //         //
    //     });
    //         // this.state= {
    //         // result: filtered,
    //         // try: this.props.try,
    // // };

    // }

//     render () {
//         const { tryInfo } = this.props;
//         return (
//             <li>
//                 <div>{tryInfo.try}</div>
//                 <div>{tryInfo.result}</div>
//             </li>
//         );
//     }
// }

const Try = memo(({ tryInfo }) => {
    //const [result, setResult] = useState(tryInfo.result); // props는 자식에서 바로 바꾸면 안되고 state로 사용해서 바꿈 (좋은 구조가아님)

    // const onClick = () => {
    //     setResult('1');
    // };

    return (
        <li key={tryInfo.key}> {/*props가 있으면 parent가 있다고 인식*/}
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
            {/* <div onClick={onClick}>{result}</div> */}
        </li>
    );
});

export default Try;