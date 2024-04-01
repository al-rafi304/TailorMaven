import React, {useEffect, useRef, useState} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, AccumulativeShadows, RandomizedLight, castShadow, Environment, useFBX, useGLTF } from '@react-three/drei'

function Suit(nodes, mat){
    return (
        <group dispose={null}>

            {/* Suit Body */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Suit_Base.geometry}
                material={mat}
            />

            {/* Suit Collar */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Collar.geometry}
                material={mat}
                position={[0, 1.1, 0.701]}
                rotation={[Math.PI / 2, 0, 0]}
            />
        </group>
      )
}

function Visualize(){
    const [mat, setMat] = useState('cotton_strips')
    const [allMats, setAllMats] = useState([])

    const { nodes, materials } = useGLTF('/demo3.glb')
    
    useEffect(() => {
        setAllMats(Object.keys(materials))
        console.log(allMats)
    }, [])

    return (
        <div className="mt-3 row justify-content-center align-items-center" style={{height: 500}}>

            {/* Material Selection */}
            <div className="col-3">
                <div class="list-group">
                    {allMats.map(m => (
                        <button className="list-group-item list-group-item-action" onClick={(e) => {
                            e.preventDefault()
                            setMat(m)
                        }}> {m} </button>
                    ))}
                </div>
            </div>

            {/* Showing 3D model */}
            <div className="col-4">
                <Canvas camera={{ position: [5, 5, 5], fov: 35 }} castShadow style={{height: 500}}>

                    {/* Lighting */}
                    <ambientLight intensity={Math.PI / 4} />
                    <directionalLight castShadow  position={[0, 15, 0]} intensity={Math.PI * 2}/>
                    <directionalLight castShadow  position={[0, 0, 40]} intensity={Math.PI / 3}/>
                    <directionalLight castShadow  position={[0, 0, -40]} intensity={Math.PI / 3}/>
                    
                    {/* Displaying Suit */}
                    {Suit(nodes, materials[mat])}

                    {/* Camera Controls */}
                    <OrbitControls autoRotate autoRotateSpeed={4} enablePan={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} /> 
                </Canvas>
            </div>

        </div>
    )
}

export default Visualize;