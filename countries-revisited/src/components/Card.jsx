
export default function Card({ flag, info }) {

    return (
        <div className="my-5">
            <div>
                <img className="mx-auto" src={info.flags} />
            </div>
            <div className="mt-2">
                <h1>{info.name}</h1>
                <div className="mt-2">
                    <p>{`Population: ${info.population}`}</p>
                    <p>{`Area: ${info.area}`}</p>
                    <p>{`Capital: ${info.capital}`}</p>
                    <p>{`Weather: ${info.condition}`}</p>
                    <p>{`Temperature: ${info.temp_c}`}</p>
                    <p>{`Humidity: ${info.humidity}`}</p>
                    <p>{`Uv: ${info.uv}`}</p>
                    <p>{`Wind velocity: ${info.wind_kph}`}</p>
                </div>
            </div>
        </div>
    )
}
