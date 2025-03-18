import picture from './picture.png';
import bannerStyle from './banner.module.css'
export default function Banner(){
    return(
        <figure className={bannerStyle.container}>
            <img className={bannerStyle.picture} src={picture} alt="Text"/>
            <figcaption className={bannerStyle.caption}>Текст акции</figcaption>
        </figure>
    )
}