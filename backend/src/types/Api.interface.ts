export interface IApiResponse<T> {
  data: IDataPayload<T>;
  statusCode: number;
  statusText: string;
  message?: string;
}

export interface IDataPayload<T> {
  message: string;
  payload: T;
  status?: string;
  validation_result?: any;
}