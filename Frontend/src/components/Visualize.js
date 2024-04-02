import React, {useEffect, useRef, useState} from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, AccumulativeShadows, RandomizedLight, castShadow, Environment, useTexture, useGLTF } from '@react-three/drei'
import { TextureLoader } from "three";

function Suit(nodes, materials, selected_mat){
    /*
    Currently the mesh is taking all available materials from the gltf object itself which means
    adding new materials would require manually adding the material to the gltf file with blender first
    then export it again.
    To dynamically add materials with texture maps(images) so that the mesh doesn't depend on the gltf file itself, 
    the below commented out code can be used.
    However I'm seeing degrading results, so I'll stick to the first approach for now.
    
    // const [colorMap, normalMap] = useLoader(TextureLoader, ['fabrics/linen/3.jpg', 'fabrics/linen/3_normal.png'])
    // const customMat = {colorMap, normalMap}
    // return(
    //    <mesh>
    //        <meshStandardMaterial map={colorMap} normalMap={normalMap}
    //    </mesh>
    // )

    */

    return (
        <group dispose={null}>

            {/* Suit Body */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Suit_Base.geometry}
                material={selected_mat} 
            />
            

            {/* Suit Collar */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Collar.geometry}
                material={selected_mat}
                position={[0, 1.1, 0.701]}
                rotation={[Math.PI / 2, 0, 0]}
            />

            {/* Buttons */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Button01.geometry}
                material={materials.black_red_strip}
                position={[0.009, 0.062, 0.84]}
                rotation={[1.572, 0.006, -0.1]}
                scale={[0.045, 0.007, 0.045]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Button02.geometry}
                material={materials.black_red_strip}
                position={[0.024, -0.545, 0.807]}
                rotation={[1.572, 0.006, -0.1]}
                scale={[0.045, 0.007, 0.045]}
            />
        </group>
      )
}

function Visualize(){
    const [mat, setMat] = useState('cotton_strips')
    const [allMats, setAllMats] = useState([])

    const { nodes, materials } = useGLTF('/demo4.glb')

    useEffect(() => {
        setAllMats(Object.keys(materials))
        console.log(allMats)
    }, [])

    return (
        <div className="mt-3 row justify-content-center align-items-center" style={{height: 500}}>

            {/* Material Selection */}
            <div className="col-3">
                <div className="list-group">
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
                    {Suit(nodes, materials, materials[mat])}

                    {/* Camera Controls */}
                    <OrbitControls autoRotate autoRotateSpeed={4} enablePan={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} /> 
                </Canvas>
            </div>

        </div>
    )
}

export default Visualize;