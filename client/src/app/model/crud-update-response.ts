export interface CrudUpdateResponse {
  success: boolean;
  // tslint:disable-next-line:no-any
  fieldErrors?: { [key: string]: [{ code: string, args: any[] }] };
  globalError?: string;
}
