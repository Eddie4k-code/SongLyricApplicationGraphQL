import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchSingleSong from "../queries/fetchSingleSong";

const CreateLyric = ({ songId }) => {
    const [content, setContent] = useState('');
    const [addLyricToSong, { loading, error, data }] = useMutation(mutation);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addLyricToSong({
            variables: {
                content: content,
                songId: songId
            },

            refetchQueries: [{  }]

        }).then(() => setContent(''));

    }

    return (
        <div className="container">
           
        <div className="container">
          
            <form className="form-group" onSubmit={handleSubmit}>
                <label htmlFor="title">Lyric:</label>
                <input name="content" value={content} onChange={(e) => setContent(e.target.value)} />
                <button className="add-lyric">Add Lyric</button>
            </form>

            </div>

        </div>
    );

}

const mutation = gql`

mutation AddLyricToSong($content: String, $songId:ID) {
       addLyricToSong(content: $content, songId:$songId) {
            id,
            title,

            lyrics {
                content
            }
        }
}


`


export default CreateLyric;