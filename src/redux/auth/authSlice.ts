import { createSlice } from "@reduxjs/toolkit";
import { userAuth, userInfoAboutCompany } from "./authThunk";



interface authState {
    isUserAuth: boolean;
    loading: boolean;
    userInfoLoading: boolean;
    userInfo:{
        "usedCompanyCount":number | null,
        "companyLimit": number | null,
    };
    error: string | null
}

const initialState: authState = {
    isUserAuth: false,
    loading: false,
    userInfoLoading: false,
    userInfo:{
        'usedCompanyCount': null,
        'companyLimit': null,
    },
    error: null,
}

const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {

            logout: (state) => {
                state.isUserAuth = false
                state.loading = false
                state.userInfoLoading = false
                state.userInfo = {
                    'usedCompanyCount': null,
                    'companyLimit': null,
                }
                state.error = null
                localStorage.removeItem('accessToken')
                localStorage.removeItem('expire')
            }

        },
        extraReducers: (builder) => {

            builder

                //auth
                .addCase(userAuth.pending, (state) => {
                    state.isUserAuth = false;
                    state.loading = true;
                    state.error = null;
                })

                .addCase(userAuth.fulfilled, (state) => {
                    state.isUserAuth = true;
                    state.loading = false;
                    state.error = null;
                })

                .addCase(userAuth.rejected, (state) => {
                    state.isUserAuth = false;
                    state.loading = false;
                    state.error = 'запрос на вход пользователя отклонен';
                })

                // userInfo
                .addCase(userInfoAboutCompany.pending, (state) => {
                    state.userInfoLoading = true;
                    state.error = null
                })

                .addCase(userInfoAboutCompany.fulfilled, (state, action) => {
                    state.userInfoLoading = false;
                    state.userInfo = {
                        usedCompanyCount: action.payload.usedCompanyCount,
                        companyLimit: action.payload.companyLimit
                    };
                    state.error = null
                })

                .addCase(userInfoAboutCompany.rejected, (state) => {
                    state.userInfoLoading = false;
                    state.userInfo = {
                        'usedCompanyCount': null,
                        'companyLimit': null,
                    };
                    state.error = 'запрос на получение информации о компаниях отклонен'
                })

        }

    }
)

export default authSlice.reducer
export const { logout } = authSlice.actions