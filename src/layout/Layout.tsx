import { Footer } from '../components/footer/Footer'
import { Header } from '../components/header/Hedaer'
import { MainPage } from '../pages/mainPage/MainPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import style from './layout.module.scss'
import { AuthPage } from '../pages/authPage/AuthPage'
import { GetDataPage } from '../pages/getDataPage/GetDataPage'
import { ResultPage } from '../pages/resultPage/ResultPage'

export const Layout = () => {
    return(
        <div className={style.layout}>
          <BrowserRouter>
           <Header/>
              <main className={style.main}>
                  <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/auth' element={<AuthPage/>}/>
                    <Route path='/get-data' element={<GetDataPage/>}/>
                    <Route path='/results' element={<ResultPage/>}/>
                  </Routes>
              </main>
           <Footer/>
          </BrowserRouter>
        </div>
    )
}