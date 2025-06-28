import {Message} from './messages.interface'

export interface Forum {
  _id?: string;
  title: string;
  creatorName: string;
  creatorEmail:  string;
  messages: Message[];
  createdAt?: string;
  ueCode: string;

  // Props front uniquement
  showMessages?: boolean;
  newMessage?: string;
}
