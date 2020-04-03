import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DuyuruService } from "../../../services/duyurular/duyuru.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map, concatMap } from "rxjs/operators";
import { IDuyuru } from "../../../models/duyuru/duyuru.model";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-update-duyuru",
  templateUrl: "./update-duyuru.component.html",
  styleUrls: ["./update-duyuru.component.css"]
})
export class UpdateDuyuruComponent implements OnInit {
  itemForm: FormGroup;
  duyuru: IDuyuru;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private duyuruService: DuyuruService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        map(res => res.id),
        concatMap(id => this.duyuruService.getDuyuruById(id)),
        map(res => res.result)
      )
      .subscribe(duyuru => {
        this.duyuru = duyuru;
        this.itemForm.patchValue({
          title: duyuru.title,
          description: duyuru.description
        });
      });
  }

  handleSubmit() {
    if (this.itemForm.valid) {
      this.duyuruService
        .updateDuyuru(
          this.duyuru.id,
          this.itemForm.value.title,
          this.itemForm.value.description
        )
        .subscribe(
          res => {
            if (!res.hasError) {
              this.router.navigate(["/announcements", "all-announcements"]);
              this._snackBar.open("Duyuru Güncellemesi Başarılı.", "Kapat", {
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
    } else {
      this._snackBar.open("Geçerli Form Girmeniz Gerekmektedir.", "Kapat", {
        duration: 2000,
        horizontalPosition: "right",
        verticalPosition: "top"
      });
    }
  }
}
