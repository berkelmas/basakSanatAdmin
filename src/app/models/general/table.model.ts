export interface ITableState {
  sortField: string;
  sort: string;
  pageNumber: number;
  pageSize: number;
  filter?: {
    [index: number]: {
      field: string;
      filterText: string;
    };
  };
  filterDate?: IDateFilter;
  filterEnum?: IEnumFilter;
}

export interface IGeneralResponse {
  errorCode: number;
  message: string;
  hasError: boolean;
  hasSuccessMessage: boolean;
  resultCount: number;
  rowCount: number;
}

export interface IFilter {
  [index: number]: {
    field: string;
    filterText: string;
  };
}

export interface IDateFilter {
  field: string;
  startDate: Date;
  finishDate: Date;
}

export interface IEnumFilter {
  field: string;
  fieldValue: string;
  fieldEnumType: string;
}
