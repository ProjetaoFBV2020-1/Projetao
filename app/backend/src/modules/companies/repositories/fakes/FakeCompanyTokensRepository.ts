import { uuid } from 'uuidv4';

import CompanyToken from '@modules/companies/infra/typeorm/entities/CompanyToken';
import ICompanyTokensRepository from '../ICompanyTokensRepository';

export default class FakeCompanyTokensRepository
    implements ICompanyTokensRepository {
    private companyTokens: CompanyToken[] = [];

    public async generate(company_id: string): Promise<CompanyToken> {
        const companyToken = new CompanyToken();

        Object.assign(companyToken, {
            id_token: uuid(),
            token: uuid(),
            company_id,
            created_at: new Date(),
            updated_at: new Date(),
        });

        this.companyTokens.push(companyToken);

        return companyToken;
    }

    public async findByToken(token: string): Promise<CompanyToken | undefined> {
        const companyToken = this.companyTokens.find(
            findToken => findToken.token === token,
        );

        return companyToken;
    }
}
