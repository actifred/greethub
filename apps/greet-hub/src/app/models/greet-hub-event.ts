export interface GreetHubEvent
{
    id?: string,
    title: string,
    description: string,
    location: string,
    localTimeZoneId: string,
    utcStartTime: Date,
    utcEndTime: Date
};