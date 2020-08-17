import React, {useState, useEffect} from 'react';
import './RepoPage.scss';
import Collab from '../../components/Collab/Collab';
import Title from '../../components/Title/Title';


const RepoPage = () => {
    const [showPath, isShown] = useState(false)

    const promptSearch = () => {
        isShown(!showPath)
    }

    const handleSearch = (event) => {
        console.log(event)
    }
    
    useEffect(() => {

    }, [showPath])

    return (
        <div className="rep">
            <Title />
            <Collab />
            {!showPath && <div className='start__button' onClick={promptSearch}>Choose Directory</div>}
            {showPath && <form onSubmit={handleSearch}><input directory="" webkitdirectory="" type="file" onChange={handleSearch} /></form>}
        </div>
    )
}

export default RepoPage;