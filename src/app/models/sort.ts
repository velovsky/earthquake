export interface Sort {
  label: string;
  value: Sort.SortEnum;
}

export namespace Sort {
  export type SortEnum = 'MAG_ASC' | 'MAG_DESC' | 'DATE_ASC' | 'DATE_DESC';
  export const SortEnum = {
    MAG_ASC: 'MAG_ASC' as SortEnum,
    MAG_DESC: 'MAG_DESC' as SortEnum,
    DATE_ASC: 'DATE_ASC' as SortEnum,
    DATE_DESC: 'DATE_DESC' as SortEnum
  };
}
