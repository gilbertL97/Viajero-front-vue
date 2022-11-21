import { reactive } from 'vue';
import { Contractor } from '../../types/contractor.types';

export default (contractR: Contractor) => {
    const contract = reactive<Contractor>({
        id: contractR.id,
        email: contractR.email,
        client: contractR.client,
        telf: contractR.telf,
        addres: contractR.addres,
        file: contractR.file,
        poliza: contractR.poliza,
        isActive: true,
    });
    return contract;
};
