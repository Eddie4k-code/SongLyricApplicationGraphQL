import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { BsFillHandThumbsUpFill } from "react-icons/bs";

const LyricList = ({ lyrics}) => {
    const [likeLyric, { loading, error, data }] = useMutation(mutation);


    const onLike = async (id, likes) => {
        await likeLyric({

            variables: {
                id
            },

            //Optimizes performance (Basically guessing what the response will be before we actually get it, updates faster on UI)
            optimisticResponse: {
                __typename: 'Mutation',

                likeLyric: {
                    id: id,
                    likes: likes + 1,
                    __typename: 'LyricType'
                }
            }

        });
    }

    return (
        <ul className="lyric-list">
            {lyrics.map(lyric =>
                <li className="lyric-item">
                    {lyric.content}

                    <i onClick={() => onLike(lyric.id, lyric.likes)} className="like-btn"><BsFillHandThumbsUpFill /></i>
                    <i classsName="like-count">{lyric.likes}</i>

                </li>


              


            )}

            </ul>
    );

}


const mutation = gql`

 mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }

`


export default LyricList;