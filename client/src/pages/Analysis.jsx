import React, {useEffect, useState} from 'react';
import {Bar, BarChart, Legend, Tooltip, XAxis, YAxis} from 'recharts';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useParams} from "react-router-dom";

const AnalysisPage = () => {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const coodinates = [49.858582, 24.0306743]
    const priceComparisonData = [
        {name: 'Ця пропозиція', price: 1200},
        {name: "Об'єкт 1", price: 1000},
        {name: "Об'єкт 2", price: 1150},
        {name: "Об'єкт 3", price: 1300},
        {name: "Об'єкт 4", price: 1100},
    ];

    // Mocked data for charts
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                console.log(`Fetching: /api/listing/get/${params.stateId}`);
                const res = await fetch(`/api/listing/get/${params.stateId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                console.error("API request failed:", error);
                setError(true);
                setLoading(false);
            }
        };

        if (params.stateId) {
            fetchListing();
        } else {
            console.log("stateId not found in params");
        }
    }, [params, params.stateId]);


    return (
        <div className="analysis-page">
            {!loading && !error && listing && (
                <>
                    <header className="analysis-header">
                        <h1 className="text-slate-700 ml-1.5 font-bold m-3">Детальний аналіз нерухомості
                            - {listing?.name}</h1>
                    </header>
                    {/* Analytics Section */}
                    <section className="analytics">
                        <BarChart width={600} height={300} data={priceComparisonData}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar label="Ціна" dataKey="price" fill="#8884d8"/>
                            <span>Порівняння ціни на оренду відносно інших нерухомостейі</span>
                        </BarChart>

                        {/* Map for Location Analysis */}
                        <MapContainer center={coodinates} zoom={13} style={{height: '400px', width: '100%'}}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                            <Marker position={coodinates}>
                                <Popup>{listing?.name}</Popup>
                            </Marker>
                            {/* Additional markers for nearby amenities can be added here */}
                        </MapContainer>
                    </section>

                    {/* Market Trends Section */}
                    <section className="market-trends">
                        {/* Market trends graphs will go here */}
                    </section>

                    {/* Pros and Cons Section */}
                    <section className="pros-cons mt-3">
                        <div className="pros">
                            <h3 style={{fontWeight: 600}}>Плюси</h3>
                            <b>Зручне розташування:</b> Близькість до центру міста, офісних будівель, магазинів та
                            розважальних закладів.
                            <br/>
                            <b>Транспортна доступність:</b> Легкий доступ до громадського транспорту, включаючи метро,
                            автобуси та тролейбуси.
                            <br/>
                            <b>Сучасний ремонт:</b> Квартира з недавно зробленим ремонтом, сучасними меблями та
                            побутовою технікою.
                            <br/>
                            <b>Безпека:</b> Наявність охорони та відеонагляду в будинку та на прилеглій території.
                            <br/>
                            <b>Інфраструктура для комфорту:</b> Наявність парків, спортивних майданчиків, шкіл і дитячих
                            садків поруч.
                            <br/>

                        </div>
                        <div className="cons mt-3">
                            <b>Висока ціная:</b> Орендна плата $1200 на місяць може бути досить високою для деяких
                            орендарів.
                            <br/>
                            <b>Шум від дороги:</b> Через центральне розташування можливий шум від дорожнього руху.
                            <br/>
                            <b>Обмежені паркувальні місця:</b> Проблеми з паркуванням через велику кількість автомобілів
                            у центрі міста.
                            <br/>
                            <b>Підвищений ризик злочинності</b> Вища імовірність крадіжок та інших злочинів у
                            центральній місцевості.
                            <br/>
                        </div>
                    </section>

                </>
            )}
        </div>
    );
};

export default AnalysisPage;
