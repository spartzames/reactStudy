import React, { Component } from 'react';

class Try extends Component {

    render () {
        return (
            <li key={this.props.tryInfo.key}> {/*props가 있으면 parent가 있다고 인식*/}
                <div>{this.props.tryInfo.try}</div>
                <div>{this.props.tryInfo.result}</div>
            </li>
        );
    }

};

export default Try;