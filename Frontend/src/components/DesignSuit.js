import React, {useEffect, useRef, useState} from "react";
import FabricAPI from '../services/FabricAPI'
import SuitAPI from "../services/SuitAPI";
import CartAPI from "../services/CartAPI"
import AuthAPI from '../services/AuthAPI'
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
    const [suitScreenshot, setSuitScreenshot] = useState(null)

	const navigate = useNavigate()
    const [disableSubmit, setDisableSubmit] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [fabricsLoading, setFabricsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const ref = useRef()

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Fetching all fabrics
    useEffect(() => {
        async function getFab(){
            var fabricData = await FabricAPI.getAllFabrics()
            setAllFabrics(fabricData)
            setSelectedFabric(fabricData[0])
            setFabricImage(fabricData[0].image)
            setFabricsLoading(false)
        }

        async function check(){
            var res = await AuthAPI.isLoggedIn()
            setIsLoggedIn(res)
        }

        getFab()
        check()
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

    // Taking screenshot when fabric/suitType selected
    useEffect(() => {
        async function takeScreeenshot(){
            await sleep(500)        // Needs to wait until the fabric/suitType changes in canvas
            ref.current.toBlob((blob) => {
                var file = new File([blob], 'image', {type: "image/jpeg"})
                setSuitScreenshot(file)
                console.log(URL.createObjectURL(blob))
            })
        }

        takeScreeenshot()

    }, [selectedFabric, suitType])

    async function addToCart(){
        setIsLoading(true)
        var suit = await SuitAPI.createSuit(selectedFabric, suitType, length, waist, chest, armLength, suitScreenshot)
        console.log(suit)

        var cart = await CartAPI.addToCart(ProductTypes.SUIT, suit._id)
        console.log('added to cart', cart)

        navigate('/add-to-cart')

    }

    return (
        <div className="mt-3 row justify-content-center align-items-start">

            {/* Material Selection */}
            <div className="col-3 overflow-y-auto" style={{height: 680}}>
            <h2>Select materials</h2>
                <div className="row row-cols-3 align-items-start">
                    {!fabricsLoading 
                        ?
                        allFabrics?.map(fab => ( 
                            <>
                                <button className="btn col" onClick={() => {
                                    setFabricImage(fab.image)
                                    setSelectedFabric(fab)
                                    }}>
                                    <img src={fab.image} className="" height={100} width={100}/>
                                    <p className="text-body-secondary">{fab.name}</p>
                                </button>
                            </>
                        ))
                        :
                        <div>
                            <div className="spinner-border spinner-border-sm" style={{height:100, width:100}} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {/* Showing 3D model */}
            <div className="col-4">
                <Canvas ref={ref} gl={{ preserveDrawingBuffer: true }} camera={{ position: [5, 5, 5], fov: 35 }} castShadow style={{height: 500}}>

                    {/* Lighting */}
                    <ambientLight intensity={Math.PI / 2} />
                    <directionalLight castShadow  position={[0, 15, 40]} intensity={Math.PI * 2}/>
                    <directionalLight castShadow  position={[0, 0, -40]} intensity={Math.PI * 2}/>
                    
                    {/* Displaying Suit */}
                    <Suit colorMap_src={fabricImage ? fabricImage : 'default_fabric.jpg'} suitType={suitType} />
                    
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
                    {disableSubmit || !isLoggedIn || isLoading ? 
                        <button type="button" onClick={addToCart} className="btn btn-success" disabled>
                            {!isLoading ? 'Add to Cart'
                                :
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                        </button>
                        :
                        <button type="button" onClick={addToCart} className="btn btn-success">
                            {!isLoading ? 'Add to Cart'
                                :
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                        </button>
                    }
                </div>
            </div>

        </div>
    )
}

export default Visualize;