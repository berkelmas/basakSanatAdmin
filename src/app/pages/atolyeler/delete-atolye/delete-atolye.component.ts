import { Component, OnInit } from "@angular/core";
import { IAtolye } from "../../../models/atolye/atolye.model";
import { MatSnackBar } from "@angular/material";
import { AtolyeService } from "../../../services/atolyeler/atolye.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map, concatMap } from "rxjs/operators";

@Component({
  selector: "app-delete-atolye",
  templateUrl: "./delete-atolye.component.html",
  styleUrls: ["./delete-atolye.component.css"],
})
export class DeleteAtolyeComponent implements OnInit {
  public atolye: IAtolye;

  constructor(
    private _snackBar: MatSnackBar,
    private atolyeService: AtolyeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((res) => res.id),
        concatMap((id) => this.atolyeService.getAtolyeById(id)),
        map((res) => res.result)
      )
      .subscribe((atolye) => {
        this.atolye = atolye;
      });
  }

  handleDelete() {
    this.atolyeService.deleteAtolye(this.atolye.id).subscribe(
      (res) => {
        if (!res.hasError) {
          this.router.navigate(["/workshops", "all-workshops"]);
          this._snackBar.open("Atölye Silme Başarılı.", "Kapat", {
            duration: 2000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        } else {
          this._snackBar.open(res.message, "Kapat", {
            duration: 2000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        }
      },
      (err) =>
        this._snackBar.open("Beklenmedik Hata Meydana Geldi.", "Kapat", {
          duration: 2000,
          horizontalPosition: "right",
          verticalPosition: "top",
        })
    );
  }
}
