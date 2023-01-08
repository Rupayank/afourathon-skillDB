export enum Sessions {
  skillCreate = 'create-1',
  skillUpdate = 'update-1',
  skillDelete = 'delete-1',
}

export enum Subject {
  skillCreate = 'create',
  skillUpdate = 'update',
  skillDelete = 'delete',
}

export interface MessageContent {
  id: string;
  userName: string;
  userEmain: string;
  userId: string;
  skill: string[];
  domainName: string;
}
