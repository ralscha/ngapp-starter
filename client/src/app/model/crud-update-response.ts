export interface CrudUpdateResponse {
  success: boolean;
  fieldErrors?: { [key: string]: [{ code: string, args: any[] }] };
  globalError?: string;
}
