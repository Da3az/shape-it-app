import { ShapeSizeEnum, ShapeTypeEnum } from '@prisma/client';

export const shapesList = [
  {
    id: ShapeTypeEnum.STAR,
    label: 'Star',
    name: 'star',
    icon: (
      <svg
        className="w-4 h-4 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 21 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"
        />
      </svg>
    ),
  },
  {
    id: ShapeTypeEnum.CIRCLE,
    label: 'Circle',
    name: 'circle',
    icon: (
      <svg
        className="h-4 w-4 "
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {' '}
        <path stroke="none" d="M0 0h24v24H0z" />{' '}
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    id: ShapeTypeEnum.RECTANGLE,
    label: 'Rectangle',
    name: 'rectangle',
    icon: (
      <svg
        className="w-4 h-4 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 18"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
        />
      </svg>
    ),
  },
];

export const colors = [
  {
    name: 'red',
    label: 'Red',
    id: '#ff5959',
    icon: <span className="bg-red-400 w-4 h-4 rounded" />,
  },
  {
    name: 'blue',
    label: 'Blue',
    id: '#60a5fa',
    icon: <span className="bg-blue-400 w-4 h-4 rounded" />,
  },
  {
    name: 'green',
    label: 'Green',
    id: '#4ec3ae',
    icon: <span className="bg-green-400 w-4 h-4 rounded" />,
  },
];

export const sizes = [
  {
    id: ShapeSizeEnum.SMALL,
    label: 'Small',
    name: 'small',
  },
  {
    id: ShapeSizeEnum.MEDIUM,
    label: 'Medium',
    name: 'medium',
  },
  {
    id:  ShapeSizeEnum.BIG,
    label: 'Big',
    name: 'big',
  },
];
