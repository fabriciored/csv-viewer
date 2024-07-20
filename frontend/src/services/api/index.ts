import { User } from "../../entities/user";

export const getPaginatedUsersSearch = async (query: string, page: number, limit: number): Promise<User[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users?q=${query}&page=${page}&limit=${limit}`);
  return res.json();
}

export const uploadCSVFile = async (data: FormData): Promise<{
  message: string
}> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/files`, {
    method: "POST",
    body: data,
  })
  return res.json();
}
