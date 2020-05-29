import { container } from 'tsyringe';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ItemsRepository from '@modules/items/infra/typeorm/repositories/ItemsRepository';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import CompaniesRepository from '@modules/companies/infra/typeorm/repositories/CompaniesRepository';

// o primeiro parâmetro é o id, geralmente utiliza-se o nome do repositório/classe
// o segundo é o que ele vai retornar
// a tipagem é opcional, mas coloca-se a interface do segundo parâmetro para
// obriga-lo a ter o formato desejado, senão não funciona
container.registerSingleton<IItemsRepository>(
    'ItemsRepository',
    ItemsRepository,
);

container.registerSingleton<ICustomersRepository>(
    'CustomersRepository',
    CustomersRepository,
);

container.registerSingleton<ICompaniesRepository>(
    'CompaniesRepository',
    CompaniesRepository,
);
