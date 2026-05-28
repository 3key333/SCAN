import style from './getData.module.scss'
import searchMainImg from '/search-main-img.svg'
import { useNavigate } from 'react-router-dom'

export const GetData = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem('accessToken')


    return(
        <section className={style.getData}>
        <div className={style.getDataInner}>

        <div className={style.getData_text}>
            <h1>СЕРВИС ПО ПОИСКУ <br /> ПУБЛИКАЦИЙ <br /> О КОМПАНИИ <br /> ПО ЕГО ИНН</h1>
            <p>Комплексный анализ публикаций, получение данных <br /> в формате PDF на электронную почту.</p>

            <div className={style.getData_button}>
                <button style={{display: token? '':'none'}} onClick={()=>navigate('/get-data')}>Запросить данные</button>
            </div>
        </div>

        <div className={style.getData_img}>
            <img src={searchMainImg} alt="" />
        </div>

        </div>
    </section>
    )
}