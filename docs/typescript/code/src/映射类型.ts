type PropsKeys = 'x' | 'y' | 'z';

type Type1 = {
  [Key in PropsKeys]: number
}

const obj:Type1 = {
  x: 1,
  y: 1,
  z: 1
}