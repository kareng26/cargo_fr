import React, { useMemo, useRef, useState, useEffect } from "react";

import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";
import Map, {
    MapEvent,
    Marker,
    NavigationControl,
    GeoJSONSource,
} from "react-map-gl";
import { useTranslation } from "react-i18next";

import "mapbox-gl/dist/mapbox-gl.css";

import axios from "axios";

import {
    Cargoes,
    CargoItem,
    CargoItemTitle,
    Container,
    Content,
    Title,
    Tooltip,
} from "./components";

import { Typography } from "@mui/material";
import { useAppSelector } from "@/hooks/useAppSelector.ts";
import { ReceivePoint, SendPoint } from "@/assets/icons";
import { Coordinates } from "@/types.ts";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_GL_PT;

const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

async function getRoute(
    map: mapboxgl.Map,
    sLatitude: number,
    sLongitude: number,
    rLatitude: number,
    rLongitude: number,
) {
    const { data } = await axios.get(
        `${
            import.meta.env.VITE_MAPBOX_API
        }${sLongitude},${sLatitude};${rLongitude},${rLatitude}?steps=true&geometries=geojson&access_token=${
            mapboxgl.accessToken
        }`,
    );
    const coordinates = data.routes[0].geometry.coordinates;

    const geoJson: GeoJSON.Feature<GeoJSON.Geometry> = {
        type: "Feature",
        properties: {},
        geometry: {
            type: "LineString",
            coordinates,
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
}

export const Tracking: React.FC = () => {
    const data = useAppSelector((state) => state.cargo);

    const mapRef = useRef<mapboxgl.Map>();

    type ExMapBox = typeof mapRef.current & {
        language: string;
        setLanguage: (language: string) => void;
    };

    const [cargo, setCargo] = useState(data?.cargo);

    const [viewState, setViewState] = React.useState<Coordinates>();

    const { i18n } = useTranslation();

    const changeView = (cargo) => {
        if (mapRef.current && cargo?.id) {
            getRoute(
                mapRef.current,
                cargo?.send_address?.latitude,
                cargo?.send_address?.longitude,
                cargo?.receiver_address?.latitude,
                cargo?.receiver_address?.longitude,
            );
        }
    };

    const MotionDiv = useMemo(() => motion.div, []);

    const onRowClick = (row: any) => {
        setCargo(row);
        setViewState({
            latitude: row?.send_address?.latitude,
            longitude: row?.send_address?.longitude,
        });
        changeView(row);
    };

    const onLoad = (target: MapEvent["target"]) => {
        mapRef.current = target;
        changeView(cargo);

        if (i18n.language !== "en") {
            (mapRef.current as ExMapBox)?.setLanguage(i18n.language);
        }
    };

    useEffect(() => {
        if ((mapRef.current as ExMapBox)?._language !== i18n.language) {
            const handleLanguageChange = () => {
                (mapRef.current as ExMapBox)?.setLanguage(i18n.language);
            };

            i18n.on("languageChanged", handleLanguageChange);

            return () => {
                i18n.off("languageChanged", handleLanguageChange);
            };
        }
    }, [i18n.language]);

    return (
        <Container>
            <MotionDiv
                initial={"hidden"}
                animate={"visible"}
                variants={variants}
            >
                <Title>{"CARGO"}</Title>
            </MotionDiv>
            <Content>
                <Map
                    {...viewState}
                    attributionControl={false}
                    mapStyle={"mapbox://styles/mapbox/light-v11"}
                    onLoad={(event) => onLoad(event.target)}
                    onMove={(event) => setViewState(event.viewState)}
                    initialViewState={{
                        longitude:
                            cargo?.receiver_address?.longitude || 40.173463,
                        latitude:
                            cargo?.receiver_address?.latitude || 44.507371,
                        zoom: 12,
                    }}
                    style={{ height: "100%", minHeight: "90vh", flex: 3 }}
                >
                    {cargo?.id && (
                        <>
                            <Marker
                                longitude={cargo.send_address?.longitude}
                                latitude={cargo.send_address?.latitude}
                                anchor={"center"}
                            >
                                <SendPoint />
                            </Marker>
                            <Marker
                                longitude={cargo.receiver_address?.longitude}
                                latitude={cargo.receiver_address?.latitude}
                                anchor={"center"}
                            >
                                <ReceivePoint />
                            </Marker>
                        </>
                    )}
                    <NavigationControl />
                    {cargo?.id && (
                        <Tooltip>
                            <CargoItem>
                                <CargoItemTitle>{"name:"}</CargoItemTitle>
                                <Typography>{cargo?.name}</Typography>
                            </CargoItem>
                            <CargoItem>
                                <CargoItemTitle>{"status:"}</CargoItemTitle>
                                <Typography color={"#1a9861"}>
                                    {
                                        cargo?.status?.[
                                            cargo?.status?.length - 1
                                        ]?.name
                                    }
                                </Typography>
                            </CargoItem>
                        </Tooltip>
                    )}
                </Map>
                <Cargoes onRowClick={onRowClick} />
            </Content>
        </Container>
    );
};
