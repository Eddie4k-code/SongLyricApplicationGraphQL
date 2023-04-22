import { useQuery, useMutation, gql } from '@apollo/client';
import { create } from 'lodash';
import { useNavigate } from 'react-router-dom';
import query from '../queries/fetchSongs.js';
const { useState, useEffect } = require("react");



const CreateSong = () => {


    const [title, setTitle] = useState('');
    const [addSong, { loading, error, data }] = useMutation(mutation);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();


    //Adds a song to DB using the graphql mutation.
    const createSong = async (e) => {
        e.preventDefault();
        await addSong({
            variables: {
                title
            },
            refetchQueries: [{ query }],
        });
        navigate("/");
    };


    useEffect(() => {

        if (data && data.addSong) {
            setSuccess(true);
            setTitle('');
        }

    }, [data]);


    return (

        <div className="container">


            <button onClick={ () => navigate("/")} className="go-back-btn">Go Back</button>

            <header>Add a Song to the Public List</header>


            <form className="form-group" onSubmit={createSong}>

                <label for="title">Song Title:</label>
                <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} />

                <button>Add Song</button>

            </form>


            {success && <h3>Song Added!</h3>}
            {error && <h3>{error.message}</h3>}





        </div>
        
        );

}

//Mutation for adding a new song.
const mutation = gql`

    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`;

export default CreateSong