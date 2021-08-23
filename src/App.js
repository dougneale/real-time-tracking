import React  from "react"
import "./index.css"
import { gql, useSubscription } from "@apollo/client";
import { useRouteMatch } from 'react-router-dom'
import GoogleMapReact from 'google-map-react';

const SUBSCRIBE_TO_LOCATION_BY_ID = gql`
  subscription SubscribeToLocationById($id: uuid!) {
    location_by_pk(id: $id) {
      id
      latitude
      longitude
    }
  }
`;


const Marker = ({ $hover }) => (
<div className="relative h-4 rounded-full border border-black shadow-md bg-red-500 w-4">
  {$hover &&
    <div className="absolute left-1/2 p-8 w-20 h-20 bg-white shadow-md"> hello </div>
  }
</div>);

const App = () => {
  let match = useRouteMatch("/:id");
  const { data } = useSubscription(SUBSCRIBE_TO_LOCATION_BY_ID, {
    variables: {id: match.params.id},
  })
  return (
    <div className="container m-auto">
      <nav className="flex items-center text-lg w-full h-14">
        Track your package
      </nav>
      {!data &&
       <div class="pt-10 flex justify-center items-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
      }
      {data &&
        <div className="">
          <div className="w-full h-map shadow-md">
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
              center={{lat: data.location_by_pk.latitude , lng: data.location_by_pk.longitude }}
              defaultCenter={{lat: data.location_by_pk.latitude , lng: data.location_by_pk.longitude }}
              defaultZoom={15}
            >
              <Marker
                lat={data.location_by_pk.latitude}
                lng={data.location_by_pk.longitude}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
          <div className="pt-10 space-y-10">
            <p>Id: <br />{data.location_by_pk.id}</p>
            <p>Latitude: <br />{data.location_by_pk.latitude}</p>
            <p>Longitude: <br />{data.location_by_pk.longitude}</p>
          </div>
        </div>
      }
      </div>
  )
}

export default App
