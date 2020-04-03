import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { first, map, tap } from "rxjs/operators";
import { DuyuruService } from "../../../services/duyurular/duyuru.service";
import { IDuyuru } from "../../../models/duyuru/duyuru.model";

@Component({
  selector: "app-all-duyuru",
  templateUrl: "./all-duyuru.component.html",
  styleUrls: ["./all-duyuru.component.css"]
})
export class AllDuyuruComponent implements OnInit {
  dataSource = new MatTableDataSource<IDuyuru>([]);
  loadingDataState = false;
  displayedColumns: string[] = ["title", "actions"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private duyuruService: DuyuruService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.duyuruService
      .getAllDuyuru(1, 99999)
      .pipe(
        first(),
        map(res => res.result),
        tap(() => (this.loadingDataState = false))
      )
      .subscribe(duyurular => {
        this.dataSource.data = duyurular;
        this.dataSource._updateChangeSubscription();
      });
  }
}
