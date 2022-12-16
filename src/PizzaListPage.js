import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export function PizzaListPage() {

    const[pizzas,setPizzas] = useState([]);
    const[isFetchPending, setFetchPending] = useState(false);
    const [deleteId,setDeleteId]=useState("");
    useEffect(() => {
        setFetchPending(true);
        fetch("https://localhost:7156/pizza")
            .then((res) => res.json())
            .then((pizzak) => setPizzas(pizzak))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);
    return (
        <div className="container mt-3">
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div>
                    <h2>Pizzák</h2>
                    {pizzas.map((pizza)=>(
                        
                            <div className="card col-sm-3 d-inline-block m-1 p-2">
                                <p className="text-dark">{pizza.name}</p>
                                <p className="text-danger">Gluténmentes: {pizza.isGlutenFree>0? "igen" : "nem" }</p>
                                <div className="card-body">
                                <NavLink key={pizza.id} to={"/pizza/" + pizza.id}>
                                    <img alt={pizza.name}
                                    className="img-fluid"
                                    style={{maxHeight: 200}}
                                    src={pizza.kepURL ? pizza.kepURL : 
                                    "https://via.placeholder.com/400x800"} 
                                    />
                                    </NavLink>
                                    <br></br>
                                    <NavLink key={pizza.id} to={"/mod-pizza/" + pizza.id}>
                                    <i class="bi bi-pen"></i></NavLink> &nbsp;&nbsp;
<NavLink key={pizza.id} to={"/del-pizza/"+pizza.id}>
<i class="bi bi-trash"></i></NavLink>
                                </div>
                            </div>
                        
                    ))}
                </div>
            )}
        </div>
    </div>);
}
export default PizzaListPage;