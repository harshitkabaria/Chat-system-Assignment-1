import User from './users';

interface Channels {
  id: number;
  name: string;
  users: Array<User>;
}

export default Channels;
