import { useDispatch } from 'react-redux'
import type { getDataFormMarks, getDataSearchDate } from '../../types'
import style from './getDataPage.module.scss'
import { useEffect, useState } from 'react'
import { searchData, searchPublications } from '../../redux/search/searchThunk'
import type { AppDispatch } from '../../redux/store'
import { useNavigate } from 'react-router'


export const GetDataPage = () => {
    const token = localStorage.getItem('accessToken')
    const expire = localStorage.getItem('expire')
    const navigate = useNavigate()

    useEffect(()=>{
        if(!token || !expire || new Date(expire) < new Date()){
            navigate('/auth')
        }
    },[token, expire, navigate])

    const dispatch = useDispatch<AppDispatch>()

    const [form, setForm] = useState({
        INN: false,
        docs: false,
        dateSearch: false,
    })

    const [search, setSearch] = useState<getDataSearchDate>({
        searchFrom: '',
        searchTo: '',
    })

    const [documentsCount, setDocumentsCount] = useState<string>('')

    const [isOpenTonal, setIsOpenTonal] = useState<boolean>(false)

    const [tonalityType, setTonalityType] = useState<string>('Любая')

    const [companyINN, setCompanyINN] = useState<string>('')
    const INNk = [ 2, 4, 10, 3, 5, 9, 4, 6, 8 ]

    const [marks, setMarks] = useState<getDataFormMarks>({
        fullness: false,
        businessContext: false,
        mainRole: false,
        riskFactors: false,
        techNews: false,
        announcements: false,
        newsDigest: false,
    })

    const handlerClickMark = (markName: keyof getDataFormMarks) => {
        setMarks(marks => ({...marks, [markName]: !marks[markName]}))
    }

    const handlerChangeCompanyINN = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyINN(event.target.value)
    }

    const isValidINN_Func = () => {
        if(companyINN.trim().length === 10){
            const INN: string = companyINN.trim()
            let sum = 0
            let index = 0
            for(let k of INNk){
                const step= k * Number(INN[index])
                index+=1
                sum+=step
            }
            if(String(sum%11)[0]===INN[9]){
                return true
            }
        }
        return false
    }

    const handlerClickToOpenTonalMenu = () => {
        setIsOpenTonal(!isOpenTonal)
    }

    const handleToSelectTonal = (type:string) => {
        setTonalityType(`${type}`)
        setIsOpenTonal(false)
    }

    const handlerChangeDocumentsCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDocumentsCount(event.target.value)
    }

    const handlerChangeSearch = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setSearch(prev => ({...prev, [name]: event.target.value}))
    }

    const isValidDates = (searchFrom: string, searchTo: string) => {
        if(!searchFrom || !searchTo) return false

        const from = new Date(searchFrom)
        const to = new Date(searchTo)
        const now = new Date()

        if(from > to || from > now || to > now) return false

        return true
    }

    const isUserCanSearch:boolean = isValidINN_Func() &&
    documentsCount.trim() !== '' && 
    Number(documentsCount) <= 1000 && 
    1 <= Number(documentsCount) && 
    isValidDates(search.searchFrom, search.searchTo)

    useEffect(()=>{
        setForm((prev)=>({
            ...prev,
            INN: isValidINN_Func(),
            docs: 1 <= Number(documentsCount) && Number(documentsCount) <= 1000,
            dateSearch: isValidDates(search.searchFrom, search.searchTo)
        }))
    }, [companyINN, documentsCount, search])

    const submitData = () => {
        dispatch(searchData({
            inn: companyINN,
            tonality: tonalityType,
            limit: Number(documentsCount),
            searchDate: search,
            marks: marks,
        }))
        dispatch(searchPublications({
            inn: companyINN,
            tonality: tonalityType,
            limit: Number(documentsCount),
            searchDate: search,
            marks: marks,
        }))
        navigate('/results')
    }


    return(
        <section className={style.getDataPage}>
            <div className={style.getDataPageInner}>

                <div className={style.leftBlock}>

                    <div className={style.title}>
                        <h1>Найдите необходимые <br /> данные в пару кликов.</h1>
                        <p>Задайте параметры поиска. <br /> Чем больше заполните, тем точнее поиск</p>
                        <img className={style.img_doc_ad} src="/Document.svg" alt="" />
                    </div>

                    <div className={style.getData_form}>
                        <div className={style.getDataFormInner}>
                            
                            <div className={style.info}>

                                <div className={style.companyINN}>
                                    <h2>ИНН компании*</h2>
                                    <input
                                     value={companyINN} 
                                     type="text" placeholder='10 цифр' 
                                     onChange={handlerChangeCompanyINN} 
                                     style={{border: form.INN?'':'1px rgba(255, 89, 89, 1) solid', boxShadow: form.INN?'':'0px 0px 10px rgba(255, 89, 89, 1)'}}
                                    />
                                    <p style={{display: form.INN?'none':''}}>Введите корректные данные</p>
                                </div>

                                <div className={style.tonality}>
                                    <h2>Тональность</h2>

                                    <div className={style.tonal}>
                                        <p style={{display: isOpenTonal?'none':'flex'}}>{tonalityType}</p>                                        

                                        <div className={style.tonal_open} style={{display: isOpenTonal?'block':'none'}}>
                                            <div className={style.tonal_openText}>
                                                <p onClick={()=>handleToSelectTonal('Любая')}>Любая</p>
                                                <p onClick={()=>handleToSelectTonal('Позитивная')}>Позитивная</p>
                                                <p onClick={()=>handleToSelectTonal('Негативная')}>Негативная</p>
                                            </div> 
                                        </div>

                                        <img src="/search-arrow-down.svg" alt="" onClick={handlerClickToOpenTonalMenu}/>
                                    </div>

                                </div>

                                <div className={style.documentsCount}>

                                    <h2>Количество документов в выдаче*</h2>

                                    <div className={style.documentsCount_input}>
                                        <input 
                                         value={documentsCount} 
                                         type="text" 
                                         placeholder='1 - 1000' 
                                         onChange={handlerChangeDocumentsCount}
                                         style={{border: form.docs?'':'1px rgba(255, 89, 89, 1) solid', boxShadow: form.docs?'':'0px 0px 10px rgba(255, 89, 89, 1)'}}
                                        />
                                        <p style={{display: form.docs?'none':''}}>Обязательное поле</p>
                                    </div>

                                </div>

                                <div className={style.search}>
                                    <h2>Диапазон поиска*</h2>
                                    <div className={style.search_info}>

                                        <input
                                         value={search.searchFrom} 
                                         className={style.search_from} 
                                         placeholder='Дата начала' 
                                         type='date' 
                                         onChange={(event)=>handlerChangeSearch(event, 'searchFrom')}
                                         style={{border: form.dateSearch?'':'1px rgba(255, 89, 89, 1) solid', boxShadow: form.dateSearch?'':'0px 0px 10px rgba(255, 89, 89, 1)'}}
                                        />

                                        <input
                                         value={search.searchTo} 
                                         className={style.search_to} 
                                         placeholder='Дата конца' 
                                         type='date' 
                                         onChange={(event)=>handlerChangeSearch(event, 'searchTo')}
                                         style={{border: form.dateSearch?'':'1px rgba(255, 89, 89, 1) solid', boxShadow: form.dateSearch?'':'0px 0px 10px rgba(255, 89, 89, 1)'}}
                                        />

                                    </div>

                                    <p style={{display: form.dateSearch?'none':''}}>Введите корректные данные</p>
                                </div>

                            </div>

                            <div className={style.marks}>

                                <div className={style.marks_lines}>

                                    <div>
                                        <input type="checkbox" onChange={() => handlerClickMark('fullness')}/> 
                                        <p style={{color: marks.fullness?'#111':''}}>Признак максимальной полноты</p>
                                    </div>

                                    <div>
                                        <input type="checkbox" onChange={() => handlerClickMark('businessContext')}/> 
                                        <p style={{color: marks.businessContext?'#111':''}}>Упоминания в бизнес-контексте</p>
                                    </div>

                                    <div>
                                        <input type="checkbox" onChange={() => handlerClickMark('mainRole')}/> 
                                        <p style={{color: marks.mainRole?'#111':''}}>Главная роль в публикации</p>
                                    </div>

                                    <div>
                                        <input type="checkbox" onChange={() => handlerClickMark('riskFactors')}/> 
                                        <p style={{color: marks.riskFactors?'#111':''}}>Публикации только с риск-факторами</p>
                                    </div>

                                    <div>
                                        <input type="checkbox" onChange={() => handlerClickMark('techNews')}/> 
                                        <p style={{color: marks.techNews?'#111':''}}>Включать технические новости рынков</p>
                                    </div>

                                    <div>
                                        <input type="checkbox" onChange={() => handlerClickMark('announcements')}/> 
                                        <p style={{color: marks.announcements?'#111':''}}>Включать анонсы и календари</p>
                                    </div>

                                    <div>
                                        <input type="checkbox" onChange={() => handlerClickMark('newsDigest')}/> 
                                        <p style={{color: marks.newsDigest?'#111':''}}>Включать сводки новостей</p>
                                    </div>

                                </div>

                                <div className={style.marks_button}>
                                    <div className={style.marks_button_inner}>

                                        <button disabled={!isUserCanSearch}
                                         onClick={submitData}
                                         style={{backgroundColor: isUserCanSearch?'':'rgb(135, 149, 236)'}}> 
                                            Поиск 
                                        </button>

                                        <p>* Обязательные к заполнению поля</p>

                                    </div>
                                </div>
                                
                            </div>
                            

                        </div>
                    </div>

                </div>

                <div className={style.rightBlock}>

                    <div className={style.top_documents}>
                        <img src="/Document.svg" alt="" />
                        <img src="/Folders.svg" alt="" />
                    </div>

                    <img src="/getDataPage-main.svg" alt="" />

                </div>

                <img className={style.getDataPage_mainImg_ad} src="/getDataPage-main_ad.svg" alt="" />

            </div>
        </section>
    )

}