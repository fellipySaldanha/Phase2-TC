import CPF from '../../../../sharedKernel/valueObjects/CPF';
import Email from '../../../../sharedKernel/valueObjects/Email';

export default class Customer {
  id?: number;
  email: Email;
  name: string;
  cpf: CPF;
  isActive: boolean;
  private UNAMED_USER: number = 1;

  constructor(
    name: string,
    email: Email,
    cpf: CPF,
    isActive: boolean,
    id?: number,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.cpf = cpf;
    this.isActive = isActive;
    this.validate();
  }

  private validate() {
    let errors: string[] = [];
    if (this.id == this.UNAMED_USER) {
      return;
    }
    if (!this.cpf.value) {
      errors.push('CPF is required');
    }
    if (!this.email.value) {
      errors.push('Email is required');
    }
    if (!this.name) {
      errors.push('Name is required');
    }
    if (errors.length > 0) {
      throw errors;
    }
  }
}
