import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useQuery, gql, useMutation } from '@apollo/client';
import fetchSingleSong from "../queries/fetchSingleSong";
import CreateLyric from "./CreateLyric";
import LyricList from "./LyricList";

const SongDetail = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, error, data } = useQuery(fetchSingleSong,
        {
            variables: {
                id: id
            }
        }
    );

    if (loading) return <p>Loading Song...</p>

    if (error) return <p>Error has Occured...</p>



    return (
        
        <div className="container">
            <button onClick={() => navigate("/")} className="go-back-btn">Go Back</button>
            <header>Song Detail</header>
            <LyricList lyrics={data.song.lyrics}/>
            <div className="container">
                <CreateLyric songId={id}/>
            </div>



        </div>
        
        )





}

export default SongDetail;