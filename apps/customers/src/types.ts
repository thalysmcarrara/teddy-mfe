export type User = {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
};

export type CreateUserDto = {
  name: string;
  salary: number;
  companyValuation: number;
};

export type UpdateUserDto = {
  name: string;
  salary: number;
  companyValuation: number;
};

export type PaginatedUsers = {
  clients: User[];
  totalPages: number;
  currentPage: number;
};
