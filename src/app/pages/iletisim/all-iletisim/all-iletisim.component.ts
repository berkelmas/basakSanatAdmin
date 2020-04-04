import { Component, OnInit, ViewChild } from "@angular/core";
import { ContactService } from "../../../services/contact/contact.service";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { IContactForm } from "../../../models/contact/contact.model";
import { first, map, tap } from "rxjs/operators";

@Component({
  selector: "app-all-iletisim",
  templateUrl: "./all-iletisim.component.html",
  styleUrls: ["./all-iletisim.component.css"],
})
export class AllIletisimComponent implements OnInit {
  dataSource = new MatTableDataSource<IContactForm>([]);
  loadingDataState = false;
  displayedColumns: string[] = ["name", "email", "message"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.contactService
      .getAllContactForms(1, 9999)
      .pipe(
        first(),
        map((res) => res.result),
        tap(() => (this.loadingDataState = false))
      )
      .subscribe((contacts) => {
        this.dataSource.data = contacts;
        this.dataSource._updateChangeSubscription();
      });
  }
}
