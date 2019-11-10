import React from "react";
import {Circle, Layer, Stage} from "react-konva";

class BinarySearchTree extends React.Component {
  render() {
    const maxWidth = window.innerWidth;
    const maxHeight = 200;

    return (
      <Stage
        width={maxWidth}
        height={maxHeight}
      >
        <Layer>
          <Circle
            x={10}
            y={10}
            radius={10}
            fill={'red'}
          />
          {/*{boxHeights.map((boxHeight, i) =>*/}
          {/*  <Rect*/}
          {/*    key={i}*/}
          {/*    x={i * maxWidth * boxWidth}*/}
          {/*    y={maxHeight * (1 - boxHeight)}*/}
          {/*    width={maxWidth * boxWidth}*/}
          {/*    height={maxHeight * boxHeight}*/}
          {/*    fill={getColor(i, lo, hi, swap)}*/}
          {/*  />*/}
          {/*)}*/}
        </Layer>
      </Stage>
    )
  }

}

export default BinarySearchTree;