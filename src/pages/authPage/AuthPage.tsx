import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './authPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { userAuth } from '../../redux/auth/authThunk'
import type { AppDispatch, RootState } from '../../redux/store'


export const AuthPage = () => {

    const dispatch = useDispatch<AppDispatch>() 

    const { loading, error } = useSelector((state: RootState )=> state.auth) 

    const navigate = useNavigate()

    const [numberText, setNumberText] = useState<string>('')
    const [passwordText, setPasswordText] = useState<string>('')

    const handlerNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberText(event.target.value)
    }
    const handlerPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordText(event.target.value)
    }

    const isButtonActive = numberText && numberText.trim() !== '' && passwordText && passwordText.trim() !== '' || false
    
    const handlerButtonSendLogin = async () => {

        const result = await dispatch(userAuth({login: numberText, password: passwordText}))

            if(userAuth.fulfilled.match(result)){
                setNumberText('')
                setPasswordText('')
                navigate('/')
            }

    }


    return(
        <section className={style.authPage}>
            <div className={style.authPageInner}>

                <div className={style.authText}>
                    <h1>Для оформления подписки<br /> на тариф, необходимо <br /> авторизоваться.</h1>
                    <img src="/auth-main-img.svg" alt="" className={style.authImg}/>
                </div>

                <div className={style.authForm}>

                    <img className={style.authForm_lock} src="/lock.svg" alt=""/>

                    <div className={style.authFormInner}>

                        <div className={style.authForm_title}>
                            <a href="#">Войти</a>
                            <a href="#">Зарегистрироваться</a>
                        </div>

                        <div className={style.authForm_userInfo}>

                            <div className={style.firstLine}>
                                <p>Логин или номер телефона:</p>
                                <input type="text" onChange={handlerNumberInput} value={numberText}
                                style={{border:error !== null?'1px #ff5959 solid':'', boxShadow:error !== null?'0px 0px 10px #ff5959':''}}/>

                                {error !== null ? (
                                    <p className={style.wrongReqText}>Введите корректные данные</p>
                                ):(<></>)}
                            </div>

                            <div className={style.secondLine}>
                                <p>Пароль:</p>
                                <input type="password" onChange={handlerPasswordInput} value={passwordText}
                                style={{border:error !== null?'1px #ff5959 solid':'', boxShadow:error !== null?'0px 0px 10px #ff5959':''}}/>
                                {error !== null ? (
                                    <p className={style.wrongReqText}>Неправильный пароль</p>
                                ):(<></>)}
                            </div>
                            
                            <div className={style.authForm_button}>
                                <button disabled={!isButtonActive || loading} style={{backgroundColor:isButtonActive?'#5970ff':'#909cec8a'}} onClick={handlerButtonSendLogin}>
                                    Войти
                                </button>
                            </div>

                            <div className={style.authForm_resetPassword}>
                                <a href="#">Восстановить пароль</a>
                            </div>

                        </div>

                        <div className={style.another_login}>
                            <p>Войти через:</p>
                            <div className={style.company}>
                                <div className={style.companyInner}>      
                                    <a href="#"><img src="/google.svg" alt="" /></a>
                                    <a href="#"><img src="/facebook.svg" alt="" /></a>
                                    <a href="#"><img src="/yandex.svg" alt="" /></a>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>

                <img src="/auth-main-img.svg" alt=""  className={style.authAdImg}/>

            </div>
        </section>
    )
}