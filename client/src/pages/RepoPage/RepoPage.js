import React, {useState, useEffect} from 'react';
import './RepoPage.scss';
import Collab from '../../components/Collab/Collab';
import Title from '../../components/Title/Title';
import {Route} from 'react-router-dom';
import Analysis from '../../components/Analysis/Analysis';
import axios from 'axios';


const RepoPage = (props) => {
    const [showPath, isShown] = useState("")

    const direct = () => {
        axios.get("http://localhost:8080/jira/auth").then(res => {
            console.log(res)
        })
    }

    // const promptSearch = () => {
    //     isShown(!showPath)
    // }

    // const handleSearch = (event) => {
    //     console.log(event)
    // }
    
    useEffect(() => {
    }, [])

    useEffect(() => {
        
    }, [showPath])

    console.log(props.match)

    //{!showPath && <div className='start__button' onClick={promptSearch}>Choose Directory</div>}
    // {showPath && <form onSubmit={handleSearch}><input directory="" webkitdirectory="" type="file" onChange={handleSearch} /></form>}
   
    return (
        <div className="rep">
            <Title />
            <Collab path={props.match.url+"/analysis"}/>
            
                    
        </div>
    )
}

export default RepoPage;