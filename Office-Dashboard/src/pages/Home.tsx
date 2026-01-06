import NavBar from "../components/Navbar";

export default function Home() {
    const gamedata = [
        { event: "Table Tennis", start_date: "2026-04-11", end_date: "2026-04-12" },
        { event: "Carram", start_date: "2026-04-11", end_date: "2026-04-12" },
        { event: "Futsal", start_date: "2026-04-11", end_date: "2026-04-12" },
        { event: "Badminton", start_date: "2026-04-11", end_date: "2026-04-12" },
        { event: "Online Game", start_date: "2026-04-11", end_date: "2026-04-12" },
    ];

    // Function to generate a light random color
    const getRandomLightColor = () => {
        const r = Math.floor(200 + Math.random() * 55); // 200-255
        const g = Math.floor(200 + Math.random() * 55);
        const b = Math.floor(200 + Math.random() * 55);
        return `rgb(${r}, ${g}, ${b})`;
    };

    return (
        <div className="h-screen w-screen bg-gray-100 flex">
            <NavBar />
            <div className="flex-1 p-10 md:p-20">
                <h3 className="font-bold text-4xl font-[Open_Sans]">Recent Events</h3>
                <hr className="font-bold mt-2" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
                    {gamedata.map((game, i) => (
                        <div
                            key={i}
                            className="aspect-[4/3] shadow-xl rounded-lg flex flex-col items-center justify-center p-4"
                            style={{ backgroundColor: getRandomLightColor() }}
                        >
                            <h1 className="text-2xl font-mono">{game.event}</h1>
                            <p className="text-sm text-gray-700 mt-2">
                                {game.start_date} - {game.end_date}
                            </p>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                onClick={() => alert(`You joined ${game.event}!`)}
                            >
                                Participate
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
