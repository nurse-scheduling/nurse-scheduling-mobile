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



