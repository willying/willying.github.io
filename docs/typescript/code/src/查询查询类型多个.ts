type Props = {
  a: number
  b: string
  c: boolean
}

type TypeProps = Props[keyof Props]