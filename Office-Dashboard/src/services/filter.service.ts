export const fetchFilterData = async <T>(url: string): Promise<T> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Fetch request failed with status ${response.status}`);
        }
        return (await response.json()) as T;
    } catch (err) {
        console.error("Error fetching filter data:", err);
        throw err;
    }
};

export const fetchFilterDataByUrlFunction = async <T>(
    urlFunction: (id: string) => string,
    id: string
): Promise<T> => {
    const url = urlFunction(id);
    return fetchFilterData<T>(url);
};

export const fetchFilterDataByTwoIdUrlFunction = async <T>(
    twoIdUrlFunction: (eventId: string, roundId: string) => string,
    eventId: string,
    roundId: string
): Promise<T> => {
    const url = twoIdUrlFunction(eventId, roundId);
    return fetchFilterData<T>(url);
};
