import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Map, { MapEvent, NavigationControl } from "react-map-gl";
import { useTranslation } from "react-i18next";
import "mapbox-gl/dist/mapbox-gl.css";
import { Cargoes, Content, Tooltip, Marker } from "./components";
import { useAppSelector } from "@/hooks";
import { ReceivePoint, SendPoint, Truck } from "@/assets/icons";
import {
    Coordinates,
    CreateCargoRespType,
    GetUserCargoDataType,
} from "@/types.ts";
import { defaultCoords } from "@/pages/tracking/const.ts";
import { createRoute } from "@/pages/tracking/api.ts";
import { ExMapBox, TruckPlaces } from "@/pages/tracking/types.ts";
import { addTime, dateConverter, findArrayMiddle } from "@/utils";
import { AnimatedTitle } from "@/components/animatedTitle";
import { I18 } from "@/i18n.ts";
import MapboxDirections from "@mapbox/mapbox-sdk/services/directions";
import { GeolocateControl } from "react-map-gl/dist/esm/exports-mapbox";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_GL_PT;

export const Tracking: React.FC = () => {
    const { i18n, t } = useTranslation();

    const geoControlRef = useRef<any>();

    console.log("geoControlRef", geoControlRef);

    const data = useAppSelector((state) => state.cargo);

    const mapRef = useRef<mapboxgl.Map>();

    const [cargo, setCargo] = useState<
        GetUserCargoDataType | CreateCargoRespType
    >(data?.cargo);

    const [truckCoords, setTruckCoords] = useState<Array<number>>();

    const [viewState, setViewState] = React.useState<
        Coordinates & { zoom: number }
    >();

    const rLat = Number(cargo?.receiver_address?.latitude);
    const rLng = Number(cargo?.receiver_address?.longitude);

    const sLat = Number(cargo?.send_address?.latitude);
    const sLng = Number(cargo?.send_address?.longitude);

    useEffect(() => {
        const handleLanguageChange = () =>
            (mapRef.current as ExMapBox)?.setLanguage(i18n.language);

        i18n.on("languageChanged", handleLanguageChange);

        return () => {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, [i18n.language]);

    useEffect(() => {
        const calculateRoute = async () => {
            const directionsService = new MapboxDirections({
                accessToken: mapboxgl.accessToken,
            });

            // if (!isNaN(sLng)) {
            const response = await directionsService
                .getDirections({
                    waypoints: [
                        { coordinates: [sLng, sLat] },
                        { coordinates: [rLng, rLat] },
                    ],
                    profile: "driving", // Можно также использовать 'cycling', 'walking', 'driving-traffic' и т.д.
                    geometries: "geojson",
                })
                .send();

            const originalTime = new Date("2024-02-29T14:17:24.104Z");
            console.log("originalTime", originalTime);

            const routeDuration = response.body.routes[0].duration; // Duration in seconds

            // Convert duration to hours and minutes
            const hours = Math.floor(routeDuration / 3600);
            const minutes = Math.floor((routeDuration % 3600) / 60);

            return {
                hours,
                minutes,
                cargoDate: cargo?.current_status?.created_at,
                origTime: dateConverter(addTime(originalTime, hours, minutes)),
            };
        };

        // const routeDuration = response.body.routes[0].duration; // Получаем время поездки в секундах
        // setDuration(routeDuration);
        // };

        calculateRoute().then((res) => {
            console.log("here", res);
        });
    }, []);
    const changeView = async (cargo: GetUserCargoDataType) => {
        if (mapRef.current && cargo?.id) {
            const coordinates = await createRoute(
                mapRef.current,
                Number(cargo?.send_address?.latitude),
                Number(cargo?.send_address?.longitude),
                Number(cargo?.receiver_address?.latitude),
                Number(cargo?.receiver_address?.longitude),
            );
            const truckPlaces: TruckPlaces = {
                Создано: 0,
                "Передано в доставку": 2,
                Получено: coordinates.length - 1,
            };

            if (cargo?.current_status?.name === "В пути") {
                return findArrayMiddle(coordinates);
            }
            return coordinates[
                truckPlaces?.[cargo?.current_status?.name as keyof TruckPlaces]
            ];
        }
    };

    const onRowClick = async (row: GetUserCargoDataType) => {
        setCargo(row);
        const coords = await changeView(row);
        if (coords) {
            setTruckCoords(coords);
            setViewState({
                latitude: coords?.[1],
                longitude: coords?.[0],
                zoom: 18,
            });
        }
    };

    const onLoad = async (target: MapEvent["target"]) => {
        mapRef.current = target;
        const coords = await changeView(cargo);

        if (coords?.length) {
            setTruckCoords(coords);

            setViewState({
                latitude: coords?.[1],
                longitude: coords?.[0],
                zoom: 18,
            });
        }

        if (i18n.language !== "en") {
            (mapRef.current as ExMapBox)?.setLanguage(i18n.language);
        }
    };

    return (
        <div>
            <AnimatedTitle />
            <Content>
                <div style={{ flex: 3, minHeight: "87vh" }}>
                    <Map
                        {...viewState}
                        attributionControl={false}
                        // mapStyle={"mapbox://styles/mapbox/streets-v12"}
                        mapStyle={"mapbox://styles/mapbox/light-v11"}
                        onLoad={(event) => onLoad(event.target)}
                        onMove={(event) => setViewState(event.viewState)}
                        initialViewState={{
                            zoom: 12,
                            longitude: rLng || defaultCoords.longitude,
                            latitude: rLat || defaultCoords.latitude,
                        }}
                        style={{ height: "100%", flex: 3, minHeight: "87vh" }}
                    >
                        {truckCoords && (
                            <Marker
                                longitude={truckCoords[0]}
                                latitude={truckCoords[1]}
                            >
                                <Truck />
                                <span>{t(I18.CARGO)}</span>
                            </Marker>
                        )}
                        {cargo?.id && (
                            <>
                                <Marker longitude={sLng} latitude={sLat}>
                                    <SendPoint />
                                    <span>{t(I18.SEND_POINT)}</span>
                                </Marker>
                                <Marker longitude={rLng} latitude={rLat}>
                                    <ReceivePoint />
                                    <span>{t(I18.DESTINATION_POINT)}</span>
                                </Marker>
                            </>
                        )}
                        <GeolocateControl ref={geoControlRef} />
                        <NavigationControl showCompass={false} />
                        {cargo?.id && <Tooltip cargo={cargo} />}
                    </Map>
                    <span
                        style={{
                            fontSize: 13,
                            // color: "#2f364233",
                            display: "flex",
                            fontStyle: "italic",
                            justifyContent: "flex-end",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                        }}
                    >
                        {cargo?.id && t(I18.RELATIVE_COORDS)}
                    </span>
                </div>
                <Cargoes onRowClick={onRowClick} />
            </Content>
        </div>
    );
};
