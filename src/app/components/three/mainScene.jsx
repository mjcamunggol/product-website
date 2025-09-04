import {useRef} from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function MainScene(){
    const obj1Ref = useRef()
    const obj1SpinRef = useRef()
    const initialPosition = [0,0,0]
    const initialRotation =[0,0,0]

    useGSAP(
        () => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottoom',
                    scrub: true,
                    markers: true,
                }
            })
        timeline 
            .to(obj1Ref.current.position, {
                x: 0.5,
                y: 0,
                z: 3,
            })
            .to(obj1Ref.current.position,{
                x: 0,
                y:0,
                z: 0,
            })
            .to(obj1Ref.current.rotation,{
                x: Math.PI/2,
                duration: 2
            },0) //the 0 means start point of the movement
            .to(obj1SpinRef.current.rotation,{
                y: Math.PI/2,
                duration: 2
            },0)
        }
    )

    return (
        <>
        <group ref={obj1Ref} position={initialPosition} rotation ={initialRotation}>
            <group ref={obj1SpinRef}>
                <mesh>
                    <boxGeometry args={[1,1,1]} />
                    <meshStandardMaterial color="pink" />
                </mesh>
            </group>
        </group>
        </>
    )
}