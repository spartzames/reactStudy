import React, { PureComponent, memo } from 'react';

// class Try extends PureComponent {
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

    return (
        <li key={tryInfo.key}> {/*props가 있으면 parent가 있다고 인식*/}
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
});

export default Try;