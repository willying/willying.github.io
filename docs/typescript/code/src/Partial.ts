interface IProps {
  name: string
  age: number
  gender: string
}

type PartialProps = Partial<IProps>;

const obj: PartialProps = {}