import { Tag } from './Tag';
import { User } from './User';

export interface Module {
  id: number;
  author: User;
  name: string;
  description: string;
  tags: Tag[];
}
