import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, InfoIcon } from "lucide-react";

interface PreviewProps {
  formData: {
    name: string;
    location: string;
    date: string;
    description: string;
  };
}

export function Preview({ formData }: PreviewProps) {
  return (
    <Card className='overflow-hidden'>
      <CardHeader className='bg-gradient-to-r from-primary/10 to-purple-600/10'>
        <CardTitle className='text-2xl font-semibold'>
          {formData.name}
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-6'>
        <div className='space-y-4'>
          <div className='flex items-center space-x-2 text-muted-foreground'>
            <MapPinIcon className='w-5 h-5' />
            <p>{formData.location}</p>
          </div>
          <div className='flex items-center space-x-2 text-muted-foreground'>
            <CalendarIcon className='w-5 h-5' />
            <p>{formData.date}</p>
          </div>
          <div className='flex items-start space-x-2 text-muted-foreground'>
            <InfoIcon className='w-5 h-5 mt-1' />
            <p>{formData.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
