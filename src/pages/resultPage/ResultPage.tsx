import { useNavigate } from 'react-router'
import style from './resultPage.module.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import type { DataListCard } from '../../types'
import { searchDocuments } from '../../redux/search/searchThunk'

export const ResultPage = () => {
    const token = localStorage.getItem('accessToken')
    const expire = localStorage.getItem('expire')
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        if(!token || !expire || new Date(expire) < new Date()){
            navigate('/auth')
        }
    },[token, expire, navigate])

    const { data, loading, error, publicationsId, documents, documentsLoading } = useSelector((state: RootState) => state.search)

    useEffect(()=>{
        if(error){
            navigate('/')
            alert('со стороны сервиса произошла ошибка')
            
        }
    }, [error, navigate])

    useEffect(()=>{

        if(publicationsId?.items){
            const ids = publicationsId.items.map((item) => {
                return item.encodedId
            })
            dispatch(searchDocuments({ids}))
        }

    }, [publicationsId])
    
    const histograms = data?.data ?? []

    const totalHistograms = histograms.find((histogram) => histogram.histogramType === 'totalDocuments')
    const totalRisk = histograms.find((histogram) => histogram.histogramType === 'riskFactors')

    const info = totalHistograms?.data.map((totalObj) => {
        const totalRiskObj = totalRisk?.data.find((obj) => obj.date === totalObj.date)

        return{
            period: totalObj.date.slice(0, 10),
            total: totalObj.value ?? 0,
            risk: totalRiskObj?.value ?? 0
        }
    }) ?? []

    const currentCards: DataListCard[] = [...info]

    const [sliceCountStart, setSliceCountStart] = useState<number>(0)
    const [sliceCountEnd, setSliceCountEnd] = useState<number>(7)
    const [sliceCountStartAd, setSliceCountStartAd] = useState<number>(0)
    const [sliceCountEndAd, setSliceCountEndAd] = useState<number>(1)

    const isMobile = window.innerWidth <= 376

    const handlerClickRightArrow = () => {
        if(isMobile){

            if(sliceCountEndAd < currentCards.length) {
                setSliceCountStartAd(sliceCountStartAd + 1)
                setSliceCountEndAd(sliceCountEndAd + 1)
            }

        }else{

            if(sliceCountEnd < currentCards.length){
                setSliceCountStart(sliceCountStart + 1)
                setSliceCountEnd(sliceCountEnd + 1)
            }

        }
    }

    const handlerClickLeftArrow = () => {
        if(isMobile){

            if(sliceCountStartAd !== 0) {
                setSliceCountStartAd(sliceCountStartAd - 1)
                setSliceCountEndAd(sliceCountEndAd - 1)
            }
            
        }else{

            if(sliceCountStart !== 0 ){
                setSliceCountStart(sliceCountStart - 1)
                setSliceCountEnd(sliceCountEnd - 1)
            }

        }
    }

    // работа с XML разметкой:
    const getImageFromMarkup = (markup: string): string | null => {
        const match = markup.match(/<img[^>]+src="([^"]+)"/i)
        return match ? match[1] : null
    }

    const getPlainTextFromMarkup = (raw: string): string => {
        if (!raw) return ''

        const textarea = document.createElement('textarea')
        textarea.innerHTML = raw
        let text = textarea.value

        for (let i = 0; i < 3; i++) {
          const doc = new DOMParser().parseFromString(text, 'text/html')
          const next = doc.body?.textContent ?? ''
          if (!next || next === text) break
          text = next
        }

        return text
          .replace(/<[^>]+>/g, ' ')
          .replace(/&nbsp;/gi, ' ')
          .replace(/\s+/g, ' ')
          .trim()

    }

    const getWordsCountFromMarkup = (markup: string): number => {

        if (!markup) return 0

        const text = markup
          .replace(/<[^>]*>/g, ' ')
          .replace(/&nbsp;/gi, ' ')
          .replace(/\s+/g, ' ')
          .trim()

        if (!text) return 0
        return text.split(' ').length

    }

    const [laizyCountEnd, setLaizyCountEnd] = useState<number>(2)

    const handlerClickLoadMore = () => {
        if(laizyCountEnd < (documents?.length ?? 0)){
            setLaizyCountEnd(laizyCountEnd+2)
        }
    }



    return(
        <section className={style.resultPage}>
            <div className={style.resultPageInner}>

                <div className={style.resultPage_title}>
                    <div className={style.text}>
                        <h1>Ищем. Скоро <br /> будут результаты</h1>
                        <p>Поиск может занять некоторое время, <br /> просим сохранять терпение.</p>
                    </div>
                    <img src="/result-page_mainImg.svg" alt="" />
                </div>

                <div className={style.generalSummary}>
                    
                    <div className={style.generalSummary_title}>
                        <h1>Общая сводка</h1>
                        <p>Найдено {info.length} вариантов</p>
                    </div>
                    
                    <div className={style.generalSummary_sliderBlock}>
                        <img src="/left-arrow.svg" alt=""  onClick={handlerClickLeftArrow}/>

                            <div className={style.slider}>
                                <div className={style.slider_inner}>
                                    
                                    <div className={style.leftInfo}>

                                        <p>Период</p>
                                        <p>Всего</p>
                                        <p>Риски</p>

                                    </div>

                                    <div className={style.rightInfo}>
                                        <div className={style.cards} style={{justifyContent: loading?'center':''}}>

                                            <div className={style.loading} style={{display: loading?'block':'none'}}>
                                                <img src="/userInfo-loading.svg" alt="" />
                                                <p>Загружаем данные </p>
                                            </div>

                                            {currentCards.slice(sliceCountStart, sliceCountEnd).map((card) => (
                                                <div className={style.cardWrapper} key={card.period}>

                                                    <div className={style.card_info}>
                                                        <p>{card.period}</p>
                                                        <p>{card.total}</p>
                                                        <p>{card.risk}</p>
                                                    </div>

                                                    <div className={style.seperator}></div>

                                                </div>
                                            ))}

                                        </div>

                                        <div className={style.card_ad}>

                                            <div className={style.loading} style={{display: loading?'block':'none', textAlign: 'center'}}>
                                                <img src="/userInfo-loading.svg" alt="" />
                                            </div>

                                            {currentCards.slice(sliceCountStartAd, sliceCountEndAd).map((card) => (
                                                <div className={style.card_line} key={card.period}>
                                                    <p>{card.period}</p>
                                                    <p>{card.total}</p>
                                                    <p>{card.risk}</p>
                                                </div>
                                            ))}

                                        </div>
                                    </div>

                                </div>
                            </div>

                        <img src="/right-arrow.svg" alt="" onClick={handlerClickRightArrow}/>
                    </div>

                    <div className={style.documents}>

                        <h1 className={style.documents_title}>СПИСОК ДОКУМЕНТОВ</h1>

                        <div className={style.documents_list}>

                            <p style={{display: documentsLoading? 'flex':'none', justifyContent: 'center'}}>Загрузка документов...</p>

                            <div className={style.documents_line} style={{display: documentsLoading? 'none':''}}>
                            {documents?.slice(0, laizyCountEnd).map((doc) => (
                                doc.ok? (
                                    <div className={style.document_card} key={doc.ok.id}>
                                        <div className={style.documentCard_date}>
                                            <p>{doc.ok.issueDate.slice(8, 10)}-{doc.ok.issueDate.slice(5,7)}-{doc.ok.issueDate.slice(0,4)}</p>
                                            {doc.ok.url.trim() && (
                                                <a href={doc.ok.url} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()}>{doc.ok.source?.name.slice(0, 40)}...</a>
                                            )}
                                        </div>

                                        <div className={style.documentCard_title}>
                                            <h2>{doc.ok.title.text}</h2>
                                        </div>

                                        <div className={style.documentCard_techNews}>
                                            <p>Технические новости</p>
                                        </div>

                                        <div className={style.documentCard_img}>
                                            <img src={getImageFromMarkup(doc.ok.content?.markup ?? '') ?? '/zero_png.jpg'} alt="" />
                                        </div>

                                        <div className={style.documentCard_text}>
                                            <p>{getPlainTextFromMarkup(doc.ok.content?.markup).slice(0, 300)}</p>
                                            <p>{getPlainTextFromMarkup(doc.ok.content?.markup).slice(301, 400) + '...'}</p>
                                        </div>

                                        <div className={style.documentCard_bottom}>

                                            <div className={style.documentCard_button}>
                                                {doc.ok.url.trim() && (
                                                    <a href={doc.ok.url} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()}>Читать в источнике</a>
                                                )}
                                            </div>

                                            <p>{getWordsCountFromMarkup(doc.ok.content?.markup ?? '')} Слова</p>
                                            
                                        </div>


                                    </div>
                                ) : (<></>)
                            ))}
                            </div>
                        </div>

                        <div className={style.loadMore_button}>
                            <button onClick={handlerClickLoadMore}>Показать больше</button>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    )
}