import React, {useState, useEffect} from 'react';
import './RepoPage.scss';
import Collab from '../../components/Collab/Collab';
import Title from '../../components/Title/Title';
import {Route} from 'react-router-dom';
import Analysis from '../../components/Analysis/Analysis';


const RepoPage = (props) => {
    const [showPath, isShown] = useState(false)

    const promptSearch = () => {
        isShown(!showPath)
    }

    const handleSearch = (event) => {
        console.log(event)
    }
    
    useEffect(() => {

    }, [showPath])

    console.log(props.match)
   
    return (
        <div className="rep">
            <Title />
            <Collab path={props.match.url+"/analysis"}/>
            {!showPath && <div className='start__button' onClick={promptSearch}>Choose Directory</div>}
            {showPath && <form onSubmit={handleSearch}><input directory="" webkitdirectory="" type="file" onChange={handleSearch} /></form>}
        </div>
    )
}

export default RepoPage;