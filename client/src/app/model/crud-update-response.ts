export interface CrudUpdateResponse {
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldErrors?: { [key: string]: [{ code: string, args: any[] }] };
  globalError?: string;
}
