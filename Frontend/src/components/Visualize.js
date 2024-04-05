import React, {useEffect, useRef, useState} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, AccumulativeShadows, RandomizedLight, castShadow, Environment, useTexture, useGLTF } from '@react-three/drei'
import * as THREE from "three";

function Suit({colorMap_src}){
    const { nodes, materials } = useGLTF('/demo4.glb')
    const colorMap = useTexture(colorMap_src)
    
    // Tiling Texture
    let scale = 5
    colorMap.repeat.set(scale, scale)
    colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;

    return (
        <group dispose={null}>

            {/* Suit Body */}
            <mesh 
                castShadow 
                receiveShadow 
                geometry={nodes.Suit_Base.geometry}>
                    <meshPhysicalMaterial 
                        map={colorMap}
                        specularIntensity={0.1} 
                        sheen={0.5}/>
            </mesh>
            
            {/* Suit Collar */}
            <mesh 
                castShadow 
                receiveShadow 
                geometry={nodes.Collar.geometry} 
                position={[0, 1.1, 0.701]} 
                rotation={[Math.PI / 2, 0, 0]}>
                    <meshPhysicalMaterial 
                        map={colorMap}
                        specularIntensity={0.1} 
                        sheen={0.5}/>
            </mesh>

            {/* Buttons */}
            <mesh 
                castShadow 
                receiveShadow 
                geometry={nodes.Button01.geometry} 
                position={[0.009, 0.062, 0.84]} 
                rotation={[1.572, 0.006, -0.1]} 
                scale={[0.045, 0.007, 0.045]}>
                    <meshPhysicalMaterial 
                        color={ new THREE.Color(0x000000)}/>
            </mesh>
            <mesh 
                castShadow 
                receiveShadow 
                geometry={nodes.Button01.geometry} 
                position={[0.024, -0.545, 0.807]} 
                rotation={[1.572, 0.006, -0.1]} 
                scale={[0.045, 0.007, 0.045]}>
                    <meshPhysicalMaterial 
                        color={ new THREE.Color(0x000000)}/>
            </mesh>

            {/* Shirt */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Shirt.geometry}
                material={materials.Material}
                position={[0.004, 0.718, 0.513]}
                rotation={[1.203, -0.033, -0.012]}
                scale={1.258} />
        </group>
      )
}

function Visualize(){
    const [mat, setMat] = useState(1)

    var colorMap_src = `fabrics/linen/${mat}.jpg`

    return (
        <div className="mt-3 row justify-content-center align-items-center" style={{height: 500}}>

            {/* Material Selection */}
            <div className="col-3">
                <label htmlFor="points">Select material from 1-8</label>
                <input type="number" id="points" name="points" min="1" max="8" onChange={(e) => {
                    e.preventDefault()
                    if(e.target.value < 9) setMat(e.target.value)
                }}/>
            </div>

            {/* Showing 3D model */}
            <div className="col-4">
                <Canvas camera={{ position: [5, 5, 5], fov: 35 }} castShadow style={{height: 500}}>

                    {/* Lighting */}
                    <ambientLight intensity={Math.PI / 2} />
                    <directionalLight castShadow  position={[0, 15, 40]} intensity={Math.PI * 2}/>
                    <directionalLight castShadow  position={[0, 0, -40]} intensity={Math.PI * 2}/>
                    
                    {/* Displaying Suit */}
                    <Suit colorMap_src={colorMap_src} />
                    
                    {/* Camera Controls */}
                    <OrbitControls autoRotate autoRotateSpeed={4} enablePan={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} /> 
                    
                </Canvas>
            </div>

        </div>
    )
}

export default Visualize;