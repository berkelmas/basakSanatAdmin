import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AtolyeService } from "../../../services/atolyeler/atolye.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-atolye",
  templateUrl: "./create-atolye.component.html",
  styleUrls: ["./create-atolye.component.css"],
})
export class CreateAtolyeComponent implements OnInit {
  public itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private atolyeService: AtolyeService
  ) {
    this.itemForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      date: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required]),
    });
  }

  ngOnInit() {}

  handleSubmit() {
    if (this.itemForm.valid) {
      this.atolyeService
        .createNewAtolye(
          this.itemForm.value.title,
          this.itemForm.value.description,
          this.itemForm.value.date
        )
        .subscribe(
          (res) => {
            if (!res.hasError) {
              this.router.navigate(["/workshops", "all-workshops"]);
              this._snackBar.open("Atölye Oluşturma Başarılı.", "Kapat", {
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
    } else {
      this._snackBar.open("Geçerli Form Girmeniz Gerekmektedir.", "Kapat", {
        duration: 2000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
    }
  }
}
