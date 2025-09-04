'use client';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { MainScene } from "./mainScene";

export function MainCanvas(){
    return (
        <div className="w-screen h-screen fixed top-0 left-0">
            <Canvas
            shadows
            dpr={[1,2]}
            camera={{fov:55, position:[0,0,6]}}
            >
                <Environment files="sky.jpg" />
                <MainScene />
            </Canvas>
        </div>
    )
}