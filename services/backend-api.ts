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

export class BackendApi {
  fetch = $fetch.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
    },
  });

  public getDashboardTotals() {
    return useAsyncData(
      () => this.fetch<DashboardTotalsResponse>("/dashboard/totals"),
    );
  }

  public getDashboardPieCharts() {
    return useAsyncData(async () => {
      const data = await this.fetch<DashboardPieChartsResponse>("/dashboard/charts/pie-charts");
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
        }
      });
      return data;
    });
  }

  public getInfoVulnerabilities() {
    return useAsyncData(async () => {
      const data = await this.fetch<Vulnerability[]>("/vulnerabilities/info");
      return data;
    });
  }

  public getSubdomains() {
    return useAsyncData(async () => {
      const data = await this.fetch<string[]>("/subdomains");
      return data;
    });
  }
}
