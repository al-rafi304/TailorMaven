import React, {useEffect, useRef, useState} from "react";
import FabricAPI from '../services/FabricAPI'
import SuitAPI from "../services/SuitAPI";
import CartAPI from "../services/CartAPI"
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, AccumulativeShadows, RandomizedLight, castShadow, Environment } from '@react-three/drei'
import { Suit } from "./Suit";
import { SINGLE, DOUBLE, TUXEDO } from "../constants/SuitTypes"
import { Link, useNavigate } from 'react-router-dom';
import ProductTypes from "../constants/ProductTypes";

function Visualize(){
    const [allFabrics, setAllFabrics] = useState([])
    const [fabricImage, setFabricImage] = useState(null)

    const [selectedFabric, setSelectedFabric] = useState(null)
    const [suitType, setSuitType] = useState(SINGLE)
    const [length, setLength] = useState(null)
    const [waist, setWaist] = useState(null)
    const [chest, setChest] = useState(null)
    const [armLength, setArmLength] = useState(null)

	const navigate = useNavigate()
    const [disableSubmit, setDisableSubmit] = useState(true)

    // Fetching all fabrics
    useEffect(() => {
        async function get(){
            var fabricData = await FabricAPI.getAllFabrics()
            setAllFabrics(fabricData)
            setSelectedFabric(fabricData[0])
            setFabricImage(fabricData[0].image)
        }
        get()
    }, [])

    // Enabling Add to cart Button
    useEffect(() => {
        console.log(selectedFabric, suitType, length, waist, chest, armLength)

        if(!suitType || !length || !waist || !chest || !armLength){
            setDisableSubmit(true)
        } else {
            setDisableSubmit(false)
        }

    }, [selectedFabric, suitType, length, waist, chest, armLength])

    async function addToCart(){
        var suit = await SuitAPI.createSuit(selectedFabric, suitType, length, waist, chest, armLength)
        console.log(suit)

        var cart = await CartAPI.addToCart(ProductTypes.SUIT, suit._id)
        console.log('added to cart', cart)

        navigate('/')

    }

    return (
        <div className="mt-3 row justify-content-center align-items-start">

            {/* Material Selection */}
            <div className="col-3 overflow-y-auto" style={{height: 680}}>
            <h2>Select materials</h2>
                <div className="row row-cols-3 align-items-start">
                    {allFabrics.map(fab => ( 
                        <>
                            <button className="btn col" onClick={() => {
                                setFabricImage(fab.image)
                                setSelectedFabric(fab)
                                }}>
                                <img src={fab.image} className="" height={100} width={100}/>
                                <p className="text-body-secondary">{fab.name}</p>
                            </button>
                        </>
                    ))}
                </div>
            </div>

            {/* Showing 3D model */}
            <div className="col-4">
                <Canvas camera={{ position: [5, 5, 5], fov: 35 }} castShadow style={{height: 500}}>

                    {/* Lighting */}
                    <ambientLight intensity={Math.PI / 2} />
                    <directionalLight castShadow  position={[0, 15, 40]} intensity={Math.PI * 2}/>
                    <directionalLight castShadow  position={[0, 0, -40]} intensity={Math.PI * 2}/>
                    
                    {/* Displaying Suit */}
                    <Suit colorMap_src={fabricImage ? fabricImage : 'default_fabric.jpg'} />
                    
                    {/* Camera Controls */}
                    <OrbitControls autoRotate autoRotateSpeed={1} enablePan={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} /> 
                    
                </Canvas>
            </div>

            {/* Suit Type & Measurements */}
            <div className="col-3 ">

                <h2>Select Type</h2>
                <div className="row row-cols-3 mb-5">
                    <input type="radio" className="btn-check m-2 col" onClick={() => setSuitType(SINGLE)} name="options-outlined" id="dark-outlined1" />
                    <label className="btn btn-outline-dark m-2 col" htmlFor="dark-outlined1">Single Breast</label>

                    <input type="radio" className="btn-check m-2 col" onClick={() => setSuitType(DOUBLE)} name="options-outlined" id="dark-outlined2" />
                    <label className="btn btn-outline-dark m-2 col" htmlFor="dark-outlined2">Double Breast</label>

                    <input type="radio" className="btn-check m-2 col" onClick={() => setSuitType(TUXEDO)} name="options-outlined" id="dark-outlined3" />
                    <label className="btn btn-outline-dark m-2 col" htmlFor="dark-outlined3">Tuxedo</label>
                </div>

                <h2>Measurements</h2>
                <div className="row row-cols-2 g-3 mb-5">
                    <div className="form-floating">
                        <input type="number" className="form-control" onChange={(e) => {setLength(e.target.value)}} id="length" style={{resize: "none"}}/>
                        <label className="ms-2 text-secondary" htmlFor="length">Length</label>
                    </div>
                    <div className="form-floating">
                        <input type="number" className="form-control" onChange={(e) => {setWaist(e.target.value)}} id="waist" style={{resize: "none"}}/>
                        <label className="ms-2 text-secondary" htmlFor="waist">Waist</label>
                    </div>
                    <div className="form-floating">
                        <input type="number" className="form-control" onChange={(e) => {setChest(e.target.value)}} id="chest" style={{resize: "none"}}/>
                        <label className="ms-2 text-secondary" htmlFor="chest">Chest</label>
                    </div>
                    <div className="form-floating">
                        <input type="number" className="form-control" onChange={(e) => {setArmLength(e.target.value)}} id="arm-length" style={{resize: "none"}}/>
                        <label className="ms-2 text-secondary" htmlFor="arm-ength">Arm Length</label>
                    </div>
                </div>
                
                {/* Price */}
                <div className="row mb-5">
                    <h2>Price: unknown$</h2>
                </div>

                {/* Add to cart */}
                <div className="row p-2">
                    {disableSubmit ? 
                        <button type="button" onClick={addToCart} className="btn btn-success" disabled>Add to Cart</button>
                        :
                        <button type="button" onClick={addToCart} className="btn btn-success">Add to Cart</button>
                    }
                </div>
            </div>

        </div>
    )
}

export default Visualize;