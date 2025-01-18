export type User = {
  id: string;
  email: string;
  name: string;
  spaceId: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  user: User;
};
