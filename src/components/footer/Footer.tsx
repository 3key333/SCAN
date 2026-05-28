import style from './footer.module.scss'
import footerLogo from '/footer-logo.svg'

export const Footer = () => {
    return(
        <>
            <footer className={style.mainFooter}>
                <div className={style.footerInner}>

                    <div className={style.footer_logo}>
                        <img src={footerLogo} alt="" />
                    </div>

                    <div className={style.footer_textInfo}>
                        <p>г. Москва, Цветной б-р, 40</p>
                        <p>+7 495 771 21 11</p>
                        <a href="#">info@skan.ru</a>
                        <p>Copyright. 2026</p>
                    </div>

                </div>
            </footer>
        </>
    )
}