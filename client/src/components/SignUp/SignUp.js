import React from 'react'
import './SignUp.scss';

const SignUp = (props) => {

    return (
        <section className='sign'>
            <div className='sign__block'>
                <h3 className='sign__prompt'>Kickstart your Marking</h3>
                <p className='sign__desc'>Connect your GitHub account and begin repository analyses within minutes.</p>
                <form>
                    <input className='sign__name' name='name' placeholder='Full Name'/>
                    <div className='sign__connect'>Connect GitHub</div>
                </form>
            </div>
        </section>
    )

}

export default SignUp;