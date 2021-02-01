import { Event, EventWithRelations } from 'src/app/openapi';

export class EventModel implements Event {
  id?;
  name: string;
  startDate: string[];
  endDate: string;
  published: boolean;
  ownerEmail: string;
  constructor() {}
}
