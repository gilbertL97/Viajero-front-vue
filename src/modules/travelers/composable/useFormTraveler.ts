import { onMounted, reactive, ref, watch } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { TravelerResponse, Traveler } from '@/modules/travelers/types/type.traveler';
import {
    getTraveler,
    insertTraveler,
    updateTraveler,
} from '@/modules/travelers/services/traveler.service';
import { usePlainStore } from '@/modules/plains/store/plans.store';
import { useRouter } from 'vue-router';

export default function useFormTraveler(id?: string) {
    const router = useRouter();
    const store = usePlainStore();

    //const days = ref(0);
    const contract = reactive<{
        id?: number;
        client?: string;
    }>({
        id: undefined,
        client: undefined,
    });
    const nationality = reactive<{
        iso?: string;
        name?: string;
    }>({
        iso: undefined,
        name: undefined,
    });
    const origin = reactive<{
        iso?: string;
        name?: string;
    }>({
        iso: undefined,
        name: undefined,
    });
    const plans = reactive<{
        id?: number;
        name?: string;
    }>({
        id: undefined,
        name: undefined,
    });
    const hasChanged = ref(true);

    const traveler: Traveler = reactive({
        name: '',
        sex: undefined,
        born_date: null,
        email: undefined,
        passport: '',
        sale_date: null,
        start_date: null,
        end_date_policy: null,
        number_high_risk_days: 0,
        contractor: undefined,
        origin_country: undefined,
        nationality: undefined,
        coverage: undefined,
        number_days: 0,
        amount_days_high_risk: 0,
        amount_days_covered: 0,
        total_amount: 0,
    });

    const loading = ref(false);
    onMounted(async () => {
        if (id) {
            loading.value = true;
            const travelerR = (await getTraveler(id)).data;
            hasChanged.value = false;

            intializateTraveler(travelerR);
            console.log(traveler.contractor);
            loading.value = false;
        }
    });
    const disabledDateInit = (current: Dayjs) => {
        // Debe seleccionar un dia mayor q la fecah fin
        return current > dayjs(traveler.end_date_policy).endOf('day');
    };
    const disabledDateEnd = (current: Dayjs) => {
        // Debe seleccionar mayor q la fecha inicio

        return current < dayjs(traveler.start_date).endOf('day');
    };

    const onFinish = (values: any) => {
        console.log('Succes', values);
        if (id) {
            try {
                updateTraveler(traveler);
            } catch (error) {}
        } else {
            try {
                insertTraveler(traveler);
            } catch (error) {}
        }
        router.push({ name: 'travelers' });
    };
    const handleCancel = () => {
        router.push({ name: 'travelers' });
    };
    const onFinishFailed = (values: any) => {
        console.log('tiht', traveler.contractor, values);
    };
    const asignContract = (value: any) => {
        traveler.contractor = value;
        console.log('este es la agencia :' + value);
    };
    const asignPlans = (value: number) => {
        traveler.coverage = value;
    };
    const asignOriginCountry = (value: string) => {
        traveler.origin_country = value;
    };
    const asignNationality = (value: string) => {
        traveler.nationality = value;
    };

    const intializateTraveler = (travelerR: TravelerResponse) => {
        traveler.id = travelerR.id;
        traveler.name = travelerR.name;
        traveler.sex = travelerR.sex;
        traveler.born_date = travelerR.born_date;
        traveler.email = travelerR.email;
        traveler.passport = travelerR.passport;
        traveler.sale_date = travelerR.sale_date;
        traveler.start_date = travelerR.start_date;
        traveler.end_date_policy = travelerR.end_date_policy;
        traveler.number_high_risk_days = travelerR.number_high_risk_days;
        traveler.contractor = travelerR.contractor?.id;
        traveler.origin_country = travelerR.origin_country?.iso;

        traveler.nationality = travelerR.nationality?.iso;
        traveler.coverage = travelerR.coverage?.id;
        traveler.number_days = travelerR.number_days;
        traveler.amount_days_high_risk = travelerR.amount_days_high_risk;

        traveler.amount_days_covered = travelerR.amount_days_covered;
        traveler.total_amount = travelerR.total_amount;
        contract.id = travelerR.contractor!.id!;
        contract.client = travelerR.contractor!.client;
        nationality.iso = travelerR.nationality?.iso;
        nationality.name = travelerR.nationality?.comun_name;
        origin.iso = travelerR.origin_country?.iso;
        origin.name = travelerR.origin_country?.comun_name;
        plans.id = travelerR.coverage?.id;
        plans.name = travelerR.coverage?.name;
    };
    const calculate = () => {
        const plans = store.getPlans.find((e) => e.id == traveler.coverage);
        const start = dayjs(traveler.start_date);
        const end = dayjs(traveler.end_date_policy);
        traveler.number_days = end.diff(start, 'day') + 1;
        console.log('dias de diferencia ' + end.diff(start, 'day'));

        traveler.amount_days_high_risk =
            traveler.number_high_risk_days != 0
                ? plans!.daily
                    ? plans!.high_risk! * traveler.number_high_risk_days!
                    : 0
                : 0;

        traveler.amount_days_covered = plans?.daily
            ? traveler.number_days * plans!.price!
            : plans!.price!;

        traveler.total_amount =
            traveler.amount_days_high_risk != 0
                ? traveler.amount_days_covered + traveler.amount_days_high_risk
                : traveler.amount_days_covered;
    };
    watch(
        [
            () => traveler.start_date,
            () => traveler.end_date_policy,
            () => traveler.coverage,
            () => traveler.number_high_risk_days,
        ],
        () => {
            if (
                traveler.coverage &&
                traveler.end_date_policy &&
                traveler.start_date &&
                hasChanged.value
            ) {
                calculate();
            }
            hasChanged.value = true;
        },
    );
    watch([() => traveler.number_days], () => {
        const plans = store.getPlans.find((e) => e.id == traveler.coverage);
        if (!plans?.daily) {
            if (traveler.number_days > plans!.number_of_days!) {
                console.log('Entro a poner Null', plans);
                traveler.start_date = null;
                traveler.end_date_policy = null;
                console.log(traveler.coverage);
            }
        }
    });

    const tets = () => {
        console.log(hasChanged.value);
        hasChanged.value = true;
        console.log(hasChanged.value);
    };
    return {
        traveler,
        contract,
        nationality,
        origin,
        loading,
        plans,
        disabledDateInit,
        disabledDateEnd,
        onFinish,
        handleCancel,
        onFinishFailed,
        asignContract,
        asignPlans,
        asignOriginCountry,
        asignNationality,
        tets,
    };
}
