import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { IAtolye } from "../../../models/atolye/atolye.model";
import { AtolyeService } from "../../../services/atolyeler/atolye.service";
import { first, map, tap } from "rxjs/operators";

@Component({
  selector: "app-all-atolyeler",
  templateUrl: "./all-atolyeler.component.html",
  styleUrls: ["./all-atolyeler.component.css"],
})
export class AllAtolyelerComponent implements OnInit {
  dataSource = new MatTableDataSource<IAtolye>([]);
  loadingDataState = false;
  displayedColumns: string[] = ["title", "date", "actions"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private atolyeService: AtolyeService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.atolyeService
      .getAllAtolye()
      .pipe(
        first(),
        map((res) => res.result),
        tap(() => (this.loadingDataState = false))
      )
      .subscribe((atolyeler) => {
        this.dataSource.data = atolyeler;
        this.dataSource._updateChangeSubscription();
      });
  }
}
