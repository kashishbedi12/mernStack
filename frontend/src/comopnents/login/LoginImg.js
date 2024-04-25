import './LoginImg.css';

export default function (){
    const imgUrl="https://img.freepik.com/free-vector/cute-valentine-s-day-love-birds-couple_52683-54991.jpg?t=st=1679737645~exp=1679738245~hmac=29dcb108403f754320fb898e5a2c41e80c105845853360116303a3e1d0b99476";
    return(
        <div className="imgCont">
            <img className="loginImg" src={imgUrl} alt="lovebird-image" />
        </div>
    )
}