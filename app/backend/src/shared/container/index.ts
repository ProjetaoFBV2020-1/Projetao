import { container } from 'tsyringe';

import './providers';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ItemsRepository from '@modules/items/infra/typeorm/repositories/ItemsRepository';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import CompaniesRepository from '@modules/companies/infra/typeorm/repositories/CompaniesRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import IOrderItemsRepository from '@modules/orders/repositories/IOrderItemsRepository';
import OrderItemsRespository from '@modules/orders/infra/typeorm/repositories/OrderItemsRepository';

import ICompanyTokensRepository from '@modules/companies/repositories/ICompanyTokensRepository';
import CompanyTokensRepository from '@modules/companies/infra/typeorm/repositories/CompanyTokensRepository';

import CustomerTokensRepository from '@modules/customers/infra/typeorm/repositories/CustomerTokensRepository';
import ICustomerTokensRepository from '@modules/customers/repositories/ICustomerTokensRepository';

import AddressCompaniesRepository from '@modules/companies/infra/typeorm/repositories/AddressCompaniesRepository';
import IAddressCompaniesRepository from '@modules/companies/repositories/IAddressCompaniesRepository';

import AddressesCustomerRepository from '@modules/customers/infra/typeorm/repositories/AddressesCustomerRepository';
import IAddressesCustomerRepository from '@modules/customers/repositories/IAddressesCustomerRepository';

container.registerSingleton<IOrdersRepository>(
    'OrdersRepository',
    OrdersRepository,
);

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

container.registerSingleton<ICompaniesRepository>(
    'CompaniesRepository',
    CompaniesRepository,
);

container.registerSingleton<IAddressesCustomerRepository>(
    'AddressesCustomerRepository',
    AddressesCustomerRepository,
);

container.registerSingleton<IOrderItemsRepository>(
    'OrderItemsRepository',
    OrderItemsRespository,
);

container.registerSingleton<ICompanyTokensRepository>(
    'CompanyTokensRepository',
    CompanyTokensRepository,
);

container.registerSingleton<ICustomerTokensRepository>(
    'CustomerTokensRepository',
    CustomerTokensRepository,
);

container.registerSingleton<IAddressCompaniesRepository>(
    'AddressCompaniesRepository',
    AddressCompaniesRepository,
);
