export default interface ICreateOrderItemDTO {
    order_id: string;
    item_id: string;
    quantity: number;
    item_value: number;
    total_value: number;
    description: string;
}
