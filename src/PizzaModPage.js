import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

export function PizzaModPage(){
    const params=useParams();
    const id=params.pizzaId;
    const navigate=useNavigate();
    const[pizza,setPizza] = useState([]);
    //const[isPending, setPending] = useState(false);
    const [modgluten,setModgluten]=useState('');
    const [modkepurl,setModkepurl]=useState('');
    const [modname,setModname]=useState('');
    useEffect(() => {
        //átírtam async-await-esre "simáról":
        // lényege, hogy aszinkron küldi az adatokat, és míg betölt, kirajzolja a pörgettyűt,
        // ha betöltött, akkor pedig a pizza képet és a többi információt.
        (async () => {
            try {
                //itt újabb infó: ha nem ` ` között hanem " " között írjuk be az alábbi kódot,
                // akkor nem megy, mert egyszerűen nem átveszi az id-t, hanem
                // megpróbálja átkódolni html-kódra, ami nem sikerül és hibával tér vissza,
                // illetve a fetch-elés nem hajtódik végre...
        const res= await fetch(`https://localhost:7156/pizza/${id}`)
            const pizza = await res.json();
            setPizza(pizza);
            setModname(pizza.name);
            console.log(modname);
            setModgluten(pizza.isGlutenFree);
            console.log(modgluten);
            setModkepurl(pizza.kepURL);
            console.log(modkepurl);
        }
        catch(error) {
            console.log(error);
        }
    })
    ();
 }, [id,modname,modgluten,modkepurl]);
 const modName=event=>{
    setModname(event.target.value);
 }
 const modGluten=event=>{
    setModgluten(event.target.value);
 }
 const modKepurl=event=>{
    setModkepurl(event.target.value);
 }
    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Pizza modósítás</h2>
            <form
            onSubmit={(event) => {
                //ez a két sor azért kell, mert szükséges megállítani a form-ot,
                // hogy ne küldje újra az adatokat a böngészőnek, mert az nem jó,
                //hanem itt nekünk az kívánatos, hogy elküldje az adatokat a backend-nek
            event.persist();
            event.preventDefault();
            fetch(`https://localhost:7156/pizza/${id}`, {
                method: "POST",
                //bekerült ez az "újítás", ami miatt nem ment:
                headers: {
                    'Content-Type': 'application/json',
                },
                // itt figyeljetek, mert BAL oldalra kell amit a backend-be írunk,
                //míg jobb oldalra az űrlap-elemek pontos nevei kerültek, kicsivel!!!

                body: JSON.stringify({
                    id: event.target.elements.id.value,
                    name: event.target.elements.name.value,
                    isGlutenFree: event.target.elements.isglutenfree.value,
                    kepURL: event.target.elements.kepurl.value,
                }),
            })
            // ha kész, visszadob a főoldalra! Return-öl a backend-ről minden infót!
            .then(() =>
            {
                navigate("/");
            })
            .catch(console.log);
            }}>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Pizza név:</label>
                <div className="col-sm-9">
                <input type="text" name="name" className="form-control" value={pizza.id}/>
                </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Pizza név:</label>
                <div className="col-sm-9">
                <input type="text" name="name" className="form-control" defaultValue={pizza.name} onChange={modName}/>
                </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Gluténmentes:</label>
                <div className="col-sm-9">
                <input type="number" name="isglutenfree" className="form-control" defaultValue={pizza.isGlutenFree} onChange={modGluten}/>
                </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                <div className="col-sm-9">
                <input type="text" name="kepurl" className="form-control" defaultValue={pizza.kepURL} onChange={modKepurl}/>
                <br/>
                <img src={pizza.kepURL} height="200px" alt={pizza.name}></img></div>
            </div>
            <button type="submit" className="btn btn-success">
                Küldés
            </button>
            </form>
        </div>
    );
}
export default PizzaModPage;