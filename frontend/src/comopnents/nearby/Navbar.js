import './Navbar.css';

export default function () {

    const imgUrl = "https://img.freepik.com/free-vector/cute-valentine-s-day-love-birds-couple_52683-54991.jpg?t=st=1679737645~exp=1679738245~hmac=29dcb108403f754320fb898e5a2c41e80c105845853360116303a3e1d0b99476";

    return (
        <>
            <div className="nearbyNavCont">

                <div className='leftNavCont'>
                    <span className='nearbyImgCont'>
                        <img className='logo nearbyImg' src={imgUrl} alt="logo" />
                    </span>
                    <span className='title'>Strangle.in</span>
                </div> 

            </div>
        </>
    );
}