import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface SpecialtyCardProps {
  id: string;
  name: string;
  description: string;
}

export const SpecialtyCard = ({ id, name, description }: SpecialtyCardProps) => {
  return (
    <>
      <Link to={`/users/appointments?specialty=${id}`} className="block no-underline">
        <Card className="h-full hover:border-slate-400 hover:shadow-sm transition-all duration-200 cursor-pointer">
          <CardHeader className="pb-2 font-semibold text-xl">
            {name}
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            {description}
          </CardContent>
        </Card>
      </Link>
    </>
  );
};
