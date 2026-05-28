import type { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import style from './header.module.scss'
import { useEffect, useState } from 'react'
import { logout } from '../../redux/auth/authSlice'
import { userInfoAboutCompany } from '../../redux/auth/authThunk'
import { useNavigate, Link } from 'react-router-dom'


export const Header = () => {

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    const { userInfoLoading, userInfo } = useSelector((state: RootState) => state.auth)

    const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false)

    const token = localStorage.getItem('accessToken')

    const handlerClickBurger = () => {
        setIsBurgerOpen(!isBurgerOpen)
    }

    const handlerClickLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    useEffect(()=>{
        if(token){
            dispatch(userInfoAboutCompany())
        }
    }, [token, dispatch])
    
    return(
        <>
        {isBurgerOpen === false ?(
            <header className={style.mainHeader}>
                <div className={style.headerInner}>

                    <div className={style.header_logo}>
                        <img src='/header-logo.svg' alt="" />
                    </div>

                    <nav className={style.header_nav}>
                        <Link className={style.nav_link} to={'/'}>Главная</Link>
                        <span className={style.nav_link}>Тарифы</span>
                        <span className={style.nav_link}>FAQ</span>
                    </nav>

                    <div className={style.accountInfo_header}>

                        <div className={style.accountInfo_header_notAuth} style={{display: token?'none':'flex'}}>
                            <span>Зарегистрироваться</span>
                            <div className={style.accountInfo_seperator}></div>
                            <Link to={'/auth'}>Войти</Link>
                        </div>

                        <div className={style.accountInfo_header_auth} style={{display: token?'flex':'none'}}>

                            <div className={style.accountInfoCompany}>
                                <div className={style.accountInfoCompanyInner}>
                                    
                                    {userInfoLoading ? (
                                        <div className={style.infoLoading}>
                                            <img src="/userInfo-loading.svg" alt="" />
                                        </div>
                                    )
                                    :
                                    (
                                        <>
                                        <div className={style.usedCompany}>
                                            <p>Использовано компаний </p>
                                            <p>{userInfo?.usedCompanyCount}</p>
                                        </div>

                                        <div className={style.limit}>
                                            <p>Лимит по компаниям</p>
                                            <p>{userInfo?.companyLimit}</p>
                                        </div>
                                        </>
                                    )
                                    }

                                </div>
                            </div>

                            <div className={`${style.accountName} ${style.hideOnMobile}`}>
                                <p>Алексей А.</p>
                                <button onClick={handlerClickLogout}>Выйти</button>
                            </div>

                            <div className={`${style.account_logo} ${style.hideOnMobile}`}>
                                <img src="/header-account-logo.svg" alt="" />
                            </div>
                            
                        </div>

                    </div>

                    <div className={style.burger}>
                        <img src="/burger.svg" alt="" onClick={handlerClickBurger}/>
                    </div>

                </div>
            </header>
            ) :
            (
            <header className={style.openedMenu_header}>
                <div className={style.openedMenuHeaderInner}>

                    <div className={style.menuLogo}>
                        <img src="/ad-headerMenu-logo.svg" alt="" />
                        <img src="/cross.svg" alt="" onClick={handlerClickBurger}/>
                    </div>

                    <nav className={style.menuHeader_navbar}>
                        <Link to={'/'}>Главная</Link>
                        <span>Тарифы</span>
                        <span>FAQ</span>
                    </nav>

                    {token?(<></>):(
                        <>
                        <div className={style.notAuthAccount}>
                            <span>Зарегистрироваться</span>

                            <div className={style.notAuthAccount_button}>
                                <Link to={'/auth'}>Войти</Link>
                            </div>
                        </div>
                        </>
                    )}

                </div>
            </header>
            )}
        </>
    )
}