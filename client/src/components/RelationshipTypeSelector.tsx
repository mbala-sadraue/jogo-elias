import { RelationshipType } from "../types";
import { useLanguage } from "../hooks/useLanguage";

interface RelationshipTypeSelectorProps {
  selectedRelationship: RelationshipType;
  onSelect: (relationship: RelationshipType) => void;
}

export default function RelationshipTypeSelector({
  selectedRelationship,
  onSelect
}: RelationshipTypeSelectorProps) {
  const { t } = useLanguage();
  
  const relationshipTypes: { id: RelationshipType, labelKey: string, icon: string }[] = [
    { id: "hetero", labelKey: "relationship.hetero", icon: "fas fa-venus-mars" },
    { id: "lesbico", labelKey: "relationship.lesbico", icon: "fas fa-venus-double" },
    { id: "gay", labelKey: "relationship.gay", icon: "fas fa-mars-double" },
    { id: "outro", labelKey: "relationship.outro", icon: "fas fa-transgender-alt" }
  ];

  return (
    <section className="mb-6 md:mb-8" data-section="relationship">
      <h2 className="mobile-heading font-semibold mb-3 md:mb-4 border-b border-gray-700 pb-2 flex items-center">
        <i className="fas fa-heart mr-2 text-secondary"></i>
        {t('relationship.type')}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {relationshipTypes.map((type) => (
          <button
            key={type.id}
            className={`option-btn ${
              selectedRelationship === type.id
                ? "bg-primary border-2 border-primary"
                : "bg-dark-900 hover:bg-primary/20 border-2 border-gray-700"
            } text-white py-2 md:py-3 px-2 md:px-4 rounded-lg flex flex-col items-center justify-center`}
            onClick={() => onSelect(type.id)}
          >
            <i className={`${type.icon} text-base md:text-lg mb-0.5 md:mb-1`}></i>
            <span className="text-xs md:text-sm font-medium">{t(type.labelKey)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
