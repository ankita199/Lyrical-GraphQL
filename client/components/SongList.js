import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import gql from "graphql-tag";
import query from "../queries/fetchSongs";
function SongList(props) {
  const deleteSongs = (id) => {
    props
      .mutate({
        variables: { id },
      })
      .then(() => props.data.refetch());
  };
  return (
    <div>
      <h1>{props.data.loading && <p>Loading...</p>}</h1>
      <div>
        <Link to="songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
        <ul className="collection">
          {!props.data.loading &&
            props.data.songs.map(({ id, title }) => (
              <li key={id} className="collection-item">
                <Link to={`songs/${id}`}>{title}</Link>
                <i className="material-icons" onClick={() => deleteSongs(id)}>
                  delete
                </i>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;
export default graphql(mutation)(graphql(query)(SongList));
