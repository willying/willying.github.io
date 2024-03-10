interface IProps {
  name: string;
  age: number;
  gender: string;
  hobby: string[]
}

type pickProps = Pick<IProps, 'name' | 'age'>

const person: pickProps = {
  name: "will",
  age: 26
}