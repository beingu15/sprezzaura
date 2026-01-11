import { Breadcrumbs } from "./Breadcrumbs";

type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-primary/5 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
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
