interface IPerson {
  name: string;
}
interface IContact {
  phone: number;
}
type PersonDetail = IContact & IPerson;

const obj: PersonDetail = {
  name: "will",
  phone: 15196393510,
};


