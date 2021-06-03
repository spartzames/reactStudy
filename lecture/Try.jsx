import React from 'react';

const Try = ({ tryInfo }) => {

    return (
        <li key={tryInfo.key}> {/*props가 있으면 parent가 있다고 인식*/}
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
};

export default Try;