export interface GetOrderQueueInputDTO{
    id?: number;
}

export interface GetOrderQueueOutputDTO {
    hasError: boolean;
    message?: string;
    result?: orderqueueInfo[];
  }
  
  export type orderqueueInfo = {
    id: number;
    status: string;
    waiting_time: string;
  };