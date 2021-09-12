import User from './users';
import Channel from './channels';

interface Groups {
  id: number;
  name: string;
  channels: Array<Channel>;
  users: Array<User>;
  assis: Array<User>;
}

export default Groups;
