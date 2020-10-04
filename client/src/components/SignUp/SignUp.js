import React, {useState} from 'react'
import './SignUp.scss';
import people from '../../assets/icon2.svg';

const SignUp = (props) => {
    const [sign, setSwitch] = useState(props.match.path === '/signup' ? true : false)

    console.log(sign)
    return (
        <section className='sign'>
            <div className='sign__block'>
                <div className='sign__toggle'>
                    <p className={sign ? 'sign__option--alt' : 'sign__option' } onClick={() => setSwitch(!sign)}>Log in</p>
                    <p className={!sign ? 'sign__option--alt' : 'sign__option' } onClick={() => setSwitch(!sign)}>Sign up</p>
                </div>
                {   sign ?
                    <div className='sign__wrapper'>
                    <h3 className='sign__prompt'>Kickstart your Marking</h3>
                    <p className='sign__desc'>Connect your GitHub account and begin repository analyses within minutes.</p>
                    <form className='sign__form'>
                        <input className='sign__name' name='name' placeholder='Full Name'/>
                        <div className='sign__connect'>Connect GitHub</div>
                    </form>
                    </div> : <h2>Welcome Back!</h2>
                }
            </div>
            {/*<img src={people} className='sign__image'/>*/}
        </section>
    )

}

export default SignUp;