import React from "react";
import { useTexture, useGLTF } from '@react-three/drei';
import * as THREE from "three";
import { castShadow } from '@react-three/drei'
import {SINGLE, DOUBLE, TUXEDO} from "../constants/SuitTypes"

export function Suit({ colorMap_src, suitType }) {
    useGLTF.preload(`${SINGLE}.glb`)
    useGLTF.preload(`${DOUBLE}.glb`)
    useGLTF.preload(`${TUXEDO}.glb`)
    
    const { nodes, materials } = useGLTF(`${suitType}.glb`);
    const colorMap = useTexture(colorMap_src);

    // Tiling Texture
    let scale = 5;
    colorMap.repeat.set(scale, scale);
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
                    sheen={0.5} />
            </mesh>

            {/* Suit Collar */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Collar.geometry}
                position={[0, 1.1, 0.701]}
                rotation={[Math.PI / 2, 0, 0]}>
                {suitType != TUXEDO ?
                    <meshPhysicalMaterial
                        map={colorMap}
                        specularIntensity={0.1}
                        sheen={0.5} />
                    :
                    <meshPhysicalMaterial
                        color={new THREE.Color(0)} />       // Black color for Tuxedo
                }
            </mesh>


            {suitType == SINGLE ?
            <>
                {/* SINGLE Buttons */}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Button01.geometry}
                    material={materials.black_red_strip}
                    position={[0.009, 0.062, 0.85]}
                    rotation={[1.572, 0.006, -0.1]}
                    scale={[0.045, 0.007, 0.045]}>
                    {/* <meshPhysicalMaterial
                        color={new THREE.Color('black')} /> */}
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Button01.geometry}
                    material={materials.black_red_strip}
                    position={[0.024, -0.545, 0.810]}
                    rotation={[1.572, 0.006, -0.1]}
                    scale={[0.045, 0.007, 0.045]}>
                    {/* <meshPhysicalMaterial
                        color={new THREE.Color('black')} /> */}
                </mesh>
            </>
            : suitType == DOUBLE ?
            <>
                {/* DOUBLE Button */}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Button01.geometry}
                    material={materials.black_red_strip}
                    position={[-0.276, -0.13, 0.845]}
                    rotation={[1.572, 0.006, -0.1]}
                    scale={[0.045, 0.007, 0.045]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Button02.geometry}
                    material={materials.black_red_strip}
                    position={[-0.261, -0.597, 0.82]}
                    rotation={[1.572, 0.006, -0.1]}
                    scale={[0.045, 0.007, 0.045]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Button03.geometry}
                    material={materials.black_red_strip}
                    position={[0.072, -0.13, 0.831]}
                    rotation={[1.572, 0.006, -0.1]}
                    scale={[0.045, 0.007, 0.045]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Button04.geometry}
                    material={materials.black_red_strip}
                    position={[0.087, -0.597, 0.807]}
                    rotation={[1.572, 0.006, -0.1]}
                    scale={[0.045, 0.007, 0.045]}
                />
            </>
            :
            <>
                {/* Tuxedo Button */}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Button01.geometry}
                    material={materials.black}
                    position={[0.071, -0.614, 0.819]}
                    rotation={[1.572, 0.006, -0.1]}
                    scale={[0.045, 0.007, 0.045]}
                />
            </>
            }

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
    );
}
