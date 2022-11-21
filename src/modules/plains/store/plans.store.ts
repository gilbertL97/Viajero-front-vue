import { defineStore, createPinia } from 'pinia';
import { Plans } from '../types/plains.types';

const store = createPinia();

interface PlansState {
    plans: Plans[];
}

export const planStore = defineStore('plans', {
    state: (): PlansState => ({
        plans: [],
    }),
    getters: {
        getPlans(): Plans[] {
            return this.plans;
        },
        // getOnePlain(id): Plans | undefined {
        //     return this.plans.find((e) => {
        //         e.id! == ;
        //     });
        // },
    },
    actions: {
        setPlans(plais: Plans[]) {
            this.plans = plais;
        },
    },
});

export function usePlainStore() {
    return planStore(store);
}
