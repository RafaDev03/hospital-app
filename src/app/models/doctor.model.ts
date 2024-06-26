import { Hospital } from './hospital.model';

interface UserDoctor {
  _id: string;
  name: string;
  img: string;
}

export class Doctor {
  constructor(
    public id: string,
    public name: string,
    public user?: Hospital,
    public hospital?: UserDoctor,
    public img?: string
  ) {}
}
