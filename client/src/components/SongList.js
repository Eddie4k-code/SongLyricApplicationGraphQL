
import { useEffect } from 'react';
import {useQuery, gql, useMutation} from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import query from '../queries/fetchSongs.js';

const SongList = () => {

    
    const navigate = useNavigate();


    //Uses deleteSong mutation to delete a song
    const removeSong = async (id) => {
        await deleteSong({

            variables: {
                id
            },

            refetchQueries: [query]

        });

    }


    const { loading, error, data } = useQuery(query);
    const [deleteSong, { loading: mutationLoading, error: mutationError, data:mutationData }] = useMutation(mutation);
    

    if (loading) return <p>LOADING....</p>;

    if (error) return <p>ERROR</p>;

    return (


        <div className="container">

            <header>Public Created Songs</header>

            <div>

                <ul className="song-list">

                    {data.songs.map(song =>

                        <li onClick={ () => navigate(`/view/${song.id}`)} className="collection-item" key={song.title}>{song.title} <button className="delete-btn" onClick={() => removeSong(song.id)}>Delete</button></li>
                        
                        )}

                </ul>

            </div>


            <button onClick={() => navigate("/create")} className="add-song-btn">Add a Song</button>

        </div>


        )
}


//Mutation for deleting a song.
const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;





export default SongList;