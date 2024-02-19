import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";
import Map, { MapEvent, Marker, NavigationControl } from "react-map-gl";
import { useTranslation } from "react-i18next";
import "mapbox-gl/dist/mapbox-gl.css";
import { Cargoes, Container, Content, Title, Tooltip } from "./components";
import { useAppSelector } from "@/hooks/useAppSelector.ts";
import { ReceivePoint, SendPoint, Truck } from "@/assets/icons";
import {
    Coordinates,
    CreateCargoRespType,
    GetUserCargoDataType,
} from "@/types.ts";
import { defaultCoords, variants } from "@/pages/tracking/const.ts";
import { createRoute } from "@/pages/tracking/api.ts";
import { ExMapBox } from "@/pages/tracking/types.ts";
import { findArrayMiddle } from "@/utils/arrays.ts";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_GL_PT;

// temp decision
type TruckPlaces = {
    Создано: number;
    Получено: number;
};

export const Tracking: React.FC = () => {
    const { i18n } = useTranslation();

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
        const handleLanguageChange = () => {
            (mapRef.current as ExMapBox)?.setLanguage(i18n.language);
        };

        i18n.on("languageChanged", handleLanguageChange);

        return () => {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, [i18n.language]);

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
                Создано: 2,
                Получено: coordinates.length - 2,
            };
            if (cargo?.status[cargo?.status?.length - 1]?.name === "В пути") {
                return findArrayMiddle(coordinates);
            }
            return coordinates[
                truckPlaces?.[
                    cargo?.status[cargo?.status?.length - 1]
                        ?.name as keyof TruckPlaces
                ]
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
        <Container>
            <motion.div
                initial={"hidden"}
                animate={"visible"}
                variants={variants}
            >
                <Title>{"CARGO"}</Title>
            </motion.div>
            <Content>
                <Map
                    {...viewState}
                    attributionControl={false}
                    mapStyle={"mapbox://styles/mapbox/light-v11"}
                    onLoad={(event) => onLoad(event.target)}
                    onMove={(event) => setViewState(event.viewState)}
                    initialViewState={{
                        zoom: 12,
                        longitude: rLng || defaultCoords.longitude,
                        latitude: rLat || defaultCoords.latitude,
                    }}
                    style={{ height: "100%", minHeight: "90vh", flex: 3 }}
                >
                    {truckCoords && (
                        <Marker
                            longitude={truckCoords[0]}
                            latitude={truckCoords[1]}
                        >
                            <Truck />
                        </Marker>
                    )}
                    {cargo?.id && (
                        <>
                            <Marker longitude={sLng} latitude={sLat}>
                                <SendPoint />
                            </Marker>
                            <Marker longitude={rLng} latitude={rLat}>
                                <ReceivePoint />
                            </Marker>
                        </>
                    )}
                    <NavigationControl showCompass={false} />
                    {cargo?.id && <Tooltip cargo={cargo} />}
                </Map>
                <Cargoes onRowClick={onRowClick} />
            </Content>
        </Container>
    );
};
