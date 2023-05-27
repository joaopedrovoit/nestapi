import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { of } from 'rxjs';

describe('UsersService', () => {
  let userService: UsersService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('listUsers', () => {
    it('should list users with success', async () => {
      // Arrange
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
        data: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' },
          { id: 3, name: 'User 3' },
        ],
      } as AxiosResponse<unknown, any>;
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

      // Act
      const result = await userService.listUsers();

      // Assert
      expect(result).toEqual({
        users: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' },
          { id: 3, name: 'User 3' },
        ],
        nextPageLink: 3,
      });
      expect(httpService.get).toBeCalledTimes(1);
    });
  });

  describe('getUserDetails', () => {
    it('should get user details with success', async () => {
      // Arrange
      const username = 'joaopedrovoit';
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
        data: {
          id: 113628775,
          username: 'joaopedrovoit',
          name: 'João Pedro Voit',
        },
      } as AxiosResponse<unknown, any>;
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

      // Act
      const result = await userService.getUserDetails(username);

      // Assert
      expect(result).toEqual({
        id: 113628775,
        username: 'joaopedrovoit',
        name: 'João Pedro Voit',
      });
      expect(httpService.get).toBeCalledTimes(1);
      expect(httpService.get).toBeCalledWith(expect.stringContaining(`/users/${username}`));
    });
  });
  describe('getUserRepos', () => {
    it('should get user repositories with success', async () => {
      // Arrange
      const username = 'joaopedrovoit';
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
        data: [
          {
            id: 1,
            name: 'repo1',
            description: 'Repository 1',
          },
          {
            id: 2,
            name: 'repo2',
            description: 'Repository 2',
          },
        ],
      } as AxiosResponse<unknown, any>;
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

      // Act
      const result = await userService.getUserRepos(username);

      // Assert
      expect(result).toEqual([
        {
          id: 1,
          name: 'repo1',
          description: 'Repository 1',
        },
        {
          id: 2,
          name: 'repo2',
          description: 'Repository 2',
        },
      ]);
      expect(httpService.get).toBeCalledTimes(1);
      expect(httpService.get).toBeCalledWith(expect.stringContaining(`/users/${username}/repos`));
    });
  });
});
