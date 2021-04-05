import { connect } from 'react-redux';

const CounterWithRedux = (props) => {

    return (
        <section className="py-4">
          <div className="d-flex flex-column align-items-center justify-content-center">
              <h4>Redux: Counter Component</h4>
              <div className="d-flex align-items-center p-3">
                  <button onClick={props.plus}>plus</button>
                  <p className="mb-0 mx-4">{props.counter}</p>
                  <button onClick={props.minus}>Minus</button>
              </div>
          </div>
        </section>
    );
}
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        plus: () => dispatch({ type: "plusCount" }),
        minus: function () {
            dispatch({ type: "minusCount" });
        }
    }
}

const CounterWithReduxDemo = connect(mapStateToProps, mapDispatchToProps)(CounterWithRedux);

export default CounterWithReduxDemo;
