export interface ColumnDef {
  readonly field: string;
  readonly header: string;
  align?: 'right' | 'center';
  readonly sortable?: boolean;
}
