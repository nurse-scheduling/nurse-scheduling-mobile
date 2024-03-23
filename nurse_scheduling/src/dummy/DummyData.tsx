export type Nurse = {
    id: string;
    name: string;
}
export type Shift = {
    id: string;
    nurseId: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}
export type ShiftRequestCardType = {
    id: string;
    from: string;
    to: string;
    fromStartDate: string;
    fromEndDate: string;
    fromStartTime: string;
    fromEndTime: string;
    toStartDate: string;
    toEndDate: string;
    toStartTime: string;
    toEndTime: string;
}
export const myShifts = [
    {
        id: "1",
        nurseId: "5",
        startDate: "01.04.2024",
        endDate: "01.04.2024",
        startTime: "08:00",
        endTime: "16:00",
    },
    {
        id: "2",
        nurseId: "5",
        startDate: "04.04.2024",
        endDate: "04.04.2024",
        startTime: "08:00",
        endTime: "16:00",
    },
    {
        id: "3",
        nurseId: "5",
        startDate: "07.04.2024",
        endDate: "07.04.2024",
        startTime: "08:00",
        endTime: "16:00",
    }

];
export const nurseList = [
    {
        id: "1",
        name: "Mert Batuhan Ünverdi"
    },
    {
        id: "2",
        name: "Hüseyin Emre Üğdül"
    },
    {
        id: "3",
        name: "Murat Ak"
    },
    {
        id: "4",
        name: "Mehmet Ali"
    }
];
export const shiftList = [
    {
        id: "1",
        nurseId: "1",
        startDate: "01.04.2024",
        endDate: "01.04.2024",
        startTime: "08:00",
        endTime: "16:00",
    },
    {
        id: "2",
        nurseId: "1",
        startDate: "04.04.2024",
        endDate: "04.04.2024",
        startTime: "08:00",
        endTime: "16:00",
    },
    {
        id: "3",
        nurseId: "2",
        startDate: "07.04.2024",
        endDate: "07.04.2024",
        startTime: "08:00",
        endTime: "16:00",
    },
    {
        id: "4",
        nurseId: "3",
        startDate: "10.04.2024",
        endDate: "10.04.2024",
        startTime: "08:00",
        endTime: "16:00",
    }
];
export const DaysOfAMonth = [
    { date: "01.04.2024" }, { date: "02.04.2024" }, { date: "03.04.2024" },
    { date: "04.04.2024" }, { date: "05.04.2024" }, { date: "06.04.2024" },
    { date: "07.04.2024" }, { date: "08.04.2024" }, { date: "09.04.2024" },
    { date: "10.04.2024" }, { date: "11.04.2024" }, { date: "12.04.2024" },
    { date: "13.04.2024" }, { date: "14.04.2024" }, { date: "15.04.2024" },
    { date: "16.04.2024" }, { date: "17.04.2024" }, { date: "18.04.2024" },
    { date: "19.04.2024" }, { date: "20.04.2024" }, { date: "21.04.2024" },
    { date: "22.04.2024" }, { date: "23.04.2024" }, { date: "24.04.2024" },
    { date: "25.04.2024" }, { date: "26.04.2024" }, { date: "27.04.2024" },
    { date: "28.04.2024" }, { date: "29.04.2024" }, { date: "30.04.2024" },
];
export const shiftRequests:ShiftRequestCardType[] = [
    {
        id: "1",
        from: "Mert Batuhan Ünverdi",
        to: "Test Nurse",
        fromStartDate: "01.04.2024",
        fromEndDate: "01.04.2024",
        fromStartTime: "08:00",
        fromEndTime: "16:00",
        toStartDate: "01.04.2024",
        toEndDate: "02.04.2024",
        toStartTime: "16:00",
        toEndTime: "00:00",
    },
    {
        id: "2",
        from: "Mert Batuhan Ünverdi",
        to: "Test Nurse",
        fromStartDate: "04.04.2024",
        fromEndDate: "04.04.2024",
        fromStartTime: "08:00",
        fromEndTime: "16:00",
        toStartDate: "04.04.2024",
        toEndDate: "05.04.2024",
        toStartTime: "16:00",
        toEndTime: "00:00",
    },
    {
        id: "3",
        from: "Mert Batuhan Ünverdi",
        to: "Test Nurse",
        fromStartDate: "07.04.2024",
        fromEndDate: "07.04.2024",
        fromStartTime: "08:00",
        fromEndTime: "16:00",
        toStartDate: "07.04.2024",
        toEndDate: "08.04.2024",
        toStartTime: "16:00",
        toEndTime: "00:00",
    },
    {
        id: "4",
        from: "Mert Batuhan Ünverdi",
        to: "Test Nurse",
        fromStartDate: "10.04.2024",
        fromEndDate: "10.04.2024",
        fromStartTime: "08:00",
        fromEndTime: "16:00",
        toStartDate: "10.04.2024",
        toEndDate: "11.04.2024",
        toStartTime: "16:00",
        toEndTime: "00:00",
    },
    {
        id: "5",
        from: "Mert Batuhan Ünverdi",
        to: "Test Nurse",
        fromStartDate: "13.04.2024",
        fromEndDate: "13.04.2024",
        fromStartTime: "08:00",
        fromEndTime: "16:00",
        toStartDate: "13.04.2024",
        toEndDate: "14.04.2024",
        toStartTime: "16:00",
        toEndTime: "00:00",
    }
];


