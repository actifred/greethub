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

export interface TableGreetHubEvent
{
    id: string,
    title: string,
    location: string,
    startTime: string,
    endTime: string
};

export interface FormGreetHubEvent
{
    title: string,
    description: string,
    location: string,
    localTimeZoneId: string,
    startDate: Date,
    startHour: number,
    startMinute: number,
    endDate: Date,
    endHour: number,
    endMinute: number
};
