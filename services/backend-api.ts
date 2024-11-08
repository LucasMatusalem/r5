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
      {}
    );
  }

  public getDashboardPieCharts() {
    return useAsyncData(async () => {
      const data = await this.fetch<DashboardPieChartsResponse>("/dashboard/charts/pie-charts");
      return data;
    });
  }
}
