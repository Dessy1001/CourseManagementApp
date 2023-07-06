import { Buffer } from "buffer";

enum UserRole {
  End_User,
  Admin
}

interface IUser extends Document {
  id: string;
  role?: UserRole;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  country: string;
  phone: string;
  repository: string;
  picture: any;
  resume: any;
  courseIds?: string[];
}

export { UserRole, IUser };