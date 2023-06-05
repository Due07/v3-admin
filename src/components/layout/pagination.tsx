import { ElPagination } from 'element-plus';
interface Ipagination {
    size: number;
    page: number;
    total: number;
}

export default (prop: Ipagination = { size: 1, page: 10 , total: 0}) => {
    console.log(prop);
    return (
        <ElPagination
            pageSize={prop.size}
            pageCount={prop.page}
            total={prop.total}
        />
    );
};
