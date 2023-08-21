export interface CreateCustomerInputDTO {
  name: string;
  email: string;
  cpf: string;
  isActive: boolean;
}

export interface CreateCustomerOutputDTO {
  hasError: boolean;
  message?: string[];
  result?: customerInfo[];
}

export type customerInfo = {
  id: number;
  cpf: string;
  name: string;
  email: string;
  isActive: boolean;
};
