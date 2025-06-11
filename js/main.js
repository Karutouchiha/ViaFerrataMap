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
var ferrata = L.geoJSON(viaferrata, {
    filter: feature => {
      const access = feature?.properties?.access;
      return access !== 'private' && access !== 'no';
    },
    style: feature => feature.geometry.type !== 'Point' ? {
        color: '#0e37dd',
        weight: 4,
        opacity: .5
    } : null,
    pointToLayer: (feature, latlng) => circleMarkers(feature, latlng),
    onEachFeature: (feature, layer) => handleFeatures(feature, layer)
}).addTo(map);

function handleFeatures(feature, layer) {
    interactiveFunction(feature,layer)
    const p = feature.properties || {};

    // Format values
    const name = p.name || 'Unnamed Via Ferrata';
    const scale = p.via_ferrata_scale || 'Unknown';
    const sac = (p.sac_scale || '').replace(/_/g, ' ') || 'N/A';
    const route = p.route || 'Unknown';
    const website = p.website ? `<a href="${p.website}" target="_blank">Link to the Website</a>` : 'N/A';
    const fee = p.fee || 'Not stated';
    const access = p.access || 'Not stated';
    const description = p.description || '';

    const popupContent = `
        <strong>${name}</strong><br><br>
        ${description ? `<em>${description}</em><br><br>` : ''}
        <b>Via Ferrata Scale:</b> ${scale}<br>
        <b>SAC Scale:</b> ${sac}<br>
        <b>Route Type:</b> ${route}<br>
        <b>Access:</b> ${access}<br>
        <br>
        <b>Fee:</b> ${fee}<br>
        <b>Website:</b> ${website}
    `;

    layer.bindPopup(popupContent);
}

function circleMarkers(feature, latlng) {
    return L.circleMarker(latlng, {
        radius: 5,
        fillColor: '#6875b6',
        color: '#0e37dd',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.5
    });
}

function highlightFeature(e) {
    var activefeature = e.target;  //access to activefeature that was hovered over through e.target

    activefeature.setStyle({
        weight: 5,
        color: '#d7191c',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        activefeature.bringToFront();
    }
}


//function for resetting the highlight
function resetHighlight(e) {
    ferrata.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//to call these methods we need to add listeners to our features
function interactiveFunction(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    } );
}