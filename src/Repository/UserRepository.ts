import { getRepository } from "typeorm";
import { User } from "@/entities/user";
import { Name } from "@/Types/types";

export const getAllUsers = async (): Promise<User[]> => {
    const userRepository = getRepository(User);
    return userRepository.find();
};

export const  getUser = async (id: number): Promise<User | undefined> => {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ user_id: id });
    if (!user) return undefined;

    return user;
};

export const createUser = async (payload: Name): Promise<User> => {
    const userRepository = getRepository(User);
    let user;
    return userRepository.save({
        ...user,
        ...payload,
    });
};

