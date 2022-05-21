const UserModel = require('../model/User-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

class UserService {
	async registration(email, password) {
		const candidate = await UserModel.findOne({email});
		if (candidate) {
			throw new Error('A user with this email has already been created');
		}
		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink =  uuid.v4(); // random 
		
		const user = await UserModel.create({email, password: hashPassword, activationLink});
		await mailService.sendActivationMail(email, activationLink);
		
		const userDto = new UserDto(user); // id, email, isActivated
		const tokens = tokenService.genetateTokens({...userDto});
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {...tokens, user: userDto}
	}
}

module.exports = new UserService();