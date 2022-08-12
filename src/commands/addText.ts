import { getImageAsBuffer, readImage } from '../utils';
import { CommandHandler } from '../types';
import sharp from 'sharp';

type SvgCreator = {
  width: number;
  height: number;
  fontSize: number;
  firstRow: string;
  secondRow?: string;
};

const MIN_FONT_SIZE = 16;
const PERCENT_FROM_IMAGE_HEIGHT = 0.05;
const LINE_HEIGHT = 1.5;

const createSvg = ({ width, height, fontSize, firstRow, secondRow }: SvgCreator): Buffer => {
  const svgViewBox = `0 0 ${width} ${height}`;

  const svg = `
    <svg viewBox="${svgViewBox}" width="100%" preserveAspectRatio="xMinYMin">
      <style>
        .title { font-size: ${fontSize}; }
      </style>
      <text x="50%" y="${fontSize}" alignment-baseline="hanging" text-anchor="middle" class="title">${firstRow}</text>
      <text x="50%" y="${
        fontSize * 2
      }" alignment-baseline="hanging" text-anchor="middle" class="title">${secondRow}</text>
    </svg>`;

  return Buffer.from(svg);
};

const addText: CommandHandler<string> = async (photoUrl: string, ...text: string[]) => {
  const image = await readImage(photoUrl);
  const { width = 0, height = 0 } = await image.metadata();

  const fontSizeRelativeToHeight = Math.ceil(height * PERCENT_FROM_IMAGE_HEIGHT);
  const fontSize =
    fontSizeRelativeToHeight > MIN_FONT_SIZE ? fontSizeRelativeToHeight : MIN_FONT_SIZE;

  // Max 2 rows
  const maxSymbolsPerRow = Math.ceil(width / (fontSize / 2));
  const firstRow = text.join(' ').slice(0, maxSymbolsPerRow);
  const secondRow = text.join(' ').slice(maxSymbolsPerRow, maxSymbolsPerRow * 2);

  // 1 row = 1.5 x fontSize
  const fontSizeCoefficient = secondRow.length === 0 ? fontSize : fontSize * 2;
  const textBlockHeight = Math.ceil(fontSizeCoefficient * LINE_HEIGHT);

  const containerImage = sharp({
    create: {
      width: width,
      height: height + textBlockHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255 },
    },
  }).jpeg();

  return getImageAsBuffer(
    containerImage.composite([
      {
        input: createSvg({ width, firstRow, secondRow, fontSize, height: textBlockHeight }),
        top: 0,
        left: 0,
      },
      {
        input: await image.toBuffer(),
        top: textBlockHeight,
        left: 0,
      },
    ])
  );
};

export { addText };
