import style from './cardsSlider.module.scss'
import { useState } from 'react'

export const CardsSlider = () => {

    const soloCardArrayData:{img:string, text: string}[] = [
        {img: 'card-time', text: 'Высокая и оперативная скорость обработки заявки'},
        {img: 'card-bd', text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'},
        {img: 'card-security', text: 'Защита конфеденциальных сведений, не подлежащих разглашению'}
    ]

    const sliderCardsArrayData:{img:string, text: string}[] = [
        {img: 'card-time', text: 'Высокая и оперативная скорость обработки заявки'},
        {img: 'card-bd', text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'},
        {img: 'card-security', text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'},
    ]

    const [indexSoloCard, setIndexSoloCard] = useState<number>(0)
    const [indexSliderCard, setIndexSliderCard] = useState<number>(0)

    const handleClickRightArrow = () => {
        if(indexSoloCard === 2 || indexSliderCard === 2){
            setIndexSoloCard(0)
            setIndexSliderCard(0)
        }else{
            setIndexSoloCard(indexSoloCard+1)
            setIndexSliderCard(indexSliderCard+1)
        }
    }
    const handleClickLeftArrow = () => {
        if(indexSoloCard === 0 || indexSliderCard === 0){
            setIndexSoloCard(2)
            setIndexSliderCard(2)
        }else{
            setIndexSoloCard(indexSoloCard-1)
            setIndexSliderCard(indexSliderCard-1)
        }
    }


    return (
        <section className={style.cards_slider}>
            <div className={style.cardsSliderInner}>

            <h1 className={style.title}>ПОЧЕМУ ИМЕННО МЫ</h1>

            <div className={style.slider}>

                <img src="/left-arrow.svg" alt="" onClick={handleClickLeftArrow}/>

                <div className={style.cards}>

                    <div className={style.card_speed}>
                        <div className={style.cardSpeedInner}>
                            <img src={`/${sliderCardsArrayData[indexSliderCard%3].img}.svg`}alt="" />
                            <p className={style.card_text}>{sliderCardsArrayData[indexSliderCard%3].text}</p>
                        </div>
                    </div>

                    <div className={style.card_bd}>
                        <div className={style.cardBdInner}>
                            <img src={`/${sliderCardsArrayData[(indexSliderCard+1)%3].img}.svg`}alt="" />
                            <p className={style.card_text}>{sliderCardsArrayData[(indexSliderCard+1)%3].text}</p>
                        </div>
                    </div>

                    <div className={style.card_security}>
                        <div className={style.cardSecurityInner}>
                            <img src={`/${sliderCardsArrayData[(indexSliderCard+2)%3].img}.svg`} alt="" />
                            <p className={style.card_text}>{sliderCardsArrayData[(indexSliderCard+2)%3].text}</p>
                        </div>
                    </div>

                    <div className={style.soloCard}>
                        <div className={style.soloCardInner}>
                            <img src={`/${soloCardArrayData[indexSoloCard].img}.svg`} alt="" />
                            <p className={style.card_text}>{soloCardArrayData[indexSoloCard].text}</p>
                        </div>
                    </div>

                </div>

                <img src="/right-arrow.svg" alt="" onClick={handleClickRightArrow}/>

            </div>

            <div className={style.slider_img}>
                <img src="/cards-main-img.svg" alt="" />
            </div>

            <div className={style.slider_imgAd}>
                <img src="/cards-slider-ad-img.svg" alt="" />
            </div>

            </div>
        </section>
    )
}