import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { IAtolyeApplication } from "../../../models/atolye/atolye.model";
import { AtolyeService } from "../../../services/atolyeler/atolye.service";
import { first, map, tap } from "rxjs/operators";

@Component({
  selector: "app-all-atolye-basvuru",
  templateUrl: "./all-atolye-basvuru.component.html",
  styleUrls: ["./all-atolye-basvuru.component.css"],
})
export class AllAtolyeBasvuruComponent implements OnInit {
  dataSource = new MatTableDataSource<IAtolyeApplication>([]);
  loadingDataState = false;
  displayedColumns: string[] = [
    "name",
    "phone",
    "email",
    "workshop",
    "message",
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private atolyeService: AtolyeService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.atolyeService
      .getAtolyeApplies(1, 99999)
      .pipe(
        first(),
        map((res) => res.result),
        tap(() => (this.loadingDataState = false))
      )
      .subscribe((atolyeApplications) => {
        this.dataSource.data = atolyeApplications;
        this.dataSource._updateChangeSubscription();
      });
  }
}
