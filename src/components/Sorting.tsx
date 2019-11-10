import React from "react";
import {Layer, Rect, Stage} from 'react-konva';

interface Props {
  values: number[],
  lo: number,
  hi: number,
  swap: {
    i: number,
    j: number,
  } | null
}

function getColor(i: number, lo: number, hi: number, swap: Props['swap']) {
  let fill = 'gray';
 
  if (lo <= i && i < hi) {
    fill = 'black';
  }

  if (swap !== null) {
    if (i == swap.i) {
      fill = 'green';
    }
    if (i == swap.j) {
      fill = 'red';
    }
  }

  return fill;
}

const Sorting: React.FC<Props> = ({values, lo, hi, swap}) => {
  const boxWidth = 1 / values.length;
  const max = Math.max(...values);
  const boxHeights = values.map(value => value / max);

  const maxWidth = window.innerWidth;
  const maxHeight = 200;


  return (
    <Stage
      width={maxWidth}
      height={maxHeight}
    >
      <Layer>
        {boxHeights.map((boxHeight, i) =>
          <Rect
            key={i}
            x={i * maxWidth * boxWidth}
            y={maxHeight * (1 - boxHeight)}
            width={maxWidth * boxWidth}
            height={maxHeight * boxHeight}
            fill={getColor(i, lo, hi, swap)}
          />
        )}
      </Layer>
    </Stage>
  )
}

export default Sorting;