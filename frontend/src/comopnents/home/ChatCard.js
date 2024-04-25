import { Link } from 'react-router-dom';
import './ChatCard.css'

export default function(props){

    return(
        <>
            <div className="cardCont">
                <div className="cardImgCont lside cardContEle">
                    <img className='cardImg' src={props.iconUrl} alt='Icon' />
                </div>
                <div className='rside cardContEle'>
                    <div method='post'>
                        <div className="cardSelectCont rsideEle">
                            <span className='selectText'>{props.title} chat with: </span> 
                            <select className='cardSelect'>
                                    <option className='selectOption'  value="random">Random</option>
                                    <option className='selectOption' value="male">Male</option>
                                    <option className='selectOption' value="female">Female</option>
                                    <option className='selectOption' value="others">Others</option>
                                    <option className='selectOption' value="squad">Squad</option>
                                    <option className='selectOption' value="group">Group</option>
                            </select>
                        </div>
                        <div className="cardDisc rsideEle">
                            By clicking Start I agree with Strangle.in <a href="/t&c">terms and conditions</a> and I am 18 years old or above.
                        </div>
                        <Link to={props.hostUrl} className='startBtn rsideEle'><button className="cardBtn ">Start</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
};