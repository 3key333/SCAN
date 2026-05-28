import { useSelector } from 'react-redux'
import style from './tariffs.module.scss'
import type { RootState } from '../../redux/store'

export const Tariffs = () => {

    const { isUserAuth } = useSelector((state: RootState) => state.auth)


    return(
        <section className={style.tariffs}>
            <div className={style.tariffsInner}>

                <h1>НАШИ ТАРИФЫ</h1>

                <div className={style.tariffs_cards}>

                    <div className={style.card_beginner}>

                        <div className={style.cardBeginner_title}>
                            <div className={style.cardBeginnerTitle_text}>
                                <h2>Beginner</h2>
                                <p>Для небольшого исследования</p>
                            </div>
                            <img src="/lamp.svg" alt="" />
                        </div>

                        <div className={style.cardBeginner_info}>

                            <div className={style.currentTariff}>
                                <p style={{display: isUserAuth ? '' : 'none'}}>Текущий тариф</p>
                            </div>

                            <div className={style.cardBeginnerInfo_price} style={{marginTop: isUserAuth ? '' : '24px'}}>
                                <h2>799 ₽ <span>1 200 ₽</span> </h2>
                                <p>или 150 ₽/мес. при рассрочке на 24 мес.</p>
                            </div>

                            <div className={style.cardInfo_checkMarks}>

                                <h2>В тариф входит:</h2>

                                <div className={style.mark_line}>
                                    <img src="/green-mark.svg" alt="" />
                                    <p>Безлимитная история запросов</p>
                                </div>

                                <div className={style.mark_line}>
                                    <img src="/green-mark.svg" alt="" />
                                    <p>Безопасная сделка</p>
                                </div>

                                <div className={style.mark_line}>
                                    <img src="/green-mark.svg" alt="" />
                                    <p>Поддержка 24/7</p>
                                </div>

                            </div>

                            <div className={style.cardInfo_button}>
                                <button style={{display: isUserAuth ? 'block' : 'none' }}>Перейти в личный кабинет</button>
                                <button className={style.notAuthUserButton} style={{display: isUserAuth ? 'none' : 'block'}}>Подробнее</button>
                            </div>

                        </div>

                    </div>

                    <div className={style.card_pro}>

                        <div className={style.cardPro_title}>
                            <div className={style.cardProTitle_text}>
                                <h2>Pro</h2>
                                <p>Для HR и фрилансеров</p>
                            </div>
                            <img src="/arrow.svg" alt="" />
                        </div>

                        <div className={style.cardPro_info}>

                            <div className={style.cardProInfo_price}>
                                <h2>1 299 ₽ <span>2 600 ₽</span> </h2>
                                <p>или 279 ₽/мес. при рассрочке на 24 мес.</p>
                            </div>

                            <div className={style.cardInfo_checkMarks}>

                                <h2>В тариф входит:</h2>

                                <div className={style.mark_line}>
                                    <img src="/green-mark.svg" alt="" />
                                    <p>Все пункты тарифа Beginner</p>
                                </div>

                                <div className={style.mark_line}>
                                    <img src="/green-mark.svg" alt="" />
                                    <p>Экспорт истории</p>
                                </div>

                                <div className={style.mark_line}>
                                    <img src="/green-mark.svg" alt="" />
                                    <p>Рекомендации по приоритетам</p>
                                </div>

                            </div>

                            <div className={style.cardInfo_buttonPro}>
                                <button>Подробнее</button>
                            </div>

                        </div>
                        
                    </div>

                    <div className={style.card_business}>

                        <div className={style.cardBusiness_title}>
                            <div className={style.cardBusinessTitle_text}>
                                <h2>Business</h2>
                                <p>Для корпоративных клиентов</p>
                            </div>
                            <img src="/laptop.svg" alt="" />
                        </div>

                        <div className={style.cardBusiness_info}>

                            <div className={style.cardBusinessInfo_price}>
                                <h2>2 379 ₽ <span>3 700 ₽</span> </h2>
                            </div>

                            <div className={style.cardInfo_checkMarks}>

                                <h2>В тариф входит:</h2>

                                <div className={style.mark_line}>
                                    <img src="/green-mark.svg" alt="" />
                                    <p>Все пункты тарифа Pro</p>
                                </div>

                                <div className={style.mark_line}>
                                    <img src="/green-mark.svg" alt="" />
                                    <p>Безлимитное количество запросов</p>
                                </div>

                                <div className={style.mark_line}>
                                    <img src="/green-mark.svg" alt="" />
                                    <p>Приоритетная поддержка</p>
                                </div>

                            </div>

                            <div className={style.cardInfo_buttonBusiness}>
                                <button>Подробнее</button>
                            </div>

                        </div>
                        
                    </div>

                </div>

            </div>
        </section>
    )
}