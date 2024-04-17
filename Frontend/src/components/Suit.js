import React from "react";
import { useTexture, useGLTF } from '@react-three/drei';
import * as THREE from "three";

export function Suit({ colorMap_src }) {
    const { nodes, materials } = useGLTF('/Suit.glb');
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
                <meshPhysicalMaterial
                    map={colorMap}
                    specularIntensity={0.1}
                    sheen={0.5} />
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
                    color={new THREE.Color(0)} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Button01.geometry}
                position={[0.024, -0.545, 0.807]}
                rotation={[1.572, 0.006, -0.1]}
                scale={[0.045, 0.007, 0.045]}>
                <meshPhysicalMaterial
                    color={new THREE.Color(0)} />
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
    );
}
