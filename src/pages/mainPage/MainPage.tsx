import { CardsSlider } from '../../components/cardsSlider/CardsSlider'
import { GetData } from '../../components/getData/GetData'
import { Tariffs } from '../../components/tariffs/Tariffs'

export const MainPage = () => {

    return(
        <>
            <GetData/>
            <CardsSlider/>
            <Tariffs/>
        </>
    )
}
