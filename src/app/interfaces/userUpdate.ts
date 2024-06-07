export type TUserUpdate = {
  name?: string;
  username?: string;
  email?: string;
};

export type TManageUser = {
  role: 'ADMIN' | 'USER';
  activeStatus: 'ACTIVE' | 'INACTIVE';
};
