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
}
