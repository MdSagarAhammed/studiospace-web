import { SectionHeading } from "@/components/shared/SectionHeading";

export function StudioFormHeader({ title, subtitle }) {
  return (
    <SectionHeading
      align="left"
      eyebrow="Host"
      title={title}
      subtitle={subtitle}
      className="mb-8"
    />
  );
}
