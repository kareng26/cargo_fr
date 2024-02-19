import mapboxgl, { GeoJSONSource } from "mapbox-gl";

const createRoute = async (
    map: mapboxgl.Map,
    sLat: number,
    sLng: number,
    rLat: number,
    rLng: number,
) => {
    const response = await fetch(
        `${
            import.meta.env.VITE_MAPBOX_API
        }${sLng},${sLat};${rLng},${rLat}?steps=true&geometries=geojson&access_token=${
            mapboxgl.accessToken
        }`,
    );

    const data = await response.json();
    const coordinates = data.routes[0].geometry.coordinates;

    const geoJson: GeoJSON.Feature<GeoJSON.Geometry> = {
        type: "Feature",
        properties: {},
        geometry: {
            coordinates,
            type: "LineString",
        },
    };

    if (map.getSource("route")) {
        (map.getSource("route") as GeoJSONSource).setData(geoJson);
    } else {
        map.addLayer({
            id: "route",
            type: "line",
            source: {
                type: "geojson",
                data: geoJson,
            },
            layout: {
                "line-join": "round",
                "line-cap": "round",
            },
            paint: {
                "line-color": "#2f3642",
                "line-width": 3,
                "line-opacity": 0.75,
            },
        });
    }

    return coordinates;
};

export { createRoute };
