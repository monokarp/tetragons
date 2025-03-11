import {
  centroidOf,
  maxShapeLengths,
  Point,
  sortByPolarAngle,
  Zone,
} from '@tetragons/shared';

// I'm making these up, in your real world scenario coordinate ranges and scaling are probably known in advance
export const expectedRangeX = 20;
export const expectedRangeY = 12;
const scalePadding = 0.8;

interface CanvasSize {
  width: number;
  height: number;
}

interface CanvasOffsets {
  scaleFractionX: number;
  scaleFractionY: number;
  offsetOriginX: number;
  offsetOriginY: number;
}

interface OffsetCalculator {
  X: (v: number) => number;
  Y: (v: number) => number;
}

export function drawZones(
  context: CanvasRenderingContext2D,
  canvasSize: CanvasSize,
  zones: Zone[]
) {
  const offsetCalc = calculateOffsets(canvasSize);

  for (const one of zones) {
    drawZone(context, offsetCalc, one);
  }
}

function calculateOffsets({ width, height }: CanvasSize): OffsetCalculator {
  const offsets: CanvasOffsets = {
    scaleFractionX: (width / (expectedRangeX * 2)) * scalePadding,
    scaleFractionY: (height / (expectedRangeY * 2)) * scalePadding,
    offsetOriginX: width / 2,
    offsetOriginY: height / 2,
  };

  return {
    X: (coord: number) =>
      coord * offsets.scaleFractionX + offsets.offsetOriginX,
    Y: (coord: number) =>
      coord * offsets.scaleFractionY + offsets.offsetOriginY,
  };
}

function drawZone(
  context: CanvasRenderingContext2D,
  offsets: OffsetCalculator,
  zone: Zone
) {
  context.beginPath();

  sortByPolarAngle(zone.points).forEach((point, idx) =>
    drawPoint(context, offsets, point, idx)
  );

  context.closePath();

  colorCurrentShape(context);

  drawShapeLabel(context, offsets, zone);
}

function drawPoint(
  context: CanvasRenderingContext2D,
  offsets: OffsetCalculator,
  [x, y]: Point,
  index: number
) {
  const canvasX = offsets.X(x);
  const canvasY = offsets.Y(y);

  if (index === 0) {
    context.moveTo(canvasX, canvasY);
  } else {
    context.lineTo(canvasX, canvasY);
  }
}

function colorCurrentShape(context: CanvasRenderingContext2D) {
  context.strokeStyle = 'black';
  context.lineWidth = 2;
  context.stroke();

  context.fillStyle = 'white';
  context.fill();
}

function drawShapeLabel(
  context: CanvasRenderingContext2D,
  offsets: OffsetCalculator,
  zone: Zone
) {
  const [labelX, labelY] = centroidOf(zone.points);
  const [width, height] = maxShapeLengths(zone.points);

  const labelFontSizePx = Math.round(Math.max(width, height) * 5);

  context.font = `bold ${labelFontSizePx}px serif`;
  context.fillStyle = 'red';
  context.fillText(
    zone.name,
    offsets.X(labelX) - width * 7,
    offsets.Y(labelY) + height / 2
  );
}
