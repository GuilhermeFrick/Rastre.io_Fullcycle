export async function searchDirections(source: string, destination: string) {
    const [sourceResponse, destinationResponse] = await Promise.all([
        fetch(`http://localhost:3000/places?text=${source}`),
        fetch(`http://localhost:3000/places?text=${destination}`),
    ]);

    if (!sourceResponse.ok) {
        throw new Error('Failed to fetch source data');
    }

    if (!destinationResponse.ok) {
        throw new Error('Failed to fetch destination data');
    }

    const [sourceData, destinationData] = await Promise.all([
        sourceResponse.json(),
        destinationResponse.json(),
    ]);

    const placeSourceId = sourceData.cadidates[0].place_id;


}


export async function NewRoutePage({
    searchParams,
}: {
    searchParams: { source: string; destination: string };
}) {
    const { source, destination } = searchParams;


        const { sourceData, destinationData } = await searchDirections(source, destination);

        return (
            <div className="flex flex-1 w-full h-full">
                <div className="w-1/4 p-4 h-full">
                    <h4 className="text-3xl text-contrast mb-2">Nova rota</h4>
                    <form className="flex flex-col space-y-4" method="get">
                        <div className="relative">
                            <input
                                id="source"
                                name="source"
                                type="search"
                                placeholder="Origem"
                                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-contrast bg-default border-0 border-b-2 border-contrast appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                                defaultValue={source}
                            />
                            <label
                                htmlFor="source"
                                className="absolute text-contrast duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                            >
                                Origem
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                id="destination"
                                name="destination"
                                type="search"
                                placeholder="Destino"
                                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-contrast bg-default border-0 border-b-2 border-contrast appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                                defaultValue={destination}
                            />
                            <label
                                htmlFor="destination"
                                className="absolute text-contrast duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                            >
                                Destino
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="bg-main text-primary p-2 rounded text-xl font-bold"
                        >
                            Pesquisar
                        </button>
                    </form>

                    <div className="mt-4 p-4 border rounded text-contrast">
                        <ul>
                            <li className="mb-2">
                                <strong>Origem:</strong> {sourceData.name || 'N/A'}
                            </li>
                            <li className="mb-2">
                                <strong>Destino:</strong> {destinationData.name || 'N/A'}
                            </li>
                            <li className="mb-2">
                                <strong>Distância:</strong> {destinationData.distance || 'N/A'}
                            </li>
                            <li className="mb-2">
                                <strong>Duração:</strong> {destinationData.duration || 'N/A'}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    
}
