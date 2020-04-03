import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DuyuruService } from "../../../services/duyurular/duyuru.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-create-duyuru",
  templateUrl: "./create-duyuru.component.html",
  styleUrls: ["./create-duyuru.component.css"]
})
export class CreateDuyuruComponent implements OnInit {
  itemForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private duyuruService: DuyuruService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.itemForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required])
    });
  }

  handleSubmit() {
    if (this.itemForm.valid) {
      this.duyuruService
        .createDuyuru(
          this.itemForm.value.title,
          this.itemForm.value.description
        )
        .subscribe(
          res => {
            if (!res.hasError) {
              this.router.navigate(["/announcements", "all-announcements"]);
              this._snackBar.open("Duyuru Oluşturma Başarılı.", "Kapat", {
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
