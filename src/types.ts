type SendAddress = {
    id: number;
    latitude: string;
    longitude: string;
    name: string;
};

type ReceiverAddress = {
    id: number;
    latitude: string;
    longitude: string;
    name: string;
};

type Carrier = {
    id: number;
    name: string;
    phone: string;
    vehicle: string;
    vehicle_number: string;
};

type Status = {
    id: number;
    created_at: string;
    name: string;
    description: string;
};

type Document = {
    id: number;
    type: string;
    link: string;
};

type SenderInfo = {
    id: number;
    name: string;
    phone: string;
    mail: string;
    role_id: number;
};

type CreateCargoRespType = {
    id: number;
    name: string;
    serial_number: string;
    description: string;
    volume: number;
    weight: number;
    created_at: string;
    receiver_name: string;
    receiver_contact: string;
    send_address: SendAddress;
    receiver_address: ReceiverAddress;
    carrier: Carrier;
    status: Array<Status>;
    documents: Array<Document>;
    sender_info: SenderInfo;
};

type DaDataSuggestion = {
    data: Address;
};

type Address = {
    fias_id: string;
    fias_level: FiasLevels;
    geo_lat: string;
    geo_lon: string;
    qc_geo: "0" | "1" | "2" | "3" | "4" | "5";
    qc_house: null;
};

type CreateCargoArgType = {
    name: string;
    description: string;
    receiver_name: string;
    receiver_contact: string;
    volume: number;
    weight: number;
    send_address: SendAddress;
    receiver_address: ReceiverAddress;
};

type CreateDocumentArgs = {
    id: string;
    waybills: FileList;
    others: FileList;
};

type CreateDocumentReturned = {
    code: number;
    message: string;
};

enum FiasLevels {
    HOUSE = "8",
    APARTMENT = "9",
}

type Coordinates = {
    latitude: number;
    longitude: number;
};

type CargoStatus = {
    id: number;
    name: string;
};

type GetUserCargoDataType = {
    id: number;
    name: string;
    description: string;
    status: Array<CargoStatus>;
    created_at: string;
    serial_number: string;
    send_address: {
        id: number;
        latitude: string;
        longitude: string;
        name: string;
    };
    receiver_address: {
        id: number;
        latitude: string;
        longitude: string;
        name: string;
    };
};

type Meta = {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number;
    next: number;
};

type GetUserCargoRespType = {
    data: Array<GetUserCargoDataType>;
    meta: Meta;
};

type GetUserCargoArgType = {
    page?: number;
    pageSize?: number;
    direction?: string;
    sorting?: string;
};

type GetCargoRespType = GetUserCargoDataType;

export type {
    CreateCargoRespType,
    CreateDocumentArgs,
    CreateDocumentReturned,
    DaDataSuggestion,
    Address,
    Coordinates,
    GetUserCargoArgType,
    CreateCargoArgType,
    GetUserCargoDataType,
    GetUserCargoRespType,
    GetCargoRespType,
};

export { FiasLevels };
