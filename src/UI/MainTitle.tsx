import React from 'react';

type props = {
    title: string | undefined;
}
const MainTitle : React.FC<props> = ({title}) => {

    // return (
    //     <section className={"text-center"}>
    //         <h1 className={"text-3xl md:text-4xl font-bold"}>TECHSHIFT</h1>
    //         <h2 className={"text-3xl md:text-4xl font-bold"}>Summit</h2>
    //         <p className={"text-5xl md:text-6xl text-blue-400"}>2024</p>
    //     </section>
    // );
    return (
        <section className={"text-center"}>
            <h1 className={"text-3xl md:text-4xl font-bold"}>{title}</h1>
        </section>
    );
};

export default MainTitle;