import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { IProje } from "../../../models/projeler/projeler.model";
import { ProjelerService } from "../../../services/projeler/projeler.service";
import { first, map, tap } from "rxjs/operators";
import { MatPaginator } from "@angular/material";

@Component({
  selector: "app-all-projects",
  templateUrl: "./all-projects.component.html",
  styleUrls: ["./all-projects.component.css"]
})
export class AllProjectsComponent implements OnInit {
  dataSource = new MatTableDataSource<IProje>([]);
  loadingDataState = false;
  displayedColumns: string[] = ["title", "actions"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private projelerService: ProjelerService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.projelerService
      .getAllProjeler(1, 10000)
      .pipe(
        first(),
        map(res => res.result),
        tap(() => (this.loadingDataState = false))
      )
      .subscribe(projeler => {
        this.dataSource.data = projeler;
        this.dataSource._updateChangeSubscription();
      });
  }
}
