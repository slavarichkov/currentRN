/**
 * Интерфейс данных для объекта с информацией о счетчике.
 */
export interface TypeCounterInfo {
    id?: string,
    name: string;
    address: string;
    counterNumber: string;
    dateOfCounterVerification: string;
    dateOfCounterVerificationNext: string;
    costOfaUnitOfMeasurement: string;
}

/**
 * Интерфейс данных для объекта с информацией о показаниях счетчика.
 */
export interface TypeCounterMeters {
    idCounter: string,
    date: string,
    data: string,
}