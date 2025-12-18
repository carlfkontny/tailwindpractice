import { KPI } from "./components/KPI";
import { Avfallskilder } from "./components/Avfallskilder";
import { RestPerInnbygger } from "./components/RestPerInnbygger";

export default function Mepexdbui() {
  return (
    <div className="flex flex-col items-center h-screen mt-24">
      <h1 className="text-2xl font-bold mb-4">
        Velkommen til Mepex-databasen!
      </h1>
      <p className="text-med text-gray-500">Først noen nøkkeltall</p>
      <div className="grid grid-cols-3 gap-4 mt-8 max-w-6xl w-full px-4">
        <KPI
          title="Totalt avfall"
          value="11.1"
          unit="mill. tonn"
          description="Avfall i Norge i 2024"
          trend={{ value: 7.0, isPositive: false }}
        />
        <KPI
          title="Avfall per innbygger"
          value="400"
          unit="kg"
          description="Avfall i Norge i 2024 per innbygger"
          trend={{ value: 1.8, isPositive: false }}
        />
        <KPI
          title="Andel til materialgjenvinning"
          value="42.5"
          unit="%"
          description="Avfall til materialgjenvinning/forberedelse til ombruk"
          trend={{ value: 3.2, isPositive: true }}
          increaseIsGood={true}
        />
        <Avfallskilder />
        <RestPerInnbygger />
      </div>
      <hr className="w-2/3 my-8" />
      <p className="text-med text-gray-500">Her kan du dykke ned i skattekammeret</p>
      <div className="grid grid-cols-3 gap-4 mt-8 max-w-6xl w-full px-4">
        
      </div>
    </div>
  );
}
