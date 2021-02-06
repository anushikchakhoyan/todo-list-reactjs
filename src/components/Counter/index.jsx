import React, {Component} from 'react';

import Result from "./Result";
import Action from "./Action";
import './index.css';

class Counter extends Component {
   constructor(props) {
       super(props);
       this.state = {
           count: 0,
       }
   }

    handlePlusCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    handleMinusCount = () => {
        this.setState({
            count: this.state.count - 1
        })
    }

    render() {
        return (
            <>
                <h2>Simple Counter</h2>
                <div className="counter-wrapper">
                    <Action handlePlusCount={this.handlePlusCount} handleMinusCount={this.handleMinusCount}/>
                    <Result count={this.state.count}/>
                </div>
            </>
        )
    }
}

export default Counter;
