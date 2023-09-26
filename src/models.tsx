export interface IMessage {
  id?: number;
  name?: string;
  message?: string | string[];
  role?: string;
  date?: string;
  userId?: string | number;
}
export interface IDate {
  date: string;
  id?: string;
}
export interface IUsers {
  userId: number | string;
  id?: number;
  name?: string;
  role?: string;
}


export interface IMessagesStore {
  messages: IMessage[];
  users: IUsers[];
  botmessages: string[];
  addMessages: (message: IMessage, count:any) => void;
  removeMessage: (id: number) => void;
  editeMessage: (id: number, editMessage: string) => void
}