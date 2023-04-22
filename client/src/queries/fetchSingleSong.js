import { useQuery, gql } from '@apollo/client';


/* Fetches Details regarding a single song */

export default gql`

query SongQuery($id:ID!) {
	  song(id:$id) {
    	id,
    	title,
        lyrics {
            id,
            content,
            likes
        }
  }
}



`
