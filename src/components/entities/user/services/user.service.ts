import { AxiosResponse, AxiosRequestConfig } from "axios"
import { addAuthHeader } from "@/components/auth/services/auth.service"
import API from "@/service/api"
import { User } from '@/components/entities/user/types/modeltypes'
import { useAuthStore} from '@/components/auth/store/auth.store'
const store= useAuthStore();

export async function getUsers(): Promise<AxiosResponse<User[]>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/user',
     
    }
    addAuthHeader(store.getToken as string) ;
    return await API.request<User[]>(config)
  }
  export async function deleteUsers(id:number): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: '/user/'+id,

    }
    addAuthHeader(store.getToken as string) ;
    return await API.request<void>(config)
  }
  
  export async function editUsers(id:number,user:User): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: '/user',
      data:user,
    }
    addAuthHeader(store.getToken as string) ;
    return await API.request<void>(config)
  }

  