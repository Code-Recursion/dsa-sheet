import { connectDB } from "@/lib/mongodb";
import type { AuthUser } from "@/lib/types/auth";
import { User } from "../models/User";

export type StoredUser = AuthUser & {
  passwordHash: string;
};

export function toPublicUser(user: any): AuthUser {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
}

export async function findUserByEmail(email: string) {
  await connectDB();

  return await User.findOne({
    email: email.toLowerCase(),
  }).lean();
}

export async function findUserById(id: string) {
  await connectDB();

  return await User.findById(id).lean();
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
}) {
  await connectDB();

  const normalizedEmail = input.email.toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    return null;
  }

  const user = await User.create({
    name: input.name.trim(),
    email: normalizedEmail,
    passwordHash: input.passwordHash,
  });

  return user.toObject();
}