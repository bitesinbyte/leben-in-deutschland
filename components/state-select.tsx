import { getStates, setUserState } from "@/services/states";
import { State } from "@/types/state";
import { Card, CardBody, CardHeader, Image, Link } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

export default function StateSelect(props: any) {
    const [states, setStates] = useState<State[]>([]);
    const router = useRouter();
    useEffect(() => {
        (async () => {
            let states = await getStates();
            setStates(states);
        })();
    }, []);
    const handleSelectState = async (state: State) => {
        await setUserState(state);
    };
    return (
        <>
            <div className="flex content-center mb-10">
                <p className="font-bold text-2xl dark:text-white">Please choose a state for which you would like to practice the questions</p>
            </div>
            <div className="flex content-center gap-3 grid grid-cols-2 sm:grid-cols-4">
                {states && states.length > 0 && states.map((state: State) => (
                    <Card key={state.code} className="grid bg-gray-200  dark:bg-gray-700" isPressable isHoverable onPress={() => handleSelectState(state)}>
                        <CardHeader>
                            <Image
                                alt={state.name}
                                className="object-cover justify-center items-center"
                                src={`/states/flag/${state.name}.svg`}
                                width={50}
                            />
                            <div className="ml-1">
                                <h4 className=" text-large uppercase font-bold dark:text-white">{state.name}</h4>
                                {state.eng !== "" && <small className="text-default-500 dark:text-white">({state.eng})</small>}
                                {state.capital !== "" && <p className="font-bold text-tiny dark:text-white">{state.capital}</p>}
                            </div>
                        </CardHeader>
                        <CardBody className="px-3 py-0 text-small text-default-400 justify-center items-center">
                            <Image
                                alt={state.name}
                                className="object-cover rounded-xl "
                                src={`/states/coat-of-arms/${state.name}.svg`}
                                width={100}
                            />
                        </CardBody>
                    </Card>
                ))}
            </div>
        </>
    );
}