import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userRepository: typeof UserModel,
  ) {}

  async removeUser(id_telegram: number) {
    try {
      return await this.userRepository.destroy({ where: { id_telegram } });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async createUser(id_telegram: number) {
    try {
      return await this.userRepository.create({ id_telegram });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUserById(id_telegram: number) {
    try {
      return await this.userRepository.findOne({ where: { id_telegram } });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUsers(limit: number, page: number) {
    try {
      const users = await this.userRepository.findAll({
        limit: limit,
        offset: (page - 1) * limit,
      });

      const totalUsers = await this.userRepository.count();
      const totalPages = Math.ceil(totalUsers / limit);

      return { users, totalPages };
    } catch (e) {
      throw new Error(e);
    }
  }
}
