
mapboxgl.accessToken = mapboxToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: experience.geometry.coordinates,
    zoom: 12
});

new mapboxgl.Marker()
    .setLngLat(experience.geometry.coordinates)
    .setPopup(
         new mapboxgl.Popup({ offset: 25 })
         .setHTML(
                `<h3>${experience.title}</h3>
                <p>${experience.location}</p>`
            )
    )
    .addTo(map);
