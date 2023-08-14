export interface CustomerInputDTO{
    params: {
        id?: number;
        cpf?: string;
    }
}

export interface CustomerOutputDTO{
    hasError: boolean;
    message?: string;
    result?: resultClientDto[]; 
}

export type resultClientDto = {
    id: number;
    cpf: string;
    name: string;
    email: string;
    isActive: boolean;
}