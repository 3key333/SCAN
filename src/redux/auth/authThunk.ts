import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { EventFiltersInfo } from "../../types";

export const userAuth = createAsyncThunk(
    'auth/login',
    async({login, password}:{login:string, password: string}, {rejectWithValue}) => {

        try {
            const { data } = await axios.post<{accessToken: string, expire: string}>(`${import.meta.env.VITE_URL}/api/v1/account/login`, {login, password})
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('expire', data.expire)
            return data //payload
        } catch (error) {
            return rejectWithValue('ошибка, запрос отклонился')
        }

    }
)


export const userInfoAboutCompany = createAsyncThunk(
    'user/info',
    async (_, {rejectWithValue}) => {
        
        try {

            const token = localStorage.getItem('accessToken')

            if(token){
                const { data } = await axios.get<EventFiltersInfo>(
                    `${import.meta.env.VITE_URL}/api/v1/account/info`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

               return data.eventFiltersInfo
            }

            return rejectWithValue('пользователь не зарегистрирован')
            
        } catch (error) {
            return rejectWithValue('ошибка получения данных о пользователе')
        }
        
    } 
)
