/** Типизация для создания адреса */
export interface TypeAddress {
    name: string;
    arrayCountersName: string | string[];
    city: string;
    street: string;
    building: string;
    apartment: string;
    email: string;
    active: string;
}

/** Типизация для адреса */
export interface TypeAddressData extends TypeAddress {
    id: string;
}

