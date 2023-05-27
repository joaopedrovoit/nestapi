import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  private readonly USERS_API_URL = process.env.USERS_API_URL;
  private readonly USERS_API_KEY = process.env.USERS_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async listUsers(since?: number): Promise<any> {
    const url = `${this.USERS_API_URL}/users`;
    const params = since ? { since } : undefined;
    const response = await lastValueFrom(this.httpService.get(url, { params }));
    const users = response.data;
    const nextPageLink = response.data[response.data.length - 1].id;
    return { users, nextPageLink }; // Retorna a resposta completa da rota
  }

  async getUserDetails(username: string): Promise<any> {
    const url = `${this.USERS_API_URL}/users/${username}`;
    const response = await lastValueFrom(this.httpService.get(url));
    console.log(response.data);
    return response.data; // Retorna a resposta completa da rota
  }

  async getUserRepos(username: string): Promise<any> {
    const url = `${this.USERS_API_URL}/users/${username}/repos`;
    const response = await lastValueFrom(this.httpService.get(url));
    console.log(response.data);
    return response.data; // Retorna a resposta completa da rota
  }
}
