import mongoose, { Schema, Types } from 'mongoose';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "./../config";

enum UserRole {
  End_User,
  Admin
}

interface IUser extends Document {
  id: string;
  role: UserRole;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  country: string;
  phone: string;
  repository: string;
  languages?: { language: string; level: string }[];
  picture: Buffer;
  resume: Buffer;
  courseIds: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  role: {
    type: Number,
    default: UserRole.End_User,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  repository: {
    type: String,
    required: true,
  },
  languages: [
    {
      language: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        required: true,
      },
    },
  ],
  picture: {
    type: Buffer,
    required: true,
  },
  resume: {
    type: Buffer,
    required: true,
  },
  courseIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
});

UserSchema.methods.generateAuthToken = function () {
  const token = jsonwebtoken.sign({ _id: this._id }, JWT_SECRET);
  return token;
};

UserSchema.pre<UserDoc>('save', async function (next): Promise<void> {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcryptjs.genSalt(12);
  this.password = await bcryptjs.hash(this.password, salt);
});

const User = mongoose.model<IUser>('User', UserSchema);
type UserDoc = ReturnType<(typeof User)['hydrate']>;

export { User, UserDoc, IUser, UserRole };