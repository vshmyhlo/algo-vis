import React from "react";
import {Circle, Group, Layer, Line, Stage, Text} from "react-konva";
import {BinarySearchTree as BST, TreeNode} from "../algorithms/binarySearchTree";

interface Props {
}

interface State {
  tree: BST<number, number>
}

interface Point {
  x: number,
  y: number,
}

class BinarySearchTree extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      tree: new BST<number, number>(),
    };
  }

  handleClick() {
    const i = Math.random();
    this.state.tree.set(i, i);

    this.setState({
      tree: this.state.tree,
    })
  }

  collectNodes(node: TreeNode<number, number> | null, depth: number, pos: number, parent: Point | null): { pos: Point, parent: Point | null, node: TreeNode<number, number> }[] {
    if (node === null) {
      return [];
    }

    const step = 1 / Math.pow(2, depth + 1);

    const res = [{
      pos: {
        x: pos * window.innerWidth,
        y: depth * 25 + 25,
      },
      parent,
      node,
    }];

    const left = this.collectNodes(node.left, depth + 1, pos - step / 2, res[0].pos);
    const right = this.collectNodes(node.right, depth + 1, pos + step / 2, res[0].pos);

    res.push(...left);
    res.push(...right);

    return res;
  }

  renderTree(tree: BST<number, number>): React.ReactNode[] {
    const defs = this.collectNodes(tree.root, 0, 1 / 2, null);

    return defs.map(({pos, parent, node}) => (
      <Group key={node.key}>
        {(parent === null) ?
          null :
          <Line
            points={[pos.x, pos.y, parent.x, parent.y]}
            stroke={'gray'}
          />
        }
        <Circle
          x={pos.x}
          y={pos.y}
          radius={10}
          fill={'gray'}
        />
        <Text
          x={pos.x - 5}
          y={pos.y - 5}
          text={node.key.toFixed(2).toString()}
        />
      </Group>
    ));
  }

  render() {
    const maxWidth = window.innerWidth;
    const maxHeight = 500;

    return (
      <div>
        <Stage
          width={maxWidth}
          height={maxHeight}
        >
          <Layer>
            {this.renderTree(this.state.tree)}
          </Layer>
        </Stage>
        <button onClick={this.handleClick.bind(this)}>
          add
        </button>
      </div>
    )
  }

}

export default BinarySearchTree;