import { Breadcrumbs } from "./Breadcrumbs";

type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative bg-floral-pattern py-12 md:py-20">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative container mx-auto px-4 md:px-6">
        <Breadcrumbs className="mb-4 justify-center" />
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
            {title}
            </h1>
            <p className="mt-3 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
            </p>
        </div>
      </div>
    </div>
  );
}
