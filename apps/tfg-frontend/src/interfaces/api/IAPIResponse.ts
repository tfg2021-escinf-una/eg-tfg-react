
export interface IAPIResponse<T> {
    statusCode : number,
    data : T,
    errors : Array<Object>
}