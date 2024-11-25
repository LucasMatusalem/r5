export interface DashboardTotalsResponse {
  domainsTotal: number;
  subdomainsTotal: number;
  vulnerabilitiesTotal: number;
}

type PieChartData = {
  name: string;
  total: number;
}

export interface DashboardPieChartsResponse {
  "assetsByType": PieChartData[];
  "vulnerabilitiesBySeverity": PieChartData[];
}

export interface Vulnerability {
  id: number;
  tid: string;
  template: string;
  templatepath: string;
  name: string;
  mname: string;
  matchedat: string;
  severity: string;
  host: string;
  ip: string;
  extractedresults: string;
  description: string;
  status: string;
  falsepositive: boolean;
}

export interface Company {
  id: string;
  name: string;
  databaseName: string;
}

export class BackendApi {
  private fetch = $fetch.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
    },
  });

  private tenantId: string | null = null;

  setTenantId(id: string) {
    this.tenantId = id;
  }

  public getCompanies() {
    // Mock data
    return useAsyncData(() => Promise.resolve<Company[]>([
      { id: "1", name: "Company One", databaseName: "company-one" },
      { id: "2", name: "Company Two", databaseName: "company-two" },
      { id: "3", name: "Company Three", databaseName: "company-three" },
      { id: "4", name: "Company Four", databaseName: "company-four" },
      { id: "5", name: "Company Five", databaseName: "company-five" },
      { id: "6", name: "Company Six", databaseName: "company-six" },
      { id: "7", name: "Company Seven", databaseName: "company-seven" },
      { id: "8", name: "Company Eight", databaseName: "company-eight" },
      { id: "9", name: "Company Nine", databaseName: "company-nine" },
      { id: "10", name: "Company Ten", databaseName: "company-ten" },
    ]));
  }

  public getDashboardTotals() {
    return useAsyncData(
      () => this.fetch<DashboardTotalsResponse>("/dashboard/totals", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      }),
    );
  }

  public getDashboardPieCharts() {
    return useAsyncData(async () => {
      const data = await this.fetch<DashboardPieChartsResponse>("/dashboard/charts/pie-charts", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      return data;
    });
  }

  public getVulnerabilities(filter?: {
    from?: string;
    to?: string;
  }) {
    return useAsyncData(async () => {
      const data = await this.fetch<Vulnerability[]>("/vulnerabilities", {
        query: {
          from: filter?.from ?? undefined,
          to: filter?.to ?? undefined,
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      return data;
    });
  }

  public getInfoVulnerabilities() {
    return useAsyncData(async () => {
      const data = await this.fetch<Vulnerability[]>("/vulnerabilities/info", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      return data;
    });
  }

  public getSubdomains() {
    return useAsyncData(async () => {
      const data = await this.fetch<string[]>("/subdomains", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      return data;
    });
  }

  // login routes
  public async login(username: string, password: string, otpCode?: string) {
    if(!otpCode) {
      return {
        otpRequired: true
      }
    }
    if(otpCode) {
      return {
        
    "token": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDE5MzRmMmQtMDA3Ni03MWUxLWI5YTgtYTUxNmMzOTM5Yjc5IiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWF0dXNhLmRldiIsImNvbXBhbmllcyI6W10sInJvbGVJZCI6IjAxOTM0ZjFlLTU5OTQtN2FiMi05NTU0LWRjNmE5YjM5NjFmMyIsInJvbGVuYW1lIjoiYWRtaW4ifSwicGVybWlzc2lvbnMiOlsidXNlcnM6bGlzdCIsInVzZXJzOm1hbmFnZSIsImNvbXBhbmllczptYW5hZ2UiLCJkYXNoYm9hcmQ6dmlldyIsInZ1bG5lcmFiaWxpdGllczp2aWV3IiwidnVsbmVyYWJpbGl0aWVzOm1hbmFnZSIsInJvbGVzOm1hbmFnZSIsInBlcm1pc3Npb25zOm1hbmFnZSJdLCJpYXQiOjE3MzI1NjYwMDksImV4cCI6MTczMjU2NjkwOX0.DfuldveYl6ZCeBo57n2f3N4xSONCZb_vkBlsMMgPFy1PqbN_MQZ91l2iHpoIrdHHoIJlhHowbkN4djGwG09D7w",
    "refreshToken": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxOTM0ZjJkLTAwNzYtNzFlMS1iOWE4LWE1MTZjMzkzOWI3OSIsInVzZXJuYW1lIjoiYWRtaW4iLCJkaWQiOiIkMmIkMTAkMDdlNVFES0Z6TWxTd1p3WTJGUTNNLk5qSkZGemtrWGRsQVRISUFqR3hBU0lPMGRYbFo5WnkiLCJpYXQiOjE3MzI1NjYwMDksImV4cCI6MTczMjY1MjQwOX0.h5nuHy56Wc99DYac-iHBL4RMOw8WJPFkcZJOw94SPUoaioN4vZsZMZCvE6puAmtFlCBEy4iu_ersaTJOL62FFw"

      }
    }
    const data = await this.fetch<any>("/auth/login", {
      method: "POST",
      body: {
        username,
        password,
        otpToken: otpCode,
      },
    });
    return data;
  }

  public async refreshToken(refreshToken: string) {
    const data = await this.fetch<any>("/auth/refresh", {
      method: "POST",
      body: {
        refreshToken,
      },
    });
    return data;
  }
}