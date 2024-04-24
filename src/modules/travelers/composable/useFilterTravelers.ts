import { FilterTravelers } from '../types/type.traveler';

const searchTravel: FilterTravelers = reactive({
    name: undefined,
    sex: undefined,
    passport: undefined,
    start_date_init: undefined,
    start_date_end: undefined,
    end_date_policy_init: undefined,
    end_date_policy_end: undefined,
    number_high_risk_days: undefined,
    contractor: undefined,
    origin_country: undefined,
    nationality: undefined,
    coverage: undefined,
    state: undefined,
});
export default function useTravelersFilters(current?: boolean) {
    //current && (searchTravel.state = true); //ver xq no coje con el state en true en la '
    const eraseSearch = () => {
        searchTravel.name = undefined;
        searchTravel.passport = undefined;
        searchTravel.start_date_init = undefined;
        searchTravel.start_date_end = undefined;
        searchTravel.end_date_policy_init = undefined;
        searchTravel.end_date_policy_end = undefined;
        searchTravel.contractor = undefined;
        searchTravel.origin_country = undefined;
        searchTravel.nationality = undefined;
        searchTravel.coverage = undefined;
        //se pone esto por si solo quiere los vigentes
        current ? (searchTravel.effective_date = new Date().toISOString()) : (searchTravel.effective_date = undefined);
    };
    const assignFilter = (filter: FilterTravelers) => {
        searchTravel.name = filter.name;
        searchTravel.passport = filter.passport;
        searchTravel.start_date_init = filter.start_date_init;
        searchTravel.start_date_end = filter.start_date_end;
        searchTravel.end_date_policy_init = filter.end_date_policy_init;
        searchTravel.end_date_policy_end = filter.end_date_policy_end;
        searchTravel.contractor = filter.contractor;
        searchTravel.origin_country = filter.origin_country;
        searchTravel.nationality = filter.nationality;
        searchTravel.coverage = filter.coverage;
        //se pone esto por si solo quiere los vigentes
        //current ? (searchTravel.state = true) : (searchTravel.state = filter.state);
        searchTravel.effective_date = filter.effective_date;
    };

    return {
        assignFilter,
        eraseSearch,
        searchTravel,
    };
}
