import React, { PureComponent } from 'react';

class RenderTest extends PureComponent {
    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: [],
        array: [],
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //     return false;
    // }

    onClick = () => {
        // const array = this.state.array;
        // array.push(1);
        // this.setState({
        //     array: array,
        // }); // 현재 array와 push한 array가 같다고 인식해서 rendering이 안됨
        this.setState((prevState) => {
            return {
                array: [...prevState.array, 1],
            };
        });
    }

    render() {
        console.log('렌더링', this.state);
        return (<div>
            <button onClick={this.onClick}>클릭</button>
        </div>)
    }
}

export default RenderTest;