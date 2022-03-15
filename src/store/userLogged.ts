import { defineStore} from 'pinia';

export type User={id:number,name:string,role:string}
export const UserStore=defineStore({
    state:()=>({
    user:User,
    }),
    getter:{

    },
    action:{}
});