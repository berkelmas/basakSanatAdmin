import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { IBurs } from "../../../models/burslar/burs.model";
import { BursService } from "../../../services/burslar/burs.service";
import { first, map, tap } from "rxjs/operators";

@Component({
  selector: "app-all-burs",
  templateUrl: "./all-burs.component.html",
  styleUrls: ["./all-burs.component.css"]
})
export class AllBursComponent implements OnInit {
  dataSource = new MatTableDataSource<IBurs>([]);
  loadingDataState = false;
  displayedColumns: string[] = ["title", "actions"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private burslarService: BursService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.burslarService
      .getAllBurs()
      .pipe(
        first(),
        map(res => res.result),
        tap(() => (this.loadingDataState = false))
      )
      .subscribe(burslar => {
        this.dataSource.data = burslar;
        this.dataSource._updateChangeSubscription();
      });
  }
}
