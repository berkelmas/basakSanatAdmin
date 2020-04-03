import { Component, OnInit } from "@angular/core";
import { BursService } from "../../../services/burslar/burs.service";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { IBurs } from "../../../models/burslar/burs.model";
import { map, concatMap } from "rxjs/operators";

@Component({
  selector: "app-delete-burs",
  templateUrl: "./delete-burs.component.html",
  styleUrls: ["./delete-burs.component.css"]
})
export class DeleteBursComponent implements OnInit {
  public burs: IBurs;

  constructor(
    private _snackBar: MatSnackBar,
    private bursService: BursService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map(res => res.id),
        concatMap(id => this.bursService.getBursById(id)),
        map(res => res.result)
      )
      .subscribe(burs => {
        this.burs = burs;
      });
  }

  handleDelete() {
    this.bursService.deleteBurs(this.burs.id).subscribe(
      res => {
        if (!res.hasError) {
          this.router.navigate(["/scholarships", "all-scholarships"]);
          this._snackBar.open("Burs Silme Başarılı.", "Kapat", {
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
