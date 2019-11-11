import Context from "../algorithms/context";
import {Action, Done, quickSort, SelectSubset, Swap, Update} from "../algorithms/quickSort";
import React from "react";
import Sorting from "./Sorting";


interface Props {
}

interface State {
  context: Context<Action>,
  values: number[],
  lo: number,
  hi: number,
  swap: {
    i: number,
    j: number,
  } | null
}

class QuickSort extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const values = Array(500).fill(0).map(() => Math.random());

    this.state = {
      context: new Context<Action>(),
      values,
      lo: 0,
      hi: values.length,
      swap: null,
    };
  }

  componentDidMount() {
    quickSort(this.state.values, this.state.context);
  }

  async handleClick() {
    const id = setInterval(() => {
      const action = this.state.context.get();
      console.log(action);

      if (action instanceof SelectSubset) {
        this.setState({
          lo: action.lo,
          hi: action.hi,
        });
      } else if (action instanceof Update) {
        this.setState({
          values: action.seq
        });
      } else if (action instanceof Swap) {
        this.setState({
          swap: {
            i: action.i,
            j: action.j,
          }
        })
      } else if (action instanceof Done) {
        clearInterval(id);
      }
    }, 10);
  }

  render() {
    return (
      <div>
        <Sorting
          values={this.state.values}
          lo={this.state.lo}
          hi={this.state.hi}
          swap={this.state.swap}
        />

        <button
          onClick={this.handleClick.bind(this)}
        >
          next
        </button>
      </div>
    )
  }
}

export default QuickSort
