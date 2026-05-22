import { Card, CardContent } from "@/components/ui/card";

type DashboardCardProps = {
  title: string;
  value: string;
};

const DashboardCard = ({ title, value }: DashboardCardProps) => {
  return (
    <Card className="border-border/70 bg-card/90 shadow-sm backdrop-blur">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          {value}
        </h2>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
