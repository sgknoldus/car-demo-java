import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, of, throwError } from "rxjs";
import { CarBrand, CarDetails } from "../module/cars-details.model";

@Injectable({
  providedIn: "root",
})
export class CarDetailsService {
  private const ADMIN_GCP_HOST = `localhost`;

  //GCP host
  private brandsUrlGCP = "http://${this.ADMIN_GCP_HOST}/v1/data/brands";
  private carModelsUrlGCP = "http://${this.ADMIN_GCP_HOST}/v1/data/cars/";
  private addBulkDataGCP: string = "http://${this.ADMIN_GCP_HOST}/v1/data";

  //azure host
  private brandsUrlAzure = "http://40.88.227.104/v1/data/brands";
  private carModelsUrlAzure = "http://40.88.227.104/v1/data/cars/";
  private addBulkDataAzure: string = "http://40.88.227.104/v1/data";

  //private brandsUrlGCPSSE = "http://35.193.88.251/v1/data/brands-sse";
  //private eventSource!: EventSource;
  //carBrands: CarBrand[] = [];
  constructor(private http: HttpClient) {}

  getCarBrands(selectedCloud: string): Observable<CarBrand[]> {
    const url =
      selectedCloud === "gcp" ? this.brandsUrlGCP : this.brandsUrlAzure;
    return this.http.get<CarBrand[]>(url).pipe(
      catchError((error) => {
        if (error.status === 404 || error.status === 500) {
          console.log("No data in the database");
        }
        return of([]);
      }),
    );
  }
  getCarModels(
    selectedCloud: string,
    carBrandName: string,
  ): Observable<CarDetails[]> {
    const url =
      selectedCloud === "gcp" ? this.carModelsUrlGCP : this.carModelsUrlAzure;
    return this.http.get<CarDetails[]>(url.concat(carBrandName));
  }

  addBulkData(selectedCloud: string): Observable<any> {
    return this.http
      .post<any>(
        selectedCloud === "gcp" ? this.addBulkDataGCP : this.addBulkDataAzure,
        null,
      )
      .pipe(
        catchError((err) => {
          console.error("There was an error!", err);
          return of();
        }),
      );
  }

  // getCarModelsAzure(carBrandName: string): Observable<CarDetails[]> {
  //   return this.http.get<CarDetails[]>(
  //     this.carModelsUrlAzure.concat(carBrandName),
  //   );
  // }
  // subscribeToCarData(): Observable<CarBrand> {
  //   const url = this.brandsUrlGCPSSE; // Replace with your actual URL
  //
  //   this.eventSource = new EventSource(url);
  //
  //   return new Observable<CarBrand>((observer) => {
  //     this.eventSource.onmessage = (event) => {
  //       const carData = JSON.parse(event.data);
  //
  //       const carBrands: CarBrand = {
  //         brand: carData.brand,
  //       };
  //
  //       this.carBrands.push(carBrands);
  //       observer.next(carBrands);
  //     };
  //
  //     this.eventSource.onerror = (error) => {
  //       observer.error(error);
  //     };
  //
  //     return () => {
  //       this.eventSource.close();
  //     };
  //   });
  // }
}