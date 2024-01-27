import React from "react";
import { Clusterer, Map, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import { Container } from "./sc";

const data = [
    {
        longitude: "55.224794",
        latitude: "25.12853",
        title: "Cactus Jack",
        id: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
        iconImage: "/_next/static/media/storage.9656a78f.webp",
        key: "Универсальный склад",
        address: "Техас улица 22 дом 32",
        locations: [
            {
                id: "5cce5f55-8774-4d09-a82e-3eba1761af86",
                title: "кук",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "780869cb-c772-49f7-9dff-5f1815423eba",
                title: "глок",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "2913d9b5-6a01-401b-b0cb-50ee0a1b46c0",
                title: "уца",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "7ab6d31f-7f6f-4b03-9e35-4fe9765e7a2a",
                title: "крд",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "6f48f22e-d339-483f-9a70-02592689d424",
                title: "п54",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "21b4032c-fe82-4751-ae8c-8997a54da6f6",
                title: "уаукп",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "f3cb30b5-18c0-4ebd-87ee-9d5b2600a9c9",
                title: "Общий склад",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "7aff78bf-8988-485e-86ea-784bd87053ef",
                title: "даа",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "df7d2a8c-acae-43ac-ac67-b3f2901258fc",
                title: "ккп",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "7f0f2b2e-d8a5-462d-8f09-8653e754dab2",
                title: "норм",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "57a54aa5-add4-4cc8-ada9-564276540f63",
                title: "куа",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "99071b99-2470-49b9-88eb-f3fcff557c10",
                title: "ек4п",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "5573123c-bd20-46e9-81e9-c0ca446a7399",
                title: "4п45",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "18edd188-9b83-40a0-938e-7900934e8865",
                title: "г Москва, поселок Толстопальцево, ул Мира, д 9",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "3329b7f6-a6e3-4101-a7bd-268d9d2a836d",
                title: "ука",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "295093f0-5e00-43bb-9737-fada0f8dfac3",
                title: "укп",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "8e6988ea-a424-4703-b954-5c8699d1d5fb",
                title: "ук",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "df75540f-9262-4cde-b529-52ebbbdecff0",
                title: "есть",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "de3d2c84-951b-4dc5-af1e-6db85bedfc6c",
                title: "3к",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "f4cd852c-bcc8-4978-81a2-ae5275403374",
                title: "erf",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "5e65c3c1-967e-4319-99cc-9fa45bf69873",
                title: "уц",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "ef689b31-1766-4ef0-b840-5ee9cd0a5bc0",
                title: "цуаацу",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "8ba45a6a-f2e9-4be8-998d-073702c58edc",
                title: "34",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "8e46c283-4208-4e00-9b0c-80c06ec11d4c",
                title: "уау",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "1a85fe99-edfc-4d27-91b9-7d4b5429bf39",
                title: "куа",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
            {
                id: "0497b434-e999-488c-88b1-1426bef6189e",
                title: "уак",
                objectId: "c67ed8a5-9fe1-4f7d-b540-6b72f322a73f",
            },
        ],
    },
    {
        longitude: "37.445455",
        latitude: "45.261074",
        title: "wefewg",
        id: "a77d3c76-ebf4-4e02-a293-0468c3294c06",
        iconImage: "/_next/static/media/flat.561dd0ca.webp",
        key: "Квартира",
        address: "г Санкт-Петербург, ул Мира, д 34",
        locations: [
            {
                id: "96e13625-7357-4f01-9367-779608841a43",
                title: "weeg",
                objectId: "a77d3c76-ebf4-4e02-a293-0468c3294c06",
            },
        ],
    },
    {
        longitude: "82.90359",
        latitude: "54.967693",
        title: "руннн",
        id: "ebca2597-f6a5-4bde-bf17-fcd4ef4fd858",
        iconImage: "/_next/static/media/flat.561dd0ca.webp",
        key: "Квартира",
        address: "г Новосибирск, пер 3-й Мира, д 2",
        locations: [
            {
                id: "253e197d-ed3a-47a6-8d96-160943df1d51",
                title: "г Новосибирск, пер 3-й Мира, д 2",
                objectId: "ebca2597-f6a5-4bde-bf17-fcd4ef4fd858",
            },
        ],
    },
    {
        longitude: "82.90359",
        latitude: "54.967693",
        title: "уак",
        id: "f2401bcf-1e84-4e6f-b6ae-bba23add6043",
        iconImage: "/_next/static/media/flat.561dd0ca.webp",
        key: "Квартира",
        address: "г Новосибирск, пер 3-й Мира, д 2",
        locations: [
            {
                id: "9f043c0a-5f5d-43fd-8059-06d634ef166a",
                title: "г Новосибирск, пер 3-й Мира, д 2",
                objectId: "f2401bcf-1e84-4e6f-b6ae-bba23add6043",
            },
        ],
    },
    {
        longitude: "82.90359",
        latitude: "54.967693",
        title: "yezzy",
        id: "c0b7d864-b75e-4ed3-9192-4db15d30ef39",
        iconImage: "/_next/static/media/flat.561dd0ca.webp",
        key: "Квартира",
        address: "г Новосибирск, пер 3-й Мира, д 2",
        locations: [
            {
                id: "e4ab8ddf-f5dd-4158-b6ab-daae6c14ad31",
                title: "г Новосибирск, пер 3-й Мира, д 2",
                objectId: "c0b7d864-b75e-4ed3-9192-4db15d30ef39",
            },
        ],
    },
    {
        longitude: "38.2903756",
        latitude: "46.7005769",
        title: "Franchise",
        id: "186620d2-f840-4d77-85be-53aadd04afb0",
        iconImage: "/_next/static/media/factory.20879762.webp",
        key: "Завод",
        address: "Краснодарский край, г Ейск, пер 10-ый Мира, д 1",
        locations: [
            {
                id: "88a46a0a-41d5-4d17-8e66-e0bae2a159b6",
                title: "mira2222",
                objectId: "186620d2-f840-4d77-85be-53aadd04afb0",
            },
            {
                id: "93eb0611-667e-41e7-b1c1-d217363e25a2",
                title: "сира 1",
                objectId: "186620d2-f840-4d77-85be-53aadd04afb0",
            },
        ],
    },
    {
        longitude: "48.39945",
        latitude: "54.321117",
        title: "OHIO",
        id: "56c5862f-ca8d-40cb-9103-779010ad3b82",
        iconImage: "/_next/static/media/flat.561dd0ca.webp",
        key: "Квартира",
        address: "г Ульяновск, пер Мира 1-й, д 2",
        locations: [
            {
                id: "dced0bd8-eac3-46c3-84b0-f96c4276f636",
                title: "efef",
                objectId: "56c5862f-ca8d-40cb-9103-779010ad3b82",
            },
            {
                id: "0e362dbd-3c42-4e46-b423-7dca16208a77",
                title: "лок",
                objectId: "56c5862f-ca8d-40cb-9103-779010ad3b82",
            },
            {
                id: "bb37db30-48f2-40a7-af4d-48691c1e0780",
                title: "укпуп",
                objectId: "56c5862f-ca8d-40cb-9103-779010ad3b82",
            },
            {
                id: "125c740a-5ea9-4c9e-bc15-12824e0b652f",
                title: "efefefe",
                objectId: "56c5862f-ca8d-40cb-9103-779010ad3b82",
            },
            {
                id: "b4213aa2-26fe-465c-b58c-32e134412122",
                title: "fef",
                objectId: "56c5862f-ca8d-40cb-9103-779010ad3b82",
            },
            {
                id: "103910b0-c3d4-48d3-93ff-15185582555f",
                title: "yuhgjj",
                objectId: "56c5862f-ca8d-40cb-9103-779010ad3b82",
            },
        ],
    },
];

export const Tracking: React.FC = () => {
    const isSingleObject = data.length === 1;
    const [singleObject] = data;

    const getZoom = () => {
        const [, longitude] = getCoordinates();

        if (longitude > 50) return 3;
        if (isSingleObject) return 8;
        return 4;
    };
    const getCoordinates = (): [number, number] => {
        if (isSingleObject)
            return [
                Number(singleObject.latitude),
                Number(singleObject.longitude),
            ];

        const longitude =
            data.reduce((acc, { longitude }) => acc + Number(longitude), 0) /
            data.length;
        const latitude =
            data.reduce((acc, { latitude }) => acc + Number(latitude), 0) /
            data.length;

        return [latitude, longitude];
    };
    const mapState = {
        center: getCoordinates(),
        zoom: getZoom(),
        controls: [],
    };
    return (
        <Container>
            <YMaps query={{ load: "package.full" }}>
                <Map
                    height={415}
                    width={"100%"}
                    state={mapState}
                    modules={["geoObject.addon.balloon", "control.ZoomControl"]}
                >
                    <Clusterer
                        options={{
                            preset: "islands#invertedVioletClusterIcons",
                            groupByCoordinates: false,
                            clusterBalloonContentLayoutWidth: 350,
                            clusterBalloonLeftColumnWidth: 100,
                            clusterBalloonPanelMaxMapArea: 0,
                        }}
                    >
                        {data?.map((item) => (
                            <></>
                            // <MyPlacemark key={item.id} item={item} />
                        ))}
                    </Clusterer>
                    <ZoomControl
                        options={{
                            size: "small",
                            position: { right: "16px", top: "16px" },
                        }}
                    />
                </Map>
            </YMaps>
        </Container>
    );
};
