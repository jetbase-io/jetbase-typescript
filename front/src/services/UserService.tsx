import { SERVER_ROUTES } from "constants/server";
import { LoginDTO } from "models/dto/LoginDTO";
import { ResultContainer } from "models/ResultContainer";
import { User } from "models/User";
import http from "services/Http";

export class UserService {
  async checkLogin(): Promise<User | null> {
    try {
      const { data } = await http.get<User>(SERVER_ROUTES.USER.ROOT);
      return data?.username ? data : null;
    } catch {
      return null;
    }
  }

  async login(username: string, password: string): Promise<ResultContainer<User, string>> {
    try {
      const { data } = await http.post<ResultContainer<User, string>>(
        SERVER_ROUTES.USER.LOGIN,
        { username, password } as LoginDTO
      );
      return data;
    } catch {
      return {
        status: 'error',
        error: 'Server error',
      };
    }
  }
}

export const userService = new UserService();
