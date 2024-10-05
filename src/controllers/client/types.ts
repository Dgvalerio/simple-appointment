export namespace Timesheet {
  export namespace Original {
    export interface Category {
      Id: number;
      Name: string;
      IdProject: number;
    }

    export interface Project {
      Id: number;
      Name: string;
      StartDate: string;
      EndDate: string;
      IdCustomer: number;
    }

    export interface Client {
      id: string;
      title: string;
    }

    export interface Appointment {
      __RequestVerificationToken: string;
      Id: string;
      IdCustomer: string;
      IdProject: string;
      IdCategory: string;
      // No formado dd/MM/yyyy
      InformedDate: string;
      // No formato hh:mm
      StartTime: string;
      // No formato hh:mm
      EndTime: string;
      NotMonetize: string;
      CommitRepository: string;
      Description: string;
    }
  }

  export interface Category {
    id: number;
    name: string;

    // projectId: number;
  }

  export interface Project {
    id: number;
    name: string;
    // startDate: string;
    // endDate: string;

    clientId: number;

    categories: Category[];
  }

  export interface Client {
    id: string;
    title: string;

    projects: Project[];
  }

  export interface Appointment {
    id: string;
    // No formado dd/MM/yyyy
    date: string;
    // No formato hh:mm
    startTime: string;
    // No formato hh:mm
    endTime: string;
    notMonetize: string;
    commitRepository: string;
    description: string;

    clientId: string;
    projectId: string;
    categoryId: string;
  }
}
