declare type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    token_type: string;
  };
};

declare type ProfileResponse = {
  success: boolean;
  message: string;
  data: User;
};
