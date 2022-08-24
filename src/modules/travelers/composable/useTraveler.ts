import { Plans } from '@/modules/plains/types/plains.types';
import { CalculateDays } from '@/common/helper/dateHelper';
import { ref } from 'vue';

export function useTraveler(
    coverage: Plans,
    startDate: Date,
    endDate: Date,
    highRiskDays: number,
) {
    const totalAmountHighRisk = ref(0);
    const totalAmountCoveredDays = ref(0);
    const totalAmount = ref(0);

    const numberOfDays = ref(0);

    numberOfDays.value = CalculateDays.daysDifference(startDate, endDate);
}
function calculateHighRisk(dayHighRisk: number, days: number) {
    return dayHighRisk * days;
}

function CoverageAmount(coverage: Plans, days: number) {
    return coverage.daily ? coverage.price : coverage.price * days;
}
