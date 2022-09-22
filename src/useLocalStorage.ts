import {Dispatch, SetStateAction, useCallback, useState} from "react";

type UseLocalStorageResult<T> = [
    value: T,
    setValue: Dispatch<SetStateAction<T>>,
    resetToDefault: () => void
];
export function useLocalStorage<T>(key: string, defaultValue: T): UseLocalStorageResult<T> {
    const [value, setValue] = useState(
        (): T => key in localStorage ? JSON.parse(localStorage[key]) : defaultValue
    );

    const handleSetValue = useCallback((action: SetStateAction<T>) => {
        setValue(prevValue => {
            const value = typeof action === "function"
                ? (action as (prev: T) => T)(prevValue)
                : action;

            localStorage[key] = JSON.stringify(value);

            return value;
        });
    }, [key, setValue]);

    const handleResetValue = useCallback(
        () => handleSetValue(defaultValue),
        [handleSetValue, defaultValue]
    );

    return [value, handleSetValue, handleResetValue];
}
