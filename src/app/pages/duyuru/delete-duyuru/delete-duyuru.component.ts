import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { DuyuruService } from "../../../services/duyurular/duyuru.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map, concatMap } from "rxjs/operators";
import { IDuyuru } from "../../../models/duyuru/duyuru.model";

@Component({
  selector: "app-delete-duyuru",
  templateUrl: "./delete-duyuru.component.html",
  styleUrls: ["./delete-duyuru.component.css"]
})
export class DeleteDuyuruComponent implements OnInit {
  public duyuru: IDuyuru;

  constructor(
    private _snackBar: MatSnackBar,
    private duyuruService: DuyuruService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map(res => res.id),
        concatMap(id => this.duyuruService.getDuyuruById(id)),
        map(res => res.result)
      )
      .subscribe(duyuru => {
        this.duyuru = duyuru;
      });
  }

  handleDelete() {
    this.duyuruService.deleteDuyuru(this.duyuru.id).subscribe(
      res => {
        if (!res.hasError) {
          this.router.navigate(["/announcements", "all-announcements"]);
          this._snackBar.open("Duyuru Silme Başarılı.", "Kapat", {
            duration: 2000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
        } else {
          this._snackBar.open(res.message, "Kapat", {
            duration: 2000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
        }
      },
      err =>
        this._snackBar.open("Beklenmedik Hata Meydana Geldi.", "Kapat", {
          duration: 2000,
          horizontalPosition: "right",
          verticalPosition: "top"
        })
    );
  }
}
