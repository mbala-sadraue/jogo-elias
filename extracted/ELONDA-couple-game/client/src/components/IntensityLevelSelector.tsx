import { IntensityLevel } from "../types";
import { useLanguage } from "../hooks/useLanguage";

interface IntensityLevelSelectorProps {
  selectedIntensity: IntensityLevel;
  onSelect: (intensity: IntensityLevel) => void;
}

export default function IntensityLevelSelector({ 
  selectedIntensity, 
  onSelect 
}: IntensityLevelSelectorProps) {
  const { t } = useLanguage();
  
  const intensities: { id: IntensityLevel, labelKey: string, descriptionKey: string }[] = [
    { id: "suave", labelKey: "intensity.suave", descriptionKey: "intensity.suave.description" },
    { id: "picante", labelKey: "intensity.picante", descriptionKey: "intensity.picante.description" },
    { id: "selvagem", labelKey: "intensity.selvagem", descriptionKey: "intensity.selvagem.description" },
    { id: "extremo", labelKey: "intensity.extremo", descriptionKey: "intensity.extremo.description" }
  ];

  return (
    <section className="mb-6 md:mb-8" data-section="intensity">
      <h2 className="mobile-heading font-semibold mb-3 md:mb-4 border-b border-gray-700 pb-2 flex items-center">
        <i className="fas fa-fire-alt mr-2 text-secondary"></i>
        {t('intensity.level')}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {intensities.map((intensity) => (
          <button
            key={intensity.id}
            className={`option-btn ${
              selectedIntensity === intensity.id
                ? `bg-intensity-${intensity.id}/90 border-2 border-intensity-${intensity.id} scale-105 shadow-lg shadow-intensity-${intensity.id}/50 ring-4 ring-intensity-${intensity.id}/30`
                : `bg-dark-900 hover:bg-intensity-${intensity.id}/20 hover:scale-105 transition-all border-2 border-intensity-${intensity.id}`
            } text-white py-2 md:py-3 px-2 md:px-4 rounded-lg flex flex-col items-center justify-center transition-all duration-300`}
            onClick={() => onSelect(intensity.id)}
          >
            <span className={`text-intensity-${intensity.id} text-xs md:text-sm font-bold mb-0.5 md:mb-1`}>
              {t(intensity.labelKey).toUpperCase()}
            </span>
            <span className="text-[10px] md:text-xs text-light-200">{t(intensity.descriptionKey)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
