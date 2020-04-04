import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { BursService } from "../../../services/burslar/burs.service";
import { IBursApplication } from "../../../models/burslar/burs.model";
import { first, map, tap } from "rxjs/operators";

@Component({
  selector: "app-all-burs-basvuru",
  templateUrl: "./all-burs-basvuru.component.html",
  styleUrls: ["./all-burs-basvuru.component.css"],
})
export class AllBursBasvuruComponent implements OnInit {
  dataSource = new MatTableDataSource<IBursApplication>([]);
  loadingDataState = false;
  displayedColumns: string[] = [
    "name",
    "phone",
    "email",
    "scholarship",
    "message",
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private bursService: BursService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.bursService
      .getBursApplies(1, 99999)
      .pipe(
        first(),
        map((res) => res.result),
        tap(() => (this.loadingDataState = false))
      )
      .subscribe((duyurular) => {
        this.dataSource.data = duyurular;
        this.dataSource._updateChangeSubscription();
      });
  }
}
