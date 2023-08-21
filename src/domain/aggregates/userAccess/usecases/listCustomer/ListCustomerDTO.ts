export interface ListCustomerInputDTO {
  params: {
    id?: number;
    cpf?: string;
  };
}

export interface ListCustomerOutputDTO {
  hasError: boolean;
  message?: string;
  result?: customerInfo[];
}

export type customerInfo = {
  id: number;
  cpf: string;
  name: string;
  email: string;
  isActive: boolean;
};
