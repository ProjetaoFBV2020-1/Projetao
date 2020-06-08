export default interface ICreateOrderItemDTO {
    order_id: string;
    item_id: string;
    quantity: number;
    name: string;
    description: string;
    total_value: number;
    item_value: number;
}
