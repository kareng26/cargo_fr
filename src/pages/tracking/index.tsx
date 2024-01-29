import React, { useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { motion } from "framer-motion";
import { Title } from "@/components/wrapper/components";

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

export const Tracking: React.FC = () => {
    const MotionDiv = useMemo(() => motion.div, []);

    return (
        <>
            <MotionDiv
                initial={"hidden"}
                animate={"visible"}
                variants={variants}
            >
                <Title style={{ fontSize: 40 }}>{"CARGO"}</Title>
            </MotionDiv>
            <Map
                mapLib={import("mapbox-gl")}
                initialViewState={{
                    longitude: 39.046994,
                    latitude: 45.013118,
                    zoom: 15,
                }}
                style={{ width: "100%", height: 400 }}
                mapStyle={"mapbox://styles/mapbox/light-v11"}
            >
                <Marker
                    longitude={39.046994}
                    latitude={45.013118}
                    anchor={"center"}
                >
                    <img
                        width={30}
                        height={40}
                        src={
                            "https://www.freepnglogos.com/uploads/pin-png/file-map-pin-icon-svg-wikimedia-commons-8.png"
                        }
                        alt={"ey"}
                    />
                </Marker>
                {/*<FullscreenControl />*/}
                {/*<GeolocateControl />*/}
                {/*<NavigationControl />*/}
                {/*<ScaleControl />*/}
                {/*<AttributionControl customAttribution={"Map design by me"} />*/}
            </Map>
        </>
    );
};
