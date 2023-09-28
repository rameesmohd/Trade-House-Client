import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

function ViewMap() {
  const [startLatitude, setStartLatitude] = useState(null);
  const [startLongitude, setStartLongitude] = useState(null);
  const endLatitude = parseFloat(11.258753);
  const endLongitude = parseFloat(75.780411);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Set the user's location in the state
          setStartLatitude(parseFloat(pos.coords.latitude));
          setStartLongitude(parseFloat(pos.coords.longitude));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not available.");
    }
  }, []);

  console.log(startLatitude, startLongitude, 'startttttttttt');
  console.log(endLatitude, endLongitude, 'endtttttttttttt');

  const mapContainerRef = useRef(null);

    //3----------------------
    useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFtZWVzbW9oZCIsImEiOiJjbG4xZ281djIwMHJ1MnFvaHBuZDV5ZWVzIn0.B39GohhPOcIvsb33_BDXGA';
    const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [startLongitude, startLatitude],
            zoom: 10,
        });

    let selectedRouteIndex = 0; 
    let routes = []; 

    // Add markers for the starting and ending points
    const userMarker=new mapboxgl.Marker({ color: "#00ff00" }) // Green color for start marker
      .setLngLat([startLongitude, startLatitude])
      .addTo(map);

    const thOfficeMarker = new mapboxgl.Marker({ color: "#0000ff" }) // Blue color for end marker
      .setLngLat([endLongitude, endLatitude])
      .addTo(map);

    // Step 1: Create a custom popup with the turf name and logo
    const officePopup = new mapboxgl.Popup().setHTML(`
      <div>
        <h3>${'Trade House Academy'}</h3>
        <img src=${'turfLogo'} alt="${'turfName'}" width="50" height="50" />
      </div>
    `);

    // Step 2: Attach the custom popup to the turf marker
    thOfficeMarker.setPopup(officePopup);

    function toRadians(degrees) {
        return (degrees * Math.PI) / 180;
      }

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c * 1; // Distance in meters
        return distance;
      }

      const distance = calculateDistance(
        startLatitude,
        startLongitude,
        endLatitude,
        endLongitude
      );

      // Display the distance on the map
      const popup = new mapboxgl.Popup().setText(`Distance: ${distance.toFixed(2)} KM`);

      userMarker.setPopup(popup).togglePopup();

    // Fetch the route data and show the route on the map
    const fetchRouteData = () => {
      axios
        .get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${startLongitude},${startLatitude};${endLongitude},${endLatitude}`,
          {
            params: {
              access_token: mapboxgl.accessToken,
              geometries: 'geojson',
              overview: 'full',
              alternatives: true,
            },
          }
        )
        .then((response) => {
          routes = response.data.routes;
          const routeData = routes[selectedRouteIndex].geometry;

          if (map.getSource('route')) {
            // If the source 'route' already exists, update the data
            map.getSource('route').setData(routeData);
          } else {
            // If the source 'route' doesn't exist, add a new source and layer
            map.on('load', () => {
              map.addSource('route', {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: routeData,
                },
              });

              map.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round',
                },
                paint: {
                  'line-color': '#ff0000', // Red color for the route
                  'line-width': 6,
                },
              });
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching route:', error);
        });
    };

    // Fetch the initial route data
    fetchRouteData();

    // Event listener for map click
    map.on('click', (e) => {
      const clickedPoint = e.lngLat;

      // Find the closest route to the clicked point
      let minDistance = Infinity;
      let closestRouteIndex = 0;

      routes.forEach((route, index) => {
        const routeGeometry = route.geometry;
        const routeCoordinates = routeGeometry.coordinates;

        // Calculate the distance from the clicked point to each coordinate in the route
        const distanceToRoute = routeCoordinates.reduce((minDist, coord) => {
          const distance = clickedPoint.distanceTo(new mapboxgl.LngLat(coord[0], coord[1]));
          return Math.min(minDist, distance);
        }, Infinity);

        // Keep track of the closest route
        if (distanceToRoute < minDistance) {
          minDistance = distanceToRoute;
          closestRouteIndex = index;
        }
      });

      // Only update the route if a different route is selected
      if (closestRouteIndex !== selectedRouteIndex) {
        selectedRouteIndex = closestRouteIndex;
        const routeData = routes[selectedRouteIndex].geometry;
        map.getSource('route').setData(routeData);
      }
    });

    // Clean up the map instance when the component unmounts
    return () => map.remove();
  }, [startLongitude, startLatitude]);

  return <div className='overflow-hidden md:h-full sm:h-56 h-40 rounded-lg shadow-md w-full' ref={mapContainerRef} />;
}

export default ViewMap;