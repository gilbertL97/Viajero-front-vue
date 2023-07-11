export class PaginationDto {
    limit? = 10;

    page? = 1;

    order?: Order = Order.ASC;
}
enum Order {
    ASC = 'ASC',
    DESC = 'DESC',
}
