import React  from "react"
import "./index.css"
import { gql, useSubscription } from "@apollo/client";
import { useRouteMatch } from 'react-router-dom'

const SUBSCRIBE_TO_LOCATION_BY_ID = gql`
  subscription SubscribeToLocationById($id: uuid!) {
    location_by_pk(id: $id) {
      id
      latitude
      longitude
    }
  }
`;

const App = () => {
  let match = useRouteMatch("/:id");
  const { data } = useSubscription(SUBSCRIBE_TO_LOCATION_BY_ID, {
    variables: {id: match.params.id},
  })
  return (
    <div>
      {data &&
      <div className="p-10 space-y-10">
          <p>Id: <br />{data.location_by_pk.id}</p>
          <p>Latitude: <br />{data.location_by_pk.latitude}</p>
          <p>Longitude: <br />{data.location_by_pk.longitude}</p>
        </div>
      }
      </div>
  )
}

export default App
