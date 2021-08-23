import React  from "react"
import "./index.css"
import { gql, useSubscription } from "@apollo/client";
import { useRouteMatch } from 'react-router-dom'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

const SUBSCRIBE_TO_LOCATION_BY_ID = gql`
  subscription SubscribeToLocationById($id: uuid!) {
    location_by_pk(id: $id) {
      id
      latitude
      longitude
    }
  }
`;

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
  >
    <Marker position={{ lat: props.latitude, lng: props.longitude}} />
  </GoogleMap>
))

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

          <MyMapComponent
            latitude={data.location_by_pk.latitude}
            longitude={data.location_by_pk.longitude}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      }
      </div>
  )
}

export default App
