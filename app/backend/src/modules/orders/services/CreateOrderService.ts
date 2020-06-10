import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';
import IOrderItemsRepository from '../repositories/IOrderItemsRepository';
import ICreateOrderItemDTO from '../dtos/ICreateOrderItemDTO';
import Order_item from '../infra/typeorm/entities/Order_item';

interface IRequest {
    company_id: string;
    customer_id: string;
    description: string;
    orderItems: ICreateOrderItemDTO[];
}

interface IResponse {
    order: Order;
    order_items: Order_item[];
}

@injectable()
class CreateOrderService {
    private totalPrice = 0;

    // private id_items = [];

    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,

        @inject('OrderItemsRepository')
        private orderItemsRepository: IOrderItemsRepository,

        @inject('ItemsRepository')
        private itemsRepository: IItemsRepository,

        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,

        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({
        company_id,
        customer_id,
        description,
        orderItems,
    }: IRequest): Promise<IResponse> {
        const company = await this.companiesRepository.findById(company_id);

        if (!company) {
            throw new AppError('Invalid company id');
        }

        const customer = await this.customersRepository.findById(customer_id);

        if (!customer) {
            throw new AppError('Invalid customer id');
        }

        const orderInitial = await this.ordersRepository.create({
            company_id,
            customer_id,
            description,
            company_name: company.company_name,
            customer_name: customer.name,
        });
        const id_items: string[] = [];

        orderItems.map(orderItem => id_items.push(orderItem.item_id));

        const items = await this.itemsRepository.findByIds(id_items);

        if (!items) {
            await this.ordersRepository.deleteOrder(orderInitial);
            await this.orderItemsRepository.deleteByOrderId(
                orderInitial.id_order,
            );
            throw new AppError('item not found');
        }

        // eslint-disable-next-line array-callback-return
        orderItems.map(orderItem => {
            const itemOrder = items.find(
                item => orderItem.item_id === item.id_item,
            );
            if (!itemOrder) {
                return;
            }
            orderItem.item_value = itemOrder.price;
            orderItem.name = itemOrder.name;
            orderItem.order_id = orderInitial.id_order;
            orderItem.total_value = itemOrder.price * orderItem.quantity;
            orderItem.description = orderInitial.description;

            this.totalPrice += orderItem.total_value;
        });

        const order_items = await this.orderItemsRepository.createArray(
            orderItems,
        );

        orderInitial.total_value = this.totalPrice;

        const order = await this.ordersRepository.save(orderInitial);

        return { order, order_items };
    }
}

export default CreateOrderService;
