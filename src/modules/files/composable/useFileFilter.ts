import { FileD, FilterFileD } from '../type/file.type';

const filterFiler = reactive<FilterFileD>({
    name: undefined,
    start_date_create: undefined,
    end_date_create: undefined,
    contractor: undefined,
});
export default function useFileFilter() {
    const eraseSearch = () => {
        filterFiler.name = undefined;
        filterFiler.start_date_create = undefined;
        filterFiler.end_date_create = undefined;
        filterFiler.contractor = undefined;
    };
    const assignFilter = (file: FileD) => {
        filterFiler.name = file.name;
        filterFiler.start_date_create = file.start_date_create;
        filterFiler.end_date_create = file.end_date_create;
        filterFiler.contractor = file.contractor;
    };
    return { eraseSearch, assignFilter, filterFiler };
}
