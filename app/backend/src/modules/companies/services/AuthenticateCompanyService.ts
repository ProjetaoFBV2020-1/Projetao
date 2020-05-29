import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import Company from '../infra/typeorm/entities/Company';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

interface IRequest {
    email: string;
    password: string;
}
interface IResponse {
    company: Company;
    token: string;
}

@injectable()
class AuthenticateCompanyService {
    constructor(
        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const company = await this.companiesRepository.findByEmail(email);

        if (!company) {
            throw new AppError('Incorrect email/password combination', 401);
        }
        // company.password - Senha criptografada
        // password - Senha enviada pelo usuario
        // compare do bcrypt compara uma senha criptografa com uma não e verifica se elas são iguais
        const passwordMatched = await compare(password, company.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }
        // autenticado
        // nunca colocar senha ou dados sensiveis no token

        const token = sign({}, authConfig.jwt.secret, {
            subject: company.id_company,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            company,
            token,
        };
    }
}
export default AuthenticateCompanyService;
