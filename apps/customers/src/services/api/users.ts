import { api } from './client';
import { type CreateUserDto, type UpdateUserDto, type User, type PaginatedUsers } from '@src/types';

export async function fetchUsers(params: { page: number; limit: number }): Promise<PaginatedUsers> {
  const { page, limit } = params;
  const res = await api.get('/users', { params: { page, limit } });

  return res.data as unknown as PaginatedUsers;
}

export async function fetchUserById(id: number): Promise<User> {
  const res = await api.get(`/users/${id}`);
  return res.data as User;
}

export async function createUser(payload: CreateUserDto): Promise<User> {
  const res = await api.post('/users', payload);
  return (res.data as User)
}

export async function updateUser(id: number, payload: UpdateUserDto): Promise<User> {
  const res = await api.patch(`/users/${id}`, payload);
  return (res.data as User) ?? { id, ...payload };
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`);
}