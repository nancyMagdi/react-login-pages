import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "../auth/dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Find a user by email
   * @param email User's email address
   * @returns User document if found, null otherwise
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).select("+password").exec();
  }

  /**
   * Create a new user
   * @param createUserDto User data
   * @returns Created user document
   */
  async create(createUserDto: CreateUserDto): Promise<User > {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  /**
   * Find a user by ID
   * @param id User ID
   * @returns User document if found
   * @throws NotFoundException if user not found
   */
  async findById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  /**
   * Verify user password
   * @param id User ID
   * @param password Password to verify
   * @returns Boolean indicating if password matches
   */
  async verifyPassword(id: string, password: string): Promise<boolean> {
    const user = await this.userModel.findById(id).select("+password").exec();
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return bcrypt.compare(password, user.password);
  }
}
