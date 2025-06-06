// Initialize map centered on Austria
const map = L.map('map', {
    center: [47.5, 13.05],
    zoom: 8
});

// Add base map
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add scale bar (metric only)
L.control.scale({ position: 'bottomright', imperial: false }).addTo(map);

// --- VIA FERRATA GEOJSON ---
L.geoJSON(viaferrata, {
    style: feature => feature.geometry.type !== 'Point' ? {
        color: '#0e37dd',
        weight: 4,
    } : null,
    pointToLayer: (feature, latlng) => cirlceMarkers(feature, latlng),
    onEachFeature: (feature, layer) => handleFeatures(feature, layer),

}).addTo(map);
function handleFeatures(feature, layer) {
    const props = feature.properties || {};
    const sac = props.sac_scale || 'N/A';
    const ferrata = props.via_ferrata_scale || 'N/A';

    const popupContent = `
        <strong>${props.name || 'Via Ferrata'}</strong><br>
        <b>SAC Scale:</b> ${sac}<br>
        <b>Via Ferrata Scale:</b> ${ferrata}
    `;

    layer.bindPopup(popupContent);
}

function cirlceMarkers(feature, latlng) {
    L.circleMarker(latlng, {
        radius: 4,
        fillColor: '#b16e6f',
        color: '#d7191c',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.5
    })
}