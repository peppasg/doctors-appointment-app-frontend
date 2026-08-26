import { SpecialtyCard } from "@/components/SpecialtyCard";

const specialties = [
  { id: "cardiology", name: "Cardiology", description: "Heart and cardiovascular system" },
  { id: "dermatology", name: "Dermatology", description: "Skin and related conditions" },
  { id: "neurology", name: "Neurology", description: "Brain and nervous system" },
  { id: "pathology", name: "Pathology", description: "Diagnosis and treatment of diseases" },
];

const SpecialtySelectionPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
      {specialties.map((s) => (
        <SpecialtyCard 
          key={s.id} 
          id={s.id} 
          name={s.name} 
          description={s.description} 
        />
      ))}
    </div>
    </>
  );
};

export default SpecialtySelectionPage;
